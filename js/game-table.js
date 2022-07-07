//player object
const player = {
    hand: [],
    aceValues: [],
    score: 0,
    turn: true,
    tableSide: document.querySelector('#player-side'),
}

//dealer object
const dealer = {
    hand:[],
    aceValues: [],
    score: 0,
    fdCard: {},
    turn: false,
    tableSide: document.querySelector('#dealer-side'),
}

//hit button
const hitBtn= document.querySelector('#hit');
//stand button
const standBtn = document.querySelector('#stand');

//six card decks
const getDeck = async () =>{
    const deck = await axios.get(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`);

    const id = deck.data.deck_id;

    // deal(id, player, false);
    deal(id, dealer, false);
    // deal(id,player, false);
    deal(id,dealer,true);
    
    //hit event listener
    hitBtn.addEventListener('click', ()=>{
        if(player.turn===true){
            deal(id, player,false);
        }
    })
    //stand event listener
    standBtn.addEventListener('click',()=>{
        player.turn = false;
        dealer.turn = true;
        dealersTurn(id);
    })
}

//deal function
const deal = async (deck_id, current, facedown) => {

        const dealCard = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

        const card = dealCard.data.cards;
        current.hand.push(card);

        displayCard(deck_id, current, facedown);

    }

//displays cards dealt 
const displayCard = async (deck_id, current, facedown) =>{

    const card = current.hand.pop();
    console.log(current.hand);

    if(facedown === false){
    if(current.hand.length === 0){
        current.tableSide.innerHTML = `<img src='${card[0].image}'>`;
    }else{
    const div = document.createElement('div');
    div.innerHTML = `<img src='${card[0].image}'>`;
    current.tableSide.appendChild(div);
    }
    current.hand.push(card);

        tally(deck_id, current);
    
    }else{
        current.fdCard = card;
        const div = document.createElement('div');
        div.innerHTML = `<img id='face-down' src='assets/face-down-card.jpeg'>`;
        current.tableSide.appendChild(div);
    }


    const img = document.querySelectorAll('img');
    img.forEach((image)=>image.style.height = '90px');
    img.forEach((image)=>image.style.width = '60px');

}

//tallies up card totals
const tally = (deck_id, current)=>{
    console.log(current.hand);
    const card = current.hand.pop();

    // console.log(card[0].value);
    // console.log(current.score);

    if(isNaN(card[0].value)){
        if(card[0].value === 'JACK'||card[0].value ==='QUEEN'||card[0].value==='KING'){
            current.score+= 10;
        }else if(card[0].value ==='ACE'){
            if(current === player){
                
                if((current.score+11)>21){
                current.aceValues.push(1);
                current.score += 1;
            }else{
                current.aceValues.push(11);
                current.score += 11;
            }
        }else{
            if(current.score + 11 >= 17 && !(current.score + 11 > 21)){
                current.aceValues.push(11);
                current.score += 11;
            }else{ 
                current.aceValues.push(1);
                current.score +=1;
            }
        }
    }}else{
    current.score += parseInt(card[0].value);
    }

    current.hand.push(card);

    if(player.turn === true){
    if(current.aceValues.length !== 0){
        aceValue(current);}}

    console.log(current.score);

    if(dealer.turn === true){
        if (current.score <=16){
            deal(deck_id, current, false);
        }
    if(current.aceValues.length !== 0){
        aceValue(current);}
    }
    // displayPoints(current);
}

//gives ace value based on player and rules
const aceValue = (current) =>{
    if(current===player){
    for(let i=0; i<current.aceValues.length; i++){
        current.score -= current.aceValues[i];
        if((current.score+11)>21){
            current.aceValues[i]=1;
        }else{current.aceValues[i]=11;}
        current.score += current.aceValues[i];}
    }else{
        for(let i=0; i<current.aceValues.length; i++){
            current.score -= current.aceValues[i];
            if(current.score + 11 >= 17 && !(current.score + 11 > 21)){
                current.aceValues[i]=11;
            }else{current.aceValues[i]=1;}
            current.score += current.aceValues[i];}
    }

}



//controls dealers turn
const dealersTurn = (deck_id) =>{
    flipCard();
    tally(deck_id, dealer);

}

const flipCard = ()=>{
    const img = document.querySelector('#face-down');
    img.src=`${dealer.fdCard[0].image}`;
    dealer.hand.push(dealer.fdCard);
}


getDeck();




//naturals function (tie)
    //ace and (face card or 10card)


//player
        //score
        //moves to dealers turn

// //scoring
//     score  = value of cards added together
//     if score >21 player goes bust no more cards dealt; 