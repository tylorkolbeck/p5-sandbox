
let activeScene;

function setup() {
  activeScene = scene_flocking();
  activeScene.setup(); 
}

function draw() {
  activeScene.draw();
}