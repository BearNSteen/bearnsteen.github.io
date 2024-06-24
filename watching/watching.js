class HouseGuest {
    constructor(name) {
        this.name = name;
        this.age = Math.floor(Math.random() * 20) + 21; // 21-40
        this.profession = this.randomProfession();
        this.HOH = false;
        this.nominee = false;
        this.veto = false;
        this.target = null;
        this.impressions = {};
        this.vetoed = false;

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
        return `${this.name} - ${this.age}, ${this.profession}`;
    }
}

class BigBrother {
    constructor() {
        this.numPlayers = 12;
        this.houseguests = [];
        this.evictedHouseguests = [];
        this.prevHOH = null;
        this.endState = 0;
        this.events = [];
        this.alliances = {};
        this.seasonNum = 1;
        this.prevHOH = null;
        this.showmances = [];
        this.stepIndex = 0;
        this.stepByStepMode = false;
        this.debugMode = false;
        this.printSpeed = 0.8;
        this.createPlayers();
        this.doImpressions();
    }

    createPlayers() {
        for (let i = 0; i < this.numPlayers; i++) {
            this.houseguests.push(new HouseGuest(this.randomName()));
        }
    }

    randomName() {
        // You might want to use a more comprehensive name generator
        const names = ["John", "Jane", "Mike", "Emily", "Chris", "Sarah", "David", "Lisa", "Tom", "Amy", "Mark", "Emma"];
        return names[Math.floor(Math.random() * names.length)];
    }

