const gameBoard = document.getElementById("gameBoard");
let snakeSegment = document.getElementsByClassName("snake");
let snakeHead = document.querySelector(".snake");
let food = document.querySelector(".food");
let displayScore = document.querySelector(".display-score");

let segmentNumber = 1;
let score = 0;
let move;
let MainSpeed;

let dx = Math.floor(Math.random()*19)+1;
let dy = Math.floor(Math.random()*19)+1;

let rand1 = Math.floor(Math.random()*19)+1;
let rand2 = Math.floor(Math.random()*19)+1;

food.style.gridArea = `${rand1}/${rand2}/${rand1+1}/${rand2+1}`;
snakeHead.style.gridArea = `${dy}/${dx}/${dy+1}/${dx+1}`;

// move the snake based on the conditions given

function movesnake(j,i){ 
    addSegment(dy,dx); 
    dx += i;
    dy += j;
    if(dx >= 21 || dy >= 21 || dx <= 0 || dy <= 0 ){
        clearInterval(move);
        goToEnd();
    }else{
        snakeSegment[0].style.gridArea = `${dy}/${dx}/${dy+1}/${dx+1}`;
    }
    snakeSegment[1].remove();
    if(food.style.gridArea == snakeHead.style.gridArea){
        score ++;
        showScore();
        addSegment(dy,dx);
        createFood();
    }else{
        for(let i = 1; i < snakeSegment.length; i++){
            if(snakeHead.style.gridArea == snakeSegment[i].style.gridArea){
                goToEnd();
            }
        }
    }
    showScore();
}

function showScore(){
    displayScore.innerHTML = "score: "+score;
}
// add snake segment when it eats food
function addSegment(a,b){
    let segment = document.createElement("div");
    segment.classList.add("snake");
    segment.style.gridArea = `${a}/${b}/${a+1}/${b+1}`;
    gameBoard.appendChild(segment);   
}


// to create a food on a random grid area after it is eaten by the snake
function createFood(){
    let pos_x = Math.floor(Math.random()*20);
    let pos_y = Math.floor(Math.random()*20);
    food.style.gridArea = `${pos_y}/${pos_x}/${pos_y+1}/${pos_x+1}`;

    // prevent the food from being created in grid areas where-
    // the segment of the snake is found.

    for(let i = 1; i < snakeSegment.length; i++){
        if(food.style.gridArea == snakeSegment[i].style.gridArea){
            createFood();
        }
    }
}
function moveRight(){
    movesnake(0,1);
}
function moveLeft(){
    movesnake(0,-1);
}
function moveDown(){
    movesnake(1,0);
}
function moveUP(){
    movesnake(-1,0);
}

function setNewMove(arg,speed){
    clearInterval(move);
    move = setInterval(arg, speed);
}

function start(speed){
    MainSpeed = speed;
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") {
            setNewMove(moveUP,speed);
        } else if (e.key === "ArrowDown") {
            setNewMove(moveDown,speed);
        } else if (e.key === "ArrowLeft") {
            setNewMove(moveLeft,speed);
        } else if (e.key === "ArrowRight") {
            setNewMove(moveRight,speed);
        }
    });
    document.addEventListener("keypress",(e)=>{
        if(e.key === " "){
            clearInterval(move);
        }
    }
    );
}


function startGame(lvl){
    gameBoard.style.display = "grid";
    document.querySelector(".details").style.display = "grid";
    document.querySelector(".gate").style.display = "none";
    start(lvl);
}

// to display the starting page
function restart(){
    document.querySelector(".gate").style.display = "flex";
    document.querySelector(".restart").classList.remove("none");
    location.reload();
}

// to display the game over part
function goToEnd(){;
    // gameBoard.style.display = "none";
    document.querySelector(".restart").classList.add("active");
    document.querySelector(".gameArea").style.display = "none";
    document.querySelector(".final-score").innerHTML = "Your score is: "+score;
}




