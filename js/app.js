/*
 * Create a list that holds all of your cards
 */
let cardsArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];
let movesSpan = document.getElementById('score');
let restartBtn = document.getElementById('repeat');
let totalMatch=0;
let stars=document.getElementsByClassName('fa-star');
let startCount=3;
console.log(stars);
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let deck = document.getElementById('deck');
let cardHTML;
let moves;

function gameStart() {
    startTimer();
    shuffle(cardsArray);
    cardHTML = '';
    moves = 0;
    movesSpan.innerText = moves;
    cardsArray.forEach(function (card) {
        cardHTML += `<li class="card" data-card="${card}">` +
            `<i class="fa ${card}">` + `</i>` + `</li>`
    })
    deck.innerHTML = cardHTML;
    clickCards();
}
gameStart();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
// Can't open more than 2 cards at a time
function clickCards() {
    let openCards = [];
    let allCards = document.querySelectorAll('.card');

    allCards.forEach(function (card) {

        card.addEventListener('click', function (event) {

            if (!(card.classList.contains('open')) && !(card.classList.contains('show'))) {
                if (openCards.length + 1 > 2) {
                    return;
                }
                openCards.push(card);
                card.classList.add('open', 'show');
                console.log("Card no: ", openCards.length)


                // Close if 2 cards open simultaneously 
                if (openCards.length === 2) {

                    moves++;
                    if(moves>20){
                        // Remove a star
                        for (let i = 2; i < stars.length; i++) {
                            stars[i].classList.remove('outline');
                            stars[i].classList.add('fa-inverse');
                        }
                        startCount--;
                    }
                    else if(moves>50){
                        // Remove 2 stars
                        for(let i=1;i<stars.length;i++){
                            stars[i].classList.remove('outline');
                            stars[i].classList.add('fa-inverse');
                        }
                        startCount--;
                    }
                    movesSpan.innerText = moves;
                    // Check if there is a match
                    let firstCard = openCards[0].dataset.card;
                    let secondCard = openCards[1].dataset.card;
                    if (firstCard == secondCard) {
                        // console.log('It is a match');
                        openCards.forEach(function (card) {
                            card.classList.remove('open', 'show');
                            card.classList.add('match', 'animated', 'bounce');
                        })
                        openCards = [];
                        totalMatch++;
                        if(totalMatch==8){
                            // Get time
                            clearInterval(timerVar);
                            let time=document.getElementById("timer").innerHTML;
                            let timeArray=time.split(':')
                            swal(`Congrats you finished the game in ${timeArray[0]} hours ${timeArray[1]} minutes ${timeArray[2]} seconds and ${moves} moves with ${startCount}/3 stars \n Do you want to continue`, {
                                buttons: {
                                  Yes:{
                                      text:"Yes",
                                      value:"Yes"
                                  },
                                  No: {
                                    text: "No",
                                    value: "No",
                                  },
                                },
                              })
                              .then((value) => {
                                switch (value) {
                               
                                  case "Yes":
                                    swal("Restarting the game");
                                    gameStart();
                                    break;
                               
                                  case "No":
                                    swal("See you again");
                                    break;
                                }
                              });
                            // alert(`Congrats you have completed the game in ${time} time and ${moves} moves`);
                            // setTimeout(() => {
                            //     gameStart();
                            // }, 4000);
                        }
                    }
                    // Remove/hide
                    else {
                        setTimeout(() => {
                            openCards.forEach(function (card) {
                                card.classList.remove('open', 'show');
                            })
                            openCards = [];
                        }, 1000);
                    }
                }
            }

        })
    })
}


// Implement restart button
restartBtn.addEventListener('click', () => {
    openCards = [];
    //deck.innerHTML="";
    clearInterval(timerVar);
    gameStart();
})

// Timer
var timerVar; // Hoisted to top automatically
function startTimer(){
  timerVar= setInterval(countTimer, 1000);
  var totalSeconds = 0;
  function countTimer() {
   totalSeconds++;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);

   document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
  }
}
