class Item {
    constructor(name, value, itemType, damage = 0, defense = 0, healing = 0) {
        this.name = name;
        this.value = value;
        this.itemType = itemType;
        this.damage = damage;
        this.defense = defense;
        this.healing = healing;
    }
}

// Cave items
const item_health_potion = new Item("Health Potion", 20, "Potion", 0, 0, 50);
const item_rusty_sword = new Item("Rusty Sword", 30, "Weapon", 10);

// Crypt items
const item_ancient_amulet = new Item("Ancient Amulet", 50, "Accessory");
const item_skeleton_key = new Item("Skeleton Key", 25, "Key");

// Mine items
const item_pickaxe = new Item("Pickaxe", 40, "Tool");
const item_lantern = new Item("Lantern", 15, "Tool");

// Swamp items
const item_antidote = new Item("Antidote", 30, "Potion", 0, 0, 30);
const item_rubber_boots = new Item("Rubber Boots", 20, "Armor", 0, 5);

// Castle items
const item_knight_shield = new Item("Knight Shield", 60, "Armor", 0, 20);
const item_royal_scepter = new Item("Royal Scepter", 80, "Weapon", 25);

// Forest items
const item_elven_bow = new Item("Elven Bow", 70, "Weapon", 30);
const item_natures_blessing = new Item("Nature's Blessing", 45, "Potion", 0, 0, 60);

// Cavern items
const item_stalagmite_hammer = new Item("Stalagmite Hammer", 65, "Weapon", 35);
const item_glowing_mushroom = new Item("Glowing Mushroom", 35, "Potion", 0, 0, 40);

// Wasteland items
const item_scavenged_armor = new Item("Scavenged Armor", 55, "Armor", 0, 15);
const item_wasteland_map = new Item("Wasteland Map", 40, "Map");

// Underwater Ruins items
const item_trident = new Item("Trident", 75, "Weapon", 40);
const item_mermaids_tear = new Item("Mermaid's Tear", 60, "Accessory");

// Volcanic Lair items
const item_fire_essence = new Item("Fire Essence", 60, "Crafting");
const item_obsidian_shield = new Item("Obsidian Shield", 70, "Armor", 0, 25);
const item_fire_resistant_cloak = new Item("Fire Resistant Cloak", 80, "Armor", 0, 20);
const item_obsidian_dagger = new Item("Obsidian Dagger", 70, "Weapon", 30);

// Floating Islands items
const item_cloud_boots = new Item("Cloud Boots", 55, "Armor", 0, 10);
const item_sky_crystal = new Item("Sky Crystal", 65, "Crafting");
const item_feather_of_flight = new Item("Feather of Flight", 90, "Accessory");

// Crystal Caverns items
const item_prismatic_shard = new Item("Prismatic Shard", 80, "Crafting");
const item_geode_hammer = new Item("Geode Hammer", 60, "Weapon", 40);
const item_crystal_golem_heart = new Item("Crystal Golem Heart", 90, "Crafting");
const item_refracted_light_prism = new Item("Refracted Light Prism", 85, "Accessory");

// Haunted Mansion items
const item_ghostly_lantern = new Item("Ghostly Lantern", 45, "Accessory");
const item_cursed_mirror = new Item("Cursed Mirror", 70, "Accessory");
const item_ghost_lantern = new Item("Ghost Lantern", 75, "Accessory");
const item_spectral_cloak = new Item("Spectral Cloak", 70, "Armor", 0, 20);

// Icy Tunnels items
const item_frost_axe = new Item("Frost Axe", 65, "Weapon", 45);
const item_snowflake_charm = new Item("Snowflake Charm", 40, "Accessory");
const item_snowflake_amulet = new Item("Snowflake Amulet", 75, "Accessory");
const item_frost_rune = new Item("Frost Rune", 70, "Crafting");

// Ancient Temple items
const item_golden_idol = new Item("Golden Idol", 90, "Accessory");
const item_sacred_scroll = new Item("Sacred Scroll", 75, "Accessory");
const item_sacred_relic = new Item("Sacred Relic", 100, "Accessory");
const item_hieroglyph_scroll = new Item("Hieroglyph Scroll", 90, "Accessory");

