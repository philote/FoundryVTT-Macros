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
                                console.log(`1: ${riskDiceImages[die.rollVal - 1]}`);
                                diceOutput = diceOutput.concat(riskDiceImages[die.rollVal - 1], " ");
                            } else {
                                console.log(`2: ${diceImages[die.rollVal - 1]}`);
                                diceOutput = diceOutput.concat(diceImages[die.rollVal - 1], " ");
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
// define title, content
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
const diceImages = [
    '<i class="fas fa-dice-one" style="font-size: 2em;"></i>',
    '<i class="fas fa-dice-two" style="font-size: 2em;"></i>',
    '<i class="fas fa-dice-three" style="font-size: 2em;"></i>',
    '<i class="fas fa-dice-four" style="font-size: 2em;"></i>',
    '<i class="fas fa-dice-five" style="font-size: 2em;"></i>',
    '<i class="fas fa-dice-six" style="font-size: 2em;"></i>'
];
const riskDiceImages = [
    '<i class="fas fa-dice-one" style="color:#bf0000; font-size: 2em;"></i>',
    '<i class="fas fa-dice-two" style="color:#bf0000; font-size: 2em;"></i>',
    '<i class="fas fa-dice-three" style="color:#bf0000; font-size: 2em;"></i>',
    '<i class="fas fa-dice-four" style="color:#bf0000; font-size: 2em;"></i>',
    '<i class="fas fa-dice-five" style="color:#bf0000; font-size: 2em;"></i>',
    '<i class="fas fa-dice-six" style="color:#bf0000; font-size: 2em;"></i>'
];
let myReturnValue = await asyncDialog({ title, content });