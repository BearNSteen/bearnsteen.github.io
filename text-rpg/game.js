// Constants
const DUNGEON_BIOMES = [
    "Cave",
    "Crypt",
    "Mine",
    "Swamp",
    "Castle",
    "Forest",
    "Cavern",
    "Wasteland",
    "Underwater Ruins",
    "Volcanic Lair",
    "Floating Islands",
    "Crystal Caverns",
    "Haunted Mansion",
    "Icy Tunnels",
    "Ancient Temple",
    "Fungal Grotto",
    "Mechanical Factory",
    "Abyssal Depths",
    "Petrified Forest",
    "Sandstone Labyrinth",
    "Infested Hive",
    "Otherworldly Dimension",
    "Sunken Shipwreck",
    "Eldritch Library",
    "Fungal Marsh",
    "Corrupted Sanctuary",
    "Clockwork Tower",
    "Abandoned Asylum",
    "Overgrown Greenhouse",
    "Necropolis",
    "Elemental Plane",
    "Crystalline Caverns",
    "Flooded Catacombs",
    "Enchanted Grove",
    "Haunted Forge",
    "Bioluminescent Jungle",
    "Twisted Carnival",
    "Ruined Citadel",
    "Spectral Mausoleum",
    "Fungal Labyrinth",
    "Sunken Atlantis",
    "Astral Plane",
    "Petrified Cavern",
    "Corrupted Laboratory",
    "Volcanic Caldera",
    "Haunted Shipyard",
    "Prismatic Caverns",
    "Overgrown Ruins",
    "Mechanical Labyrinth",
    "Abyssal Trench",
    "Ethereal Sanctuary",
    "Floating Sky Fortress",
    "Abandoned Laboratory",
    "Ancient Tomb",
    "Frozen Tundra",
    "Sandstorm Desert",
    "Corrupted Dreamscape",
    "Enchanted Library",
    "Abyssal Chasm",
    "Sunken Temple",
    "Mirage Oasis",
    "Eldritch Catacombs",
    "Steampunk Factory",
    "Shadow Realm",
    "Interdimensional Rift",
    "Ancient Ruins",
    "Toxic Wasteland",
    "Overgrown Shipwreck",
    "Mystical Grove",
    "Petrified Coral Reef",
    "Spectral Graveyard",
    "Dystopian Megacity",
    "Cursed Mausoleum",
    "Prehistoric Jungle",
    "Haunted Doll Factory",
    "Abandoned Amusement Park",
    "Spectral Opera House",
    "Mechanical Underworld"
];

const CHARTER_DROP_CHANCE = 0.10;  // 10% chance of finding a charter in a dungeon room

