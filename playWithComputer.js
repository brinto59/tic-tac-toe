obj1 = {
  name: "user-1",
  selectedbox: [],
};
obj2 = {
  name: "Computer",
  selectedbox: [],
};
let isObj1 = true;
let sleep = false;

wins = false;
let user_1_sign = "X";
let user_2_sign = "O";
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
const inputContainer = document.querySelector(".input-container");
const winnerContainer = document.querySelector(".winner-container");
const mainBody = document.querySelector(".main-body");
const lineDiv = document.querySelector(".line");
const box = document.querySelectorAll(".box");
const reset = document.getElementById("reset");
const playerCard = document.querySelectorAll(".playerCard");
const user_1 = document.getElementById("user_1");
const user_2 = document.getElementById("user_2");
const score_1 = document.getElementById("score_1");
const score_2 = document.getElementById("score_2");
const user_1_sign_span = document.getElementById("user_1_sign");
const user_2_sign_span = document.getElementById("user_2_sign");
const X_O = document.querySelectorAll(".X-O");
const sign = document.querySelectorAll(".sign");
const playBtn = document.querySelector(".play");
const backBtn = document.querySelector(".back");
const first_user_input = document.getElementById("user-1-name");
//   const second_user_input = document.getElementById("user-2-name");
const playAgain = document.querySelector(".playagain");
const backWinner = document.querySelector(".back_winner");
let winnerHead = document.querySelector(".head_winner");
let winnerCard = document.querySelector(".winner_card");
let score1 = 0;
let score2 = 0;
let interval;


const rect = document.querySelectorAll(".rectangular");
rect[0].style.visibility = "hidden";
rect[1].style.visibility = "hidden";


// for computer
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
mainBody.addEventListener("click", (e) => {
  if (e.target.dataset.clicked === "false") {
    if (isObj1 == true && wins == false && sleep == false) {
      e.target.dataset.clicked = "true";
      clearInterval(interval);
      obj1.selectedbox.push([e.target.dataset.row, e.target.dataset.col]);
      e.target.innerHTML = user_1_sign;
      isObj1 = false;
      if (obj1.selectedbox.length >= 3) {
        crossArray(obj1.selectedbox, user_1.innerHTML);
      }
    }
    
    computerRun();
    console.log(obj1.selectedbox);
    console.log(obj2.selectedbox);
  }
  if (obj1.selectedbox.length + obj2.selectedbox.length == 9 && wins == false) {
    winnerfound("none", 1);
  }
});

