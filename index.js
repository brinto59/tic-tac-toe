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
const mainBody = document.querySelector(".main-body");
const lineDiv = document.querySelector(".line");
const box = document.querySelectorAll(".box");

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
  selectedbox.sort((a, b) =>{
    if(a[0]==b[0]){
      return a[1]-b[1];
    }
    else{
      return a[0]-b[0];
    }
  } );
  i = 1
  while((i+1)<selectedbox.length){
    if (
      selectedbox[i-1][0] == selectedbox[i][0] &&
      selectedbox[i][0] == selectedbox[i+1][0]
    ) {
      if ((selectedbox[i-1][1] == 1 && selectedbox[i][1] == 2 && selectedbox[i+1][1] == 3)||(selectedbox[i-1][1] == 3 && selectedbox[i][1] == 2 && selectedbox[i+1][1] == 1)) {
        console.log(`${user} wins`);
        console.log(selectedbox[i][0]);
        crossLine(eval(selectedbox[i][0])-1,1,0,270)
        wins = true;
      }
    } else if (
      selectedbox[i-1][0] == 1 &&
      selectedbox[i][0] == 2 &&
      selectedbox[i+1][0] == 3
    ) {
      if (
        selectedbox[i-1][1] == selectedbox[i][1] &&
        selectedbox[i][1] == selectedbox[i+1][1]
      ) {
        console.log(`${user} wins`);
        console.log(selectedbox[i][1]);
        crossLine(1,eval(selectedbox[i][1])-1,90,270);
        wins = true;
      } else if (
        (selectedbox[i-1][1] == 1 &&
        selectedbox[i][1] == 2 &&
        selectedbox[i+1][1] == 3)||(selectedbox[i-1][1] == 3 && selectedbox[i][1] == 2 && selectedbox[i+1][1] == 1)
      ) {
        console.log(`${user} wins`);
        if(selectedbox[i-1][1]==1){
          crossLine(1,1,40,300);
        }
        else{
          crossLine(1,1,140,300);
        }
        wins = true;
      }
    }
    i++;
  }

  console.log(selectedbox, user);
}
function crossLine(row, col, rotate, lineWidth){
  let element = box[row*3+col];

  element.style.color = "#b4b5b8";
  box.forEach((element)=>{
    element.style.borderColor = "#b4b5b8";
  });
  if(rotate == 90){
    box[(row-1)*3+col].style.color = "#b4b5b8";
    box[(row+1)*3+col].style.color = "#b4b5b8";
  }
  else if(rotate==140){
    box[(row-1)*3+col+1].style.color = "#b4b5b8";
    box[(row+1)*3+col-1].style.color = "#b4b5b8";
  }
  else if(rotate==40){
    box[(row-1)*3+col-1].style.color = "#b4b5b8";
    box[(row+1)*3+col+1].style.color = "#b4b5b8";
  }
  else{
    box[row*3+col-1].style.color = "#b4b5b8";
    box[row*3+col+1].style.color = "#b4b5b8";
  }

  let top = element.getBoundingClientRect().top-mainBody.getBoundingClientRect().top; //relative to main-body's top
  let left = element.getBoundingClientRect().left-mainBody.getBoundingClientRect().left; //relative to main-body's left
  let height = element.getBoundingClientRect().height;
  let width = element.getBoundingClientRect().width;
  lineDiv.style.visibility="visible";
  lineDiv.style.width = `${lineWidth}px`;
  lineDiv.style.top = `${top+height/2}px`;
  lineDiv.style.left = `${left+width/2-lineWidth/2}px`;
  console.log(left-width, top+height/2, height,width);
  lineDiv.style.transform = `rotate(${rotate}deg)`;
  


}

console.log(lineDiv.getBoundingClientRect().top);
console.log(lineDiv.getBoundingClientRect().left);