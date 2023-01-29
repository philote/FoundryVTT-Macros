const baseDieColor = "#A62424";
const title = "Insight Roll";
const insightMessage = "If you rolled higher than your Insight, add 1 to your Insight and roleplay your fear."

function chatContent(diceOutput) {
    return `
        <p><span style="font-size: 1.5em;"><b>${title}</b> Result: </span> ${diceOutput}</p>
        <hr>
        <span style="font-size: 1.2em;">${insightMessage}</span>
    `;
}

function getDiceForOutput(dieNumber, colorHex) {
    switch (dieNumber) {
        case "1":
            return `<i class="fas fa-dice-one" style="color:${colorHex}; font-size: 1.5em;"></i>`;
        case "2":
            return `<i class="fas fa-dice-two" style="color:${colorHex}; font-size: 1.5em;"></i>`;
        case "3":
            return `<i class="fas fa-dice-three" style="color:${colorHex}; font-size: 1.5em;"></i>`;
        case "4":
            return `<i class="fas fa-dice-four" style="color:${colorHex}; font-size: 1.5em;"></i>`;
        case "5":
            return `<i class="fas fa-dice-five" style="color:${colorHex}; font-size: 1.5em;"></i>`;
        case "6":
            return `<i class="fas fa-dice-six" style="color:${colorHex}; font-size: 1.5em;"></i>`;
        default:
            console.error("Error in the getDiceForOutput, bad die number used.");
    }
}

const dice = [];

let hdRoll = await new Roll('1d6').evaluate({ async: true });
dice.push({
    name: "Base Die",
    dieColor: baseDieColor,
    isStress: false,
    rollVal: hdRoll.result
});

let diceOutput = "";

const maxDieValue = dice.reduce((a, b) => (a.rollVal > b.rollVal) ? a : b).rollVal;
const setOfMaxDice = dice.filter(obj => {
    return obj.rollVal === maxDieValue
});

let maxDie = setOfMaxDice[0];

console.log("maxDie.name "+maxDie.name);
console.log("maxDie.rollVal "+maxDie.rollVal);

const maxDieModified = parseInt(maxDie.rollVal);
console.log("maxDieModified "+maxDieModified);
console.log("maxDieModified "+maxDieModified);


dice.forEach(die => {
    diceOutput = diceOutput.concat(getDiceForOutput(die.rollVal, die.dieColor), " ");
});
const chatContentMessage = chatContent(diceOutput);

const user = game.user.id;
const speaker = ChatMessage.getSpeaker({ actor, token });

ChatMessage.create({
    user: user,
    speaker: speaker,
    content: chatContentMessage
});