const ENEMIES = {
    'Cave': [
        {name: 'Goblin', hp: 50, damage: 10},
        {name: 'Orc', hp: 80, damage: 15},
        {name: 'Troll', hp: 120, damage: 20},
        {name: 'Ogre', hp: 150, damage: 25},
        {name: 'Cave Dragon', hp: 200, damage: 30},
    ],
    'Crypt': [
        {name: 'Skeleton', hp: 60, damage: 12},
        {name: 'Zombie', hp: 70, damage: 15},
        {name: 'Ghost', hp: 80, damage: 18},
        {name: 'Wraith', hp: 100, damage: 22},
        {name: 'Lich', hp: 150, damage: 28},
    ],
    'Mine': [
        {name: 'Kobold', hp: 40, damage: 8},
        {name: 'Gnome', hp: 55, damage: 10},
        {name: 'Dwarf', hp: 70, damage: 12},
        {name: 'Golem', hp: 100, damage: 18},
        {name: 'Elemental', hp: 120, damage: 22},
    ],
    'Swamp': [
        {name: 'Slime', hp: 45, damage: 8},
        {name: 'Lizardman', hp: 65, damage: 12},
        {name: 'Bog Creature', hp: 80, damage: 15},
        {name: 'Hydra', hp: 120, damage: 20},
        {name: 'Swamp Dragon', hp: 180, damage: 25},
    ],
    'Castle': [
        {name: 'Knight', hp: 90, damage: 20},
        {name: 'Archer', hp: 60, damage: 15},
        {name: 'Mage', hp: 80, damage: 25},
        {name: 'Royal Guard', hp: 120, damage: 30},
        {name: 'Castle Lord', hp: 200, damage: 40},
    ],
    'Forest': [
        {name: 'Elf', hp: 70, damage: 15},
        {name: 'Treant', hp: 100, damage: 20},
    ],
    'Cavern': [
        {name: 'Troll', hp: 120, damage: 25},
        {name: 'Bat', hp: 30, damage: 5},
    ],
    'Wasteland': [
        {name: 'Raider', hp: 75, damage: 18},
        {name: 'Scorpion', hp: 50, damage: 12},
    ],
    'Underwater Ruins': [
        {name: 'Mermaid Warrior', hp: 80, damage: 15},
        {name: 'Kraken Spawn', hp: 120, damage: 22},
    ],
    'Volcanic Lair': [
        {name: 'Fire Elemental', hp: 90, damage: 20},
        {name: 'Lava Golem', hp: 150, damage: 30},
    ],
    'Floating Islands': [
        {name: 'Harpy', hp: 60, damage: 12},
        {name: 'Air Elemental', hp: 80, damage: 18},
    ],
    'Crystal Caverns': [
        {name: 'Crystal Golem', hp: 100, damage: 20},
        {name: 'Gemstone Elemental', hp: 70, damage: 15},
    ],
    'Haunted Mansion': [
        {name: 'Ghost', hp: 50, damage: 10},
        {name: 'Vampire', hp: 120, damage: 25},
    ],
    'Icy Tunnels': [
        {name: 'Frost Giant', hp: 150, damage: 30},
        {name: 'Ice Wraith', hp: 70, damage: 15},
    ],
    'Ancient Temple': [
        {name: 'Mummy', hp: 100, damage: 20},
        {name: 'Anubis Guard', hp: 90, damage: 18},
    ],
    'Mushroom Grotto': [
        {name: 'Myconid', hp: 60, damage: 12},
        {name: 'Fungal Beast', hp: 80, damage: 15},
    ],
    'Mechanical Factory': [
        {name: 'Clockwork Soldier', hp: 90, damage: 20},
        {name: 'Repair Bot', hp: 70, damage: 15},
    ],
    'Abyssal Depths': [
        {name: 'Deep One', hp: 120, damage: 25},
        {name: 'Abyssal Horror', hp: 150, damage: 30},
    ],
    'Petrified Woodland': [
        {name: 'Petrified Treant', hp: 100, damage: 20},
        {name: 'Stone Golem', hp: 120, damage: 25},
    ],
    'Sandstone Labyrinth': [
        {name: 'Sand Golem', hp: 90, damage: 18},
        {name: 'Sandstorm Elemental', hp: 80, damage: 15},
    ],
    'Infested Hive': [
        {name: 'Giant Wasp', hp: 70, damage: 15},
        {name: 'Insectoid Warrior', hp: 90, damage: 20},
    ],
    'Otherworldly Dimension': [
        {name: 'Void Creature', hp: 120, damage: 25},
        {name: 'Reality Shifter', hp: 100, damage: 22},
    ],
    'Sunken Shipwreck': [
        {name: 'Drowned Pirate', hp: 80, damage: 18},
        {name: 'Ghostly Captain', hp: 110, damage: 24},
    ],
    'Eldritch Library': [
        {name: 'Animated Book', hp: 60, damage: 12},
        {name: 'Eldritch Horror', hp: 150, damage: 30},
    ],
    'Fungal Marsh': [
        {name: 'Fungal Shambler', hp: 90, damage: 20},
        {name: 'Poisonous Spore', hp: 70, damage: 15},
    ],
    'Corrupted Sanctuary': [
        {name: 'Corrupted Priest', hp: 100, damage: 22},
        {name: 'Shadow Demon', hp: 120, damage: 25},
    ],
    'Clockwork Tower': [
        {name: 'Clockwork Knight', hp: 110, damage: 24},
        {name: 'Gear Golem', hp: 130, damage: 28},
    ],
    'Abandoned Asylum': [
        {name: 'Deranged Patient', hp: 80, damage: 18},
        {name: 'Mad Doctor', hp: 100, damage: 22},
    ],
    'Overgrown Greenhouse': [
        {name: 'Venomous Plant', hp: 70, damage: 15},
        {name: 'Carnivorous Flower', hp: 90, damage: 20},
    ],
    'Necropolis': [
        {name: 'Skeletal Warrior', hp: 100, damage: 22},
        {name: 'Necromancer', hp: 120, damage: 25},
    ],
    'Elemental Plane': [
        {name: 'Elemental Mage', hp: 110, damage: 24},
        {name: 'Elemental Guardian', hp: 130, damage: 28},
    ],
    'Crystalline Cavern': [
        {name: 'Crystal Shard', hp: 80, damage: 18},
        {name: 'Prismatic Golem', hp: 120, damage: 25},
    ],
    'Flooded Catacombs': [
        {name: 'Drowned Corpse', hp: 90, damage: 20},
        {name: 'Aquatic Ghoul', hp: 100, damage: 22},
    ],
    'Enchanted Grove': [
        {name: 'Dryad', hp: 80, damage: 18},
        {name: 'Enchanted Treant', hp: 110, damage: 24},
    ],
    'Haunted Forge': [
        {name: 'Spectral Blacksmith', hp: 100, damage: 22},
        {name: 'Possessed Armor', hp: 120, damage: 25},
    ],
    'Bioluminescent Cave': [
        {name: 'Glowing Mushroom', hp: 70, damage: 15},
        {name: 'Luminescent Slime', hp: 90, damage: 20},
    ],
    'Twisted Carnival': [
        {name: 'Demented Clown', hp: 100, damage: 22},
        {name: 'Carnival Freak', hp: 110, damage: 24},
    ],
    'Ruined Citadel': [
        {name: 'Fallen Paladin', hp: 120, damage: 25},
        {name: 'Spectral Archer', hp: 100, damage: 22},
    ],
    'Spectral Mausoleum': [
        {name: 'Vengeful Spirit', hp: 90, damage: 20},
        {name: 'Wraith', hp: 110, damage: 24},
    ],
    'Fungal Labyrinth': [
        {name: 'Fungal Golem', hp: 130, damage: 28},
        {name: 'Fungal Spore', hp: 80, damage: 18},
    ],
    'Sunken Atlantis': [
        {name: 'Atlantean Warrior', hp: 120, damage: 25},
        {name: 'Deep Sea Creature', hp: 100, damage: 22},
    ],
    'Astral Plane': [
        {name: 'Astral Devourer', hp: 150, damage: 30},
        {name: 'Celestial Guardian', hp: 130, damage: 28},
    ],
    'Petrified Cavern': [
        {name: 'Petrified Golem', hp: 140, damage: 30},
        {name: 'Stone Elemental', hp: 110, damage: 24},
    ],
    'Corrupted Laboratory': [
        {name: 'Mutated Scientist', hp: 100, damage: 22},
        {name: 'Abomination', hp: 120, damage: 25},
    ],
    'Volcanic Caldera': [
        {name: 'Magma Golem', hp: 150, damage: 30},
        {name: 'Fire Drake', hp: 130, damage: 28},
    ],
    'Haunted Shipyard': [
        {name: 'Ghostly Pirate', hp: 90, damage: 20},
        {name: 'Phantom Shipwright', hp: 110, damage: 24},
    ],
    'Prismatic Caverns': [
        {name: 'Chromatic Crystal', hp: 100, damage: 22},
        {name: 'Prismatic Elemental', hp: 120, damage: 25},
    ],
    'Overgrown Ruins': [
        {name: 'Overgrown Golem', hp: 140, damage: 30},
        {name: 'Venomous Vine', hp: 100, damage: 22},
    ],
    'Mechanical Labyrinth': [
        {name: 'Clockwork Minotaur', hp: 150, damage: 30},
        {name: 'Mechanical Spider', hp: 90, damage: 20},
    ],
    'Abyssal Trench': [
        {name: 'Abyssal Leviathan', hp: 200, damage: 35},
        {name: 'Deep Sea Horror', hp: 120, damage: 25},
    ],
    'Ethereal Sanctuary': [
        {name: 'Ethereal Guardian', hp: 130, damage: 28},
        {name: 'Astral Monk', hp: 110, damage: 24},
    ],
    'Floating Sky Fortress': [
        {name: 'Sky Pirate', hp: 100, damage: 22},
        {name: 'Aerial Sentry', hp: 120, damage: 25},
    ],
    'Abandoned Laboratory': [
        {name: 'Escaped Experiment', hp: 90, damage: 20},
        {name: 'Mad Scientist', hp: 110, damage: 24},
    ],
    'Ancient Tomb': [
        {name: 'Mummified Warrior', hp: 120, damage: 25},
        {name: 'Tomb Guardian', hp: 140, damage: 30},
    ],
    'Frozen Tundra': [
        {name: 'Frost Troll', hp: 150, damage: 30},
        {name: 'Ice Elemental', hp: 110, damage: 24},
    ],
    'Sandstorm Desert': [
        {name: 'Sand Wraith', hp: 100, damage: 22},
        {name: 'Desert Nomad', hp: 90, damage: 20},
    ],
    'Corrupted Dreamscape': [
        {name: 'Nightmare Fiend', hp: 120, damage: 25},
        {name: 'Dream Eater', hp: 100, damage: 22},
    ],
    'Enchanted Library': [
        {name: 'Enchanted Tome', hp: 80, damage: 18},
        {name: 'Spectral Librarian', hp: 110, damage: 24},
    ],
    'Abyssal Chasm': [
        {name: 'Abyssal Crawler', hp: 150, damage: 30},
        {name: 'Void Wraith', hp: 120, damage: 25},
    ],
    'Sunken Temple': [
        {name: 'Drowned Priest', hp: 100, damage: 22},
        {name: 'Aquatic Guardian', hp: 130, damage: 28},
    ],
    'Mirage Oasis': [
        {name: 'Mirage Warrior', hp: 100, damage: 22},
        {name: 'Sand Elemental', hp: 110, damage: 24},
    ],
    'Eldritch Catacombs': [
        {name: 'Eldritch Abomination', hp: 150, damage: 30},
        {name: 'Undead Cultist', hp: 90, damage: 20},
    ],
    'Bioluminescent Jungle': [
        {name: 'Luminescent Panther', hp: 120, damage: 25},
        {name: 'Glowing Serpent', hp: 100, damage: 22},
    ],
    'Steampunk Factory': [
        {name: 'Steamborg', hp: 130, damage: 28},
        {name: 'Clockwork Technician', hp: 110, damage: 24},
    ],
    'Shadow Realm': [
        {name: 'Shadow Fiend', hp: 140, damage: 30},
        {name: 'Dark Wraith', hp: 120, damage: 25},
    ],
    'Interdimensional Rift': [
        {name: 'Rift Walker', hp: 150, damage: 30},
        {name: 'Dimensional Shard', hp: 100, damage: 22},
    ],
    'Twisted Fairground': [
        {name: 'Deranged Jester', hp: 110, damage: 24},
        {name: 'Twisted Acrobat', hp: 90, damage: 20},
    ],
    'Ancient Ruins': [
        {name: 'Ancient Guardian', hp: 140, damage: 30},
        {name: 'Spectral Warrior', hp: 120, damage: 25},
    ],
    'Toxic Wasteland': [
        {name: 'Toxic Sludge', hp: 100, damage: 22},
        {name: 'Mutated Beast', hp: 130, damage: 28},
    ],
    'Overgrown Shipwreck': [
        {name: 'Shipwreck Scavenger', hp: 90, damage: 20},
        {name: 'Corrupted Mariner', hp: 110, damage: 24},
    ],
    'Mystical Grove': [
        {name: 'Enchanted Unicorn', hp: 120, damage: 25},
        {name: 'Fairy Trickster', hp: 80, damage: 18},
    ],
    'Haunted Asylum': [
        {name: 'Demented Patient', hp: 100, damage: 22},
        {name: 'Spectral Nurse', hp: 90, damage: 20},
    ],
    'Petrified Coral Reef': [
        {name: 'Petrified Merman', hp: 110, damage: 24},
        {name: 'Coral Golem', hp: 130, damage: 28},
    ],
    'Spectral Graveyard': [
        {name: 'Vengeful Spirit', hp: 120, damage: 25},
        {name: 'Undead Gravedigger', hp: 100, damage: 22},
    ],
    'Volcanic Ash Plains': [
        {name: 'Ash Golem', hp: 140, damage: 30},
        {name: 'Lava Serpent', hp: 110, damage: 24},
    ],
    'Interdimensional Nexus': [
        {name: 'Nexus Guardian', hp: 150, damage: 30},
        {name: 'Dimensional Devourer', hp: 130, damage: 28},
    ],
    'Ethereal Plane': [
        {name: 'Ethereal Wisp', hp: 80, damage: 18},
        {name: 'Celestial Knight', hp: 120, damage: 25},
    ],
    'Dystopian Megacity': [
        {name: 'Cybernetic Enforcer', hp: 140, damage: 30},
        {name: 'Hacker Drone', hp: 100, damage: 22},
    ],
    'Cursed Mausoleum': [
        {name: 'Cursed Mummy', hp: 130, damage: 28},
        {name: 'Necromantic Acolyte', hp: 110, damage: 24},
    ],
    'Prehistoric Jungle': [
        {name: 'Prehistoric Raptor', hp: 120, damage: 25},
        {name: 'Giant Insect', hp: 100, damage: 22},
    ],
    'Haunted Doll Factory': [
        {name: 'Possessed Doll', hp: 90, damage: 20},
        {name: 'Creepy Toymaker', hp: 110, damage: 24},
    ],
    'Crystalline Labyrinth': [
        {name: 'Crystal Minotaur', hp: 150, damage: 30},
        {name: 'Prismatic Shard', hp: 100, damage: 22},
    ],
    'Abandoned Amusement Park': [
        {name: 'Deranged Mascot', hp: 120, damage: 25},
        {name: 'Haunted Animatronic', hp: 140, damage: 30},
    ],
    'Spectral Opera House': [
        {name: 'Phantom Diva', hp: 110, damage: 24},
        {name: 'Ghostly Musician', hp: 90, damage: 20},
    ],
    'Mechanical Underworld': [
        {name: 'Mechanical Cerberus', hp: 150, damage: 30},
        {name: 'Robotic Reaper', hp: 130, damage: 28},
    ],
};

