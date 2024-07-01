class Agent {
    constructor(name) {
        this.name = name;
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
        return `${this.name} - ${this.age}, ${this.profession}`;
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
        this.loadColors();
        this.createPlayers();
        this.doImpressions();
    }

    createPlayers() {
        const usedNames = new Set();
        while (this.agents.length < this.numPlayers) {
            let name;
            do {
                name = this.randomName();
            } while (usedNames.has(name));
            usedNames.add(name);
            this.agents.push(new Agent(name));
        }
    }

    randomName() {
        // You might want to use a more comprehensive name generator
        const names = ["John", "Jane", "Mike", "Emily", "Chris", "Sarah", "David", "Lisa", "Tom", "Amy", "Mark", "Emma"];
        return names[Math.floor(Math.random() * names.length)];
    }

    doImpressions() {
        for (let ag1 of this.agents) {
            for (let ag2 of this.agents) {
                if (ag1 !== ag2) {
                    ag1.impressions[ag2.name] = Math.floor(Math.random() * 11); // 0-10
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
    
        this.printText(`<span style="color: yellow;">${this.OVR.name}</span> is the new Overseer. All hail!`);
        this.updateLabel('ovrLabel', this.OVR.name, 'yellow');
    }

    selectFlagged() {
        const flagged = [];
        const worstImpressions = Object.entries(this.OVR.impressions)
            .sort(([,a],[,b]) => a-b)
            .filter(([name,]) => this.agents.some(ag => ag.name === name))
            .slice(0, 2);

        for (let [name,] of worstImpressions) {
            flagged.push(this.agents.find(ag => ag.name === name));
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

        const flaggedText = flagged.map(n => this.colorAgentName(n.name)).join(', ');
        this.printText(`${this.colorAgentName(this.OVR.name)} has flagged ${flaggedText} for removal.`);
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
            this.printText(`<span style="color: orange;">${this.PODWinner.name}</span> has won the Power of Disruption!`);
            this.updateLabel('PODHolderLabel', this.PODWinner.name, 'orange');
        }
    
        return potentialPlayers;
    }

    PODCeremony(flagged, potentialPlayers) {
        if (this.PODWinner) {
            this.updateLabel('PODHolderLabel', this.PODWinner.name);
    
            if (flagged.includes(this.PODWinner)) {
                // ... (existing code for automatically using POD on self)
            } else {
                // Check if there are only 4 agents remaining and the POD winner is not one of the flagged agents
                if (this.agents.length === 4 && !flagged.includes(this.PODWinner)) {
                    this.printText(`${this.colorText(this.PODWinner.name, 'orange')} cannot use the Power of Disruption as they would be the only eligible replacement nominee.`);
                    this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.name)).join(', '));
                } else {
                    const PODUsed = Math.random() < 0.5;
                    if (PODUsed) {
                        const flaggedSaved = this.randomChoice(flagged);
                        this.printText(`${this.colorText(this.PODWinner.name, 'orange')} has chosen to use the Power of Disruption on ${this.colorText(flaggedSaved.name, 'purple')}.`);
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
                            this.printText(`<span style="color: yellow;">${this.OVR.name}</span> has flagged <span style="color: var(--flagged-color);">${replacementFlagged.name}</span> as the replacement.`);
                            this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.name)).join(', '));
                        }
                    } else {
                        this.printText(`${this.colorText(this.PODWinner.name, 'orange')} has chosen not to use the Power of Disruption.`);
                        this.updateLabel('replacementFlaggedLabel', flagged.map(n => this.colorAgentName(n.name)).join(', '));
                    }
                }
            }
        } else {
            this.updateLabel('PODHolderLabel', 'The Power of Disruption may not be acquired this week.');
            this.updateLabel('replacementFlaggedLabel', 'Flagged agents cannot be replaced this week.');
        }
    }

    purging(flagged) {
        const votes = {};
        for (let agent of this.agents.filter(ag => ag !== this.OVR)) {
            votes[agent.name] = this.randomChoice(flagged).name;
        }
    
        const purgedName = Object.entries(votes)
            .reduce((acc, [voter, votedFor]) => {
                acc[votedFor] = (acc[votedFor] || 0) + 1;
                return acc;
            }, {});
    
        const purged = flagged.find(n => n.name === Object.keys(purgedName).reduce((a, b) => purgedName[a] > purgedName[b] ? a : b));

        this.printText(`<span style="color: red;">${purged.name}</span> has been purged from the We Are Watching house.`);
        this.updateLabel('purgedLabel', purged.name, 'red');
        this.purgedAgents.push(purged);
        this.agents = this.agents.filter(ag => ag !== purged);
    
        // Update targets
        for (let ag of this.agents) {
            if (ag.target === purged.name) {
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
        this.printText(`${finalAgents[0].name} pleads their case...`);
        this.printText(`${finalAgents[1].name} pleads their case...`);
    
        const votes = {};
        for (let guest of this.purgedAgents) {
            votes[guest.name] = this.randomChoice(finalAgents).name;
        }
    
        let votes1 = 0, votes2 = 0;
        for (let [voter, votedFor] of Object.entries(votes)) {
            this.printText(`${voter} votes for ${votedFor} to win!`);
            if (votedFor === finalAgents[0].name) votes1++;
            else votes2++;
        }
    
        const winner = votes1 > votes2 ? finalAgents[0] : (votes2 > votes1 ? finalAgents[1] : this.randomChoice(finalAgents));
        const runnerUp = winner === finalAgents[0] ? finalAgents[1] : finalAgents[0];

        this.winner = winner;
        this.runnerUp = runnerUp;

        this.printText(`${this.colorText(winner.name, 'green')} wins We Are Watching!`);
        this.printText(`${this.colorText(runnerUp.name, '#6495ED')} is the runner-up.`);

        // Update the label column
        document.querySelector('.label-column .info-row:nth-child(1) .label-text').textContent = 'Winner';
        document.querySelector('.label-column .info-row:nth-child(2) .label-text').textContent = 'Runner-Up';
        document.querySelector('.label-column .info-row:nth-child(3) .label-text').textContent = `Votes for ${winner.name}`;
        document.querySelector('.label-column .info-row:nth-child(4) .label-text').textContent = `Votes for ${runnerUp.name}`;
        document.querySelector('.label-column .info-row:nth-child(5) .label-text').textContent = 'Thanks for watching!';

        // Update the value column
        this.updateLabel('ovrLabel', winner.name, 'green');
        this.updateLabel('flaggedLabel', runnerUp.name, '#6495ED');
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
            ag2.target = ag3.name;
            this.printText(`${ag2.name} was swayed!`);
        }

        if (ag1.impressions[ag3.name] >= 5) {
            ag1.impressions[ag3.name] = Math.min(10, ag1.impressions[ag3.name] + 1);
            ag2.impressions[ag3.name] = Math.max(0, Math.min(10, ag2.impressions[ag3.name] + 2));
        } else {
            ag1.impressions[ag3.name] = Math.max(0, ag1.impressions[ag3.name] - 1);
            ag2.impressions[ag3.name] = Math.max(0, ag2.impressions[ag3.name] - 2);
        }

        this.printText(`${this.colorAgentName(ag1.name)} pulls ${this.colorAgentName(ag2.name)} aside to talk about ${this.colorAgentName(ag3.name)}.`);
    }

    event2(ag1, ag2) {
        if (ag1.friendliness < ag2.emotionality) {
            ag1.target = ag2.name;
            ag2.target = ag1.name;
            this.printText(`${ag1.name} and ${ag2.name} were swayed!`);
        }

        if (Math.random() < 0.8) {
            ag1.impressions[ag2.name] = Math.max(0, ag1.impressions[ag2.name] - 3);
            ag2.impressions[ag1.name] = Math.max(0, ag2.impressions[ag1.name] - 3);
        }

        const topics = ["the dishes", "who ate the last slice of pizza", "who flirts too much", "who snores"];
        const topic = this.randomChoice(topics);
        this.printText(`${this.colorAgentName(ag1.name)} gets in a fight with ${this.colorAgentName(ag2.name)} over ${topic}!`);
    }

    event3(ag1, ag2, alliance) {
        if (!alliance.includes(ag2) && !alliance.includes(ag1)) {
            for (let member of alliance) {
                if (member.loyalty > ag1.manipulativeness) {
                    member.target = ag2.name;
                    member.impressions[ag2.name] = Math.max(0, member.impressions[ag2.name] - 2);
                    this.printText(`${member.name} was swayed!`);
                }
            }
        }

        const allianceNames = ["Wolves", "Dragons", "Lions", "Snakes", "Eagles"];
        const allianceName = "The " + this.randomChoice(allianceNames);
        this.printText(`${this.colorAgentName(ag1.name)} makes plans with ${allianceName} to evict ${this.colorAgentName(ag2.name)}.`);
    }

    event4(ag1, ag2) {
        ag1.impressions[ag2.name] = Math.min(10, ag1.impressions[ag2.name] + 3);
        ag2.impressions[ag1.name] = Math.min(10, ag2.impressions[ag1.name] + 3);
        this.printText(`${this.colorAgentName(ag1.name)} has a casual conversation with ${this.colorAgentName(ag2.name)}.`);
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
            nameSpan.textContent = ag.name;
            if ((ag.flagged && !ag.vetoed) || ag.replacementFlagged) {
                nameSpan.classList.add('flagged-text');
            }
    
            agElement.appendChild(nameSpan);
            agElement.addEventListener('dblclick', () => this.editAgentName(ag));
            agentsDiv.appendChild(agElement);
        }
    }

    colorAgentName(name) {
        const agent = this.agents.find(a => a.name === name) || this.purgedAgents.find(a => a.name === name);
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
        const newName = prompt(`Enter new name for ${agent.name}:`, agent.name);
        if (newName && newName !== agent.name) {
            agent.name = newName;
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
    
        // Reset button text and functionality
        const continueBtn = document.getElementById('continueBtn');
        continueBtn.textContent = 'Continue';
        continueBtn.onclick = () => this.playWeek();
    
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
        const newName = prompt(`Enter new name for ${agent.name}:`, agent.name);
        if (newName && newName !== agent.name) {
            agent.name = newName;
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
            this.alliances[allianceName] = members.map(ag => ag.name);
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
                <label>${role.name}:</label>
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
                return '#00AA00';
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
    document.getElementById('stepByStepBtn').addEventListener('click', () => game.toggleStepByStepMode());
    document.getElementById('preferencesBtn').addEventListener('click', () => game.showPreferences());
    document.getElementById('resetBtn').addEventListener('click', () => {
        game.reset();
        game.updateAgentList();
    });
    document.getElementById('customizeColorsBtn').addEventListener('click', () => game.showColorCustomization());
    document.getElementById('saveColorsBtn').addEventListener('click', () => game.saveColors());
    document.getElementById('closeColorDialogBtn').addEventListener('click', () => game.closeColorDialog());
    document.getElementById('resetColorsBtn').addEventListener('click', () => game.resetColorsToDefault());

    // Initial setup
    game.updateAgentList();
    game.introduceAgents();
});

function showGameButtons() {
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('gameButtons').style.display = 'block';
}

