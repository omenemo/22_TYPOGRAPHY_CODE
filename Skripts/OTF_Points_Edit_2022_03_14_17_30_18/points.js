let font; // opentype.js font object 

let fSize = "100"; // default font size
let tPos = { x: 100, y: 100 };

let msg = "Meta";

let path; //store path data
let ctx;
let advance;
let offset = 0
let amplitude = 0.001;

function setup() {
  createCanvas(windowWidth, windowHeight);
  openTypeLoad();
}

function draw() {

  background(255);
  stroke(3);
  fill(3);
  strokeWeight(10);

  textSize(fSize);
  textAlign(CENTER);

  fSize = 0.75 * windowHeight / msg.length; //more dynamic fit
  tPos.y = windowHeight / 2 + fSize / 3;
  tPos.x = windowWidth / 2 - (advance / 2);

  if (!font) return;
  noFill();
  stroke(3);
  stroke(255, 0, 255);

  //font.draw(ctx, msg, tPos.x, tPos.y, fSize, true)
  //font.drawPoints(ctx, msg, tPos.x, tPos.y, fSize, true)
  //font.getPath(msg, tPos.x + advance, tPos.y, fSize, true);

  offset += 1;

  //let circleY = height/2
  //circleY += Math.sin(radians(offset)) * 20
  //circle(width/2,circleY, 20)

  path.draw(ctx);
  for (let cmd of path.commands) {
    let waveOffset = Math.sin(radians(offset + cmd.y)) * 0.3;
    if (cmd.type === "M") {
      cmd.x += waveOffset;
    } else if (cmd.type === "L") {
      cmd.x += waveOffset;
    } else if (cmd.type === "C") {
      cmd.x += waveOffset;
      //cmd.x1 += waveOffset;
      //cmd.x1 += waveOffset;
    } else if (cmd.type === "Q") {
      cmd.x += waveOffset;
      cmd.x1 += waveOffset;
    } else if (cmd.type === "Z") {
      cmd.x += waveOffset;
    }
  }
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
  openTypeLoad();
}

function openTypeLoad() {
  opentype.load("HelveticaLTStd-Bold.otf", function (err, f) {
    //select typeface feature?
    if (err) {
      alert("Font could not be loaded: " + err);
    } else {
      font = f;
      console.log("font ready");
      path = font.getPath(msg, tPos.x, tPos.y, fSize);
      // console.log(path.commands);
      ctx = document.getElementById('defaultCanvas0').getContext('2d');
      advance = font.getAdvanceWidth(msg, fSize, true);
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