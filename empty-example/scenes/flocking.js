function scene_flocking() {
  // Environment forces
  let wind;
  let gravity;
  let flockLeader;
  const CV_WIDTH = 1600;
  const CV_HEIGHT = 1600;
  const DRAG_COEFFICIENT = 0.5;
  const FRICTION_COEFFICIENT = 0.3;
  let FLOCK_SEPERATION = 10;
  const FLOCK_SEPERATION_VECTOR_MULTIPLIER = 50;
  let FLOCK_MAX_FORCE = 0.5;

  const FLOCK_COUNT = 50;

  const controls = {
    seperationSlider: {
      position: {
        x: CV_WIDTH + 20,
        y: 50,
      },
      style: {
        width: "80px",
      },
      _element: null,
      render() {
        if (!this._element) {
          this._element = createSlider(0, 255, 50);
          this._element.position(this.position.x, this.position.y);
          this._element.style("width", this.style.width);
        }
        if (this.label) {
          const label = createDiv(this.label);
          label.position(this.position.x, this.position.y - 20);
        }
      },
      get element() {
        return this._element;
      },
      label: "Flock Seperation",
    },
    seperationForceSlider: {
      position: {
        x: CV_WIDTH + 20,
        y: 100,
      },
      style: {
        width: "80px",
      },
      _element: null,
      render() {
        if (!this._element) {
          this._element = createSlider(0, 255, 200);
          this._element.position(this.position.x, this.position.y);
          this._element.style("width", this.style.width);
        }
        if (this.label) {
          const label = createDiv(this.label);
          label.position(this.position.x, this.position.y - 20);
        }
      },
      get element() {
        return this._element;
      },
      label: `Flock Seperation Force`,
    },
  };

  const movers = [];

  function setup() {
    flockLeader = new BaseMover(createVector(CV_WIDTH / 2, CV_HEIGHT / 2));

    createCanvas(CV_WIDTH, CV_HEIGHT);
    wind = createVector(0.5, 0.2);
    gravity = createVector(0, 0.8);
    // put setup code here

    for (let i = 0; i < FLOCK_COUNT; i++) {
      movers.push(new Wanderer(createVector(CV_WIDTH / 2, CV_HEIGHT / 2)));

      movers[i].setVelocity(random(-2, 2), random(-2, 2));
      movers[i].perceptionRadius = FLOCK_SEPERATION;
      movers[i].maxSpeed = random(2, 4);
    }

    // Setup controls
    controls.seperationSlider.render();
    controls.seperationForceSlider.render();

    flockLeader.applyForceVector(createVector(0.1, 0.1));
  }

  function draw() {
    background(200);
    // FLOCK_SEPERATION = controls.seperationSlider.element.value();
    FLOCK_SEPERATION = random(20, 100);
    FLOCK_MAX_FORCE = controls.seperationForceSlider.element.value();

    flockLeader.fillColor = "purple";
    // flockLeader.applyForceVector(createVector(0.1, 0.1));


    flockLeader.wander();
    flockLeader.update();
    flockLeader.draw();
    bounceOnBorders(flockLeader);
    movers.forEach((mover) => {
      mover.perceptionRadius = FLOCK_SEPERATION;
      mover.fillColor = "dodgerblue";

      applyFriction(mover);

      const mouse = createVector(mouseX, mouseY);

      if (mouseIsPressed) {
        const direction = p5.Vector.sub(mouse, mover.location);
        direction.normalize();
        direction.mult(0.5);
        mover.applyForceVector(direction);
      } else {
        const direction = p5.Vector.sub(flockLeader.location, mover.location);
        direction.normalize();
        direction.mult(0.5);
        mover.applyForceVector(direction);
      }

      if (keyIsDown(RIGHT_ARROW)) mover.applyForceVector(createVector(1, 0));
      if (keyIsDown(LEFT_ARROW)) mover.applyForceVector(createVector(-1, 0));
      if (keyIsDown(UP_ARROW)) mover.applyForceVector(createVector(0, -1));
      if (keyIsDown(DOWN_ARROW)) mover.applyForceVector(createVector(0, 1));

      // Dont need to bounds check because they follow the flock leader
      // bounceOnBorders(mover);
      // mover.drawVelocityVector();

      movers.forEach((otherMover) => {
        if (otherMover.id !== mover.id) {
          const distanceToOther = otherMover.location.dist(mover.location);

          if (distanceToOther < FLOCK_SEPERATION) {
            // mover.fillColor = "red";
            const distanceVector = p5.Vector.sub(
              mover.location,
              otherMover.location
            );
            const distance = distanceVector.mag();
            const forceMagnatude = min(
              FLOCK_SEPERATION_VECTOR_MULTIPLIER / distance,
              FLOCK_MAX_FORCE
            );
            const seperationVector = distanceVector
              .normalize()
              .mult(forceMagnatude);
            mover.applyForceVector(seperationVector);
          }
        }
      });
      mover.draw();
    });
  }

  function bounceOnBorders(mover, cvWidth = CV_WIDTH, cvHeight = CV_HEIGHT) {
    if (mover.location.x > cvWidth || mover.location.x < 0) {
      // set the mover back inside the canvas
      if (mover.location.x > cvWidth) mover.location.x = cvWidth - 10;
      else mover.location.x = 0;
      mover.reverseX();
    }
    if (mover.location.y > cvHeight || mover.location.y < 0) {
      // set the mover back inside the canvas

      if (mover.location.y > cvHeight) mover.location.y = cvHeight - 10;
      else mover.location.y = 0;
      mover.reverseY();
    }
  }

  function applyFriction(mover, frictionCoefficient = FRICTION_COEFFICIENT) {
    const dragVelocity = mover.getVelocity();
    dragVelocity.normalize();
    dragVelocity.mult(-1);
    dragVelocity.mult(frictionCoefficient);

    mover.applyForceVector(dragVelocity);
  }

  return {
    setup,
    draw
  }
}
