let move = 0;
if (args) {
    if(args[0]) {
        move = args[0];
    }
}

const heatColor = "#eb7602";
const riskDieColor = "#A62424";
const baseDieColor = "#000000";
const wordStress =`<span style="color: ${riskDieColor}">Stress</span>`;
const wordHeat =`<span style="color: ${heatColor}">HEAT</span>`;

function dialogTitle(moveNumber) {
    switch (moveNumber) {
        case 1:
            return `Behave Badly`;
        case 2:
            return `Indulge a Vice`;
        case 3:
            return `Look for Guidance`;
        case 4:
            return `Seek solace in a relationship`;
        case 5:
            return `Reveal some of your history together`;
        default:
            return `Seek relief from the horror`;
    }
}

function getMaxDieMessage(moveNumber, maxDieNumber) {
    // console.log(`moveNumber: ${moveNumber}, maxDieNumber: ${maxDieNumber}`)
    switch (moveNumber) {
        case 1: { // Behave Badly
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `Your inadequacy is clear, they pity you. You can’t use your Expertise until Stress goes up.`;
                case "4":
                case "5":
                    return `
                    <ul>
                        <li>If they are an Operator, agree with them why and they take it so badly & THEY roll for Stress.</li>
                        <li>If they are an NPC, mark HEAT and agree how this draws the Conspiracy’s attention.</li>
                    </ul>
                    `;
                case "6":
                    return `
                    <ul>
                        <li>If they are an Operator, agree with them why and they take it so badly & THEY roll for Stress.</li>
                        <li>If they are an NPC, mark HEAT and agree how this draws the Conspiracy’s attention.</li>
                    </ul>
                    It was really worth it: reduce Stress by an extra 1.
                    `;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.1)</span>`;
            }
        }
        case 2: // Indulge a Vice
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `You’re ashamed of yourself & distracted. You can’t use your Expertise until Stress goes up.`;
                case "4":
                case "5":
                    return `Mark HEATand agree how this draws the Conspiracy’s attention.`;
                case "6":
                    return `
                        Mark HEATand agree how this draws the Conspiracy’s attention.
                        </br>It was really worth it: reduce Stress by an extra 1.
                    `;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.2)</span>`;
            }
        case 3: // Look for Guidance
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `They see through your false contrition. You can’t use your Expertise until Stress goes up.`;
                case "4":
                case "5":
                    return `Mark HEATand describe what they ask you to do to restore their belief in you and how this draws the attention of the Conspiracy to the team or makes things difficult for you. You cannot go back to them for support until you fulfil the obligation they have placed on you.`;
                case "6":
                    return `
                        Mark HEATand describe what they ask you to do to restore their belief in you and how this draws the attention of the Conspiracy to the team or makes things difficult for you. You cannot go back to them for support until you fulfil the obligation they have placed on you.
                        </br>It was really worth it: reduce Stress by an extra 1.
                    `;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.3)</span>`;
            }
        case 4: // Seek solace in a relationship
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                    return `Mark your Anchor, placing them on the Conspiracy Target list, or Missing if they are already a Target. Only Control can mark Taken.`;
                case "6":
                    return `
                        Mark your Anchor, placing them on the Conspiracy Target list, or Missing if they are already a Target. Only Control can mark Taken.    
                        </br>It was really worth it: reduce Stress by an extra 1.
                    `;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.4)</span>`;
            }
        case 5: // Reveal some of your history together
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `
                        EITHER say why you feel bad about the event and you can’t use your Expertise until Stress goes up; 
                        </br>OR add something about your Anchor to your recollection or its aftermath and mark them.
                    `;
                case "4":
                case "5":
                    return `
                        The other Operator describes a different version or view of the same event. 
                        </br>They EITHER say why they are hurt by it and they roll for Stress; 
                        </br>OR they choose to add something about their Anchor to their recollection or its aftermath and theymark theirAnchor.
                    `;
                case "6":
                    return `
                        The other Operator describes a different version or view of the same event. 
                        </br>They EITHER say why they are hurt by it and they roll for Stress; 
                        </br>OR they choose to add something about their Anchor to their recollection or its aftermath and theymark theirAnchor.
                        </br>It was really worth it; reduce Stress by an extra 1.
                    `;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.5)</span>`;
            }
        default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.default)</span>`;
    }
}

function chatContent(moveNumber, diceOutput, maxDieNumber) {
    const moveName = dialogTitle(moveNumber);
    return `
        <p style="font-size: 1.5em;"><b>${moveName}</b> Result:</p>
        <p>${diceOutput}</p>
        <p>${getMaxDieMessage(moveNumber, maxDieNumber)}</p>
    `;
}

function getDiceForOutput(dieNumber, colorHex) {
    switch (dieNumber) {
        case "1":
            return `<i class="fas fa-dice-one" style="color:${colorHex}; font-size: 2em;"></i>`;
        case "2":
            return `<i class="fas fa-dice-two" style="color:${colorHex}; font-size: 2em;"></i>`;
        case "3":
            return `<i class="fas fa-dice-three" style="color:${colorHex}; font-size: 2em;"></i>`;
        case "4":
            return `<i class="fas fa-dice-four" style="color:${colorHex}; font-size: 2em;"></i>`;
        case "5":
            return `<i class="fas fa-dice-five" style="color:${colorHex}; font-size: 2em;"></i>`;
        case "6":
            return `<i class="fas fa-dice-six" style="color:${colorHex}; font-size: 2em;"></i>`;
        default:
            console.error("Error in the getDiceForOutput, bad die number used.");
    }
}

const roll = await new Roll('1d6').evaluate({ async: true });
const diceOutput = getDiceForOutput(roll.result, baseDieColor);
const chatContentMessage = chatContent(move, diceOutput, roll.result);
ChatMessage.create({
    content: chatContentMessage
});