class DungeonRoom {
    constructor(biome, position) {
        this.biome = biome;
        this.position = position;
        this.description = this.generateDescription();
        this.enemies = this.populateEnemies();
        this.loot = this.populateLoot();

        // Small chance of adding a charter item to the room's loot
        if (Math.random() < CHARTER_DROP_CHANCE) {
            const charterItem = CHARTER_ITEMS[Math.floor(Math.random() * CHARTER_ITEMS.length)];
            this.loot.push(charterItem.name);
        }
    }

    generateDescription() {
        const descriptions = {
            "Cave": [
                "You enter a dark cave with stalactites hanging from the ceiling.",
                "The cave walls are damp and the air feels heavy.",
            ],
            "Crypt": [
                "You find yourself in an eerie crypt with ancient tombstones.",
                "The atmosphere is gloomy and the air is stale.",
            ],
            "Mine": [
                "You venture into an abandoned mine with old mining equipment scattered around.",
                "The mine shafts are dimly lit and the air is thick with dust.",
            ],
            "Swamp": [
                "You wade through a murky swamp with twisted trees and stagnant water.",
                "The air is humid and filled with the sounds of buzzing insects.",
            ],
            "Castle": [
                "You explore the ruins of an old castle with crumbling walls and ivy-covered stones.",
                "The castle halls are empty and echoes of the past linger in the air.",
            ],
            "Forest": [
                "You find yourself in a dense forest with tall trees surrounding you.",
                "The room is filled with lush vegetation and the sound of chirping birds.",
            ],
            "Cavern": [
                "You enter a vast cavern with towering rock formations and underground streams.",
                "The cavern is illuminated by bioluminescent fungi and the air is cool and damp.",
            ],
            "Wasteland": [
                "You traverse a desolate wasteland with cracked earth and scattered debris.",
                "The landscape is barren and the air is dry and dusty.",
            ],
            "Underwater Ruins": [
                "You find yourself in the submerged ruins of an ancient city.",
                "The water is murky and the ruins are overgrown with seaweed and coral.",
                "You find yourself submerged in an underwater ruins with ancient structures and coral growth.",
                "The water is murky and the ruins are filled with exotic marine life.",
            ],
            "Volcanic Lair": [
                "You enter a volcanic lair with streams of lava and scorched rock.",
                "The air is hot and filled with the smell of sulfur.",
                "You venture into a volcanic lair with rivers of molten lava and rocky formations.",
                "The air is scorching hot and the ground trembles with volcanic activity.",
            ],
            "Floating Islands": [
                "You step onto a series of floating islands suspended in the sky.",
                "The islands are connected by rickety bridges and the wind whistles through the gaps.",
                "You step onto floating islands suspended in the sky, connected by rickety bridges.",
                "The wind whistles through the islands and the view is breathtaking.",
            ],
            "Crystal Caverns": [
                "You venture into a cavern filled with glittering crystals of various colors.",
                "The crystals emit a soft glow and the air is filled with a gentle hum.",
                "You enter a cavern filled with glittering crystals of various colors and sizes.",
                "The crystals emit a soft glow and the air is filled with a faint hum.",
            ],
            "Haunted Mansion": [
                "You enter a decaying mansion with creaky floorboards and cobweb-covered furniture.",
                "The air is chilly and the walls seem to whisper secrets of the past.",
                "You explore a haunted mansion with creaky floorboards and eerie portraits.",
                "The atmosphere is chilling and you feel the presence of restless spirits.",
            ],
            "Icy Tunnels": [
                "You find yourself in a network of icy tunnels with frozen walls and icicles hanging from the ceiling.",
                "The air is frigid and your breath forms clouds of mist.",
                "You traverse through icy tunnels with frozen walls and icicles hanging from the ceiling.",
            ],
            "Ancient Temple": [
                "You explore the ruins of an ancient temple with crumbling statues and faded hieroglyphs.",
                "The temple is filled with an eerie silence and the air is heavy with mystery.",
                "You discover an ancient temple with intricate carvings and hidden chambers.",
                "The temple is filled with a sense of mystery and long-forgotten secrets.",
            ],
            "Mushroom Grotto": [
                "You enter a grotto filled with giant mushrooms of various colors and sizes.",
                "The air is damp and the ground is spongy beneath your feet.",
            ],
            "Mechanical Factory": [
                "You find yourself in an abandoned mechanical factory with rusting gears and machinery.",
                "The air is filled with the smell of oil and the echoes of long-silent machines.",
                "You find yourself in a mechanical factory with gears, pistons, and clockwork mechanisms.",
                "The air is filled with the sounds of whirring machinery and clanking metal.",
            ],
            "Abyssal Depths": [
                "You descend into the abyssal depths of the ocean, surrounded by inky darkness.",
                "Strange bioluminescent creatures drift past you, casting an eerie glow.",
                "You descend into the abyssal depths, surrounded by darkness and strange bioluminescent creatures.",
                "The pressure is immense and the atmosphere is eerie and unsettling.",
            ],
            "Petrified Woodland": [
                "You enter a petrified woodland with trees turned to stone and a deathly silence.",
                "The air is still and the only sound is the crunch of petrified leaves beneath your feet.",
                "You enter a petrified woodland with trees turned to stone and an unsettling stillness.",
                "The air is heavy and the landscape is devoid of life.",
            ],
            "Sandstone Labyrinth": [
                "You find yourself in a labyrinth of sandstone walls and winding passages.",
                "The air is dry and the walls are etched with ancient symbols.",
                "You find yourself in a sandstone labyrinth with winding passages and intricate carvings.",
                "The air is dry and the labyrinth seems to stretch endlessly.",
            ],
            "Infested Hive": [
                "You venture into a hive infested with giant insects and pulsating egg sacs.",
                "The air is thick with the buzz of wings and the sickly sweet smell of honey.",
                "You venture into an infested hive with writhing insectoid creatures and pulsating walls.",
                "The air is thick with a sickening stench and the sound of chittering echoes around you.",
            ],
            "Otherworldly Dimension": [
                "You step into an otherworldly dimension with swirling colors and distorted reality.",
                "The air feels electric and the laws of physics seem to bend and twist.",
                "You step into an otherworldly dimension with bizarre landscapes and alien flora.",
                "The laws of physics seem distorted and the atmosphere is surreal.",
            ],
            "Sunken Shipwreck": [
                "You explore the sunken wreckage of an old ship, its decks now home to aquatic life.",
                "The water is murky and the corridors are filled with floating debris.",
                "You explore a sunken shipwreck with waterlogged corridors and barnacle-encrusted walls.",
                "The water is murky and the ship creaks and groans with an eerie atmosphere.",
            ],
            "Eldritch Library": [
                "You enter a library filled with ancient tomes and eldritch symbols.",
                "The air is musty and the shelves seem to whisper forbidden knowledge.",
                "You enter an eldritch library with towering bookshelves and ancient tomes.",
                "The air is musty and the library is filled with a sense of forbidden knowledge.",
            ],
            "Fungal Marsh": [
                "You wade through a marsh overgrown with giant fungi and bioluminescent spores.",
                "The air is thick with the smell of decay and the ground squelches beneath your feet.",
                "You wade through a fungal marsh with giant mushrooms and bioluminescent spores.",
                "The air is heavy with moisture and the ground squelches beneath your feet.",
            ],
            "Corrupted Sanctuary": [
                "You enter a corrupted sanctuary with twisted altars and defiled relics.",
                "The air is thick with a malevolent presence and the walls ooze with dark energy.",
                "You enter a corrupted sanctuary with twisted architecture and pulsating veins.",
                "The air is thick with a malevolent presence and the walls seem to whisper dark secrets.",
            ],
            "Clockwork Tower": [
                "You ascend a clockwork tower with intricate gears and ticking mechanisms.",
                "The air is filled with the sound of grinding cogs and the occasional chime of bells.",
                "You ascend a clockwork tower with intricate gears and ticking mechanisms.",
                "The air is filled with the sound of whirring cogs and the tower seems to have a life of its own.",
            ],
            "Abandoned Asylum": [
                "You explore an abandoned asylum with rusted iron bars and echoes of tormented screams.",
                "The air is heavy with the lingering presence of madness and despair.",
                "You explore an abandoned asylum with rusted metal beds and eerie patient records.",
                "The air is heavy with the weight of past suffering and the walls echo with ghostly whispers.",
            ],
            "Overgrown Greenhouse": [
                "You enter an overgrown greenhouse with lush, twisted plants and shattered glass panes.",
                "The air is humid and filled with the scent of exotic flowers and decaying vegetation.",
                "You enter an overgrown greenhouse with twisted vines and mutated plants.",
                "The air is humid and the plants seem to writhe and reach out with sinister intent.",
            ],
            "Necropolis": [
                "You wander into a necropolis with endless rows of tombs and a pervading sense of sorrow.",
                "The air is cold and the silence is broken only by the whispers of restless souls.",
                "You venture into a necropolis with towering mausoleums and endless rows of graves.",
                "The air is cold and the silence is broken only by the whispers of restless spirits.",
            ],
            "Elemental Plane": [
                "You find yourself in an elemental plane with swirling energies and primordial forces.",
                "The air crackles with raw power and the landscape shifts and changes before your eyes.",
                "You step into an elemental plane with swirling energies and raw elemental power.",
                "The air crackles with electricity and the landscape shifts and changes with each step.",
            ],
            "Crystalline Cavern": [
                "You enter a crystalline cavern with jagged, translucent walls and a mesmerizing glow.",
                "The air is filled with a soft hum and the crystals resonate with an otherworldly energy.",
                "You enter a crystalline cavern with shimmering walls and luminescent formations.",
                "The air is filled with a gentle tinkling sound and the cavern seems to pulse with hidden energy.",
            ],
            "Flooded Catacombs": [
                "You wade through flooded catacombs with ancient burial chambers and waterlogged corridors.",
                "The air is damp and the sound of dripping water echoes through the chambers.",
                "You wade through flooded catacombs with water-logged tunnels and submerged tombs.",
                "The water is cold and the air is heavy with the presence of the long-deceased.",
            ],
            "Enchanted Grove": [
                "You step into an enchanted grove with shimmering trees and a carpet of luminescent flowers.",
                "The air is filled with the soft whispers of nature spirits and the rustle of magical leaves.",
                "You discover an enchanted grove with shimmering fairy lights and whimsical flora.",
                "The air is filled with the soft tinkling of chimes and the grove seems to hold a magical secret.",
            ],
            "Haunted Forge": [
                "You enter a haunted forge with remnants of molten metal and spectral blacksmiths.",
                "The air is hot and heavy, and the sound of ethereal hammering rings through the forge.",
                "You enter a haunted forge with spectral blacksmiths and eerie glowing embers.",
                "The air is hot and the sound of hammering echoes through the forge, as if the ghostly workers never rest.",
            ],
            "Bioluminescent Cave": [
                "You venture into a bioluminescent cave with glowing mushrooms and luminescent creatures.",
                "The air is cool and damp, and the soft glow casts an enchanting atmosphere.",
                "You venture into a bioluminescent cave with glowing mushrooms and radiant creatures.",
                "The air is cool and the soft light casts dancing shadows on the cave walls.",
            ],
            "Twisted Carnival": [
                "You find yourself in a twisted carnival with distorted mirrors and eerie laughter.",
                "The air is filled with the scent of stale popcorn and the discordant music of broken rides.",
                "You step into a twisted carnival with warped mirrors and unsettling attractions.",
                "The air is filled with discordant music and the laughter of unseen entities.",
            ],
            "Ruined Citadel": [
                "You explore a ruined citadel with crumbling walls and long-forgotten banners.",
                "The air is heavy with the weight of history and the echoes of ancient battles.",
                "You explore a ruined citadel with crumbling walls and shattered stained glass.",
                "The air is heavy with the weight of forgotten history and the echoes of long-lost battles.",
            ],
            "Spectral Mausoleum": [
                "You enter a spectral mausoleum with translucent walls and ghostly whispers.",
                "The air is chilled and the presence of restless spirits sends shivers down your spine.",
                "You enter a spectral mausoleum with translucent walls and ghostly whispers.",
                "The air is chilled and the mausoleum seems to exist between the realms of the living and the dead.",
            ],
            "Fungal Labyrinth": [
                "You navigate a fungal labyrinth with towering mushrooms and a network of spore-filled tunnels.",
                "The air is thick with the earthy scent of fungi and the sound of distant, inhuman growls.",
                "You navigate a fungal labyrinth with twisting corridors and bioluminescent spores.",
                "The air is thick with the smell of decay and the walls pulse with a sickly warmth.",
            ],
            "Sunken Atlantis": [
                "You discover the sunken ruins of Atlantis, with once-grand structures now submerged.",
                "The water is crystal clear, and schools of colorful fish swim among the ancient ruins.",
                "You discover the sunken ruins of Atlantis with ancient architecture and advanced technology.",
                "The water is clear and the ruins hold secrets of a long-lost civilization.",
            ],
            "Astral Plane": [
                "You find yourself in the astral plane, surrounded by swirling nebulae and celestial bodies.",
                "The air is filled with a sense of cosmic wonder and the whispers of distant realms.",
                "You drift into the astral plane with swirling cosmic energies and celestial bodies.",
                "The air is filled with a gentle hum and the plane seems to stretch into infinity.",
            ],
            "Petrified Cavern": [
                "You enter a petrified cavern with fossilized trees and ancient, mineralized formations.",
                "The air is dry and still, and the cavern walls hold the secrets of eons past.",
                "You enter a petrified cavern with fossilized trees and ancient rock formations.",
                "The air is dry and the cavern holds the silence of eons past.",
            ],
            "Corrupted Laboratory": [
                "You explore a corrupted laboratory with shattered vials and twisted experiments.",
                "The air is thick with the stench of chemicals and the echoes of mad laughter.",
                "You explore a corrupted laboratory with bubbling vats and twisted experiments.",
                "The air is filled with the stench of chemicals and the echoes of long-forgotten screams.",
            ],
            "Volcanic Caldera": [
                "You stand at the edge of a volcanic caldera, with bubbling lava and billowing smoke.",
                "The air is searing hot and filled with the sulfurous odor of the volcanic gases.",
                "You venture into a volcanic caldera with bubbling lava pools and scorched earth.",
                "The air is searing hot and the ground trembles with the fury of the volcano.",
            ],
            "Haunted Shipyard": [
                "You wander through a haunted shipyard with derelict vessels and ghostly apparitions.",
                "The air is heavy with the salty tang of the sea and the eerie creaking of rotting wood.",
                "You enter a haunted shipyard with ghostly vessels and eerie mists.",
                "The air is cold and the sound of creaking wood and clanking chains fills the shipyard.",
            ],
            "Prismatic Caverns": [
                "You enter prismatic caverns with walls that shimmer in a spectrum of colors.",
                "The air is filled with a mesmerizing glow and the echoes of your footsteps create a symphony of light.",
                "You discover prismatic caverns with shimmering crystals and refracting light.",
                "The air is filled with a soft humming and the caverns seem to hold a symphony of colors.",
            ],
            "Overgrown Ruins": [
                "You explore overgrown ruins with crumbling structures and nature reclaiming its territory.",
                "The air is filled with the scent of wildflowers and the chirping of birds nesting in the ruins.",
                "You explore overgrown ruins with crumbling structures and verdant plant life.",
                "The air is heavy with the scent of blooming flowers and the ruins hold the secrets of a forgotten civilization.",
            ],
            "Mechanical Labyrinth": [
                "You find yourself in a mechanical labyrinth with shifting walls and clockwork traps.",
                "The air is filled with the ticking of gears and the hiss of steam-powered mechanisms.",
                "You navigate a mechanical labyrinth with shifting walls and clockwork traps.",
                "The air is filled with the ticking of gears and the labyrinth seems to rearrange itself with each step.",
            ],
            "Abyssal Trench": [
                "You descend into an abyssal trench, surrounded by the crushing pressure of the deep ocean.",
                "Strange, bioluminescent creatures drift past, adapted to the eternal darkness.",
                "You descend into an abyssal trench with crushing depths and bioluminescent creatures.",
                "The water is icy cold and the trench holds the mysteries of the deep sea.",
            ],
            "Ethereal Sanctuary": [
                "You enter an ethereal sanctuary with translucent walls and a serene atmosphere.",
                "The air is filled with a gentle, calming energy and the soft chiming of celestial bells.",
                "You enter an ethereal sanctuary with shimmering mists and celestial energy.",
                "The air is filled with a gentle warmth and the sanctuary seems to exist outside of time and space.",
            ],
            "Floating Sky Fortress": [
                "You ascend to a floating sky fortress, with towering spires and bridges spanning the clouds.",
                "The air is crisp and thin, and the view of the world below is breathtaking.",
                "You ascend to a floating sky fortress with towering spires and billowing clouds.",
                "The air is crisp and the fortress offers a breathtaking view of the world below.",
            ],
            "Abandoned Laboratory": [
                "You explore an abandoned laboratory, with broken equipment and strange, bubbling liquids.",
                "The air is filled with the acrid smell of chemicals and the eerie hum of malfunctioning machines.",
                "You explore an abandoned laboratory with shattered beakers and enigmatic experiments.",
                "The air is stale and the laboratory holds the remnants of long-forgotten research.",
            ],
            "Ancient Tomb": [
                "You enter an ancient tomb, with ornate sarcophagi and hieroglyph-covered walls.",
                "The air is musty and heavy with the weight of centuries, and the silence is broken only by your footsteps.",
                "You enter an ancient tomb with ornate sarcophagi and hieroglyphic inscriptions.",
                "The air is heavy with the dust of centuries and the tomb holds the secrets of the entombed.",
            ],
            "Frozen Tundra": [
                "You trek through a frozen tundra, with endless expanses of ice and snow.",
                "The air is bitingly cold, and the howling wind carries the echoes of distant glaciers.",
                "You traverse a frozen tundra with icy winds and snow-covered landscapes.",
                "The air is bitterly cold and the tundra stretches as far as the eye can see.",
            ],
            "Sandstorm Desert": [
                "You find yourself in a sandstorm-swept desert, with dunes stretching as far as the eye can see.",
                "The air is dry and gritty, and the relentless wind whips the sand into a frenzy.",
                "You brave a sandstorm desert with swirling sands and ancient ruins.",
                "The air is dry and the desert holds the echoes of long-lost civilizations.",
            ],
            "Corrupted Dreamscape": [
                "You enter a corrupted dreamscape, where reality blends with nightmarish visions.",
                "The air is thick with a sense of unease, and the landscape shifts and warps in unsettling ways.",
                "You enter a corrupted dreamscape with twisted nightmares and distorted reality.",
                "The air is heavy with a sense of unease and the dreamscape seems to feed on your deepest fears.",
            ],
            "Enchanted Library": [
                "You explore an enchanted library, with towering bookshelves and magical tomes.",
                "The air is filled with the soft whispers of ancient knowledge and the crackling of arcane energy.",
                "You discover an enchanted library with flying books and mystical tomes.",
                "The air is filled with the whispers of ancient knowledge and the library holds the secrets of the arcane.",
            ],
            "Abyssal Chasm": [
                "You stand at the edge of an abyssal chasm, staring into the unfathomable depths below.",
                "The air is cold and damp, and the darkness seems to pull at your very soul.",
                "You stand at the edge of an abyssal chasm with endless darkness below.",
                "The air is cold and the chasm seems to beckon you into its depths.",
            ],
            "Sunken Temple": [
                "You discover a sunken temple, with water-filled corridors and ancient, submerged altars.",
                "The water is murky and dark, and the eerie silence is broken only by the gentle lapping of waves.",
                "You explore a sunken temple with water-logged chambers and ancient relics.",
                "The water is murky and the temple holds the secrets of a forgotten deity.",
            ],
            "Mirage Oasis": [
                "You stumble upon a mirage oasis, with shimmering pools and lush vegetation.",
                "The air is hot and heavy, and the scent of exotic blooms hangs in the air.",
                "You stumble upon a mirage oasis with shimmering water and lush vegetation.",
                "The air is cool and the oasis seems to be a respite from the harsh desert surroundings.",
            ],
            "Eldritch Catacombs": [
                "You descend into eldritch catacombs, with twisted architecture and sanity-bending geometry.",
                "The air is thick with a sense of dread, and the walls seem to whisper maddening secrets.",
                "You descend into eldritch catacombs with otherworldly inscriptions and unspeakable horrors.",
                "The air is thick with a sense of dread and the catacombs hold the secrets of ancient evils.",
            ],
            "Bioluminescent Jungle": [
                "You venture into a bioluminescent jungle, with glowing plants and mesmerizing fauna.",
                "The air is warm and humid, and the soft glow of the flora casts an enchanting atmosphere.",
                "You venture into a bioluminescent jungle with glowing plants and exotic creatures.",
                "The air is humid and the jungle pulses with a vibrant, unearthly beauty.",
            ],
            "Steampunk Factory": [
                "You explore a steampunk factory, with hissing pipes and clanking machinery.",
                "The air is filled with the scent of oil and the deafening roar of steam-powered engines.",
                "You enter a steampunk factory with hissing pipes and clanking machinery.",
                "The air is filled with the scent of oil and the factory seems to be powered by an unknown energy source.",
            ],
            "Shadow Realm": [
                "You find yourself in a shadow realm, where darkness reigns supreme.",
                "The air is cold and oppressive, and the shadows seem to twist and writhe with a life of their own.",
                "You step into the shadow realm with shifting darkness and eerie whispers.",
                "The air is cold and the realm seems to be a reflection of the darkest corners of your mind.",
            ],
            "Interdimensional Rift": [
                "You step through an interdimensional rift, into a realm of swirling energies and alien vistas.",
                "The air crackles with strange power, and the laws of physics seem to bend and warp around you.",
                "You find yourself in an interdimensional rift with swirling energies and fractured realities.",
                "The air is charged with an otherworldly power and the rift seems to be a gateway to countless worlds.",
            ],
            "Twisted Fairground": [
                "You wander into a twisted fairground, with rusting rides and eerie, distorted music.",
                "The air is filled with the scent of decay and the echoes of long-forgotten laughter.",
                "You enter a twisted fairground with warped attractions and sinister laughter.",
                "The air is filled with a sickly sweet scent and the fairground seems to be a nightmare come to life.",
            ],
            "Ancient Ruins": [
                "You explore ancient ruins, with crumbling columns and overgrown temples.",
                "The air is heavy with the weight of history, and the secrets of long-dead civilizations lie waiting to be uncovered.",
                "You explore ancient ruins with crumbling structures and long-forgotten artifacts.",
                "The air is heavy with the weight of history and the ruins hold the secrets of a once-great civilization.",
            ],
            "Toxic Wasteland": [
                "You find yourself in a toxic wasteland, with pools of sickly sludge and twisted, mutated vegetation.",
                "The air is thick with noxious fumes, and the ground beneath your feet is sticky and foul.",
                "You traverse a toxic wasteland with poisonous fumes and corroded earth.",
                "The air is acrid and the wasteland serves as a stark reminder of the consequences of unchecked pollution.",
            ],
            "Overgrown Shipwreck": [
                "You discover an overgrown shipwreck, with rusting metal and nature reclaiming its hull.",
                "The air is filled with the scent of salt and decay, and the creaking of the ship's remains echoes through the silence.",
                "You discover an overgrown shipwreck with twisted metal and lush vegetation.",
                "The air is filled with the scent of salt and decay, and the shipwreck holds the tales of its ill-fated crew.",
            ],
            "Mystical Grove": [
                "You step into a mystical grove, with ancient trees and shimmering wisps of magic.",
                "The air is filled with the soft whispers of nature spirits, and the very ground seems to thrum with arcane energy.",
                "You enter a mystical grove with enchanted trees and fairy-tale creatures.",
                "The air is filled with a soft, ethereal glow and the grove seems to be a sanctuary of pure magic.",
            ],
            "Haunted Asylum": [
                "You explore a haunted asylum, with rusting iron bars and the echoes of tortured screams.",
                "The air is heavy with the weight of suffering and madness, and the walls seem to whisper dark secrets.",
                "You explore a haunted asylum with echoing hallways and tortured spirits.",
                "The air is heavy with the weight of past suffering and the asylum holds the secrets of its disturbed patients.",
            ],
            "Petrified Coral Reef": [
                "You discover a petrified coral reef, with ancient, mineralized formations and eerie, frozen beauty.",
                "The water is crystal clear, and the petrified coral glimmers with an otherworldly light.",
                "You discover a petrified coral reef with fossilized formations and ancient sea life.",
                "The water is crystal clear and the reef holds the beauty of a long-forgotten underwater world.",
            ],
            "Spectral Graveyard": [
                "You wander into a spectral graveyard, with ghostly tombstones and an eerie, otherworldly atmosphere.",
                "The air is cold and still, and the whispers of restless spirits echo through the night.",
                "You wander through a spectral graveyard with ghostly apparitions and eerie tombstones.",
                "The air is chilled and the graveyard seems to be a liminal space between the realms of the living and the dead.",
            ],
            "Volcanic Ash Plains": [
                "You trek through volcanic ash plains, with smoldering vents and the crunch of ash beneath your feet.",
                "The air is thick with the scent of sulfur, and the heat of the nearby lava flows is almost unbearable.",
                "You traverse volcanic ash plains with smoldering vents and blackened earth.",
                "The air is thick with the scent of sulfur and the plains hold the remnants of past eruptions.",
            ],
            "Interdimensional Nexus": [
                "You find yourself in an interdimensional nexus, where countless realms converge and collide.",
                "The air is filled with a cacophony of sounds and sensations, and the very fabric of reality seems to warp and twist around you.",
                "You step into an interdimensional nexus with converging pathways and shifting portals.",
                "The air is charged with a strange energy and the nexus seems to be a hub connecting countless realms.",
            ],
            "Ethereal Plane": [
                "You step into the ethereal plane, a realm of mist and shadow.",
                "The air is cool and damp, and the boundaries between the material world and the spirit realm seem to blur and fade.",
                "You enter the ethereal plane with shimmering mists and translucent forms.",
                "The air is filled with a gentle, pulsing energy and the plane seems to be a realm of pure spirit.",
            ],
            "Dystopian Megacity": [
                "You find yourself in a dystopian megacity, with towering skyscrapers and neon-lit streets.",
                "The air is thick with the scent of pollution and the constant hum of machinery, and the weight of oppression hangs heavy in the air.",
                "You find yourself in a dystopian megacity with towering skyscrapers and neon lights.",
                "The air is thick with the smog of industry and the city holds the secrets of a society on the brink of collapse.",
            ],
            "Cursed Mausoleum": [
                "You enter a cursed mausoleum, with cracked marble and the stench of decay.",
                "The air is heavy with the weight of dark magic, and the whispers of the damned echo through the halls.",
                "You enter a cursed mausoleum with ancient sarcophagi and malevolent spirits.",
                "The air is heavy with a sense of dread and the mausoleum holds the secrets of a powerful, vengeful entity.",
            ],
            "Prehistoric Jungle": [
                "You venture into a prehistoric jungle, with towering ferns and the calls of ancient beasts.",
                "The air is hot and humid, and the very ground seems to throb with the primal energy of a long-lost era.",
                "You venture into a prehistoric jungle with towering ferns and primitive creatures.",
                "The air is hot and humid, and the jungle holds the echoes of a time long before human history.",
            ],
            "Haunted Doll Factory": [
                "You explore a haunted doll factory, with rows of lifeless eyes and the echoes of children's laughter.",
                "The air is thick with the scent of dust and decay, and the dolls seem to watch your every move.",
                "You explore a haunted doll factory with rows of lifeless eyes and eerie whispers.",
                "The air is filled with the scent of old plastic and the factory holds the secrets of its cursed creations.",
            ],
            "Crystalline Labyrinth": [
                "You find yourself in a crystalline labyrinth, with shifting walls and a mesmerizing, prismatic glow.",
                "The air is filled with the soft chiming of crystals, and the very ground seems to pulse with an otherworldly energy.",
                "You navigate a crystalline labyrinth with refracting walls and shimmering pathways.",
                "The air is filled with a soft tinkling sound and the labyrinth seems to hold a hidden, mesmerizing beauty.",
            ],
            "Abandoned Amusement Park": [
                "You wander into an abandoned amusement park, with rusting rides and the echoes of long-forgotten laughter.",
                "The air is thick with the scent of decay and neglect, and the silence is broken only by the creaking of old metal.",
                "You wander through an abandoned amusement park with rusting rides and eerie laughter.",
                "The air is filled with the echoes of long-gone joy and the park holds the secrets of its abrupt closure.",
            ],
            "Spectral Opera House": [
                "You enter a spectral opera house, with velvet curtains and the ghostly echoes of long-forgotten performances.",
                "The air is cold and still, and the whispers of the past seem to hang heavy in the air.",
                "You enter a spectral opera house with ghostly performers and haunting melodies.",
                "The air is filled with the echoes of long-forgotten arias and the opera house holds the secrets of its tragic past.",
            ],
            "Mechanical Underworld": [
                "You descend into a mechanical underworld, with grinding gears and the hiss of steam.",
                "The air is thick with the scent of oil and metal, and the constant clanking of machinery fills your ears.",
                "You descend into a mechanical underworld with grinding gears and steaming pipes.",
                "The air is hot and the underworld holds the secrets of an advanced, subterranean civilization.",
            ],
        };
    
        if (this.biome in descriptions) {
            return descriptions[this.biome][Math.floor(Math.random() * descriptions[this.biome].length)];
        } else {
            return `You enter a mysterious area known as the ${this.biome}. The surroundings are unfamiliar and intriguing.`;
        }
    }

