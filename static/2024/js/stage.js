const CHAIN_STORAGE = "chainState";
const CHAIN_LEFT = "chainLeft";
const CHAIN_CENTER = "chainCenter";
const CHAIN_RIGHT = "chainRight";
const CHAIN_POSITION = "chainPosition";
const UNSELECTED_COLOR = "#9a9280";


    //TODO: work on this page


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

function followLocationSlider() {
    v = document.getElementById("chainPosition").innerHTML;
    vUnits = v.concat("px")

    document.getElementById("location").style.transform = "translateX(vUnits)";

}