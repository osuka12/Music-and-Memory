
const DigitGame = {

    displayTime: 3,  // Number of seconds to display digits
    numDigits: 1,
    correctCount:  0,
    correctDigits: [],

    getElementById: function ( id ) {
        return document.querySelectorAll(`#digit-memory #${id}`)[0];
    },

    generateNumbers: function () {
        // const numDigits = Math.floor(Math.random() * 8) + 1;
        const digits = [];
        for (let i = 0; i < this.numDigits; i++) {
            digits.push(Math.floor(Math.random() * 10));
        }
        this.getElementById("digits").textContent = digits.join(" ");
        this.hideAnswerPanel();
        // this.getElementById("answer-block").style.display = "none";
        // this.getElementById("digits").style.display = "block";
        this.showDigitsPanel();
        return digits;
    },


    startGame: function () {
        this.numDigits = 1;
        this.score = 0;
        this.continueGame();
    },

    continueGame: function () {
        this.correctDigits = this.generateNumbers();
        setTimeout(() => {
            const responsePanel = this.getElementById("response");
            this.hideDigitsPanel();
            this.showAnswerPanel();
            console.log(responsePanel);
            responsePanel.value = "";
            responsePanel.focus();
        }, this.displayTime * 1000);
    },

    checkAnswer: function () {
        const userAnswer = this.getElementById("response").value;
        correctCount = 0;
        for (let i = 0, j = 0; i < userAnswer.length && j  < this.correctDigits.length; i++) {
            /* console.log(i, correctDigits[j], userAnswer[i]); */
            const d = parseFloat(userAnswer[i]);
            if (!isNaN(d)) {
                if (userAnswer[i] === this.correctDigits[j].toString()) {
                    correctCount++;
                }
                j++;
            }
        }

        // this.getElementById("result").textContent = `You got ${correctCount} digits correct!`;

        if (correctCount < this.correctDigits.length) {
            console.log("Not all correct");
            this.showStartButton();
            this.hideAnswerPanel();
            if (this.recordScore) {
                this.recordScore("digits", this.score);
            }
        } else {
            this.score++;
            this.numDigits++;
            this.continueGame(); // Start the next round
        }
    },

    handleStartClick: function () {
        this.hideStartButton();
        this.startGame();
    },


    showStartButton: function () {

        this.startButton.classList.add('visible');
        this.startButton.classList.remove('hidden');
    },

    hideStartButton: function () {
        this.startButton.classList.add('hidden');
        this.startButton.classList.remove('visible');

    },

    showAnswerPanel: function () {
        this.answerPanel.classList.add('visible');
        this.answerPanel.classList.remove('hidden');
    },

    hideAnswerPanel: function () {
        this.answerPanel.classList.add('hidden');
        this.answerPanel.classList.remove('visible');
    },

    showDigitsPanel: function () {
        this.digitsPanel.classList.add('visible');
        this.digitsPanel.classList.remove('hidden');
    },

    hideDigitsPanel: function () {
        this.digitsPanel.classList.add('hidden');
        this.digitsPanel.classList.remove('visible');
    },

    show:  function () {
        document.getElementById('digit-memory').classList.add("visible");
        document.getElementById('digit-memory').classList.remove("hidden");
    },

    hide:  function () {
        document.getElementById('digit-memory').classList.add("hidden");
        document.getElementById('digit-memory').classList.remove("visible");
    },


    setup: function() {

        // Get the input field
        var input = this.getElementById("response");

        // Execute a function when the user presses a key on the keyboard
        input.addEventListener("keypress", function(event) {
            // If the user presses the "Enter" key on the keyboard
            if (event.key === "Enter") {
                // Cancel the default action, if needed
                event.preventDefault();
                // Trigger the button element with a click
                DigitGame.checkAnswer();
                // this.getElementById("btnCheckAnswer").click();
            }
        });

        // Setup the start button
        this.startButton = this.getElementById('start-button');
        this.startButton.addEventListener("click", this.handleStartClick.bind(this));


        this.answerPanel = this.getElementById('answer-block');
        this.digitsPanel = this.getElementById('digits');

    }
};

DigitGame.setup();
