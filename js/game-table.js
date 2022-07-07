//player object
const player = {
    hand: [],
    score: 0,
    tableSide: document.querySelector('#player-side'),
}

//dealer object
const dealer = {
    hand:[],
    score: 0,
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

    deal(id, player);
    deal(id, dealer);

    //hit event listener
    hitBtn.addEventListener('click', ()=>{
        if(playerTurn===true){deal(id, player);}
    })
    //stand event listener
    standBtn.addEventListener('click',()=>{
        playerTurn = false;
    })
}

//deal function
const deal = async (deck_id, current) => {

        const dealCard = await axios.get(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

        const card = dealCard.data.cards;
        current.hand.push(card);
        displayCard(current);

    }

const displayCard = (current) =>{
    console.log(current);
    const card = current.hand.pop();
    console.log(card);
    current.tableSide.innerHTML = `<div><img src='${card[0].image}'></div>`;
    current.hand.push(card);
    const img = document.querySelectorAll('img');
    img.forEach((image)=>image.style.height = '90px');
}

getDeck();


//naturals function (tie)
    //ace and (face card or 10card)


//player
    //Hit button draws card (call deal function)
        //score
    //stand
        //moves to dealers turn

//dealer
    //if score =<16 dealer must hit
    //if score =>17 dealer must stand

//ace value
    //if player draws ace
        //if value is ace 
            //if score = >17 ace is 1
            //if score = <17 ace is 11
    //if dealer draws ace 
        // if value 11 + other cards values = 17 or >
            //ace = 11 dealer stands
        //else ace = 1;

//scoring
    //score  = value of cards added together
    //if score >21 player goes bust no more cards dealt;

    