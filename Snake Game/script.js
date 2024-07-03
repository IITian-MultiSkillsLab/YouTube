const pb = document.querySelector(".play-board");
const score = document.querySelector(".score");

let gameOver = false;
let foodx, foody; //food position
let snakex = 5, snakey = 5; //snake initial position
let speedx = 0, speedy = 0; //snake initial speed
let snakebody = []; //snake body to store all blocks in array
let setIntervalId //id for game loop interval
let scoree = 0; //player score

const updateFood =()=>{
    foodx = Math.floor(Math.random()*25) + 1;
    foody = Math.floor(Math.random()*25) + 1;
    //food position to be set randomly
}

const whengameover = ()=>{
    clearInterval(setIntervalId); //stop the game loop
    alert("Game Over! Click OK to start again.");
    location.reload(); //reload the page to start again
    //function to handle the game over situation
}

const direction = e => {
    //check for arrow keys and decide direction of snake
    if(e.key ==="w" && speedy !== 1){
        speedx = 0;
        speedy = -1;
    } else if (e.key === "s" && speedy !== -1){
        speedx = 0;
        speedy = 1;
    } else if (e.key === "a" && speedx !== 1){
        speedx = -1;
        speedy = 0;
    } else if (e.key === "d" && speedx !== -1){
        speedx = 1;
        speedy = 0;
    }
}

//function to start the game
const start = () => {
    if(gameOver) return whengameover();

    //creating food element and its position in html
    let html = `<div class = "food" style = "grid-area: ${foody} /${foodx}"></div>`;

    //checking if snake has eaten the food
    if(snakex === foodx && snakey === foody){
        updateFood(); //update food position
        snakebody.push([foodx, foody]); //increase snake length
        scoree++; //increase player score
        score.innerText = 'Score: ' + scoree; //update score in html
    }

    //updating snake head position 
    snakex += speedx;
    snakey += speedy;

    //moving snake body
    for (let i = snakebody.length -1; i > 0; i--){
        snakebody[i] = snakebody[i-1]; //move the body ahead
    }
    snakebody[0] = [snakex, snakey];
    //snake head position updated

    //check for wall collision
    if(snakex <1 || snakex > 25 || snakey < 1 || snakey > 25) return whengameover();

    //check for snake collision with its body
    for (let i = 0; i < snakebody.length; i++){
        //first design the snake head and body in html
        if (i === 0){
            html += `<div class = "head" style = "grid-area: ${snakebody[0][1]} / ${snakebody[0][0]}"></div>`;

        } else {
            html += `<div class = "body" style = "grid-area: ${snakebody[i][1]} / ${snakebody[i][0]}"></div>`;

        }
        //we have made 2 different html for snake head and body because it is to be designed differently
        //checking the collision now
        if(i!=0 && snakebody[i][0] === snakex && snakebody[i][1] === snakey) return whengameover();
    }

    //updating the playboard with the htmls allocated
    pb.innerHTML = html;
}

//initialising the food position
updateFood();
setIntervalId = setInterval(start, 125); //start thhe game loop every 125 milliseconds, decides the speed of snake

//adding event listener for keydown events
document.addEventListener("keydown", direction);
