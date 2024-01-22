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

    //TODO: just work on this page, jesus christ im tired of this shit

    /*
    //track button press times
    const action1 = document.getElementById("action1");
    const action2 = document.getElementById("action2");
    const action3 = document.getElementById("action3");
    const autoAction1 = document.getElementById("auto_action1");
    const autoAction2 = document.getElementById("auto_action2");
    const autoAction3 = document.getElementById("auto_action3");
    const autoAction4 = document.getElementById("auto_action4");
    if (!localStorage.getItem(AUTO_ACTION4))
        localStorage.setItem(AUTO_ACTION4, "null");

    setMarkTime(action1, ACTION1, actions1);
    setMarkTime(action2, ACTION2, actions2);
    setMarkTime(action3, ACTION3, actions3);
    setMarkTime(autoAction1, ACTION1, actions1);
    setMarkTime(autoAction2, ACTION2, actions2);
    setMarkTime(autoAction3, ACTION3, actions3);
    

    autoAction4.addEventListener("click", (ev)=>{
        if (ev.button!=0) return;
        localStorage.setItem(AUTO_ACTION4, getUTCNow());
    })
    */
});


function setMarkTime(element, storageKey, array) {
    element.addEventListener("click", (ev) => {
        if (ev.button != 0)
            return;

        array.push(getUTCNow());
        localStorage.setItem(storageKey, JSON.stringify(array));
    });
}