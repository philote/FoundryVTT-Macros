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

let insightRoll = await new Roll('1d6').evaluate({ async: true });
let diceOutput = getDiceForOutput(insightRoll.result, baseDieColor);
const chatContentMessage = chatContent(diceOutput);
const user = game.user.id;
const speaker = ChatMessage.getSpeaker({ actor, token });

ChatMessage.create({
    user: user,
    speaker: speaker,
    content: chatContentMessage
});