// Mushroom Grotto items
const item_spore_bomb = new Item("Spore Bomb", 50, "Consumable");
const item_fungal_staff = new Item("Fungal Staff", 60, "Weapon", 35);
const item_spore_sack = new Item("Spore Sack", 60, "Crafting");

// Mechanical Factory items
const item_gears = new Item("Gears", 35, "Crafting");
const item_clockwork_key = new Item("Clockwork Key", 45, "Key");
const item_robotic_arm = new Item("Robotic Arm", 90, "Accessory");

// Abyssal Depths items
const item_abyssal_pearl = new Item("Abyssal Pearl", 80, "Accessory");
const item_kraken_tooth = new Item("Kraken Tooth", 70, "Crafting");
const item_deep_sea_relic = new Item("Deep Sea Relic", 85, "Accessory");
const item_krakens_eye = new Item("Kraken's Eye", 85, "Accessory");

// Petrified Woodland items
const item_stone_bark = new Item("Stone Bark", 40, "Crafting");
const item_fossilized_amber = new Item("Fossilized Amber", 55, "Crafting");
const item_petrified_wood_bow = new Item("Petrified Wood Bow", 80, "Weapon", 50);
const item_fossil_fragment = new Item("Fossil Fragment", 55, "Crafting");

// Sandstone Labyrinth items
const item_desert_compass = new Item("Desert Compass", 50, "Accessory");
const item_sandstorm_cloak = new Item("Sandstorm Cloak", 60, "Armor", 0, 15);
const item_sphinxs_riddle = new Item("Sphinx's Riddle", 85, "Accessory");

// Infested Hive items
const item_hive_wax = new Item("Hive Wax", 35, "Crafting");
const item_queens_nectar = new Item("Queen's Nectar", 65, "Potion", 0, 0, 50);
const item_chitin_armor = new Item("Chitin Armor", 90, "Armor", 0, 30);

// Otherworldly Dimension items
const item_void_crystal = new Item("Void Crystal", 90, "Crafting");
const item_reality_shifter = new Item("Reality Shifter", 80, "Accessory");
const item_dimensional_key = new Item("Dimensional Key", 95, "Key");
const item_alien_artifact = new Item("Alien Artifact", 90, "Accessory");

// Sunken Shipwreck items
const item_pirates_compass = new Item("Pirate's Compass", 55, "Accessory");
const item_mermaid_scale = new Item("Mermaid Scale", 70, "Crafting");
const item_pirates_treasure_map = new Item("Pirate's Treasure Map", 90, "Map");
const item_enchanted_compass = new Item("Enchanted Compass", 85, "Accessory");
const item_barnacle_covered_chest = new Item("Barnacle Covered Chest", 85, "container");

// Eldritch Library items
const item_forbidden_tome = new Item("Forbidden Tome", 75, "Accessory");
const item_eldritch_ink = new Item("Eldritch Ink", 60, "Crafting");
const item_tome_of_forbidden_knowledge = new Item("Tome of Forbidden Knowledge", 100, "Accessory");
const item_eldritch_quill = new Item("Eldritch Quill", 95, "Accessory");

// Fungal Marsh items
const item_spore_sac = new Item("Spore Sac", 45, "Crafting");
const item_fungal_boots = new Item("Fungal Boots", 55, "Armor", 0, 10);
const item_fungal_spores = new Item("Fungal Spores", 70, "Crafting");
const item_marsh_gas_mask = new Item("Marsh Gas Mask", 80, "Armor", 0, 20);

// Corrupted Sanctuary items
const item_corrupted_relic = new Item("Corrupted Relic", 80, "Accessory");
const item_purifying_incense = new Item("Purifying Incense", 65, "Consumable");
const item_purifying_talisman = new Item("Purifying Talisman", 90, "Accessory");

