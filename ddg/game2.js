const ANSI_RESET = "\x1b[0m";
const ANSI_BLUE = "\x1b[34m";
const ANSI_RED = "\x1b[31m";

class Game {
    constructor() {
        this.outputElement = document.getElementById('gameOutput');
        this.rightOutputElement = document.getElementById('rightOutput');
        this.inputElement = document.getElementById('commandInput');
        this.characters = {};
        this.currentUserId = 'testUser';
        this.dungeonMaps = {};
        
    }

    init() {
        this.loadCharacters();
        if (this.characters[this.currentUserId]) {
            this.enterGame(true);
        } else {
            this.display_output("Welcome to Dungeon Delver's Guild! Type '/enter [character name]' to start.");
        }
        this.initializeEventListeners();
        this.initializeCanvas(); // Add this line
        this.updateActionButtons();
    }

    display_output(message, rightSide = false) {
        let outputElement;
        if (rightSide) {
            outputElement = document.getElementById('mapOutput');
        } else {
            outputElement = document.getElementById('gameOutput');
        }
        
        if (!outputElement) {
            console.error(`Output element not found: ${rightSide ? 'mapOutput' : 'gameOutput'}`);
            return;
        }
        
        const newMessage = document.createElement('div');
        newMessage.innerHTML = message.trim(); // Trim any leading/trailing whitespace
        outputElement.appendChild(newMessage);
        outputElement.scrollTop = outputElement.scrollHeight;
    }

    formatPlayerName(name) {
        return `<span style="color: #FFD700; font-weight: bold;">${name}</span>`;
    }

