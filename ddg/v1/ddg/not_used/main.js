class Game {
    constructor() {
        this.uiManager = new UIManager();
        this.gameState = new GameState();
        this.dungeonGenerator = new DungeonGenerator();
        this.commandProcessor = new CommandProcessor(this);
        this.init();
    }

    init() {
        this.uiManager.initializeUI();
        this.setupEventListeners();
        this.uiManager.display("Welcome to the RPG game! Type '/enter' to start.");
        this.uiManager.displayHelp();
    }

    setupEventListeners() {
        const inputElement = document.getElementById('commandInput');
        const submitButton = document.getElementById('submitButton');

        inputElement.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.processCommand();
            }
        });

        submitButton.addEventListener('click', () => {
            this.processCommand();
        });
    }

    processCommand() {
        const inputElement = document.getElementById('commandInput');
        const command = inputElement.value.trim();
        inputElement.value = '';

        if (command === '') return;

        const result = this.commandProcessor.processCommand(command);
        this.uiManager.display(result.message);

        if (result.updateUI) {
            this.updateGameState();
        }
    }

    updateGameState() {
        const character = this.gameState.getCurrentCharacter();
        if (character) {
            this.uiManager.updateCharacterInfo(character);
            this.uiManager.updateMap(this.gameState.currentLocation, this.gameState.dungeonMaps[this.gameState.currentUserId]);
        }
    }

    display(message, rightSide = false) {
        this.uiManager.display(message, rightSide);
    }
}

// Initialize the game when the window loads
window.onload = () => {
    const game = new Game();
};