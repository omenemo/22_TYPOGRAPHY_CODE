let font; // opentype.js font object 

let fSize = "100"; // default font size
let tPos = { x: 0, y: 0 };

let msg = "Meta";

let path; //store path data
let pathSVG; //store path data
let ctx;
let advance;

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  background(255);
  fill(150);
  stroke(150);
}

function draw() {
  clear();
  var r = frameCount % 200 * Math.sqrt(2);
  background(255);
  ellipse(0, 0, r, r);

  stroke(1);
  fill(3);
  strokeWeight(5);
  
  textSize(fSize);
  textAlign(CENTER);
  
  openTypeLoad();

  fSize = 0.75 * windowHeight / msg.length; //more dynamic fit
  tPos.y = 0.37*windowHeight + fSize / 3; 

  //vectorDraw();
  //path.toSVG();
  //draw.path;

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
      path = font.getPath(msg, tPos.x, tPos.y, fSize); // Array with points for drawing
      console.log(path.commands) ;
      //ctx = document.getElementById('defaultCanvas0').getContext('2d');
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
