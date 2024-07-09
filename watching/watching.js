class WeAreWatching {
    constructor() {
        this.numPlayers = 12;
        this.currentWeek = 1;
        this.agents = [];
        this.purgedAgents = [];
        this.endState = 0;
        this.events = [];
        this.alliances = {};
        this.seasonNum = 1;
        this.prevOVR = null;
        this.showmances = [];
        this.stepIndex = 0;
        this.stepByStepMode = false;
        this.debugMode = false;
        this.printSpeed = 0.8;
        this.americanNamesEnabled = true;
        this.sillyNamesEnabled = false;
        this.sciFiNamesEnabled = false;
        this.lastPurgedAgent = null;
        this.postDisruptionFlags = null;
        this.alliances = {};
        this.eventManager = new EventManager(this, Alliance);
        this.currentStep = 0;
        this.stepsPerWeek = 6; // Adjust this based on the number of steps in your week

        this.loadColors();
        this.createPlayers();
        this.doImpressions();
    }

    createPlayers() {
        const usedFirstNames = new Set();
        while (this.agents.length < this.numPlayers) {
            let name;
            let firstName;
            do {
                const enabledNameTypes = [];
                if (this.americanNamesEnabled) enabledNameTypes.push('randomName');
                if (this.sillyNamesEnabled) enabledNameTypes.push('randomSillyName');
                if (this.sciFiNamesEnabled) enabledNameTypes.push('randomSciFiName');
    
                const randomNameType = this.randomChoice(enabledNameTypes);
                name = this[randomNameType]();
                firstName = name.split(' ')[0];
            } while (usedFirstNames.has(firstName));
            
            usedFirstNames.add(firstName);
            this.agents.push(new Agent(name));
        }
    }

    randomName() {
        const firstNames = [
            "Liam", "Emma", "Ally", "Olivia", "William", "Ava", "James", "Isabella", "Oliver", "Sophia", 
            "Benjamin", "Charlotte", "Elijah", "Mia", "Lucas", "Amelia", "Mason", "Harper", "Logan", 
            "Evelyn", "Alexander", "Abigail", "Ethan", "Emily", "Jacob", "Elizabeth", "Michael", 
            "Mila", "Daniel", "Ella", "Henry", "Avery", "Jackson", "Sofia", "Sebastian", "Camila", 
            "Aiden", "Aria", "Matthew", "Scarlett", "Samuel", "Victoria", "David", "Madison", "Joseph", 
            "Luna", "Carter", "Grace", "Owen", "Chloe", "Wyatt", "Penelope", "John", "Layla", "Jack", 
            "Riley", "Luke", "Zoey", "Jayden", "Nora", "Dylan", "Lily", "Grayson", "Eleanor", "Levi", 
            "Hannah", "Isaac", "Lillian", "Gabriel", "Addison", "Julian", "Aubrey", "Mateo", "Ellie", 
            "Anthony", "Stella", "Jaxon", "Natalie", "Lincoln", "Zoe", "Joshua", "Leah", "Christopher", 
            "Hazel", "Andrew", "Violet", "Theodore", "Aurora", "Caleb", "Savannah", "Ryan", "Audrey", 
            "Asher", "Brooklyn", "Nathan", "Bella", "Thomas", "Claire", "Leo", "Skylar"
        ];
    
        const lastNames = [
            "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", 
            "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", 
            "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", 
            "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", 
            "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", 
            "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", 
            "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper", 
            "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "James", 
            "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", 
            "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", 
            "Flores", "Washington", "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", 
            "Russell", "Griffin", "Diaz", "Hayes"
        ];
    
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${firstName} ${lastName}`;
    }

    randomSillyName() {
        const sillyFirstNames = [
            "Boggity", "Zooba", "Flibberty", "Snickle", "Wizzle", "Blurp", "Flumpy", "Gribble", "Snorky",
            "Whiffle", "Goober", "Zippity", "Bumfuzzle", "Kerfuffle", "Shnookums", "Doodlebug", "Fuzzball",
            "Wacky", "Giggles", "Wiggles", "Chuckles", "Snuggles", "Pickles", "Poodles", "Noodles",
            "Bubbles", "Squiggles", "Jiggles", "Wriggles", "Skittles", "Sprinkles", "Twinkles", "Crinkles",
            "Freckles", "Speckles", "Buster", "Biscuit", "Muffin", "Cupcake", "Waffles", "Pancakes",
            "Spaghetti", "Macaroni", "Cheese", "Gizmo", "Gadget", "Widget", "Thingamajig", "Whatchamacallit",
            "Doohickey", "Hickory", "Dickory", "Dock", "Wibbly", "Wobbly", "Wimbly", "Flapjack", "Lollipop",
            "Jellybean", "Butterscotch", "Sassafras", "Bamboozle", "Skedaddle", "Skedoodle", "Whippersnapper"
        ];
    
        const sillyLastNames = [
            "Bop", "Grinnin'", "Snickerdoodle", "Fizzlebottom", "Bumbleburp", "Wuzzlepuff", "Snicklefritz",
            "Gigglesworth", "Chuckleberry", "Doodledums", "Fiddlesticks", "Wiggleworm", "Snugglebutt",
            "Pickleberry", "Poodlesworth", "Noodlenose", "Bubblegum", "Squigglesworth", "Jiggleberry",
            "Wrigglesworth", "Skittlebutt", "Sprinklenose", "Twinkletoes", "Crinklehorn", "Freckleface",
            "Speckledorf", "Biscuitbarrel", "Muffinman", "Cupcakecuddles", "Wafflewhiskers", "Pancakepants",
            "Spaghettisocks", "Macaronimittens", "Cheesechester", "Gizmogrump", "Gadgetgadabout", "Widgetwhisker",
            "Thingamajiggle", "Whatchamacalliter", "Doohickeydoo", "Hickoryhopper", "Dickorydock", "Dockendoodle",
            "Wibblywobblywoo", "Wimblywoozle", "Flapjackflinger", "Lollipoplicker", "Jellybeanjumper", "Butterscotchbouncer",
            "Sassafrasscrambler", "Bamboozlebeater", "Skedaddleskipper", "Skedoodlescooper", "Whippersnapperwrangler"
        ];
    
        const sillyFirstName = sillyFirstNames[Math.floor(Math.random() * sillyFirstNames.length)];
        const sillyLastName = sillyLastNames[Math.floor(Math.random() * sillyLastNames.length)];
        return `${sillyFirstName} ${sillyLastName}`;
    }

    randomSillyNameAlt() {
        const sillyFirstNames = [
            "Boggity", "Zooba", "Flibbity", "Wubba", "Snorkel", "Giggly", "Bumble", "Zippity", "Doodle",
            "Wiggly", "Squiggle", "Floofy", "Whimsical", "Quirky", "Boople", "Snicker", "Chuckle", "Guffaw",
            "Whimsy", "Giddy", "Snort", "Teeheehee", "Chortle", "Kaboodle", "Razzle", "Dazzle", "Fizzy",
            "Sprinkle", "Twinkle", "Sparkle", "Glimmer", "Shimmer", "Skitter", "Scamper", "Frolic", "Prance",
            "Whirl", "Twirl", "Jiggle", "Wiggle", "Giggle", "Snuggly", "Cuddly", "Fluffy", "Puffy", "Fuzzy",
            "Wuzzy", "Snuffy", "Buffy", "Kooky", "Wacky", "Loopy", "Dippy", "Batty", "Bonkers", "Crackers",
            "Silly", "Goofy", "Nutty", "Screwy", "Wacko", "Cuckoo", "Loony", "Daffy", "Dotty", "Ditzy"
        ];
    
        const sillyLastNames = [
            "Bop", "Grinnin'", "Giggles", "Chuckles", "Wiggles", "Snickers", "Snorts", "Fizzles", "Sizzles",
            "Twizzles", "Fizzlesworth", "Chuckleberry", "Gigglesworth", "Snortlepuff", "Snickerdoodle",
            "Goofball", "Goofberry", "Sillykins", "Sillypants", "Wackadoodle", "Wackajacka", "Loopydoop",
            "Dippydoodle", "Battybuns", "Bonkersworth", "Crackersprinkle", "Nuttynose", "Screwysmith",
            "Wackowitz", "Cuckooford", "Loonylips", "Daffydunk", "Dottykins", "Ditzydoodle", "Bopple",
            "Grinninkle", "Gigglesnort", "Chucklefizz", "Wigglesworth", "Snickersizzle", "Snortletwizzle",
            "Fizzlesnicker", "Sizzlechuckle", "Twizzlegiggles", "Fizzleworthsnort", "Chuckleberryfizz",
            "Giggleworthsnicker", "Snortlepufftwizzle", "Snickerdoodlesizzle", "Goofballchuckle",
            "Goofberrygiggles", "Sillykinsfizz", "Sillypantssnicker", "Wackadoodlesnort", "Wackajackatwizzle",
            "Loopydoopgiggles", "Dippydoodlechuckle", "Battybunsfizz", "Bonkersworthsnicker"
        ];
    
        const sillyFirstName = sillyFirstNames[Math.floor(Math.random() * sillyFirstNames.length)];
        const sillyLastName = sillyLastNames[Math.floor(Math.random() * sillyLastNames.length)];
        return `${sillyFirstName} ${sillyLastName}`;
    }

    randomSciFiName() {
        const sciFiFirstNames = [
            "Zar", "Xen", "Qua", "Zor", "Vex", "Jax", "Nox", "Kaz", "Ryx", "Zed",
            "Kal", "Ven", "Lux", "Dax", "Gor", "Zyn", "Maz", "Kor", "Jyn", "Zak",
            "Axel", "Raze", "Nova", "Blaze", "Neon", "Flux", "Onyx", "Pulse", "Siren",
            "Bolt", "Surge", "Orbit", "Cosmo", "Astro", "Galaxy", "Nebula", "Quasar",
            "Orion", "Phoenix", "Atlas", "Titan", "Quantum", "Nexus", "Vortex", "Ion",
            "Omni", "Cyber", "Mech", "Nano", "Neuro", "Psi", "Chrono", "Helix", "Proxy",
            "Xion", "Zephyr", "Echo", "Solaris", "Luna", "Cosmos", "Aries", "Orion",
            "Lyra", "Cygnus", "Draco", "Vega", "Sirius", "Castor", "Pollux", "Altair"
        ];
    
        const sciFiLastNames = [
            "Zarnox", "Xandar", "Quasar", "Zormag", "Vexlar", "Jaxor", "Noxis", "Kazak",
            "Rygax", "Zedrin", "Kalgon", "Ventar", "Luxor", "Daxon", "Gorhan", "Zynor",
            "Mazarin", "Korvax", "Jyntar", "Zakrin", "Axelon", "Razak", "Novus", "Blazor",
            "Neonix", "Fluxar", "Onyxar", "Pulsar", "Sirenix", "Boltron", "Surgon", "Orbitron",
            "Cosmosis", "Astron", "Galaxor", "Nebulax", "Quasaris", "Orionix", "Phoenixar", "Atlasis",
            "Titanox", "Quantaris", "Nexusar", "Vortexis", "Ionix", "Omnirus", "Cyberox", "Mechani",
            "Nanorix", "Neuraxis", "Psion", "Chronos", "Helixis", "Proxima", "Xionix", "Zephyron",
            "Echonar", "Solarian", "Lunaris", "Cosmicos", "Arietis", "Orionus", "Lyrian", "Cygnar",
            "Draconis", "Vegans", "Sirian", "Castori", "Polluxar", "Altairian"
        ];
    
        const sciFiFirstName = sciFiFirstNames[Math.floor(Math.random() * sciFiFirstNames.length)];
        const sciFiLastName = sciFiLastNames[Math.floor(Math.random() * sciFiLastNames.length)];
        return `${sciFiFirstName} ${sciFiLastName}`;
    }

    doImpressions() {
        for (let ag1 of this.agents) {
            for (let ag2 of this.agents) {
                if (ag1 !== ag2) {
                    ag1.impressions[ag2.firstName] = Math.floor(Math.random() * 11); // 0-10
                }
            }
        }
    }

    playWeek() {
        if (this.stepByStepMode) {
            this.initializeWeek();
            this.nextStep();
        } else {
            this.clearTextBox();
            this.week = this.numPlayers - this.agents.length + 1;
            this.printText(`Week ${this.week}:`);
    
            if (this.endState === 1) {
                return;
            }
    
            // Reset colors of all agents
            for (let ag of this.agents) {
                ag.OVR = false;
                ag.flagged = false;
                ag.vetoed = false;
                ag.POD = false;
                ag.replacementFlagged = false; 
                this.lastPurgedAgent = null; 
            }
    
            if (this.agents.length > 2) {
                this.selectOVR();
                this.eventManager.eventSpawner();
                const flagged = this.selectFlagged();
                this.eventManager.eventSpawner();
                const potentialPlayers = this.playDisruptionAcquisition(flagged);
                this.eventManager.eventSpawner();
                this.PODCeremony(flagged, potentialPlayers);
                this.eventManager.eventSpawner();
                this.purging(flagged);
                this.eventManager.eventSpawner();
            } else {
                this.finale();
            }
    
            this.updateUI();
        }
    }

    selectOVR() {
        this.printText("The agents compete to become the Overseer.");
        
        let potentialOVRs = this.agents.filter(ag => ag !== this.prevOVR);
        if (potentialOVRs.length === 0) potentialOVRs = this.agents;
    
        this.OVR = this.randomChoice(potentialOVRs);
        this.OVR.OVR = true;
        this.prevOVR = this.OVR;
    
        this.printText(`<span style="color: yellow;">${this.OVR.firstName}</span> is the new Overseer. All hail!`);
        this.updateLabel('ovrLabel', this.OVR.firstName, 'yellow');
    }

    selectFlagged() {
        const flagged = [];
        const worstImpressions = Object.entries(this.OVR.impressions)
            .sort(([,a],[,b]) => a-b)
            .filter(([name,]) => this.agents.some(ag => ag.firstName === name))
            .slice(0, 2);

        for (let [name,] of worstImpressions) {
            flagged.push(this.agents.find(ag => ag.firstName === name));
        }

        if (flagged.length < 2) {
            let potentialFlagged = this.agents.filter(ag => ag !== this.OVR && !flagged.includes(ag));
            while (flagged.length < 2 && potentialFlagged.length > 0) {
                const flaggedAG = this.randomChoice(potentialFlagged);
                flagged.push(flaggedAG);
                potentialFlagged = potentialFlagged.filter(ag => ag !== flaggedAG);
            }
        }

        flagged.forEach(flaggedAG => flaggedAG.flagged = true);

        const flaggedText = flagged.map(n => this.colorAgentName(n.firstName)).join(', ');
        this.printText(`${this.colorAgentName(this.OVR.firstName)} has flagged ${flaggedText} for removal.`);
        this.updateLabel('flaggedLabel', flaggedText);

        return flagged;
    }

    playDisruptionAcquisition(flagged) {
        this.printText("The agents compete in the disruption acquisition.");
        
        const NUM_POD_PLAYERS = 6;
        let potentialPlayers = this.agents.filter(ag => !flagged.includes(ag) && ag !== this.OVR);
        
        if (this.agents.length > 3) {
            let PODPlayers = this.randomSample(potentialPlayers, Math.min(potentialPlayers.length, NUM_POD_PLAYERS - 3));
            PODPlayers = PODPlayers.concat(flagged, [this.OVR]);
            this.PODWinner = this.randomChoice(PODPlayers);
        } else {
            this.PODWinner = null;
        }
    
        if (this.PODWinner) {
            this.printText(`<span style="color: orange;">${this.PODWinner.firstName}</span> has won the Power of Disruption!`);
            this.updateLabel('PODHolderLabel', this.PODWinner.firstName, 'orange');
        }
    
        return potentialPlayers;
    }

    PODCeremony(flagged, potentialPlayers) {
        if (this.PODWinner) {
            this.updateLabel('PODHolderLabel', this.PODWinner.firstName);
    
            if (flagged.includes(this.PODWinner)) {
                this.printText(`${this.colorText(this.PODWinner.firstName, 'orange')} has won the Power of Disruption and is one of the flagged agents.`);
                const PODUsed = Math.random() < 0.5;
                if (PODUsed) {
                    const otherFlagged = flagged.find(ag => ag !== this.PODWinner);
                    this.printText(`${this.colorText(this.PODWinner.firstName, 'orange')} has chosen to use the Power of Disruption on ${this.colorText(otherFlagged.firstName, 'purple')}.`);
                    flagged = flagged.filter(n => n !== otherFlagged);
                    otherFlagged.vetoed = true;
    
                    let replacementFlagged;
                    if (potentialPlayers.length > 0) {
                        replacementFlagged = this.randomChoice(potentialPlayers);
                    } else {
                        replacementFlagged = this.randomChoice(this.agents.filter(ag => ag !== this.PODWinner && !flagged.includes(ag)));
                    }
                    replacementFlagged.replacementFlagged = true;
                    flagged.push(replacementFlagged);
                    this.printText(`<span style="color: yellow;">${this.OVR.firstName}</span> has flagged <span style="color: var(--flagged-color);">${replacementFlagged.firstName}</span> as the replacement.`);
                    this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.firstName)).join(', '));
                } else {
                    this.printText(`${this.colorText(this.PODWinner.firstName, 'orange')} has chosen not to use the Power of Disruption.`);
                    this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.firstName)).join(', '));
                }
            } else {
                this.printText(`${this.colorText(this.PODWinner.firstName, 'orange')} has won the Power of Disruption.`);
                const PODUsed = Math.random() < 0.5;
                if (PODUsed) {
                    const flaggedSaved = this.randomChoice(flagged);
                    this.printText(`${this.colorText(this.PODWinner.firstName, 'orange')} has chosen to use the Power of Disruption on ${this.colorText(flaggedSaved.firstName, 'purple')}.`);
                    flagged = flagged.filter(n => n !== flaggedSaved);
                    flaggedSaved.vetoed = true;
    
                    let replacementFlagged;
                    if (this.PODWinner.target && this.agents.includes(this.PODWinner.target) && !this.PODWinner.target.vetoed) {
                        replacementFlagged = this.PODWinner.target;
                    } else {
                        replacementFlagged = this.randomChoice(potentialPlayers.filter(p => p !== flaggedSaved && !flagged.includes(p)));
                    }
                    if (replacementFlagged) {
                        replacementFlagged.replacementFlagged = true;
                        flagged.push(replacementFlagged);
                        this.printText(`<span style="color: yellow;">${this.OVR.firstName}</span> has flagged <span style="color: var(--flagged-color);">${replacementFlagged.firstName}</span> as the replacement.`);
                        this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.firstName)).join(', '));
                    }
                } else {
                    this.printText(`${this.colorText(this.PODWinner.firstName, 'orange')} has chosen not to use the Power of Disruption.`);
                    this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.firstName)).join(', '));
                }
            }
        } else {
            this.printText("No Power of Disruption this week, as there are too few agents remaining.");
            this.updateLabel('PODHolderLabel', 'Not Played');
            this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.firstName)).join(', '));
        }
        this.postDisruptionFlags = [...flagged];
    }

    purging(flagged) {
        const eligibleForEviction = flagged.filter(ag => !ag.vetoed);
    
        if (eligibleForEviction.length === 0) {
            this.printText("No agents are eligible for eviction this week.");
            return;
        }
    
        const votes = {};
        for (let agent of this.agents.filter(ag => ag !== this.OVR)) {
            votes[agent.firstName] = this.randomChoice(eligibleForEviction).firstName;
        }
    
        const purgedName = Object.entries(votes)
            .reduce((acc, [voter, votedFor]) => {
                acc[votedFor] = (acc[votedFor] || 0) + 1;
                return acc;
            }, {});
    
        const purged = eligibleForEviction.find(n => n.firstName === Object.keys(purgedName).reduce((a, b) => purgedName[a] > purgedName[b] ? a : b));
    
        this.printText(`<span style="color: var(--recently-purged-text);">${purged.firstName}</span> has been purged from the We Are Watching house.`);
        this.updateLabel('purgedLabel', purged.firstName, 'var(--recently-purged-text)');
        this.lastPurgedAgent = purged;
        this.purgedAgents.push(purged);
        this.agents = this.agents.filter(ag => ag !== purged);
    
        // Update targets
        for (let ag of this.agents) {
            if (ag.target === purged.firstName) {
                ag.target = null;
            }
        }
    
        // Reset "vetoed" status
        for (let ag of this.agents) {
            ag.vetoed = false;
        }
    
        this.updateAgentList();
    }

    finale() {
        this.endState = 1;
        const finalAgents = [...this.agents];
        this.printText(`Final 2: ${finalAgents[0].summary()} and ${finalAgents[1].summary()}`);
        this.printText(`${finalAgents[0].firstName} pleads their case...`);
        this.printText(`${finalAgents[1].firstName} pleads their case...`);
    
        const votes = {};
        for (let guest of this.purgedAgents) {
            votes[guest.firstName] = this.randomChoice(finalAgents).firstName;
        }
    
        let votes1 = 0, votes2 = 0;
        for (let [voter, votedFor] of Object.entries(votes)) {
            this.printText(`${voter} votes for ${votedFor} to win!`);
            if (votedFor === finalAgents[0].firstName) votes1++;
            else votes2++;
        }
    
        const winner = votes1 > votes2 ? finalAgents[0] : (votes2 > votes1 ? finalAgents[1] : this.randomChoice(finalAgents));
        const runnerUp = winner === finalAgents[0] ? finalAgents[1] : finalAgents[0];

        this.winner = winner;
        this.runnerUp = runnerUp;

        this.printText(`${this.colorText(winner.firstName, 'green')} wins We Are Watching!`);
        this.printText(`${this.colorText(runnerUp.firstName, '#6495ED')} is the runner-up.`);

        // Update the label column
        document.querySelector('.label-column .info-row:nth-child(1) .label-text').textContent = 'Winner';
        document.querySelector('.label-column .info-row:nth-child(2) .label-text').textContent = 'Runner-Up';
        document.querySelector('.label-column .info-row:nth-child(3) .label-text').textContent = `Votes for ${winner.firstName}`;
        document.querySelector('.label-column .info-row:nth-child(4) .label-text').textContent = `Votes for ${runnerUp.firstName}`;
        document.querySelector('.label-column .info-row:nth-child(5) .label-text').textContent = 'Thanks for watching!';

        // Update the value column
        this.updateLabel('ovrLabel', winner.firstName, 'green');
        this.updateLabel('flaggedLabel', runnerUp.firstName, '#6495ED');
        this.updateLabel('PODHolderLabel', Math.max(votes1, votes2).toString(), 'green');
        this.updateLabel('replacementFlaggedLabel', Math.min(votes1, votes2).toString(), '#6495ED');
        this.updateLabel('purgedLabel', 'Tune in next season!');

        //this.refreshGameInfo();

        this.updateAgentList();

        // disable the continueBtn
        const continueBtn = document.getElementById('continueBtn');
        continueBtn.disabled = true;

        // enable the finishBtn
        const finishBtn = document.getElementById('finishBtn');
        finishBtn.style.display = 'inline-block';  // or 'block', depending on your layout

        // Hide the reset button
        document.getElementById('resetBtn').style.display = 'none';
    }

    refreshGameInfo() {
        const gameInfo = document.getElementById('gameInfo');
        gameInfo.style.display = 'flex';
        gameInfo.style.justifyContent = 'space-between';
        
        document.querySelectorAll('.info-row').forEach(row => {
            row.style.display = 'flex';
        });
    }

    finishGame() {
        this.reset();
        this.updateAgentList();
        
        // Re-enable the continueBtn
        const continueBtn = document.getElementById('continueBtn');
        continueBtn.disabled = false;
    
        // Hide the finishBtn and show the resetBtn
        const finishBtn = document.getElementById('finishBtn');
        finishBtn.style.display = 'none';
        document.getElementById('resetBtn').style.display = 'inline-block';  // or 'block'
    }

    

    // Utility methods
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    randomSample(array, n) {
        const shuffled = array.slice(0);
        let i = array.length;
        const min = i - n;
        let temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    printText(text) {
        const textBox = document.getElementById('textBox');
        textBox.innerHTML += text + '<br>';
        textBox.scrollTop = textBox.scrollHeight;
    }

    clearTextBox() {
        document.getElementById('textBox').innerHTML = '';
    }

    updateLabel(id, text, color = null) {
        const element = document.getElementById(id);
        if (element) {
            if (text) {
                element.innerHTML = text;
                if (color) {
                    element.style.color = color;
                }
                element.closest('.info-row').style.display = 'flex';
            } else {
                element.closest('.info-row').style.display = 'none';
            }
        }
    }

    updateAgentList() {
        const agentsDiv = document.getElementById('agents');
        agentsDiv.innerHTML = '';
    
        let orderedAgents = [];
    
        // Add Overseer
        if (this.OVR) orderedAgents.push(this.OVR);
    
        // Add Flagged agents
        for (let ag of this.agents) {
            if (ag.flagged && !ag.vetoed && ag !== this.OVR) orderedAgents.push(ag);
        }
    
        // Add Replacement Flagged agent
        for (let ag of this.agents) {
            if (ag.replacementFlagged && ag !== this.OVR) {
                orderedAgents.push(ag);
                break;
            }
        }
    
        // Add Power of Disruption Winner
        if (this.PODWinner && this.PODWinner !== this.OVR && !this.PODWinner.flagged && !this.PODWinner.replacementFlagged) {
            orderedAgents.push(this.PODWinner);
        }
    
        // Add remaining agents still in the game
        for (let ag of this.agents) {
            if (!orderedAgents.includes(ag)) orderedAgents.push(ag);
        }
    
        // Add last purged agent if it exists and is not null
        if (this.lastPurgedAgent) {
            orderedAgents.push(this.lastPurgedAgent);
        }
    
        // Add active agents and last purged agent to the display
        for (let ag of orderedAgents) {
            const agElement = this.createAgentElement(ag);
            agentsDiv.appendChild(agElement);
        }
    
        // Add divider if there are purged agents
        if (this.purgedAgents.length > 0) {
            const divider = document.createElement('div');
            divider.className = 'agent-divider';
            agentsDiv.appendChild(divider);
        }
    
        // Add previously purged agents
        for (let ag of this.purgedAgents.slice().reverse()) {
            if (ag !== this.lastPurgedAgent) {  // Skip the last purged agent as it's already above the divider
                const agElement = this.createAgentElement(ag);
                agentsDiv.appendChild(agElement);
            }
        }
    }
    
    createAgentElement(ag) {
        const agElement = document.createElement('div');
        agElement.className = 'agent';
    
        if (ag === this.winner) {
            agElement.classList.add('winner');
        } else if (ag === this.runnerUp) {
            agElement.classList.add('runner-up');
        } else if (ag === this.lastPurgedAgent) {
            agElement.classList.add('recently-purged');
        } else if (this.purgedAgents.includes(ag)) {
            agElement.classList.add('purged');
        } else if (ag.OVR) {
            agElement.classList.add('overseer');
        } else if (ag.flagged && ag.vetoed) {
            agElement.classList.add('flagged-saved');
        } else if (ag.replacementFlagged) {
            agElement.classList.add('replacement-flagged');
        } else if (ag.flagged) {
            agElement.classList.add('flagged');
        } else if (ag === this.PODWinner) {
            agElement.classList.add('pod-winner');
        }
    
        const nameSpan = document.createElement('span');
        nameSpan.textContent = ag.fullName;
    
        agElement.appendChild(nameSpan);
        agElement.addEventListener('dblclick', () => this.editAgentName(ag));
    
        return agElement;
    }

    colorAgentName(name) {
        const agent = this.agents.find(a => a.firstName === name) || this.purgedAgents.find(a => a.firstName === name);
        if (!agent) return name;
        
        let color = 'var(--regular-agent-color)';
        
        if (agent === this.lastPurgedAgent) {
            color = 'var(--recently-purged-text)';
        } else if (this.purgedAgents.includes(agent)) {
            color = 'var(--purged-text)';
        } else if (agent === this.OVR) {
            color = 'var(--overseer-text)';
        } else if (agent.flagged && !agent.vetoed) {
            color = 'var(--flagged-text)';
        } else if (agent.replacementFlagged) {
            color = 'var(--replacement-flagged-text)';
        } else if (agent.flagged && agent.vetoed) {
            color = 'var(--flagged-saved-text)';
        } else if (agent === this.PODWinner) {
            color = 'var(--pod-winner-text)';
        } else if (agent === this.winner) {
            color = 'var(--winner-text)';
        } else if (agent === this.runnerUp) {
            color = 'var(--runner-up-text)';
        }
        
        return `<span style="color: ${color};">${name}</span>`;
    }

    editAgentName(agent) {
        const newName = prompt(`Enter new name for ${agent.firstName}:`, agent.firstName);
        if (newName && newName !== agent.firstName) {
            agent.fullName = `${newName} ${agent.fullName.split(' ')[1]}`; // Update the full name
            agent.firstName = newName; // Update the first name
            this.updateAgentList();
        }
    }

    showImpressions() {
        // Implement impression matrix display
        console.log("Impression matrix display not implemented yet");
    }

    reset() {
        // Reset game state
        this.agents = [];
        this.purgedAgents = [];
        this.prevOVR = null;
        this.endState = 0;
        this.showmances = [];
        this.alliances = {};
        this.seasonNum++;
        this.winner = null;
        this.runnerUp = null;
        this.PODWinner = null;
        this.OVR = null;
        this.week = 0;
    
        // Reset agent properties
        for (let ag of this.agents) {
            ag.OVR = false;
            ag.flagged = false;
            ag.vetoed = false;
            ag.POD = false;
            ag.replacementFlagged = false;
        }
    
        // Recreate players and impressions
        this.createPlayers();
        this.doImpressions();
    
        // Clear UI
        this.clearTextBox();
        this.updateUI();
    
        // Restore original labels
        document.querySelectorAll('.label-column .info-row .label-text').forEach(label => label.textContent = '');
        
        document.querySelector('.label-column .info-row:nth-child(1) .label-text').textContent = 'Overseer';
        document.querySelector('.label-column .info-row:nth-child(2) .label-text').textContent = 'Flagged';
        document.querySelector('.label-column .info-row:nth-child(3) .label-text').textContent = 'Disruptor';
        document.querySelector('.label-column .info-row:nth-child(4) .label-text').textContent = 'Post-Disruption Flags';
        document.querySelector('.label-column .info-row:nth-child(5) .label-text').textContent = 'Purged';
    
        // Clear value labels
        document.querySelectorAll('.value-column .info-row .value-text').forEach(value => value.textContent = '');
    
        // Reintroduce agents
        this.introduceAgents();
    
        // Show start screen and hide game buttons
        document.getElementById('startScreen').style.display = 'block';
        document.getElementById('gameButtons').style.display = 'none';
        document.getElementById('finishBtn').style.display = 'none';
        // Show the label text again
        document.querySelectorAll('.label-text.finaleHide').forEach(el => el.classList.remove('hidden'));
    }

    introduceAgents() {
        this.clearTextBox();
        this.printText(`Meet the ${this.agents.length} agents:`);
        for (let ag of this.agents) {
            this.printText(ag.summary());
        }
    }
    
    editAgentName(agent) {
        const newName = prompt(`Enter new name for ${agent.firstName}:`, agent.firstName);
        if (newName && newName !== agent.firstName) {
            agent.firstName = newName;
            updateAgentList();
        }
    }

    initializeWeek() {
        console.log("In initializeWeek");
        this.clearTextBox();
        this.currentWeek = this.numPlayers - this.agents.length + 1;
        this.printText(`Week ${this.currentWeek}:`);
    
        if (this.endState === 1 || this.agents.length <= 2) {
            this.finale();
            return;
        }
    
        // Reset colors and statuses of all agents
        for (let ag of this.agents) {
            ag.OVR = false;
            ag.flagged = false;
            ag.vetoed = false;
            ag.POD = false;
            ag.replacementFlagged = false; 
        }
        this.lastPurgedAgent = null;
    
        this.stepIndex = 0;
        this.flagged = [];
        this.potentialPlayers = [];
        this.PODWinner = null;
        this.postDisruptionFlags = null;
    
        // Update the agent list to reflect the reset colors
        this.updateAgentList();
    
        // Reset the game info labels
        this.updateLabel('ovrLabel', '');
        this.updateLabel('flaggedLabel', '');
        this.updateLabel('PODHolderLabel', '');
        this.updateLabel('replacementFlaggedLabel', '');
        this.updateLabel('purgedLabel', '');
    }

    nextStep() {
        if (this.currentStep === 0) {
            this.initializeWeek();
        }

        // Perform the current step
        switch (this.currentStep) {
            case 0:
                this.selectOVR();
                break;
            case 1:
                this.flagged = this.selectFlagged();
                break;
            case 2:
                this.potentialPlayers = this.playDisruptionAcquisition(this.flagged);
                break;
            case 3:
                this.PODCeremony(this.flagged, this.potentialPlayers);
                break;
            case 4:
                this.purging(this.flagged);
                break;
        }

        this.eventManager.eventSpawner();
        this.updateUI();

        this.currentStep++;

        // Check if we've completed all steps for this week
        if (this.currentStep >= this.stepsPerWeek) {
            this.currentStep = 0; // Reset for next week
            this.currentWeek++; // Move to the next week
            this.initializeWeek(); // Initialize the new week
        } 
        document.getElementById('stepBtn').disabled = false;

        if (this.endState === 1 || this.agents.length <= 2) {
            this.finale();
        }
    }

    updateUI() {
        this.updateAgentList();
        this.updateLabel('ovrLabel', this.OVR ? this.OVR.firstName : '', 'yellow');
        this.updateLabel('flaggedLabel', this.flagged ? this.flagged.map(n => this.colorAgentName(n.firstName)).join(', ') : '');
        this.updateLabel('PODHolderLabel', this.PODWinner ? this.PODWinner.firstName : '', 'orange');
        this.updateLabel('replacementFlaggedLabel', this.postDisruptionFlags ? this.postDisruptionFlags.map(n => this.colorAgentName(n.firstName)).join(', ') : '');
        this.updateLabel('purgedLabel', this.lastPurgedAgent ? this.lastPurgedAgent.firstName : '', 'var(--recently-purged-text)');
    }

    toggleStepByStepMode() {
        this.stepByStepMode = !this.stepByStepMode;
        const stepBtn = document.getElementById('stepBtn');
        stepBtn.textContent = this.stepByStepMode ? "Continue Step" : "Enable Step-by-Step";
        
        if (this.stepByStepMode) {
            document.getElementById('continueBtn').disabled = true;
            this.initializeWeek(); // Initialize week when switching to step-by-step mode
            this.currentStep = 0;
        } else {
            document.getElementById('continueBtn').disabled = false;
            stepBtn.disabled = true;
        }
    }


    createAlliance() {
        if (this.agents.length > 5) {
            const members = this.randomSample(this.agents, Math.floor(Math.random() * 3) + 2);
            const allianceName = "The " + this.randomChoice(["Wolves", "Dragons", "Lions", "Snakes", "Eagles"]);
            this.alliances[allianceName] = members.map(ag => ag.firstName);
            this.printText(`${allianceName} alliance forms between ${members.map(m => m.firstName).join(', ')}.`);
        }
    }
    
    showAlliances() {
        console.log("Alliances:", this.alliances);
        // Implement UI for showing alliances
    }
    
    showShowmances() {
        console.log("Showmances:", this.showmances);
        // Implement UI for showing showmances
    }

    colorText(text, color) {
        return `<span class="agent-name" style="color: ${color || 'inherit'};">${text}</span>`;
    }

    showColorCustomization() {
        const dialog = document.getElementById('colorCustomizationDialog');
        const colorOptions = document.getElementById('colorOptions');
        colorOptions.innerHTML = `
            <div class="color-header">
                <span>Role</span>
                <span>Background</span>
                <span>Text</span>
            </div>
        `;
    
        const roles = [
            { name: 'Regular Agent', bgVar: '--agent-background', textVar: '--regular-agent-color' },
            { name: 'Winner', bgVar: '--winner-background', textVar: '--winner-text' },
            { name: 'Runner-up', bgVar: '--runner-up-background', textVar: '--runner-up-text' },
            { name: 'Purged', bgVar: '--purged-background', textVar: '--purged-text' },
            { name: 'Overseer', bgVar: '--overseer-background', textVar: '--overseer-text' },
            { name: 'Flagged', bgVar: '--flagged-background', textVar: '--flagged-text' },
            { name: 'Replacement Flagged', bgVar: '--replacement-flagged-background', textVar: '--replacement-flagged-text' },
            { name: 'Flagged Saved', bgVar: '--flagged-saved-background', textVar: '--flagged-saved-text' },
            { name: 'POD Winner', bgVar: '--pod-winner-background', textVar: '--pod-winner-text' },
            { name: 'Recently Purged', bgVar: '--recently-purged-background', textVar: '--recently-purged-text' },
        ];
    
        roles.forEach(role => {
            const div = document.createElement('div');
            div.className = 'color-option';
            div.innerHTML = `
                <span>${role.name}</span>
                <div>
                    <label for="${role.bgVar}">Background:</label>
                    <input type="color" id="${role.bgVar}" value="${this.getComputedColorValue(role.bgVar)}">
                </div>
                <div>
                    <label for="${role.textVar}">Text:</label>
                    <input type="color" id="${role.textVar}" value="${this.getComputedColorValue(role.textVar)}">
                </div>
            `;
            colorOptions.appendChild(div);
        });
    
        dialog.style.display = 'block';
    }
    
    getComputedColorValue(varName) {
        const computedValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        return computedValue !== '' ? computedValue : this.getDefaultColor(varName);
    }
    
    getDefaultColor(varName) {
        switch (varName) {
            case '--agent-background':
                return '#2D2D2D';
            case '--flagged-saved-background':
                return 'black';
            case '--regular-agent-color':
                return 'white';
            case '--winner-text':
            case '--runner-up-text':
            case '--purged-text':
                return 'black';
            case '--overseer-text':
                return '#FFD700';
            case '--flagged-text':
                return 'rgb(0, 255, 21)';
            case '--replacement-flagged-text':
                return 'red';
            case '--flagged-saved-text':
                return 'orange';
            default:
                return 'white';
        }
    }

    saveColors() {
        const inputs = document.querySelectorAll('#colorOptions input[type="color"]');
        inputs.forEach(input => {
            const color = input.value;
            document.documentElement.style.setProperty(input.id, color);
            localStorage.setItem(input.id, color);
            
            // Calculate and set the contrast color
            const contrastColor = this.getContrastColor(color);
            const textVar = input.id.replace('-background', '-text');
            document.documentElement.style.setProperty(textVar, contrastColor);
            localStorage.setItem(textVar, contrastColor);
        });
        this.closeColorDialog();
        this.updateAgentList();
    }
    
    getContrastColor(hexcolor) {
        hexcolor = hexcolor.replace('#', '');
        const r = parseInt(hexcolor.substr(0,2),16);
        const g = parseInt(hexcolor.substr(2,2),16);
        const b = parseInt(hexcolor.substr(4,2),16);
        const yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    closeColorDialog() {
        document.getElementById('colorCustomizationDialog').style.display = 'none';
    }

    loadColors() {
        const roles = [
            { name: 'Regular Agent', bgVar: '--agent-background', textVar: '--regular-agent-color' },
            { name: 'Winner', bgVar: '--winner-background', textVar: '--winner-text' },
            { name: 'Runner-up', bgVar: '--runner-up-background', textVar: '--runner-up-text' },
            { name: 'Purged', bgVar: '--purged-background', textVar: '--purged-text' },
            { name: 'Overseer', bgVar: '--overseer-background', textVar: '--overseer-text' },
            { name: 'Flagged', bgVar: '--flagged-background', textVar: '--flagged-text' },
            { name: 'Replacement Flagged', bgVar: '--replacement-flagged-background', textVar: '--replacement-flagged-text' },
            { name: 'Flagged Saved', bgVar: '--flagged-saved-background', textVar: '--flagged-saved-text' },
            { name: 'POD Winner', bgVar: '--pod-winner-background', textVar: '--pod-winner-text' },
        ];
    
        roles.forEach(role => {
            const savedBgColor = localStorage.getItem(role.bgVar);
            const savedTextColor = localStorage.getItem(role.textVar);
            
            document.documentElement.style.setProperty(role.bgVar, savedBgColor || this.getComputedColorValue(role.bgVar));
            document.documentElement.style.setProperty(role.textVar, savedTextColor || this.getComputedColorValue(role.textVar));
        });
    }

    resetColorsToDefault() {
        const roles = [
            { name: 'Regular Agent', bgVar: '--agent-background', textVar: '--regular-agent-color' },
            { name: 'Winner', bgVar: '--winner-background', textVar: '--winner-text' },
            { name: 'Runner-up', bgVar: '--runner-up-background', textVar: '--runner-up-text' },
            { name: 'Purged', bgVar: '--purged-background', textVar: '--purged-text' },
            { name: 'Overseer', bgVar: '--overseer-background', textVar: '--overseer-text' },
            { name: 'Flagged', bgVar: '--flagged-background', textVar: '--flagged-text' },
            { name: 'Replacement Flagged', bgVar: '--replacement-flagged-background', textVar: '--replacement-flagged-text' },
            { name: 'Flagged Saved', bgVar: '--flagged-saved-background', textVar: '--flagged-saved-text' },
            { name: 'POD Winner', bgVar: '--pod-winner-background', textVar: '--pod-winner-text' },
        ];
    
        roles.forEach(role => {
            // Reset to default by removing the property from inline styles
            document.documentElement.style.removeProperty(role.bgVar);
            document.documentElement.style.removeProperty(role.textVar);
            
            // Remove from localStorage
            localStorage.removeItem(role.bgVar);
            localStorage.removeItem(role.textVar);
        });
    
        // Update the color inputs in the customization dialog
        this.showColorCustomization();
    
        // Update the agent list to reflect the changes
        this.updateAgentList();
    }

    showPreferences() {
        const dialog = document.getElementById('preferencesDialog');
        const nameTypeOptions = document.getElementById('nameTypeOptions');
        
        // Clear previous options
        nameTypeOptions.innerHTML = '';
    
        const nameTypes = ['American', 'Silly', 'Sci-Fi'];
    
        nameTypes.forEach(type => {
            const div = document.createElement('div');
            div.className = 'color-option';
            div.innerHTML = `
                <label>${type} Names:</label>
                <div>
                    <label class="switch">
                        <input type="checkbox" id="${type.toLowerCase()}NameType" ${this[type.toLowerCase() + 'NamesEnabled'] ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </div>
            `;
            nameTypeOptions.appendChild(div);
    
            const checkbox = div.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => this.updateNameTypeCheckboxes());
        });
    
        this.updateNameTypeCheckboxes(); // Initial update
        dialog.style.display = 'block';
    }
    
    updateNameTypeCheckboxes() {
        const checkboxes = document.querySelectorAll('#nameTypeOptions input[type="checkbox"]');
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    
        checkboxes.forEach(checkbox => {
            if (checkedCount === 1 && checkbox.checked) {
                checkbox.disabled = true;
            } else {
                checkbox.disabled = false;
            }
        });
    }

    savePreferences() {
        const nameTypes = ['American', 'Silly', 'Sci-Fi'];
    
        nameTypes.forEach(type => {
            const checkbox = document.getElementById(type.toLowerCase() + 'NameType');
            this[type.toLowerCase() + 'NamesEnabled'] = checkbox.checked;
        });
    
        this.closePreferencesDialog();
        this.reset(); // Regenerate names and reset the game
    }

    closePreferencesDialog() {
        document.getElementById('preferencesDialog').style.display = 'none';
    }

    preSeasonIntroduction() {
        this.clearTextBox();
        this.printText("Welcome to We Are Watching! The agents are about to meet each other for the first time.");
    
        // Simulate 20-30 interactions
        for (let i = 0; i < Math.floor(Math.random() * 11) + 20; i++) {
            this.eventManager.eventSpawner();
        }
    
        this.printText("The first week is about to begin!");
        
        // Update UI
        this.updateUI();
        
        // Enable the continue button
        document.getElementById('continueBtn').disabled = false;
    }

    showInformation() {
        const dialog = document.getElementById('informationDialog');
        
        // Update Alliances
        const alliancesContent = document.getElementById('alliancesContent');
        alliancesContent.innerHTML = '';
        for (const [allianceName, alliance] of Object.entries(this.alliances)) {
            alliancesContent.innerHTML += `<p>${allianceName}: ${alliance.members.map(m => m.firstName).join(', ')}</p>`;
        }
    
        // Update Impressions
        const impressionsContent = document.getElementById('impressionsContent');
        impressionsContent.innerHTML = '';
        impressionsContent.appendChild(this.createImpressionMatrix());
    
        // Update Showmances
        const showmancesContent = document.getElementById('showmancesContent');
        showmancesContent.innerHTML = '';
        for (const [agent1, agent2] of this.showmances) {
            showmancesContent.innerHTML += `<p>${agent1.firstName} & ${agent2.firstName}</p>`;
        }
    
        // Display the dialog
        dialog.style.display = 'block';
        
        // Open the Alliances tab by default
        document.querySelector('.tablinks').click();
    }
    
    createImpressionMatrix() {
        const matrix = document.createElement('div');
        matrix.className = 'impression-matrix';
    
        const agents = this.agents;
        const size = agents.length + 1;
    
        matrix.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
        // Add empty top-left cell
        matrix.appendChild(this.createCell('', 'impression-header'));
    
        // Add column headers
        agents.forEach(agent => {
            matrix.appendChild(this.createCell(agent.firstName, 'impression-header'));
        });
    
        // Add rows
        agents.forEach(agent1 => {
            matrix.appendChild(this.createCell(agent1.firstName, 'impression-header'));
            agents.forEach(agent2 => {
                if (agent1 === agent2) {
                    matrix.appendChild(this.createCell('X', 'impression-cell', 'gray'));
                } else {
                    const impression = agent1.impressions[agent2.firstName];
                    matrix.appendChild(this.createCell(impression, 'impression-cell', this.getImpressionColor(impression)));
                }
            });
        });
    
        return matrix;
    }
    
    createCell(content, className, backgroundColor = null) {
        const cell = document.createElement('div');
        cell.className = className;
        cell.textContent = content;
        if (backgroundColor) {
            cell.style.backgroundColor = backgroundColor;
        }
        return cell;
    }
    
    getImpressionColor(value) {
        const colors = [
            "#D10A0A", "#fe5f00", "#fe8b00", "#ffb000", "#fcd303",
            "#cfcd00", "#a2c600", "#70bd00", "#30b200", "#45FF00"
        ];
        return colors[value - 1] || '#FFFFFF';
    }
}

const game = new WeAreWatching();

document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('startBtn').addEventListener('click', () => {
        game.preSeasonIntroduction();
        showGameButtons();
    });
    document.getElementById('continueBtn').addEventListener('click', () => {
        console.log('Playing next week...');
        game.playWeek();
    });
    var finishBtn = document.getElementById('finishBtn');
    finishBtn.addEventListener('click', () => game.finishGame());

    document.getElementById('informationBtn').addEventListener('click', () => game.showInformation());
    document.getElementById('closeInfoDialogBtn').addEventListener('click', () => {
        document.getElementById('informationDialog').style.display = 'none';
    });
    document.getElementById('stepBtn').addEventListener('click', () => {
        if (game.stepByStepMode) {
            game.nextStep();
        } else {
            game.toggleStepByStepMode();
        }
    });
    document.getElementById('resetBtn').addEventListener('click', () => {
        game.reset();
        game.updateAgentList();
    });
    document.getElementById('customizeColorsBtn').addEventListener('click', () => game.showColorCustomization());
    document.getElementById('saveColorsBtn').addEventListener('click', () => game.saveColors());
    document.getElementById('closeColorDialogBtn').addEventListener('click', () => game.closeColorDialog());
    document.getElementById('resetColorsBtn').addEventListener('click', () => game.resetColorsToDefault());

    document.getElementById('preferencesBtn').addEventListener('click', () => game.showPreferences());
    document.getElementById('savePreferencesBtn').addEventListener('click', () => game.savePreferences());
    document.getElementById('closePreferencesDialogBtn').addEventListener('click', () => game.closePreferencesDialog());

    // Initial setup
    game.updateAgentList();
    game.introduceAgents();
});

function showGameButtons() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameButtons').style.display = 'block';
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