    doImpressions() {
        for (let hg1 of this.houseguests) {
            for (let hg2 of this.houseguests) {
                if (hg1 !== hg2) {
                    hg1.impressions[hg2.name] = Math.floor(Math.random() * 11); // 0-10
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
            this.week = this.numPlayers - this.houseguests.length + 1;
            this.printText(`Week ${this.week}:`);

            if (this.endState === 1) {
                // Game over logic
                return;
            }

            if (this.houseguests.length > 2) {
                this.selectHOH();
                this.eventSpawner();
                const nominees = this.selectNoms();
                this.eventSpawner();
                const potentialPlayers = this.playVeto(nominees);
                this.eventSpawner();
                this.vetoCeremony(nominees, potentialPlayers);
                this.eventSpawner();
                this.eviction(nominees);
                this.eventSpawner();
            } else {
                this.finale();
            }

            this.updateUI();
        }
    }

    selectHOH() {
        this.printText("The houseguests compete in the HOH competition.");
        
        let potentialHOHs = this.houseguests.filter(hg => hg !== this.prevHOH);
        if (potentialHOHs.length === 0) potentialHOHs = this.houseguests;

        this.HOH = this.randomChoice(potentialHOHs);
        this.HOH.HOH = true;
        this.prevHOH = this.HOH;

        this.printText(`<span style="color: yellow;">${this.HOH.name}</span> is the new Head of Household`);
        this.updateLabel('hohLabel', this.HOH.name, 'yellow');
    }

    selectNoms() {
        const nominees = [];
        const worstImpressions = Object.entries(this.HOH.impressions)
            .sort(([,a],[,b]) => a-b)
            .filter(([name,]) => this.houseguests.some(hg => hg.name === name))
            .slice(0, 2);

        for (let [name,] of worstImpressions) {
            nominees.push(this.houseguests.find(hg => hg.name === name));
        }

        if (nominees.length < 2) {
            let potentialNominees = this.houseguests.filter(hg => hg !== this.HOH && !nominees.includes(hg));
            while (nominees.length < 2 && potentialNominees.length > 0) {
                const nominee = this.randomChoice(potentialNominees);
                nominees.push(nominee);
                potentialNominees = potentialNominees.filter(hg => hg !== nominee);
            }
        }

        nominees.forEach(nominee => nominee.nominee = true);

        const nomineesText = nominees.map(n => n.name).join(' and ');
        this.printText(`<span style="color: yellow;">${this.HOH.name}</span> has nominated <span style="color: purple;">${nomineesText}</span> for eviction.`);
        this.updateLabel('nomineesLabel', nomineesText, 'purple');

        return nominees;
    }

    playVeto(nominees) {
        this.printText("The houseguests compete in the Veto competition.");
        
        const NUM_VETO_PLAYERS = 6;
        let potentialPlayers = this.houseguests.filter(hg => !nominees.includes(hg) && hg !== this.HOH);
        
        if (this.houseguests.length > 3) {
            let vetoPlayers = this.randomSample(potentialPlayers, Math.min(potentialPlayers.length, NUM_VETO_PLAYERS - 3));
            vetoPlayers = vetoPlayers.concat(nominees, [this.HOH]);
            this.vetoWinner = this.randomChoice(vetoPlayers);
            this.printText(`${this.vetoWinner.name} has won the Power of Veto!`);
        } else {
            this.vetoWinner = null;
        }

        if (this.vetoWinner) {
            this.printText(`<span style="color: orange;">${this.vetoWinner.name}</span> has won the Power of Veto!`);
            this.updateLabel('vetoHolderLabel', this.vetoWinner.name, 'orange');
        }

        return potentialPlayers;
    }

    vetoCeremony(nominees, potentialPlayers) {
        if (this.vetoWinner) {
            this.updateLabel('vetoHolderLabel', this.vetoWinner.name);
            
            if (nominees.includes(this.vetoWinner)) {
                this.printText(`${this.colorText(this.vetoWinner.name, 'orange')} has automatically used the Veto on themselves.`);
                const nomineeSaved = this.vetoWinner;
                nomineeSaved.vetoed = true;
                nominees = nominees.filter(n => n !== nomineeSaved);
            } else {
                const vetoUsed = Math.random() < 0.5;
                if (vetoUsed) {
                    const nomineeSaved = this.randomChoice(nominees);
                    this.printText(`${this.colorText(this.vetoWinner.name, 'orange')} has chosen to use the Power of Veto on ${this.colorText(nomineeSaved.name, 'purple')}.`);
                    nominees = nominees.filter(n => n !== nomineeSaved);
                    nomineeSaved.vetoed = true;

                    let replacementNom;
                    if (this.vetoWinner.target && this.houseguests.includes(this.vetoWinner.target) && !this.vetoWinner.target.vetoed) {
                        replacementNom = this.vetoWinner.target;
                    } else {
                        replacementNom = this.randomChoice(potentialPlayers.filter(p => p !== nomineeSaved));
                    }
                    if (replacementNom) {
                        nominees.push(replacementNom);
                        this.printText(`<span style="color: yellow;">${this.HOH.name}</span> has nominated <span style="color: blue;">${replacementNom.name}</span> as the replacement nominee.`);
                        this.updateLabel('replacementNomineesLabel', replacementNom.name, 'blue');
                    }
                } else {
                    this.printText(`${this.colorText(this.vetoWinner.name, 'orange')} has chosen not to use the Power of Veto.`);
                }
            }
            
            this.updateLabel('replacementNomineesLabel', nominees.map(n => n.name).join(', '));
        } else {
            this.updateLabel('vetoHolderLabel', 'The Veto is not played this week.');
            this.updateLabel('replacementNomineesLabel', 'Nominees cannot be replaced this week.');
        }
    }

    eviction(nominees) {
        const votes = {};
        for (let houseguest of this.houseguests.filter(hg => hg !== this.HOH)) {
            votes[houseguest.name] = this.randomChoice(nominees).name;
        }
        
        const evictedName = Object.entries(votes)
            .reduce((acc, [voter, votedFor]) => {
                acc[votedFor] = (acc[votedFor] || 0) + 1;
                return acc;
            }, {});
        
        const evicted = nominees.find(n => n.name === Object.keys(evictedName).reduce((a, b) => evictedName[a] > evictedName[b] ? a : b));
    
        this.printText(`<span style="color: red;">${evicted.name}</span> has been evicted from the Big Brother house.`);
        this.updateLabel('evictedLabel', evicted.name, 'red');
        this.evictedHouseguests.push(evicted);
        this.houseguests = this.houseguests.filter(hg => hg !== evicted);

        // Update targets
        for (let hg of this.houseguests) {
            if (hg.target === evicted.name) {
                hg.target = null;
            }
        }

        // Reset "vetoed" status
        for (let hg of this.houseguests) {
            hg.vetoed = false;
        }

        this.updateHouseguestList();
    }

    finale() {
        this.printText(`Final 2: ${this.houseguests[0].name} and ${this.houseguests[1].name}`);
        this.printText(`${this.houseguests[0].name} pleads their case...`);
        this.printText(`${this.houseguests[1].name} pleads their case...`);

        const votes = {};
        for (let guest of this.evictedHouseguests) {
            votes[guest.name] = this.randomChoice(this.houseguests).name;
        }

        let votes1 = 0, votes2 = 0;
        for (let [voter, votedFor] of Object.entries(votes)) {
            this.printText(`${voter} votes for ${votedFor} to win Big Brother!`);
            if (votedFor === this.houseguests[0].name) votes1++;
            else votes2++;
        }

        const winner = votes1 > votes2 ? this.houseguests[0] : (votes2 > votes1 ? this.houseguests[1] : this.randomChoice(this.houseguests));

        this.printText(`${winner.name} wins Big Brother!`);
        this.updateLabel('hohLabel', `${winner.name} wins!`);
        this.updateLabel('nomineesLabel', `Votes for ${winner.name}: ${Math.max(votes1, votes2)}`);
        this.updateLabel('vetoHolderLabel', `Votes for ${winner.name === this.houseguests[0].name ? this.houseguests[1].name : this.houseguests[0].name}: ${Math.min(votes1, votes2)}`);
        this.updateLabel('replacementNomineesLabel', '');
        this.updateLabel('evictedLabel', 'Thanks for watching!');

        document.getElementById('continueBtn').textContent = 'Finish';
        this.endState = 1;
    }

    eventSpawner() {
        const MAX_EVENTS = 1;
        for (let i = 0; i < Math.floor(Math.random() * (MAX_EVENTS + 1)); i++) {
            const eventIndex = Math.floor(Math.random() * 4);
            switch(eventIndex) {
                case 0:
                    if (this.houseguests.length >= 3) {
                        const [hg1, hg2, hg3] = this.randomSample(this.houseguests, 3);
                        this.event1(hg1, hg2, hg3);
                    }
                    break;
                case 1:
                    const [hg1, hg2] = this.randomSample(this.houseguests, 2);
                    this.event2(hg1, hg2);
                    break;
                case 2:
                    if (this.houseguests.length >= 2) {
                        const [hg1, hg2] = this.randomSample(this.houseguests, 2);
                        const alliance = this.randomSample(this.houseguests, Math.floor(Math.random() * 3) + 2);
                        this.event3(hg1, hg2, alliance);
                    }
                    break;
                case 3:
                    const [hg3, hg4] = this.randomSample(this.houseguests, 2);
                    this.event4(hg3, hg4);
                    break;
            }
        }
    }

    event1(hg1, hg2, hg3) {
        if (hg1.manipulativeness >= Math.floor(Math.random() * (hg2.emotionality + 1))) {
            hg2.target = hg3.name;
            this.printText(`${hg2.name} was swayed!`);
        }

        if (hg1.impressions[hg3.name] >= 5) {
            hg1.impressions[hg3.name] = Math.min(10, hg1.impressions[hg3.name] + 1);
            hg2.impressions[hg3.name] = Math.max(0, Math.min(10, hg2.impressions[hg3.name] + 2));
        } else {
            hg1.impressions[hg3.name] = Math.max(0, hg1.impressions[hg3.name] - 1);
            hg2.impressions[hg3.name] = Math.max(0, hg2.impressions[hg3.name] - 2);
        }

        this.printText(`${hg1.name} pulls ${hg2.name} aside to talk about ${hg3.name}.`);
    }

    event2(hg1, hg2) {
        if (hg1.friendliness < hg2.emotionality) {
            hg1.target = hg2.name;
            hg2.target = hg1.name;
            this.printText(`${hg1.name} and ${hg2.name} were swayed!`);
        }

        if (Math.random() < 0.8) {
            hg1.impressions[hg2.name] = Math.max(0, hg1.impressions[hg2.name] - 3);
            hg2.impressions[hg1.name] = Math.max(0, hg2.impressions[hg1.name] - 3);
        }

        const topics = ["the dishes", "who ate the last slice of pizza", "who flirts too much", "who snores"];
        const topic = this.randomChoice(topics);
        this.printText(`${hg1.name} gets in a fight with ${hg2.name} over ${topic}!`);
    }

    event3(hg1, hg2, alliance) {
        if (!alliance.includes(hg2) && !alliance.includes(hg1)) {
            for (let member of alliance) {
                if (member.loyalty > hg1.manipulativeness) {
                    member.target = hg2.name;
                    member.impressions[hg2.name] = Math.max(0, member.impressions[hg2.name] - 2);
                    this.printText(`${member.name} was swayed!`);
                }
            }
        }

        const allianceNames = ["Wolves", "Dragons", "Lions", "Snakes", "Eagles"];
        const allianceName = "The " + this.randomChoice(allianceNames);
        this.printText(`${hg1.name} makes plans with ${allianceName} to evict ${hg2.name}.`);
    }

    event4(hg1, hg2) {
        hg1.impressions[hg2.name] = Math.min(10, hg1.impressions[hg2.name] + 3);
        hg2.impressions[hg1.name] = Math.min(10, hg2.impressions[hg1.name] + 3);
        this.printText(`${hg1.name} has a casual conversation with ${hg2.name}.`);
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
                element.textContent = text;
                if (color) {
                    element.style.color = color;
                }
                element.parentElement.style.display = 'block';
                document.getElementById('gameInfo').style.display = 'block';
            } else {
                element.parentElement.style.display = 'none';
            }
        }
    }

