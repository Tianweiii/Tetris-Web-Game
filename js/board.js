const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');
const scoreboard = document.getElementById("score")

const columns = 10;
const rows = 20;
const blockSize = 35;

const width = canvas.width = columns * blockSize;
const height = canvas.height = rows * blockSize;


for (let x = 0; x < width; x += blockSize) {
  for (let y = 0; y < height; y += blockSize) {
    // context.strokeStyle = "grey";
    context.strokeRect(x, y, blockSize, blockSize)
  }
}

class Board {
  constructor(ctx) {
    this.ctx = ctx; //ctx is the reference to the board
    this.board = this.getEmptyBoard()
  }

  getEmptyBoard() {
    let array = [];
    for (let i = 0; i < rows; i++) {
      const row = Array(columns).fill('white');
      array.push(row);
    }
    return array
  }
}

function drawBoard() {
  for (let r = 0; r < board.board.length; r++) {
    for (let c = 0; c < board.board[r].length; c++) {
      drawSquare(c, r, board.board[r][c])
    }
  }
}

function drawSquare(x, y, color) {
  context.fillStyle = color;
  context.fillRect(blockSize * x + 1, blockSize * y + 1, blockSize - 2, blockSize - 2)
}

let board = new Board(context);
console.table(board.board);

const canvas2 = document.getElementById("canvas-2");
const ctx = canvas2.getContext('2d');

const row2 = 4;
const column2 = 4;

const width2 = row2 * blockSize;
const height2 = column2 * blockSize;
canvas2.width = width2;
canvas2.height = height2;

for (let row = 0; row < width2; row += blockSize) {
  for (let column = 0; column < height2; column += blockSize) {
    ctx.strokeStyle = "white";
    ctx.strokeRect(row, column, blockSize, blockSize)
  }
}

function drawPouchSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(blockSize * x + 1, blockSize * y + 1, blockSize - 2, blockSize - 2);
}