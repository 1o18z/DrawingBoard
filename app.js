const colorOptions = Array.from(document.getElementsByClassName("color-option"));
// 배열 생성 (그냥 가져오면 HTMLCollection으로 줘서 ㅇㅇ)
const lineWidth = document.getElementById("line-width"); // id가 line-width인 input 가져와서 lineWidth라 선언
const color = document.getElementById("color");
const canvas = document.querySelector("canvas"); // index.html에서 canvas 가져옴
 const ctx = canvas.getContext("2d");
 canvas.width = 300; // 캔버스 너비 800
 canvas.height = 300; // 캔버스 높이 800
 ctx.lineWidth = lineWidth.value; // 위에서 지정한 lineWidth(id가 line-width인 input)의 기본값을 ctx의 lineWidth에도 적용
let isPainting = false; // isPainting 기본값 false

 function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY); // 선 따라 그림
        ctx.stroke(); // 선을 그림 (필수)
        return; // isPainting이 true면 stroke 써서 선 그리고 함수 끝냄
    }
    ctx.beginPath(); // 이걸 안 쓰면 예를 들어 선 굵기 변경할 경우 기존에 있던 선까지 모든 선의 길이가 변경됨
    ctx.moveTo(event.offsetX, event.offsetY); //이거 else아님 if문 끝내고 실행하는 코드임
    // isPainting이 false면 마우스가 있는 곳으로 브러쉬만 움직임
    // 마우스 누른채로 움직이면 유저가 있던 곳으로부터 움직이는 곳으로 선 그림
 }
 function onMouseDown(){
    isPainting = true; // 마우스 눌려지면 isPainting true고 위 함수의 조건문 따라 선 그려짐
 }
 function onMouseUp(){
    isPainting = false; // 마우스 떼면 isPainting false고 위 함수 따라 선만 이동
 }
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}
function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    //dir은 객체 가져오는거
    // data- 썼으니까 value 대신 dataset
    // 콘솔 들어가서 보면 dataset 안에 있는 거 볼 수 있음
    ctx.strokeStyle = event.target.dataset.color; // 선 색 변경
    ctx.fillStyle = event.target.dataset.color; // 채우기 색 변경
    color.value =  event.target.dataset.color;
    // 원래 있던 색상표에 현재 선택된 색상 보여주기 위함
}

canvas.addEventListener("mousemove", onMove)
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

//  const colors = [
//     "#ff3838",
//     "#ffb8b8",
//     "#c56cf0",
//     "#ff9f1a",
//     "#fff200",
//     "#32ff7e",
//     "#7efff5",
//     "#18dcff",
//     "#7d5fff",
//  ]

// function onClick(event){
//     ctx.beginPath(); //이렇게 하면 모든 선이 아닌 선마다 색이 달라짐

//     ctx.moveTo(400,400); // 0.0부터 시작
//     const color = colors[Math.floor(Math.random() * colors.length)];
//     ctx.strokeStyle = color; // color의 랜덤 색을 선 스타일에 적용
//     ctx.lineTo(event.offsetX, event.offsetY);
//     //offset은 우리가 정해놓은 캔버스 공간의 위치를 말함
//     ctx.stroke();
// }

// canvas.addEventListener("mousemove", onClick);

