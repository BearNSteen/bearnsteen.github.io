class Agent {
    constructor(name) {
        this.fullName = name;
        this.firstName = name.split(' ')[0];
        this.age = Math.floor(Math.random() * 20) + 21; // 21-40
        this.profession = this.randomProfession();
        this.OVR = false;
        this.flagged = false;
        this.replacementFlagged = false;
        this.POD = false;
        this.target = null;
        this.impressions = {};
        this.vetoed = false;
        this.winner = null;
        this.runnerUp = null;

        this.friendliness = Math.floor(Math.random() * 5) + 1;
        this.loyalty = Math.floor(Math.random() * 5) + 1;
        this.manipulativeness = Math.floor(Math.random() * 5) + 1;
        this.emotionality = Math.floor(Math.random() * 5) + 1;
        this.competitiveness = Math.floor(Math.random() * 5) + 1;
    }

    randomProfession() {
        const professions = [
            "Accountant", "Actor", "Athlete", "Author", "Chef",
            "Engineer", "Entrepreneur", "Nurse", "Photographer",
            "Scientist", "Teacher"
        ];
        return professions[Math.floor(Math.random() * professions.length)];
    }

    summary() {
        return `${this.fullName} - ${this.age}, ${this.profession}`;
    }
}

class WeAreWatching {
    constructor() {
        this.numPlayers = 12;
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
        this.loadColors();
        this.createPlayers();
        this.doImpressions();
    }

