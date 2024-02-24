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
            // get references to various chain-related elements in the document 
            const red1 = document.getElementById("red1");
            const red2 = document.getElementById("red2");
            const red3 = document.getElementById("red3");
            const blu1 = document.getElementById("blu1");
            const blu2 = document.getElementById("blu2");
            const blu3 = document.getElementById("blu3");
            // determine the selected chain based on the checked state of radio buttons
            const robotState = red1.checked ? red1.value :
                        red2.checked ? red2.value :
                        red3.checked ? red3.value :
                        blu1.checked ? blu1.value :
                        blu2.checked ? blu2.value :
                        blu3.checked ? blu3.value :
            localStorage.setItem(ROBOT_STORAGE, JSON.stringify(robotState));  
            for (let input of document.getElementsByTagName("input")) {
                if (input.type == "radio" && !input.checked) continue;
                localStorage.setItem(input.name, JSON.stringify(input.value));
            }
            localStorage.setItem(robotOrder, JSON.stringify(robotOrder));
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
            // redirect to prematch
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
            localStorage.setItem(START, JSON.stringify(getUTCNow()));
            // save selected options to local storage
            localStorage.setItem("objectLayout", JSON.stringify(objectLayout));
            for (let input of document.getElementsByTagName("input")) {
                if (input.type == "radio" && !input.checked) continue;
                localStorage.setItem(input.name, JSON.stringify(input.value));
            }

            // redirect to scout
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
            localStorage.setItem(AUTO_PICK_UP_SOURCE, JSON.stringify(autoPickUpSources));
            localStorage.setItem(AUTO_PICK_UP_FLOOR, JSON.stringify(autoPickUpFloors));
            localStorage.setItem(AUTO_SCORED_NOTES, JSON.stringify(autoScoreNotes));
            localStorage.setItem(AUTO_MISS, JSON.stringify(autoMisses));
            localStorage.setItem(AUTO_DROP, JSON.stringify(autoDrops));
            localStorage.setItem(END_AUTO_STORAGE, JSON.stringify(getUTCNow()));

            // switch to teleop phase
            switchTele();
        });

        // add event listener to the nextButton2
        const nextButton2 = document.getElementById("nextButton2");
        nextButton2.addEventListener("click", (ev) => {
            if(ev.button != 0)
                return;
            // save scout-related data to local storage
            localStorage.setItem(PICK_UP_SOURCE, JSON.stringify(pickUpSources));
            localStorage.setItem(PICK_UP_FLOOR, JSON.stringify(pickUpFloors));
            localStorage.setItem(SCORED_NOTES, JSON.stringify(scores));
            localStorage.setItem(MISS, JSON.stringify(misses));
            localStorage.setItem(DROP, JSON.stringify(drops));
            localStorage.setItem(DEFENSE, JSON.stringify(defenses));
            localStorage.setItem(COOPERATION, JSON.stringify(cooperations));
            localStorage.setItem(AMPLIFIED, JSON.stringify(amplifies));

            // redirect to stage
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
            const chainLeft = document.getElementById("chainLeft");
            const chainCenter = document.getElementById("chainCenter");
            const chainRight = document.getElementById("chainRight");
            const chainPosition = document.getElementById("chainPosition");
            // determines the selected team you are scouting
            const state = chainLeft.checked ? chainLeft.value :
                        chainCenter.checked ? chainCenter.value :
                        chainRight.checked ? chainRight.value :  
            localStorage.setItem(CHAIN_STORAGE, JSON.stringify(state));
            localStorage.setItem(CHAIN_POSITION, JSON.stringify(chainPosition));
            localStorage.setItem(END, JSON.stringify(getUTCNow()));

            for (let input of document.getElementsByTagName("input")) {
                if (input.type == "radio" && !input.checked) continue;
                localStorage.setItem(input.name, JSON.stringify(input.value));
            }
            for (let input of document.getElementsByTagName("input")) {
                if (input.type == "range" && !input.checked) continue;
                localStorage.setItem(input.name, JSON.stringify(input.value));
            }
            // reditect to result
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
            setTimeout(() => finishButton.type = "submit", 100);
            // create FormData and send collected data to the server via POST request
            const data = new FormData();
            data.set("data", JSON.stringify(collectData()));
            await fetch("/upload", {
                method:"POST",
                body: data
            });

            // redirect back to home
            window.location.href = "/home.html";
        });
    }
});