//player object
const player = {
    hand: [],
    aceValues: [],
    score: 0,
    tableSide: document.querySelector('#player-side'),
}

//dealer object
const dealer = {
    hand:[],
    score: 0,
    fdCard: {},
    tableSide: document.querySelector('#dealer-side'),
}

//hit button
const hitBtn= document.querySelector('#hit');
//stand button
const standBtn = document.querySelector('#stand');

let playerTurn = true;

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
        if(playerTurn===true){deal(id, player);}
    })
    //stand event listener
    standBtn.addEventListener('click',()=>{
        playerTurn = false;
        dealersTurn();
    })
}

//deal function
const deal = async (deck_id, current, facedown) => {

        const dealCard = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

        const card = dealCard.data.cards;
        current.hand.push(card);

        displayCard(current, facedown);

    }

const displayCard = async (current, facedown) =>{

    const card = current.hand.pop();
    if(facedown === false){
    if(current.hand.length === 0){
        current.tableSide.innerHTML = `<img src='${card[0].image}'>`;
    }else{
    const div = document.createElement('div');
    div.innerHTML = `<img src='${card[0].image}'>`;
    current.tableSide.appendChild(div);
    }

    current.hand.push(card);
    tally(current);
    }else{
        current.fdCard = card;
        const div = document.createElement('div');
        div.innerHTML = `<img src='assets/face-down-card.jpeg'>`;
        current.tableSide.appendChild(div);
    }


    const img = document.querySelectorAll('img');
    img.forEach((image)=>image.style.height = '90px');

}

const tally= async (current)=>{
    const card = current.hand.pop();

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

        } 
    }}else{
    current.score += parseInt(card[0].value);
    }

    current.hand.push(card);

    if(current === player){
        if(current.aceValues.length !== 0){
        aceValue(current);
    }}

    console.log(current.score);

    // displayPoints(current);
}

const aceValue = (current) =>{
    for(let i=0; i<current.aceValues.length; i++){
        current.score -= current.aceValues[i];
        if((current.score+11)>21){
            current.aceValues[i]=1;
        }else{current.aceValues[i]=11;}
        
        current.score += current.aceValues[i];
            console.log(current.aceValues); 
}}

const dealersTurn = async () =>{

}

getDeck();


//naturals function (tie)
    //ace and (face card or 10card)


//player
        //score
        //moves to dealers turn

//dealer
    //if score =<16 dealer must hit
    //if score =>17 dealer must stand

    //if dealer draws ace 
        // if value 11 + other cards values = 17 or >
        //ace = 11 dealer stands
        //else ace = 1;

// //scoring
//     score  = value of cards added together
//     if score >21 player goes bust no more cards dealt; 