// Clockwork Tower items
const item_clockwork_heart = new Item("Clockwork Heart", 90, "Crafting");
const item_brass_key = new Item("Brass Key", 50, "Key");
const item_clockwork_wings = new Item("Clockwork Wings", 100, "Accessory");
const item_temporal_gear = new Item("Temporal Gear", 95, "Crafting");

// Abandoned Asylum items
const item_straitjacket = new Item("Straitjacket", 45, "Armor", 0, 5);
const item_madness_serum = new Item("Madness Serum", 70, "Potion");
const item_patient_records = new Item("Patient Records", 70, "Accessory");
const item_asylum_key = new Item("Asylum Key", 95, "Key");

// Overgrown Greenhouse items
const item_vine_whip = new Item("Vine Whip", 55, "Weapon", 30);
const item_mutated_seeds = new Item("Mutated Seeds", 60, "Crafting");
const item_carnivorous_plant_seed = new Item("Carnivorous Plant Seed", 80, "Crafting");
const item_floral_essence = new Item("Floral Essence", 75, "Crafting");

// Necropolis items
const item_skull_scepter = new Item("Skull Scepter", 80, "Weapon", 50);
const item_lich_phylactery = new Item("Lich Phylactery", 95, "Accessory");
const item_necromancers_staff = new Item("Necromancer's Staff", 100, "Weapon", 60);
const item_soul_gem = new Item("Soul Gem", 95, "Crafting");

// Elemental Plane items
const item_elemental_orb = new Item("Elemental Orb", 75, "Accessory");
const item_primordial_essence = new Item("Primordial Essence", 85, "Crafting");
const item_elemental_orb_2 = new Item("Elemental Orb", 100, "Accessory");

// Crystalline Cavern items
const item_crystal_heart = new Item("Crystal Heart", 70, "Accessory");
const item_resonating_shard = new Item("Resonating Shard", 60, "Crafting");
const item_prismatic_geode_2 = new Item("Prismatic Geode", 100, "Crafting");
const item_chromatic_crystal = new Item("Chromatic Crystal", 95, "Crafting");

// Flooded Catacombs items
const item_waterlogged_scroll = new Item("Waterlogged Scroll", 50, "Accessory");
const item_drowned_treasure = new Item("Drowned Treasure", 80, "Accessory");
const item_waterbreathing_amulet = new Item("Waterbreathing Amulet", 80, "Accessory");
const item_undead_pirates_cutlass = new Item("Undead Pirate's Cutlass", 90, "Weapon", 55);

// Enchanted Grove items
const item_fairy_dust = new Item("Fairy Dust", 55, "Crafting");
const item_enchanted_acorn = new Item("Enchanted Acorn", 45, "Crafting");
const item_enchanted_bark = new Item("Enchanted Bark", 65, "Crafting");

// Haunted Forge items
const item_spectral_hammer = new Item("Spectral Hammer", 75, "Weapon", 45);
const item_cursed_anvil = new Item("Cursed Anvil", 65, "Crafting");
const item_ghost_metal_ingot = new Item("Ghost Metal Ingot", 95, "Crafting");

// Bioluminescent Cave items
const item_glowworm_lantern = new Item("Glowworm Lantern", 60, "Accessory");
const item_bioluminescent_ore = new Item("Bioluminescent Ore", 70, "Crafting");
const item_glowing_algae = new Item("Glowing Algae", 70, "Crafting");
const item_bioluminescent_crystal = new Item("Bioluminescent Crystal", 80, "Crafting");

// Twisted Carnival items
const item_jesters_mask = new Item("Jester's Mask", 55, "Accessory");
const item_funhouse_mirror = new Item("Funhouse Mirror", 65, "Accessory");
const item_twisted_lollipop = new Item("Twisted Lollipop", 60, "Consumable");
const item_funhouse_ticket = new Item("Funhouse Ticket", 55, "Key");

// Ruined Citadel items
const item_rusted_crown = new Item("Rusted Crown", 70, "Accessory");
const item_ancient_tapestry = new Item("Ancient Tapestry", 60, "Accessory");
const item_ancient_kings_crown = new Item("Ancient King's Crown", 100, "Accessory");
const item_runic_battleaxe = new Item("Runic Battleaxe", 95, "Weapon", 60);

