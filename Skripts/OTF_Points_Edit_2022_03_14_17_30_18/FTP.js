var msg = 'Meta';
var font;
var type;
var filled = false;
let fSize = "12"; // default font size
let tPos = { x: 100, y: 100 };
let pts = []; // store path data
let typeface = "HelveticaLTStd-Bold.otf";
let advance;



function preload() {
    type = loadFont(typeface);
  }

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();

  opentype.load(typeface, function(err, f) {
    if (err) {
      print(err);
    } else {
      font = f;
      pts = type.textToPoints(msg, tPos,x, tPos.y, fSize, {
        sampleFactor: 0.1, // increase for more points
        simplifyThreshold: 0.0 // increase to remove collinear points
    });
      // console.log(path.commands);
      ctx = document.getElementById('defaultCanvas0').getContext('2d');
      advance = font.getAdvanceWidth(msg, fSize, true);
      loop();
    }
  });
}

function draw() {
  if (!font) return;

  background(0);
  if (filled) {
    noStroke();
    fill(0);
  } else {
    noFill();
    stroke(0);
    strokeWeight(2);
  }

  beginShape();
  translate(200, 500);
  //translate(-advance.x * width / advance.w, -advance.y * height / advance.h);
  for (let i = 0; i < pts.length; i++) {
    let p = pts[i];
    // vertex(
        cirlce(p.x, p.y)
    // );
    console.log(p.x, p.y)
  }
  endShape(CLOSE);
}



function keyReleased() {
  // export png
  if (keyCode == CONTROL) saveCanvas(gd.timestamp(), 'png');
  if (keyCode == ALT) filled = !filled;
}

function keyPressed() {
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (msg.length > 0) {
      msg = msg.substring(0, msg.length - 1);
    }
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    msg += key;
  }
}