    populateEnemies() {
        if (Math.random() < 0.6) {
            const numEnemies = Math.floor(Math.random() * 3) + 1;
            return Array(numEnemies).fill().map(() => {
                const enemyList = ENEMIES[this.biome];
                const enemyChances = this.calculateEnemyChances(enemyList.length);
                const enemyData = enemyList[this.weightedRandomChoice(enemyChances)];
                return enemyData.name;
            });
        }
        return [];
    }

    calculateEnemyChances(numEnemies) {
        const totalWeight = numEnemies * (numEnemies + 1) / 2;
        return Array(numEnemies).fill().map((_, i) => (numEnemies - i) / totalWeight);
    }

    weightedRandomChoice(chances) {
        const random = Math.random();
        let cumulativeProbability = 0;
        for (let i = 0; i < chances.length; i++) {
            cumulativeProbability += chances[i];
            if (random < cumulativeProbability) {
                return i;
            }
        }
        return chances.length - 1;
    }

    populateLoot() {
        if (Math.random() < 0.4) {
            const numItems = Math.floor(Math.random() * 2) + 1;
            return Array(numItems).fill().map(() => {
                console.log(this.biome)
                const itemData = ITEMS[this.biome][Math.floor(Math.random() * ITEMS[this.biome].length)];
                return itemData.name;
            });
        }
        return [];
    }
}

