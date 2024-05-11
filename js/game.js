class Piece {
  constructor(type, color) {
    this.type = type;
    this.order = 0;
    this.color = color;

    this.activeType = this.type[this.order];

    this.x = 4;
    this.y = -3;
  };

  draw() {
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        // render color if 1 in matrix
        if (this.activeType[row][column] === 1) {
          drawSquare(this.x + column, this.y + row, this.color)
        }
      }
    }
  }

  undraw() {
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        // revert if 1 in matrix
        if (this.activeType[row][column] === 1) {
          drawSquare(this.x + column, this.y + row, "white")
        }
      }
    }
  }

  collisionDetect(x, y) {
    for (let row = 0; row < this.activeType.length; row++) {
      for (let column = 0; column < this.activeType[row].length; column++) {
        // ignore if 0 in matrix
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
        // check the existing board if that space is occupied
        if (board.board[newY][newX] !== 'white') {
          return true
        }
      }
    }
    // if all conditions were not met, means it doesn't collide
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
      this.draw();
    } else {
      this.lock();
      p = chooseNum();
      p.draw();
    }
  }

  dropPiece() {
    this.undraw()
    while (!this.collisionDetect(0, 1)) {
      this.y++
    };
    this.lock();
    p = chooseNum();
    p.draw();
  }

  holdPiece(currentPiece) {
    this.undraw();
    if (pouch.length === 0) {
      pouch.push({
        type: currentPiece.type,
        order: currentPiece.order,
        color: currentPiece.color
      });
      p = chooseNum();
      return p
    } else {
      pouch.push({
        type: currentPiece.type,
        order: currentPiece.order,
        color: currentPiece.color
      });
      undrawPouch();
      const oldPiece = pouch.shift();
      this.type = oldPiece.type;
      this.order = oldPiece.order;
      this.activeType = oldPiece.type[oldPiece.order];
      this.color = oldPiece.color;
      this.x = 4;
      this.y = -3;
      this.draw();
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
          // window.alert("Game Over");
          alertShown()
          break;
        }
        board.board[this.y + row][this.x + column] = this.color;
      }
    }
    console.table(board.board)
    for (let row = 0; row < board.board.length; row++) {
      let fullRow = true;
      for (let column = 0; column < board.board[row].length; column++) {
        if (board.board[row][column] === 'white') {
          fullRow = false;
          break;
        }
      }
      if (fullRow) {
        score += 100
        let newArr = [];
        for (let column = 0; column < board.board[row].length; column++) {
          newArr.push("white");
        }
        board.board.splice(row, 1);
        board.board.splice(0, 0, newArr)
      }
    }
    drawBoard();
    scoreboard.innerHTML = score
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

function drawPouch() {
  let oldActiveType = pouch[0].type[pouch[0].order]
  for (let row = 0; row < oldActiveType.length; row++) {
    for (let column = 0; column < oldActiveType[row].length; column++) {
      if (oldActiveType[row][column] === 1) {
        drawPouchSquare(column, row, pouch[0].color);
      }
    }
  }
}

function undrawPouch() {
  let oldActiveType = pouch[0].type[pouch[0].order]
  for (let row = 0; row < oldActiveType.length; row++) {
    for (let column = 0; column < oldActiveType[row].length; column++) {
      drawPouchSquare(column, row, "black");
    }
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
  } else if (event.key === " ") {
    p.dropPiece()
  } else if (event.key === "c") {
    const x = p.holdPiece(p);
    drawPouch()
    // x.draw(
  }
}

function chooseNum() {
  const number =  Math.floor(Math.random() * types.length)
  return new Piece(types[number][0], types[number][1])
}

function alertShown() {
  if (!alert) {
    window.alert("Game Over!");
    alert = true;
  }
}

let alert = false;
let score = 0;
let pouch = [];
let p = chooseNum();
p.draw();
let gameOver = false;
const playGame = document.getElementById("play-game")
playGame.addEventListener("click", () => {
  clearBoard.disabled = true;
  playGame.disabled = true;
  let start = setInterval(() => {
    p.moveDown();
    if (gameOver) {
      clearInterval(start);
      clearBoard.disabled = false;
    }
  }, 500);
})

const clearBoard = document.getElementById("clear-board");
clearBoard.addEventListener("click", () => {
  board = new Board(context);
  playGame.disabled = false;
  gameOver = false;
  alert = false;
  score = 0;
  scoreboard.innerHTML = score;
  if (pouch.length > 0) {
    undrawPouch();
    pouch = [];
  }
  drawBoard();
})

document.addEventListener("keydown", (event) => {
  console.log(event);
})