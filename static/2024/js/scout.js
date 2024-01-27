/** @type {Array.<ScoreNote>} */
let scoreNotes = [];
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


const PICK_UP = "pickUps"; // picks up note
const MISS = "misses"; // misses with note
const DROP = "drops"; // drops note
const DEFENSE = "defenses"; // blocks and steals
const END_AUTO_STORAGE = "endAuto";
const AUTO_STAGE_STORAGE = "autoStageState";
const COOPERATION = "cooperations";
const AMPLIFIED = "amplifies";

const NOTE = "note";

const UNSELECTED_COLOR = "#777";
const NOTE_COLOR = "#ff0";
const NOTE_BORDER_COLOR = "#cc0";

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
    const autoPickUp = document.getElementById("autoPickUp");
    const autoMiss = document.getElementById("autoMiss");
    const autoDrop = document.getElementById("autoDrop");
    const pickUp = document.getElementById("pickUp");
    const miss = document.getElementById("miss");
    const drop = document.getElementById("drop");
    const defense = document.getElementById("defense");
    const cooperation = document.getElementById("cooperation")
    const amplified = document.getElementById("amplified")

    setMarkTime(autoPickUp, PICK_UP, pickUps);
    setMarkTime(autoMiss, MISS, misses);
    setMarkTime(autoDrop, DROP, drops);
    setMarkTime(pickUp, PICK_UP, pickUps);
    setMarkTime(miss, MISS, misses);
    setMarkTime(drop, DROP, drops);
    setMarkTime(defense, DEFENSE, defenses);
    setMarkTime(cooperation, COOPERATION, cooperations);
    setMarkTime(amplified, AMPLIFIED, amplifies);
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
 * 
 * @param {number} col The column that the score note is on (start at 0)
 * @param {number} row The row that the score note is on (start at 0)
 * @returns {number} The index in the list scoreNotes that the scoreNote in the specified column and row is at.
 */
function coordinatesToIndex(col, row) {
    return row*9+col;
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