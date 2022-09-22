
// fetch words from web
class Words {
    getWords = async () => {
        const response = await fetch('https://raw.githubusercontent.com/lifeoncode/data-thingie/main/words.txt');
        const data = await response.text();
        return data;
    }
}


class UI {
    constructor() {
        this.container = document.querySelector('.current-words');
    }

    // display words
    displayWords = () => {
        const words = new Words();
        words.getWords().then(theWords => {
            this.container.textContent = theWords;
        });
    }
}

class Count {
    constructor() {
        this.count = 0;
    }
    
    increment = () => {
        this.count++;
    }

    getCount = () => {
        return this.count;
    }
}

// on load
window.onload = () => {
    // display the words
    const ui = new UI();
    ui.displayWords();

    // listen for keypress
    this.addEventListener('keypress', matchKeys);
}

// match keys entered with words on page
function matchKeys(e) {
    // instatiate needed classes
    let count = new Count();
    const ui = new UI();

    // words - current letter and entered key
    const currentWords = ui.container.textContent; 
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



