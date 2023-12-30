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
        this.drawSquare(this.x + column, this.y + row, this.color);
        if (this.activeType[row][column] === 0) {continue;}
        let newX = this.x + x;
        let newY = this.y + y;
        if (newX < 0 || newX > columns || newY > rows) {
          return true
        }
      }
    }
  }

  rotate() {
    this.undraw()
    this.order++;
    if (this.order > 3) {
      this.order = 0;
    }
    // if (this.x + this.activeType[0].length + 1 > columns) {
    //   this.moveLeft()
    // }
    this.activeType = this.type[this.order];
    this.draw()
    console.log(this.activeType);
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
    let placeholder = 0;
    for (let i = 0; i < this.activeType.length; i++) {
      let lastElement = this.activeType[i][this.activeType.length - 1]
      placeholder += lastElement;
    }
    if (placeholder === 0) {
      
    }
    if (this.x + this.activeType[0].length > columns) {
      this.x--;
    }
    this.draw();
  }

  moveDown() {
    this.undraw();
    this.y++;
    this.draw();
  }
}

const o = new Piece(O, "yellow");
const i = new Piece(I, "blue");
const s = new Piece(S, "red");
const z = new Piece(Z, "green");
const j = new Piece(J, "pink");
const l = new Piece(L, "orange");
const t = new Piece(T, "purple");

const test = [
  [1,0,0],
  [1,1,0],
  [0,1,0]
]

for (let i = 0; i < test.length; i++) {
  console.log(test[i][0]);
}

s.draw()
s.rotate()
s.moveRight()
s.moveRight()
s.moveRight()
s.moveRight()
s.moveRight()
s.moveRight()
s.moveRight()
s.moveRight()
s.moveRight()
s.moveRight()
