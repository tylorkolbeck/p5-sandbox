function scene_experiment_wander() {
  let WIDTH = 800;
  let HEIGHT = 800;
  let wanderer = new Vehicle(WIDTH / 2, HEIGHT / 2)

  function setup() {
    createCanvas(WIDTH, HEIGHT)
  }
  function draw() {
    background(146,86,161)
    wanderer.wander()
    wanderer.update()
    wanderer.render()
  }


  return {
    setup,
    draw
  }
}