// Spectral Mausoleum items
const item_ghostly_candelabra = new Item("Ghostly Candelabra", 65, "Accessory");
const item_wraiths_cloak = new Item("Wraith's Cloak", 75, "Armor", 0, 25);
const item_ghostly_lantern_2 = new Item("Ghostly Lantern", 80, "Accessory");
const item_ectoplasmic_residue = new Item("Ectoplasmic Residue", 75, "Crafting");

// Fungal Labyrinth items
const item_fungal_spores_2 = new Item("Fungal Spores", 50, "Crafting");
const item_mushroom_cap = new Item("Mushroom Cap", 55, "Crafting");
const item_fungal_spore_bomb = new Item("Fungal Spore Bomb", 90, "Consumable");
const item_mycelium_map = new Item("Mycelium Map", 85, "Map");

// Sunken Atlantis items
const item_atlantean_relic = new Item("Atlantean Relic", 90, "Accessory");
const item_mermaids_tear_2 = new Item("Mermaid's Tear", 80, "Crafting");
const item_atlantean_trident = new Item("Atlantean Trident", 100, "Weapon", 60);
const item_mermaids_tear_necklace = new Item("Mermaid's Tear Necklace", 95, "Accessory");

// Astral Plane items
const item_astral_dust = new Item("Astral Dust", 85, "Crafting");
const item_celestial_orb = new Item("Celestial Orb", 95, "Accessory");
const item_astral_essence = new Item("Astral Essence", 100, "Crafting");
const item_starlight_cloak = new Item("Starlight Cloak", 95, "Armor", 0, 30);
const item_astral_map = new Item("Astral Map", 85, "Map");

// Petrified Cavern items
const item_petrified_wood_2 = new Item("Petrified Wood", 60, "Crafting");
const item_fossil_fragment_2 = new Item("Fossil Fragment", 55, "Crafting");
const item_petrified_wood_shield = new Item("Petrified Wood Shield", 85, "Armor", 0, 25);
const item_fossilized_insect = new Item("Fossilized Insect", 80, "Accessory");

// Corrupted Laboratory items
const item_corrupted_sample = new Item("Corrupted Sample", 75, "Crafting");
const item_experiment_log = new Item("Experiment Log", 65, "Accessory");
const item_corrupted_experiment = new Item("Corrupted Experiment", 95, "Accessory");
const item_hazmat_suit = new Item("Hazmat Suit", 90, "Armor", 0, 30);

// Volcanic Caldera items
const item_lava_crystal = new Item("Lava Crystal", 80, "Crafting");
const item_volcanic_ash = new Item("Volcanic Ash", 70, "Crafting");
const item_volcanic_glass = new Item("Volcanic Glass", 80, "Crafting");
const item_ash_covered_relic = new Item("Ash Covered Relic", 85, "Accessory");
const item_volcanic_ash_potion = new Item("Volcanic Ash Potion", 85, "Potion", 0, 0, 60);

// Haunted Shipyard items
const item_cursed_compass = new Item("Cursed Compass", 65, "Accessory");
const item_ghost_ship_figurine = new Item("Ghost Ship Figurine", 75, "Accessory");
const item_cursed_pirates_compass = new Item("Cursed Pirate's Compass", 95, "Accessory");
const item_ghost_ship_figurehead = new Item("Ghost Ship Figurehead", 90, "Accessory");

// Prismatic Caverns items
const item_prismatic_geode_3 = new Item("Prismatic Geode", 85, "Crafting");
const item_refracted_light = new Item("Refracted Light", 90, "Crafting");
const item_prismatic_shard_2 = new Item("Prismatic Shard", 80, "Crafting");

// Overgrown Ruins items
const item_ancient_seed = new Item("Ancient Seed", 60, "Crafting");
const item_overgrown_statue = new Item("Overgrown Statue", 70, "Accessory");
const item_overgrown_idol = new Item("Overgrown Idol", 85, "Accessory");
const item_ancient_vine_whip = new Item("Ancient Vine Whip", 80, "Weapon", 50);
const item_overgrown_anchor_2 = new Item("Overgrown Anchor", 80, "Accessory");

