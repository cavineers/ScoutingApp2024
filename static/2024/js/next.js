import("./prematch.js");
import("./scout.js");
import("./stage.js");
import("./result.js");

window.addEventListener("load", async () => {

    //HOME
    if(document.getElementById("submitForm") != null) {
        var namesResponse = await fetch("/names");
        /*An array containing all the country names in the world:*/
        var names = await namesResponse.json();
        (document.getElementById("name"), names);
        let submitForm = document.getElementById("submitForm");
        submitForm.addEventListener("submit", (ev) => {
            ev.preventDefault();
            const found = document.getElementsByClassName("input");
            let inputs = {};
            for(let input of found)
                inputs[input.name] = input.type == "number" ? Number(input.value) : input.value;
            //verify info
            if (!verifyInfo(inputs))
                return;
            //save info
            localStorage.setItem("preliminaryData", JSON.stringify(inputs));
            window.location.href = "/prematch.html";
        });
    }

    //PREMATCH
    if(document.getElementById("nextButton") != null) {
        const nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", (ev) => {
            if (ev.button != 0)
                return;
            //startObject: startNone|startObject2|startO
            //roboPos: left|mid|right
            localStorage.setItem("objectLayout", JSON.stringify(objectLayout));
            for (let input of document.getElementsByTagName("input")) {
                if (input.type == "radio" && !input.checked) continue;
                localStorage.setItem(input.name, JSON.stringify(input.value));
            }

            //go to next page
            window.location.href = "/scout.html";
        });
    }

    //SCOUT
    if(document.getElementById("nextButton2") != null || document.getElementById("endAuto") != null) {
        switchAuto();
        const endAutoButton = document.getElementById("endAuto");
        endAutoButton.addEventListener("click", (ev) => {
            if(ev.button != 0)
                return;
            /*
            const stageOff = document.getElementById("stageOffAuto");
            const stageOn = document.getElementById("stageOnAuto");
            const stageHarmony = document.getElementById("stageHarmonyAuto");
            */
            
            localStorage.setItem(END_AUTO_STORAGE, JSON.stringify(getUTCNow()));
            

            //end auto button
            switchTele();
        });

        //next button
        const nextButton2 = document.getElementById("nextButton2");
        nextButton2.addEventListener("click", (ev) => {
            /*
            if (ev.button != 0)
                return;
            const stageOff = document.getElementById("stageOff");
            const stageOn = document.getElementById("stageOn");
            const stageHarmony = document.getElementById("stageHarmony");
            const state = stageHarmony.checked ? stageHarmony.value :
                      stageOn.checked ? stageHarmony.value :
                      stageOff.value;
            */
            //save
            //redundant save
            localStorage.setItem(PICK_UP, JSON.stringify(pickUps));
            localStorage.setItem(MISS, JSON.stringify(misses));
            localStorage.setItem(DROP, JSON.stringify(drops));
            localStorage.setItem(DEFENSE, JSON.stringify(defenses));
            localStorage.setItem(COOPERATION, JSON.stringify(cooperations))
            localStorage.setItem(AMPLIFIED, JSON.stringify(amplifies))

            //go to stage.html
            window.location.href = "/stage.html";
        });
    }

    //STAGE
    if(document.getElementById("nextButton3") != null) {
        const nextButton3 = document.getElementById("nextButton3");
        nextButton3.addEventListener("click", (ev) => {
            if (ev.button != 0)
                return;
            const stageOff = document.getElementById("stageOff");
            const stageCommunity = document.getElementById("stageCommunity");
            const stageOn = document.getElementById("stageOn");
            const stageHarmony = document.getElementById("stageHarmony");
            const stageSpotlit = document.getElementById("stageSpotlit")
            const state = stageSpotlit.checked ? stageSpotlit.value :
                      stageCommunity.checked ? stageCommunity.value :
                      stageHarmony.checked ? stageHarmony.value :
                      stageOn.checked ? stageOn.value :
                      stageOff.value;
                    
                      
            //go to result.html
            window.location.href = "/result.html";
        });
    }
    //RESULT
    if(document.getElementById("finishButton") != null) {
        const finishButton = document.getElementById("finishButton");
        finishButton.addEventListener("click", async (ev) => {
            if (ev.button != 0)
                return;
            //TODO add any more comments, or change to set string to localStorage instead of array
            localStorage.setItem("comments", JSON.stringify([document.getElementById("commentarea1").value]));
            const data = new FormData();
            data.set("data", JSON.stringify(collectData()));
            await fetch("/upload", {
                method:"POST",
                body: data
            });

            //go back to home.html
            window.location.href = "/home.html";
        });
    }
});