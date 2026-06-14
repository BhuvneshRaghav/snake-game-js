const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;
let score = document.querySelector('.score')
let highScore = document.querySelector('.highscore')
let time = document.querySelector('.time')
let numberOfColumns = Math.floor(board.clientWidth / blockWidth);
let numberOfrows = Math.floor(board.clientHeight / blockHeight);
let modal = document.querySelector(".modal")
let startbtn = document.querySelector('.btn-start')
let restartbtn = document.querySelector('.btn-restart')
let startGameModal = document.querySelector('.startGame')
let endGameModal = document.querySelector('.endGame')

let scoreVal = 0;
highScoreVal = Number(localStorage.getItem('highScore')) || 0;
highScore.innerHTML = `High Score: ${highScoreVal}`;
let timeVal = "00-00";

const blocks = []
let direction = "down";
let intervalId;
let timerId;
let head = null;
// head.classList.add('head')
let food = { x: Math.floor(Math.random() * numberOfrows), y: Math.floor(Math.random() * numberOfColumns) }
let snake = [
    { x: 2, y: 4 },
    { x: 2, y: 5 },
    { x: 2, y: 6 }
]



for (row = 0; row < numberOfrows; row++) {
    for (col = 0; col < numberOfColumns; col++) {
        let block = document.createElement("div")
        block.classList.add('block')
        board.appendChild(block)
        blocks[`${row}-${col}`] = block

    }
}
function renderSnake() {


    blocks[`${food.x}-${food.y}`].classList.add('food')
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }
    else if (direction === 'right') {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    } else if (direction === 'up') {
        head = { x: snake[0].x - 1, y: snake[0].y }
    } else if (direction === 'down') {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }

    if (head.x < 0 || head.x >= row || head.y < 0 || head.y >= col) {
        clearInterval(intervalId)
        modal.style.display = 'flex'
        endGameModal.style.display = 'flex'
        startGameModal.style.display = 'none'
    }

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);

        blocks[`${food.x}-${food.y}`].classList.remove('food');

        food = {
            x: Math.floor(Math.random() * numberOfrows),
            y: Math.floor(Math.random() * numberOfColumns)
        };

        scoreVal += 10;
        score.innerHTML = `Score: ${scoreVal}`;

        if (scoreVal > highScoreVal) {
            highScoreVal = scoreVal;

            localStorage.setItem('highScore', highScoreVal);
            highScore.innerHTML = `High Score: ${highScoreVal}`;
        }

    }




    snake.forEach((block) => {
        blocks[`${block.x}-${block.y}`].classList.remove('fill')
    })
    snake.unshift(head);
    snake.pop()
    snake.forEach((block) => {
        blocks[`${block.x}-${block.y}`].classList.add('fill')
    })
}

startbtn.addEventListener('click', () => {
    modal.style.display = 'none'
    intervalId = setInterval(() => {

        renderSnake()
    }, 300)

        timerId = setInterval(() => {
    let [min, sec] = timeVal.split('-').map(Number);

    if (sec === 59) {
        min += 1;
        sec = 0;
    } else {
        sec += 1;
    }

    timeVal = `${String(min).padStart(2, '0')}-${String(sec).padStart(2, '0')}`;

    time.innerHTML = `Time: ${timeVal}`;
}, 1000);
})

restartbtn.addEventListener('click', () => {
    restartGame();
})

function restartGame() {
    scoreVal = 0;
    score.innerHTML = `Score: ${scoreVal}`;
    timeVal = `00-00`
    time.innerHTML = `time: 00-00`
    blocks[`${food.x}-${food.y}`].classList.remove('food')
    modal.style.display = 'none'
    direction = 'down'
    snake = [
        { x: 2, y: 4 },
        { x: 2, y: 5 },
        { x: 2, y: 6 }
    ]
    food = { x: Math.floor(Math.random() * numberOfrows), y: Math.floor(Math.random() * numberOfColumns) }
    intervalId = setInterval(() => {

        renderSnake()
    }, 300)



}



addEventListener('keydown', (keyVal) => {
    if (keyVal.key == 'ArrowUp') {
        direction = 'up'
    }
    else if (keyVal.key == 'ArrowDown') {
        direction = 'down'
    }
    if (keyVal.key == 'ArrowRight') {
        direction = 'right'
    }
    if (keyVal.key == 'ArrowLeft') {
        direction = 'left'
    }
})