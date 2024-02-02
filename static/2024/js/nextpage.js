window.addEventListener("load", async () => {

    // HOME PAGE
    if(document.getElementById("submitForm") != null) {
        /*An array containing all the country names in the world:*/
        var namesResponse = await fetch("/names");
        var names = await namesResponse.json();
        (document.getElementById("name"), names);
        // add event listener to the submitForm
        let submitForm = document.getElementById("submitForm");
        submitForm.addEventListener("submit", (ev) => {
            ev.preventDefault();
            // collect form inputs into an object
            const found = document.getElementsByClassName("input");
            let inputs = {};
            for(let input of found)
                inputs[input.name] = input.type == "number" ? Number(input.value) : input.value; 
            // verify the collected information
            if (!verifyInfo(inputs))
                return;
            // save the collected information to local storage
            localStorage.setItem("preliminaryData", JSON.stringify(inputs));          
            // redirect to prematch.html
            window.location.href = "/prematch.html";
        });
    }

    // PREMATCH PAGE
    if(document.getElementById("nextButton") != null) {
        // add event listener to the nextButton
        const nextButton = document.getElementById("nextButton");
        nextButton.addEventListener("click", (ev) => {
            if (ev.button != 0)
                return;       
            // save selected options to local storage
            localStorage.setItem("objectLayout", JSON.stringify(objectLayout));
            for (let input of document.getElementsByTagName("input")) {
                if (input.type == "radio" && !input.checked) continue;
                localStorage.setItem(input.name, JSON.stringify(input.value));
            }

            // redirect to scout.html
            window.location.href = "/scout.html";
        });
    }

    // SCOUT PAGE
    if(document.getElementById("nextButton2") != null || document.getElementById("endAuto") != null) {
        // switch the auto phase
        switchAuto();
        // add event listener to the endAutoButton
        const endAutoButton = document.getElementById("endAuto");
        endAutoButton.addEventListener("click", (ev) => {
            if(ev.button != 0)
                return;
        
            // save auto-related data to local storage
            localStorage.setItem(AUTO_PICK_UP, JSON.stringify(autoPickUps))
            localStorage.setItem(AUTO_MISS, JSON.stringify(autoMisses))
            localStorage.setItem(AUTO_DROP, JSON.stringify(autoDrops))
            localStorage.setItem(END_AUTO_STORAGE, JSON.stringify(getUTCNow()));

            // switch to teleop phase
            switchTele();
        });

        // add event listener to the nextButton2
        const nextButton2 = document.getElementById("nextButton2");
        nextButton2.addEventListener("click", (ev) => {
            // save scout-related data to local storage
            localStorage.setItem(PICK_UP, JSON.stringify(pickUps));
            localStorage.setItem(MISS, JSON.stringify(misses));
            localStorage.setItem(DROP, JSON.stringify(drops));
            localStorage.setItem(DEFENSE, JSON.stringify(defenses));
            localStorage.setItem(COOPERATION, JSON.stringify(cooperations))
            localStorage.setItem(AMPLIFIED, JSON.stringify(amplifies))

            // redirect to stage.html
            window.location.href = "/stage.html";
        });
    }

    // STAGE PAGE
    // check if an element with the ID "nextButton3" exists in the document
    if (document.getElementById("nextButton3") != null) {
        // if the element exists, get a reference to it
        const nextButton3 = document.getElementById("nextButton3");

        // add a click event listener to the "nextButton3" element
        nextButton3.addEventListener("click", (ev) => {
            // check if the click event is the primary button (usually left mouse button)
            if (ev.button != 0)
                return;

            // get references to various stage-related elements in the document
            const stageOff = document.getElementById("stageOff");
            const stageCommunity = document.getElementById("stageCommunity");
            const stageOn = document.getElementById("stageOn");
            const stageHarmony = document.getElementById("stageHarmony");
            const stageSpotlit = document.getElementById("stageSpotlit");

            // determine the selected stage based on the checked state of radio buttons
            const state = stageSpotlit.checked ? stageSpotlit.value :
                        stageCommunity.checked ? stageCommunity.value :
                        stageHarmony.checked ? stageHarmony.value :
                        stageOn.checked ? stageOn.value :
                        stageOff.value;

            // reditect to result.html
            window.location.href = "/result.html";
        });
    }


    // RESULT PAGE
    if(document.getElementById("finishButton") != null) {
        // add event listener to the finishButton
        const finishButton = document.getElementById("finishButton");
        finishButton.addEventListener("click", async (ev) => {
            if (ev.button != 0)
                return;

            // save comments to local storage
            localStorage.setItem("comments", JSON.stringify([document.getElementById("commentarea1").value]));

            // create FormData and send collected data to the server via POST request
            const data = new FormData();
            data.set("data", JSON.stringify(collectData()));
            await fetch("/upload", {
                method:"POST",
                body: data
            });

            // redirect back to home.html
            window.location.href = "/home.html";
        });
    }
});