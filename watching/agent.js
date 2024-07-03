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
        this.alliances = [];

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