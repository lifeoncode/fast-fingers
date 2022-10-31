// UI logic
export class UI {
  constructor() {
    this.textContainer = document.querySelector("#text");
    this.scoreContainer = document.querySelector("#score");
    this.sound = document.querySelector("audio");
    this.stats = new Statistics();
  }

  playKeySound = () => {
    this.sound.play();
  };

  generateText = async () => {
    const res = await fetch("https://api.chucknorris.io/jokes/random");
    const resData = await res.json();
    let joke = resData.value.split("");

    text.innerHTML = "";
    for (let char of joke) {
      text.innerHTML += `<span>${char}</span>`;
    }
  };

  correctLetter = (letter) => {
    letter.className = "correct";
    this.updateScore();
  };

  wrongLetter = (letter) => {
    letter.className = "wrong";
  };

  updateScore = () => {
    try {
      let stats = this.stats.getStats();
      this.scoreContainer.innerHTML = `
      <span><i class="fas fa-check"></i> ${stats.score[0]}</span>
      <span><i class="fas fa-close"></i> ${stats.score[1]}</span>`;
    } catch (err) {
      console.log(err);
    }
  };
}

// game logic
export class Gameplay {
  constructor() {
    this.ui = new UI();
    this.stats = new Statistics();
  }

  handleInputLogic = (enteredKeys, text) => {
    text.forEach((char, index) => {
      let charEntered = enteredKeys[index];

      if (charEntered == null) {
        char.className = "";
      } else if (charEntered === char.innerText) {
        this.ui.correctLetter(char);
      } else {
        this.ui.wrongLetter(char);
      }
    });

    // when the end of a sentence is reached
    if (enteredKeys.length === text.length) {
      for (let span of text) {
        if (span.className === "correct") {
          this.stats.incrementScore("correct");
        } else if (span.className === "wrong") {
          this.stats.incrementScore("wrong");
        }
      }
      this.ui.updateScore();
      enteredKeys.length = 0;
      return true;
    }
  };
}

// game statistics - the numbers
export class Statistics {
  constructor() {
    this.correctCount = 0;
    this.wrongCount = 0;
  }

  incrementScore = (count) => {
    if (count === "correct") {
      this.correctCount++;
    } else if (count === "wrong") {
      this.wrongCount++;
    }
    this.saveScore();
  };

  statsFound = () => {
    if (localStorage.getItem("fastfingers-stats") === null) return false;
    return true;
  };

  getStats = () => {
    let stats = JSON.parse(localStorage.getItem("fastfingers-stats"));
    return stats;
  };

  saveScore = () => {
    let stats = this.getStats();
    stats.score = [this.correctCount, this.wrongCount];
    localStorage.setItem("fastfingers-stats", JSON.stringify(stats));
  };
}
