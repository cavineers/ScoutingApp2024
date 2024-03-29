// function to collect and organize various types of match data and return it as a JSON string (submission.txt)
function collectData() {
    // create an object to store collected data
    let contents = {};

    // identify the type of content as "match"
    contents["contentType"] = "match";

    // retrieve and store preliminary match data
    contents["robotState"] = JSON.parse(localStorage.getItem("robotState"));
    contents["preliminaryData"] = JSON.parse(localStorage.getItem("preliminaryData"));
    contents["formatted_upload_date"] = JSON.parse(localStorage.getItem("formatted_upload_date"));
    contents["start"] = JSON.parse(localStorage.getItem("start"));

    // retrieve and store pre-match data
    contents["startObject"] = JSON.parse(localStorage.getItem("startObject"));
    contents["robotPosition"] = JSON.parse(localStorage.getItem("robotPosition"));

    // retrieve and store scout data for the auto phase
    contents["autoPickUpSource"] = JSON.parse(localStorage.getItem("autoPickUpSource"));
    contents["autoPickUpFloor"] = JSON.parse(localStorage.getItem("autoPickUpFloor"));
    contents["autoScoreSpeaker"] = JSON.parse(localStorage.getItem("autoScoreSpeaker"));
    contents["autoScoreAmp"] = JSON.parse(localStorage.getItem("autoScoreAmp"));
    contents["autoMiss"] = JSON.parse(localStorage.getItem("autoMiss"));
    contents["autoDrop"] = JSON.parse(localStorage.getItem("autoDrop"));
    contents["endAuto"] = JSON.parse(localStorage.getItem("endAuto"));

    // retrieve and store scout data for the teleop phase
    contents["pickUpSource"] = JSON.parse(localStorage.getItem("pickUpSource"));
    contents["pickUpFloor"] = JSON.parse(localStorage.getItem("pickUpFloor"));
    contents["scoreSpeaker"] = JSON.parse(localStorage.getItem("scoreSpeaker"));
    contents["scoreAmp"] = JSON.parse(localStorage.getItem("scoreAmp"));
    contents["miss"] = JSON.parse(localStorage.getItem("miss"));
    contents["drop"] = JSON.parse(localStorage.getItem("drop"));
    contents["defense"] = JSON.parse(localStorage.getItem("defense"));
    contents["cooperation"] = JSON.parse(localStorage.getItem("cooperation"));
    contents["amplified"] = JSON.parse(localStorage.getItem("amplified"));

    // retrieve and store stage-related data
    contents["chainState"] = JSON.parse(localStorage.getItem("chainState"));
    contents["chainPosition"] = JSON.parse(localStorage.getItem("chainPosition"));
    contents["trap"] = JSON.parse(localStorage.getItem("trap"));

    // retrieve and store result-related data (e.g., comments)
    contents["comments"] = JSON.parse(localStorage.getItem("comments"));
    contents["end"] = JSON.parse(localStorage.getItem("end"));

    // retrieve and store navigation timestamps
    contents["navStamps"] = JSON.parse(localStorage.getItem("navStamps"));

    // return the collected data as a JSON string
    return JSON.stringify(contents);
}

function handleClick() {
  document.getElementById("finishButton").disabled = true;
}

/** @param {Array.<ScoreNote>} array */
function trimScoreGrid(array) {
    if (array==null || !array) return [];
    const histories = array.map((scoreNote) => scoreNote.history);
    console.log(histories);
    let rtv = {};
    //store only the indexes that have values
    for (let i in histories) {
      if (Object.keys(histories[i]).length > 0)
        rtv[i] = histories[i];
    }
    return rtv;
  }