// Constants
const DUNGEON_BIOMES = ['Cave', 'Crypt', 'Mine', 'Swamp', 'Castle', 'Forest', 'Cavern', 'Wasteland'];

// Simplified enemy and item data
const ENEMIES = {
    'Cave': [{ name: 'Bat' }, { name: 'Goblin' }],
    'Crypt': [{ name: 'Skeleton' }, { name: 'Zombie' }],
    // Add more for other biomes...
};

const ITEMS = {
    'Cave': [{ name: 'Torch' }, { name: 'Rusty Sword' }],
    'Crypt': [{ name: 'Bone' }, { name: 'Ancient Coin' }],
    // Add more for other biomes...
};

class Character {
    constructor(userId, name, level, hp, mp, strength, dexterity, intelligence) {
        this.userId = userId;
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.mp = mp;
        this.strength = strength;
        this.dexterity = dexterity;
        this.intelligence = intelligence;
        this.inventory = [];
        this.dungeonMaps = [];
        this.location = 'Town';
    }

    toJSON() {
        return {
            userId: this.userId,
            name: this.name,
            level: this.level,
            hp: this.hp,
            mp: this.mp,
            strength: this.strength,
            dexterity: this.dexterity,
            intelligence: this.intelligence,
            inventory: this.inventory,
            dungeonMaps: this.dungeonMaps,
            location: this.location
        };
    }

    static fromJSON(json) {
        const character = new Character(
            json.userId, json.name, json.level, json.hp, json.mp,
            json.strength, json.dexterity, json.intelligence
        );
        character.inventory = json.inventory;
        character.dungeonMaps = json.dungeonMaps;
        character.location = json.location;
        return character;
    }
}

class DungeonRoom {
    constructor(biome, position) {
        this.biome = biome;
        this.position = position;
        this.description = this.generateDescription();
        this.enemies = this.populateEnemies();
        this.loot = this.populateLoot();
    }

    generateDescription() {
        const descriptions = {
            'Cave': [
                'You enter a dark cave with stalactites hanging from the ceiling.',
                'The cave walls are damp and the air feels heavy.'
            ],
            // Add more descriptions for other biomes...
        };
        return descriptions[this.biome][Math.floor(Math.random() * descriptions[this.biome].length)];
    }

    populateEnemies() {
        if (Math.random() < 0.6) {
            const numEnemies = Math.floor(Math.random() * 3) + 1;
            return Array(numEnemies).fill().map(() => {
                const enemyData = ENEMIES[this.biome][Math.floor(Math.random() * ENEMIES[this.biome].length)];
                return enemyData.name;
            });
        }
        return [];
    }

    populateLoot() {
        if (Math.random() < 0.4) {
            const numItems = Math.floor(Math.random() * 2) + 1;
            return Array(numItems).fill().map(() => {
                const itemData = ITEMS[this.biome][Math.floor(Math.random() * ITEMS[this.biome].length)];
                return itemData.name;
            });
        }
        return [];
    }
}

function generateDungeonMap(maxWidth, maxHeight, biome, minWidth = 0, minHeight = 0) {
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    const dungeonMap = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            if (Math.random() < 0.7) {
                row.push(new DungeonRoom(biome, [x, y]));
            } else {
                row.push(null);
            }
        }
        dungeonMap.push(row);
    }

    // Ensure the starting room is not null
    while (dungeonMap[0][0] === null) {
        dungeonMap[0][0] = new DungeonRoom(biome, [0, 0]);
    }

    return dungeonMap;
}

