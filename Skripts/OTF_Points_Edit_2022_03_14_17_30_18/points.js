let font; // opentype.js font object 

let fSize = "100"; // default font size
let tPos = { x: 0, y: 0 };

let msg = "hallo";

let path; //store path data

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke(255);
  fill(3);
  strokeWeight(2);
  textSize(fSize);
  textAlign(CENTER);
  tPos.x = windowWidth / 2;
  tPos.y = windowHeight / 2;
  fSize = (1.5 * windowWidth) / msg.length; //more dynamic fit

  openTypeLoad();

  if (!font) return;
  noFill();
  stroke(3);
  stroke(255, 0, 255);
  
  //font.drawPoints(canvas, msg, tPos.x, tPos.y, fSize, true)

  //vectorDraw();
  //noLoop();
}

function keyPressed() {
  //rewrite that logic into cleaner block
  if (keyCode !== SHIFT && keyCode !== BACKSPACE && keyCode !== 20) {
    if (keyCode == ENTER) {
      msg += "\n";
    } else {
      msg += key;
    }
  } else if (keyCode === BACKSPACE) {
    //clear last var value
    msg = msg.slice(0, -1);
  }
}

function openTypeLoad() {
  opentype.load("HelveticaLTStd-Bold.otf", function (err, f) {
    //select typeface feature?
    if (err) {
      alert("Font could not be loaded: " + err);
    } else {
      font = f;
      console.log("font ready");
      let x = tPos.x / 4;
      let y = tPos.y;
      path = font.getPath(msg, x, y, fSize);
      console.log(path.commands);
      const ctx = document.getElementById('canvas').getContext('2d');
    }
  });
}

function vectorDraw() {
  translate(-msg.length / msg.length, fSize / 4); //center responsive calc
  for (let cmd of path.commands) {
    if (cmd.type === "M") {
      beginShape();
      vertex(cmd.x, cmd.y);
    } else if (cmd.type === "L") {
      vertex(cmd.x, cmd.y);
    } else if (cmd.type === "C") {
      bezierVertex(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
    } else if (cmd.type === "Q") {
      quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
    } else if (cmd.type === "Z") {
      endShape(CLOSE);
    }
  }
}
