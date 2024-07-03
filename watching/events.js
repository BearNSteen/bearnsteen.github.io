class EventManager {
    constructor(watchingInstance, Alliance) {
        this.watching = watchingInstance;
        this.Alliance = Alliance;
    }

    eventSpawner() {
        const MAX_EVENTS = 5;
        for (let i = 0; i < Math.floor(Math.random() * (MAX_EVENTS + 1)); i++) {
            let potentialHgs = this.watching.agents.filter(ag => !this.watching.purgedAgents.includes(ag));

            if (potentialHgs.length >= 3) {
                let [hg1, hg2, hg3] = this.watching.randomSample(potentialHgs, 3);

                let eventIndex = Math.floor(Math.random() * 21);
                switch (eventIndex) {
                    case 0:
                        this.gossip(hg1, hg2, hg3);
                        break;
                    case 1:
                        this.getInFight(hg1, hg2);
                        break;
                    case 2:
                        if (this.watching.agents.length >= 4 && hg1.alliances.length > 0) {
                            this.allianceTarget(hg1, hg2);
                        }
                        break;
                    case 3:
                        if (this.watching.agents.length >= 4) {
                            this.formAlliance(hg1);
                        }
                        break;
                    case 4:
                        this.showmance(hg1, hg2);
                        break;
                    case 5:
                        if (hg1.alliances.length > 0 && hg2.alliances.length > 0) {
                            this.allianceBetrayal(hg1, hg2, hg3);
                        }
                        break;
                    case 6:
                        if (hg1.alliances.length > 0) {
                            let alliance = this.watching.randomChoice(Object.values(this.watching.alliances));
                            this.allianceMeeting(alliance);
                        }
                        break;
                    case 7:
                        this.saveFromTheBlock(hg1, hg2);
                        break;
                    case 8:
                        this.bondOverInterest(hg1, hg2);
                        break;
                    case 9:
                        this.shareStories(hg1, hg2, hg3);
                        break;
                    default:
                        let event = this.watching.randomChoice([
                            this.casualConversation,
                            this.bondOverHobby,
                            this.discussFavorites,
                            this.reminisce,
                            this.helpWithChores
                        ]);
                        event.call(this, hg1, hg2);
                        break;
                }
            } else if (potentialHgs.length >= 2) {
                let [hg1, hg2] = this.watching.randomSample(potentialHgs, 2);
                this.casualConversation(hg1, hg2);
            }
        }
    }

    gossip(hg1, hg2, hg3) {
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} pulls ${this.watching.colorAgentName(hg2.firstName)} aside to talk about ${this.watching.colorAgentName(hg3.firstName)}.`);
        this.watching.printText(`${hg1.firstName}: You know, ${hg2.firstName}, ${hg3.firstName} is just no good...`);
        if (hg1.manipulativeness >= Math.floor(Math.random() * (hg2.emotionality + 1))) {
            hg2.target = hg3.firstName;
            this.watching.printText(`${hg2.firstName} was swayed!`);
            this.swayedEvent(hg1, hg2);
            this.swayedEvent(hg2, hg1);
            this.unswayedEvent(hg2, hg3);
        } else {
            this.watching.printText(`${hg2.firstName} was not swayed!`);
            this.unswayedEvent(hg1, hg2);
            this.unswayedEvent(hg2, hg1);
        }
    }

    getInFight(hg1, hg2) {
        const topic = this.getFightTopic();
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} gets in a fight with ${this.watching.colorAgentName(hg2.firstName)} over ${topic}!`);

        if (hg1.friendliness > hg2.emotionality || hg2.friendliness > hg1.emotionality) {
            this.watching.printText(`But their friendship is too strong! ${hg1.firstName} and ${hg2.firstName} made up!`);
        } else if (hg1.friendliness === hg2.emotionality && hg2.friendliness === hg1.emotionality) {
            this.watching.printText(`In a rare move, ${hg1.firstName} and ${hg2.firstName} agree to disagree!`);
        } else {
            hg1.target = hg2.firstName;
            hg2.target = hg1.firstName;
            this.unswayedEvent(hg1, hg2, 3);
            this.unswayedEvent(hg2, hg1, 3);
            this.watching.printText(`They're inconsolable! They both walk off in a huff after a screaming fit!`);
        }
    }

    getFightTopic() {
        const topics = [
            "who ate the last {food}",
            "who drank the last {drink}",
            "who left {item} in the {room}",
            "who snores the loudest",
            "who's the messiest",
            "who's hogging the bathroom",
            "who's not pulling their weight in chores",
            "who's the biggest game player",
            "who's the most annoying",
            "who's been talking behind {houseguest}'s back"
        ];
        let topic = this.watching.randomChoice(topics);
        topic = topic.replace("{food}", this.watching.randomChoice(["slice of pizza", "slice of cake", "cookie", "sandwich", "piece of fruit", "bag of chips"]));
        topic = topic.replace("{drink}", this.watching.randomChoice(["bottle of wine", "beer", "soda", "juice", "cup of coffee", "glass of milk"]));
        topic = topic.replace("{item}", this.watching.randomChoice(["towel", "book", "magazine", "remote control", "dirty dish", "piece of clothing"]));
        topic = topic.replace("{room}", this.watching.randomChoice(["kitchen", "living room", "bathroom", "bedroom"]));
        topic = topic.replace("{houseguest}", this.watching.randomChoice(this.watching.agents).firstName);
        return topic;
    }

    allianceTarget(hg1, hg2) {
        const potentialAlliances = hg1.alliances.filter(allianceName => !this.watching.alliances[allianceName].hasMember(hg2));
        if (potentialAlliances.length > 0) {
            const alliance = this.watching.alliances[this.watching.randomChoice(potentialAlliances)];
            this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} makes plans with ${alliance.name} to target ${this.watching.colorAgentName(hg2.firstName)}.`);
            for (let member of alliance.listMembers()) {
                if (this.watching.agents.includes(member)) {
                    if (member.loyalty > hg1.manipulativeness) {
                        member.target = hg2.firstName;
                        this.swayedEvent(member, hg1);
                        this.unswayedEvent(member, hg2);
                        this.watching.printText(`${member.firstName} was convinced.`);
                    }
                }
            }
        }
    }

    casualConversation(hg1, hg2) {
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} has a casual conversation with ${this.watching.colorAgentName(hg2.firstName)}.`);
        this.swayedEvent(hg1, hg2);
    }

    formAlliance(hg1) {
        const allianceSize = Math.floor(Math.random() * (this.watching.agents.length / 2 - 1)) + 2;
        const allianceMembers = this.watching.randomSample(this.watching.agents, allianceSize);
        const allianceName = this.generateAllianceName(allianceMembers);
        const alliance = new this.Alliance(allianceName);
        
        allianceMembers.forEach(member => {
            alliance.addMember(member);
            member.alliances.push(allianceName);
        });
    
        this.watching.alliances[allianceName] = alliance;
        this.watching.printText(`${allianceName} alliance forms between ${allianceMembers.map(member => this.watching.colorAgentName(member.firstName)).join(', ')}.`);
    }

    showmance(hg1, hg2) {
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} and ${this.watching.colorAgentName(hg2.firstName)} have developed a showmance!`);
        this.swayedEvent(hg1, hg2, 3);
        this.swayedEvent(hg2, hg1, 3);
        this.watching.printText(`The two lovebirds are now inseparable!`);
        this.watching.showmances.push([hg1, hg2]);
    }

    allianceBetrayal(hg1, hg2, hg3) {
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} betrays their alliance member ${this.watching.colorAgentName(hg2.firstName)} by telling ${this.watching.colorAgentName(hg3.firstName)} to target them.`);
        if (hg1.manipulativeness >= Math.floor(Math.random() * (hg3.emotionality + 1))) {
            hg3.target = hg2.firstName;
            this.swayedEvent(hg1, hg3);
            this.unswayedEvent(hg1, hg2);
            this.watching.printText(`${hg3.firstName} was convinced to target ${hg2.firstName}.`);
        } else {
            this.unswayedEvent(hg1, hg3);
            this.watching.printText(`${hg3.firstName} was not convinced to target ${hg2.firstName}.`);
        }
    }

    allianceMeeting(alliance) {
        this.watching.printText(`The ${alliance.name} alliance holds a meeting to discuss their strategy.`);
        for (let member of alliance.members) {
            if (this.watching.agents.includes(member)) {
                const otherMember = this.watching.randomChoice(alliance.members.filter(m => m !== member));
                this.swayedEvent(member, otherMember);
            }
        }
    }

    saveFromTheBlock(hg1, hg2) {
        const sharedAlliances = hg1.alliances.filter(alliance => hg2.alliances.includes(alliance));
        if (sharedAlliances.length > 0) {
            const alliance = this.watching.randomChoice(sharedAlliances);
            this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} saves ${this.watching.colorAgentName(hg2.firstName)} from eviction, strengthening their bond within the ${alliance} alliance.`);
            this.swayedEvent(hg1, hg2, 3);
            this.swayedEvent(hg2, hg1, 3);
        }
    }

    bondOverInterest(hg1, hg2) {
        const interests = ["cooking", "music", "sports", "movies", "fashion"];
        const sharedInterest = this.watching.randomChoice(interests);
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} and ${this.watching.colorAgentName(hg2.firstName)} bond over their shared interest in ${sharedInterest}.`);
        this.swayedEvent(hg1, hg2, 2);
        this.swayedEvent(hg2, hg1, 2);
    }

    shareStories(hg1, hg2, hg3) {
        const topics = ["profession", "hometown"];
        const topic = this.watching.randomChoice(topics);
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} shares stories about their ${topic} with ${this.watching.colorAgentName(hg2.firstName)} and ${this.watching.colorAgentName(hg3.firstName)}.`);
        this.swayedEvent(hg1, hg2);
        this.swayedEvent(hg1, hg3);
        this.swayedEvent(hg2, hg1);
        this.swayedEvent(hg3, hg1);
    }

    reminisce(hg1, hg2) {
        const topics = ["childhood", "family"];
        const topic = this.watching.randomChoice(topics);
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} and ${this.watching.colorAgentName(hg2.firstName)} reminisce about their ${topic}.`);
        this.swayedEvent(hg1, hg2);
        this.swayedEvent(hg2, hg1);
    }

    discussFavorites(hg1, hg2) {
        const favorites = ["movies", "TV shows", "books", "music genres"];
        const favorite = this.watching.randomChoice(favorites);
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} and ${this.watching.colorAgentName(hg2.firstName)} discuss their favorite ${favorite}.`);
        this.swayedEvent(hg1, hg2);
        this.swayedEvent(hg2, hg1);
    }

    bondOverHobby(hg1, hg2) {
        const hobbies = ["painting", "reading", "playing chess", "doing yoga", "working out"];
        const hobby = this.watching.randomChoice(hobbies);
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} and ${this.watching.colorAgentName(hg2.firstName)} bond over their shared love for ${hobby}.`);
        this.swayedEvent(hg1, hg2, 2);
        this.swayedEvent(hg2, hg1, 2);
    }

    helpWithChores(hg1, hg2) {
        const chores = ["washing dishes", "doing laundry", "cleaning the bathroom", "cooking dinner"];
        const chore = this.watching.randomChoice(chores);
        this.watching.printText(`${this.watching.colorAgentName(hg1.firstName)} helped ${this.watching.colorAgentName(hg2.firstName)} with ${chore}.`);
        this.swayedEvent(hg1, hg2);
        this.swayedEvent(hg2, hg1);
    }

    swayedEvent(hg, target, strength = null) {
        const toAdd = strength || Math.floor(Math.random() * 2) + 1;
        hg.impressions[target.firstName] = Math.min(10, Math.max(1, hg.impressions[target.firstName] + toAdd));
        if (this.watching.debugMode) {
            this.watching.printText(`${hg.firstName}: +${toAdd} with ${target.firstName}`);
        }
    }

    unswayedEvent(hg, target, strength = null) {
        const toSub = strength || Math.floor(Math.random() * 2) + 1;
        hg.impressions[target.firstName] = Math.min(10, Math.max(1, hg.impressions[target.firstName] - toSub));
        if (this.watching.debugMode) {
            this.watching.printText(`${hg.firstName}: -${toSub} with ${target.firstName}`);
        }
    }

    generateAllianceName(members) {
        if (Math.random() < 0.3) {
            return this.watching.randomChoice(["The Leftovers", "The Outsiders", "The Misfits"]);
        }
        const names = members.map(member => member.firstName[0]);
        return names.join('').toUpperCase();
    }
}