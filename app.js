const canvas = document.querySelector("canvas");
 const ctx = canvas.getContext("2d");
 canvas.width = 800;
 canvas.height = 800;
 ctx.lineWidth = 2;
 const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    "#18dcff",
    "#7d5fff",
 ]

function onClick(event){
    ctx.beginPath(); //이렇게 하면 모든 선이 아닌 선마다 색이 달라짐

    ctx.moveTo(400,400); // 0.0부터 시작
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color; // color의 랜덤 색을 선 스타일에 적용
    ctx.lineTo(event.offsetX, event.offsetY);
    //offset은 우리가 정해놓은 캔버스 공간의 위치를 말함
    ctx.stroke();
}

canvas.addEventListener("mousemove", onClick);

