/*

The Game Project 4 - Side scrolling

Week 6

*/

/*
Project 4 - Submission notes .

The snowflakes and rainbow rain effect has been added for aesthetic purposes. When the snowflakes end, the rainbow continues, which helps distinguish the under-development section from developed one. 

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;

var clouds;
var mountains;
var trees_x;

var canyon;
var collectable;

let snowflakes = []; // array to hold snowflake objects

let experiment;
//  Ending animation variables- credited to https://codepen.io/anon/pen/BgmXKB

var i = 0;
var time = 0;
var drops = [];

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  // Boolean variables to control the movement of the game character.
  isLeft = false;
  isRight = false;

  // Variable to control the background scrolling.
  scrollPos = 0;

  // Initialise arrays of scenery objects.

  trees_x = [800, 1600, 2400, 3200, 4000, 4800, 5600, 6100];

  clouds = [
    { pos_x: 300, pos_y: 90, scale: 0.75 },
    { pos_x: 950, pos_y: 120, scale: 1.5 },

    { pos_x: 1900, pos_y: 100, scale: 1.2 },
    { pos_x: 2900, pos_y: 80, scale: 0.75 },
    { pos_x: 3500, pos_y: 80, scale: 1.0 },
    { pos_x: 4600, pos_y: 90, scale: 1.2 },
    { pos_x: 4900, pos_y: 75, scale: 0.75 },
    { pos_x: 5800, pos_y: 100, scale: 1.0 },
    { pos_x: 6000, pos_y: 80, scale: 0.5 }
  ];

  mountains = [
    { pos_x: 150, peak_y: 200 },
    { pos_x: 1150, peak_y: 200 },
    { pos_x: 2190, peak_y: 200 },

    { pos_x: 2650, peak_y: 150 },
    { pos_x: 3300, peak_y: 150 },
    { pos_x: 4500, peak_y: 150 },
    { pos_x: 5200, peak_y: 150 }
  ];

  canyon = [
    { x_pos: 550, width: 90 },
    { x_pos: 1050, width: 90 },

    { x_pos: 2050, width: 90 },
    { x_pos: 2550, width: 90 },
    { x_pos: 3050, width: 90 },
    { x_pos: 4350, width: 90 },

    { x_pos: 5850, width: 90 },
    { x_pos: 6250, width: 90 }
  ];

  fill(0);
  rect(6350, 0, 99999, height);

  collectable = [
    {
      x_interval: random(680, 980),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(1280, 1580),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(1880, 2180),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(2480, 2780),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(3080, 3380),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(3680, 3980),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(4280, 4580),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(4800, 5180),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    },
    {
      x_interval: random(5580, 5780),
      y_pos: random(floorPos_y - 90, floorPos_y - 250)
    }
  ];

  experiment = {x_edge: 6490, x_max: 10000};
}

function draw() {
  background(100, 155, 255); // fill the sky blue

  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height / 4); // draw some green ground

  push();
  translate(scrollPos, 0);

  // snowflakes;

  fill(240);
  noStroke();
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

  // Draw clouds.

  for (var i = 0; i < clouds.length; i++) {
    fill(193, 215, 215);
    ellipse(
      clouds[i].pos_x * clouds[i].scale,
      clouds[i].pos_y,
      55 * clouds[i].scale,
      55 * clouds[i].scale
    );
    ellipse(
      (clouds[i].pos_x + 25) * clouds[i].scale,
      clouds[i].pos_y,
      35 * clouds[i].scale,
      35 * clouds[i].scale
    );
    ellipse(
      (clouds[i].pos_x + 45) * clouds[i].scale,
      clouds[i].pos_y,
      25 * clouds[i].scale,
      25 * clouds[i].scale
    );
  }
  // Draw mountains.

  for (var i = 0; i < mountains.length; i++) {
    fill(204, 204, 204);
    triangle(
      mountains[i].pos_x,
      432,
      mountains[i].pos_x + 175,
      mountains[i].peak_y,
      mountains[i].pos_x + 300,
      432
    );

    beginShape(TRIANGLES);
    fill(77, 77, 77);
    vertex(mountains[i].pos_x + 175, 432);
    vertex(mountains[i].pos_x + 300, 432);
    vertex(mountains[i].pos_x + 175, mountains[i].peak_y);

    endShape();
  }
  // Draw trees.

  //    traversing the tree array

  for (var i = 0; i < trees_x.length; i++) {
    fill(100, 50, 0);
    rect(75 + trees_x[i], -200 / 2 + floorPos_y, 50, 200 / 2);
    fill(0, 100, 0);
    triangle(
      trees_x[i] + 25,
      -200 / 2 + floorPos_y,
      trees_x[i] + 100,
      -200 + floorPos_y,
      trees_x[i] + 175,
      -200 / 2 + floorPos_y
    );

    triangle(
      trees_x[i],
      -200 / 4 + floorPos_y,
      trees_x[i] + 100,
      (-200 * 3) / 4 + floorPos_y,
      trees_x[i] + 200,
      -200 / 4 + floorPos_y
    );
  }

  // Draw canyons

  for (var i = 0; i < canyon.length; i++) {
    fill("rgba(100, 155, 255, 0.65)");
    rect(canyon[i].x_pos, floorPos_y, canyon[i].width, 145);
  }
  // Draw collectable items

  for (var i = 0; i < collectable.length; i++) {
    fill(255, 140, 0); // gold
    stroke(255, 215, 0); // yellow
    strokeWeight(5);
    r = random(5, 6);
    ellipse(collectable[i].x_interval + r, collectable[i].y_pos + r, 20, 20);
  }

  noStroke();
  fill(128, 128, 128);
  rect(6400, 0, 410, height);
  fill(64, 64, 64);
  rect(6800, 0, 210, height);
  fill(0);
  rect(7000, 0, 99999, height);


// TO BE CONTINUED TEXT
  textSize(25);
  textFont("Georgia");
  text("TO BE CONTINUED...", 6490, height / 2);


//  additional rainbow effect code
  noStroke();
  var drop = {
    //rgb  colors
    r: random(255),
    g: random(255),
    b: random(255),
    x: random(experiment.x_edge, experiment.x_max), //drop pos X
    y: 1, // drop pos Y
    seed: random(10, 20), // speed & size
    a: 0.0000481 //acceleration factor
  };
  drops.push(drop);
  for (i = 0; i < drops.length; i++) {
    fill(drops[i].r, drops[i].g, drops[i].b, 100);
    ellipse(drops[i].x, drops[i].y, drops[i].seed * 2, drops[i].seed * 2);
    // velocidad de objeto
    drops[i].y += drops[i].seed / 3 + pow(drops[i].a, 1.05);
    drops[i].a += 0.001;
    if (drops[i].y > height) {
      drops.splice(i, 1);
    }
  }

  pop();

  // Draw the game character - this must be last

  fill(255, 0, 0);
  rect(gameChar_x - 15, gameChar_y - 55, 30, 50);
  fill(255, 150, 150);
  ellipse(gameChar_x, gameChar_y - 55, 40, 40);
  fill(0);
  rect(gameChar_x - 16, gameChar_y - 10, 10, 10);
  rect(gameChar_x + 6, gameChar_y - 10, 10, 10);

  //////// Game character logic ///////
  // Logic to move

  if (isLeft) {
    if (gameChar_x > width * 0.2) {
      gameChar_x -= 5;
    } else {
      scrollPos += 5;
    }
  }

  if (isRight) {
    if (gameChar_x < width * 0.8) {
      gameChar_x += 5;
    } else {
      scrollPos -= 5; // negative for moving against the background
    }
  }

  if (gameChar_y < floorPos_y) {
    gameChar_y += 5;
  }

  
}

function keyPressed() {
  if (key == "A" || keyCode == 37) {
    isLeft = true;
  }

  if (key == "D" || keyCode == 39) {
    isRight = true;
  }

  if (keyCode == 32 && gameChar_y >= floorPos_y) {
    gameChar_y -= 200;
  }
}

// function touchStarted() {
//   isRight = true;
//   // prevent default
// }

function keyReleased() {
  if (key == "A" || keyCode == 37) {
    isLeft = false;
  }

  if (key == "D" || keyCode == 39) {
    isRight = false;
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width + 10000 / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
