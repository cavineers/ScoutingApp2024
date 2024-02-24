/** @type {Array.<ScoreNote>} */
let scoreNotes = [];
/** @type {Array.<number>} */
let autoPickUpSources = []
/** @type {Array.<number>} */
let autoPickUpFloors = []
/** @type {Array.<number>} */
let autoScoreNotes = [];
/** @type {Array.<number>} */
let autoMisses = []
/** @type {Array.<number>} */
let autoDrops = []
/** @type {Array.<number>} */
let pickUpSources = []
/** @type {Array.<number>} */
let pickUpFloors = []
/** @type {Array.<number>} */
let scores = [];
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

const AUTO_PICK_UP_SOURCE = "autoPickUpSource"; // picks up note from source during auto
const AUTO_PICK_UP_FLOOR = "autoPickUpFloor"; // picks up note from floor during auto
const AUTO_SCORED_NOTES = "autoScoreNote"; // scored notes during auto
const AUTO_MISS = "autoMiss"; // misses with note during auto
const AUTO_DROP = "autoDrop"; // drops note during auto
const PICK_UP_SOURCE = "pickUpSource"; // picks up note from amp during teleop
const PICK_UP_FLOOR = "pickUpFloor"; // picks up note from floor during teleop
const SCORED_NOTES = "scoreNote"; // scored notes during teleop
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

document.addEventListener("DOMContentLoaded", function() {var undoContainer = document.getElementById("undoContainer");});

var undoValues = [];

var displayTime = "00:00:00";
var seconds = 0;
var minutes = 0;
var hours = 0;

function updateTime() {
  seconds++;
  if (seconds==60) {
      seconds = 0;
      minutes++;
  }
  if (minutes==60) {
      minutes = 0;
      hours++;
  }
  if (seconds < 10) {displaySeconds = "0" + seconds;} else {displaySeconds = seconds;}
  if (minutes < 10) {displayMinutes = "0" + minutes;} else {displaySeconds = minutes;}
  if (hours < 10) {displayHours = "0" + hours;} else {displaySeconds = hours;}
  displayTime = displayHours + ":" + displayMinutes + ":" + displaySeconds;
}

setInterval(updateTime, 1000);

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
    const autoPickUpSource = document.getElementById("autoPickUpSource"); // get the element with the ID "autoPickUpSource"
    const autoPickUpFloor = document.getElementById("autoPickUpFloor"); // get the element with the ID "autoPickUpFloor"
    const autoScoreNote = document.getElementById("autoScoreNote"); // get the element with the ID "autoPickUpFloor"
    const autoMiss = document.getElementById("autoMiss"); // get the element with the ID "autoMiss"
    const autoDrop = document.getElementById("autoDrop"); // get the element with the ID "autoDrop"
    const pickUpSource = document.getElementById("pickUpSource"); // get the element with the ID "pickUpSource"
    const pickUpFloor = document.getElementById("pickUpFloor"); // get the element with the ID "pickUpFloor"
    const scoreNote = document.getElementById("scoreNote"); // get the element with the ID "pickUpFloor"
    const miss = document.getElementById("miss"); // get the element with the ID "miss"
    const drop = document.getElementById("drop"); // get the element with the ID "drop"
    const defense = document.getElementById("defense"); // get the element with the ID "defense"
    const cooperation = document.getElementById("cooperation"); // get the element with the ID "cooperation"
    const amplified = document.getElementById("amplified"); // get the element with the ID "amplified"

    setMarkTime(autoPickUpSource, AUTO_PICK_UP_SOURCE, autoPickUpSources); // set a mark time for the element with ID "autoPickUpSource"
    setMarkTime(autoPickUpFloor, AUTO_PICK_UP_FLOOR, autoPickUpFloors); // set a mark time for the element with ID "autoPickUpFloor"
    setMarkTime(autoScoreNote, AUTO_SCORED_NOTES, autoScoreNotes); // set a mark time for the element with ID "autoPickUpFloor"
    setMarkTime(autoMiss, AUTO_MISS, autoMisses); // set a mark time for the element with ID "autoMiss"
    setMarkTime(autoDrop, AUTO_DROP, autoDrops); // set a mark time for the element with ID "autoDrop"
    setMarkTime(pickUpSource, PICK_UP_SOURCE, pickUpSources); // set a mark time for the element with ID "pickUpSource"
    setMarkTime(pickUpFloor, PICK_UP_FLOOR, pickUpFloors); // set a mark time for the element with ID "pickUpFloor"
    setMarkTime(scoreNote, SCORED_NOTES, scores); // set a mark time for the element with ID "scoreNote"
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

        var button = document.createElement("button");
       undoValues[undoValues.length] = 1
       button.classList.add("undo_button")
       button.textContent = displayTime + " - " + element.innerHTML;
       button.number = undoValues.length
       button.addEventListener("click", function() {
           if (undoValues[button.number] == 1) {
               button.style.textDecoration = "line-through";
               button.style.backgroundColor = "#505050";
               button.style.color = "#808080";
               undoValues[button.number] = 0
           } else {
               button.style.textDecoration = "none";
               button.style.backgroundColor = "#727272";
               button.style.color = "white";
               undoValues[button.number] = 1
           }
       });
       undoContainer.insertAdjacentElement('afterbegin', button)
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