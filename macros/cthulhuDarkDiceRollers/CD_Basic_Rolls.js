// Requires the Foundry Advanced Macros module to work https://github.com/mclemente/fvtt-advanced-macros

let move = 0;
if (args) {
    if (args[0]) {
        move = args[0];
    }
}

const riskDieColor = "#bf0000";
const humanDieColor = "#000000";
const title = dialogTitle(move);
const content = dialogContent(move);
const wordRisk = `<span style="color: ${riskDieColor}">Insight</span>`;
const riskMoveMessage = `
    <hr>
    <div style="font-size: 18px"><b>
        The situation reveals some horror behind the universe, make an <b><i>${wordRisk}</i></b> roll!
    <div>
`;

function dialogTitle(moveNumber) {
    switch (moveNumber) {
        case 1:
            return `Investigate`;
        case 3:
            return `Compete`
        case 4:
            return `Cooperate`
        case 2:
        default:
            return `Do Something Else`;
    }
}

function dialogContent(moveNumber) {
    switch (moveNumber) {
        case 1: // Investigate
            return `
                <p>
                    <b>When you want to ask a question about someone, something or somewhere, or want Control to reveal something about the situation</b>, roll:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="humanDie" name="humanDie">
                        <label for="humanDie">One die if what you’re doing is within human capabilities.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="occupationalDie" name="occupationalDie">
                        <label for="occupationalDie">One die if it’s within your occupational expertise.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="insightDie" name="insightDie">
                        <label for="insightDie" style="color:#bf0000;">If you will risk your mind to succeed.</label>
                    </div>
                </form>
                </br>
            `;
        case 3: // Compete
            return `
                <p>
                    <b>When you are competing with another player, everyone who is competing rolls their dice. The highest die wins:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="humanDie" name="humanDie">
                        <label for="humanDie">One die if what you’re doing is within human capabilities.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="occupationalDie" name="occupationalDie">
                        <label for="occupationalDie">One die if it’s within your occupational expertise.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="insightDie" name="insightDie">
                        <label for="insightDie" style="color:#bf0000;">If you will risk your mind to succeed.</label>
                    </div>
                </form>
                </br>
            `;
        case 4: // Cooperate
            return `
                <p>
                    <b>When you are cooperating with another player, everyone who is cooperating rolls their dice. Take the highest die, rolled by anyone, as the result:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="humanDie" name="humanDie">
                        <label for="humanDie">One die if what you’re doing is within human capabilities.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="occupationalDie" name="occupationalDie">
                        <label for="occupationalDie">One die if it’s within your occupational expertise.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="insightDie" name="insightDie">
                        <label for="insightDie" style="color:#bf0000;">If you will risk your mind to succeed.</label>
                    </div>
                </form>
                </br>
            `;
        case 2: // Do Something Else
        default:
            return `
                <p>
                    <b>When you do something other than investigating:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="humanDie" name="humanDie">
                        <label for="humanDie">One die if what you’re doing is within human capabilities.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="occupationalDie" name="occupationalDie">
                        <label for="occupationalDie">One die if it’s within your occupational expertise.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="insightDie" name="insightDie">
                        <label for="insightDie" style="color:#bf0000;">If you will risk your mind to succeed.</label>
                    </div>
                </form>
                </br>
            `;
    }
}

function getMaxDieMessage(moveNumber, maxDieNumber) {
    // console.log(`moveNumber: ${moveNumber}, maxDieNumber: ${maxDieNumber}`)
    switch (moveNumber) {
        case 1: // Investigate
            {
                switch (maxDieNumber) {
                    case "1":
                    case "2":
                    case "3":
                        return `You get the bare minimum: if you need information to proceed, you get it, but that’s all.`;
                    case "4":
                        return `You get everything a competent investigator would discover.`;
                    case "5":
                        return `You discover everything a competent investigator would discover, plus something more. For example, you might also remember a related folktale, rumour or scientific experiment.`;
                    case "6":
                        return `You discover all of that, plus, in some way, you glimpse beyond human knowledge. This probably means you see something horrific and make an <b><i>${wordRisk} Roll</i></b>.`;
                    default:
                        return `<span style="color:#ff0000">ERROR(getMaxDieMessage.1)</span>`;
                }
            }
        case 3:
        case 4:
            { // Compete & Cooperate
                return `your highest roll was ${maxDieNumber}`;
            }
        case 2: // Do Something Else
        default:
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `You barely succeed, getting the bare minimum to proceed.`;
                case "4":
                    return `You succeed competently.`;
                case "5":
                    return `You succeed well and may get something extra.`;
                case "6":
                    return `You succeed brilliantly and get something extra, but maybe more than you wanted.`;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.2)</span>`;
            }
    }
}

function chatContent(moveNumber, diceOutput, maxDieNumber, riskMessage) {
    const moveName = dialogTitle(moveNumber);
    return `
        <p style="font-size: 1.5em;"><b>${moveName}</b> Result:</p>
        <p>${diceOutput}</p>
        <p>${getMaxDieMessage(moveNumber, maxDieNumber)}</p>
        ${riskMessage}
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
};

async function asyncDialog({
    title = "",
    content = ""
} = {}) {
    return await new Promise(async (resolve) => {
        new Dialog({
            title: title,
            content: content,
            buttons: {
                button1: {
                    icon: '<i class="fa-solid fa-dice"></i>',
                    label: "Roll!",
                    callback: async (html) => {
                        const dice = [];

                        if (document.getElementById("humanDie").checked) {
                            let hdRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Human Die",
                                dieColor: humanDieColor,
                                isRisk: false,
                                rollVal: hdRoll.result
                            });
                        };

                        if (document.getElementById("occupationalDie").checked) {
                            let odRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Occupational Die",
                                dieColor: humanDieColor,
                                isRisk: false,
                                rollVal: odRoll.result
                            });
                        };

                        if (document.getElementById("insightDie").checked) {
                            let idRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Insight Die",
                                dieColor: riskDieColor,
                                isRisk: true,
                                rollVal: idRoll.result
                            });
                        };

                        const maxDie = dice.reduce((a, b) => (a.rollVal > b.rollVal) ? a : b);

                        // Determine if the risk die won
                        let isRiskDie = false;
                        dice.every(die => {
                          if ((die.rollVal == maxDie.rollVal) && die.isRisk) {
                            isRiskDie = true;
                            return false;
                          }
                          return true;
                        });

                        let riskMessage = "";
                        if (isRiskDie) {
                            riskMessage = riskMoveMessage;
                        }

                        // Build Dice list
                        let diceOutput = "";
                        dice.forEach(die => {
                            diceOutput = diceOutput.concat(getDiceForOutput(die.rollVal, die.dieColor), " ");
                        });
                        
                        // Initialize chat data.
                        const chatContentMessage = chatContent(move, diceOutput, maxDie.rollVal, riskMessage);
                        const user = game.user.id;
                        const speaker = ChatMessage.getSpeaker({ actor: this.actor });
                        const rollMode = game.settings.get('core', 'rollMode');

                        ChatMessage.create({
                          user: user,
                          speaker: speaker,
                          rollMode: rollMode,
                          content: chatContentMessage
                        });

                        // ----
                        resolve(null);
                    }
                }
            },
            close: () => {
                resolve(null);
            }
        }).render(true);
    });
}

let myReturnValue = await asyncDialog({ title, content });