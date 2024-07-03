class Alliance {
    constructor(name) {
        this.name = name;
        this.members = [];
        this.target = null;
    }

    addMember(agent) {
        if (!this.members.includes(agent)) {
            this.members.push(agent);
        }
    }

    setTarget(target) {
        this.target = target;
    }

    removeMember(agent) {
        const index = this.members.indexOf(agent);
        if (index > -1) {
            this.members.splice(index, 1);
        }
    }

    getSize() {
        return this.members.length;
    }

    hasMember(agent) {
        return this.members.includes(agent);
    }

    clearTarget() {
        this.target = null;
    }

    listMembers() {
        return [...this.members];
    }

    isTarget(agent) {
        return this.target === agent;
    }
}

