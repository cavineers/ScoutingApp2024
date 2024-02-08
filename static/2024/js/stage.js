const STAGE_STORAGE = "chargeState";

const UNSELECTED_COLOR = "#777";

function getUTCNow() {
    let d = new Date();
    return d.getTime() + d.getTimezoneOffset()*60000; //60000 ms in 1 minute
}

window.addEventListener("load", () => {
    const selections = document.querySelectorAll(".node-note, .node-object2, .node-both");
    selections.forEach((selection) => {
        let node = new ScoreNode(selection);
        scoreNodes.push(node);
        setNodeClick(node);
    });

    //TODO: work on this page
});


function setMarkTime(element, storageKey, array) {
    element.addEventListener("click", (ev) => {
        if (ev.button != 0)
            return;

        array.push(getUTCNow());
        localStorage.setItem(storageKey, JSON.stringify(array));
    });
}

function updateSliderHandle(){
    
}