    updateUI() {
        this.updateHouseguestList();
    }

    updateHouseguestList() {
        const houseguestsDiv = document.getElementById('houseguests');
        houseguestsDiv.innerHTML = '';
        for (let hg of this.houseguests) {
            const hgElement = document.createElement('div');
            hgElement.className = 'houseguest';
            hgElement.textContent = hg.name;
            hgElement.addEventListener('dblclick', () => this.editHouseguestName(hg));
            houseguestsDiv.appendChild(hgElement);
        }
    }

    editHouseguestName(houseguest) {
        const newName = prompt(`Enter new name for ${houseguest.name}:`, houseguest.name);
        if (newName && newName !== houseguest.name) {
            houseguest.name = newName;
            this.updateHouseguestList();
        }
    }

    showImpressions() {
        // Implement impression matrix display
        console.log("Impression matrix display not implemented yet");
    }

    reset() {
        this.houseguests = [];
        this.evictedHouseguests = [];
        this.prevHOH = null;
        this.endState = 0;
        this.showmances = [];
        this.alliances = {};
        this.seasonNum++;

        this.createPlayers();
        this.doImpressions();

        this.clearTextBox();
        this.updateUI();
        this.updateLabel('hohLabel', '');
        this.updateLabel('nomineesLabel', '');
        this.updateLabel('vetoHolderLabel', '');
        this.updateLabel('replacementNomineesLabel', '');
        this.updateLabel('evictedLabel', '');

        document.getElementById('continueBtn').textContent = 'Continue';
    }

