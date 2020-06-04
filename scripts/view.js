function generateTable() {
    let cardContainers = document.getElementsByClassName('card-container');
    // Generate Tables for Player and Dealer
    for (containers = 0; containers < cardContainers.length; containers++){
        let currentContainer = cardContainers[containers];
        let generatedTable = document.createElement('table');
        let generatedRow = document.createElement('tr');
        currentContainer.appendChild(generatedTable);
        generatedTable.appendChild(generatedRow);
        for(cardSlot = 0; cardSlot < 6; cardSlot++){
            generatedRow.appendChild(document.createElement('td'));
        }
    }
}

function loadCurrentPlayerHands() {
    let playerList = m_Table.getPlayers();
    for(currentPlayer = 0; currentPlayer < playerList.length; currentPlayer++){
        let currentCardContainer = document.getElementsByClassName('card-container').item(currentPlayer);
        let currentPlayerHand = playerList[currentPlayer].getHand();
        for(card = 0; card < currentPlayerHand.length; card++){
            let currentCardSlot = currentCardContainer.getElementsByTagName('td').item(card);
            currentCardSlot.setAttribute('class', 'active-card-slot')
            let cardImg = document.createElement('img');
            cardImg.src = "Images/" + currentPlayerHand[card].getCardId() + "_of_" + currentPlayerHand[card].getSuit() + ".png";
            currentCardSlot.appendChild(cardImg);
        }
    }
    clickableCard(); // Runs the clickable event mask
}


function loadGameMask() {
    let cardContainerTable = document.getElementById('dealer-cards-containers')
    for(let cardCount = 1; cardCount < m_dealer.getHand().length; cardCount++){
        let cardImg = cardContainerTable.getElementsByTagName('img').item(cardCount);
        cardImg.src = "Images/default.png";
    }
}

function clickableCard() {
    let cardContainers = document.getElementsByClassName('active-card-slot');
    for(cardContainer = 0; cardContainer < cardContainers.length; cardContainer++){
        cardContainers[cardContainer].addEventListener('click', function(){
            let currentImg = this.getElementsByTagName('img').item(0);
            currentImg.style.border = '2px solid red';
        });
    }
}

function clearCurrentTableView() {
    let cardContainers = document.getElementsByClassName('card-container');
    for(container = 0; container < cardContainers.length; container++){
        let tableCells = cardContainers.item(container).getElementsByTagName('td');
        for(tableCell = 0; tableCell < tableCells.length; tableCell++){
            tableCells.item(tableCell).innerHTML = "";
        }
    }
}

function viewStartGame(){
    let betAmount = document.getElementById('bet-input').value;
    let result = playerBet(betAmount);
     // Checks if value entered is too large
    if (result == false){
        alert('Please Enter a valid amount or type!');
    }
    else{
        let currentPlayerStack = document.getElementById('player-stack-info');
        currentPlayerStack.innerHTML = m_player.getStack();
        document.getElementById('bet-container').style.display = 'none';
        document.getElementById('hit-button').style.display = 'inline';
        document.getElementById('end-turn-button').style.display = 'inline';
        document.getElementById('start-new-round').style.display = 'none';
        startGame();
        getLocalStorage();
    }
}

function viewEndPlayerTurn() {
    document.getElementById('hit-button').style.display = 'none';
    document.getElementById('end-turn-button').style.display = 'none';
    document.getElementById('start-new-round').style.display = 'inline';
}

function getPlayerInfo() {
    var request = new XMLHttpRequest();
    request.open("GET", "JSONtemplate.txt", false);
    request.send(null);

    if (request.status != 200){
        alert('Request failed. Status code + ' + request.status + ": " + request.statusText);
        return;
    }
    
    let jsonResponse = JSON.parse(request.responseText);
    let currentNameHolder = document.getElementById('player-name-info');
    currentNameHolder.innerHTML = jsonResponse.player.name;
}

