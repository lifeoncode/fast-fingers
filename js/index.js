const text = document.querySelector('#text');
const enteredKeys = [];

const generateText = async () => {
    const res = await fetch('https://api.chucknorris.io/jokes/random');
    const data = await res.json();
    let joke = data.value.split('');
    
    text.innerHTML = '';
    for (let char of joke) {
        text.innerHTML += `<span>${char}</span>`;
    }
}


window.addEventListener('load', generateText);


window.addEventListener('keypress', (e) => {
    enteredKeys.push(e.key);
    let textSpans = text.querySelectorAll('span');

    textSpans.forEach((char, index) => {
        let charEntered = enteredKeys[index];
        if (charEntered == null) {
            char.className = '';

        }else if (charEntered === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('wrong');

        } else {
            char.classList.add('wrong');
            char.classList.remove('correct');
        }
    })


    // when the end of a sentence is reached
    // reset entered keys and generated a new joke
    if (enteredKeys.length === textSpans.length) {
        enteredKeys.length = 0;
        generateText();
    }
});