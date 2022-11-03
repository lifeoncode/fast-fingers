import { UI } from "./app.js";

export class Settings {
  constructor() {
    this.settingsBtn = document.querySelector("#settings-toggle");
    this.settings = document.querySelector("#settings");
    this.levelControls = this.settings.querySelectorAll("button");
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
}
