let move = 0;
if (args) {
    if(args[0]) {
        move = args[0];
    }
}

const intelColor = "#2624a6";
const heatColor = "#eb7602";
const takeThemOutDieColor = "#2ba624";
const riskDieColor = "#A62424";
const bonusDieColor = "#0A71FF";
const baseDieColor = "#000000";
const title = dialogTitle(move);
const content = dialogContent(move);
const wordIntel =`<span style="color: ${intelColor}">INTEL</span>`;
const wordStress =`<span style="color: ${riskDieColor}">Stress</span>`;
const wordHeat =`<span style="color: ${heatColor}">HEAT</span>`;
const stressMoveMessage = `
    <hr>
    <div style="font-size: 18px"><b>
        The situation causes you ${wordStress}, increase your ${wordStress} by one!
        </br><i style="font-size: 12px">(Do not roll for ${wordStress} if prompted by the move.)</i></b>

    <div>
`;

function dialogTitle(moveNumber) {
    switch (moveNumber) {
        case 1:
            return `Investigate`;
        case 2:
            return `Maintain Your Cover`;
        case 3:
            return `Flee For Your Life`;
        case 5:
            return `Chase Them Down`;
        case 6:
            return `Take Them Out`;
        case 4:
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
                        <input type="checkbox" id="baseDie" name="baseDie" checked>
                        <label for="baseDie">Always start with <b>1d6</b></label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="expertiseDie" name="expertiseDie">
                        <label for="expertiseDie">Add another 1d6 if your <b>Expertise</b> is relevant</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="stressDie" name="stressDie">
                        <label for="stressDie">Add your <b><span style="color: ${riskDieColor}">Stress Die</span></b> if you are willing to take that risk</label>
                    </div>
                </form>
                </br>
            `;
        case 2: // Maintain Your Cover
                return `
                    <p>
                        <b>When you are at risk of exposure, say how you brazen it out, avoid detection or hide from those who suspect you, or are looking for you</b>, roll:
                    </p>
                    <form class="flexcol">
                        <div class="form-group">
                            <input type="checkbox" id="baseDie" name="baseDie" checked>
                            <label for="baseDie">Always start with <b>1d6</b></label>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" id="expertiseDie" name="expertiseDie">
                            <label for="expertiseDie">Add another 1d6 if your <b>Expertise</b> is relevant</label>
                        </div>
                        <div class="form-group">
                            <input type="checkbox" id="stressDie" name="stressDie">
                            <label for="stressDie">Add your <b><span style="color: ${riskDieColor}">Stress Die</span></b> if you are willing to take that risk</label>
                        </div>
                    </form>
                    </br>
                `;
        case 3: // Flee For Your Life
            return `
                <p>
                    <b>When you want to escape your fate by leaving the scene and Control agrees there’s a reasonable route by which you could get away</b>, roll:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="baseDie" name="baseDie" checked>
                        <label for="baseDie">Always start with <b>1d6</b></label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="expertiseDie" name="expertiseDie">
                        <label for="expertiseDie">
                            Add your <b>Expertise Die</b> if… 
                            <ul>
                                <li><b>it’s a foot chase</b> & you have <b>Military Fieldcraft</b>.</li>
                                <li><b>you’re blending into a crowd</b> & you have <b>Tradecraft</b>, <b>Larceny</b> or <b>Disguise</b>.</li> 
                                <li><b>If it’s a vehicle chase</b> & you have <b>Vehicles</b> <i>(only you roll)</i>.</li>
                            </ul>
                        </label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="stressDie" name="stressDie">
                        <label for="stressDie">Add your <b><span style="color: ${riskDieColor}">Stress Die</span></b> if you are willing to take that risk</label>
                    </div>
                </form>
                </br>
            `;
        case 5: // Chase Them Down
            return `
                <p>
                    <b>When they are getting away and Control agrees there’s a reasonable way for you to catch them before they escape, and their Powers don’t make it impossible</b>, roll:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="baseDie" name="baseDie" checked>
                        <label for="baseDie">Always start with <b>1d6</b></label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="expertiseDie" name="expertiseDie">
                        <label for="expertiseDie">
                            Add your <b>Expertise Die</b> if… 
                            <ul>
                                <li><b>it’s a foot chase</b> & you have <b>Military Fieldcraft</b>.</li>
                                <li><b>they’re blending into a crowd</b> & you have <b>Tradecraft</b>, <b>Larceny</b> or <b>Surveillance</b>.</li> 
                                <li><b>If it’s a vehicle chase</b> & you have <b>Vehicles</b> <i>(only you roll)</i>.</li>
                            </ul>
                        </label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="stressDie" name="stressDie">
                        <label for="stressDie">Add your <b><span style="color: ${riskDieColor}">Stress Die</span></b> if you are willing to take that risk</label>
                    </div>
                </form>
                </br>
            `;
        case 6: // Take Them Out
            return `
                <p>
                    <b>If you fight or shoot at a threat or they attack
                    you, say what success looks like: Hurt them; Subdue them; Avoid their attempt to hurt you; Some other narrative outcome</b>, then roll:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="baseDie" name="baseDie" checked>
                        <label for="baseDie">Always start with <b>1d6</b></label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="expertiseDie" name="expertiseDie">
                        <label for="expertiseDie">Add your Expertise Die if <b>Small Arms</b> or <b>Hand-toHand</b> is relevant and it isn’t cancelled.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="bonusDie" name="bonusDie">
                        <label for="bonusDie">Add the <span style="color: ${bonusDieColor}"><b>Bonus Die</b></span> if your weapon is <b>heavy</b> or <b>explode</b> or you have <b>Deadly</b>.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="stressDie" name="stressDie">
                        <label for="stressDie">Add your <b><span style="color: ${riskDieColor}">Stress Die</span></b> if you are willing to take that risk</label>
                    </div>
                    </br>
                    <p><b style="font-size: 20px;color: ${takeThemOutDieColor}">Take Them Out Risk Dice</b></p>
                    <div class="form-group">
                        <input type="checkbox" id="threatHarmDie" name="threatHarmDie">
                        <label for="threatHarmDie"><b>If the threat is able to do you harm</b>, add 1 Risk Die to the dice pool.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="threatSupernaturalDie" name="threatSupernaturalDie">
                        <label for="threatSupernaturalDie"><b>If they are a Supernatural</b>, add a 2nd Risk Die.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="outnumberedDie" name="outnumberedDie">
                        <label for="outnumberedDie"><b>If you are outnumbered</b>, add another Risk Die.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="weaponDie" name="weaponDie">
                        <label for="weaponDie"><b>If their weapon is heavy or explode</b>, add another Risk Die.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="SupernaturalPowersDie1" name="SupernaturalPowersDie1">
                        <input type="checkbox" id="SupernaturalPowersDie2" name="SupernaturalPowersDie2">
                        <input type="checkbox" id="SupernaturalPowersDie3" name="SupernaturalPowersDie3">
                        <input type="checkbox" id="SupernaturalPowersDie4" name="SupernaturalPowersDie4">
                        <label for="SupernaturalPowersDie1">If they have Powers, add another Risk Die per relevant Power.</label>
                    </div>
                    <p><i>Maximum number of Risk Dice added = 5.</i></p>
                </form>
                </br>
            `;
        case 4: // Do Something Else
        default:
            return `
                <p>
                    <b>When you do something that isn't covered by another move</b>, say what success looks like and roll:
                </p>
                <form class="flexcol">
                    <div class="form-group">
                        <input type="checkbox" id="baseDie" name="baseDie" checked>
                        <label for="baseDie">Always start with 1d6</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="expertiseDie" name="expertiseDie">
                        <label for="expertiseDie">Add another 1d6 if your <b>Expertise</b> is relevant.</label>
                    </div>
                    <div class="form-group">
                        <input type="checkbox" id="stressDie" name="stressDie">
                        <label for="stressDie">Add your <b><span style="color: ${riskDieColor}">Stress Die</span></b> if you are willing to take that risk</label>
                    </div>
                </form>
                </br>
            `;
    }
}

function getMaxDieMessage(moveNumber, maxDieNumber) {
    // console.log(`moveNumber: ${moveNumber}, maxDieNumber: ${maxDieNumber}`)
    switch (moveNumber) {
        case 1: { // Investigate
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `you get the minimum amount of information you need to proceed and mark <b><i>${wordHeat}</b></i>`;
                case "4":
                case "5":
                    return `you get the minimum needed to proceed and <b><i>Control will also answer 1 question</b></i>.`;
                case "6":
                    return `you get the minimum needed to proceed and <b><i>Control will also answer 2 questions</b></i>, also <b><i>mark ${wordIntel}</b></i> and <b><i>roll for ${wordStress}</b></i>.`;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.1)</span>`;
            }
        }
        case 2: // Maintain Your Cover
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `you’re blown! Choose to either <b><i>get caught</b></i> or <b><i>mark ${wordHeat}</b></i> and <b><i>flee for your life</b></i>.`;
                case "4":
                case "5":
                    return `your cover holds, or they don’t find you.`;
                case "6":
                    return `you succeed brilliantly: <b><i>agree what extra benefit you get; mark ${wordIntel};</b></i> and <b><i>roll for ${wordStress}</b></i>.`;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.2)</span>`;
            }
        case 3: // Flee For Your Life
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `you’re in trouble! Choose to either <b><i>get caught</b></i> or <b><i>agree with Control who or what gets left behind</b></i> and <b><i>mark ${wordHeat}</b></i> and <b><i>flee for your life</b></i>, again.`;
                case "4":
                case "5":
                    return `you get away clean unless Control chooses to spend ${wordHeat} to maintain the pursuit and forces you to <b><i>flee for your life</b></i>, again.`;
                case "6":
                    return `you succeed brilliantly: <b><i>agree what extra benefit you get; mark ${wordIntel};</i></b> and <b><i>roll for ${wordStress}</i></b>.`;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.3)</span>`;
            }
        case 5: // Chase Them Down
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `Dammit, they’re fast! Choose to either <b><i>let them get away</i></b> or <b><i>agree with Control the practical cost ofstaying in the race</i></b> and <b><i>mark ${wordHeat}</i></b> and <b><i>chase them down again</i></b>.`;
                case "4":
                case "5":
                    return `you catch them unless Control chooses to spend ${wordHeat} to impede you and force you to <b><i>chase them down</i></b>, again.`;
                case "6":
                    return `you succeed brilliantly: <b><i>agree what extra benefit you get; mark ${wordIntel};</i></b> and <b><i>roll for ${wordStress}</i></b>.`;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.5)</span>`;
            }
        case 6: // Take Them Out
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `you <b><i>fail</i></b>, or <b><i>succeed at a cost</i></b>, but always <b><i>mark ${wordHeat}</i></b>.`;
                case "4":
                case "5":
                    return `you succeed with no obvious complication or benefit`;
                case "6":
                    return `you succeed brilliantly: <b><i>agree what extra benefit you get; mark ${wordIntel};</i></b> and <b><i>roll for ${wordStress}</i></b>.`;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.6)</span>`;
            }
        case 4: // Do Something Else
        default:
            switch (maxDieNumber) {
                case "1":
                case "2":
                case "3":
                    return `you either fail or <b><i>Control may offer you success at a cost</i></b>, but always <b><i>mark ${wordHeat}</i></b>.`;
                case "4":
                case "5":
                    return `you succeed with no obvious complication or benefit.`;
                case "6":
                    return `you succeed brilliantly: <b><i>agree what extra benefit you get; mark ${wordIntel};</i></b> and <b><i>roll for  ${wordStress}</i></b>.`;
                default:
                    return `<span style="color:#ff0000">ERROR(getMaxDieMessage.4)</span>`;
            }
    }
}

