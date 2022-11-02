import { UI, Gameplay, Statistics } from "./app.js";

let timerRunning = false;
let timerContainer = document.querySelector("#timer");
let min = 0;
let sec = 0;

setInterval(() => {
  if (timerRunning) {
    countTimer();
  }
}, 1000);

function countTimer() {
  sec++;
  if (sec === 60) {
    min++;
    sec = 0;
  }

  if (sec < 10 && min < 10) {
    timerContainer.innerHTML = `
      <i class="fa-solid fa-clock"></i>
      <span>0${min}:0${sec}</span>`;
  } else if (sec >= 10 && min < 10) {
    timerContainer.innerHTML = `
      <i class="fa-solid fa-clock"></i>
      <span>0${min}:${sec}</span>`;
  } else if (sec >= 10 && min >= 10) {
    timerContainer.innerHTML = `
      <i class="fa-solid fa-clock"></i>
      <span>${min}:${sec}</span>`;
  } else if (sec < 10 && min >= 10) {
    timerContainer.innerHTML = `
      <i class="fa-solid fa-clock"></i>
      <span>${min}:0${sec}</span>`;
  }
}

class App {
  constructor() {
    this.ui = new UI();
    this.gameplay = new Gameplay();
    this.stats = new Statistics();
    this.enteredKeys = [];
  }

  events = () => {
    window.addEventListener("keypress", (e) => {
      // start timer
      timerRunning = true;
      // play key sound
      this.ui.playKeySound();
      // update entered keys to compare with text
      this.enteredKeys.push(e.key);
      let textSpans = text.querySelectorAll("span");

      //  handle inputs - when sentence completes
      //  generate new text
      let done = this.gameplay.handleInputLogic(this.enteredKeys, textSpans);
      if (done) this.ui.generateText();
    });
  };
}

// start
window.addEventListener("load", () => {
  // seed score data
  let stats = { score: [0, 0] };
  localStorage.setItem("fastfingers-stats", JSON.stringify(stats));

  // instantiate App
  const app = new App();
  app.events();

  //   instatiate UI
  const ui = new UI();
  ui.generateText();
  ui.updateScore();

  // theme
  let dark = false;
  ui.themeToggle.addEventListener("click", () => {
    if (!dark) {
      dark = true;
      ui.darkTheme();
    } else {
      dark = false;
      ui.lightTheme();
    }
  });
});
