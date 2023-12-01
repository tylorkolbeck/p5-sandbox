class Vehicle {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.vel = createVector(0.1, 0);
    this.acc = createVector(0, 0);

    this.maxSpeed = 2;
    this.maxForce = 0.1;
    this.r = 16;

    this.wanderTheta = PI / 2;
  }

  applyForce(x, y) {
    this.acc.x += x;
    this.acc.y += y;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.loc.add(this.vel);
    this.acc.set(0, 0);
  }
  wander() {
    const wanderPoint = this.vel.copy();
    wanderPoint.setMag(100)
    wanderPoint.add(this.loc)
    const wanderRadius = 50;

    let theta = this.wanderTheta + this.vel.heading();
    let x = cos(theta) * wanderRadius
    let y = sin(theta) * wanderRadius

    wanderPoint.add(x, y);
    let steer = p5.Vector.sub(wanderPoint, this.loc)
    steer.setMag(this.maxForce)

    this.applyForce(steer.x, steer.y)
    const randomDisplacement = 0.3
    this.wanderTheta += random(-randomDisplacement, randomDisplacement)
  }

  render() {
    push()
      stroke(255);
      strokeWeight(2);
      fill(255);
        push();
          translate(this.loc.x, this.loc.y);
          rotate(this.vel.heading());
          triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
        pop();
    pop();
  }

  
} 