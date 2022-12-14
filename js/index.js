import { UI, Gameplay, Statistics } from "./app.js";
import { Settings } from "./settings.js";

let timerRunning = false;
let timerContainer = document.querySelector("#time");
let min = 0;
let sec = 0;

const countDown = () => {
  const ui = new UI();
  if (sec === 16 && min === 0) {
    document.querySelector("#timer").className = "timer danger";
  }

  if (sec > 0) {
    sec--;
  } else if (sec === 0 && min === 0) {
    ui.displayScore();
    document.querySelector("#ok").addEventListener("click", () => {
      window.location.reload();
    });
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
  document.querySelector(
    "#current-level"
  ).innerText = `current level: ${level}`;
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
      if (!this.ui.sound.hasAttribute("mute")) {
        this.ui.playKeySound();
      }
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
  if (JSON.parse(localStorage.getItem("app-high-score")) === null) {
    localStorage.setItem("app-high-score", JSON.stringify([0, 0]));
  }

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

  // set level to newbie if level is not found
  for (let i of settings.levelControls) {
    if (
      localStorage.getItem("difficulty-level") === null ||
      localStorage.getItem("difficulty-level") === undefined
    ) {
      if (i.id === "newbie") {
        setTimeout(() => {
          i.click();
        }, 200);
      }
    }
  }

  // key sounds
  if (JSON.parse(localStorage.getItem("app-sounds")) === false) {
    settings.sound = false;
  }

  // saved score
  if (JSON.parse(localStorage.getItem("app-score")) === true) {
    settings.saveScore = true;
  }

  setInterval(() => {
    settings.checkSound();
    settings.checkSaveScore();
  }, 200);

  // instantiate App
  const app = new App();
  app.events();

  //  instatiate UI
  const ui = new UI();
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

  // set theme from history
  if (JSON.parse(localStorage.getItem("app-theme")) === "dark") {
    ui.darkTheme();
    dark = true;
  }
  // generate text
  ui.generateText();
  // attach events
  ui.updateScore();

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
