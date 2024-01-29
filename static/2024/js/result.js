function collectData() {
    let contents = {};
    contents["contentType"] = "match";
    //get home data
    contents["preliminaryData"] = JSON.parse(localStorage.getItem("preliminaryData"));
    //get prematch data
    contents["startObject"] = JSON.parse(localStorage.getItem("startObject"));
    contents["roboPos"] = JSON.parse(localStorage.getItem("roboPos"));
    contents["objectLayout"] = JSON.parse(localStorage.getItem("objectLayout"));
    //get scout data
    contents["pick up"] = JSON.parse(localStorage.getItem("pick up"));
    contents["miss"] = JSON.parse(localStorage.getItem("miss"));
    contents["drop"] = JSON.parse(localStorage.getItem("drop"));
    contents["defense"] = JSON.parse(localStorage.getItem("defense"));
    contents["endAuto"] = JSON.parse(localStorage.getItem("endAuto"));
    //get stage data
    contents["autoStageState"] = JSON.parse(localStorage.getItem("autoStageState"));
    contents["stageState"] = JSON.parse(localStorage.getItem("stageState"));
    //get result data
    contents["comments"] = JSON.parse(localStorage.getItem("comments"));
    //get navigation timestamps
    contents["navStamps"] = JSON.parse(localStorage.getItem("navStamps"));
    return JSON.stringify(contents);
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