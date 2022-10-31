import { UI } from "./app.js";
import { Gameplay } from "./app.js";

class App {
  constructor() {
    this.ui = new UI();
    this.gameplay = new Gameplay();
    this.sound = document.querySelector("audio");
    this.enteredKeys = [];
  }

  events = () => {
    this.ui.generateText();
    window.addEventListener("keypress", (e) => {
      // play key sound
      this.sound.play();
      // update entered keys to compare with text
      this.enteredKeys.push(e.key);
      let textSpans = text.querySelectorAll("span");
      //  handle inputs - when sentence completes
      //  generate new text
      const gameplay = new Gameplay();
      let done = gameplay.handleInputLogic(this.enteredKeys, textSpans);
      if (done) this.ui.generateText();
    });
  };
}

window.addEventListener("load", () => {
  const app = new App();
  app.events();
});
