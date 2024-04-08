/**
 * @param {Array.<Array.<string>>} columns The array of columns to make vertical.
 * @returns {Array.<Array.<string>>} An array of columns where each column name from the columns array is in its own array.
 */
function columnsVertical(columns) {
    var rows = [];
    for (let column of columns[0])
      rows.push([column]);
  
    return rows;
  }
  
  function teamsAreUnique(t1, t2, t3) {
    const teams = [t1, t2, t3];
    for (let i = 0; i<3; i++) {
      if (teams[i] == teams[(i+1)%3] || teams[i] == teams[(i+2)%3])
        return false;
    }
    return true;
  }
  
  function teamFill(number, fromDate, toDate, rows) {
    var relevant = [];
    for (let row of rows) { //iter through rows
      if (row[0] == number && row[3] && dateInRange(row[5], fromDate, toDate))
        relevant.push(row);
    }
  
    if(relevant.length==0) return `Team ${number} did not compete within the specified date range.`;
  
    var data = [];
    for (let i = 6; i < relevant[0].length; i++) { //iter through columns
      const avgs = getAverageValues(relevant, i);
      data.push([
        getFittingAverage(avgs.get(String(number)))
      ]);
    }
    return data;
  
  }
  
  function getAllianceAverage(v1, v2, v3) {
    return v1 + v2 + v3;
  }