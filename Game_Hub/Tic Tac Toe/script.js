const cells = document.querySelectorAll(".cell");
const playerX = document.querySelectorAll("player-x");
const playerO = document.querySelectorAll("player-o");
const currentPlayer = document.querySelector(".current-player");
const winner = document.querySelector(".winner");
const popup = document.querySelector(".popup-container");

const XwinCount = document.querySelector(".x-win-count");
const OWinCount = document.querySelector(".o-win-count");
const drawCount = document.querySelector(".draw-count");

const playerXColor = "#FED049";
const playerOColor = "#D72638";
const winningColor = "#FFD700";

let playerXWins = 0;
let playerOWins = 0;
let draw = 0;


// Initialize

let player = "X";
let isPauseGame = false;
let isGameStart = false;

const inputCells = [ '', '', '',
                     '', '', '',
                     '', '', ''
                   ];

const winConditions = [ [0,1,2],[3,4,5],[6,7,8],
                        [0,3,6],[1,4,7],[2,5,8],
                        [0,4,8],[2,4,6]
];

cells.forEach((cell, index) =>{
    cell.addEventListener('click',()=>tapCell(cell, index));
});

function tapCell(cell, index){
    if(cell.textContent == '' && !isPauseGame){
        isGameStart = true;
        updateCell(cell, index);
        checkWinner();
        changePlayer();
    }
}

function updateCell(cell, index){
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player == 'X') ? playerXColor : playerOColor;
}

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X';
    currentPlayer.innerHTML = `<span class="${player ==='X'? 'player-x' : 'player-o'}">${player}</span>'s Turn`;
}


function checkWinner(){
    for(const [a,b,c] of winConditions){
        if(inputCells[a] == player && inputCells[b] == player && inputCells[c] == player){
            declareWinner([a, b, c]);
            return;
        }
    }
    if(inputCells.every((cell) => cell != '')){
        declareDraw();
    }
}

function declareWinner(winningCells){
    isPauseGame = true;
    highlightWinningCells(winningCells);
    winner.innerHTML =`<span class="${player ==='X'? 'player-x' : 'player-o'}">${player}</span>  Wins 🎉!! `;
    popup.classList.add("show");

    if(player === 'X' ){
        playerXWins++;
        XwinCount.innerHTML = playerXWins;
    }
    else{
        playerOWins++;
        OWinCount.innerHTML = playerOWins;
    }

}

function declareDraw(){
    draw++;
    drawCount.innerHTML = draw;
    winner.innerHTML =` Draw 😭!! `;
    popup.classList.add("show");
}

function highlightWinningCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].classList.add("winning-cell"); 
    });
}


function restartGame(){
    inputCells.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    })
    isGameStart = false;
    isPauseGame = false;
    popup.classList.remove("show");
}

function closePopup(){
    popup.classList.remove("show");
}
