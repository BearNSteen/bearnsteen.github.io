class CommandProcessor {
    constructor(game) {
        this.game = game;
    }

    processCommand(command) {
        const [cmd, ...args] = command.split(' ');
        switch (cmd.toLowerCase()) {
            case '/enter':
                return this.enterGame();
            case '/rename':
                return this.renameCharacter(args.join(' '));
            case '/retire':
                return this.retire();
            case '/explore':
                return this.explore(args[0]);
            case '/current_biome':
                return this.currentBiome();
            case '/show_map':
                return this.showMap();
            case '/go_left':
            case '/move_left':
            case '/left':
                return this.movePlayer('left');
            case '/go_right':
            case '/move_right':
            case '/right':
                return this.movePlayer('right');
            case '/go_up':
            case '/move_up':
            case '/up':
                return this.movePlayer('up');
            case '/go_down':
            case '/move_down':
            case '/down':
                return this.movePlayer('down');
            case '/fight':
                return this.fight(args.join(' '));
            case '/character_info':
                return this.characterInfo();
            case '/item':
            case '/pickup':
                return this.item(args.join(' '));
            case '/leave_dungeon':
                return this.leaveDungeon();
            case '/list_dungeon_maps':
            case '/dungeons':
                return this.listDungeonMaps(args[0]);
            case '/upstairs':
                return this.goUpstairs();
            case '/downstairs':
                return this.goDownstairs();
            case '/help':
                return this.displayHelp();
            case '/guild':
                gameState.changeLocation('guild_lobby');
                displayGuildInfo();
                break;
            case '/leave':
                gameState.changeLocation('Town');
                displayTownInfo();
                break;
            case '/get_map':
                return this.getMap();
            case '/clear_maps':
                return this.clearDungeonMaps();
            case '/show_first_map':
                return this.showFirstMap();
            default:
                return { message: 'Unknown command', updateUI: false };
        }
    }

    enterGame() {
        const currentUserId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[currentUserId]) {
            this.game.gameState.createCharacter(currentUserId, 'NewPlayer');
            return { message: "Welcome, new player! You've entered the game.", updateUI: true };
        } else {
            return { message: `Welcome back, ${this.game.gameState.characters[currentUserId].name}!`, updateUI: true };
        }
    }

    renameCharacter(newName) {
        const currentUserId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[currentUserId]) {
            return { message: 'Enter the game first', updateUI: false };
        }
    
        if (!newName || newName.trim() === '') {
            return { message: 'Please provide a new name. Usage: /rename [new name]', updateUI: false };
        }
    
        newName = newName.trim();
        this.game.gameState.characters[currentUserId].name = newName;
        this.game.gameState.saveCharacters();
        return { message: `You have renamed your character to ${newName}.`, updateUI: true };
    }

    retire() {
        const currentUserId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[currentUserId]) {
            return { message: 'No character to retire.', updateUI: false };
        }
        delete this.game.gameState.characters[currentUserId];
        this.game.gameState.saveCharacters();
        return { message: 'Your character has been retired. Thanks for playing!', updateUI: true };
    }

    explore(dungeonIndex) {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (!character.dungeonMaps || character.dungeonMaps.length === 0) {
            return { message: "You don't have any dungeon maps. Visit the guild to get one.", updateUI: false };
        }
    
        if (dungeonIndex === undefined) {
            return { message: "Please specify a dungeon map index. Usage: /explore [dungeon_index]", updateUI: false };
        }
    
        dungeonIndex = parseInt(dungeonIndex);
        if (isNaN(dungeonIndex) || dungeonIndex < 1 || dungeonIndex > character.dungeonMaps.length) {
            return { message: `Invalid dungeon map index. Please enter a number between 1 and ${character.dungeonMaps.length}.`, updateUI: false };
        }
    
        const dungeonMap = character.dungeonMaps[dungeonIndex - 1];
        
        if (!dungeonMap || !Array.isArray(dungeonMap) || dungeonMap.length === 0 || !Array.isArray(dungeonMap[0])) {
            return { message: "Error: Invalid dungeon map structure.", updateUI: false };
        }
    
        this.game.gameState.dungeonMaps[userId] = {
            map: dungeonMap,
            position: [0, 0],
            visitedRooms: new Set(['0,0'])
        };
    
        const currentRoom = dungeonMap[0][0];
        
        if (!currentRoom) {
            return { message: "Error: Starting room is not defined.", updateUI: false };
        }
    
        character.location = currentRoom.biome;
        this.game.gameState.saveCharacters();
    
        let roomInfo = `You are currently in a ${currentRoom.biome}. ${currentRoom.description}`;
        if (currentRoom.enemies && currentRoom.enemies.length > 0) {
            const enemyInfo = "Enemies: " + currentRoom.enemies.map((enemy, i) => `[${i+1}] ${enemy}`).join(", ");
            roomInfo += "\n" + enemyInfo;
        }
        if (currentRoom.loot && currentRoom.loot.length > 0) {
            const lootInfo = "Loot: " + currentRoom.loot.map((item, i) => `[${i+1}] ${item}`).join(", ");
            roomInfo += "\n" + lootInfo;
        }
        return { message: roomInfo, updateUI: true };
    }

    currentBiome() {
        const character = this.game.gameState.getCurrentCharacter();
        return { message: `You are currently in: ${character.location}`, updateUI: false };
    }

    showMap() {
        // Implement map display logic
        return { message: 'Showing map...', updateUI: true };
    }

    movePlayer(direction) {
        if (!this.game.gameState.dungeonMaps[this.game.gameState.currentUserId]) {
            return { message: 'You are not in a dungeon', updateUI: false };
        }
    
        const dungeonData = this.game.gameState.dungeonMaps[this.game.gameState.currentUserId];
        let [x, y] = dungeonData.position;
    
        let dx = 0, dy = 0;
    
        if (typeof direction === 'string') {
            switch (direction.toLowerCase()) {
                case 'left': dx = -1; break;
                case 'right': dx = 1; break;
                case 'up': dy = -1; break;
                case 'down': dy = 1; break;
                default: 
                    return { message: 'Invalid direction', updateUI: false };
            }
        } else if (Array.isArray(direction) && direction.length === 2) {
            [dx, dy] = direction;
        } else {
            return { message: 'Invalid direction', updateUI: false };
        }
    
        const newX = x + dx;
        const newY = y + dy;
    
        if (newY < 0 || newY >= dungeonData.map.length || newX < 0 || newX >= dungeonData.map[0].length) {
            return { message: 'You\'ve reached the edge of the dungeon. You can\'t go that way.', updateUI: false };
        }
    
        if (!dungeonData.map[newY][newX]) {
            return { message: 'There\'s no path in that direction. You see a solid wall.', updateUI: false };
        }
    
        dungeonData.position = [newX, newY];
        dungeonData.visitedRooms.add(`${newX},${newY}`);
        const room = dungeonData.map[newY][newX];
        let message = `You move ${direction}.\n${room.description}`;
        if (room.enemies.length > 0) {
            message += `\nEnemies: ${room.enemies.join(', ')}`;
        }
        if (room.loot.length > 0) {
            message += `\nLoot: ${room.loot.join(', ')}`;
        }
    
        // Display available directions
        const directions = this.getAvailableDirections(newX, newY, dungeonData.map);
        if (directions.length > 0) {
            message += `\nYou can go: ${directions.join(', ')}`;
        } else {
            message += '\nThere are no visible exits from this room.';
        }
    
        return { message, updateUI: true };
    }

    getAvailableDirections(x, y, map) {
        const directions = [];
        if (y > 0 && map[y-1][x]) directions.push('up');
        if (y < map.length - 1 && map[y+1][x]) directions.push('down');
        if (x > 0 && map[y][x-1]) directions.push('left');
        if (x < map[0].length - 1 && map[y][x+1]) directions.push('right');
        return directions;
    }

    fight(enemy) {
        // Implement combat logic
        return { message: `Fighting ${enemy}...`, updateUI: true };
    }

    characterInfo() {
        const character = this.game.gameState.getCurrentCharacter();
        // Implement character info display logic
        return { message: 'Displaying character info...', updateUI: true };
    }

    item(itemNumber) {
        // Implement item pickup logic
        return { message: `Picking up item ${itemNumber}...`, updateUI: true };
    }

    leaveDungeon() {
        if (!this.game.gameState.dungeonMaps[this.game.gameState.currentUserId]) {
            return { message: 'You are not in a dungeon', updateUI: false };
        }

        delete this.game.gameState.dungeonMaps[this.game.gameState.currentUserId];
        this.game.gameState.characters[this.game.gameState.currentUserId].location = 'Town';
        this.game.gameState.saveCharacters();
        return { message: 'You have left the dungeon and returned to town', updateUI: true };
    }

    listDungeonMaps(biomeFilter = null) {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (!character.dungeonMaps || character.dungeonMaps.length === 0) {
            return { message: "You don't have any dungeon maps.", updateUI: false };
        }
    
        let dungeonMapList = [];
        character.dungeonMaps.forEach((dungeonMap, index) => {
            const biome = dungeonMap[0][0] ? dungeonMap[0][0].biome : "Unknown";
            if (!biomeFilter || biome.toLowerCase() === biomeFilter.toLowerCase()) {
                dungeonMapList.push(`${index + 1}. ${biome} Dungeon`);
            }
        });
    
        if (dungeonMapList.length > 0) {
            return { message: "Available Dungeon Maps:\n" + dungeonMapList.join("\n"), updateUI: false };
        } else {
            return { message: "No dungeon maps found for the specified biome.", updateUI: false };
        }
    }

    goUpstairs() {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (character.location === "inn_bar") {
            character.location = "inn_rooms";
            this.game.gameState.saveCharacters();
            return { message: "You go upstairs to the second floor of the inn.", updateUI: true };
        } else {
            return { message: "You are not in the inn or already on the second floor.", updateUI: false };
        }
    }

    goDownstairs() {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (character.location === "inn_rooms") {
            character.location = "inn_bar";
            this.game.gameState.saveCharacters();
            return { message: "You go downstairs to the first floor of the inn.", updateUI: true };
        } else {
            return { message: "You are not on the second floor of the inn.", updateUI: false };
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
            "/upstairs - Go upstairs in the inn",
            "/downstairs - Go downstairs in the inn",
            "/guild - Enter the guild",
            "/get_map - Get a new dungeon map from the guild",
            "/help - Display this help message"
        ];
        return { message: "Available commands:\n" + commands.join("\n"), updateUI: false };
    }

    guildInteraction() {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (character.location !== "Town") {
            return { message: "You are not in town. You can only interact with the guild while in town.", updateUI: false };
        }
    
        character.location = "guild_lobby";
        this.game.gameState.saveCharacters();
        return { message: "You enter the guild. The receptionist greets you.\nAvailable actions:\n/get_map - Generate a new dungeon map\n/leave - Return to town", updateUI: true };
    }

    leaveLocation() {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (character.location === "guild_lobby") {
            character.location = "Town";
            this.game.gameState.saveCharacters();
            return { message: "You leave the guild and return to town.", updateUI: true };
        } else if (character.location === "Town") {
            return { message: "You are already in town.", updateUI: false };
        } else {
            return { message: "You can't leave your current location.", updateUI: false };
        }
    }

    getMap() {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (character.location !== "guild_lobby") {
            return { message: "You can only get a dungeon map from the guild.", updateUI: false };
        }
    
        const { dungeonMap, biome } = DungeonGenerator.generateDungeonForCharacter(character);
        
        this.game.gameState.saveCharacters();
    
        // Generate the map display
        const mapDisplay = DungeonGenerator.displayDungeonMap(dungeonMap);
    
        return { 
            message: `You received a new dungeon map for a ${biome} dungeon.\n\n${mapDisplay}`, 
            updateUI: true 
        };
    }

    clearDungeonMaps() {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        const mapCount = character.dungeonMaps.length;
        character.dungeonMaps = [];
        this.game.gameState.saveCharacters();
        return { message: `Cleared ${mapCount} dungeon map(s) from your inventory.`, updateUI: true };
    }

    showFirstMap() {
        const userId = this.game.gameState.currentUserId;
        if (!this.game.gameState.characters[userId]) {
            return { message: "You are not currently connected. Try /enter.", updateUI: false };
        }
    
        const character = this.game.gameState.characters[userId];
        if (!character.dungeonMaps || character.dungeonMaps.length === 0) {
            return { message: "You don't have any dungeon maps.", updateUI: false };
        }
    
        const firstMap = character.dungeonMaps[0];
        
        if (!Array.isArray(firstMap) || firstMap.length === 0) {
            return { message: "The dungeon map is empty or invalid.", updateUI: false };
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
    
        const totalRooms = firstMap.flat().filter(room => room && typeof room === 'object').length;
        const message = `Layout of your first dungeon map (${biome}):\n${mapLayout}Dimensions: ${firstMap[0].length} x ${firstMap.length}\nTotal rooms: ${totalRooms}`;
        
        return { message, updateUI: true };
    }
}