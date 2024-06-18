const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');

let boardState = Array(9).fill(null);
let currentPlayer = 'X';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === player;
        });
    });
};

const checkDraw = () => {
    return boardState.every(cell => cell !== null);
};

const aiMove = () => {
    let emptyCells = boardState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].removeEventListener('click', handleCellClick);
    if (checkWin('O')) {
        setTimeout(() => alert('AI wins!'), 100);
    } else if (checkDraw()) {
        setTimeout(() => alert('Draw!'), 100);
    }
};

const handleCellClick = (event) => {
    const index = event.target.getAttribute('data-index');
    if (boardState[index] === null) {
        boardState[index] = 'X';
        event.target.textContent = 'X';
        event.target.removeEventListener('click', handleCellClick);
        if (checkWin('X')) {
            setTimeout(() => alert('You win!'), 100);
        } else if (checkDraw()) {
            setTimeout(() => alert('Draw!'), 100);
        } else {
            aiMove();
        }
    }
};

const restartGame = () => {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
};

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
