// import all the classes needed
import { UI } from './app.js';
import { Count } from './app.js';

 
// on load
window.onload = () => {
    // display the words
    const ui = new UI();
    ui.displayWords();

    window.addEventListener('keypress', gamePlay);
}


// all the logic of the game
const gamePlay = (e) => {
    const ui = new UI();
    const currentWords = ui.container.textContent; 
    let currentLetter = currentWords[count.getCount()];

    if (matchKeys(e.key)) {
        console.log('GREAT!');
        if (e.key === ' ') {
            document.querySelector('.space').classList.add('correct');
        } else {
            document.querySelector(`.${currentLetter}`).classList.add('correct');
        }

    } else {
        console.log('OH NO...');
        if (e.key === ' ') {
            document.querySelector('.space').classList.add('wrong');
        } else {
            document.querySelector(`.${currentLetter}`).classList.add('wrong');
        }
    }
}


// match keys entered with words on page
let count = new Count();
const matchKeys = (pressedKey) =>  {
    // instatiate needed classes
    const ui = new UI();

    // words - current letter and entered key
    const currentWords = ui.container.textContent; 
    let currentLetter = currentWords[count.getCount()];
    // increment the count by 1 with every keypress
    count.increment();

    // the matching logic
    if (pressedKey === currentLetter) {
        return true;
    } else {
        return false;
    }
}



