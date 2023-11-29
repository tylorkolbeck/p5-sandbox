class Wanderer extends BaseMover {
  perceptionRadius = 100;
  wanderRadius = 100;
  wanderTheta = PI / 2;
  constructor(location) {
    super(location);
    this.perceptionRadius = 100;
  }

  render() {
    noFill();
    circle(this.location.x, this.location.y, this.perceptionRadius);
    this.wander();
    super.update();
    super.display();
  }

  wander() {
    const wanderPoint = this.velocity.copy();
    wanderPoint.setMag(200);
    wanderPoint.add(this.location);
    circle(wanderPoint.x, wanderPoint.y, this.wanderRadius);

    let theta = this.wanderTheta + this.velocity.heading();

    let x = this.wanderRadius * cos(theta);
    let y = this.wanderRadius * sin(theta);
    
    wanderPoint.add(x, y);
    fill(0, 255, 0);
    noStroke();
    circle(wanderPoint.x, wanderPoint.y, .2 * 100);
    stroke(0)
    line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y);
    let steer = wanderPoint.sub(this.location);
    steer.setMag(this.maxForce);
    this.applyForce(steer);
    const displaceRange = 10;
    this.wanderTheta += random(-displaceRange, displaceRange);
    // const heading = this.angle;
    // const pointInFront = p5.Vector.fromAngle(heading);
    // pointInFront.mult(50);
    // pointInFront.add(this.location);

    // circle(pointInFront.x, pointInFront.y, 50);
    // // choose random point on that circle

    // const randomPoint = p5.Vector.random2D();
    // randomPoint.mult(50);
    // randomPoint.add(pointInFront);
    // circle(randomPoint.x, randomPoint.y, 10);

    

  }
}