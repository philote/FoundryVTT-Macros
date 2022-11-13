const title = "Action Roll";
const content = `
    <form class="flexcol">
      <div class="form-group">
        <input type="checkbox" id="baseDie" name="baseDie" value="0" checked>
        <label for="baseDie">Always start with 1d6</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="expertiseDie" name="expertiseDie" value="0">
        <label for="expertiseDie"> With Expertise</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="stressDie" name="stressDie" value="1">
        <label for="stressDie">Risk Stress to Succeed</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="bonusDie" name="bonusDie" value="0">
        <label for="bonusDie">Move Bonus Die</label>
      </div>
    </form>
`;

const takeThemOutDieColor = "#bf0000";
const riskDieColor = "#00bf11";
const baseDieColor = "#000000";
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
                    icon: '<i class="fas fa-check"></i>',
                    label: "Roll!",
                    callback: async (html) => {
                        // stuff here.
                        const dice = [];

                        if (document.getElementById("baseDie").checked) {
                            let hdRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Base Die",
                                dieColor: baseDieColor,
                                isRisk: !!parseInt(html.find('input[name="baseDie"]').val()),
                                rollVal: hdRoll.result
                            });
                        };

                        if (document.getElementById("expertiseDie").checked) {
                            let odRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Expertise Die",
                                dieColor: baseDieColor,
                                isRisk: !!parseInt(html.find('input[name="expertiseDie"]').val()),
                                rollVal: odRoll.result
                            });
                        };

                        if (document.getElementById("stressDie").checked) {
                            let idRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Stress Die",
                                dieColor: riskDieColor,
                                isRisk: !!parseInt(html.find('input[name="stressDie"]').val()),
                                rollVal: idRoll.result
                            });
                        };

                        if (document.getElementById("bonusDie").checked) {
                            let idRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Bonus Die",
                                dieColor: baseDieColor,
                                isRisk: !!parseInt(html.find('input[name="bonusDie"]').val()),
                                rollVal: idRoll.result
                            });
                        };

                        let diceOutput = ""

                        dice.forEach(die => {
                            diceOutput = diceOutput.concat(getDiceForOutput(die.rollVal, die.dieColor), " ");
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