// Mechanical Labyrinth items
const item_cog_wheel = new Item("Cog Wheel", 55, "Crafting");
const item_clockwork_compass = new Item("Clockwork Compass", 65, "Accessory");
const item_automaton_core = new Item("Automaton Core", 90, "Crafting");

// Abyssal Trench items
const item_abyssal_scale = new Item("Abyssal Scale", 90, "Crafting");
const item_deep_sea_relic_2 = new Item("Deep Sea Relic", 85, "Accessory");
const item_abyssal_jellyfish_glow = new Item("Abyssal Jellyfish Glow", 90, "Crafting");
const item_deep_sea_scales = new Item("Deep Sea Scales", 85, "Crafting");

// Ethereal Sanctuary items
const item_ethereal_feather = new Item("Ethereal Feather", 75, "Crafting");
const item_spirit_essence = new Item("Spirit Essence", 80, "Crafting");
const item_ethereal_essence_2 = new Item("Ethereal Essence", 100, "Crafting");
const item_spirit_ward = new Item("Spirit Ward", 95, "Accessory");

// Floating Sky Fortress items
const item_sky_diamond = new Item("Sky Diamond", 95, "Crafting");
const item_floating_rune = new Item("Floating Rune", 85, "Crafting");
const item_skyship_fuel_cell = new Item("Skyship Fuel Cell", 95, "Crafting");
const item_anti_gravity_boots = new Item("Anti-Gravity Boots", 90, "Armor", 0, 30);

// Abandoned Laboratory items
const item_experimental_serum = new Item("Experimental Serum", 70, "Potion");
const item_lab_coat = new Item("Lab Coat", 60, "Armor", 0, 10);
const item_prototype_gadget = new Item("Prototype Gadget", 80, "Accessory");

// Ancient Tomb items
const item_mummy_wraps = new Item("Mummy Wraps", 65, "Crafting");
const item_canopic_jar = new Item("Canopic Jar", 75, "Accessory");
const item_pharaohs_scepter = new Item("Pharaoh's Scepter", 100, "Weapon", 60);

// Frozen Tundra items
const item_frost_rune_2 = new Item("Frost Rune", 70, "Crafting");
const item_ice_crystal = new Item("Ice Crystal", 60, "Crafting");
const item_frost_giants_tooth = new Item("Frost Giant's Tooth", 90, "Crafting");

// Sandstorm Desert items
const item_sand_goggles = new Item("Sand Goggles", 55, "Accessory");
const item_desert_rose = new Item("Desert Rose", 65, "Accessory");
const item_sand_golem_core = new Item("Sand Golem Core", 95, "Crafting");
const item_oasis_water = new Item("Oasis Water", 90, "Potion", 0, 0, 70);

// Corrupted Dreamscape items
const item_nightmare_fuel = new Item("Nightmare Fuel", 80, "Crafting");
const item_dream_catcher = new Item("Dream Catcher", 75, "Accessory");

// Enchanted Library items
const item_enchanted_quill_2 = new Item("Enchanted Quill", 70, "Accessory");
const item_spell_scroll = new Item("Spell Scroll", 65, "Consumable");

// Abyssal Chasm items
const item_void_shard = new Item("Void Shard", 90, "Crafting");
const item_abyss_walker_boots = new Item("Abyss Walker Boots", 85, "Armor", 0, 25);
const item_void_crystal_2 = new Item("Void Crystal", 100, "Crafting");
const item_abyssal_rune = new Item("Abyssal Rune", 95, "Crafting");

