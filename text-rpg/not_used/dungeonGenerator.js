class DungeonGenerator {
    static generateDungeonMap(maxWidth, maxHeight, biome, minWidth = 0, minHeight = 0) {
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

    static getRandomBiome() {
        return DUNGEON_BIOMES[Math.floor(Math.random() * DUNGEON_BIOMES.length)];
    }

    static generateDungeonForCharacter(character) {
        const width = 5;  // Set the width of the dungeon
        const height = 5;  // Set the height of the dungeon
        const biome = this.getRandomBiome();
        const dungeonMap = this.generateDungeonMap(width, height, biome);
        
        if (!character.dungeonMaps) {
            character.dungeonMaps = [];
        }
        character.dungeonMaps.push(dungeonMap);
        return { dungeonMap, biome };
    }

    static displayDungeonMap(dungeonMap) {
        let mapLayout = "";
        let biome = "Unknown";
    
        for (let y = 0; y < dungeonMap.length; y++) {
            let row = "";
            for (let x = 0; x < dungeonMap[y].length; x++) {
                const room = dungeonMap[y][x];
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
    
        console.log(`Layout of the dungeon map (${biome}):`);
        console.log(mapLayout);
        console.log(`Dimensions: ${dungeonMap[0].length} x ${dungeonMap.length}`);
        
        const totalRooms = dungeonMap.flat().filter(room => room && typeof room === 'object').length;
        console.log(`Total rooms: ${totalRooms}`);
    }
}