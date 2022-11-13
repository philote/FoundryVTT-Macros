const title = "Action Roll";

const content = `
    <form class="flexcol">
      <div class="form-group">
        <input type="checkbox" id="humanDie" name="humanDie" value="0">
        <label for="humanDie"> Within Human Capabilities</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="occupationalDie" name="occupationalDie" value="0">
        <label for="occupationalDie"> With Occupational Expertice</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="insightDie" name="insightDie" value="1">
        <label for="insightDie">Risk Your Mind to Succeed</label>
      </div>
    </form>
`;

const riskDieColor = "#bf0000"
const baseDieColor = "#000000"
function getDiceForOutput(dieNumber, colorHex) {
    switch (dieNumber) {
        case "1":
            return `<i class="fas fa-dice-one" style="color:${colorHex}; font-size: 2em;"></i>`
        case "2":
            return `<i class="fas fa-dice-two" style="color:${colorHex}; font-size: 2em;"></i>`
        case "3":
            return `<i class="fas fa-dice-three" style="color:${colorHex}; font-size: 2em;"></i>`
        case "4":
            return `<i class="fas fa-dice-four" style="color:${colorHex}; font-size: 2em;"></i>`
        case "5":
            return `<i class="fas fa-dice-five" style="color:${colorHex}; font-size: 2em;"></i>`
        case "6":
            return `<i class="fas fa-dice-six" style="color:${colorHex}; font-size: 2em;"></i>`
        default:
            console.error("Error in the getDiceForOutput, bad die number used.")
            break;
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
                    icon: '<i class="fas fa-check"></i>',
                    label: "Roll!",
                    callback: async (html) => {
                        // stuff here.
                        const dice = [];

                        if (document.getElementById("humanDie").checked) {
                            let hdRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Human Die",
                                isRisk: !!parseInt(html.find('input[name="humanDie"]').val()),
                                rollVal: hdRoll.result
                            });
                        };

                        if (document.getElementById("occupationalDie").checked) {
                            let odRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Occupational Die",
                                isRisk: !!parseInt(html.find('input[name="occupationalDie"]').val()),
                                rollVal: odRoll.result
                            });
                        };

                        if (document.getElementById("insightDie").checked) {
                            let idRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Insight Die",
                                isRisk: !!parseInt(html.find('input[name="insightDie"]').val()),
                                rollVal: idRoll.result
                            });
                        };

                        let diceOutput = ""

                        dice.forEach(die => {
                            if (die.isRisk) {
                                diceOutput = diceOutput.concat(getDiceForOutput(die.rollVal, riskDieColor), " ");
                            } else {
                                diceOutput = diceOutput.concat(getDiceForOutput(die.rollVal, baseDieColor), " ");
                            }
                        });

                        ChatMessage.create({
                            content: `
                                <div class='flexcol' style="font-size: 1.5em;">Roll Results:</div>
                                <p>
                                    ${diceOutput}
                                </p>
                            `
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