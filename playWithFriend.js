obj1 = {
  name: "user-1",
  selectedbox: [],
};
obj2 = {
  name: "user-2",
  selectedbox: [],
};
let isObj1 = true;
wins = false;
let user_1_sign = "X";
let user_2_sign = "O";

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
const second_user_input = document.getElementById("user-2-name");
const playAgain = document.querySelector(".playagain");
const backWinner = document.querySelector(".back_winner");
let winnerName = document.querySelector(".winner-name");
let winnerHead = document.querySelector(".head_winner");
let winnerCard = document.querySelector(".winner_card");
let score1 = 0;
let score2 = 0;
let interval;
let sleep = false;

const rect = document.querySelectorAll(".rectangular");
rect[0].style.visibility = "hidden";
rect[1].style.visibility = "hidden";
const timeSpan = document.querySelector(".timeSpan");

mainBody.addEventListener("click", (e) => {
  console.log([e.target.dataset.row, e.target.dataset.col]);
  if (e.target.dataset.clicked === "false") {
    if (isObj1 == true && wins == false && sleep == false) {
      e.target.dataset.clicked = "true";
      clearInterval(interval);
      obj1.selectedbox.push([e.target.dataset.row, e.target.dataset.col]);
      e.target.innerHTML = user_1_sign;
      isObj1 = false;
      time_func();
      if (obj1.selectedbox.length >= 3) {
        crossArray(obj1.selectedbox, user_1.innerHTML);
      }
    } else if (wins == false && sleep == false) {
      e.target.dataset.clicked = "true";
      clearInterval(interval);
      obj2.selectedbox.push([e.target.dataset.row, e.target.dataset.col]);
      isObj1 = true;
      e.target.innerHTML = user_2_sign;
      time_func();
      if (obj2.selectedbox.length >= 3) {
        crossArray(obj2.selectedbox, user_2.innerHTML);
      }
    }

    console.log(obj1.selectedbox);
    console.log(obj2.selectedbox);
  }
  if (obj1.selectedbox.length + obj2.selectedbox.length == 9 && wins == false) {
    console.log("Draw");
    winnerfound("none", 1);
  }
});
reset.addEventListener("click", (e) => {
  resetGame();
});
X_O.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("X-1") ||
      e.target.classList.contains("O-2")
    ) {
      sign[0].dataset.checked = "true";
      sign[1].dataset.checked = "false";
      sign[2].dataset.checked = "false";
      sign[3].dataset.checked = "true";
      design(sign[0]);
      design(sign[3]);
      removeDesign(sign[1]);
      removeDesign(sign[2]);
    } else if (
      e.target.classList.contains("O-1") ||
      e.target.classList.contains("X-2")
    ) {
      sign[0].dataset.checked = "false";
      sign[1].dataset.checked = "true";
      sign[2].dataset.checked = "true";
      sign[3].dataset.checked = "false";
      design(sign[1]);
      design(sign[2]);
      removeDesign(sign[0]);
      removeDesign(sign[3]);
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
  if (second_user_input.value.trim().localeCompare("") == 0) {
    second_user_input.placeholder = "Type your name!";
  }
  if (
    first_user_input.value.trim().localeCompare("") != 0 &&
    second_user_input.value.trim().localeCompare("") != 0 &&
    first_user_input.value.trim().length <= 7 &&
    second_user_input.value.trim().length <= 7
  ) {
    inputContainer.style.display = "none";
    user_1.innerHTML = first_user_input.value;
    user_2.innerHTML = second_user_input.value;
    time_func();
  }
  if (first_user_input.value.trim().length > 7) {
    first_user_input.value = "";
    first_user_input.placeholder = "Max 7 Characters!!";
  }
  if (second_user_input.value.trim().length > 7) {
    second_user_input.value = "";
    second_user_input.placeholder = "Max 7 Characters!!";
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
  time_func();
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
  console.log(output);
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
  console.log(left - width, top + height / 2, height, width);
  lineDiv.style.transform = `rotate(${rotate}deg)`;
  winnerfound(user, 0);
}

function resetGame() {
  score1 = 0;
  score2 = 0;
  score_1.innerHTML = score1;
  score_2.innerHTML = score2;
  clearInterval(interval);
  time_func();
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
    winnerName.innerHTML = user;
  }
}

// console.log(lineDiv.getBoundingClientRect().top);
// console.log(lineDiv.getBoundingClientRect().left);

function time_func() {
  if (isObj1 == true) {
    rect[0].style.visibility = "visible";
    rect[1].style.visibility = "hidden";
  } else {
    rect[0].style.visibility = "hidden";
    rect[1].style.visibility = "visible";
  }
  if(wins == false){
    timer();
  }
  else{
    rect[0].style.visibility = "hidden";
    rect[1].style.visibility = "hidden";
    
  }
}
function timer() {
  s = 11;
  interval = setInterval(() => {
    s--;
    if(wins == true){
      rect[0].style.visibility = "hidden";
      rect[1].style.visibility = "hidden";
      clearInterval(interval);
    }
    if (s >= 0) {
      timeSpan.innerHTML = `${s}s`;
    } else {
      timeSpan.innerHTML = "Times Up!";
      sleep = true;
      isObj1=(isObj1)?false:true;
      clearInterval(interval);
      timesUp();
    }
    if (isObj1 == true && s >= 0 && wins == false) {
      rect[0].style.transition = "all 1s linear";
      rect[0].style.strokeDashoffset = 593 - (593 / 10) * (10 - s);
      rect[1].style.strokeDashoffset = 593;
      rect[1].style.transition = "all 0s linear";
    } else if (s >= 0 && wins == false) {
      rect[1].style.transition = "all 1s linear";
      rect[0].style.strokeDashoffset = 593;
      rect[1].style.strokeDashoffset = 593 - (593 / 10) * (10 - s);
      rect[0].style.transition = "all 0s linear";
    }
  }, 1000);
}
function timesUp() {
  console.log("hele");
  setTimeout(() => {
    sleep = false;
    if (!isObj1) {
      console.log("true:  1");
      rect[0].style.visibility = "hidden";
      rect[1].style.visibility = "visible";
    } else {
      console.log("true:  2");
      rect[0].style.visibility = "visible";
      rect[1].style.visibility = "hidden";
    }
    clearInterval(interval);
    timer();
  }, 3000);
}
