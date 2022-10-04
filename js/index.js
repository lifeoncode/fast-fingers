// import all the classes needed
import { UI } from './app.js';
import { Count } from './app.js';

 
// on load
window.onload = () => {
    // display the words
    const ui = new UI();
    ui.displayWords();

    // listen for keypress
    window.addEventListener('keypress', matchKeys);
}


// match keys entered with words on page
let count = new Count();
const matchKeys = (e) =>  {
    // instatiate needed classes
    const ui = new UI();

    // words - current letter and entered key
    const currentWords = ui.container.textContent; 

    // individual letters for styling
    const letters = currentWords.split('');
    for (let i of letters) {
        ui.createElement('span', i);
    }
    
    let currentLetter = currentWords[count.getCount()];
    let enteredLetter = e.key;
    // increment the count by 1 with every keypress
    count.increment();

    // the matching logic
    if (enteredLetter === currentLetter) {
        console.log(`matched ${currentLetter}`);
    } else {
        console.log('wrong...');
    }
}



