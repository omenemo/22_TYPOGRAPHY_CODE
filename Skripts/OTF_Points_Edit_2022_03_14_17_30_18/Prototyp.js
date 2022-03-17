let font;
let msg = 'ciao';
let fSize = '600';
let tPos = { x: 100, y: 100 };
let advance;

let points;

let offset = 0;
let amplitude = 0.0001;

function preload() {
    font = loadFont('HelveticaLTStd-Bold.otf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    stroke(255);
    fill(255);

    openTypeLoad()

    points = font.textToPoints(msg, 0, 0, fSize, {
        sampleFactor: 0.3,
        simplifyThreshold: 0
    });
}

function draw() {
    background(0);

    fSize =  windowHeight / msg.length; //more dynamic fit
    tPos.y = windowHeight / 2 + fSize / 3;
    tPos.x = windowWidth / 2 - (advance / 2);

    offset += 4;

    translate(tPos.x, tPos.y);
    for (let i = 0; i < points.length; i++) {
        let p = points[i];
        let waveOffset = Math.sin(radians(offset + p.y * 10)) * 0.4;
        circle(p.x += waveOffset, p.y, 2)
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
            //path = font.getPath(msg, tPos.x, tPos.y, fSize);
            // console.log(path.commands);
            ctx = document.getElementById('defaultCanvas0').getContext('2d');
            advance = font.getAdvanceWidth(msg, fSize, true);
        }
    });
}