    updateHouseguestList() {
        const houseguestsDiv = document.getElementById('houseguests');
        houseguestsDiv.innerHTML = '';
        for (let hg of game.houseguests) {
            const hgElement = document.createElement('div');
            hgElement.className = 'houseguest';
            hgElement.textContent = hg.name;
            hgElement.addEventListener('dblclick', () => editHouseguestName(hg));
            houseguestsDiv.appendChild(hgElement);
        }
    }
    
    introduceHouseguests() {
        const textBox = document.getElementById('textBox');
        textBox.innerHTML = `Meet the ${game.houseguests.length} houseguests:<br>`;
        for (let hg of game.houseguests) {
            textBox.innerHTML += hg.summary() + '<br>';
        }
    }
    
    editHouseguestName(houseguest) {
        const newName = prompt(`Enter new name for ${houseguest.name}:`, houseguest.name);
        if (newName && newName !== houseguest.name) {
            houseguest.name = newName;
            updateHouseguestList();
        }
    }

    preSeasonIntroduction() {
        this.printText("Welcome to the Big Brother house! The houseguests are about to meet each other for the first time.");
    
        // Simulate 20-30 interactions
        for (let i = 0; i < 20; i++) {
            this.events.eventSpawner(true); // Assuming you've implemented an Events class
        }
    
        this.printText("The first week is about to begin!");
    
        
    }

