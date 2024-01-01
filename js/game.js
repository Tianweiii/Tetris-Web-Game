class Piece {
  constructor(type, color) {
    this.type = type;
    this.order = 0;
    this.color = color;

    this.activeType = this.type[this.order];

    this.x = 4;
    this.y = 0;
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
        if (this.activeType[row][column] === 0) {continue}
        let newX = this.x + column + x;
        let newY = this.y + row + y;
        if (newX < 0 || newX > columns || newY > rows) {
          return true;
        }
        if (newY < 0) {continue}
        if (board[newY][newX] != 0) {
          return true;
        }
      }
    }
    return false
  }

  rotate() {
    this.undraw()
    this.order++;
    if (this.order > 3) {
      this.order = 0;
    }
    this.activeType = this.type[this.order];
    this.draw()
  };

  moveLeft() {
    this.undraw();
    this.x--;
    if (this.x < 0) {
      this.x++
    };
    this.draw();
  }

  moveRight() {
    this.undraw();
    this.x++;
    // let placeholder = 0;
    // for (let i = 0; i < this.activeType.length; i++) {
    //   let lastElement = this.activeType[i][this.activeType.length - 1]
    //   placeholder += lastElement;
    // }
    // if (placeholder === 0) {
    //   this.moveLeft()
    // }
    // if (this.x + this.activeType[0].length > columns) {
    //   this.x--;
    // }
    this.draw();
  }

  moveDown() {
    this.undraw();
    this.y++;
    this.draw();
  }
}

document.addEventListener("keydown", move)

function move(event) {
  if (event.key === "ArrowLeft") {
    p.moveLeft()
  } else if (event.key === "ArrowRight") {
    p.moveRight()
  } else if (event.key === "ArrowUp") {
    p.rotate()
  } else if (event.key === "ArrowDown") {
    p.moveDown()
  }
}

function chooseNum() {
  const number =  Math.floor(Math.random() * types.length)
  return new Piece(types[number][0], types[number][1])
}

let p = chooseNum()
p.draw()

const playGame = document.getElementById("play-game")
playGame.addEventListener("click", () => {
  setInterval(() => {
    p.moveDown()
  }, 1000);
})