function viewBustCheck() {
    console.log(playerBustCheck());
    if(playerBustCheck()){
        let consoleText = document.getElementById('game-response-banner');
        consoleText.style.color = 'white';
        consoleText.style.fontSize = '20px';
        consoleText.innerHTML = "You Lost! You busted this round";
        viewNewRound();
    }
}

function viewBustCheckCom() {
    console.log(computerBustCheck());
    if(computerBustCheck()){
        let consoleText = document.getElementById('game-response-banner');
        consoleText.style.color = 'white';
        consoleText.style.fontSize = '20px';
        consoleText.innerHTML = "Dealer Busted this round! You won!";
        viewNewRound();
    }
}

function viewNewRound() {
    document.getElementById('end-turn-button').style.display = "none";
    document.getElementById('hit-button').style.display = "none";
    document.getElementById('bet-container').style.display = "none";
    document.getElementById('start-new-round').style.display = "inline";
}

function viewEnterNewBet() {
    document.getElementById('bet-container').style.display = "inline";
    document.getElementById('start-new-round').style.display = "none";
    document.getElementById('game-response-banner').innerHTML = '';
    let cardContainers = document.getElementsByClassName('card-container');
    for(card = 0; card < cardContainers.length; card++){
        cardContainers.item(card).innerHTML = "";
    }
    generateTable();
}

function viewWinner(){
    dealerBustCheck = computerRound();
    winnerIndex = calculateWinner();
    if(dealerBustCheck){
        let consoleText = document.getElementById('game-response-banner');
        consoleText.innerHTML = "Dealer Busted! You won the round.";
        calculateWinnings(1);
        document.getElementById('player-stack-info').innerHTML = m_player.getStack();
    }
    else if(winnerIndex == 1){
        let consoleText = document.getElementById('game-response-banner');
        consoleText.innerHTML = "You won the hand! Congradulations";
        calculateWinnings(winnerIndex);
        document.getElementById('player-stack-info').innerHTML = m_player.getStack();

    }
    else if(winnerIndex == 2){
        let consoleText = document.getElementById('game-response-banner');
        consoleText.innerHTML = "Dealer won the hand!";
        calculateWinnings(winnerIndex);
        document.getElementById('player-stack-info').innerHTML = m_player.getStack();
    }
    else{
        let consoleText = document.getElementById('game-response-banner');
        consoleText.innerHTML = "Tie Game!";
        calculateWinnings(winnerIndex);
        document.getElementById('player-stack-info').innerHTML = m_player.getStack();
    }
}

function getLocalStorage(){
    document.getElementById('view-table-pot').innerHTML = "Table Pot Value: " + window.localStorage.getItem('potValue');
}

function viewGetHelp(){
    document.getElementById('help-video-button').style.display="none";
    document.getElementById('help-video-container').style.display="block";
    let video = document.getElementById('help-video-container').getElementsByTagName('video').item(0);
    video.play();
    document.getElementById('help-close-button').style.display="inline";
}

function closeViewHelp(){
    document.getElementById('help-video-button').style.display='inline';
    document.getElementById('help-video-container').style.display='none';
    let video = document.getElementById('help-video-container').getElementsByTagName('video').item(0);
    video.pause();
    document.getElementById('help-close-button').style.display="none";
}

// Important Loads
getPlayerInfo();
generateTable();

// View Actions
document.getElementById('bet-submit-button').addEventListener('click', function(){viewStartGame(); loadCurrentPlayerHands(); loadGameMask(); });
document.getElementById('hit-button').addEventListener('click', function(){ playerHit(); clearCurrentTableView(); loadCurrentPlayerHands(); loadGameMask(); viewBustCheck(); });
document.getElementById('end-turn-button').addEventListener('click', function(){ viewEndPlayerTurn(); viewWinner(); clearCurrentTableView(); loadCurrentPlayerHands(); viewWinner();});
document.getElementById('start-new-round').addEventListener('click', function(){ clearCurrentTableView(); newRound(); viewEnterNewBet(); });
document.getElementById('help-video-button').addEventListener('click', function(){ viewGetHelp(); })
document.getElementById('help-close-button').addEventListener('click', function(){ closeViewHelp(); })