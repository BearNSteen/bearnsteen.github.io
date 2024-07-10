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
                const itemData = ITEMS[this.biome][Math.floor(Math.random() * ITEMS[this.biome].length)];
                return itemData.name;
            });
        }
        return [];
    }
}