// Charter items
const item_tavern_charter = new Item("Tavern Charter", 1000, "charter");
const item_blacksmith_charter = new Item("Blacksmith Charter", 1000, "charter");
const item_alchemist_charter = new Item("Alchemist Charter", 1000, "charter");
const item_mage_tower_charter = new Item("Mage Tower Charter", 1000, "charter");
const item_library_charter = new Item("Library Charter", 1000, "charter");
const item_stables_charter = new Item("Stables Charter", 1000, "charter");
const item_weapon_shop_charter = new Item("Weapon Shop Charter", 1000, "charter");
const item_herbalist_charter = new Item("Herbalist Charter", 1000, "charter");
const item_chapel_charter = new Item("Chapel Charter", 1000, "charter");
const item_rune_shop_charter = new Item("Rune Shop Charter", 1000, "charter");
const item_fletcher_charter = new Item("Fletcher Charter", 1000, "charter");

const ITEMS = {
    "Cave": [item_health_potion, item_rusty_sword],
    "Crypt": [item_ancient_amulet, item_skeleton_key],
    "Mine": [item_pickaxe, item_lantern],
    "Swamp": [item_antidote, item_rubber_boots],
    "Castle": [item_knight_shield, item_royal_scepter],
    "Forest": [item_elven_bow, item_natures_blessing],
    "Cavern": [item_stalagmite_hammer, item_glowing_mushroom],
    "Wasteland": [item_scavenged_armor, item_wasteland_map],
    "Underwater Ruins": [item_trident, item_mermaids_tear],
    "Volcanic Lair": [item_fire_essence, item_obsidian_shield, item_fire_resistant_cloak, item_obsidian_dagger],
    "Floating Islands": [item_cloud_boots, item_sky_crystal, item_feather_of_flight],
    "Crystal Caverns": [item_prismatic_shard, item_geode_hammer, item_crystal_golem_heart, item_refracted_light_prism],
    "Haunted Mansion": [item_ghostly_lantern, item_cursed_mirror, item_ghost_lantern, item_spectral_cloak],
    "Icy Tunnels": [item_frost_axe, item_snowflake_charm, item_snowflake_amulet, item_frost_rune],
    "Ancient Temple": [item_golden_idol, item_sacred_scroll, item_sacred_relic, item_hieroglyph_scroll],
    "Mushroom Grotto": [item_spore_bomb, item_fungal_staff, item_spore_sack],
    "Mechanical Factory": [item_gears, item_clockwork_key, item_robotic_arm],
    "Abyssal Depths": [item_abyssal_pearl, item_kraken_tooth, item_deep_sea_relic, item_krakens_eye],
    "Petrified Woodland": [item_stone_bark, item_fossilized_amber, item_petrified_wood_bow, item_fossil_fragment],
    "Sandstone Labyrinth": [item_desert_compass, item_sandstorm_cloak, item_sphinxs_riddle],
    "Infested Hive": [item_hive_wax, item_queens_nectar, item_chitin_armor],
    "Otherworldly Dimension": [item_void_crystal, item_reality_shifter, item_dimensional_key, item_alien_artifact],
    "Sunken Shipwreck": [item_pirates_compass, item_mermaid_scale, item_pirates_treasure_map, item_enchanted_compass, item_barnacle_covered_chest],
    "Eldritch Library": [item_forbidden_tome, item_eldritch_ink, item_tome_of_forbidden_knowledge, item_eldritch_quill],
    "Fungal Marsh": [item_spore_sac, item_fungal_boots, item_fungal_spores, item_marsh_gas_mask],
    "Corrupted Sanctuary": [item_corrupted_relic, item_purifying_incense, item_purifying_talisman],
    "Clockwork Tower": [item_clockwork_heart, item_brass_key, item_clockwork_wings, item_temporal_gear],
    "Abandoned Asylum": [item_straitjacket, item_madness_serum, item_patient_records, item_asylum_key],
    "Overgrown Greenhouse": [item_vine_whip, item_mutated_seeds, item_carnivorous_plant_seed, item_floral_essence],
    "Necropolis": [item_skull_scepter, item_lich_phylactery, item_necromancers_staff, item_soul_gem],
    "Elemental Plane": [item_elemental_orb, item_primordial_essence, item_elemental_orb_2],
    "Crystalline Cavern": [item_crystal_heart, item_resonating_shard, item_prismatic_geode_2, item_chromatic_crystal],
    "Flooded Catacombs": [item_waterlogged_scroll, item_drowned_treasure, item_waterbreathing_amulet, item_undead_pirates_cutlass],
    "Enchanted Grove": [item_fairy_dust, item_enchanted_acorn, item_enchanted_bark],
    "Haunted Forge": [item_spectral_hammer, item_cursed_anvil, item_ghost_metal_ingot],
    "Bioluminescent Cave": [item_glowworm_lantern, item_bioluminescent_ore, item_glowing_algae, item_bioluminescent_crystal],
    "Twisted Carnival": [item_jesters_mask, item_funhouse_mirror, item_twisted_lollipop, item_funhouse_ticket],
    "Ruined Citadel": [item_rusted_crown, item_ancient_tapestry, item_ancient_kings_crown, item_runic_battleaxe],
    "Spectral Mausoleum": [item_ghostly_candelabra, item_wraiths_cloak, item_ghostly_lantern_2, item_ectoplasmic_residue],
    "Fungal Labyrinth": [item_fungal_spores_2, item_mushroom_cap, item_fungal_spore_bomb, item_mycelium_map],
    "Sunken Atlantis": [item_atlantean_relic, item_mermaids_tear_2, item_atlantean_trident, item_mermaids_tear_necklace],
    "Astral Plane": [item_astral_dust, item_celestial_orb, item_astral_essence, item_starlight_cloak, item_astral_map],
    "Petrified Cavern": [item_petrified_wood_2, item_fossil_fragment_2, item_petrified_wood_shield, item_fossilized_insect],
    "Corrupted Laboratory": [item_corrupted_sample, item_experiment_log, item_corrupted_experiment, item_hazmat_suit],
    "Volcanic Caldera": [item_lava_crystal, item_volcanic_ash, item_volcanic_glass, item_ash_covered_relic, item_volcanic_ash_potion],
    "Haunted Shipyard": [item_cursed_compass, item_ghost_ship_figurine, item_cursed_pirates_compass, item_ghost_ship_figurehead],
    "Prismatic Caverns": [item_prismatic_geode_3, item_refracted_light, item_prismatic_shard_2],
    "Overgrown Ruins": [item_ancient_seed, item_overgrown_statue, item_overgrown_idol, item_ancient_vine_whip, item_overgrown_anchor_2],
    "Mechanical Labyrinth": [item_cog_wheel, item_clockwork_compass, item_automaton_core],
    "Abyssal Trench": [item_abyssal_scale, item_deep_sea_relic_2, item_abyssal_jellyfish_glow, item_deep_sea_scales],
    "Ethereal Sanctuary": [item_ethereal_feather, item_spirit_essence, item_ethereal_essence_2, item_spirit_ward],
    "Floating Sky Fortress": [item_sky_diamond, item_floating_rune, item_skyship_fuel_cell, item_anti_gravity_boots],
    "Abandoned Laboratory": [item_experimental_serum, item_lab_coat, item_prototype_gadget],
    "Ancient Tomb": [item_mummy_wraps, item_canopic_jar, item_pharaohs_scepter],
    "Frozen Tundra": [item_frost_rune_2, item_ice_crystal, item_frost_giants_tooth],
    "Sandstorm Desert": [item_sand_goggles, item_desert_rose, item_sand_golem_core, item_oasis_water],
    "Corrupted Dreamscape": [item_nightmare_fuel, item_dream_catcher],
    "Enchanted Library": [item_enchanted_quill_2, item_spell_scroll],
    "Abyssal Chasm": [item_void_shard, item_abyss_walker_boots, item_void_crystal_2, item_abyssal_rune],
    "Charters": [item_tavern_charter, item_blacksmith_charter, item_alchemist_charter, item_mage_tower_charter, 
                 item_library_charter, item_stables_charter, item_weapon_shop_charter, item_herbalist_charter, 
                 item_chapel_charter, item_rune_shop_charter, item_fletcher_charter],
};

CHARTER_ITEMS = ITEMS["Charters"]