    processCommand(command) {
        document.getElementById('gameOutput').innerHTML = '';
        document.getElementById('mapOutput').innerHTML = '';
        document.getElementById('legendOutput').innerHTML = '';
        const [cmd, ...args] = command.trim().split(' ');
        const cleanCmd = cmd.toLowerCase();
    
        if (cleanCmd !== '/help' && cleanCmd !== 'help') {
            this.restoreLayout();
        }
    
        switch (cleanCmd) {
            case '/enter':
            case 'enter':
                const name = args.join(' ').trim();
                this.enterGame(false, name);
                break;
            case '/rename':
            case 'rename':
                this.renameCharacter(args.join(' '));
                break;
            case '/retire':
            case 'retire':
                this.retire();
                break;
            case '/explore':
            case 'explore':
                this.explore(args[0]);
                break;
            case '/current_biome':
            case 'current_biome':
                this.currentBiome();
                break;
            case '/show_map':
            case 'show_map':
                this.showMap();
                break;
            case '/go_left':
            case '/move_left':
            case '/left':
            case 'go_left':
            case 'move_left':
            case 'left':
                this.movePlayer('left');
                break;
            case '/go_right':
            case '/move_right':
            case '/right':
            case 'go_right':
            case 'move_right':
            case 'right':
                this.movePlayer('right');
                break;
            case '/go_up':
            case '/move_up':
            case '/up':
            case 'go_up':
            case 'move_up':
            case 'up':
                this.movePlayer('up');
                break;
            case '/go_down':
            case '/move_down':
            case '/down':
            case 'go_down':
            case 'move_down':
            case 'down':
                this.movePlayer('down');
                break;
            case '/fight':
            case 'fight':
                this.fight(args.join(' '));
                break;
            case '/character_info':
            case 'character_info':
                this.displayCharacterInfo();
                break;
            case '/item':
            case '/pickup':
            case 'item':
            case 'pickup':
                this.item(args.join(' '));
                break;
            case '/leave':
            case 'leave':
                this.leaveLocation();
                break;
            case '/list_dungeon_maps':
            case '/dungeons':
            case 'list_dungeon_maps':
            case 'dungeons':
                this.listDungeonMaps(args[0]);
                break;
            case '/display_town_map':
            case 'display_town_map':
                this.displayTownMap();
                break;
            case '/display_dungeon_map':
            case 'display_dungeon_map':
                this.displayDungeonMap();
                break;
            case '/display_character_info':
            case 'display_character_info':
                this.displayCharacterInfo();
                break;
            case '/inn':
            case 'inn':
                this.innInteraction();
                break;
            case '/upstairs':
            case 'upstairs':
                this.goUpstairs();
                break;
            case '/downstairs':
            case 'downstairs':
                this.goDownstairs();
                break;
            case '/help':
            case 'help':
                this.displayHelp();
                break;
            case '/guild':
            case 'guild':
                this.guildInteraction();
                break;
            case '/get_map':
            case 'get_map':
                this.getMap();
                break;
            case '/clear_maps':
            case 'clear_maps':
                this.clearDungeonMaps();
                break;
            case '/show_first_map':
            case 'show_first_map':
                this.showFirstMap();
                break;
            default:
                this.display_output('Unknown command. Type "/help" for a list of commands.');
        }
        this.updateGameInfo();
        this.updateRightSide();
        this.updateActionButtons();
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

    updateGameInfo() {
        const gameInfoElement = document.getElementById('gameInfo');
        
        if (this.characters[this.currentUserId]) {
            const character = this.characters[this.currentUserId];
            let info = `Name: ${character.name}<br>`;
            info += `Level: ${character.level}<br>`;
            info += `Location: ${character.location}<br>`;
    
            // Only show HP if the character is in a dungeon
            if (this.dungeonMaps[this.currentUserId]) {
                info += `HP: ${character.hp}<br>`;
            }
    
            gameInfoElement.innerHTML = info;
        } else {
            gameInfoElement.innerHTML = 'No character created yet';
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

    enterGame(autoEnter = false, newName = '') {
        if (this.characters[this.currentUserId]) {
            // Player already has a character
            if (!autoEnter) {
                this.display_output("You are already logged in.");
                return;
            }
            // If it's an auto-enter (initial login), display the welcome message
            this.display_output(`Welcome back, ${this.formatPlayerName(this.characters[this.currentUserId].name)}!`);
        } else {
            // New player
            if (!newName) {
                this.display_output("Please enter a name for your character. Usage: /enter [character name]");
                return;
            }
            this.characters[this.currentUserId] = new Character(this.currentUserId, newName, 1, 100, 50, 10, 10, 10);
            this.display_output(`Welcome, ${this.formatPlayerName(newName)}! You've entered the game.`);
        }
    
        // Set the character's location to "Town" when entering the game
        this.characters[this.currentUserId].location = "Town";
        this.saveCharacters();
    
        this.display_output("You find yourself in the town square.");
        this.display_output("Type '/help' for a list of commands.");
    
        // Update all relevant displays
        this.updateGameInfo();
        this.updateRightSide();
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
        const oldName = this.characters[this.currentUserId].name;
        this.characters[this.currentUserId].name = newName;
        this.saveCharacters();
        this.display_output(`You have renamed your character from ${this.formatPlayerName(oldName)} to ${this.formatPlayerName(newName)}.`);

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
    
        const dungeonData = character.dungeonMaps[dungeonIndex - 1];
    
        console.log("Dungeon data:", dungeonData);

        // Check if the dungeon map is valid
        if (!dungeonData || !dungeonData.map) {
            console.log("Error: dungeonData or dungeonData.map is undefined");
            this.display_output("Error: Invalid dungeon map structure.");
            return;
        }

        if (!Array.isArray(dungeonData.map)) {
            console.log("Error: dungeonData.map is not an array");
            this.display_output("Error: Invalid dungeon map structure.");
            return;
        }

        if (dungeonData.map.length === 0) {
            console.log("Error: dungeonData.map is an empty array");
            this.display_output("Error: Invalid dungeon map structure.");
            return;
        }

        if (!Array.isArray(dungeonData.map[0])) {
            console.log("Error: First row of dungeonData.map is not an array");
            this.display_output("Error: Invalid dungeon map structure.");
            return;
        }
    
        const [startX, startY] = dungeonData.startPosition;
        this.dungeonMaps[userId] = {
            map: dungeonData.map,
            position: [startX, startY],
            visitedRooms: new Set([`${startX},${startY}`])
        };
    
        this.addAdjacentWallsToVisited(this.dungeonMaps[userId], startX, startY);
    
        const currentRoom = dungeonData.map[startY][startX];
        
        if (!currentRoom) {
            this.display_output("Error: Starting room is not defined.");
            console.log("Dungeon map:", dungeonData.map);
            return;
        }
    
        character.location = currentRoom.biome;
        this.saveCharacters();
    
        let roomInfo = `You enter the dungeon and find yourself in a ${currentRoom.biome}. ${currentRoom.description}`;
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
    
        if (this.dungeonMaps[userId]) {
            // Leaving a dungeon
            delete this.dungeonMaps[userId];
            character.location = 'Town';
            this.saveCharacters();
            this.display_output('You have left the dungeon and returned to town.');
        } else if (character.location === "guild_lobby") {
            character.location = "Town";
            this.saveCharacters();
            this.display_output("You leave the guild and return to town.");
        } else if (character.location === "Town") {
            this.display_output("You are already in town.");
        } else if (character.location.startsWith("inn_")) {
            character.location = "Town";
            this.saveCharacters();
            this.display_output("You leave the inn and return to town.");
        } else {
            // Handle other locations as needed
            character.location = "Town";
            this.saveCharacters();
            this.display_output(`You leave your current location and return to town.`);
        }
    }

    innInteraction() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        
        if (character.location.startsWith("inn_")) {
            this.display_output("You are already in the inn.");
            if (character.location === "inn_bar") {
                this.display_output("You are in the bar area.");
            } else if (character.location === "inn_rooms") {
                this.display_output("You are on the second floor.");
            }
            return;
        }
    
        if (character.location !== "Town") {
            this.display_output("You can only enter the inn while in town.");
            return;
        }
    
        this.display_output("You enter the inn. The innkeeper greets you warmly.");
        character.location = "inn_bar";
        this.saveCharacters();
        this.display_output("You are now in the bar area.");
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
        this.renderMap();
    
        const legendOutput = document.getElementById('legendOutput');
        const character = this.characters[this.currentUserId];
    
        if (this.dungeonMaps[this.currentUserId]) {
            legendOutput.innerHTML = `
                <h4>Legend:</h4>
                <ul>
                    <li><span style="color: #ff6b6b;">●</span> Player</li>
                    <li><span style="color: #4ecdc4;">■</span> Visited Room</li>
                    <li><span style="color: #333;">■</span> Wall</li>
                    <li><span style="color: #ff0000;">■</span> Enemy</li>
                    <li><span style="color: #ffd700;">▲</span> Loot</li>
                </ul>
            `;
        } else if (character.location === "Town") {
            legendOutput.innerHTML = `
                <h4>Legend:</h4>
                <ul>
                    <li><span style="color: #4ecdc4;">■ G</span> Guild</li>
                    <li><span style="color: #ff6b6b;">■ I</span> Inn</li>
                    <li><span style="color: #ff6b6b;">●</span> Player</li>
                </ul>
            `;
        } else {
            legendOutput.innerHTML = '';
        }
    }

    displayTownMap() {
        // Implement town map display logic
        this.rightOutputElement.textContent = 'Town Map Here';
    }

    displayDungeonMap() {
        const dungeonData = this.dungeonMaps[this.currentUserId];
        if (!dungeonData) {
            this.display_output("You are not in a dungeon.");
            return;
        }
    
        const { map, position, visitedRooms } = dungeonData;
        let mapStr = "<div class='dungeon-map'><table>";
    
        for (let y = 0; y < map.length; y++) {
            mapStr += "<tr>";
            for (let x = 0; x < map[0].length; x++) {
                let cellClass = "unknown";
                let cellContent = "&nbsp;";
    
                if (x === position[0] && y === position[1]) {
                    cellClass = "player";
                    cellContent = "P";
                } else if (visitedRooms.has(`${x},${y}`)) {
                    const room = map[y][x];
                    if (room !== null) {
                        cellClass = "visited";
                        if (room.loot.length > 0) cellClass += " loot";
                        if (room.enemies.length > 0) cellClass += " enemy";
                    } else {
                        cellClass = "wall";
                    }
                } else if (
                    (Math.abs(x - position[0]) === 1 && y === position[1]) ||
                    (Math.abs(y - position[1]) === 1 && x === position[0])
                ) {
                    cellClass = "adjacent";
                    cellContent = "?";
                }
    
                mapStr += `<td class="${cellClass}">${cellContent}</td>`;
            }
            mapStr += "</tr>";
        }
    
        mapStr += "</table></div>";
        mapStr += `
            <div class="map-legend">
                <h4>Legend</h4>
                <ul>
                    <li><span class="legend-item player"></span> Player</li>
                    <li><span class="legend-item visited"></span> Visited Room</li>
                    <li><span class="legend-item loot"></span> Room with Loot</li>
                    <li><span class="legend-item enemy"></span> Room with Enemy</li>
                    <li><span class="legend-item adjacent"></span> Adjacent Room</li>
                    <li><span class="legend-item wall"></span> Wall</li>
                    <li><span class="legend-item unknown"></span> Unknown</li>
                </ul>
            </div>
        `;
    
        this.display_output(mapStr);
    }

    displayCharacterInfo() {
        const character = this.characters[this.currentUserId];
        const info = `
        <div class="character-info">
            <h3>${this.formatPlayerName(character.name)}</h3>
            <div class="info-grid">
                <div class="info-item"><span>Level:</span> ${character.level}</div>
                <div class="info-item"><span>HP:</span> ${character.hp}</div>
                <div class="info-item"><span>MP:</span> ${character.mp}</div>
                <div class="info-item"><span>STR:</span> ${character.strength}</div>
                <div class="info-item"><span>DEX:</span> ${character.dexterity}</div>
                <div class="info-item"><span>INT:</span> ${character.intelligence}</div>
            </div>
            <div class="inventory">
                <h4>Inventory</h4>
                <ul>
                    ${character.inventory.map(item => `<li>${item}</li>`).join('') || '<li>Empty</li>'}
                </ul>
            </div>
        </div>
        `;
        this.display_output(info);
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
        // Hide other elements
        document.getElementById('gameInfo').style.display = 'none';
        document.getElementById('bottomPanel').style.display = 'none';
        
        // Expand gameOutput
        document.getElementById('gameOutput').style.height = '580px'; // Adjust this value as needed
        
        const commandGroups = {
            "Character Management": [
                ["/enter [name]", "Enter the game with a new character name"],
                ["/rename [name]", "Rename your character"],
                ["/retire", "Retire your character and disconnect"],
                ["/character_info", "Display character information"]
            ],
            "Navigation": [
                ["/inn", "Enter the inn"],
                ["/upstairs", "Go upstairs in the inn"],
                ["/downstairs", "Go downstairs in the inn"],
                ["/guild", "Enter the guild"],
                ["/leave", "Leave the current location"]
            ],
            "Dungeon Exploration": [
                ["/explore [dungeon_index]", "Explore a dungeon"],
                ["/list_dungeon_maps [biome]", "List available dungeon maps"],
                ["/current_biome", "Show current biome"],
                ["/show_map", "Display the current dungeon map"],
                ["/left, /right, /up, /down", "Move in the dungeon"],
                ["/fight [enemy]", "Fight an enemy"],
                ["/item [item_number]", "Pick up an item"]
            ],
            "Guild Actions": [
                ["/get_map", "Get a new dungeon map from the guild"]
            ],
            "Miscellaneous": [
                ["/help", "Display this help message"]
            ]
        };
    
        let helpMessage = "<div class='help-container'>";

        for (const [category, commands] of Object.entries(commandGroups)) {
            helpMessage += `<div class='help-category'>
                <h3>${category}</h3>
                <ul>`;
            for (const [command, description] of commands) {
                helpMessage += `<li><span class='command'>${command}</span> - ${description}</li>`;
            }
            helpMessage += `</ul></div>`;
        }

        helpMessage += "</div>";

        this.display_output(helpMessage);
    }

    restoreLayout() {
        document.getElementById('gameInfo').style.display = 'block';
        document.getElementById('bottomPanel').style.display = 'flex';
        document.getElementById('gameOutput').style.height = '200px'; // Restore original height
    }

    saveCharacters() {
        localStorage.setItem('characters', JSON.stringify(this.characters));
    }
    
    generateDungeonMap(maxWidth, maxHeight, minWidth = 1, minHeight = 1) {
        console.log(`Input parameters: maxWidth=${maxWidth}, maxHeight=${maxHeight}, minWidth=${minWidth}, minHeight=${minHeight}`);
    
        // Ensure all parameters are numbers and at least 1
        maxWidth = Math.max(1, Number(maxWidth) || 1);
        maxHeight = Math.max(1, Number(maxHeight) || 1);
        minWidth = Math.max(1, Number(minWidth) || 1);
        minHeight = Math.max(1, Number(minHeight) || 1);
    
        console.log(`Adjusted parameters: maxWidth=${maxWidth}, maxHeight=${maxHeight}, minWidth=${minWidth}, minHeight=${minHeight}`);
    
        const possibleBiomes = Object.keys(ITEMS);
        const biome = possibleBiomes[Math.floor(Math.random() * possibleBiomes.length)];
    
        console.log(`Selected biome: ${biome}`);
    
        // Calculate dimensions
        const widthRange = maxWidth - minWidth + 1;
        const heightRange = maxHeight - minHeight + 1;
        
        console.log(`Width range: ${widthRange}, Height range: ${heightRange}`);
    
        const width = widthRange > 0 ? Math.floor(Math.random() * widthRange) + minWidth : minWidth;
        const height = heightRange > 0 ? Math.floor(Math.random() * heightRange) + minHeight : minHeight;
    
        console.log(`Calculated dimensions: ${width}x${height}`);
    
        const dungeonMap = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                if (Math.random() < 0.7) {  // 70% chance of generating a room
                    row.push(new DungeonRoom(biome, [x, y]));
                } else {
                    row.push(null);  // No room at this position
                }
            }
            dungeonMap.push(row);
        }
    
        // Find a valid starting room
        let startingRoom = null;
        let startX = 0, startY = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (dungeonMap[y][x] !== null) {
                    startingRoom = dungeonMap[y][x];
                    startX = x;
                    startY = y;
                    break;
                }
            }
            if (startingRoom) break;
        }
    
        // If no valid room was found, create one
        if (!startingRoom) {
            startX = Math.floor(Math.random() * width);
            startY = Math.floor(Math.random() * height);
            startingRoom = new DungeonRoom(biome, [startX, startY]);
            dungeonMap[startY][startX] = startingRoom;
        }
    
        console.log(`Final starting room position: [${startX}, ${startY}]`);
        console.log(`Final starting room biome: ${startingRoom.biome}`);
    
        return { map: dungeonMap, startPosition: [startX, startY] };
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
        const dungeonData = this.generateDungeonMap(width, height, biome);
    
        console.log("New dungeon map generated:", dungeonData);
        console.log("Starting room of new map:", dungeonData.map[dungeonData.startPosition[1]][dungeonData.startPosition[0]]);
    
        if (!character.dungeonMaps) {
            character.dungeonMaps = [];
        }
        character.dungeonMaps.push(dungeonData);
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
    
        if (character.location === "guild_lobby") {
            this.display_output("You are already in the guild lobby.");
            return;
        }
    
        if (character.location !== "Town") {
            this.display_output("You can only enter the guild while in town.");
            return;
        }
    
        this.display_output("You enter the guild. The receptionist greets you.");
        character.location = "guild_lobby";
        this.saveCharacters();
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

    currentBiome() {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        const character = this.characters[userId];
        
        if (this.dungeonMaps[userId]) {
            const [x, y] = this.dungeonMaps[userId].position;
            const currentRoom = this.dungeonMaps[userId].map[y][x];
            if (currentRoom) {
                this.display_output(`You are currently in a ${currentRoom.biome} biome.`);
            } else {
                this.display_output("You are in an undefined area of the dungeon.");
            }
        } else if (character.location === "Town") {
            this.display_output("You are currently in the town. There is no specific biome here.");
        } else if (character.location === "guild_lobby") {
            this.display_output("You are in the guild lobby. There is no specific biome here.");
        } else if (character.location.startsWith("inn_")) {
            this.display_output("You are in the inn. There is no specific biome here.");
        } else {
            this.display_output(`You are in ${character.location}. The biome is undefined for this location.`);
        }
    }

    updateActionButtons() {
        const actionButtonsContainer = document.getElementById('actionButtons');
        actionButtonsContainer.innerHTML = ''; // Clear existing buttons
    
        const character = this.characters[this.currentUserId];
        if (!character) return;
    
        let availableActions = [];
    
        if (this.dungeonMaps[this.currentUserId]) {
            // Create D-pad
            this.createDPad(actionButtonsContainer);
    
            // Create fight button and input
            this.createActionWithInput(actionButtonsContainer, 'fight', 'enemy number');
    
            // Create item button and input
            this.createActionWithInput(actionButtonsContainer, 'item', 'item number');
    
            // Add help button
            availableActions.push('help');
        } else {
            switch (character.location) {
                case 'Town':
                    availableActions = ['inn', 'guild', {name: 'explore', params: ['map_number']}, 'help'];
                    break;
                case 'guild_lobby':
                    availableActions = ['get_map', 'help'];
                    break;
                case 'inn_bar':
                    availableActions = ['upstairs', 'help'];
                    break;
                case 'inn_rooms':
                    availableActions = ['downstairs', 'help'];
                    break;
                default:
                    availableActions = ['help'];
            }
        }
    
        // Create buttons for available actions
        availableActions.forEach(action => {
            if (typeof action === 'string') {
                this.createActionButton(actionButtonsContainer, action);
            } else {
                this.createActionWithInput(actionButtonsContainer, action.name, action.params[0]);
            }
        });
    
        // Add a spacer
        const spacer = document.createElement('div');
        spacer.style.flexGrow = '1';
        actionButtonsContainer.appendChild(spacer);
    
        // Always add character_info and leave at the bottom
        this.createActionButton(actionButtonsContainer, 'character_info', true);
        this.createActionButton(actionButtonsContainer, 'leave', true, character.location === 'Town');
    }
    
    createActionButton(container, action, alwaysShow = false, forceDisable = false) {
        const button = document.createElement('button');
        button.textContent = action.replace('_', ' ');
        button.className = 'actionButton';
        
        if (alwaysShow) {
            button.classList.add('always-show');
        }
        
        if (forceDisable) {
            button.disabled = true;
        } else {
            button.onclick = () => this.processCommand(action);
        }
        
        container.appendChild(button);
    }
    
    createActionWithInput(container, action, placeholder) {
        const wrapper = document.createElement('div');
        wrapper.className = 'actionButtonContainer';
    
        const button = document.createElement('button');
        button.textContent = action.replace('_', ' ');
        button.className = 'actionButton';
    
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.className = 'actionInput';
    
        button.onclick = () => {
            this.processCommand(`${action} ${input.value.trim()}`);
        };
    
        wrapper.appendChild(button);
        wrapper.appendChild(input);
        container.appendChild(wrapper);
    }
    
    createDPad(container) {
        const dpadContainer = document.createElement('div');
        dpadContainer.className = 'dpad-container';
    
        const directions = [
            { name: 'up', label: '↑' },
            { name: 'left', label: '←' },
            { name: 'right', label: '→' },
            { name: 'down', label: '↓' }
        ];
    
        directions.forEach(dir => {
            const button = document.createElement('button');
            button.textContent = dir.label;
            button.className = `dpad-button dpad-${dir.name} actionButton`;
            button.onclick = () => this.processCommand(dir.name);
            dpadContainer.appendChild(button);
        });
    
        container.appendChild(dpadContainer);
    }

    fight(enemyInput) {
        const userId = this.currentUserId;
        if (!this.characters[userId]) {
            this.display_output("You are not currently connected. Try /enter.");
            return;
        }
    
        if (!this.dungeonMaps[userId]) {
            this.display_output("You haven't started exploring yet. Use the `/explore` command to start.");
            return;
        }
    
        const dungeonData = this.dungeonMaps[userId];
        const [x, y] = dungeonData.position;
        const currentRoom = dungeonData.map[y][x];
    
        if (!currentRoom.enemies || currentRoom.enemies.length === 0) {
            this.display_output("There are no enemies to fight in this room.");
            return;
        }
    
        if (!enemyInput) {
            this.display_output("Please specify an enemy to fight. Usage: /fight [enemy_number/name]");
            return;
        }
    
        let enemyFound = false;
        let enemyName = '';
        for (let i = 0; i < currentRoom.enemies.length; i++) {
            if ((enemyInput.match(/^\d+$/) && parseInt(enemyInput) === i + 1) || 
                enemyInput.toLowerCase() === currentRoom.enemies[i].toLowerCase()) {
                enemyFound = true;
                enemyName = currentRoom.enemies[i];
                break;
            }
        }
    
        if (enemyFound) {
            // Basic fight logic
            this.display_output(`You engage in combat with ${enemyName}!`);
            
            // Simple combat resolution
            if (Math.random() < 0.7) {  // 70% chance to win
                this.display_output(`You defeated ${enemyName}!`);
                // Remove the enemy from the current room after the fight
                currentRoom.enemies = currentRoom.enemies.filter(e => e !== enemyName);
                
                // Maybe gain some experience or loot here
                this.characters[userId].gainExperience(10);  // Gain 10 XP for winning
            } else {
                this.display_output(`${enemyName} defeated you! You've been sent back to town to recover.`);
                // Reset player location to town
                delete this.dungeonMaps[userId];
                this.characters[userId].location = 'Town';
            }
            
            this.saveCharacters();  // Save the updated character state
        } else {
            this.display_output(`Enemy '${enemyInput}' not found in the current room.`);
        }
    }
    
    item(itemNumber) {
        if (!this.dungeonMaps[this.currentUserId]) {
            this.display_output("You are not in a dungeon. There are no items to pick up here.");
            return;
        }
    
        // Check if the current room has items
        const [x, y] = this.dungeonMaps[this.currentUserId].position;
        const currentRoom = this.dungeonMaps[this.currentUserId].map[y][x];
    
        if (!currentRoom.loot || currentRoom.loot.length === 0) {
            this.display_output("There are no items in this room to pick up.");
            return;
        }
    
        // For now, just display the placeholder message
        this.display_output("Item pickup not yet implemented.");
    }

    initializeCanvas() {
        this.canvas = document.getElementById('mapCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.tileSize = 30; // Size of each tile in pixels
    }
    
    renderMap() {
        if (!this.ctx) this.initializeCanvas();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        const character = this.characters[this.currentUserId];
        if (!character) return;
    
        if (this.dungeonMaps[this.currentUserId]) {
            this.renderDungeonMap();
        } else if (character.location === "Town") {
            this.renderTownMap();
        } else if (character.location === "guild_lobby") {
            this.renderGuildMap();
        } else if (character.location.startsWith("inn_")) {
            this.renderInnMap();
        }
    }
    
    renderDungeonMap() {
        const dungeonData = this.dungeonMaps[this.currentUserId];
        const map = dungeonData.map;
        const [playerX, playerY] = dungeonData.position;
    
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const room = map[y][x];
                if (room === null) {
                    this.drawTile(x, y, '#333'); // Wall
                } else if (dungeonData.visitedRooms.has(`${x},${y}`)) {
                    this.drawTile(x, y, '#4ecdc4'); // Visited room
                    if (room.enemies.length > 0) {
                        this.drawEnemy(x, y);
                    }
                    if (room.loot.length > 0) {
                        this.drawLoot(x, y);
                    }
                } else {
                    this.drawTile(x, y, '#2a2a2a'); // Unvisited room
                }
            }
        }
    
        // Draw player
        this.drawPlayer(playerX, playerY);
    }
    
    drawTile(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
        this.ctx.strokeStyle = '#000';
        this.ctx.strokeRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
    }
    
    drawPlayer(x, y) {
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.beginPath();
        this.ctx.arc((x + 0.5) * this.tileSize, (y + 0.5) * this.tileSize, this.tileSize / 3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawEnemy(x, y) {
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(x * this.tileSize + 5, y * this.tileSize + 5, this.tileSize - 10, this.tileSize - 10);
    }
    
    drawLoot(x, y) {
        this.ctx.fillStyle = '#ffd700';
        this.ctx.beginPath();
        this.ctx.moveTo(x * this.tileSize + this.tileSize / 2, y * this.tileSize + 5);
        this.ctx.lineTo(x * this.tileSize + this.tileSize - 5, y * this.tileSize + this.tileSize - 5);
        this.ctx.lineTo(x * this.tileSize + 5, y * this.tileSize + this.tileSize - 5);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    renderTownMap() {
        const townLayout = [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 2, 0],
            [0, 0, 3, 0, 0],
            [0, 0, 0, 0, 0]
        ];
    
        for (let y = 0; y < townLayout.length; y++) {
            for (let x = 0; x < townLayout[y].length; x++) {
                switch (townLayout[y][x]) {
                    case 0:
                        this.drawTile(x, y, '#7cfc00'); // Grass
                        break;
                    case 1:
                        this.drawBuilding(x, y, '#4ecdc4', 'G'); // Guild
                        break;
                    case 2:
                        this.drawBuilding(x, y, '#ff6b6b', 'I'); // Inn
                        break;
                    case 3:
                        this.drawPlayer(x, y); // Player
                        break;
                }
            }
        }
    }
    
    drawBuilding(x, y, color, letter) {
        this.drawTile(x, y, color);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(letter, x * this.tileSize + 10, y * this.tileSize + 20);
    }
    
    renderGuildMap() {
        // Implement a simple representation of the guild
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Guild', 120, 150);
    }
    
    renderInnMap() {
        // Implement a simple representation of the inn
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Inn', 130, 150);
    }
}

const game = new Game();
game.init();

function processCommand() {
    const commandInput = document.getElementById('commandInput');
    game.processCommand(commandInput.value);
    commandInput.value = '';
}