reset.addEventListener("click", (e) => {
  resetGame();
  if(!isObj1){
    computerRun();
  }
});
X_O.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("X-1") ||
      e.target.classList.contains("O-2")
    ) {
      sign[0].dataset.checked = "true";
      sign[1].dataset.checked = "false";
      design(sign[0]);
      removeDesign(sign[1]);
    } else if (
      e.target.classList.contains("O-1")
    ) {
      sign[0].dataset.checked = "false";
      sign[1].dataset.checked = "true";
      design(sign[1]);
      removeDesign(sign[0]);
    }
  });
});
playBtn.addEventListener("mouseup", (e) => {
  playBtn.style.transform = "translate(0px,-2px)";
});
playBtn.addEventListener("mousedown", (e) => {
  playBtn.style.transform = "translate(0px,2px)";
});
backBtn.addEventListener("mouseup", (e) => {
  backBtn.style.transform = "translate(0px,-2px)";
});
backBtn.addEventListener("mousedown", (e) => {
  backBtn.style.transform = "translate(0px,2px)";
});
playBtn.addEventListener("click", (e) => {
  if (first_user_input.value.trim().localeCompare("") == 0) {
    first_user_input.placeholder = "Type your name!";
  }
  if (
    first_user_input.value.trim().localeCompare("") != 0 &&
    first_user_input.value.trim().length <= 7
  ) {
    inputContainer.style.display = "none";
    user_1.innerHTML = first_user_input.value;
  }
  if (first_user_input.value.trim().length > 7) {
    first_user_input.value = "";
    first_user_input.placeholder = "Max 7 Characters!!";
  }

  if (sign[0].dataset.checked.localeCompare("true") == 0) {
    user_1_sign = "X";
    user_1_sign_span.innerHTML = "X";
    user_2_sign = "O";
    user_2_sign_span.innerHTML = "O";
  } else if (sign[1].dataset.checked.localeCompare("true") == 0) {
    user_1_sign = "O";
    user_1_sign_span.innerHTML = "O";
    user_2_sign = "X";
    user_2_sign_span.innerHTML = "X";
  }
  if(!isObj1){
    computerRun();
  }
});
backBtn.addEventListener("click", (e)=>{
  window.location.href = "./index.html";
});
playAgain.addEventListener("mouseup", (e) => {
  playAgain.style.transform = "translate(0px,-2px)";
});
playAgain.addEventListener("mousedown", (e) => {
  playAgain.style.transform = "translate(0px,2px)";
});
backWinner.addEventListener("mouseup", (e) => {
  backWinner.style.transform = "translate(0px,-2px)";
});
backWinner.addEventListener("mousedown", (e) => {
  backWinner.style.transform = "translate(0px,2px)";
});
backWinner.addEventListener("click", (e)=>{
  window.location.href = "./index.html";
});
playAgain.addEventListener("click", (e) => {
  winnerContainer.style.zIndex = "-4";
  winnerCard.style.opacity = "0";
  clear();
});
function crossArray(selectedbox, user) {
  let output = [];
  let diff_row = 1;
  let diff_col = 1;
  let p = 0;
  let q;
  let broke = false;
  let length = selectedbox.length;

  selectedbox.sort((a, b) => {
    if (a[0] == b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  for (let k = 0; k < 4; k++) {
    if (k == 1) {
      diff_row = 1;
      diff_col = -1;
    } else if (k == 2) {
      diff_row = 1;
      diff_col = 0;
    } else if (k == 3) {
      diff_row = 0;
      diff_col = 1;
    }
    for (let i = 0; i < length - 1; i++) {
      q = i;
      output[p++] = selectedbox[i];
      for (let j = i + 1; j < length; j++) {
        if (
          selectedbox[j][0] - selectedbox[q][0] == diff_row &&
          selectedbox[j][1] - selectedbox[q][1] == diff_col
        ) {
          output[p++] = selectedbox[j];
          q = j;
        }
        if (output.length == 3) {
          broke = true;
          check(output, user, diff_row, diff_col);
          wins = true;
          break;
        }
      }
      if (broke) {
        break;
      }
      p = 0;
    }
    if (broke) {
      break;
    }
  }
}

function check(crossedLine, user, diff_row, diff_col) {
  if (diff_row == 1 && diff_col == 1) {
    crossLine(user, 1, 1, 40, 300);
  } else if (diff_row == 1 && diff_col == -1) {
    crossLine(user, 1, 1, 140, 300);
  } else if (diff_row == 1 && diff_col == 0) {
    crossLine(user, crossedLine[1][0] - 1, crossedLine[1][1] - 1, 90, 270);
  } else if (diff_row == 0 && diff_col == 1) {
    crossLine(user, crossedLine[1][0] - 1, crossedLine[1][1] - 1, 0, 270);
  }

  if (user.localeCompare(user_1.innerHTML) == 0) {
    score1++;
    score_1.innerHTML = score1;
  } else {
    score2++;
    score_2.innerHTML = score2;
  }
}

function crossLine(user, row, col, rotate, lineWidth) {
  let element = box[row * 3 + col];

  element.style.color = "#b4b5b8";
  box.forEach((element) => {
    element.style.borderColor = "#b4b5b8";
  });
  if (rotate == 90) {
    box[(row - 1) * 3 + col].style.color = "#b4b5b8";
    box[(row + 1) * 3 + col].style.color = "#b4b5b8";
  } else if (rotate == 140) {
    box[(row - 1) * 3 + col + 1].style.color = "#b4b5b8";
    box[(row + 1) * 3 + col - 1].style.color = "#b4b5b8";
  } else if (rotate == 40) {
    box[(row - 1) * 3 + col - 1].style.color = "#b4b5b8";
    box[(row + 1) * 3 + col + 1].style.color = "#b4b5b8";
  } else {
    box[row * 3 + col - 1].style.color = "#b4b5b8";
    box[row * 3 + col + 1].style.color = "#b4b5b8";
  }

  let top =
    element.getBoundingClientRect().top - mainBody.getBoundingClientRect().top; //relative to main-body's top
  let left =
    element.getBoundingClientRect().left -
    mainBody.getBoundingClientRect().left; //relative to main-body's left
  let height = element.getBoundingClientRect().height;
  let width = element.getBoundingClientRect().width;
  lineDiv.style.visibility = "visible";
  lineDiv.style.width = `${lineWidth}px`;
  lineDiv.style.top = `${top + height / 2}px`;
  lineDiv.style.left = `${left + width / 2 - lineWidth / 2}px`;
  // console.log(left - width, top + height / 2, height, width);
  lineDiv.style.transform = `rotate(${rotate}deg)`;
  console.log(user, "Basob paul brinto");
  winnerfound(user, 0);
}

function resetGame() {
  score1 = 0;
  score2 = 0;
  score_1.innerHTML = score1;
  score_2.innerHTML = score2;
  clearInterval(interval);
  isObj1 = true;
  clear();
}

function design(element) {
  element.style.color = "white";
  element.style.background = "#36e925b0";
}

function removeDesign(element) {
  element.style.color = "rgb(150, 150, 150)";
  element.style.background = "white";
}
function clear() {
  for (let i = 0; i < box.length; i++) {
    box[i].innerHTML = "";
  }
  lineDiv.style.visibility = "hidden";
  box.forEach((element) => {
    element.style.borderColor = "white";
    element.style.color = "white";
    element.dataset.clicked = "false";
  });
  wins = false;
  obj1.selectedbox = [];
  obj2.selectedbox = [];
}
function winnerfound(user, draw) {
  winnerContainer.style.zIndex = "4";
  winnerCard.style.opacity = "1";
  console.log(user);
  if (draw == 1) {
    winnerHead.innerHTML = "DRAW!";
  } else {
    winnerHead.innerHTML = `Winnner:<span class="winner-name">${user}</span>`;
  }
}

// console.log(lineDiv.getBoundingClientRect().top);
// console.log(lineDiv.getBoundingClientRect().left);

function computerClick() {
  // console.log("computer clicked", option);
  if (wins == false && sleep == false && (obj1.selectedbox.length + obj2.selectedbox.length < 9) ) {
    row = option[0][0];
    col = option[0][1];
    box[(row-1)*3+col-1].dataset.clicked = "true";
    clearInterval(interval);
    obj2.selectedbox.push([row, col]);
    isObj1 = true;
    box[(row-1)*3+col-1].innerHTML = user_2_sign;
    option = [];
    nextMoveDone = false;
    nextMoveFound = false;
    probableChosenList = new Map([]);
    elCount = new Map([]);
    hasElementInSelectedbox1 = false;
    hasElementInSelectedbox2 = false;
    trickfordef = false;
    count = 0;
    index = 0;
    n = 0;
    countSelectedbox1 = 0; 
    countSelectedbox2 = 0;
    nextMoveFoundDef = new Map([["0", false],["1", false],["2", false],["3", false],["4", false],["5", false],["6", false],["7", false],]);
    nextMoveFoundAtk = new Map([["0", false],["1", false],["2", false],["3", false],["4", false],["5", false],["6", false],["7", false],]);
    if (obj2.selectedbox.length >= 3) {
      crossArray(obj2.selectedbox, obj2.name);
    }
  }
}

async function computerRun(){
  if((obj1.selectedbox.length+obj2.selectedbox.length+1) == 1){
    n = Math.floor(Math.random()*cornerBoxes.length);
    option.push(cornerBoxes[n]);
    console.log(option);
    nextMoveDone = true;
  }
  else if((obj1.selectedbox.length+obj2.selectedbox.length+1) == 3){
    if(inSelectedbox(obj1.selectedbox[0], middleBox) && inSelectedbox(obj2.selectedbox[0], cornerBoxes)){
      if(obj2.selectedbox[0].toString().localeCompare('1,1')==0){
        // console.log(selectedbox2[0].toString().localeCompare('1,1'));
        option.push([3, 3]);
      }
      else if(obj2.selectedbox[0].toString().localeCompare('1,3')==0){
        option.push([3, 1]);
      }
      else if(obj2.selectedbox[0].toString().localeCompare('3,1')==0){
        option.push([1, 3]);
      }
      else if(obj2.selectedbox[0].toString().localeCompare('3,3')==0){
        option.push([1, 1]);
      }
      nextMoveDone = true;
    }
    else{
      if(obj1.selectedbox[0][0]==obj2.selectedbox[0][0]){
        c = obj2.selectedbox[0][1];
        r = (obj2.selectedbox[0][0]==3)?1:3;
        option.push([r, c])
      }
      else if(obj1.selectedbox[0][1]==obj2.selectedbox[0][1]){
        r = obj2.selectedbox[0][0];
        c = (obj2.selectedbox[0][1]==3)?1:3;
        option.push([r, c])
      }
      else{
        if(Math.floor(Math.random()*2)==1){
          r = obj2.selectedbox[0][0];
          c = (obj2.selectedbox[0][1]==3)?1:3;
          option.push([r, c])
        }
        else{
          r = (obj2.selectedbox[0][0]==3)?1:3;
          c = obj2.selectedbox[0][1];
          option.push([r, c])
        }
      }
    }
    // console.log(option);
  }
  else if((obj1.selectedbox.length+obj2.selectedbox.length+1)==2){
    if(inSelectedbox(obj1.selectedbox[0], cornerBoxes)){
      option.push([2, 2]);
      // console.log(option);
      nextMoveDone =true;
    }
  }
  else if((obj1.selectedbox.length+obj2.selectedbox.length+1) == 4){
    checkAtkDef();
    // console.log(option);
    if(inSelectedbox(obj1.selectedbox[1], cornerBoxes && !nextMoveDone)){
      n = Math.floor(Math.random()*cornerBoxes.length);
      option.push(cornerBoxes[n]);
      // console.log(option);
      nextMoveDone = true;
    }
  }
  if(!nextMoveDone && (obj1.selectedbox.length + obj2.selectedbox.length < 9)){
    checkAtkDef();
    if (!nextMoveFound && probableChosenList.size!=0) {
      for (let i = 0; i < probableChosenList.size; i++) {
        // console.log("probable", crossedList[probableChosenList.get(`${i}`)]);
        count = 0;
        // console.log(crossedList[probableChosenList.get(`${i}`)], i);
        for (let p = 0;p < crossedList[probableChosenList.get(`${i}`)].length;p++) {
    
          for (let q = 0; q < obj2.selectedbox.length; q++) {
            if (
              crossedList[probableChosenList.get(`${i}`)][p]
                .toString()
                .localeCompare(obj2.selectedbox[q].toString()) == 0
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
      // console.log(maxIndex, maximum);
    }
    else if(!nextMoveFound){
      option.push(emptyBox());
      // console.log("option list", option);
      nextMoveFound = true;
    }
  }
  await sleep_time(1000);
  computerClick();
}
function nextMove(chosenList) {
  // let option = [];
  let result;
  let hasElementInSelectedbox1 = false;
  let hasElementInSelectedbox2 = false;
  for (let i = 0; i < chosenList.length; i++) {
    hasElementInSelectedbox1 = inSelectedbox(chosenList[i], obj1.selectedbox);
    hasElementInSelectedbox2 = inSelectedbox(chosenList[i], obj2.selectedbox);
    if (hasElementInSelectedbox1 == false && hasElementInSelectedbox2 == false) {
      option.push(chosenList[i]);
      nextMoveDone = true;
      // console.log(option);
    }
  }
  if(option.length>=2){
      result = mostEffectiveMove();
  }
  if(option.length != 0 && result==undefined){
    // console.log(chosenList);
    // console.log(`in the function: ${option}`);
    nextMoveFound = true;
  }
  
  // console.log("next move found", nextMoveFound);
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
            if(!inSelectedbox(crossedList[index][k], obj1.selectedbox) && !inSelectedbox(crossedList[index][k], obj2.selectedbox) && !inSelectedbox(crossedList[index1][p], obj1.selectedbox) && !inSelectedbox(crossedList[index1][p], obj2.selectedbox)){
              if(crossedList[index][k].toString().localeCompare(crossedList[index1][p].toString()) == 0 ){
                // console.log(crossedList[index][k]);
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
      for (let k = 0; k < obj1.selectedbox.length; k++) {
  
        if (crossedList[i][j].toString().localeCompare(obj1.selectedbox[k].toString()) == 0) {
          inTheBox = true;
          break;
        }
      }
      if(!inTheBox){
        for (let k = 0; k < obj2.selectedbox.length; k++){
          if(crossedList[i][j].toString().localeCompare(obj2.selectedbox[k].toString()) == 0){
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
function checkAtkDef(){
  for (let i = 0; i < crossedList.length; i++) {
    countSelectedbox1 = 0;
    countSelectedbox2 = 0;
    for (let j = 0; j < crossedList[i].length; j++) {
      for (let k = 0; k < obj1.selectedbox.length; k++) {
  
        if (crossedList[i][j].toString().localeCompare(obj1.selectedbox[k].toString()) == 0) {
          selectedBoxInCrossedList.set(`${i}`, true);
          countSelectedbox1++;
          if (countSelectedbox1 == 2) {
            nextMoveFoundDef.set(`${i}`,true);
          }
        }
      }
  
      for (let k = 0; k < obj2.selectedbox.length; k++){
        if(crossedList[i][j].toString().localeCompare(obj2.selectedbox[k].toString()) == 0){
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
  // console.log("size", probableChosenList);
  // first, checking if there is any wining move
  if(!nextMoveFound){
    for(let j=0;j<8;j++){
      if(nextMoveFoundAtk.get(`${j}`)==true){
        // console.log("attacking");
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
        // console.log("defensing");
        nextMove(crossedList[j]);
      }
      if(nextMoveFound){
        break;
      }
    }
  }
}

function sleep_time(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
