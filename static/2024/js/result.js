function collectData() {
    let contents = {};
    contents["contentType"] = "match";
    //get home data
    contents["preliminaryData"] = JSON.parse(localStorage.getItem("preliminaryData"));
    //get prematch data
    contents["startObject"] = JSON.parse(localStorage.getItem("startObject"));
    contents["roboPos"] = JSON.parse(localStorage.getItem("roboPos"));
    //get scout data
    //get auto data
    contents["autoPickUp"] = JSON.parse(localStorage.getItem("autoPickUp"))
    contents["autoMiss"] = JSON.parse(localStorage.getItem("autoMiss"))
    contents["autoDrop"] = JSON.parse(localStorage.getItem("autoDrop"))
    contents["endAuto"] = JSON.parse(localStorage.getItem("endAuto"));
    //get teleop data
    contents["pickUp"] = JSON.parse(localStorage.getItem("pickUp"));
    contents["miss"] = JSON.parse(localStorage.getItem("miss"));
    contents["drop"] = JSON.parse(localStorage.getItem("drop"));
    contents["defense"] = JSON.parse(localStorage.getItem("defense"));
    //get stage data
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