    nextStep() {
        switch (this.stepIndex) {
            case 0:
                this.selectHOH();
                break;
            case 1:
                this.selectNoms();
                break;
            case 2:
                this.playVeto();
                break;
            case 3:
                this.vetoCeremony();
                break;
            case 4:
                this.eviction();
                this.stepIndex = -1; // Reset for next week
                break;
        }
        this.stepIndex++;
        this.updateUI();
    }

    finale() {
        this.printText(`Final 2: ${this.houseguests[0].name} and ${this.houseguests[1].name}`);
        this.printText(`${this.houseguests[0].name} pleads their case...`);
        this.printText(`${this.houseguests[1].name} pleads their case...`);
    
        const votes = {};
        for (let guest of this.evictedHouseguests) {
            votes[guest.name] = this.randomChoice(this.houseguests).name;
        }
    
        let votes1 = 0, votes2 = 0;
        for (let [voter, votedFor] of Object.entries(votes)) {
            this.printText(`${voter} votes for ${votedFor} to win Big Brother!`);
            if (votedFor === this.houseguests[0].name) votes1++;
            else votes2++;
        }
    
        const winner = votes1 > votes2 ? this.houseguests[0] : (votes2 > votes1 ? this.houseguests[1] : this.randomChoice(this.houseguests));
    
        this.printText(`${winner.name} wins Big Brother!`);
        this.updateLabel('hohLabel', `${winner.name} wins!`);
        this.updateLabel('nomineesLabel', `Votes for ${winner.name}: ${Math.max(votes1, votes2)}`);
        this.updateLabel('vetoHolderLabel', `Votes for ${winner.name === this.houseguests[0].name ? this.houseguests[1].name : this.houseguests[0].name}: ${Math.min(votes1, votes2)}`);
        this.updateLabel('replacementNomineesLabel', '');
        this.updateLabel('evictedLabel', 'Thanks for watching!');
    
        document.getElementById('continueBtn').textContent = 'Finish';
        this.endState = 1;
    }

    createAlliance() {
        if (this.houseguests.length > 5) {
            const members = this.randomSample(this.houseguests, Math.floor(Math.random() * 3) + 2);
            const allianceName = "The " + this.randomChoice(["Wolves", "Dragons", "Lions", "Snakes", "Eagles"]);
            this.alliances[allianceName] = members.map(hg => hg.name);
            this.printText(`${allianceName} alliance forms between ${members.map(m => m.name).join(', ')}.`);
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
        return `<span style="color: ${color};">${text}</span>`;
    }
}

const game = new BigBrother();

document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.getElementById('startBtn').addEventListener('click', () => {
        game.playWeek();
        showGameButtons();
    });
    document.getElementById('continueBtn').addEventListener('click', () => game.playWeek());
    document.getElementById('impressionsBtn').addEventListener('click', () => game.showImpressions());
    document.getElementById('showmancesBtn').addEventListener('click', () => game.showShowmances());
    document.getElementById('alliancesBtn').addEventListener('click', () => game.showAlliances());
    document.getElementById('stepByStepBtn').addEventListener('click', () => game.toggleStepByStepMode());
    document.getElementById('preferencesBtn').addEventListener('click', () => game.showPreferences());
    document.getElementById('resetBtn').addEventListener('click', () => game.reset());

    // Initial setup
    game.updateHouseguestList();
    game.introduceHouseguests();
});

function showGameButtons() {
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('gameButtons').style.display = 'block';
}