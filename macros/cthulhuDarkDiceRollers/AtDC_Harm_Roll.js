const intelColor = "#2624a6";
const riskDieColor = "#A62424";
const baseDieColor = "#000000";
const wordIntel =`<span style="color: ${intelColor}">INTEL</span>`;
const wordStress =`<span style="color: ${riskDieColor}">Stress</span>`;
const title = "Stress Roll";
const content = `
    <p>
        <b>If any Risk Die rolls equal to or greater than your highest roll</b>, you suffer a Harmful Consequence:
    </p>
    <form class="flexcol">
        <div class="form-group">
            <input type="checkbox" id="baseDie" name="baseDie" checked>
            <label for="baseDie">Roll 1d6 to find out how bad it is.</label>
        </div>
        <div class="form-group">
            <input type="checkbox" id="stressDie" name="stressDie">
            <label for="stressDie">Add your <b><span style="color: ${riskDieColor}">Stress Die</span></b> if you are willing to take that risk</label>
        </div>
        <hr>
        <div>
            <input type="radio" id="namelessPawn" name="rollBonus" value="3">
            <label for="namelessPawn">+3 if they are nameless pawns</label>
        </div>
        <div>
            <input type="radio" id="namelessPawnLeader" name="rollBonus" value="2">
            <label for="namelessPawnLeader">+2 if they are the leader of nameless pawns</label>
        </div>
        <div>
            <input type="radio" id="supernatural" name="rollBonus" value="-1">
            <label for="supernatural">-1 if they are a Supernatural</label>
        </div>
    </form>
    </br>
`;
const stressMoveMessage = `
    <hr>
    <div style="font-size: 18px">
        <b>The situation causes you ${wordStress}, increase your ${wordStress} by one!
        </br><i style="font-size: 12px">(Do not roll for ${wordStress} if prompted by the move.)</i></b>
    <div>
`;

function getMaxDieMessage(maxDieNumber) {
    switch (maxDieNumber) {
        case 1:
        case 2:
        case 3:
            return `
                The consequences are serious, say if:
                <ul>
                    <li>It’s mortal. You<b><i>fill your ${wordStress} track</i></b> and crack.</li>
                    <li>It’s bloody. You’ll <b><i>die after one more action</i></b> without medical treatment.</li>
                    <li>It’s painful. You <b><i>cannot use your Expertise</i></b> until you get medical treatment.</li>
                </ul>
                Medical treatment requires an Operator, who could be the one needing treatment, to mark a gear slot and declare a "Medical Kit".
            `;
        case 4:
        case 5:
            return `You were lucky this time! It hurts, but you’ll live`;
        case 6:
        case 7:
        case 8:
        case 9:
            return `You were lucky this time! It hurts, but you’ll live, also <b><i>Mark ${wordIntel}</b></i> But that was close <b><i>roll for ${wordStress}</b></i>.`;
        default:
            return `<span style="color:#ff0000">ERROR(getMaxDieMessage.1)</span>`;
    }
}

function chatContent(diceOutput, maxDieNumber, stressMessage, bonusValue) {
    return `
        <p style="font-size: 1.5em;"><b>${title}</b> Result:</p>
        <p>${diceOutput}</p>
        <b>Antagonist Modifier:</b> ${bonusValue}
        </br><b>Final Result:</b> ${maxDieNumber}
        <hr>
        ${getMaxDieMessage(maxDieNumber)}
        ${stressMessage}
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

                        if (document.getElementById("baseDie").checked) {
                            let hdRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Base Die",
                                dieColor: baseDieColor,
                                isStress: false,
                                rollVal: hdRoll.result
                            });
                        }

                        if (document.getElementById("stressDie").checked) {
                            let idRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Stress Die",
                                dieColor: riskDieColor,
                                isStress: true,
                                rollVal: idRoll.result
                            });
                        };

                        // bonuses
                        
                        const radios = document.getElementsByName('rollBonus');
                        let bonusValue = 0;
                        for (var i = 0, length = radios.length; i < length; i++) {
                            if (radios[i].checked) {
                                bonusValue = parseInt(radios[i].value);
                                break;
                            }
                        }

                        // -----------------

                        let diceOutput = "";

                        const maxDieValue = dice.reduce((a, b) => (a.rollVal > b.rollVal) ? a : b).rollVal;
                        const setOfMaxDice = dice.filter(obj => {
                            return obj.rollVal === maxDieValue
                        });

                        // Stress
                        let stressMessage = "";
                        var stressDieR = setOfMaxDice.find(obj => {
                            return obj.isStress === true;
                        });

                        let maxDie = null
                        if (stressDieR) {
                            stressMessage = stressMoveMessage;
                            maxDie = stressDieR;
                        } else {
                            maxDie = setOfMaxDice[0];
                        };
                        
                        console.log(maxDie.name);
                        console.log(maxDie.isStress);
                        console.log(maxDie.rollVal);

                        const maxDieModified = parseInt(maxDie.rollVal) + bonusValue;
                        console.log(maxDieModified);

                        dice.forEach(die => {
                            diceOutput = diceOutput.concat(getDiceForOutput(die.rollVal, die.dieColor), " ");
                        });
                        const chatContentMessage = chatContent(diceOutput, maxDieModified, stressMessage, bonusValue);
                        const user = game.user.id;
                        const speaker = ChatMessage.getSpeaker({ actor, token });

                        ChatMessage.create({
                            user: user,
                            speaker: speaker,
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