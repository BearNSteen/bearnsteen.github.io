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
        this.rightOutputElement = document.getElementById('rightOutput');
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

    display_output(message, rightSide = false) {
        const outputElement = rightSide ? document.getElementById('rightOutput') : document.getElementById('gameOutput');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        outputElement.appendChild(newMessage);
        outputElement.scrollTop = outputElement.scrollHeight;
    }

    processCommand(command) {
        const [cmd, ...args] = command.split(' ');
        switch (cmd.toLowerCase()) {
            case '/enter':
                this.enterGame();
                break;
            case '/rename':
                this.renameCharacter(args.join(' '));
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
                this.movePlayer('left');
                break;
            case '/go_right':
            case '/move_right':
            case '/right':
                this.movePlayer('right');
                break;
            case '/go_up':
            case '/move_up':
            case '/up':
                this.movePlayer('up');
                break;
            case '/go_down':
            case '/move_down':
            case '/down':
                this.movePlayer('down');
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
                this.leaveDungeon();
                break;
            case '/list_dungeon_maps':
            case '/dungeons':
                this.listDungeonMaps(args[0]);
                break;
            case '/upstairs':
                this.goUpstairs();
                break;
            case '/downstairs':
                this.goDownstairs();
                break;
            case '/help':
                this.displayHelp();
                break;
            case '/guild':
                this.guildInteraction();
                break;
            case '/leave':
                this.leaveLocation();
                break;
            case '/get_map':
                this.getMap();
                break;
            case '/clear_maps':
                this.clearDungeonMaps();
                break;
            case '/show_first_map':
                this.showFirstMap();
                break;
            default:
                this.display_output('Unknown command');
        }
        this.draw();
        this.updateRightSide();
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
            this.display_output("Welcome, new player! You've entered the game.");
        } else {
            this.display_output(`Welcome back, ${this.characters[this.currentUserId].name}!`);
        }
    
        // Always set the character's location to "Town" when entering the game
        this.characters[this.currentUserId].location = "Town";
        this.saveCharacters();
    
        this.display_output("You find yourself in the town square.");
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
        if (!this.characters[this.currentUserId]) {
            this.display_output('Enter the game first');
            return;
        }
    
        if (!newName || newName.trim() === '') {``
            this.display_output('Please provide a new name. Usage: /rename [new name]');
            return;
        }
    
        newName = newName.trim();
        this.characters[this.currentUserId].name = newName;
        this.saveCharacters();
        this.display_output(`You have renamed your character to ${newName}.`);
    }

    explore(dungeonIndex) {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (!character.dungeonMaps || character.dungeonMaps.length === 0) {
            this.display_output("You don't have any dungeon maps. Visit the guild to get one.");
            return;
        }
    
        if (dungeonIndex === undefined) {
            this.display_output("Please specify a dungeon map index. Usage: /explore [dungeon_index]");
            return;
        }
    
        dungeonIndex = parseInt(dungeonIndex);
        if (isNaN(dungeonIndex) || dungeonIndex < 1 || dungeonIndex > character.dungeonMaps.length) {
            this.display_output(`Invalid dungeon map index. Please enter a number between 1 and ${character.dungeonMaps.length}.`);
            return;
        }
    
        const dungeonMap = character.dungeonMaps[dungeonIndex - 1];
        
        // Check if the dungeon map is valid
        if (!dungeonMap || !Array.isArray(dungeonMap) || dungeonMap.length === 0 || !Array.isArray(dungeonMap[0])) {
            this.display_output("Error: Invalid dungeon map structure.");
            return;
        }
    
        this.dungeonMaps[userId] = {
            map: dungeonMap,
            position: [0, 0],
            visitedRooms: new Set(['0,0'])
        };

        this.addAdjacentWallsToVisited(this.dungeonMaps[userId], 0, 0);
    
        const currentRoom = dungeonMap[0][0];
        
        if (!currentRoom) {
            this.display_output("Error: Starting room is not defined.");
            console.log("Dungeon map:", dungeonMap);
            return;
        }
    
        character.location = currentRoom.biome;
        this.saveCharacters();
    
        let roomInfo = `You are currently in a ${currentRoom.biome}. ${currentRoom.description}`;
        if (currentRoom.enemies && currentRoom.enemies.length > 0) {
            const enemyInfo = "Enemies: " + currentRoom.enemies.map((enemy, i) => `[${i+1}] ${enemy}`).join(", ");
            roomInfo += "\n" + enemyInfo;
        }
        if (currentRoom.loot && currentRoom.loot.length > 0) {
            const lootInfo = "Loot: " + currentRoom.loot.map((item, i) => `[${i+1}] ${item}`).join(", ");
            roomInfo += "\n" + lootInfo;
        }
        this.display_output(roomInfo);
    
        console.log("Initial dungeon state:", this.dungeonMaps[userId]);
    }

    movePlayer(direction) {
        if (!this.dungeonMaps[this.currentUserId]) {
            this.display_output('You are not in a dungeon');
            return;
        }
    
        const dungeonData = this.dungeonMaps[this.currentUserId];
        let [x, y] = dungeonData.position;
    
        console.log(`Current position: [${x}, ${y}]`);
    
        let dx = 0, dy = 0;
    
        if (typeof direction === 'string') {
            switch (direction.toLowerCase()) {
                case 'left': dx = -1; break;
                case 'right': dx = 1; break;
                case 'up': dy = -1; break;
                case 'down': dy = 1; break;
                default: 
                    this.display_output('Invalid direction');
                    return;
            }
        } else if (Array.isArray(direction) && direction.length === 2) {
            [dx, dy] = direction;
        } else {
            this.display_output('Invalid direction');
            return;
        }
    
        const newX = x + dx;
        const newY = y + dy;
    
        console.log(`Attempting to move to: [${newX}, ${newY}]`);
    
        if (newY < 0 || newY >= dungeonData.map.length || newX < 0 || newX >= dungeonData.map[0].length) {
            this.display_output('You\'ve reached the edge of the dungeon. You can\'t go that way.');
            return;
        }
    
        if (!dungeonData.map[newY][newX]) {
            this.display_output('There\'s no path in that direction. You see a solid wall.');
            return;
        }
    
        dungeonData.position = [newX, newY];
        dungeonData.visitedRooms.add(`${newX},${newY}`);

        // Add this new function call
        this.addAdjacentWallsToVisited(dungeonData, newX, newY);
        const room = dungeonData.map[newY][newX];
        this.display_output(`You move ${direction}.\n${room.description}`);
        if (room.enemies.length > 0) {
            this.display_output(`Enemies: ${room.enemies.join(', ')}`);
        }
        if (room.loot.length > 0) {
            this.display_output(`Loot: ${room.loot.join(', ')}`);
        }
    
        console.log(`Moved to: [${newX}, ${newY}]`);
    
        // Display available directions
        this.displayAvailableDirections(newX, newY, dungeonData.map);
    }

    addAdjacentWallsToVisited(dungeonData, x, y) {
        const adjacentPositions = [
            [x-1, y], [x+1, y], [x, y-1], [x, y+1]
        ];
    
        adjacentPositions.forEach(([adjX, adjY]) => {
            if (adjX >= 0 && adjX < dungeonData.map[0].length &&
                adjY >= 0 && adjY < dungeonData.map.length) {
                if (dungeonData.map[adjY][adjX] === null) {
                    dungeonData.visitedRooms.add(`${adjX},${adjY}`);
                }
            }
        });
    }

    displayAvailableDirections(x, y, map) {
        const directions = [];
        if (y > 0 && map[y-1][x]) directions.push('up');
        if (y < map.length - 1 && map[y+1][x]) directions.push('down');
        if (x > 0 && map[y][x-1]) directions.push('left');
        if (x < map[0].length - 1 && map[y][x+1]) directions.push('right');
    
        if (directions.length > 0) {
            this.display_output(`You can go: ${directions.join(', ')}`);
        } else {
            this.display_output('There are no visible exits from this room.');
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

    leaveLocation() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (character.location === "guild_lobby") {
            character.location = "Town";
            this.saveCharacters();
            this.display_output("You leave the guild and return to town.");
        } else if (character.location === "Town") {
            this.display_output("You are already in town.");
        } else {
            // Handle other locations as needed
            this.display_output("You can't leave your current location.");
        }
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

    updateRightSide() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            document.getElementById('mapOutput').textContent = '';
            document.getElementById('legendOutput').textContent = '';
            return;
        }
    
        const character = this.characters[userId];
        const mapOutput = document.getElementById('mapOutput');
        const legendOutput = document.getElementById('legendOutput');
    
        if (character.location === "Town") {
            const townLocations = [
                ["O", "O", "O", "O", "O", "O"],
                ["O", "O", "O", "O", "O", "O"],
                ["O", "O", "O", "O", "O", "O"],
                ["O", "O", "G", "I", "O", "O"]
            ];
    
            let townMap = `
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    ▒ ${townLocations[0][0]} ▒ ${townLocations[0][1]} ▒ ${townLocations[0][2]} ▒ ${townLocations[0][3]} ▒ ${townLocations[0][4]} ▒ ${townLocations[0][5]} ▒
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    ▒ ${townLocations[1][0]} ▒ ${townLocations[1][1]} ▒ ${townLocations[1][2]} ▒ ${townLocations[1][3]} ▒ ${townLocations[1][4]} ▒ ${townLocations[1][5]} ▒
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    ▒ ${townLocations[2][0]} ▒ ${townLocations[2][1]} ▒ ${townLocations[2][2]} ▒ ${townLocations[2][3]} ▒ ${townLocations[2][4]} ▒ ${townLocations[2][5]} ▒
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    ▒ ${townLocations[3][0]} ▒ ${townLocations[3][1]} ▒ ${townLocations[3][2]} ▒ ${townLocations[3][3]} ▒ ${townLocations[3][4]} ▒ ${townLocations[3][5]} ▒
    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
    `;
    
            const townLegend = {
                "T": "Tavern", "B": "Blacksmith", "A": "Alchemist", "M": "Mage Tower",
                "L": "Library", "S": "Stables", "G": "Guild", "W": "Weapon Shop",
                "H": "Herbalist", "C": "Chapel", "R": "Rune Shop", "F": "Fletcher", "I": "Inn"
            };
    
            let legend = ["Legend:"];
            for (let [letter, building] of Object.entries(townLegend)) {
                if (letter === "G" || letter === "I" || townLocations.some(row => row.includes(letter))) {
                    legend.push(`  ${letter} - ${building}`);
                }
            }
            if (townLocations.some(row => row.includes("O"))) {
                legend.push("  O - Empty Plot");
            }
    
            const legendStr = legend.join("\n");
    
            mapOutput.textContent = townMap;
            legendOutput.textContent = legendStr;
        } else if (character.location === "Inn") {
            const innMap = `
    ┌────┬────┬────┬────┬────┬▄▄▄┐
    │ R1 │ R2 │ R3 │ R4 │ R5 │-v-│
    ├─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┘-v-│
    │                            │
    ├─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┐   │
    │ R6 │ R7 │ R8 │ R9 │ R10│   │
    └────┴────┴────┴────┴────┘───┘
    ┌────┬─────────────┬─────┬▄▄▄┐
    │ B  │+   ▄▄ ▄▄ ▄▄ ▌     │-^-│
    │    │+   ██ ██ ██ └─────┘-^-│
    │    │+   ▀▀ ▀▀ ▀▀           ▌
    │    │+                      │
    │    │+   ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒ │
    └────┴───────────────────────┘
    `;
            mapOutput.textContent = innMap;
            legendOutput.textContent = "Inn Legend:\nR1-R10: Rooms\nB: Bar";
        } else if (character.location === "inn_bar") {
            const innMapFirstFloor = `
    ┌────┬─────────────┬─────┬▄▄▄┐
    │ B  │+   ▄▄ ▄▄ ▄▄ ▌     │-^-│
    │    │+   ██ ██ ██ └─────┘-^-│
    │    │+   ▀▀ ▀▀ ▀▀           ▌
    │    │+                      │
    │    │+   ▒▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒▒ │
    └────┴───────────────────────┘
    `;
            mapOutput.textContent = innMapFirstFloor;
            legendOutput.textContent = "Inn Bar Legend:\nB: Bar";
        } else if (character.location === "inn_rooms") {
            const innMapSecondFloor = `
    ┌────┬────┬────┬────┬────┬▄▄▄┐
    │ R1 │ R2 │ R3 │ R4 │ R5 │-v-│
    ├─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┴─▄▄─┘-v-│
    │                            │
    ├─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┬─▀▀─┐   │
    │ R6 │ R7 │ R8 │ R9 │ R10│   │
    └────┴────┴────┴────┴────┘───┘
    `;
            mapOutput.textContent = innMapSecondFloor;
            legendOutput.textContent = "Inn Rooms Legend:\nR1-R10: Rooms";
        } else if (character.location === "guild_lobby") {
            const guildLobbyMap = `
            ┌─────────────────────────────┐
            │  ┌─┐               ┌─┐      │
            │  │N│     ┌───┐     │B│      │
            │  └─┘     │   │     └─┘      │
            │          │   │              │
            │    ╔═════╧═══╧═════╗        │
            │    ║      R      ◊║        │
            │    ╚═══════════════╝        │
            │                             │
            │  ┌───────┐       ┌───────┐  │
            │  │   S   │       │   Q   │  │
            │  │       │       │       │  │
            └──┴───────┴═══════┴───────┴──┘
            
            /get_map - Receive dungeon map
            /leave - Return to town
            `;
            mapOutput.textContent = guildLobbyMap;
            legendOutput.textContent = "Guild Lobby Legend:\nN: Notice Board\nB: Bounty Board\nR: Reception Counter\n◊: Receptionist\nS: Guild Store\nQ: Quest Board\n/get_map: Receive dungeon map\n/leave: Return to town";
        } else if (this.dungeonMaps[userId]) {
            const dungeonMap = this.dungeonMaps[userId].map;
            const position = this.dungeonMaps[userId].position;
            const visitedRooms = this.dungeonMaps[userId].visitedRooms || new Set();
        
            let mapStr = "";
            for (let y = 0; y < dungeonMap.length; y++) {
                let rowStr = "|";
                for (let x = 0; x < dungeonMap[0].length; x++) {
                    if (x === position[0] && y === position[1]) {
                        rowStr += " P ";
                    } else if (visitedRooms.has(`${x},${y}`)) {
                        const room = dungeonMap[y][x];
                        if (room !== null) {
                            if (room.loot.length > 0) {
                                rowStr += " I ";
                            } else {
                                rowStr += "   ";
                            }
                        } else {
                            rowStr += "###"; // Show walls
                        }
                    } else if (
                        (Math.abs(x - position[0]) === 1 && y === position[1]) ||
                        (Math.abs(y - position[1]) === 1 && x === position[0])
                    ) {
                        const room = dungeonMap[y][x];
                        if (room !== null) {
                            rowStr += " ? ";
                        } else {
                            rowStr += "###"; // Show walls for adjacent unexplored areas
                        }
                    } else {
                        rowStr += "   ";
                    }
                    rowStr += "|";
                }
        
    
                if (y === dungeonMap.length - 1) {
                    rowStr += "\n" + "└" + "───┴".repeat(dungeonMap[0].length - 1) + "───┘";
                } else {
                    rowStr += "\n" + "├" + "───┼".repeat(dungeonMap[0].length - 1) + "───┤\n";
                }
    
                mapStr += rowStr;
            }
    
            mapStr = "┌" + "───┬".repeat(dungeonMap[0].length - 1) + "───┐\n" + mapStr;
    
            mapOutput.textContent = mapStr;
            legendOutput.textContent = "Dungeon Legend:\nP: Player\nI: Item\n?: Unexplored room\n###: Wall";
        } else {
            mapOutput.textContent = '';
            legendOutput.textContent = '';
        }
    }

    displayTownMap() {
        // Implement town map display logic
        this.rightOutputElement.textContent = 'Town Map Here';
    }

    displayDungeonMap() {
        // Implement dungeon map display logic
        this.rightOutputElement.textContent = 'Dungeon Map Here';
    }

    displayCharacterInfo() {
        const character = this.characters[this.currentUserId];
        this.rightOutputElement.textContent = `
Character: ${character.name}
Level: ${character.level}
HP: ${character.hp}
MP: ${character.mp}
STR: ${character.strength}
DEX: ${character.dexterity}
INT: ${character.intelligence}

Inventory: ${character.inventory.join(', ') || 'Empty'}
        `;
    }

    listDungeonMaps(biomeFilter = null) {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (!character.dungeonMaps || character.dungeonMaps.length === 0) {
            this.display_output("You don't have any dungeon maps.");
            return;
        }
    
        let dungeonMapList = [];
        character.dungeonMaps.forEach((dungeonMap, index) => {
            const biome = dungeonMap[0][0] ? dungeonMap[0][0].biome : "Unknown";
            if (!biomeFilter || biome.toLowerCase() === biomeFilter.toLowerCase()) {
                dungeonMapList.push(`${index + 1}. ${biome} Dungeon`);
            }
        });
    
        if (dungeonMapList.length > 0) {
            this.display_output("Available Dungeon Maps:\n" + dungeonMapList.join("\n"));
        } else {
            this.display_output("No dungeon maps found for the specified biome.");
        }
    }
    
    goUpstairs() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (character.location === "inn_bar") {
            character.location = "inn_rooms";
            this.saveCharacters();
            this.display_output("You go upstairs to the second floor of the inn.");
        } else {
            this.display_output("You are not in the inn or already on the second floor.");
        }
    }
    
    goDownstairs() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (character.location === "inn_rooms") {
            character.location = "inn_bar";
            this.saveCharacters();
            this.display_output("You go downstairs to the first floor of the inn.");
        } else {
            this.display_output("You are not on the second floor of the inn.");
        }
    }
    
    displayHelp() {
        const commands = [
            "/enter - Enter the game",
            "/rename [name] - Rename your character",
            "/retire - Retire your character and disconnect",
            "/explore [dungeon_index] - Explore a dungeon",
            "/list_dungeon_maps [biome] - List available dungeon maps",
            "/current_biome - Show current biome",
            "/show_map - Display the current dungeon map",
            "/left, /right, /up, /down - Move in the dungeon",
            "/fight [enemy] - Fight an enemy",
            "/character_info - Display character information",
            "/item [item_number] - Pick up an item",
            "/leave_dungeon - Leave the current dungeon",
            "/inn - Enter the inn",
            "/upstairs - Go upstairs in the inn",
            "/downstairs - Go downstairs in the inn",
            "/guild - Enter the guild",
            "/get_map - Get a new dungeon map from the guild",
            "/help - Display this help message"
        ];
        this.display_output("Available commands:\n" + commands.join("\n"));
    }

    saveCharacters() {
        localStorage.setItem('characters', JSON.stringify(this.characters));
    }
    
    generateDungeonMap(maxWidth, maxHeight, biome, minWidth = 0, minHeight = 0) {
        const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
        const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
        
        const dungeonMap = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                if (Math.random() < 0.7) {  // 70% chance of generating a room
                    const position = [x, y];
                    const room = new DungeonRoom(biome, position);
                    row.push(room);
                } else {
                    row.push(null);  // No room at this position
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
    
    getMap() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (character.location !== "guild_lobby") {
            this.display_output("You can only get a dungeon map from the guild.");
            return;
        }
    
        const width = 5;  // Set the width of the dungeon
        const height = 5;  // Set the height of the dungeon
        const biome = DUNGEON_BIOMES[Math.floor(Math.random() * DUNGEON_BIOMES.length)];
        const dungeonMap = this.generateDungeonMap(width, height, biome);
    
        console.log("New dungeon map generated:", dungeonMap);
        console.log("Starting room of new map:", dungeonMap[0][0]);
    
        if (!character.dungeonMaps) {
            character.dungeonMaps = [];
        }
        character.dungeonMaps.push(dungeonMap);
        this.saveCharacters();
        this.display_output(`You received a new dungeon map for a ${biome} dungeon.`);
    }

    guildInteraction() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (character.location !== "Town") {
            this.display_output("You are not in town. You can only interact with the guild while in town.");
            return;
        }
    
        this.display_output("You enter the guild. The receptionist greets you.");
        character.location = "guild_lobby";
        this.saveCharacters();
        this.display_output("Available actions:\n/get_map - Generate a new dungeon map\n/leave - Return to town");
    }

    getMap() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (character.location !== "guild_lobby") {
            this.display_output("You can only get a dungeon map from the guild.");
            return;
        }
    
        const width = 5;  // Set the width of the dungeon
        const height = 5;  // Set the height of the dungeon
        const biome = DUNGEON_BIOMES[Math.floor(Math.random() * DUNGEON_BIOMES.length)];
        const dungeonMap = this.generateDungeonMap(width, height, biome);
        
        if (!character.dungeonMaps) {
            character.dungeonMaps = [];
        }
        character.dungeonMaps.push(dungeonMap);
        this.saveCharacters();
        this.display_output(`You received a new dungeon map for a ${biome} dungeon.`);
    }
    
    clearDungeonMaps() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        const mapCount = character.dungeonMaps.length;
        character.dungeonMaps = [];
        this.saveCharacters();
        this.display_output(`Cleared ${mapCount} dungeon map(s) from your inventory.`);
    }

    showFirstMap() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        if (!character.dungeonMaps || character.dungeonMaps.length === 0) {
            this.display_output("You don't have any dungeon maps.");
            return;
        }
    
        const firstMap = character.dungeonMaps[0];
        
        if (!Array.isArray(firstMap) || firstMap.length === 0) {
            this.display_output("The dungeon map is empty or invalid.");
            return;
        }
    
        let mapLayout = "";
        let biome = "Unknown";
    
        for (let y = 0; y < firstMap.length; y++) {
            let row = "";
            for (let x = 0; x < firstMap[y].length; x++) {
                const room = firstMap[y][x];
                if (room && typeof room === 'object') {
                    row += "□ ";
                    if (biome === "Unknown" && room.biome) {
                        biome = room.biome;
                    }
                } else {
                    row += "█ ";
                }
            }
            mapLayout += row + "\n";
        }
    
        this.display_output(`Layout of your first dungeon map (${biome}):`);
        this.display_output(mapLayout);
        this.display_output(`Dimensions: ${firstMap[0].length} x ${firstMap.length}`);
        
        const totalRooms = firstMap.flat().filter(room => room && typeof room === 'object').length;
        this.display_output(`Total rooms: ${totalRooms}`);
    
        // Debug information
        console.log("First map structure:", JSON.stringify(firstMap, null, 2));
    }
}

const game = new Game();
game.init();

function processCommand() {
    const commandInput = document.getElementById('commandInput');
    game.processCommand(commandInput.value);
    commandInput.value = '';
}
