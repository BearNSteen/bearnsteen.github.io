const quests = {
    mysticalRelic: {
        title: "The Mystical Relic",
        info: `<h3 class="quest-header">🧙‍♂️ Acquired from: <span class="npc">Elder Sage</span> in <span class="location">Mystical Village</span></h3>
            <p class="quest-description">The Elder Sage tasks you with finding a mystical relic hidden in the <span class="location">Forbidden Forest</span>. Legend speaks of its immense power, capable of altering the very fabric of reality!</p>
            <div class="quest-importance">⚠️ <strong>Importance:</strong> This relic could change the course of history. The fate of the realm rests in your hands!</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Look for clues near the ancient oak tree at the forest entrance. Its gnarled branches seem to whisper secrets of old...</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> The relic emits a faint, ethereal blue glow in darkness. Watch for shimmering air and listen for soft, melodic humming.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Beware of the guardian spirits protecting the relic. They appear as wisps of light but can unleash tremendous power!</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Journey to the enigmatic <span class="location">Forbidden Forest</span></li>
                        <li>Examine the ancient oak tree, feeling its rough bark for hidden symbols</li>
                        <li>Follow the mesmerizing blue wisps deeper into the woods</li>
                        <li>Engage in an epic battle with the ethereal guardian spirits</li>
                        <li>Descend into the hidden cave, where reality itself seems to warp</li>
                        <li>Claim the relic, feeling its power course through your veins!</li>
                    </ol>`
    },
    dragonHoard: {
        title: "Dragon's Hoard",
        info: `<h3 class="quest-header">🏔️ Acquired from: <span class="npc">Village Chief</span> in <span class="location">Mountain Town</span></h3>
               <p class="quest-description">The Village Chief implores you to recover priceless treasures stolen by a fearsome dragon. The beast's lair lies hidden in the treacherous <span class="location">Misty Mountains</span>.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> These treasures are the lifeblood of the town. Without them, the people face certain doom!</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> The dragon's lair is concealed behind a thundering waterfall in the heart of the <span class="location">Misty Mountains</span>.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> The dragon's scales are impervious to fire, but they shatter like glass when struck with ice-based magic!</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Behind the roaring waterfall lies a hidden passage. Look for the glint of gold amidst the mist to find the entrance.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Embark on a perilous journey to the <span class="location">Misty Mountains</span></li>
                        <li>Locate the majestic waterfall concealing the dragon's lair</li>
                        <li>Brave the icy waters to find the secret passage</li>
                        <li>Confront the dragon in an epic battle, using powerful ice magic</li>
                        <li>Claim the glittering hoard of treasures from the vanquished beast</li>
                        <li>Return triumphantly to the village, hailed as a true hero!</li>
                      </ol>`
    },
    cursedVillage: {
        title: "The Cursed Village",
        info: `<h3 class="quest-header">🌙 Acquired from: <span class="npc">Mysterious Traveler</span> at the <span class="location">Crossroads</span></h3>
               <p class="quest-description">A enigmatic traveler speaks of a village trapped in an eternal nightmare. A malevolent curse has befallen the land, and only you can break its wicked hold!</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> An entire village's fate hangs in the balance. Will you be their savior or leave them to their doom?</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> The source of the curse lies within an ancient totem, standing ominously in the village center. Its eyes seem to follow your every move...</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Seek out the village elder, whose weathered face holds the key to the village's dark past. Listen carefully to their tales of woe.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> The curse can only be lifted by performing an arcane ritual at the stroke of midnight. Gather the necessary components under the light of the blood moon!</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Enter the forsaken village, where shadows whisper and mist clings to your feet</li>
                        <li>Seek audience with the village elder, gleaning crucial information about the curse's origin</li>
                        <li>Investigate the sinister totem in the village center, deciphering its cryptic markings</li>
                        <li>Scour the haunted landscape for the ritual components:
                            <ul>
                                <li>A vial of moonlight tears</li>
                                <li>The essence of a nightmare</li>
                                <li>A token of true love's sacrifice</li>
                            </ul>
                        </li>
                        <li>As the clock strikes midnight, perform the intricate ritual to shatter the curse</li>
                        <li>Watch in awe as the village awakens from its nightmare, freed at last!</li>
                      </ol>`
    },
    borderDispute: {
        title: "The Border Dispute",
        info: `<h3 class="quest-header">⚔️ Acquired from: <span class="npc">Bear</span> in <span class="location">Bear Knights' Fortress</span></h3>
               <p class="quest-description">A tense situation has arisen at the border between two neighboring kingdoms. Bear tasks you with investigating the dispute and finding a peaceful resolution.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> Failure to resolve this dispute could lead to war between the kingdoms!</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Speak with locals on both sides of the border to understand the root of the conflict.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Look for evidence of any third party that might be instigating the conflict for their own gain.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Consider proposing a compromise that benefits both kingdoms, such as a shared resource management plan.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Travel to the disputed border region</li>
                        <li>Interview citizens and officials from both kingdoms</li>
                        <li>Investigate any suspicious activities or third-party involvement</li>
                        <li>Gather evidence and compile a comprehensive report</li>
                        <li>Present your findings to the leaders of both kingdoms</li>
                        <li>Mediate a discussion to reach a mutually beneficial agreement</li>
                        <li>Report back to Bear with the resolution</li>
                      </ol>`
    },
    bearKnightsRite: {
        title: "Rite of the Bear Knights",
        info: `<h3 class="quest-header">🐻 Acquired from: <span class="npc">Bear</span> in <span class="location">Sacred Grove</span></h3>
               <p class="quest-description">Bear invites you to witness and participate in the sacred Rite of the Bear Knights, an ancient ceremony that tests strength, wisdom, and honor.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> This is a rare opportunity to learn about Bear Knight traditions and potentially earn their respect.</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> The rite involves both physical challenges and tests of character. Prepare for both.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Pay close attention to the symbolism in the rite. Understanding it may help you overcome the challenges.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> The final test often involves making a difficult moral choice. Stay true to the Bear Knights' code of honor.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Meet Bear at the Sacred Grove at midnight</li>
                        <li>Observe the initial rituals and take note of the symbolism</li>
                        <li>Complete the Trial of Strength (combat or endurance challenge)</li>
                        <li>Solve the Riddle of Wisdom presented by the elder Bear Knight</li>
                        <li>Face the Test of Honor, making a difficult moral decision</li>
                        <li>Reflect on your experiences with Bear and the other knights</li>
                        <li>Receive recognition or guidance based on your performance</li>
                      </ol>`
    },
    lostArtifact: {
        title: "The Lost Artifact",
        info: `<h3 class="quest-header">🏺 Acquired from: <span class="npc">Bear</span> in <span class="location">Ancient Ruins</span></h3>
               <p class="quest-description">Bear enlists your help to recover a lost artifact of great importance to the Bear Knights. The artifact is believed to be hidden in treacherous ancient ruins.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> The artifact could grant significant power to the Bear Knights, helping them better protect the realm.</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> The ruins are filled with traps. Look for bear symbols to guide your way safely.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> The artifact responds to the touch of those with noble intentions. Your character's alignment may affect the outcome.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Be prepared for a guardian entity protecting the artifact. It may test your worth rather than attacking outright.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Meet Bear at the entrance of the Ancient Ruins</li>
                        <li>Navigate through the trapped corridors, using bear symbols as guides</li>
                        <li>Solve the puzzle chamber to reveal the artifact's chamber</li>
                        <li>Confront or appease the guardian entity</li>
                        <li>Retrieve the artifact, if deemed worthy</li>
                        <li>Escape the collapsing ruins</li>
                        <li>Return the artifact to Bear, discussing its significance</li>
                      </ol>`
    },
    forestLament: {
        title: "Forest's Lament",
        info: `<h3 class="quest-header">🌳 Acquired from: <span class="npc">Bear</span> in <span class="location">Whispering Woods</span></h3>
               <p class="quest-description">The ancient forest is crying out in pain, and Bear asks for your assistance in uncovering the source of its distress and healing the woodland.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> The health of the forest is crucial for maintaining the balance of nature in the realm.</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Listen closely to the whispers of the trees. They may guide you to the source of the problem.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Look for signs of unnatural decay or corruption. These may be symptoms of a deeper issue.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> The solution may require a combination of physical action and spiritual healing. Be prepared for both.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Meet Bear at the heart of the Whispering Woods</li>
                        <li>Perform a ritual to attune yourself to the forest's voice</li>
                        <li>Follow the whispers to areas of distress</li>
                        <li>Investigate signs of decay and track them to their source</li>
                        <li>Confront the entity or remove the object causing the distress</li>
                        <li>Perform a healing ritual with Bear to restore the forest's vitality</li>
                        <li>Establish wards to protect the forest from future harm</li>
                      </ol>`
    },
    knightsHonor: {
        title: "A Knight's Honor",
        info: `<h3 class="quest-header">🛡️ Acquired from: <span class="npc">Bear</span> in <span class="location">Bear Knights' Hall</span></h3>
               <p class="quest-description">Bear challenges you to uphold the Bear Knights' code of honor by completing a series of tasks that test your integrity, bravery, and compassion.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> Successfully completing this quest will greatly improve your standing with Bear and the Bear Knights.</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> The true tests often lie in the choices you make, not just the actions you perform.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Remember that a knight's duty is to protect the weak and uphold justice, even when it's difficult.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Sometimes, showing mercy or finding a peaceful solution is more honorable than resorting to violence.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Receive the list of honorable deeds from Bear</li>
                        <li>Help a village in need without expecting reward</li>
                        <li>Mediate a dispute fairly, even if one party is more powerful</li>
                        <li>Face a fearsome beast, choosing whether to slay or befriend it</li>
                        <li>Resist temptation when offered a dishonorable shortcut</li>
                        <li>Return to Bear and recount your experiences</li>
                        <li>Reflect on the nature of honor with Bear</li>
                      </ol>`
    },
    trialsOfTrust: {
        title: "Trials of Trust",
        info: `<h3 class="quest-header">🤝 Acquired from: <span class="npc">Bear</span> in <span class="location">Misty Valley</span></h3>
               <p class="quest-description">To deepen your bond with Bear, you must complete a series of trials that test your trustworthiness and dedication to the principles of the Bear Knights.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> This quest is crucial for advancing your relationship with Bear and gaining deeper insights into the Bear Knights.</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Trust goes both ways. Be prepared to not only prove your trustworthiness but also to trust Bear and the other knights.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> The trials may put you in situations where the right choice isn't immediately clear. Trust your instincts and the teachings of the Bear Knights.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Remember that admitting mistakes and showing vulnerability can sometimes be a sign of great strength and trustworthiness.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Meet Bear in the Misty Valley to begin the trials</li>
                        <li>Complete the Blind Walk, trusting Bear's guidance through a dangerous path</li>
                        <li>Participate in the Truth Circle, sharing and keeping confidences</li>
                        <li>Face the Mirror of True Self, confronting your own flaws and strengths</li>
                        <li>Undergo the Test of Loyalty, choosing between personal gain and the greater good</li>
                        <li>Complete the final challenge: The Leap of Faith</li>
                        <li>Discuss the outcomes and lessons with Bear, strengthening your bond</li>
                      </ol>`
    },
    bearsBurden: {
        title: "The Bear's Burden",
        info: `<h3 class="quest-header">🏔️ Acquired from: <span class="npc">Bear</span> in <span class="location">Mountain Sanctuary</span></h3>
               <p class="quest-description">Bear reveals a personal struggle and asks for your help in overcoming a burden from his past. This quest will test your empathy, wisdom, and ability to support a friend in need.</p>
               <div class="quest-importance">⚠️ <strong>Importance:</strong> Helping Bear with this personal quest will significantly deepen your friendship and may reveal hidden aspects of his character.</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Listen carefully to Bear's story. The key to helping him may lie in the details of his past.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Sometimes, the best way to help someone is not to solve their problem, but to support them as they find their own solution.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Bear's burden may be tied to a specific location or object. Be prepared for a journey of both physical and emotional significance.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Meet Bear at the secluded Mountain Sanctuary</li>
                        <li>Listen to Bear's story and the nature of his burden</li>
                        <li>Travel with Bear to a location from his past</li>
                        <li>Help Bear confront painful memories or unresolved conflicts</li>
                        <li>Gather items or perform rituals to symbolically release the burden</li>
                        <li>Support Bear through the emotional process of letting go</li>
                        <li>Return to the Mountain Sanctuary to reflect on the experience and your strengthened bond</li>
                      </ol>`
    },
    oilMeTonight: {
        title: "Oil Me Tonight",
        info: `<h3 class="quest-header">🦍 Acquired from: <span class="npc">Hippo</span> in <span class="location">Habbitt</span></h3>
            <p class="quest-description">Hippo, Gorilla's wife, has asked you and Bear to rescue Gorilla from his cave full of robotic inventions. It seems Gorilla has gotten himself into a sticky situation!</p>
            <div class="quest-importance">⚠️ <strong>Importance:</strong> This is a critical mission to save Gorilla and potentially prevent his inventions from causing havoc in Habbitt!</div>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Gorilla's inventions often have a weakness to water. Bringing some might be useful.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Look for an emergency shut-off switch in the cave. Gorilla always includes one in his workshops.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> The robots might be friendly if approached correctly. Try mimicking Gorilla's gestures and sounds.</p>`,
        walkthrough: `<ol class="walkthrough">
                        <li>Meet Bear in Habbitt and gather information from Hippo about Gorilla's last known location</li>
                        <li>Travel to Gorilla's secret cave laboratory</li>
                        <li>Navigate through the maze of robotic inventions, using water if necessary to disable malfunctioning ones</li>
                        <li>Find and activate the emergency shut-off switch to power down aggressive robots</li>
                        <li>Locate Gorilla, who might be trapped or tangled in his own inventions</li>
                        <li>Work with Bear to free Gorilla and safely escort him out of the cave</li>
                        <li>Return to Habbitt and reunite Gorilla with Hippo</li>
                        <li>Receive a unique robotic gadget as a thank-you gift from Gorilla</li>
                    </ol>`
    },
    rainbow: {
        title: "Rainbow",
        info: `<h3 class="quest-header">🌈 Acquired from: <span class="npc">Bear</span> in <span class="location">Habbitt Library</span></h3>
            <p class="quest-description">Your Rainbow eraser requires the collection of seven different magical pigments to unlock its full potential and advance your color manipulation skills.</p>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Each pigment is connected to a different emotion. Your mood might affect your ability to find them.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> The Whispering Woods change their dominant color every few hours. That might be a good place to start.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Some pigments are only visible under specific light. Try moonlight, sunset, and dawn.</p>`,
        walkthrough: `<ol class="walkthrough">
                    <li>Collect red pigment from the Lava Lakes</li>
                    <li>Gather orange pigment at sunset in the Autumn Vale</li>
                    <li>Find yellow pigment in the Grand Desert</li>
                    <li>Extract green pigment from the Whispering Woods</li>
                    <li>Locate blue pigment beneath the High Waterfall</li>
                    <li>Retrieve indigo pigment from a sacred cave, visible only by moonlight</li>
                    <li>The final violet pigment appears at dawn in the Mistflower Meadows</li>
                    </ol>`
    },

    penguin: {
        title: "Penguin",
        info: `<h3 class="quest-header">🐧 Acquired from: <span class="npc">Bear</span> in <span class="location">Frozen Harbor</span></h3>
            <p class="quest-description">Your Penguin eraser wants you to restore safe-passage-flow-routes for its kin. You'll need to map out and clear three crucial swimming-ways.</p>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Look for abnormal ice formations. They're likely blocking key routes.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Your heat-based abilities might come in handy. Particularly, Flame-Step.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> Not all blockages are natural. Someone or something might be creating them.</p>`, 
        walkthrough: `<ol class="walkthrough">
                    <li>Map the original swim-routes from ancient penguin-carvings</li>
                    <li>Clear the Southern ice-block using Flame-Step</li>
                    <li>Navigate the Northern flow-route, identifying what's causing the blockage</li>
                    <li>Confront the seal-construction-crew, convincing them to relocate</li>
                    <li>Use Spark-Thrust to dislodge remaining dense-ice-chunks</li>
                    <li>Verify all routes are flowing, by actually swimming them (brrr!)</li>
                    </ol>`
    },

    hamburger: {
        title: "Hamburger",
        info: `<h3 class="quest-header">🍔 Acquired from: <span class="npc">Bear</span> in <span class="location">Habbitt Town Square</span></h3>
            <p class="quest-description">Your Hamburger eraser requires you to explore the entire 'foodchain' behind a hamburger's construction. You'll need to understand how each layer comes to be.</p>`,
        hint1: `<p class="hint"><span class="hint-icon">💡</span> Don't just look for the ingredients, but their sources. The cow, the wheat field, the tomato vines.</p>`,
        hint2: `<p class="hint"><span class="hint-icon">💡</span> Each 'layer' has a unique challenge. The cow-pasture-keeper is particularly grumpy.</p>`,
        hint3: `<p class="hint"><span class="hint-icon">💡</span> The wheat-field contains a maze. Your map-making skills might be useful.</p>`,
        walkthrough: `<ol class="walkthrough">
                    <li>Learn bread-baking from the Habbitt Baker, including a wheat-maze-navigation. You'll need to complete his maze-challenge.</li>
                    <li>Find bun-ingredients: eggs from the coop, milk from the dairy</li>
                    <li>Visit Farmer Mildred's tomato-patch, but watch out for her antique scarecrow-security-system</li>
                    <li>Locate the cow-pasture. You'll need to convince the keeper you're not 'just another city-faced-food-tourist'</li>
                    <li>Retrieve a mythical-pickle, which legend-says-grows-only in the belly of a giant-toad</li>
                    <li>Combine all-your-knowledge-and-items. Behold! A Hamburger-produced-through-but-not-limited-to-your-new-vast-calories-based-enlightenment!</li>
                    </ol>`
    }
};

function setTabsEnabled(enabled) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (enabled) {
            tab.classList.remove('disabled');
            tab.onclick = function() { showTab(this.innerText.toLowerCase()); };
        } else {
            tab.classList.add('disabled');
            tab.onclick = null;
        }
    });
}

function showQuest(questId) {
    if (event) {  // Check if event exists
        event.stopPropagation();  // Stop event propagation
    }
    const quest = quests[questId];
    document.getElementById('questTitle').textContent = quest.title;
    
    const questContent = document.getElementById('questContent');
    questContent.innerHTML = `
        <div class="tab-content active" id="info">${quest.info}</div>
        <div class="tab-content" id="hint1">${quest.hint1}</div>
        <div class="tab-content" id="hint2">${quest.hint2}</div>
        <div class="tab-content" id="hint3">${quest.hint3}</div>
        <div class="tab-content" id="walkthrough">${quest.walkthrough}</div>
    `;

    setTabsEnabled(true);
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.onclick = function() {
            const tabId = this.getAttribute('data-tab');
            showTab(tabId);
        };
    });
    
    showTab('info');
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    const activeTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    const activeContent = document.getElementById(tabId);

    if (activeTab && activeContent) {
        activeTab.classList.add('active');
        activeContent.classList.add('active');
    }
}