class Game {
    constructor() {
        this.outputElement = document.getElementById('gameOutput');
        this.inputElement = document.getElementById('commandInput');
        this.characters = {};
        this.currentUserId = 'testUser';
        this.dungeonMaps = {};
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    init() {
        this.loadCharacters();
        this.display_output("Welcome to the RPG game! Type '/enter' to start.");
        this.initializeEventListeners();
    }

    display_output(message) {
        const gameOutput = document.getElementById('gameOutput');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        gameOutput.appendChild(newMessage);
        gameOutput.scrollTop = gameOutput.scrollHeight;
    }

    processCommand(command) {
        const [cmd, ...args] = command.split(' ');
        switch (cmd.toLowerCase()) {
            case '/enter':
                this.enterGame();
                break;
            case '/rename':
                this.rename(args.join(' '));
                break;
            case '/retire':
                this.retire();
                break;
            case '/explore':
                this.explore(args[0]);
                break;
            case '/current_biome':
                this.currentBiome();
                break;
            case '/show_map':
                this.showMap();
                break;
            case '/go_left':
            case '/move_left':
            case '/left':
                this.movePlayer(-1, 0);
                break;
            case '/go_right':
            case '/move_right':
            case '/right':
                this.movePlayer(1, 0);
                break;
            case '/go_up':
            case '/move_up':
            case '/up':
                this.movePlayer(0, -1);
                break;
            case '/go_down':
            case '/move_down':
            case '/down':
                this.movePlayer(0, 1);
                break;
            case '/fight':
                this.fight(args.join(' '));
                break;
            case '/character_info':
                this.characterInfo();
                break;
            case '/item':
            case '/pickup':
                this.item(args.join(' '));
                break;
            case '/leave_dungeon':
            case '/leave':
                this.leaveDungeon();
                break;
            default:
                this.display_output('Unknown command');
        }
        this.draw();
    }

    loadCharacters() {
        const savedCharacters = localStorage.getItem('characters');
        if (savedCharacters) {
            const parsedCharacters = JSON.parse(savedCharacters);
            for (const [userId, charData] of Object.entries(parsedCharacters)) {
                this.characters[userId] = Character.fromJSON(charData);
            }
        }
    }

    saveCharacters() {
        const charactersToSave = {};
        for (const [userId, character] of Object.entries(this.characters)) {
            charactersToSave[userId] = character.toJSON();
        }
        localStorage.setItem('characters', JSON.stringify(charactersToSave));
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Set the fill style to white for text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px VCR';
        
        // Draw your game state here
        // For example:
        this.ctx.fillText('RPG Game', 10, 30);
        
        // If you have a character, draw their info
        if (this.characters[this.currentUserId]) {
            const character = this.characters[this.currentUserId];
            this.ctx.fillText(`Name: ${character.name}`, 10, 60);
            this.ctx.fillText(`Level: ${character.level}`, 10, 90);
            this.ctx.fillText(`HP: ${character.hp}`, 10, 120);
            this.ctx.fillText(`Location: ${character.location}`, 10, 150);
        }
    }

    drawDungeonMap() {
        const dungeonData = this.dungeonMaps[this.currentUserId];
        const map = dungeonData.map;
        const position = dungeonData.position;
        const cellSize = 30;
        const startX = 300;
        const startY = 50;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x]) {
                    this.ctx.fillStyle = x === position[0] && y === position[1] ? 'red' : 'gray';
                    this.ctx.fillRect(startX + x * cellSize, startY + y * cellSize, cellSize - 2, cellSize - 2);
                }
            }
        }
    }

    enterGame() {
        if (!this.characters[this.currentUserId]) {
            this.characters[this.currentUserId] = new Character(this.currentUserId, 'NewPlayer', 1, 100, 50, 10, 10, 10);
            this.saveCharacters();
            this.display_output("Welcome, new player! You've entered the game.");
        } else {
            this.display_output(`Welcome back, ${this.characters[this.currentUserId].name}!`);
        }
        this.display_output("Type '/help' for a list of commands.");
    }

    displayHelp() {
        const commands = [
            "/enter - Enter the game",
            "/rename [name] - Rename your character",
            "/explore - Explore a dungeon",
            "/left, /right, /up, /down - Move in a dungeon",
            "/leave_dungeon - Leave the current dungeon",
            "/help - Display this help message"
        ];
        this.display_output("Available commands:");
        commands.forEach(cmd => this.display_output(cmd));
    }

    renameCharacter(newName) {
        if (this.characters[this.currentUserId]) {
            this.characters[this.currentUserId].name = newName;
            this.saveCharacters();
            console.log(`Renamed to ${newName}`);
        } else {
            console.log('Enter the game first');
        }
    }

    explore(dungeonIndex) {
        const character = this.characters[this.currentUserId];
        if (!character) {
            console.log('Enter the game first');
            return;
        }

        const biome = DUNGEON_BIOMES[Math.floor(Math.random() * DUNGEON_BIOMES.length)];
        const dungeonMap = generateDungeonMap(5, 5, biome);
        this.dungeonMaps[this.currentUserId] = {
            map: dungeonMap,
            position: [0, 0],
            visitedRooms: new Set(['0,0'])
        };
        character.location = biome;
        this.saveCharacters();
        console.log(`Exploring a ${biome} dungeon`);
    }

    movePlayer(direction) {
        if (!this.dungeonMaps[this.currentUserId]) {
            console.log('You are not in a dungeon');
            return;
        }

        const dungeonData = this.dungeonMaps[this.currentUserId];
        let [x, y] = dungeonData.position;

        switch (direction.toLowerCase()) {
            case 'left': x--; break;
            case 'right': x++; break;
            case 'up': y--; break;
            case 'down': y++; break;
            default: console.log('Invalid direction'); return;
        }

        if (x < 0 || y < 0 || y >= dungeonData.map.length || x >= dungeonData.map[0].length || !dungeonData.map[y][x]) {
            console.log('Cannot move in that direction');
            return;
        }

        dungeonData.position = [x, y];
        dungeonData.visitedRooms.add(`${x},${y}`);
        const room = dungeonData.map[y][x];
        console.log(room.description);
        if (room.enemies.length > 0) {
            console.log(`Enemies: ${room.enemies.join(', ')}`);
        }
        if (room.loot.length > 0) {
            console.log(`Loot: ${room.loot.join(', ')}`);
        }
    }

    leaveDungeon() {
        if (!this.dungeonMaps[this.currentUserId]) {
            console.log('You are not in a dungeon');
            return;
        }

        delete this.dungeonMaps[this.currentUserId];
        this.characters[this.currentUserId].location = 'Town';
        this.saveCharacters();
        console.log('You have left the dungeon and returned to town');
    }

    initializeEventListeners() {
        const input = document.getElementById('commandInput');
        const button = document.getElementById('submitButton');
    
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.processCommand(input.value);
                input.value = '';
            }
        });
    
        button.addEventListener('click', () => {
            this.processCommand(input.value);
            input.value = '';
        });
    }
}

const game = new Game();
game.init();

function processCommand() {
    const commandInput = document.getElementById('commandInput');
    game.processCommand(commandInput.value);
    commandInput.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    var input = document.getElementById('commandInput');
    var button = document.getElementById('submitButton');

    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            button.click();
        }
    });
});