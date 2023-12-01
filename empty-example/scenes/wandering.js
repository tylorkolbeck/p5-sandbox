function scene_wandering() {
  let wanderer = new Wanderer(createVector(200, 200));

  let angle = 0;
  let angleV = 0;
  let angleA = 0;

  let angleMax = .1;

  function setup() {
    createCanvas(400, 400)
  }
  function draw() {
    background(146,86,161)
    noStroke()
    fill(240, 99, 164)
    rectMode(CENTER)

    translate(200, 200)

    if (mouseIsPressed === true) {
      angleA += 0.001;
    }

    angleV += angleA;
    if (angleV > angleMax) {
      angleV = angleMax
    }
    angle += angleV

    // rotate(angle)
    rect(0,0,10,20)
    
    stroke(255)
   

    // Apply Friction
    let friction = angleV;
    friction *= -1;
    friction *= 0.01;
    angleV += friction


    // Draw heading line
    let heading = createVector(cos(angle), sin(angle))
    heading.normalize()
    heading.mult(50)
    // line(0,0, heading.x, heading.y)


    const steerRadius = 40;
    circle(0, 0, steerRadius * 2)
    const randomSteer = random(-PI / 2, PI / 2);
    const steerDirection = createVector(cos(randomSteer) * steerRadius, sin(randomSteer) * steerRadius)
    line(0, 0, steerDirection.x, steerDirection.y)
    circle(steerDirection.x, steerDirection.y, 10)
    line(0 - 100, 0 - 100, steerDirection.x, steerDirection.y)


    // Reset acceleration to 0
    angleA = 0;
  }

  function slimit(value, limit) {
    if (value > limit) {
      console.log("LIMIT", limit)
      return limit
    } else {
      console.log(value)
      return value
    }
  }
  
  
  return {
    setup,
    draw
  }
}