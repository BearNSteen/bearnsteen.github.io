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