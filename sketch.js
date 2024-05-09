let images = [];
let labels = [
  "Birth", 
  "First steps", 
  "First day of school", 
  "Graduation", 
  "First love", 
  "Marriage", 
  "Childbirth", 
  "Formation of a family", 
  "Children starting their own families", 
  "Retirement",
  "Loss of a loved one",
  "Serious illness",
  "Deceased"
];
let numImages = 13;
let current_time = 0;
let interval = 1000;
let angle = 0;
let arc_per_second = 2 * Math.PI / numImages;
let radius;

function preload() {
  for (let i = 0; i < numImages; i++) {
    images.push(loadImage("images/image" + i + ".jpg"));
  }
  customFont = loadFont("SandanaRegular.ttf");
}

function setup() {
  createCanvas(800, 600);
  radius = width / 4;
  textFont(customFont);
  }

function draw() {
  
  image(images[current_time], 0, 0, width, height);

  fill(255, 150);
  rect(0, 0, width, height);

  translate(width / 2, height / 2);
  stroke(0);
  noFill();
  strokeWeight(2);
  ellipse(0, 0, radius * 2);
  for (let i = 0; i < 13; i++) {
    let x = cos(angle + i * arc_per_second) * radius;
    let y = sin(angle + i * arc_per_second) * radius;
    let x2 = cos(angle + i * arc_per_second) * (radius - 10);
    let y2 = sin(angle + i * arc_per_second) * (radius - 10);
    line(x, y, x2, y2);
  }
  strokeWeight(4);
  let pointerX = cos(angle) * (radius - 30);
  let pointerY = sin(angle) * (radius - 30);
  line(0, 0, pointerX, pointerY);
  translate(-width / 2, -height / 2);
  
  strokeWeight(0);
  textAlign(CENTER, TOP);
  textSize(25);
  fill(0, 77, 135);
  text("Time Machine - A Person's Lifetime", width / 2, 15);

  textAlign(CENTER, TOP);
  textSize(20);
  fill(0, 77, 135);
  text(labels[current_time], width / 2, height - 60);

  textAlign(CENTER, TOP);
  textSize(15);
  fill(0, 77, 135);
  text("Pick a time...", width / 2, 50);
}

function change_image() {
  current_time = (current_time + 1) % numImages;
  angle += arc_per_second;
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Calculate angle based on mouse position
    let clickAngle = atan2(mouseY - height / 2, mouseX - width / 2);
    if (clickAngle < 0) {
      clickAngle += TWO_PI;
    }
    // Convert angle to closest value corresponding to a label
    let closestAngle = round(clickAngle / arc_per_second) * arc_per_second;
    // Set the angle
    angle = closestAngle;
    // Convert angle to current_time index
    current_time = Math.round(angle / arc_per_second) % numImages;
  }
}

