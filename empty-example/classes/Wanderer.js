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
    super.update();
    super.display();
  }
}