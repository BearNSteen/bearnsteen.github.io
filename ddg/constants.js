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
