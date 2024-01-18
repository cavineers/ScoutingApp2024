let objectLayout = [null, null, null];
const objectOrder = ["note"];

const UNSELECTED_COLOR = "#777";
const NOTE_COLOR = "#ff0";
const NOTE_BORDER_COLOR = "#cc0";

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