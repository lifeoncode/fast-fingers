// UI logic
export class UI {
  constructor() {
    this.textContainer = document.querySelector("#text");
    this.scoreContainer = document.querySelector("#score");
    this.sound = document.querySelector("audio");
    this.body = document.body;
    this.themeToggle = document.querySelector("#theme-toggle");
    this.themeBtn = this.themeToggle.querySelector(".toggle-btn");
    this.stats = new Statistics();
  }

  playKeySound = () => {
    this.sound.play();
  };

  generateText = async () => {
    const res = await fetch(
      "https://jade-wicked-hummingbird.cyclic.app/random"
    );
    const resData = await res.json();
    let joke = resData.message.split("");

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
      let highScore = this.stats.getHighScore();
      this.scoreContainer.innerHTML = `
      <span>${highScore[0]}<i class="fas fa-check"></i></span>
      <span>${highScore[1]}<i class="fas fa-close"></i></span>`;
    } catch (err) {
      console.log(err);
    }
  };

  displayScore = () => {
    let score = JSON.parse(localStorage.getItem("app-high-score"));
    let scoreOutput = `
    <div class="score-display">
      <h3>your time is up</h3>
      <span><i class="fas fa-check"></i> ${score[0]} correct</span>
      <span><i class="fas fa-close"></i> ${score[1]} incorrect</span>
      <br><br>
      <button id="ok">ok</button>
    </div>
    `;
    this.textContainer.parentElement.innerHTML = scoreOutput;
  };

  // theme
  lightTheme() {
    this.body.className = "light";
    localStorage.setItem("app-theme", JSON.stringify("light"));
    this.themeBtn.innerHTML = '<i class="lni lni-sun"></i>';
  }

  darkTheme() {
    this.body.className = "dark";
    localStorage.setItem("app-theme", JSON.stringify("dark"));
    this.themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
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

  getHighScore = () => {
    let highScore = JSON.parse(localStorage.getItem("app-high-score"));
    return highScore;
  };

  saveScore = () => {
    let highScore = this.getHighScore();
    if (this.correctCount > highScore[0]) {
      let newHighScore = [this.correctCount, this.wrongCount];
      localStorage.setItem("app-high-score", JSON.stringify(newHighScore));
    }
  };
}
