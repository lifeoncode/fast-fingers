import { UI } from "./app.js";

export class Settings {
  constructor() {
    this.settingsBtn = document.querySelector("#settings-toggle");
    this.settings = document.querySelector("#settings");
    this.levelControls = this.settings.querySelectorAll("button");
    this.saveScoreBtn = this.settings.querySelector(".high-score .toggle");
    this.soundBtn = this.settings.querySelector(".keysound-toggle .toggle");
    this.sound = true;
    this.saveScore = false;
    this.ui = new UI();
  }

  handleControls(target) {
    let info = "";
    switch (target.id) {
      case "newbie":
        info = `<i class="fa-solid fa-circle-info"></i>
        <p>The newbie level is for beginner typists, newbies... it is the easiest level of difficulty. <span>Timer is set to 6 minutes.</span></p>`;
        return this.displayLevelInfo(info);

      case "casual":
        info = `<i class="fa-solid fa-circle-info"></i>
        <p>For casual typists who know their way around the keyboard fairly well, but haven't mastered touch typing. <span>Timer is set to 4 minutes</span></p>`;
        return this.displayLevelInfo(info);

      case "pro":
        info = `<i class="fa-solid fa-circle-info"></i>
        <p>Pro level is... well, pro! Geared towards touch typing precision and speed with minimal to no errors. <span>Timer is set to 02:30</span></p>`;
        return this.displayLevelInfo(info);

      case "legend":
        info = `<i class="fa-solid fa-circle-info"></i>
        <p>This one is for the legends. The beyond pro, precise touch typists. <span>Timer is set to 1 minute</span></p>`;
        return this.displayLevelInfo(info);
    }
  }

  toggleEvent = () => {
    this.settingsBtn.addEventListener("click", this.displaySettings);
    this.saveScoreBtn.addEventListener("click", this.toggleSaveScore);
    this.soundBtn.addEventListener("click", this.toggleSound);
  };

  displaySettings = () => {
    this.hideMainText();
    this.settingsBtn.removeEventListener("click", this.displaySettings);
    this.settingsBtn.addEventListener("click", this.hideSettings);
    this.settings.classList.add("show");
  };

  hideSettings = () => {
    this.settingsBtn.removeEventListener("click", this.hideSettings);
    this.settingsBtn.addEventListener("click", this.displaySettings);
    this.settings.classList.remove("show");
    this.showMainText();
  };

  hideMainText = () => {
    this.ui.textContainer.parentElement.classList.add("hide");
  };

  showMainText = () => {
    this.ui.textContainer.parentElement.classList.remove("hide");
  };

  displayLevelInfo = (info) => {
    this.settings.querySelector(".level-info").innerHTML = info;
  };

  // save high score
  toggleSaveScore = () => {
    if (this.saveScore) {
      this.saveScore = false;
    } else {
      this.saveScore = true;
    }
    localStorage.setItem("app-score", JSON.stringify(this.saveScore));
  };

  checkSaveScore = () => {
    if (this.saveScore) {
      this.getSavedScore();
      this.saveScoreBtn.classList.add("on");
      this.saveScoreBtn.lastElementChild.classList.add("on");
      this.saveScoreBtn.lastElementChild.innerHTML =
        '<i class="fas fa-check"></i>';
    } else {
      this.saveScoreBtn.removeEventListener("click", this.unsaveHighScore);
      this.saveScoreBtn.addEventListener("click", this.saveHighScore);
      this.saveScoreBtn.classList.remove("on");
      this.saveScoreBtn.lastElementChild.classList.remove("on");
      this.saveScoreBtn.lastElementChild.innerHTML =
        '<i class="fas fa-close"></i>';
    }
  };

  getSavedScore = () => {
    try {
      let highScore = JSON.parse(localStorage.getItem("app-high-score"));
      // console.log(highScore);
    } catch (error) {
      console.log("error:", error);
    }
  };

  // key sounds
  toggleSound = () => {
    if (this.sound) {
      this.sound = false;
      this.soundBtn.classList.remove("on");
      this.soundBtn.lastElementChild.classList.remove("on");
      this.soundBtn.lastElementChild.innerHTML = '<i class="fas fa-close"></i>';
    } else {
      this.sound = true;
      this.soundBtn.classList.add("on");
      this.soundBtn.lastElementChild.classList.add("on");
      this.soundBtn.lastElementChild.innerHTML = '<i class="fas fa-check"></i>';
    }
    localStorage.setItem("app-sounds", JSON.stringify(this.sound));
  };

  // check sound
  checkSound = () => {
    if (this.sound) {
      this.ui.sound.removeAttribute("mute");
      this.soundBtn.classList.add("on");
      this.soundBtn.lastElementChild.classList.add("on");
      this.soundBtn.lastElementChild.innerHTML = '<i class="fas fa-check"></i>';
    } else {
      this.ui.sound.setAttribute("mute", "");
      this.soundBtn.classList.remove("on");
      this.soundBtn.lastElementChild.classList.remove("on");
      this.soundBtn.lastElementChild.innerHTML = '<i class="fas fa-close"></i>';
    }
  };
}
