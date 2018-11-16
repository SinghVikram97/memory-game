/*
 * Create a list that holds all of your cards
 */
let cardsArray = ['fa-anchor', 'fa-anchor', 'fa-bicycle', 'fa-bolt', 'fa-cube', 'fa-diamond', 'fa-diamond', 'fa-plane', 'fa-leaf', 'fa-bomb', 'fa-leaf', 'fa-bomb', 'fa-bolt', 'fa-bicycle', 'fa-plane', 'fa-cube'];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let deck=document.getElementById('deck');
let cardHTML='';
function gameStart(){
    shuffle(cardsArray);
    cardsArray.forEach(function(card){
        cardHTML+= `<li class="card">`+
            `<i class="fa ${card}">`+`</i>`+`</li>`
    })
    deck.innerHTML=cardHTML;
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
let openCards = [];
let allCards = document.querySelectorAll('.card');
console.log(allCards);
allCards.forEach(function (card) {

    card.addEventListener('click', function (event) {

       if (!(card.classList.contains('open')) && !(card.classList.contains('show'))) {
            if(openCards.length+1>2){
                return;
            }
            openCards.push(card);
            card.classList.add('open', 'show');
            console.log("Card no: ", openCards.length)

            // Close if 2 cards open simultaneously 
            if (openCards.length === 2) {
                setTimeout(() => {
                    openCards.forEach(function (card) {
                        card.classList.remove('open', 'show');
                    })
                    openCards = [];
                }, 1000);
            }
        }

    })
})