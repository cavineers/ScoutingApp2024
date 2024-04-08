var CHARGE_PAD_SORT_MAP = new Map();
CHARGE_PAD_SORT_MAP.set("off", 0);
CHARGE_PAD_SORT_MAP.set("docked", 1);
CHARGE_PAD_SORT_MAP.set("engaged", 2);

/** 
 * @param {string} columnName What column to sort the leaderboard by.
 * @param {string} sortBy How to merge the different rows of data into one spot in the leaderboard.
 * @param {Array.<Array.<string|number>>} rows The rows to pull the data from. Includes the columns.
 */
function sortData(columnName, sortBy, direction, dateFrom, dateTo, rows) {
  /** @type {Array.<string>} */
  const columns = rows[0];
  rows = rows.slice(1);

  var relevant = [];
  for (let row of rows) {
    if (dateInRange(row[3], dateFrom, dateTo))
      relevant.push(row);
  }

  /** @type {number} */
  const colIndex = columns.indexOf(columnName);
  const sortMethod = SORT_METHODS[sortBy];
  if (sortMethod) {
    var sorted = sortMethod(relevant, colIndex);
    if (direction=="LOWEST")
      sorted.reverse();
    return sorted;
  }
  else
    throw new Error("Invalid Look Method\n Expected a sort method '"+"', '".concat(SORT_METHOD_NAMES)+"', got: "+sortBy);
}

function listTeams(rows) {
  var teamList = [];
  var relevant = [];
  var isUnique = true;
  relevant.push(rows[0]);
  for(let row of rows) {
    for(i = 0; i < relevant.length; i++) {
      if(row[0] == relevant[i] || row[0] == "") {
        isUnique = false;
      }
    }
    if(isUnique) {
      relevant.push(row);
      teamList.push(row);
    } else {
      isUnique = true;
    }
  }
  return fittingSort(relevant);
}

function getTeams(rows) {
  var teamList = [];
  var relevant = [];
  var isUnique = true;
  relevant.push(rows[0]);
  for(let row of rows) {
    for(i = 0; i < relevant.length; i++) {
      if(row[0] == relevant[i] || row[0] == "") {
        isUnique = false;
      }
    }
    if(isUnique) {
      relevant.push(row);
      teamList.push(row);
    } else {
      isUnique = true;
    }
  }
  return relevant;
}

function getCategory(name, rows) {
  for(let row of rows) {
    for(var i = 1; i < rows[0].length; i++) {
      if(row[i] == name) {
        return i+5;
      }
    }
  }
}

function highestOrLowest(cell) {
  if(cell == "HIGHEST") {
    return false;
  } else {
    return true;
  }
}

function showTeamScore(name, dataRows, rows, sortBy, teams) {
  var teamList = getTeams(teams);
  var relevant = new Array(teamList.length).fill(0);
  var irrelevant = new Array(teamList.length).fill(0);
  for(let row of rows) {
    for(let i = 0; i < teamList.length; i++) {
      if(row[0] == teamList[i]) {
        var tempData = row[getCategory(name, dataRows)];
        if(sortBy == "RECORD") {
          if(tempData > relevant[i]) {
            relevant[i] = tempData;
          }
        } else {
         relevant[i] += tempData;
        }
        irrelevant[i]+=1;
      }
    }
  }
  if(sortBy == "AVG") {
    for(var i = 0; i < relevant.length; i++) {
      relevant[i] = relevant[i] / irrelevant[i];
    }
  }
  return relevant;
}

//types for 2 functions below are as seen in sortData
function sortTotal(rows, colIndex) {
  var maxed = new Map();
  for (let row of rows) {
    const num = row[0];
    if (!maxed.has(num) || (row[colIndex] > maxed.get(num))) { //team number not in maxed or row value > maxed value
      maxed.set(num, row[colIndex]);
    }
  }
  
  var maxedArray = [];
  maxed.forEach((value, key) => {
    maxedArray.push([key, value]);
  });
  return fittingSort(maxedArray);
}

function numericalAverage(values) {
  const rawAvg = values.reduce((a, b) => a + b)/values.length;
  return parseFloat(rawAvg.toFixed(3));
}

function cumulativeAverage(values) {
  var appears = new Map(); //{value : appearance_count}
  for (let value of values) {
    if (appears.has(value))
      appears.set(value, appears.get(value)+1);
    else
      appears.set(value, 1);
  }

  var maxValue = values[0];

  for (let i = 1; i<values.length; i++) {
    if (appears.get(values[i]) > appears.get(maxValue))
      maxValue = values[i];
  }
  return maxValue;
}

function getFittingAverage(values) {
  return typeof values[0] == "number" ? numericalAverage(values) : cumulativeAverage(values);
}

function fittingSort(array2d) {
  if (CHARGE_PAD_SORT_MAP.has(array2d[0][1]))
      return array2d.sort((a,b) => CHARGE_PAD_SORT_MAP.get(b[1])-CHARGE_PAD_SORT_MAP.get(a[1]));
  else
    return array2d.sort((a, b) => b[1]-a[1]);
}

function sortAvg(rows, colIndex) {
  var avged = getAverageValues(rows, colIndex);
  
  var avgedArray = [];
  avged.forEach((value, key) => {
    avgedArray.push([key, getFittingAverage(value)]);
  });
  return fittingSort(avgedArray);
}

function sortRecord(rows, colIndex) {
var avged = getAverageValues(rows, colIndex);
  
  var avgedArray = [];
  avged.forEach((value, key) => {
    avgedArray.push([key, getFittingAverage(value)]);
  });
  return fittingSort(avgedArray);
}

/**
 * @param {Array.<Array.<string|int>>} rows The rows to search through for team data.
 * @param {number} colIndex The index of the column to collect data for.
 * @returns {Map<string, Array>} teamNumber -> [...value]
 */
function getAverageValues(rows, colIndex) {
  var avged = new Map();
  for (let row of rows) {
    const num = String(row[0]);
    if (avged.has(num))
      avged.get(num).push(row[colIndex]);
    else
      avged.set(num, [row[colIndex]]);
  }
  return avged;
}

const SORT_METHOD_NAMES = ["TOTAL", "RECORD", "AVG"];

const SORT_METHODS = {
  TOTAL:sortTotal,
  RECORD:sortRecord,
  AVG:sortAvg
}