    createPlayers() {
        const usedNames = new Set();
        while (this.agents.length < this.numPlayers) {
            let name;
            do {
                const enabledNameTypes = [];
                if (this.americanNamesEnabled) enabledNameTypes.push('randomName');
                if (this.sillyNamesEnabled) enabledNameTypes.push('randomSillyName');
                if (this.sciFiNamesEnabled) enabledNameTypes.push('randomSciFiName');
    
                const randomNameType = this.randomChoice(enabledNameTypes);
                name = this[randomNameType]();
            } while (usedNames.has(name));
            usedNames.add(name);
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
            this.stepIndex = 0;
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
            }
    
            if (this.agents.length > 2) {
                this.selectOVR();
                this.eventSpawner();
                const flagged = this.selectFlagged();
                this.eventSpawner();
                const potentialPlayers = this.playDisruptionAcquisition(flagged);
                this.eventSpawner();
                this.PODCeremony(flagged, potentialPlayers);
                this.eventSpawner();
                this.purging(flagged);
                this.eventSpawner();
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
    
        this.printText(`<span style="color: var(--purged-text);">${purged.firstName}</span> has been purged from the We Are Watching house.`);
        this.updateLabel('purgedLabel', purged.firstName, 'var(--purged-text)');
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
        finishBtn.disabled = false;

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

        // Disable the finishBtn
        const finishBtn = document.getElementById('finishBtn');
        finishBtn.disabled = true;
    }

    eventSpawner() {
        const MAX_EVENTS = 1;
        for (let i = 0; i < Math.floor(Math.random() * (MAX_EVENTS + 1)); i++) {
            const eventIndex = Math.floor(Math.random() * 4);
            switch(eventIndex) {
                case 0:
                    if (this.agents.length >= 3) {
                        const [ag1, ag2, ag3] = this.randomSample(this.agents, 3);
                        this.event1(ag1, ag2, ag3);
                    }
                    break;
                case 1:
                    const [ag1, ag2] = this.randomSample(this.agents, 2);
                    this.event2(ag1, ag2);
                    break;
                case 2:
                    if (this.agents.length >= 2) {
                        const [ag1, ag2] = this.randomSample(this.agents, 2);
                        const alliance = this.randomSample(this.agents, Math.floor(Math.random() * 3) + 2);
                        this.event3(ag1, ag2, alliance);
                    }
                    break;
                case 3:
                    const [ag3, ag4] = this.randomSample(this.agents, 2);
                    this.event4(ag3, ag4);
                    break;
            }
        }
    }

    event1(ag1, ag2, ag3) {
        if (ag1.manipulativeness >= Math.floor(Math.random() * (ag2.emotionality + 1))) {
            ag2.target = ag3.firstName;
            this.printText(`${ag2.firstName} was swayed!`);
        }

        if (ag1.impressions[ag3.firstName] >= 5) {
            ag1.impressions[ag3.firstName] = Math.min(10, ag1.impressions[ag3.firstName] + 1);
            ag2.impressions[ag3.firstName] = Math.max(0, Math.min(10, ag2.impressions[ag3.firstName] + 2));
        } else {
            ag1.impressions[ag3.firstName] = Math.max(0, ag1.impressions[ag3.firstName] - 1);
            ag2.impressions[ag3.firstName] = Math.max(0, ag2.impressions[ag3.firstName] - 2);
        }

        this.printText(`${this.colorAgentName(ag1.firstName)} pulls ${this.colorAgentName(ag2.firstName)} aside to talk about ${this.colorAgentName(ag3.firstName)}.`);
    }

    event2(ag1, ag2) {
        if (ag1.friendliness < ag2.emotionality) {
            ag1.target = ag2.firstName;
            ag2.target = ag1.firstName;
            this.printText(`${ag1.firstName} and ${ag2.firstName} were swayed!`);
        }

        if (Math.random() < 0.8) {
            ag1.impressions[ag2.firstName] = Math.max(0, ag1.impressions[ag2.firstName] - 3);
            ag2.impressions[ag1.firstName] = Math.max(0, ag2.impressions[ag1.firstName] - 3);
        }

        const topics = ["the dishes", "who ate the last slice of pizza", "who flirts too much", "who snores"];
        const topic = this.randomChoice(topics);
        this.printText(`${this.colorAgentName(ag1.firstName)} gets in a fight with ${this.colorAgentName(ag2.firstName)} over ${topic}!`);
    }

    event3(ag1, ag2, alliance) {
        if (!alliance.includes(ag2) && !alliance.includes(ag1)) {
            for (let member of alliance) {
                if (member.loyalty > ag1.manipulativeness) {
                    member.target = ag2.firstName;
                    member.impressions[ag2.firstName] = Math.max(0, member.impressions[ag2.firstName] - 2);
                    this.printText(`${member.firstName} was swayed!`);
                }
            }
        }

        const allianceNames = ["Wolves", "Dragons", "Lions", "Snakes", "Eagles"];
        const allianceName = "The " + this.randomChoice(allianceNames);
        this.printText(`${this.colorAgentName(ag1.firstName)} makes plans with ${allianceName} to evict ${this.colorAgentName(ag2.firstName)}.`);
    }

    event4(ag1, ag2) {
        ag1.impressions[ag2.firstName] = Math.min(10, ag1.impressions[ag2.firstName] + 3);
        ag2.impressions[ag1.firstName] = Math.min(10, ag2.impressions[ag1.firstName] + 3);
        this.printText(`${this.colorAgentName(ag1.firstName)} has a casual conversation with ${this.colorAgentName(ag2.firstName)}.`);
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

    updateUI() {
        this.updateAgentList();
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
                break;  // Only add one replacement flagged agent
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
    
        // Add purged agents in reverse order
        orderedAgents = orderedAgents.concat(this.purgedAgents.slice().reverse());
    
        for (let ag of orderedAgents) {
            const agElement = document.createElement('div');
            agElement.className = 'agent';
    
            if (ag === this.winner) {
                agElement.classList.add('winner');
            } else if (ag === this.runnerUp) {
                agElement.classList.add('runner-up');
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
            nameSpan.textContent = ag.fullName; // Display the full name
    
            agElement.appendChild(nameSpan);
            agElement.addEventListener('dblclick', () => this.editAgentName(ag));
            agentsDiv.appendChild(agElement);
        }
    }

    colorAgentName(name) {
        const agent = this.agents.find(a => a.firstName === name) || this.purgedAgents.find(a => a.firstName === name);
        if (!agent) return name;
        
        let color = 'var(--regular-agent-color)';
        
        if (this.purgedAgents.includes(agent)) {
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
        this.preSeasonIntroduction();
    
        // Show start button and hide game buttons
        document.getElementById('startBtn').style.display = 'block';
        document.getElementById('gameButtons').style.display = 'none';
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

    preSeasonIntroduction() {
        this.printText("Welcome to We Are Watching! The agents are about to meet each other for the first time.");
    
        // Simulate 20-30 interactions
        for (let i = 0; i < 20; i++) {
            this.eventSpawner();
        }
    
        this.printText("The first week is about to begin!");
    }

    nextStep() {
        switch (this.stepIndex) {
            case 0:
                this.selectOVR();
                break;
            case 1:
                this.selectFlagged();
                break;
            case 2:
                this.playDisruptionAcquisition();
                break;
            case 3:
                this.PODCeremony();
                break;
            case 4:
                this.purging();
                this.stepIndex = -1;
                break;
        }
        this.stepIndex++;
        this.updateUI();
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
        colorOptions.innerHTML = '';
    
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
            const div = document.createElement('div');
            div.className = 'color-option';
            div.innerHTML = `
                <label>${role.firstName}:</label>
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
            div.className = 'name-type-option';
            div.innerHTML = `
                <label>
                    <input type="checkbox" id="${type.toLowerCase()}NameType" ${this[type.toLowerCase() + 'NamesEnabled'] ? 'checked' : ''}>
                    ${type} Names
                </label>
            `;
            nameTypeOptions.appendChild(div);
        });
    
        dialog.style.display = 'block';
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
}

const game = new WeAreWatching();

document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('startBtn').addEventListener('click', () => {
        game.playWeek();
        showGameButtons();
    });
    document.getElementById('continueBtn').addEventListener('click', () => {
        console.log('Playing next week...');
        game.playWeek();
    });
    var finishBtn = document.getElementById('finishBtn');
    finishBtn.addEventListener('click', () => game.finishGame());
    finishBtn.disabled = true;

    document.getElementById('impressionsBtn').addEventListener('click', () => game.showImpressions());
    document.getElementById('showmancesBtn').addEventListener('click', () => game.showShowmances());
    document.getElementById('alliancesBtn').addEventListener('click', () => game.showAlliances());
    document.getElementById('stepBtn').addEventListener('click', () => game.toggleStepByStepMode());
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
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('gameButtons').style.display = 'block';
}

