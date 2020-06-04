// Global Variables
m_Table = new Table();
m_dealer = new Computer('Dealer', 1000, true);
m_player = new Player('Player', 1000);
m_Table.addPlayer(m_dealer);
m_Table.addPlayer(m_player);
m_deck = shuffleDeck();

function startGame() {
    m_dealer.hit(m_deck);
    m_dealer.hit(m_deck);
    m_player.hit(m_deck);
    m_player.hit(m_deck);
}

function playerHit() {
    m_player.hit(m_deck);
    m_player.bustCheck();
    console.log(m_player.getHand());
}

function playerBustCheck() {
    if(m_player.getBust() == true){
        return true;
    }
    else {
        return false;
    }
}

function computerBustCheck() {
    if(m_dealer.getBust() == true){
        return true;
    }
    else {
        return false;
    }
}

function playerBet(betAmount) {
    if (betAmount > m_player.getStack() || betAmount == null){
        return false;
    }
    if (betAmount % 1 != 0){
        return false;
    }
    else{
        if(m_player.getStack() <= 50){
            alert('We spotted you a 1000 chips to keep playing');
            m_player.setStack(1000)
        }
        if(betAmount < 50){
            betAmount = 50;
            alert('Bet Amount was too small, defaulted to 50 chips');
        }
        m_player.setStack(m_player.getStack() - betAmount);
        m_Table.setPot(betAmount);
        setLocalStorage('potValue', m_Table.getPot());
        return true;
    }
}

function computerRound(){
    m_dealer.computerDecision();
    if(m_dealer.getBust() == true){
        return true;
    }
    else {
        return false;
    }
}

function calculateWinner(){
    let dealerHandValue = m_dealer.calculateValue();
    let playerHandValue = m_player.calculateValue();

    if (playerHandValue > dealerHandValue){
        return 1;
    }
    else if (playerHandValue < dealerHandValue){
        return 2;
    }
    else {
        return 3;
    }
}

function calculateWinnings(winnerIndex){
    m_Table.getPot();
    if(winnerIndex == 1){
        m_player.setStack(m_player.getStack() + (m_Table.getPot() * 2));
        m_Table.setPot(0);
    }
    else if(winnerIndex == 3){
        m_player.setStack(m_player.getStack() + (m_Table.getPot() * 1)); //Maybe could implement the storage here
        m_Table.setPot(0);
    }
    else {
        m_player.setStack(m_player.getStack());
        m_Table.setPot(0);
    }
    console.log(m_player.getStack());
}

function newRound() {
    m_deck = shuffleDeck();
    m_dealer.resetHand();
    m_player.resetHand();
    m_dealer.resetBust();
    m_player.resetBust();
}

function setLocalStorage(newItemName, newItemValue){
    window.localStorage.setItem(newItemName, newItemValue);
}