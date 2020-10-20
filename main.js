const cards = document.querySelectorAll(".card");
let startButton = document.getElementById("start-button"),
    playAgainButton = document.getElementById("play-again-button"),
    doneButton = document.getElementById("done-button"),
    cardClicked = false,
    flipEnabled = true,
    minutes = 1,
    seconds = 30,
    score = 0;

let firstCard,secondCard;


function showGameCards() {
    
    let gameBoard = document.getElementById("memory-game");
    gameBoard.classList.remove("hide-memory-game");
    updateTimer();
    
}

function shuffle() {
    let cardsNumber = cards.length;
        cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * cardsNumber);
      card.style.order = ramdomPos;
    });
  }

function startGame(){

    shuffle();
    cards.forEach(element => element.addEventListener("click" , flipCard));
    showGameCards();
}


function hideGameCards() {
    let gameBoard = document.getElementById("memory-game");
    gameBoard.classList.add("hide-memory-game");
}

function hideStartPage() {
    let startPage = document.getElementById("start-game");
    startPage.addEventListener("transitionend", () =>  startPage.style.display="none");
    startPage.style.transform="translateX(150%)";   
}

function showScore() {
    let scorePage = document.getElementById("show-score");
    let scoreContent = document.querySelector("#show-score p");
    scoreContent.textContent = "you scored " + score + "/" + (cards.length/2);
    scorePage.style.display = "flex";
}

function hideScore() {
    score=0;
    let scorePage = document.getElementById("show-score");
    scorePage.style.display = "none";
    
}

function flipCard(){
    if(!flipEnabled){
        return;
    }

    if(this === firstCard){
        return ;
    }

    this.classList.add("flip");

    if(!cardClicked){
        firstCard = this;
        cardClicked = true;
    } else {
        secondCard = this;
        cardClicked=false;
        cardsMatch();
        
  }

 
}

function cardsMatch()
{
    if(firstCard.dataset.image === secondCard.dataset.image){
        disableCards();      
    } else {
        
      unflipCards();
       
    }
    

}

function disableCards() {
    score +=1;
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click",flipCard);
    resetRound();
   
}

function unflipCards() {
    
    flipEnabled=false;
    setTimeout(() => {
        firstCard.classList.toggle('flip');
        secondCard.classList.toggle('flip');
  
       flipEnabled = true;
  
       resetRound();
      }, 1000);
   
}

function resetRound(){
    [cardClicked, flipEnabled] = [false, true];
    [firstCard, secondCard] = [null, null];
}

function resetGame(){
    
    resetRound();
    cards.forEach(element => element.classList.remove("flip"));
    cards.forEach(element => element.removeEventListener("click" , flipCard));
    minutes=1;
    seconds=30;

}

function gameOver(){
    clearTimeout(t);
    hideGameCards();
    resetGame();
    showScore();
}

function updateTimer() {

    t = setTimeout("updateTimer()",1000);
    let timer = document.getElementById("timer");
    if(seconds == 0){
        if(minutes == 0){
           gameOver();
            return;
        }

        minutes--;
        seconds = 59;
    }else{
        seconds--;
    }

    if(seconds < 10){
        seconds = "0" + seconds;
    }

    let str = "0" + minutes + ":" + seconds;
    timer.textContent=str;

}

// main event listeners
startButton.addEventListener("click", () => {
     
    hideStartPage();
    startGame();
    
});

doneButton.addEventListener("click", () => {
    gameOver();  
});

playAgainButton.addEventListener("click", () => {

    hideScore();
    startGame();
    
});


