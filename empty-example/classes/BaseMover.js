class BaseMover {
  id = null;
  location = createVector(0, 0);
  velocity = createVector(0, 0);
  acceleration = createVector(0, 0);
  mass = 5;
  maxSpeed = 2;
  maxForce = 0.08;
  angle = 180;
  angleVelocity = 0;
  angleAcceleration = 0;
  fillColor = "dodgerblue";

  wanderTheta = PI / 2;


  constructor(location) {
    if (location) this.location = location;
    this.id = UUID.generate();
  }

  applyForce(x, y) {
    const force = createVector(x, y);
    force.div(this.mass);
    force.limit(this.maxForce);
    this.acceleration.add(force);
  }

  applyForceVector(force) {
    const forceClone = force.copy();
    forceClone.div(this.mass);
    forceClone.limit(this.maxForce);
    this.acceleration.add(forceClone);
  }

  draw() {
    this.render();
  }

  render() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);

    // Point towards heading
    if (this.velocity.mag() > 0.3) {
      this.angle = this.velocity.heading()
    }
    this.acceleration.mult(0);
  }

  display() {
    fill(this.fillColor);
    stroke(0)
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle + PI / 2);
    beginShape();
      vertex(0, -this.mass * 2);
      vertex(-this.mass, this.mass * 2);
      vertex(this.mass, this.mass * 2);
    endShape(CLOSE);
    pop();
  }

  reverseX() {
    this.velocity.x *= -1;
  }

  pointInFront(distance) {
    return createVector(cos(this.angle) * distance, sin(this.angle) * distance)
   
  }

  reverseY() {
    this.velocity.y *= -1;
  }

  getVelocity() {
    return this.velocity.copy();
  }

  setVelocity(x, y) {
    this.velocity = createVector(x, y);
  }

  getSpeed() {
    return this.velocity.mag();
  }

  drawVelocityVector(multiplier = 20) {
    const moverVelocity = this.getVelocity().mult(multiplier);
    const pointInFront = this.location.copy().add(moverVelocity);
    line(this.location.x, this.location.y, pointInFront.x, pointInFront.y);
  }

  wander() {
    const wanderPoint = this.velocity.copy();
    wanderPoint.setMag(100)
    wanderPoint.add(this.location)
    const wanderRadius = 50;

    let theta = this.wanderTheta + this.velocity.heading();
    let x = cos(theta) * wanderRadius
    let y = sin(theta) * wanderRadius

    wanderPoint.add(x, y);
    let steer = p5.Vector.sub(wanderPoint, this.location)
    steer.setMag(this.maxForce)

    this.applyForce(steer.x, steer.y)
    const randomDisplacement = 0.3
    this.wanderTheta += random(-randomDisplacement, randomDisplacement)
  }
}
