
// fetch words from web
async function getWords() {
    const response = await fetch('https://raw.githubusercontent.com/lifeoncode/data-thingie/main/words.txt');
    const data = await response.text();

    return data;
}

// fetch the words and display them
getWords().then(words => {
    displayWords(words);
});

// display words
function displayWords(words) {
    const container = document.querySelector('.current-words');
    container.textContent = words;
}


// listen for keypress
let count = 0;
window.addEventListener('keypress', function(e) {
    const currentWords = this.document.querySelector('.current-words').textContent;
    let currentLetter = currentWords[count];
    let enteredLetter = e.key;
    count++;

    if (enteredLetter === currentLetter) {
        console.log(`matched ${currentLetter}`);
    } else {
        console.log('wrong...');
    }
});




