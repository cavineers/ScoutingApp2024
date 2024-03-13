let chainLayout = ["left", "center", "right", "none"];
const chainOrder = ["chainLeft", "chainCenter", "chainRight", "chainNone"];

const CHAIN_STORAGE = "chain";

const CHAINLEFT = "chainLeft";
const CHAINCENTER = "chainCenter";
const CHAINRIGHT = "chainRight";
const CHAINNONE = "chainNone";

const CHAIN_POSITION = "chainPosition";
const TRAP = "trap";
const SPOTLIT = "spotlit";
const UNSELECTED_COLOR = "#9a9280";
const END = "end"; // when the match ends

window.addEventListener("load", () => {
    let chain = document.querySelectorAll(".chainLeft, .chainCenter, .chainRight, .chainNone");
    for (let i = 0; i<chain.length; i++) {
        chain[i].addEventListener("click", (ev) => {
            if (ev.button!=0) return;
            chainLayout[i] = chainOrder[(chainOrder.indexOf(chainLayout[i])+1)%chainOrder.length];
            switch(chainLayout[i]) {
                case "left":
                    chain[i].style.background = RED_COLOR;
                    chain[i].style.borderColor = RED_BORDER_COLOR;
                    break;
                case "center":
                    chain[i].style.background = RED_COLOR;
                    chain[i].style.borderColor = RED_BORDER_COLOR;
                    break;
                case "right":
                    chain[i].style.background = RED_COLOR;
                    chain[i].style.borderColor = RED_BORDER_COLOR;
                    break;
                case "none":
                    chain[i].style.background = RED_COLOR;
                    chain[i].style.borderColor = RED_BORDER_COLOR;
                    break;
                default:
                    chain[i].style.background = UNSELECTED_COLOR;
                    chain[i].style.borderColor = UNSELECTED_COLOR;
                    break;
            }
        });
    }
});


function getUTCNow() {
    let d = new Date();
    return d.getTime() + d.getTimezoneOffset()*60000; //60000 ms in 1 minute 
}

function setMarkTime(element, storageKey, array) {
    element.addEventListener("click", (ev) => {
        if (ev.button != 0)
            return;

        array.push(getUTCNow());
        localStorage.setItem(storageKey, JSON.stringify(array));
    });
}

function showStageLeft() {
    document.getElementById("stage_left_img").style.visibility = "visible";
    document.getElementById("stage_center_img").style.visibility = "hidden";
    document.getElementById("stage_right_img").style.visibility = "hidden";
}

function showStageCenter() {
    document.getElementById("stage_left_img").style.visibility = "hidden";
    document.getElementById("stage_center_img").style.visibility = "visible";
    document.getElementById("stage_right_img").style.visibility = "hidden";
}

function showStageRight() {
    document.getElementById("stage_left_img").style.visibility = "hidden";
    document.getElementById("stage_center_img").style.visibility = "hidden";
    document.getElementById("stage_right_img").style.visibility = "visible";
}

function showStageNone() {
    document.getElementById("stage_left_img").style.visibility = "hidden";
    document.getElementById("stage_center_img").style.visibility = "hidden";
    document.getElementById("stage_right_img").style.visibility = "hidden";
}

function followLocationSlider() {
    v = document.getElementById("chainPosition").value;
    vUnits = (v * 4.65) + "%";

    document.getElementById("location").style.left = vUnits;

}