/** @type {Array.<ScoreNote>} */
let scoreNotes = [];
/** @type {Array.<number>} */
let autoPickUps = []
/** @type {Array.<number>} */
let autoMisses = []
/** @type {Array.<number>} */
let autoDrops = []
/** @type {Array.<number>} */
let pickUps = []
/** @type {Array.<number>} */
let misses = [];
/** @type {Array.<number>} */
let drops = [];
/** @type {Array.<number>} */
let defenses = [];
/** @type {Array.<number>} */
let cooperations = [];
/** @type {Array.<number>} */
let amplifies = [];

const AUTO_PICK_UP = "autoPickUp"; //picks up note during auto
const AUTO_MISS = "autoMiss"; // misses with note during auto
const AUTO_DROP = "autoDrop"; // drops note during auto
const PICK_UP = "pickUp"; // picks up note during teleop
const MISS = "miss"; // misses with note during teleop
const DROP = "drop"; // drops note during teleop
const DEFENSE = "defense"; // blocks and steals during teleop
const END_AUTO_STORAGE = "endAuto"; // when auto ends
const COOPERATION = "cooperation"; // cooperation bonus button pressed
const AMPLIFIED = "amplified"; // amplified bonus button pressed

const NOTE = "note"; // note (eek!)

const UNSELECTED_COLOR = "#9a9280";
const NOTE_COLOR = "#F1642B";
const NOTE_BORDER_COLOR = "#F1642B";

function getUTCNow() {
    let d = new Date();
    return d.getTime() + d.getTimezoneOffset()*60000; //60000 ms in 1 minute 
}

class ScoreNote {

    /**
     * 
     * @param {Element} element Element to check the classList of.
     * @returns {string|null} The note object, or null if could not be determined.
     */

    static noteTypeFromClass(element) {
        return element.classList.contains("note-button");
    }

    /**
     * 
     * @param {Element} element 
     * @param {string} type Type of score note.
     * @param {string|null} note Game piece that is in the note.
     * @param {object} history
     */

    constructor(element, type, note, history) {
        this.element = element;
        this.type = !type ? ScoreNote.noteTypeFromClass(element) : type;
        this.note = Object.values(NOTE).includes(note) ? note : null;
        this.history = history?history:{};
    }

    /**
     * Set the Score Note's Game Piece
     * @param {string|null} note
     */
    setNote(note) {
        this.note = note;
        this.history[getUTCNow()] = Object.values(NOTE).includes(note) ? note : null;
        if (note==NOTE) {
            this.element.style.background = NOTE_COLOR;
            this.element.style.borderColor = NOTE_BORDER_COLOR;
        } else {
            this.element.style.background = UNSELECTED_COLOR;
            this.element.style.borderColor = UNSELECTED_COLOR;
        }
    }
}


window.addEventListener("load", () => {
    const selections = document.querySelectorAll(".note-button");
    selections.forEach((selection) => {
        let notes = new ScoreNote(selection);
        scoreNotes.push(notes);
        setNoteClick(notes);
    });

    //track button press times
    const autoPickUp = document.getElementById("autoPickUp"); // get the element with the ID "autoPickUp"
    const autoMiss = document.getElementById("autoMiss"); // get the element with the ID "autoMiss"
    const autoDrop = document.getElementById("autoDrop"); // get the element with the ID "autoDrop"
    const pickUp = document.getElementById("pickUp"); // get the element with the ID "pickUp"
    const miss = document.getElementById("miss"); // get the element with the ID "miss"
    const drop = document.getElementById("drop"); // get the element with the ID "drop"
    const defense = document.getElementById("defense"); // get the element with the ID "defense"
    const cooperation = document.getElementById("cooperation"); // get the element with the ID "cooperation"
    const amplified = document.getElementById("amplified"); // get the element with the ID "amplified"

    setMarkTime(autoPickUp, AUTO_PICK_UP, autoPickUps); // set a mark time for the element with ID "autoPickUp"
    setMarkTime(autoMiss, AUTO_MISS, autoMisses); // set a mark time for the element with ID "autoMiss"
    setMarkTime(autoDrop, AUTO_DROP, autoDrops); // set a mark time for the element with ID "autoDrop"
    setMarkTime(pickUp, PICK_UP, pickUps); // set a mark time for the element with ID "pickUp"
    setMarkTime(miss, MISS, misses); // set a mark time for the element with ID "miss"
    setMarkTime(drop, DROP, drops); // set a mark time for the element with ID "drop"
    setMarkTime(defense, DEFENSE, defenses); // set a mark time for the element with ID "defense"
    setMarkTime(cooperation, COOPERATION, cooperations); // set a mark time for the element with ID "cooperation"
    setMarkTime(amplified, AMPLIFIED, amplifies); // set a mark time for the element with ID "amplified"
});

function setMarkTime(element, storageKey, array) {
    element.addEventListener("click", (ev) => {
        if (ev.button != 0)
            return;

        array.push(getUTCNow());
        localStorage.setItem(storageKey, JSON.stringify(array));
    });
}

/**
 * @param {ScoreNote} scoreNote
 */
function setNoteClick(scoreNote) {
    scoreNote.element.addEventListener("click", (e) => {
                if (scoreNote.note == null)
                    scoreNote.setNote(NOTE);
                else
                    scoreNote.setNote(null);
                });
    }

let autoState = true;

function switchTele() {
    for (let elm of document.getElementsByClassName("auto"))
        elm.hidden = true;
    for (let elm of document.getElementsByClassName("tele"))
        elm.hidden = false;
}

function switchAuto() {
    for (let elm of document.getElementsByClassName("auto"))
        elm.hidden = false;
    for (let elm of document.getElementsByClassName("tele"))
        elm.hidden = true;
}

function toggleAutoTele() {
    autoState = !autoState;
    if (autoState)
        switchAuto();
    else
        switchTele();

}