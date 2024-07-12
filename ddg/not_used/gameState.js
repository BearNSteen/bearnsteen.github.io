class GameState {
    constructor() {
        this.currentUserId = 'testUser'; // Set a default user ID
        this.characters = {};
        this.dungeonMaps = {};
        this.currentLocation = 'Town'; // Start in Town by default
        this.loadCharacters();
        this.initializeCharacter(); // Automatically initialize character
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

    initializeCharacter() {
        if (!this.characters[this.currentUserId]) {
            this.createCharacter(this.currentUserId, 'NewPlayer');
        }
    }

    setCurrentUser(userId) {
        this.currentUserId = userId;
        this.initializeCharacter();
    }

    getCurrentCharacter() {
        return this.characters[this.currentUserId];
    }

    createCharacter(userId, name) {
        this.characters[userId] = new Character(userId, name, 1, 100, 50, 10, 10, 10);
        this.saveCharacters();
    }

    enterDungeon(dungeonMap) {
        this.dungeonMaps[this.currentUserId] = {
            map: dungeonMap,
            position: [0, 0],
            visitedRooms: new Set(['0,0'])
        };
        this.changeLocation(dungeonMap[0][0].biome);
    }

    leaveDungeon() {
        delete this.dungeonMaps[this.currentUserId];
        this.changeLocation('Town');
    }

    movePlayer(direction) {
        if (!this.dungeonMaps[this.currentUserId]) {
            return false;
        }

        const dungeonData = this.dungeonMaps[this.currentUserId];
        let [x, y] = dungeonData.position;

        switch (direction.toLowerCase()) {
            case 'left': x--; break;
            case 'right': x++; break;
            case 'up': y--; break;
            case 'down': y++; break;
            default: return false;
        }

        if (y < 0 || y >= dungeonData.map.length || x < 0 || x >= dungeonData.map[0].length) {
            return false;
        }

        if (!dungeonData.map[y][x]) {
            return false;
        }

        dungeonData.position = [x, y];
        dungeonData.visitedRooms.add(`${x},${y}`);
        return true;
    }

    getCurrentRoom() {
        const dungeonData = this.dungeonMaps[this.currentUserId];
        if (!dungeonData) return null;

        const [x, y] = dungeonData.position;
        return dungeonData.map[y][x];
    }

    changeLocation(newLocation) {
        this.currentLocation = newLocation;
        const character = this.getCurrentCharacter();
        if (character) {
            character.location = newLocation;
            this.saveCharacters();
        }
    }

    addDungeonMap(dungeonMap) {
        const character = this.getCurrentCharacter();
        if (!character.dungeonMaps) {
            character.dungeonMaps = [];
        }
        character.dungeonMaps.push(dungeonMap);
        this.saveCharacters();
    }

    getLocation() {
        return this.currentLocation;
    }
}

// Create a singleton instance of GameState
const gameState = new GameState();