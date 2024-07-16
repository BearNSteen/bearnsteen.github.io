class UIManager {
    constructor() {
        this.outputElement = document.getElementById('gameOutput');
        this.rightPanel = document.getElementById('rightPanel');
        this.mapOutputElement = document.getElementById('mapOutput');
        this.legendOutputElement = document.getElementById('legendOutput');
        this.inputElement = document.getElementById('commandInput');
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    initializeUI() {
        this.clearOutputs();
        this.updateMap('Town');
    }

    clearOutputs() {
        this.outputElement.innerHTML = '';
        this.mapOutputElement.innerHTML = '';
        this.legendOutputElement.innerHTML = '';
    }

    display(message, rightSide = false) {
        const outputElement = rightSide ? this.legendOutputElement : this.outputElement;
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        outputElement.appendChild(newMessage);
        outputElement.scrollTop = outputElement.scrollHeight;
    }

    updateCharacterInfo(character) {
        this.legendOutputElement.innerHTML = `
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

    updateMap(location, dungeonData = null) {
        if (location === 'Town') {
            this.displayTownMap();
        } else if (dungeonData) {
            this.displayDungeonMap(dungeonData);
        } else {
            this.mapOutputElement.innerHTML = '';
            this.legendOutputElement.innerHTML = '';
        }
    }

    displayTownMap() {
        const townMap = `
            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
            ▒ O ▒ O ▒ O ▒ O ▒ O ▒ O ▒
            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
            ▒ O ▒ O ▒ O ▒ O ▒ O ▒ O ▒
            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
            ▒ O ▒ O ▒ O ▒ O ▒ O ▒ O ▒
            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
            ▒ O ▒ O ▒ G ▒ I ▒ O ▒ O ▒
            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
        `;
        this.mapOutputElement.textContent = townMap;
        this.legendOutputElement.textContent = "Town Legend:\nG: Guild\nI: Inn\nO: Other buildings";
    }

    displayDungeonMap(dungeonData) {
        const { map, position, visitedRooms } = dungeonData;
        let mapStr = "";
        for (let y = 0; y < map.length; y++) {
            let rowStr = "|";
            for (let x = 0; x < map[0].length; x++) {
                if (x === position[0] && y === position[1]) {
                    rowStr += " P ";
                } else if (visitedRooms.has(`${x},${y}`)) {
                    const room = map[y][x];
                    if (room !== null) {
                        rowStr += room.loot.length > 0 ? " I " : "   ";
                    } else {
                        rowStr += "   ";
                    }
                } else if (
                    !visitedRooms.has(`${x},${y}`) &&
                    (Math.abs(x - position[0]) <= 1 && Math.abs(y - position[1]) <= 1)
                ) {
                    rowStr += map[y][x] !== null ? " ? " : "   ";
                } else {
                    rowStr += "   ";
                }
                rowStr += "|";
            }
            mapStr += rowStr + "\n";
        }
        this.mapOutputElement.textContent = mapStr;
        this.legendOutputElement.textContent = "Dungeon Legend:\nP: Player\nI: Item\n?: Unexplored room";
    }

    displayHelp() {
        const commands = [
            "/enter - Enter the game",
            "/rename [name] - Rename your character",
            "/explore [dungeon_index] - Explore a dungeon",
            "/left, /right, /up, /down - Move in the dungeon",
            "/fight [enemy] - Fight an enemy",
            "/item [item_number] - Pick up an item",
            "/leave_dungeon - Leave the current dungeon",
            "/guild - Enter the guild",
            "/get_map - Get a new dungeon map from the guild",
            "/help - Display this help message"
        ];
        this.display("Available commands:");
        commands.forEach(cmd => this.display(cmd));
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawText(text, x, y) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px VCR';
        this.ctx.fillText(text, x, y);
    }
}