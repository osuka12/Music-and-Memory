

const GridGame = {

    showDelay: 1000,

    gridSize:  16,
    blackSquares:  [], // Array to store the positions of black squares
    userSquares: [],

    numBlackSquares:  2,
    score: 0,


    ready: false,

    getElementById: function ( id ) {
        return document.querySelectorAll(`#grid-memory #${id}`)[0];
        // return this.gridContainer.querySelectorAll(`#${id}`)[0];
    },

    getGridElement: function (i){
        return this.gridContainer.querySelectorAll(`[data-num="${i}"]`)[0];
    },



    generateBlackSquares: function () {
        this.blackSquares = []; // Clear previous black squares
        for (let i = 0; i < this.numBlackSquares; i++) {
            while (true) {
                const ix = Math.floor(Math.random() * this.gridSize);

                if (!this.blackSquares.includes(ix)) {
                    this.blackSquares.push(ix);
                    break; // Found a unique black square position
                }
            }
        }
        console.log(this.blackSquares);
    },

    showBlackSquares: function () {
        this.hideBlackSquares();

        for (let i=0; i < this.gridSize; i++) {
            if (this.blackSquares.includes(i)) {
                console.log(`Enable square ${i}`);
                const elem = this.getGridElement(i);
                console.log(elem);
                elem.classList.add("black");
            }
        }
    },


    hideBlackSquares: function () {
        console.log('hiding black squares');
        const blackCells = this.gridContainer.querySelectorAll(".button");
        blackCells.forEach((cell) => cell.classList.remove("black"));
        blackCells.forEach((cell) => cell.classList.remove("correct"));
        blackCells.forEach((cell) => cell.classList.remove("extra"));
        blackCells.forEach((cell) => cell.classList.remove("missing"));
    },


    handleCellClick: function (event) {
        if (!this.ready){
            console.log('not ready');
            return;
        }
        const cellElement = event.target;
        const id = parseInt(cellElement.getAttribute('data-num'));

        const idx = this.userSquares.indexOf(id);

        if (idx !== -1) {
            cellElement.classList.remove('black');
            this.userSquares.splice(idx, 1);
        } else {
            cellElement.classList.add('black');
            this.userSquares.push(id);
        }
    },

    handleDone: function (event) {
        const correct = this.scoreGame();
        if (correct) {
            console.log("All correct");
            this.numBlackSquares++;
            setTimeout(() => {this.continueGame();}, 1000);
        } else {
            if (this.recordScore) {
                this.recordScore("grid", this.score);
            }
            setTimeout(() => {
                this.showStartButton();
                this.hideGamePanel();
            }, 2000);
        }
    },

    handleStart: function(event) {
        // Hide the start button
        this.hideStartButton();
        this.showGamePanel();

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




    startGame: function () {
        this.numBlackSquares = 2;
        this.userSquares = [];
        this.continueGame();
        this.correct = 0;
        this.ready=false;
    },

    continueGame: function () {
        this.userSquares = [];
        this.generateBlackSquares();
        this.showBlackSquares();
        setTimeout(() =>{
            this.hideBlackSquares();
            this.ready = true;
        }, this.showDelay);
    },


    scoreGame: function () {
        let correct = true;
        this.hideBlackSquares();
        for (let i = 0; i < this.gridSize; i++) {
            const elem = this.getGridElement(i);
            if (this.blackSquares.includes(i) && this.userSquares.includes(i)) {
                elem.classList.add("correct");
            } else if (this.blackSquares.includes(i) && ! this.userSquares.includes(i)) {
                elem.classList.add("missing");
                correct  = false;
            } else if (! this.blackSquares.includes(i) && this.userSquares.includes(i)) {
                elem.classList.add("extra");
                correct  = false;
            }
        }
        if (correct) {
            this.score = this.blackSquares.length;
        }
        return correct;
    },


    show:  function () {
        document.getElementById('grid-memory').classList.add("visible");
        document.getElementById('grid-memory').classList.remove("hidden");
    },

    hide:  function () {
        document.getElementById('grid-memory').classList.add("hidden");
        document.getElementById('grid-memory').classList.remove("visible");
    },

    setup: function ( id ) {
        this.gridContainer = this.getElementById("grid-container");
        console.log(this.gridContainer);
        this.doneButton = this.getElementById("done-button");
        this.resultsElement = document.getElementById("results");

        const squares = this.gridContainer.querySelectorAll(".button");
        squares.forEach((cell) => cell.addEventListener("click", this.handleCellClick.bind(this)));

        this.getElementById('done-button').addEventListener("click", this.handleDone.bind(this));

        this.startButton = this.getElementById('start-button');
        this.startButton.addEventListener("click", this.handleStart.bind(this));
    },


};


GridGame.setup();












// startGame();
// Game setup
//createGrid();
// generateBlackSquares();
// showBlackSquares();
// setTimeout(() => hideBlackSquares(), 200)
