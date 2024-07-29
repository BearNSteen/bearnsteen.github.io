const categories = [
    { name: 'Weapons', emoji: '⚔️' },
    { name: 'Armor', emoji: '🛡️' },
    { name: 'Potions', emoji: '🧪' },
    { name: 'Scrolls', emoji: '📜' },
    { name: 'Artifacts', emoji: '🏺' },
    { name: 'Miscellaneous', emoji: '🎒' }
];
const items = [
{name: 'Sword', category: 'Weapons', image: 'images/sword.png', description: 'A sharp blade for melee combat.', emoji: '⚔️'},
{name: 'Bow', category: 'Weapons', image: 'images/bow.png', description: 'A weapon for ranged attacks.', emoji: '🏹'},
{name: 'Shield', category: 'Armor', image: 'images/shield.png', description: 'Protects from incoming attacks.', emoji: '🛡️'},
{name: 'Health Potion', category: 'Potions', image: 'images/health_potion.png', description: 'Restores health when consumed.', emoji: '💖'},
{name: 'Magic Staff', category: 'Weapons', image: 'images/magic_staff.png', description: 'A staff imbued with magical energy.', emoji: '🪄'},
{name: 'Leather Armor', category: 'Armor', image: 'images/leather_armor.png', description: 'Light armor for quick movement.', emoji: '🥋'},
{name: 'Fireball Scroll', category: 'Scrolls', image: 'images/fireball_scroll.png', description: 'Scroll that conjures a ball of fire.', emoji: '📜🔥'},
{name: 'Ancient Amulet', category: 'Artifacts', image: 'images/ancient_amulet.png', description: 'An amulet with unknown magical properties.', emoji: '📿'},
{name: 'Torch', category: 'Miscellaneous', image: 'images/torch.png', description: 'Provides light in dark areas.', emoji: '🕯️'},
{name: 'Rusty Sword', category: 'Weapons', description: 'An old sword found in a cave.', emoji: '🗡️'},
{name: 'Skeleton Key', category: 'Miscellaneous', description: 'Opens ancient locks in the crypt.', emoji: '🔑'},
{name: 'Pickaxe', category: 'Tools', description: 'Used for mining ore.', emoji: '⛏️'},
{name: 'Lantern', category: 'Miscellaneous', description: 'Provides better light than a torch.', emoji: '🏮'},
{name: 'Antidote', category: 'Potions', description: 'Cures poison effects.', emoji: '💉'},
{name: 'Rubber Boots', category: 'Armor', description: 'Protects from swamp hazards.', emoji: '🥾'},
{name: 'Knight Shield', category: 'Armor', description: 'A sturdy shield with a royal crest.', emoji: '🛡️'},
{name: 'Royal Scepter', category: 'Weapons', description: 'A symbol of authority and magical power.', emoji: '🏳️'},
{name: 'Elven Bow', category: 'Weapons', description: 'A finely crafted bow of elven design.', emoji: '🏹'},
{name: "Nature's Blessing", category: 'Potions', description: 'A potion that grants nature-based abilities.', emoji: '🍃'},
{name: 'Stalagmite Hammer', category: 'Weapons', description: 'A heavy hammer formed from cave formations.', emoji: '🔨'},
{name: 'Glowing Mushroom', category: 'Miscellaneous', description: 'A bioluminescent fungus from deep caverns.', emoji: '🍄'},
{name: 'Scavenged Armor', category: 'Armor', description: 'Makeshift armor pieced together from scraps.', emoji: '🥋'},
{name: 'Wasteland Map', category: 'Miscellaneous', description: 'A rough map of the dangerous wasteland.', emoji: '🗺️'},
{name: 'Trident', category: 'Weapons', description: 'A three-pronged spear from underwater ruins.', emoji: '🔱'},
{name: "Mermaid's Tear", category: 'Artifacts', description: 'A rare, magical gem from the depths.', emoji: '💧'},
{name: 'Fire Essence', category: 'Miscellaneous', description: 'Pure elemental fire in a containable form.', emoji: '🔥'},
{name: 'Obsidian Shield', category: 'Armor', description: 'A shield made from cooled lava.', emoji: '🛡️'},
{name: 'Fire Resistant Cloak', category: 'Armor', description: 'A cloak that protects against extreme heat.', emoji: '🧥'},
{name: 'Obsidian Dagger', category: 'Weapons', description: 'A sharp dagger made from volcanic glass.', emoji: '🔪'},
{name: 'Cloud Boots', category: 'Armor', description: 'Boots that allow walking on clouds.', emoji: '👢'},
{name: 'Sky Crystal', category: 'Artifacts', description: 'A crystal infused with the essence of the sky.', emoji: '💎'},
{name: 'Feather of Flight', category: 'Artifacts', description: 'A magical feather that grants limited flight.', emoji: '🪶'},
{name: 'Prismatic Shard', category: 'Artifacts', description: 'A shard that refracts light into various colors.', emoji: '🌈'},
{name: 'Geode Hammer', category: 'Tools', description: 'A specialized hammer for cracking open geodes.', emoji: '🔨'},
{name: 'Crystal Golem Heart', category: 'Artifacts', description: 'The crystalline core of a defeated golem.', emoji: '💎'},
{name: 'Refracted Light Prism', category: 'Artifacts', description: 'A prism that bends light in mysterious ways.', emoji: '🔻'},
{name: 'Ghostly Lantern', category: 'Miscellaneous', description: 'A lantern that reveals hidden spectral entities.', emoji: '👻🏮'},
{name: 'Cursed Mirror', category: 'Artifacts', description: 'A mirror that shows more than just reflections.', emoji: '🪞'},
{name: 'Spectral Cloak', category: 'Armor', description: 'A cloak that grants partial invisibility.', emoji: '👻🧥'},
{name: 'Frost Axe', category: 'Weapons', description: 'An axe imbued with icy magic.', emoji: '🪓❄️'},
{name: 'Snowflake Charm', category: 'Artifacts', description: 'A charm that protects against cold.', emoji: '❄️'},
{name: 'Frost Rune', category: 'Scrolls', description: 'A rune that can freeze objects or enemies.', emoji: '❄️📜'},
{name: 'Golden Idol', category: 'Artifacts', description: 'An ancient idol of great value and power.', emoji: '🏆'},
{name: 'Sacred Scroll', category: 'Scrolls', description: 'A scroll containing powerful holy magic.', emoji: '📜✨'},
{name: 'Hieroglyph Scroll', category: 'Scrolls', description: 'A scroll covered in ancient hieroglyphs.', emoji: '📜🔣'},
{name: 'Spore Bomb', category: 'Weapons', description: 'A fungal bomb that releases harmful spores.', emoji: '🍄💣'},
{name: 'Fungal Staff', category: 'Weapons', description: 'A staff grown from magical mushrooms.', emoji: '🍄🪄'},
{name: 'Spore Sack', category: 'Miscellaneous', description: 'A sack full of various fungal spores.', emoji: '🎒🍄'},
{name: 'Gears', category: 'Miscellaneous', description: 'Mechanical gears from an ancient machine.', emoji: '⚙️'},
{name: 'Clockwork Key', category: 'Miscellaneous', description: 'A key that winds up mechanical devices.', emoji: '🔑⚙️'},
{name: 'Robotic Arm', category: 'Weapons', description: 'A powerful mechanical arm attachment.', emoji: '🦾'},
{name: 'Abyssal Pearl', category: 'Artifacts', description: 'A dark pearl from the deepest ocean trenches.', emoji: '🖤'},
{name: 'Kraken Tooth', category: 'Artifacts', description: 'A massive tooth from a legendary sea monster.', emoji: '🦷'},
{name: 'Deep Sea Relic', category: 'Artifacts', description: 'An ancient relic recovered from the ocean floor.', emoji: '🏺'},
{name: "Kraken's Eye", category: 'Artifacts', description: 'The preserved eye of a kraken, still glowing with power.', emoji: '👁️'},
{name: 'Stone Bark', category: 'Miscellaneous', description: 'Bark from a petrified tree, hard as stone.', emoji: '🪵'},
{name: 'Fossilized Amber', category: 'Artifacts', description: 'Ancient amber containing preserved insects.', emoji: '🔶'},
{name: 'Petrified Wood Bow', category: 'Weapons', description: 'A bow crafted from petrified wood, incredibly durable.', emoji: '🏹🪵'},
{name: 'Fossil Fragment', category: 'Artifacts', description: 'A fragment of an ancient fossilized creature.', emoji: '🦴'},
{name: 'Desert Compass', category: 'Miscellaneous', description: 'A compass that always points to the nearest oasis.', emoji: '🧭'},
{name: 'Sandstorm Cloak', category: 'Armor', description: 'A cloak that protects the wearer from sandstorms.', emoji: '🏜️🧥'},
{name: "Sphinx's Riddle", category: 'Scrolls', description: 'A scroll containing a powerful but puzzling riddle.', emoji: '🦁📜'},
{name: 'Hive Wax', category: 'Miscellaneous', description: 'Magical wax from a giant insect hive.', emoji: '🐝🕯️'},
{name: "Queen's Nectar", category: 'Potions', description: 'Royal jelly from a giant insect queen, with magical properties.', emoji: '👑🍯'},
{name: 'Chitin Armor', category: 'Armor', description: 'Armor made from the exoskeletons of giant insects.', emoji: '🐜🛡️'},
{name: 'Void Crystal', category: 'Artifacts', description: 'A crystal that seems to absorb all light.', emoji: '🔮'},
{name: 'Reality Shifter', category: 'Artifacts', description: 'A device that can bend the fabric of reality.', emoji: '🌀'},
{name: 'Dimensional Key', category: 'Miscellaneous', description: 'A key that can open portals between dimensions.', emoji: '🔑🌌'},
{name: 'Alien Artifact', category: 'Artifacts', description: 'A strange object of clearly non-terrestrial origin.', emoji: '👽🏺'},
{name: "Pirate's Compass", category: 'Miscellaneous', description: 'A compass that points to buried treasure.', emoji: '🏴‍☠️🧭'},
{name: 'Mermaid Scale', category: 'Artifacts', description: 'A beautiful, iridescent scale from a mermaid\'s tail.', emoji: '🧜‍♀️🐠'},
{name: "Pirate's Treasure Map", category: 'Miscellaneous', description: 'A weathered map leading to buried pirate treasure.', emoji: '🗺️💰'},
{name: 'Enchanted Compass', category: 'Artifacts', description: 'A compass with mysterious magical properties.', emoji: '🧭✨'},
{name: 'Barnacle-covered Chest', category: 'Miscellaneous', description: 'An old sea chest, its contents a mystery.', emoji: '🧳🐚'},
{name: 'Forbidden Tome', category: 'Scrolls', description: 'A book of forbidden knowledge and dark magic.', emoji: '📕🔮'},
{name: 'Eldritch Ink', category: 'Miscellaneous', description: 'Ink that moves with a life of its own.', emoji: '🖋️👁️'},
{name: 'Tome of Forbidden Knowledge', category: 'Scrolls', description: 'A comprehensive book of dangerous magical lore.', emoji: '📚🔮'},
{name: 'Eldritch Quill', category: 'Miscellaneous', description: 'A quill that writes by itself, revealing dark secrets.', emoji: '🖊️👁️'},
{name: 'Spore Sac', category: 'Miscellaneous', description: 'A sac full of hallucinogenic spores.', emoji: '🍄💨'},
{name: 'Fungal Boots', category: 'Armor', description: 'Boots that allow the wearer to traverse fungal terrain easily.', emoji: '👢🍄'},
{name: 'Marsh Gas Mask', category: 'Armor', description: 'A mask that filters out poisonous marsh gases.', emoji: '😷'},
{name: 'Corrupted Relic', category: 'Artifacts', description: 'A once-holy relic, now tainted by dark forces.', emoji: '🏺👿'},
{name: 'Purifying Incense', category: 'Miscellaneous', description: 'Incense that cleanses corruption and evil influences.', emoji: '🕯️✨'},
{name: 'Purifying Talisman', category: 'Artifacts', description: 'A talisman that wards off corruption and evil.', emoji: '🔮✨'},
{name: 'Clockwork Heart', category: 'Artifacts', description: 'The mechanical heart of a clockwork creature.', emoji: '❤️⚙️'},
{name: 'Brass Key', category: 'Miscellaneous', description: 'An intricate key made of brass, purpose unknown.', emoji: '🔑'},
{name: 'Clockwork Wings', category: 'Armor', description: 'Mechanical wings that allow limited flight.', emoji: '🦋⚙️'},
{name: 'Temporal Gear', category: 'Artifacts', description: 'A gear that seems to manipulate the flow of time around it.', emoji: '⚙️⏳'},
{name: 'Straitjacket', category: 'Armor', description: 'A jacket that restricts movement but provides unique benefits.', emoji: '🧥🔒'},
{name: 'Madness Serum', category: 'Potions', description: 'A dangerous concoction that induces temporary insanity.', emoji: '💉🤪'},
{name: 'Patient Records', category: 'Scrolls', description: 'Cryptic records of patients with supernatural ailments.', emoji: '📋👻'},
{name: 'Asylum Key', category: 'Miscellaneous', description: 'A key that unlocks the deepest parts of the abandoned asylum.', emoji: '🔑🏥'},
{name: 'Vine Whip', category: 'Weapons', description: 'A living whip made of thorny vines.', emoji: '🌿💥'},
{name: 'Mutated Seeds', category: 'Miscellaneous', description: 'Seeds that grow into bizarre and dangerous plants.', emoji: '🌱👽'},
{name: 'Carnivorous Plant Seed', category: 'Miscellaneous', description: 'A seed that grows into a loyal, carnivorous plant ally.', emoji: '🌱🍖'},
{name: 'Floral Essence', category: 'Potions', description: 'A potent extract of magical flowers.', emoji: '🌸💧'},
{name: 'Skull Scepter', category: 'Weapons', description: 'A scepter topped with a magical crystal skull.', emoji: '💀🔮'},
{name: 'Lich Phylactery', category: 'Artifacts', description: 'The soul container of a powerful undead wizard.', emoji: '💀📦'},
{name: "Necromancer's Staff", category: 'Weapons', description: 'A staff imbued with the power to raise and control the dead.', emoji: '🦯💀'},
{name: 'Soul Gem', category: 'Artifacts', description: 'A gem containing the trapped soul of a powerful being.', emoji: '💎👻'},
{name: 'Elemental Orb', category: 'Artifacts', description: 'An orb containing the essence of a primordial element.', emoji: '🔮🌪️'},
{name: 'Primordial Essence', category: 'Miscellaneous', description: 'The raw essence of creation itself.', emoji: '✨🌌'},
{name: 'Crystal Heart', category: 'Artifacts', description: 'The crystalline heart of an elemental being.', emoji: '💎❤️'},
{name: 'Resonating Shard', category: 'Artifacts', description: 'A crystal shard that vibrates with strange energies.', emoji: '🔷〰️'},
{name: 'Prismatic Geode', category: 'Artifacts', description: 'A geode filled with crystals of every color.', emoji: '🌈💎'},
{name: 'Chromatic Crystal', category: 'Artifacts', description: 'A crystal that constantly shifts through different colors.', emoji: '🔮🌈'},
{name: 'Waterlogged Scroll', category: 'Scrolls', description: 'An ancient scroll, its magic somehow preserved despite being soaked.', emoji: '📜💧'},
{name: 'Drowned Treasure', category: 'Artifacts', description: 'Valuable items recovered from the flooded catacombs.', emoji: '💰🌊'},
{name: 'Waterbreathing Amulet', category: 'Artifacts', description: 'An amulet that allows the wearer to breathe underwater.', emoji: '📿🐟'},
{name: "Undead Pirate's Cutlass", category: 'Weapons', description: 'A cursed cutlass wielded by an undead pirate captain.', emoji: '⚔️👻'},
{name: 'Fairy Dust', category: 'Miscellaneous', description: 'Magical dust gathered from fairies, with various mystical properties.', emoji: '🧚✨'},
{name: 'Enchanted Acorn', category: 'Miscellaneous', description: 'An acorn imbued with nature magic, capable of rapid growth.', emoji: '🌰✨'},
{name: 'Enchanted Bark', category: 'Miscellaneous', description: 'Bark from an enchanted tree, useful in nature-based magic.', emoji: '🌳✨'},
{name: 'Spectral Hammer', category: 'Weapons', description: 'A ghostly hammer that can affect both physical and ethereal targets.', emoji: '🔨👻'},
{name: 'Cursed Anvil', category: 'Artifacts', description: 'An anvil that forges cursed items of great power.', emoji: '🔨👿'},
{name: 'Ghost Metal Ingot', category: 'Miscellaneous', description: 'A bar of ghostly metal, cold to the touch and partially transparent.', emoji: '🧱👻'},
{name: 'Glowworm Lantern', category: 'Miscellaneous', description: 'A lantern filled with bioluminescent glowworms.', emoji: '🏮🐛'},
{name: 'Bioluminescent Ore', category: 'Miscellaneous', description: 'A strange ore that glows with an inner light.', emoji: '💎✨'},
{name: 'Glowing Algae', category: 'Miscellaneous', description: 'Algae that emits a soft, ethereal light.', emoji: '🦠✨'},
{name: 'Bioluminescent Crystal', category: 'Artifacts', description: 'A crystal that pulses with living light.', emoji: '💎💡'},
{name: "Jester's Mask", category: 'Armor', description: 'A mask that causes confusion and hilarity in battle.', emoji: '🎭'},
{name: 'Funhouse Mirror', category: 'Artifacts', description: 'A mirror that distorts reality when gazed upon.', emoji: '🪞🌀'},
{name: 'Twisted Lollipop', category: 'Weapons', description: 'A giant lollipop that can be used as a mace.', emoji: '🍭🔨'},
{name: 'Funhouse Ticket', category: 'Miscellaneous', description: 'A magical ticket that transports the holder to a chaotic pocket dimension.', emoji: '🎟️🎪'},
{name: 'Rusted Crown', category: 'Artifacts', description: 'The crown of a long-dead king, still holding remnants of power.', emoji: '👑🦀'},
{name: 'Ancient Tapestry', category: 'Artifacts', description: 'A tapestry depicting historical or mythical events.', emoji: '🖼️📜'},
{name: "Ancient King's Crown", category: 'Artifacts', description: 'A well-preserved crown of an ancient king, radiating authority.', emoji: '👑✨'},
{name: 'Runic Battleaxe', category: 'Weapons', description: 'A massive axe inscribed with magical runes.', emoji: '🪓🔮'},
{name: 'Ghostly Candelabra', category: 'Miscellaneous', description: 'A floating candelabra that illuminates spiritual energy.', emoji: '🕯️👻'},
{name: "Wraith's Cloak", category: 'Armor', description: 'A cloak that allows partial phasing through solid objects.', emoji: '👻🧥'},
{name: 'Ectoplasmic Residue', category: 'Miscellaneous', description: 'A strange, ghostly substance left behind by spirits.', emoji: '👻💧'},
{name: 'Mushroom Cap', category: 'Armor', description: 'A cap made from a giant mushroom, offering unique protections.', emoji: '🍄👒'},
{name: 'Fungal Spore Bomb', category: 'Weapons', description: 'A bomb that releases a cloud of hallucinogenic spores.', emoji: '🍄💣'},
{name: 'Mycelium Map', category: 'Miscellaneous', description: 'A living map formed of mycelium, revealing fungal growths.', emoji: '🗺️🍄'},
{name: 'Atlantean Relic', category: 'Artifacts', description: 'A powerful artifact from the sunken city of Atlantis.', emoji: '🏺🌊'},
{name: 'Atlantean Trident', category: 'Weapons', description: 'The legendary trident of Atlantean royalty.', emoji: '🔱👑'},
{name: "Mermaid's Tear Necklace", category: 'Artifacts', description: 'A necklace made of precious mermaid tears.', emoji: '📿💧'},
{name: 'Astral Dust', category: 'Miscellaneous', description: 'Glittering dust from the astral plane.', emoji: '✨🌠'},
{name: 'Celestial Orb', category: 'Artifacts', description: 'An orb containing the power of celestial bodies.', emoji: '🔮🌟'},
{name: 'Astral Essence', category: 'Miscellaneous', description: 'The raw essence of the astral plane.', emoji: '✨🌌'},
{name: 'Starlight Cloak', category: 'Armor', description: 'A cloak woven from captured starlight.', emoji: '🧥🌟'},
{name: 'Astral Map', category: 'Miscellaneous', description: 'A map of the astral plane and its celestial bodies.', emoji: '🗺️🌠'},
{name: 'Petrified Wood', category: 'Miscellaneous', description: 'Wood turned to stone, useful for crafting.', emoji: '🪵💎'},
{name: 'Petrified Wood Shield', category: 'Armor', description: 'A shield made of petrified wood, incredibly durable.', emoji: '🛡️🪵'},
{name: 'Fossilized Insect', category: 'Artifacts', description: 'A perfectly preserved insect in amber.', emoji: '🐜💎'},
{name: 'Corrupted Sample', category: 'Miscellaneous', description: 'A sample of a magically corrupted substance.', emoji: '🧪☣️'},
{name: 'Experiment Log', category: 'Scrolls', description: 'Records of dangerous magical experiments.', emoji: '📋🔬'},
{name: 'Corrupted Experiment', category: 'Artifacts', description: 'The result of a magical experiment gone wrong.', emoji: '👾🧪'},
{name: 'Hazmat Suit', category: 'Armor', description: 'A suit that protects against magical contamination.', emoji: '🦺☣️'},
{name: 'Lava Crystal', category: 'Artifacts', description: 'A crystal formed in the heart of a volcano.', emoji: '💎🌋'},
{name: 'Volcanic Ash', category: 'Miscellaneous', description: 'Ash from a magical volcano, useful in crafting.', emoji: '🌋💨'},
{name: 'Volcanic Glass', category: 'Miscellaneous', description: 'Glass formed by volcanic activity, useful for magical items.', emoji: '🪞🌋'},
{name: 'Ash-covered Relic', category: 'Artifacts', description: 'An ancient relic recovered from a volcanic site.', emoji: '🏺🌋'},
{name: 'Volcanic Ash Potion', category: 'Potions', description: 'A potion made from volcanic ash, granting fire resistance.', emoji: '🧪🌋'},
{name: 'Cursed Compass', category: 'Artifacts', description: 'A compass that points towards cursed locations.', emoji: '🧭☠️'},
{name: 'Ghost Ship Figurine', category: 'Artifacts', description: 'A small figurine of a ghost ship that sometimes moves on its own.', emoji: '🚢👻'},
{name: "Cursed Pirate's Compass", category: 'Artifacts', description: 'A compass cursed by an undead pirate, leading to supernatural treasures.', emoji: '🧭🏴‍☠️'},
{name: 'Ghost Ship Figurehead', category: 'Artifacts', description: 'The figurehead from a ghost ship, imbued with spectral energy.', emoji: '🧜‍♀️👻'},
{name: 'Refracted Light', category: 'Miscellaneous', description: 'Captured light that has passed through a prismatic crystal.', emoji: '🌈💡'},
{name: 'Ancient Seed', category: 'Miscellaneous', description: 'A seed from an extinct plant species.', emoji: '🌱🏺'},
{name: 'Overgrown Statue', category: 'Artifacts', description: 'A statue overgrown with magical plants.', emoji: '🗿🌿'},
{name: 'Overgrown Idol', category: 'Artifacts', description: 'An ancient idol covered in mystical vines.', emoji: '🗿🌱'},
{name: 'Ancient Vine Whip', category: 'Weapons', description: 'A whip made from ancient, magically preserved vines.', emoji: '🌿⚔️'},
{name: 'Cog Wheel', category: 'Miscellaneous', description: 'A gear from an ancient mechanical device.', emoji: '⚙️'},
{name: 'Clockwork Compass', category: 'Artifacts', description: 'A compass that points towards hidden mechanical structures.', emoji: '🧭⚙️'},
{name: 'Automaton Core', category: 'Artifacts', description: 'The power source of an ancient automaton.', emoji: '💠⚡'},
{name: 'Abyssal Scale', category: 'Miscellaneous', description: 'A scale from a creature of the deep abyss.', emoji: '🐉🌊'},
{name: 'Abyssal Jellyfish Glow', category: 'Miscellaneous', description: 'The bioluminescent essence of an abyssal jellyfish.', emoji: '🎐✨'},
{name: 'Deep Sea Scales', category: 'Miscellaneous', description: 'Scales from various deep sea creatures.', emoji: '🐠🔷'},
{name: 'Ethereal Feather', category: 'Artifacts', description: 'A feather from a creature of the spirit realm.', emoji: '🪶✨'},
{name: 'Spirit Essence', category: 'Miscellaneous', description: 'The captured essence of a spiritual entity.', emoji: '👻💨'},
{name: 'Spirit Ward', category: 'Artifacts', description: 'A charm that protects against malevolent spirits.', emoji: '🛡️👻'},
{name: 'Sky Diamond', category: 'Artifacts', description: 'A rare gem formed in the upper atmosphere.', emoji: '💎☁️'},
{name: 'Floating Rune', category: 'Artifacts', description: 'A magical rune that hovers in the air.', emoji: '🔮☁️'},
{name: 'Skyship Fuel Cell', category: 'Miscellaneous', description: 'A power source for magical flying ships.', emoji: '⚡☁️'},
{name: 'Anti-Gravity Boots', category: 'Armor', description: 'Boots that allow the wearer to defy gravity.', emoji: '👢☁️'},
{name: 'Experimental Serum', category: 'Potions', description: 'A mysterious potion with unpredictable effects.', emoji: '💉🧪'},
{name: 'Lab Coat', category: 'Armor', description: 'A coat that provides protection against magical experiments.', emoji: '🥼🔬'},
{name: 'Prototype Gadget', category: 'Artifacts', description: 'An experimental device with unknown functions.', emoji: '🔧💡'},
{name: 'Mummy Wraps', category: 'Armor', description: 'Ancient bandages with protective enchantments.', emoji: '🧻💀'},
{name: 'Canopic Jar', category: 'Artifacts', description: 'A jar containing magical essences from the ancient world.', emoji: '🏺🧠'},
{name: "Pharaoh's Scepter", category: 'Weapons', description: 'A scepter wielding the power of ancient royalty.', emoji: '👑🔮'},
{name: 'Ice Crystal', category: 'Artifacts', description: 'A crystal of perpetual ice from the frozen tundra.', emoji: '❄️💎'},
{name: "Frost Giant's Tooth", category: 'Artifacts', description: 'A massive tooth from a legendary frost giant.', emoji: '🦷❄️'},
{name: 'Sand Goggles', category: 'Armor', description: 'Goggles that protect against harsh desert conditions.', emoji: '🥽🏜️'},
{name: 'Desert Rose', category: 'Artifacts', description: 'A rare crystalline formation found in the desert.', emoji: '🌹🏜️'},
{name: 'Sand Golem Core', category: 'Artifacts', description: 'The magical core of a sand golem.', emoji: '💎🏜️'},
{name: 'Oasis Water', category: 'Potions', description: 'Magical water from a hidden desert oasis.', emoji: '💧🏜️'},
{name: 'Nightmare Fuel', category: 'Miscellaneous', description: 'Condensed essence of nightmares.', emoji: '💭👹'},
{name: 'Dream Catcher', category: 'Artifacts', description: 'An artifact that can capture and manipulate dreams.', emoji: '🕸️💤'},
{name: 'Enchanted Quill', category: 'Artifacts', description: 'A quill that never runs out of ink and writes magical text.', emoji: '🖋️✨'},
{name: 'Spell Scroll', category: 'Scrolls', description: 'A scroll containing a powerful spell.', emoji: '📜✨'},
{name: 'Void Shard', category: 'Artifacts', description: 'A fragment of the void, pulsing with dark energy.', emoji: '🔮🌑'},
{name: 'Abyss Walker Boots', category: 'Armor', description: 'Boots that allow safe passage through the darkest voids.', emoji: '👢🌑'},
{name: 'Abyssal Rune', category: 'Artifacts', description: 'A rune carved from the essence of the abyss.', emoji: '🔮🌊'},
{name: 'Tavern Charter', category: 'Charters', description: 'A charter to establish a tavern in your settlement.', emoji: '📜🍺'},
{name: 'Blacksmith Charter', category: 'Charters', description: 'A charter to establish a blacksmith in your settlement.', emoji: '📜⚒️'},
{name: 'Alchemist Charter', category: 'Charters', description: 'A charter to establish an alchemist in your settlement.', emoji: '📜⚗️'},
{name: 'Mage Tower Charter', category: 'Charters', description: 'A charter to establish a mage tower in your settlement.', emoji: '📜🧙'},
{name: 'Library Charter', category: 'Charters', description: 'A charter to establish a library in your settlement.', emoji: '📜📚'},
{name: 'Stables Charter', category: 'Charters', description: 'A charter to establish stables in your settlement.', emoji: '📜🐎'},
{name: 'Weapon Shop Charter', category: 'Charters', description: 'A charter to establish a weapon shop in your settlement.', emoji: '📜⚔️'},
{name: 'Herbalist Charter', category: 'Charters', description: 'A charter to establish an herbalist in your settlement.', emoji: '📜🌿'},
{name: 'Chapel Charter', category: 'Charters', description: 'A charter to establish a chapel in your settlement.', emoji: '📜⛪'},
{name: 'Rune Shop Charter', category: 'Charters', description: 'A charter to establish a rune shop in your settlement.', emoji: '📜🔮'},
{name: 'Fletcher Charter', category: 'Charters', description: 'A charter to establish a fletcher in your settlement.', emoji: '📜🏹'},
];


