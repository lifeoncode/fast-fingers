import { UI, Gameplay, Statistics } from "./app.js";
import { Settings } from "./settings.js";

let timerRunning = false;
let timerContainer = document.querySelector("#time");
let min = 0;
let sec = 0;

const countDown = () => {
  if (sec === 16 && min === 0) {
    document.querySelector("#timer").className = "timer danger";
  }

  if (sec > 0) {
    sec--;
  } else if (sec === 0 && min === 0) {
    alert("GAME OVER!!");
    timerRunning = false;
  } else if (sec === 0 && min > 0) {
    min--;
    sec = 59;
  }

  setTimer();
};

// countdown timer
setInterval(() => {
  if (timerRunning) {
    countDown();
  }
}, 1000);

const setTimer = () => {
  if (sec < 10 && min < 10) {
    timerContainer.innerHTML = `<span>0${min}:0${sec}</span>`;
  } else if (sec >= 10 && min < 10) {
    timerContainer.innerHTML = `<span>0${min}:${sec}</span>`;
  } else if (sec >= 10 && min >= 10) {
    timerContainer.innerHTML = `<span>${min}:${sec}</span>`;
  } else if (sec < 10 && min >= 10) {
    timerContainer.innerHTML = `<span>${min}:0${sec}</span>`;
  }
};

const checkLevel = () => {
  let level = JSON.parse(localStorage.getItem("difficulty-level"));
  switch (level) {
    case "newbie":
      min = 6;
      sec = 0;
      break;
    case "casual":
      min = 4;
      sec = 0;
      break;
    case "pro":
      min = 2;
      sec = 30;
      break;
    case "legend":
      min = 1;
      sec = 0;
  }

  setTimer();
};

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

  // seed timer based on settings
  setTimeout(() => {
    checkLevel();
  }, 200);

  // get settings
  const settings = new Settings();
  settings.toggleEvent();
  for (let i of settings.levelControls) {
    if (i.id == JSON.parse(localStorage.getItem("difficulty-level"))) {
      setTimeout(() => {
        i.click();
      }, 200);
    }
  }

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

  // settings
  settings.levelControls.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      for (let i of settings.levelControls) {
        i.className = "";
      }
      e.target.className = "active";
      localStorage.setItem("difficulty-level", JSON.stringify(e.target.id));
      checkLevel();
      settings.handleControls(e.target);
    });
  });
});
