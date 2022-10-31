import { UI } from "./app.js";
import { Gameplay } from "./app.js";
import { Statistics } from "./app.js";

class App {
  constructor() {
    this.ui = new UI();
    this.gameplay = new Gameplay();
    this.stats = new Statistics();
    this.enteredKeys = [];
  }

  events = () => {
    window.addEventListener("keypress", (e) => {
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
  // instantiate App
  const app = new App();
  app.events();

  //   instatiate UI
  const ui = new UI();
  ui.generateText();
  ui.updateScore();
});