document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const categoriesContainer = document.getElementById('categories');
    const itemsContainer = document.getElementById('items');
    const searchInput = document.getElementById('item-search');
    const modal = document.getElementById('itemModal');
    const closeModal = document.getElementsByClassName('close')[0];

    function displayCategories() {
        categoriesContainer.innerHTML = '';
        categories.forEach(category => {
            const categoryTile = document.createElement('div');
            categoryTile.classList.add('category-tile');
            categoryTile.innerHTML = `
                <div class="category-emoji">${category.emoji}</div>
                <div class="category-name">${category.name}</div>
            `;
            categoryTile.addEventListener('click', () => displayItems(category.name));
            categoriesContainer.appendChild(categoryTile);
        });
    }

    function displayItems(category) {
        const itemsGrid = document.getElementById('items');
        itemsGrid.innerHTML = '';
        
        const filteredItems = items.filter(item => item.category === category);
        
        filteredItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="emoji-placeholder" style="display:none;">${item.emoji}</div>
                </div>
                <p>${item.name}</p>
            `;
            itemCard.addEventListener('click', () => displayItemDetails(item));
            itemsGrid.appendChild(itemCard);
        });
    }

    function displayItemDetails(item) {
        document.getElementById('modalItemName').textContent = item.name;
        document.getElementById('modalItemCategory').textContent = item.category;
        document.getElementById('modalItemImage').src = item.image;
        document.getElementById('modalItemImage').onerror = function() {
            this.style.display = 'none';
            document.getElementById('modalItemEmoji').style.display = 'block';
            document.getElementById('modalItemEmoji').textContent = item.emoji;
        };
        document.getElementById('modalItemEmoji').style.display = 'none';
        document.getElementById('modalItemDescription').textContent = item.description;
        
        document.getElementById('modalItemWeight').textContent = `${Math.floor(Math.random() * 10) + 1} lbs`;
        document.getElementById('modalItemValue').textContent = `${Math.floor(Math.random() * 100) + 10}`;
        document.getElementById('modalItemDurability').textContent = `${Math.floor(Math.random() * 50) + 50}/100`;
        document.getElementById('modalItemLevel').textContent = `${Math.floor(Math.random() * 20) + 1}`;
        
        modal.style.display = 'block';
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredItems = items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.category.toLowerCase().includes(searchTerm)
        );
        itemsContainer.innerHTML = '';
        filteredItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="emoji-placeholder" style="display:none;">${item.emoji}</div>
                </div>
                <p>${item.name}</p>
            `;
            itemCard.addEventListener('click', () => displayItemDetails(item));
            itemsContainer.appendChild(itemCard);
        });
    });

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    displayCategories();
});