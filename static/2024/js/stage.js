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