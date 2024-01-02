class Piece {
  constructor(type, color) {
    this.type = type;
    this.order = 0;
    this.color = color;

    this.activeType = this.type[this.order];

    this.x = 4;
    this.y = -3;
  };

  drawSquare(x, y, color) {
    context.fillStyle = color;
    context.fillRect(blockSize * x + 1, blockSize * y + 1, blockSize - 2, blockSize - 2)
  }

  draw() {
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        if (this.activeType[row][column] === 1) {
          this.drawSquare(this.x + column, this.y + row, this.color)
        }
      }
    }
  }

  undraw() {
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        if (this.activeType[row][column] === 1) {
          this.drawSquare(this.x + column, this.y + row, "white")
        }
      }
    }
  }

  collisionDetect(x, y) {
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        if (this.activeType[row][column] === 0) {
          continue
        }
        // define moved location
        let newX = this.x + column + x;
        let newY = this.y + row + y;
        // console.log(newX, newY);
        // check for left, right and bottom collisions
        if (newX < 0 || newX >= columns || newY >= rows) {
          return true;
        }
        // check ceiling limit
        if (newY < 0) {
          continue
        }
        if (board.board[newY][newX] !== 0) {
          return true
        }
      }
    }
    return false;
  }

  rotate() {
    this.undraw()
    const oldType = this.activeType;
    this.order++;
    if (this.order > 3) {
      this.order = 0;
    };
    this.activeType = this.type[this.order];
    if (this.collisionDetect(0,0)) {
      if (this.order === 0) {
        this.order = 3;
      } else {
        this.order--;
      }
      this.activeType = oldType;
    };
    this.draw();
  };

  moveLeft() {
    this.undraw();
    if (!this.collisionDetect(-1,0)) {
      this.x--
    }
    this.draw();
  }

  moveRight() {
    this.undraw();
    if (!this.collisionDetect(1,0)) {
      this.x++
    }
    this.draw();
  }

  moveDown() {
    if (!this.collisionDetect(0, 1)) {
      this.undraw()
      this.y++;
      this.draw()
    } else {
      this.lock()
      p = chooseNum();
      p.draw()
    }
  }

  lock() {
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        if (this.activeType[row][column] === 0) {
          continue
        };
        if (this.y + row < 0) {
          gameOver = true;
          window.alert("Game Over");
          break;
        }
        board.board[this.y + row][this.x + column] = 1;
      }
    }
    console.table(board.board)
  }

  getCurrentPiecePosition() {
    const positions = [];
  
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        if (this.activeType[row][column] === 1) {
          console.log(this.x);
          console.log(column);
          const x = this.x + column;
          const y = this.y + row;
          positions.push({ x, y });
        }
      }
    }
    return positions;
  }
}

document.addEventListener("keydown", move)

function move(event) {
  if (event.key === "ArrowLeft") {
    p.moveLeft()
    console.log(p.x);
  } else if (event.key === "ArrowRight") {
    p.moveRight()
    console.log(p.x);
  } else if (event.key === "ArrowUp") {
    p.rotate()
  } else if (event.key === "ArrowDown") {
    p.moveDown()
    console.log(p.y);
  }
}

function chooseNum() {
  const number =  Math.floor(Math.random() * types.length)
  return new Piece(types[number][0], types[number][1])
}

function drawBoard() {
  for (let r = 0; r < board.board.length; r++) {
    for (let c = 0; c <board.board[r].length; c++) {
      drawSquare()
    }
  }
}

function checkBoard() {
  for (let row = 0; row < board.board.length; row++) {
    let fullRow = true;
    for (let column = 0; column < board.board[row].length; column++) {
      if (board.board[row][column] === 0) {
        fullRow = false;
        break;
      }
    }
    if (fullRow) {
      // clear row and drop whole table
      for (let upper = row; upper < 0; upper--) {
        for (let column = 0; column < board.board[upper].length; column++) {
          board.board[upper][column] = board[upper - 1][column]
        }
      }
    }
  }
}


let p = chooseNum()
p.draw()
let gameOver = false;
const playGame = document.getElementById("play-game")
playGame.addEventListener("click", () => {
  let start = setInterval(() => {
    p.moveDown();
    if (gameOver) {
      clearInterval(start)
    }
  }, 500);
})


const test = [
  [0,1,0],
  [0,0,0],
  [1,1,1],
  [0,1,1]
]

for (let i = 0; i < test.length; i++) {
  let full = true;
  for (let j = 0; j < test[i].length; j++) {
    if (test[i][j] === 0) {
      full = false;
      break;
    }
  }
  if (full) {
    test.splice(i, 1);
    let newArr = []
    for (j = 0;  j < test[i].length; j++) {
      newArr.push(0)
    }
    test.splice(0, 0, newArr)
    console.log(test);
  }
}
