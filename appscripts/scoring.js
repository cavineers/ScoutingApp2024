function arrayFlatten(array) {
    var rtv = [];
    for (let inner of array)
      for (let elm of inner)
        rtv.push(elm);
    return rtv;
  }
  
  /**
   * @returns {Map<string, number>}
   */
  function arrayToMap(array) {
    var rtv = new Map();
    for (let pair of array)
      rtv.set(pair[0], pair[1]);
    return rtv;
  }
  
  function getWeightedScores(averages, columns, weights) {
    var scores = new Map();
    var CHARGE_PAD_SORT_MAP = new Map();
    CHARGE_PAD_SORT_MAP.set("off", 0);
    CHARGE_PAD_SORT_MAP.set("docked", 1);
    CHARGE_PAD_SORT_MAP.set("engaged", 2);
    weights.forEach((value, column) => {
      if (!column || value=="~") return;
      const columnIndex = columns.indexOf(column);
      var n = averages[columnIndex];
      if (CHARGE_PAD_SORT_MAP.has(n))
        n = CHARGE_PAD_SORT_MAP.get(n);
      scores.set(column, n*value);
    })
  
    return scores;
  
  }
  
  function getScore(averages, columns, weights) {
    averages = arrayFlatten(averages);
    columns = arrayFlatten(columns);
    weights = arrayToMap(weights);
  
    var scores = getWeightedScores(averages, columns, weights);
  
    /*var temp = [];
    scores.forEach((value, key)=>temp.push([key, value]));
    return ["", JSON.stringify(temp)]*/
    
    var sum = 0;
    scores.forEach((value)=> sum += value);
    return sum;
  }
  
  function estimateMatchScore(averages) {
    averages = arrayFlatten(averages);
  
    var sum = 0;
    for(let point of averages) {
      sum += point;
    }
    return sum;
  }
  