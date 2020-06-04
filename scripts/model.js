// Card Class and associated Functions
class Card {
    constructor(suit, cardId, value){
        this.suit = suit;
        this.cardId = cardId;
        this.value = value;
    }
    getCardId() {
        return this.cardId;
    }
    getSuit() {
        return this.suit;
    }
    getValue() {
        return this.value;
    }
    setValue(newValue) {
        this.value = newValue;
    }
}

// Generates a deck of 52 cards
function cardFactory(){
    let suitList = ['Hearts', 'Clubs', 'Spades', 'Diamonds'];
    let cardID = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let deck = [];

    for(suit = 0; suit < suitList.length; suit++){
        for(id = 0; id < cardID.length; id++){
            // Get card value based on cardID (facecard or not)
            cardValue = cardID[id]
            if (cardID[id] >= 10 ){cardValue = 10;}
            if (cardID[id] == 13){cardValue = 10;}
            if (cardID[id] == 1){cardValue = 11;}
            newCard = new Card(suitList[suit], cardID[id], cardValue);
            deck.push(newCard);
        }
    }
    
    return deck
}

// Shuffles a deck, generates a new deck if no deck is provided to shuffle
function shuffleDeck(generatedDeck = cardFactory()) {
    for(count = 0; count < generatedDeck.length; count++){
        randomCardIndex = Math.floor(Math.random() * generatedDeck.length);
        currentCard = generatedDeck[randomCardIndex];
        generatedDeck[randomCardIndex] = generatedDeck[count];
        generatedDeck[count] = currentCard;
    }

    return generatedDeck
}

function resetDeckValue(deck){
    for(card = 0; card < deck.length; card++){
        if(deck[card].getCardId() == 1 && deck[card].getValue() == 1){
            console.log('Changed ace value');
        }
    }
}

// Function to make initial deal
function initialDeal(PlayerList, currentDeck){
    currentPlayerList = PlayerList.getList();
    for(currentPlayerId = 0; currentPlayerId < currentPlayerList.length; currentPlayerId++){
        currentPlayerList[currentPlayerId].hit(currentDeck);
        currentPlayerList[currentPlayerId].hit(currentDeck);
    }
}

// Player Class
class Player {
    constructor(playerName, startChipValue){
        this.playerName = playerName;
        this.stack = startChipValue;
        this.hand = [];
        this.isBust = false;
    }
    getStack(){
        return this.stack;
    }
    setStack(stackAmount){
        this.stack = stackAmount;
    }
    hit(deck) {
        this.hand.push(deck.pop())
    }
    remove(){
        this.hand.pop();
    }
    getHand(){
        return this.hand
    }
    resetHand(){
        this.hand = [];
    }
    getBust(){
        return this.isBust;
    }
    calculateValue(){
        let currentHandValue = 0;
        for(card =0; card < this.hand.length; card++){
            currentHandValue = this.hand[card].getValue() + currentHandValue;
        }

        return currentHandValue;
    }
    bustCheck(){
        // Initial Check
        let currentValue = 0;
        for(card = 0; card < this.hand.length; card++){
            currentValue = this.hand[card].getValue() + currentValue;
        }

        // Checks to revalue ace if needed
        if(currentValue > 21){
            for(card = 0; card < this.hand.length; card++){
                if(this.hand[card].getCardId() == 1 && this.hand[card].getValue() != 1){
                    this.hand[card].setValue(1);
                }
            }
        }

        // Rechecks the values
        currentValue = 0;
        for(card = 0; card < this.hand.length; card++){
            currentValue = this.hand[card].getValue() + currentValue;
        }

        if(currentValue > 21){
            this.isBust = true;
        }
        console.log(currentValue);
    }
    resetBust(){
        this.isBust = false;
    }
}

// Player Class
class Computer extends Player {
    constructor(computerName, startChipValue){
        super(computerName, startChipValue);
    }

    shouldComputerHit(){
        let currentValueCount = 0;
        for(card = 0; card < this.hand.length; card++){
            currentValueCount = this.hand[card].getValue() + currentValueCount;
        }
        console.log(currentValueCount);
        if(currentValueCount >= 17){
            return false;
        }
        else{
            return true;
        }
    }

    computerDecision(){
        let computerDecision = this.shouldComputerHit();
        if(computerDecision == true){
            this.hit(m_deck);
            this.bustCheck();
            if (this.isBust == false){
                this.computerDecision();
            }
        }
    }
    
}

// Table Class
class Table {
    constructor(){
        this.players = [];
        this.pot = 0;
    }
    addPlayer(newPlayer){
        this.players.push(newPlayer)
    }
    getPlayers(){
        return this.players;
    }
    setPot(chipValue){
        this.pot = chipValue;
    }
    getPot(){
        return this.pot;
    }
}

