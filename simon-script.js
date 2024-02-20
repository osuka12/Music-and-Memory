// TODO: Reporting score doesn't work right.
const SimonGame = {

    gameFrame:   document.getElementById("pattern-memory"),

    sequence:  [],
    currentSequenceIndex : 0,
    userSequence:  [],
    score: 0,
    ready: false,


    getElementById: function ( id ) {
        return document.querySelectorAll(`#pattern-memory #${id}`)[0];
    },


    buttonElems: {},


    audioContext:  new AudioContext,

    playNote: function (color) {

        console.log(`Playing note ${color}`);
        const freqs  = {
            'red': 200,
            'green': 250,
            'yellow': 300,
            'blue': 400,
            'bad': 100,

        };
        oscillator = this.audioContext.createOscillator();
        oscillator.frequency.value = freqs[color];
        oscillator.connect(this.audioContext.destination);
        oscillator.start(0);
        setTimeout( (oscillator) => {
            oscillator.stop(0);
        }, 300, oscillator);
    },

    startGame: function () {
        console.log("Starting Game");

        startContainer = this.getElementById("start-container");
        gameContainer = this.getElementById("game-container");
        startContainer.classList.remove('visible');
        startContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        gameContainer.classList.add('visible');

        this.sequence = [];
        this.currentSequenceIndex = 0;
        this.userSequence = [];
        this.score = 0;
        this.extendSequence();
        this.playSequence();
    },



    extendSequence: function () {
        const randomColor = ["red", "green", "yellow", "blue"][Math.floor(Math.random() * 4)];
        this.sequence.push(randomColor);
        console.log(this.sequence);
    },

    playSequence: function () {

        Object.values(this.buttonElems).forEach((button) => button.classList.remove('active'));


        if (this.currentSequenceIndex >= (this.sequence.length - 1)) {
            this.ready = true;
            userSequence = [];
        } else {
            this.ready = false;
        }

        if (this.currentSequenceIndex < this.sequence.length) {
            const currentColor = this.sequence[this.currentSequenceIndex];
            const button = this.buttonElems[currentColor];
            button.classList.add("active");
            this.playNote(currentColor);
            setTimeout(() => {
                Object.values(this.buttonElems).forEach((button) => button.classList.remove('active'));
                this.currentSequenceIndex++;
                setTimeout(() => this.playSequence(), 400); // Delay between colors
            }, 400);
        } else {
            // User's turn to repeat the sequence
            console.log("Users turn");
        }
    },

    showStartButton: function () {
        this.startButton.classList.add('visible');
        this.startButton.classList.remove('hidden');
    },

    hideStartButton: function () {
        this.startButton.classList.add('hidden');
        this.startButton.classList.remove('visible');

    },


    showGamePanel: function () {
        const gamePanel = this.getElementById('game-body');
        gamePanel.classList.add('visible');
        gamePanel.classList.remove('hidden');
    },

    hideGamePanel: function () {
        const gamePanel = this.getElementById('game-body');
        gamePanel.classList.add('hidden');
        gamePanel.classList.remove('visible');
    },


    handleButtonClick: function (event) {

        if (! this.ready) {
            console.log('Skipping button click');
            return;
        }
        const clickedColor = event.target.id;
        SimonGame.playNote(clickedColor); // FIXME: 'this' is bound wrong, so i reference SimonGame
        console.log(`clicked ${clickedColor}`);
        this.userSequence.push(clickedColor);

        const expectedColor = this.sequence[this.userSequence.length - 1];

        if (clickedColor !== expectedColor) {
            this.gameOver();
        } else if (this.userSequence.length === this.sequence.length) {
            console.log("Done!");
            this.score++;
            setTimeout(() => this.continueGame(),  1500);
        }
    },

    handleMouseDown: function (event) {
        event.target.classList.add("active");
    },

    handleMouseUp: function (event) {
        event.target.classList.remove("active");
    },

    handleStartClick: function (event) {
        this.startGame();
        this.showGamePanel();
        this.hideStartButton();
    },

    continueGame: function () {
        // Start back at the beginning with a new sequence.

        this.currentSequenceIndex = 0;
        this.extendSequence();
        this.userSequence = [];
        this.playSequence(); // Show the next sequence
    },



    gameOver: function () {
        this.playNote("bad");

        const startContainer = this.getElementById("start-container");
        const gameContainer = this.getElementById("game-container");
        startContainer.classList.remove('hidden');
        startContainer.classList.add('visible');
        gameContainer.classList.remove('visible');
        gameContainer.classList.add('hidden');
        // alert("Game Over! Your score is: " + score);
        // startGame(); // Restart the game

        console.log(this.recordScore);
        if (this.recordScore) {
            this.recordScore('simon', this.score);
        }
    },

    show:  function () {
        document.getElementById('pattern-memory').classList.add("visible");
        document.getElementById('pattern-memory').classList.remove("hidden");
        this.showStartButton();
    },

    hide:  function () {
        document.getElementById('pattern-memory').classList.add("hidden");
        document.getElementById('pattern-memory').classList.remove("visible");
    },

    setup: function () {

        this.buttonElems = {
            "red": this.getElementById("red"),
            "green": this.getElementById("green"),
            "yellow": this.getElementById("yellow"),
            "blue": this.getElementById("blue"),
        };

        const buttons =this.gameFrame.querySelectorAll("#pattern-memory .button");

        buttons.forEach((button) => button.addEventListener("click", this.handleButtonClick.bind(this)));
        buttons.forEach((button) => button.addEventListener("mouseup", this.handleMouseUp.bind(this)));
        buttons.forEach((button) => button.addEventListener("mousedown", this.handleMouseDown.bind(this)));

        this.startButton = this.getElementById("start");
        this.startButton.addEventListener('click', this.handleStartClick.bind(this));
    },

};

SimonGame.setup();

// startGame(); // Start the game on page load