function chatContent(moveNumber, diceOutput, maxDieNumber, stressMessage) {
    const moveName = dialogTitle(moveNumber);
    return `
        <p style="font-size: 1.5em;"><b>${moveName}</b> Result:</p>
        <p>${diceOutput}</p>
        <p>${getMaxDieMessage(moveNumber, maxDieNumber)}</p>
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
                                isRisk: false,
                                rollVal: hdRoll.result
                            });
                        }

                        if (document.getElementById("expertiseDie").checked) {
                            let odRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Expertise Die",
                                dieColor: baseDieColor,
                                isStress: false,
                                isRisk: false,
                                rollVal: odRoll.result
                            });
                        };

                        if (document.getElementById("stressDie").checked) {
                            let idRoll = await new Roll('1d6').evaluate({ async: true });
                            dice.push({
                                name: "Stress Die",
                                dieColor: riskDieColor,
                                isStress: true,
                                isRisk: false,
                                rollVal: idRoll.result
                            });
                        };

                        // Take them out Die
                        
                        if (document.getElementById("bonusDie") != null) {
                            if (document.getElementById("bonusDie").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Bonuse Die",
                                    dieColor: bonusDieColor,
                                    isStress: false,
                                    isRisk: false,
                                    rollVal: idRoll.result
                                });
                            }
                        }

                        if (document.getElementById("threatHarmDie") != null) {
                            if (document.getElementById("threatHarmDie").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Threat Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
                            }
                        }
                        
                        if (document.getElementById("threatSupernaturalDie") != null) {
                            if (document.getElementById("threatSupernaturalDie").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Threat Supernatural Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
                            }
                        }

                        if (document.getElementById("outnumberedDie") != null) {
                            if (document.getElementById("outnumberedDie").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Out Numbered Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
                            }
                        }

                        if (document.getElementById("weaponDie") != null) {
                            if (document.getElementById("weaponDie").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Weapon Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
                            }
                        }

                        if (document.getElementById("SupernaturalPowersDie1") != null) {
                            if (document.getElementById("SupernaturalPowersDie1").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Supernatural Powers Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
                            }
                        }

                        if (document.getElementById("SupernaturalPowersDie2") != null) {
                            if (document.getElementById("SupernaturalPowersDie2").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Supernatural Powers Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
                            }
                        }

                        if (document.getElementById("SupernaturalPowersDie3") != null) {
                            if (document.getElementById("SupernaturalPowersDie3").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Supernatural Powers Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
                            }
                        }

                        if (document.getElementById("SupernaturalPowersDie4") != null) {
                            if (document.getElementById("SupernaturalPowersDie4").checked) {
                                let idRoll = await new Roll('1d6').evaluate({ async: true });
                                dice.push({
                                    name: "Supernatural Powers Harm Die",
                                    dieColor: takeThemOutDieColor,
                                    isStress: false,
                                    isRisk: true,
                                    rollVal: idRoll.result
                                });
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

                        // Harm
                        var riskDieR = setOfMaxDice.find(obj => {
                            return obj.isRisk === true;
                        });

                        if (riskDieR) {
                            // TODO: Process Harm and add to message
                        };
                        
                        // console.log(maxDie.name);
                        // console.log(maxDie.isStress);
                        // console.log(maxDie.isRisk);
                        // console.log(maxDie.rollVal);

                        dice.forEach(die => {
                            diceOutput = diceOutput.concat(getDiceForOutput(die.rollVal, die.dieColor), " ");
                        });
                        const chatContentMessage = chatContent(move, diceOutput, maxDie.rollVal, stressMessage);

                        ChatMessage.create({
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