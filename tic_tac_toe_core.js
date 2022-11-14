const crossedList = [
    [
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    [
      [2, 1],
      [2, 2],
      [2, 3],
    ],
    [
      [3, 1],
      [3, 2],
      [3, 3],
    ],
    [
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    [
      [3, 1],
      [2, 2],
      [1, 3],
    ],
  ];
  let selectedBoxInCrossedList = new Map([  // is the opponent's selected box is in the elements of the crossedList
    ["0", false],
    ["1", false],
    ["2", false],
    ["3", false],
    ["4", false],
    ["5", false],
    ["6", false],
    ["7", false],
  ]);
  let probableChosenList = new Map();   // 0:(index of the list in crossedList)
  let elCount = new Map(); //number of element that are already selected are in the chosen list // (index of the list in crossedList):count
  // for defensing an attack
  let nextMoveFoundDef = new Map([["0", false],["1", false],["2", false],["3", false],["4", false],["5", false],["6", false],["7", false],]);
  // for attacking  // for which move the computer will be the winner  
  let nextMoveFoundAtk = new Map([["0", false],["1", false],["2", false],["3", false],["4", false],["5", false],["6", false],["7", false],]);
  let countSelectedbox1 = 0; 
  let countSelectedbox2 = 0; 
  // let selectedbox1 = [
  //   [1, 1],
  //   [2, 3],
  //   [3, 3],
  //   [1, 2]
  // ];
  // let selectedbox2 = [
  //   [3, 1],
  //   [3, 2],
  //   [1, 3]
  // ];
  
  let selectedbox1 = [
    [2, 2],
    [2, 1],
    [1, 3],
    [3, 2]
  ];
  let selectedbox2 = [
    [1, 2],
    [2, 3],
    [3, 1]
  ];
  let cornerBoxes = [[1, 1], [1, 3], [3, 1], [3, 3]];
  let middleBox = [[2, 2]];
  let middleSideBox = [[1, 2], [2, 1], [2, 3], [3, 2]];
  let option = [];
  let hasElementInSelectedbox1 = false;
  let hasElementInSelectedbox2 = false;
  let nextMoveFound = false;
  let trickfordef = false;
  let nextMoveDone = false;
  let count = 0;
  let index = 0;
  let n = 0;
  let r, c;
  if((selectedbox1.length+selectedbox2.length+1) == 1){
    n = Math.floor(Math.random()*cornerBoxes.length);
    option.push(cornerBoxes[n]);
    console.log(option);
    nextMoveDone = true;
  }
  else if((selectedbox1.length+selectedbox2.length+1) == 3){
    if(inSelectedbox(selectedbox1[0], middleBox) && inSelectedbox(selectedbox2[0], cornerBoxes)){
      if(selectedbox2[0].toString().localeCompare('1,1')==0){
        console.log(selectedbox2[0].toString().localeCompare('1,1'));
        option.push([3, 3]);
      }
      else if(selectedbox2[0].toString().localeCompare('1,3')==0){
        option.push([3, 1]);
      }
      else if(selectedbox2[0].toString().localeCompare('3,1')==0){
        option.push([1, 3]);
      }
      else if(selectedbox2[0].toString().localeCompare('3,3')==0){
        option.push([1, 1]);
      }
      nextMoveDone = true;
    }
    else{
      if(selectedbox1[0][0]==selectedbox2[0][0]){
        c = selectedbox2[0][1];
        r = (selectedbox2[0][0]==3)?1:3;
        option.push([r, c])
      }
      else if(selectedbox1[0][1]==selectedbox2[0][1]){
        r = selectedbox2[0][0];
        c = (selectedbox2[0][1]==3)?1:3;
        option.push([r, c])
      }
      else{
        if(Math.floor(Math.random()*2)==1){
          r = selectedbox2[0][0];
          c = (selectedbox2[0][1]==3)?1:3;
          option.push([r, c])
        }
        else{
          r = (selectedbox2[0][0]==3)?1:3;
          c = selectedbox2[0][1];
          option.push([r, c])
        }
      }
    }
    console.log(option);
  }
  else if((selectedbox1.length+selectedbox2.length+1)==2){
    if(inSelectedbox(selectedbox1[0], cornerBoxes)){
      option.push([2, 2]);
      console.log(option);
      nextMoveDone =true;
    }
  }
  else if((selectedbox1.length+selectedbox2.length+1) == 4){
    if(inSelectedbox(selectedbox1[1], cornerBoxes)){
      n = Math.floor(Math.random()*cornerBoxes.length);
      option.push(cornerBoxes[n]);
      console.log(option);
      nextMoveDone = true;
    }
  }
  if(!nextMoveDone){
    for (let i = 0; i < crossedList.length; i++) {
      countSelectedbox1 = 0;
      countSelectedbox2 = 0;
      for (let j = 0; j < crossedList[i].length; j++) {
        for (let k = 0; k < selectedbox1.length; k++) {
    
          if (crossedList[i][j].toString().localeCompare(selectedbox1[k].toString()) == 0) {
            selectedBoxInCrossedList.set(`${i}`, true);
            countSelectedbox1++;
            if (countSelectedbox1 == 2) {
              nextMoveFoundDef.set(`${i}`,true);
            }
          }
        }
    
        for (let k = 0; k < selectedbox2.length; k++){
          if(crossedList[i][j].toString().localeCompare(selectedbox2[k].toString()) == 0){
            countSelectedbox2++;
            if (countSelectedbox2 == 2) {
              nextMoveFoundAtk.set(`${i}`,true);
            }
          }
        }
      }
      if (selectedBoxInCrossedList.get(`${i}`) == false) {
        probableChosenList.set(`${index}`, i);
        index++;
      }
    }
    // first, checking if there is any wining move
    if(!nextMoveFound){
      for(let j=0;j<8;j++){
        if(nextMoveFoundAtk.get(`${j}`)==true){
          console.log("attacking");
          nextMove(crossedList[j]);
        }
        if(nextMoveFound){
          break;
        }
      }
    }
    if(!nextMoveFound){
      // checking if there is any wining move of the opponent that need to be defensed
      for(let j=0;j<8;j++){
        if(nextMoveFoundDef.get(`${j}`)==true){
          console.log("defensing");
          nextMove(crossedList[j]);
        }
        if(nextMoveFound){
          break;
        }
      }
    }
    if (!nextMoveFound && probableChosenList.size!=0) {
      for (let i = 0; i < probableChosenList.size; i++) {
        // console.log("probable", crossedList[probableChosenList.get(`${i}`)]);
        count = 0;
        // console.log(crossedList[probableChosenList.get(`${i}`)], i);
    
        for (let p = 0;p < crossedList[probableChosenList.get(`${i}`)].length;p++) {
    
          for (let q = 0; q < selectedbox2.length; q++) {
            if (
              crossedList[probableChosenList.get(`${i}`)][p]
                .toString()
                .localeCompare(selectedbox2[q].toString()) == 0
            ) {
              // console.log(crossedList[i][p])
              count++;
            }
          }
    
        }
    
        index = probableChosenList.get(`${i}`);
        elCount.set(`${index}`, count);
      }
      let maxIndex = probableChosenList.get('0');
      let maximum = elCount.get(`${maxIndex}`);
    
      for(let i = 1; i<probableChosenList.size;i++){
        index = probableChosenList.get(`${i}`);
        if(elCount.get(`${index}`) > maximum){
            maxIndex = index;
            maximum = elCount.get(`${index}`);
        }
      }
    
      nextMove(crossedList[maxIndex]);
      console.log(maxIndex, maximum);
    }
    else if(!nextMoveFound){
      console.log("option list", option);
      option.push(emptyBox());
      console.log("option list", option);
      nextMoveFound = true;
    }
  }
  // console.log(nextMoveFoundAtk)
  // console.log(nextMoveFoundDef)
  
  function nextMove(chosenList) {
    let option = [];
    let result;
    let hasElementInSelectedbox1 = false;
    let hasElementInSelectedbox2 = false;
    for (let i = 0; i < chosenList.length; i++) {
      hasElementInSelectedbox1 = inSelectedbox(chosenList[i], selectedbox1);
      hasElementInSelectedbox2 = inSelectedbox(chosenList[i], selectedbox2);
      if (hasElementInSelectedbox1 == false && hasElementInSelectedbox2 == false) {
        option.push(chosenList[i]);
      }
    }
    if(option.length>=2){
        result = mostEffectiveMove();
    }
    if(option.length != 0 && result==undefined){
      console.log(chosenList);
      console.log(`in the function: ${option}`);
      nextMoveFound = true;
    }
    
    console.log("next move found", nextMoveFound);
  }
  
  //this below function finds a move that is common to two probable list
  function mostEffectiveMove(){
    let index = 0;
    let index1 = 0;
    for(let i=0;i<elCount.size;i++){
      index = probableChosenList.get(`${i}`);
      for(let j = 0; j<elCount.size;j++){
        index1 = probableChosenList.get(`${j}`);
        if(elCount.get(`${index}`) != 0 && elCount.get(`${index1}`)!=0 && i!=j && j!=(i-1)){
          for(let k =0;k<3;k++){
            for(let p = 0;p<3;p++){
              if(!inSelectedbox(crossedList[index][k], selectedbox1) && !inSelectedbox(crossedList[index][k], selectedbox2) && !inSelectedbox(crossedList[index1][p], selectedbox1) && !inSelectedbox(crossedList[index1][p], selectedbox2)){
                if(crossedList[index][k].toString().localeCompare(crossedList[index1][p].toString()) == 0 ){
                  console.log(crossedList[index][k]);
                  return crossedList[index][k];
                }
              }
            }
          }
        }
      }
    }
    return undefined;
  }
  function inSelectedbox(element, selectedbox){
    for (let j = 0; j < selectedbox.length; j++) {
      if (
        element.toString().localeCompare(selectedbox[j].toString()) == 0 
        ) {
        return true;
      }
    }
    return false;
  }
  
  function emptyBox(){
    let inTheBox = false;
    for(let i=0;i<crossedList.length;i++){
      for (let j = 0; j < crossedList[i].length; j++) {
        inTheBox = false;
        for (let k = 0; k < selectedbox1.length; k++) {
    
          if (crossedList[i][j].toString().localeCompare(selectedbox1[k].toString()) == 0) {
            inTheBox = true;
            break;
          }
        }
        if(!inTheBox){
          for (let k = 0; k < selectedbox2.length; k++){
            if(crossedList[i][j].toString().localeCompare(selectedbox2[k].toString()) == 0){
              inTheBox = true;
              break;
            }
          }
        }
        if(!inTheBox){
          return crossedList[i][j];
        }
      }
    }
  }