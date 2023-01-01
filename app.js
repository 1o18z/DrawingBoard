const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);// 배열 생성 (그냥 가져오면 HTMLCollection으로 줘서 
// forEach 함수 사용해야 해서 배열로 가져오려고 Array.from함)
const lineWidth = document.getElementById("line-width"); // id가 line-width인 input 가져와서 lineWidth라 선언
const color = document.getElementById("color");
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraseBtn = document.getElementById("erase-btn");
const saveBtn = document.getElementById("save");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const me = document.getElementById("me");
const my = document.getElementById("my");

const canvas = document.querySelector("canvas"); // index.html에서 canvas 가져옴
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
canvas.width = CANVAS_WIDTH; // 캔버스 너비 400
canvas.height = CANVAS_HEIGHT; // 캔버스 높이 400
ctx.lineWidth = lineWidth.value; // 위에서 지정한 lineWidth(id가 line-width인 input)의 기본값을 ctx의 lineWidth에도 적용
// 자바스크립트 실행될 때 ctx.lineWidth를 input의 기본값으로 초기화 해줌
// 계속 lineWidth 업데이트 X. 딱 한 번만 실행됨
ctx.lineCap = "round";
let isPainting = false; // isPainting 기본값 false
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY); // 선 따라 그림
    ctx.stroke(); // 선을 그림 (필수)
    return; // isPainting이 true면 stroke 써서 선 그리고 함수 끝냄
  }
  ctx.moveTo(event.offsetX, event.offsetY); //이거 else아님 if문 끝내고 실행하는 코드임
  // isPainting이 false면 마우스가 있는 곳으로 브러쉬만 움직임
  // 마우스 누른채로 움직이면 유저가 있던 곳으로부터 움직이는 곳으로 선 그림
}
function onMouseDown() {
  isPainting = true; // 마우스 눌려지면 isPainting true고 위 함수의 조건문 따라 선 그려짐
}
function onMouseUp() {
  isPainting = false; // 마우스 떼면 isPainting false고 위 함수 따라 선만 이동
  ctx.beginPath();
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
function onFontSizeChange(event) {
  ctx.fontSize = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  //dir은 객체 가져오는거
  // data- 썼으니까 value 대신 dataset
  // 콘솔 들어가서 보면 dataset 안에 있는 거 볼 수 있음
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue; // 선 색 변경
  ctx.fillStyle = colorValue; // 채우기 색 변경
  color.value = colorValue; // 원래 있던 색상표에 현재 선택된 색상 보여주기 위함
}
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "🎨Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "🖍Draw";
  }
}
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // 사각형 그려서 채우기
  }
}
function onResetClick() {
  // window.location.reload();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraseClick() {
  // 채우기 모드일 때 erase 선택하면 그리기 모드로 다시 바꿔줌
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "🎨Fill";
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save(); // save 사용해서 현재 상태, 색상, 스타일 등 저장 (3)
    ctx.lineWidth = 1; // 그래서 텍스트 실행 전에 선 굵기 1로 넣어줬더니 그림 브러쉬까지 1로 되어버림 (2)
    ctx.font = "68px sans-serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    // 여기까지 하고 더블클릭해도 글씨가 뭔가 이상하게 나옴 (1)
    // -> line-width가 기본값 5로 되어있어서 그럼
    ctx.restore(); // save와 restore 사이에서는 마음껏 수정할 수 있지만 저장되지는 않음 (4)
    // 즉 save 와 restore 사이에 넣어준 선 굵기와 폰트는 ctx.strokeText를 사용할 때만 적용되고 끝나면 적용 안 됨 (5)
  }
}


function onSaveClick() {
  const url = canvas.toDataURL(); // 우리가 캔버스에 그린 그림을 URL로 변환하고 (1)
  const a = document.createElement("a"); // a 태그 만들어 가짜 린크 만든 후에 (2)
  a.href = url // 링크의 href는 그림 URL로 설정해주고 (3)
  a.download = "myDrawing.png" // myDrawing.png라는 파일명으로 저장시킨다고 설명하고 (4)
  a.click(); // 마지막으로 클릭하면 파일이 다운로드 됨 (5)
}

img1.addEventListener('click', () => {
  window.location = 'https://github.com/1o18z';
});
img2.addEventListener('click', () => {
  window.location = 'https://www.instagram.com/1o18z/';
});
img3.addEventListener('click', () => {
  window.location = 'mailto:qkrdmswl2179@gmail.com';
});

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp);
// ㄴ 마우스가 canvas 떠나면 마우스에서 손 뗀 거로 인식

// 만약 isPainting이 false면 연필을 움직이기만 할거고
// true면 선을 그릴거임

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
// lineWidth가 change되면 onLineWidthChange함수
// (= 변경되는 값을 값으로 보여줌)


colorOptions.forEach(color => color.addEventListener("click", onColorClick))
// color마다 이벤트 리스너 추가 (color 클릭할 때마다 호출)

modeBtn.addEventListener("click", onModeClick);
canvas.addEventListener("click", onCanvasClick);
resetBtn.addEventListener("click", onResetClick);
eraseBtn.addEventListener("click", onEraseClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
me.addEventListener("click", () => {
    my.style.display = "block";

});
