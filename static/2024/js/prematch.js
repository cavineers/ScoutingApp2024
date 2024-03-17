let objectLayout = [null, null];
const objectOrder = ["note"];

const ROBOT_POSITION = "robotPosition";
const UNSELECTED_COLOR = "#9a9280";
const NOTE_COLOR = "#f1642b";
const NOTE_BORDER_COLOR = "#f1642b";
const START = "start"; // when the match starts

document.getElementById("positionDisplay").textContent = position;

function getUTCNow() {
    let d = new Date();
    return d.toISOString();
}

window.addEventListener("load", () => {
    let button = document.getElementsByClassName("note-button");
    for (let i = 0; i<button.length; i++) {
        button[i].addEventListener("click", (ev) => {
            if (ev.button!=0) return;
            objectLayout[i] = objectOrder[(objectOrder.indexOf(objectLayout[i])+1)%objectOrder.length];
                if(objectLayout != null) {
                    button[i].style.background = NOTE_COLOR;
                    button[i].style.borderColor = NOTE_BORDER_COLOR;
                } else {
                    button[i].style.background = UNSELECTED_COLOR;
                    button[i].style.borderColor = UNSELECTED_COLOR;
                }
        });
    }
});

function followLocationSlider() {
    v = document.getElementById("robotPosition").value;
    vUnits = (v * 4.65) + "%";

    document.getElementById("location").style.left = vUnits;
}