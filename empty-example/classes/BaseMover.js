class BaseMover {
  id = null;
  location = createVector(0, 0);
  velocity = createVector(0, 0);
  acceleration = createVector(0, 0);
  mass = 5;
  maxSpeed = 2;
  maxForce = 50;
  angle = 0;
  angleVelocity = 0;
  angleAcceleration = 0;
  fillColor = "dodgerblue";

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
    this.angle = this.velocity.heading();
    this.acceleration.mult(0);
  }

  display() {
    // noStroke();
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
    // translate(this.location.x, this.location.y);
    // rotate(45);  
    // circle(this.location.x, this.location.y, 20);

    pop();
  }

  reverseX() {
    this.velocity.x *= -1;
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
}
