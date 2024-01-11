let objectLayout = [null, null, null];
const objectOrder = ["note", "object2", null];

const UNSELECTED_COLOR = "#777";
const NOTE_COLOR = "#ff0";
const NOTE_BORDER_COLOR = "#cc0";
const OBJECT2_COLOR = "#b0f";
const OBJECT2_BORDER_COLOR = "#80c";

window.addEventListener("load", () => {
    let buttons = document.getElementsByClassName("node-both");
    for (let i = 0; i<buttons.length; i++) {
        buttons[i].addEventListener("click", (ev) => {
            if (ev.button!=0) return;
            objectLayout[i] = objectOrder[(objectOrder.indexOf(objectLayout[i])+1)%objectOrder.length];
            switch(objectLayout[i]) {
                case "note":
                    buttons[i].style.background = NOTE_COLOR;
                    buttons[i].style.borderColor = NOTE_BORDER_COLOR;
                    break;
                case "object2":
                    buttons[i].style.background = OBJECT2_COLOR;
                    buttons[i].style.borderColor = OBJECT2_BORDER_COLOR;
                    break;
                default:
                    buttons[i].style.background = UNSELECTED_COLOR;
                    buttons[i].style.borderColor = UNSELECTED_COLOR;
                    break;
            }
        });
    }
});