function generateDungeonMap(maxWidth, maxHeight, biome, minWidth = 3, minHeight = 3) {
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
    const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    const dungeonMap = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            if (Math.random() < 0.7 || (x === 0 && y === 0)) {  // Always create a room at [0,0]
                row.push(new DungeonRoom(biome, [x, y]));
            } else {
                row.push(null);
            }
        }
        dungeonMap.push(row);
    }

    // Ensure there's at least one room in the dungeon
    if (dungeonMap.every(row => row.every(room => room === null))) {
        dungeonMap[0][0] = new DungeonRoom(biome, [0, 0]);
    }

    return dungeonMap;
}

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
        this.dungeonMaps = [];
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
        } else if (character.location === "guild_lobby") {
            const guildLobbyMap = `
    ┌─────────────────────────────┐
    │                             │
    │                             │
    │          Reception          │
    │                             │
    │                             │
    └─────────────────────────────┘
                
    /get_map - Receive dungeon map
    /leave - Return to town
            `;
            mapOutput.textContent = guildLobbyMap;
            legendOutput.textContent = "Guild Lobby Legend:\n/get_map: Receive dungeon map\n/leave: Return to town";
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
    │                             │
    │                             │
    │          Reception          │
    │                             │
    │                             │
    └─────────────────────────────┘
                
    /get_map - Receive dungeon map
    /leave - Return to town
    `;
            mapOutput.textContent = guildLobbyMap;
            legendOutput.textContent = "Guild Lobby Legend:\n/get_map: Receive dungeon map\n/leave: Return to town";
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
                            rowStr += "   ";
                        }
                    } else if (
                        !visitedRooms.has(`${x},${y}`) &&
                        (Math.abs(x - position[0]) <= 1 && Math.abs(y - position[1]) <= 1)
                    ) {
                        const room = dungeonMap[y][x];
                        if (room !== null) {
                            rowStr += " ? ";
                        } else {
                            rowStr += "   ";
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
            legendOutput.textContent = "Dungeon Legend:\nP: Player\nI: Item\n?: Unexplored room";
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
