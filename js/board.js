const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const columns = 10;
const rows = 20;
const blockSize = 30;

const width = canvas.width = columns * blockSize;
const height = canvas.height = rows * blockSize;
// context.scale(blockSize, blockSize);

for (let x = 0; x < width; x += blockSize) {
  for (let y = 0; y < height; y += blockSize) {
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
      const row = Array(columns).fill(0);
      array.push(row);
    }
    return array
  }
}

const board = new Board(context);
console.table(board.board);