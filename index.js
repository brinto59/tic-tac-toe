obj1 = {
  name: "user-1",
  selectedbox: [],
};
obj2 = {
  name: "user-2",
  selectedbox: [],
};
const mainBody = document.querySelector(".main-body");
let isObj1 = true;
wins = false;
mainBody.addEventListener("click", (e) => {
  console.log([e.target.dataset.row, e.target.dataset.col]);
  if (e.target.dataset.clicked === "false") {
    e.target.dataset.clicked = "true";
    if (isObj1 == true && wins == false) {
      obj1.selectedbox.push([e.target.dataset.row, e.target.dataset.col]);
      e.target.innerHTML = "X";
      isObj1 = false;
      if (obj1.selectedbox.length >= 3) {
        check(obj1.selectedbox, "user-1");
      }
    } else if (wins == false) {
      obj2.selectedbox.push([e.target.dataset.row, e.target.dataset.col]);
      isObj1 = true;
      e.target.innerHTML = "O";
      if (obj2.selectedbox.length >= 3) {
        check(obj2.selectedbox, "user-2");
      }
    }

    console.log(obj1.selectedbox);
    console.log(obj2.selectedbox);
  }
  if (obj1.selectedbox.length + obj2.selectedbox.length == 9 && wins == false) {
    console.log("Draw");
  }
});
function check(selectedbox, user) {
  selectedbox.sort((a, b) => a[0] - b[0]);
  i = 1
  while((i+1)<selectedbox.length){
    if (
      selectedbox[i-1][0] == selectedbox[i][0] &&
      selectedbox[i][0] == selectedbox[i+1][0]
    ) {
      newArray = selectedbox.map((value) => value[1]);
      newArray.sort((a, b) => a - b);
      if (newArray[i-1] == 1 && newArray[i] == 2 && newArray[i+1] == 3) {
        console.log(`${user} wins`);
        wins = true;
      }
    } else if (
      selectedbox[i-1][0] == 1 &&
      selectedbox[i][0] == 2 &&
      selectedbox[i+1][0] == 3
    ) {
      newArray = selectedbox.map((value) => value[1]);
      newArray.sort((a, b) => a - b);
  
      if (
        newArray[i-1] == newArray[i] &&
        newArray[i] == newArray[i+1]
      ) {
        console.log(`${user} wins`);
        wins = true;
      } else if (
        newArray[i-1] == 1 &&
        newArray[i] == 2 &&
        newArray[i+1] == 3
      ) {
        console.log(`${user} wins`);
        wins = true;
      }
    }
    i++;
  }

  console.log(selectedbox, user);
}
