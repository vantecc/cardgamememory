const cards = document.querySelectorAll('.memory-card');
const counter = document.getElementById('counter');
let attemptCount = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    attemptCount++;
    counter.innerText = `Tentativas: ${attemptCount}`;

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

    if (checkAllCardsFlipped()) {
        setTimeout(shuffleAndRestart, 3000);
    }
}

function shuffleAndRestart() {
    shuffle();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    attemptCount = 0; 
    counter.innerText = `Tentativas: 0`;
}


function shuffle() {
    for (let i = 0; i < 5; i++) { 
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * cards.length);
            card.style.order = randomPos;
        });
    }
}


function checkAllCardsFlipped() {
    return [...cards].every(card => card.classList.contains('flip') && !card.classList.contains('listen'));
}

(function initialShuffle() {
    shuffle();
    cards.forEach(card => card.addEventListener('click', flipCard));
})();
