import { init, GameLoop, Scene, Sprite, initKeys, onKey } from 'kontra';
import initScene from './scene'

const canvasElement = document.getElementById('main-canvas') as HTMLCanvasElement
const { canvas, context } = init(canvasElement)
initKeys()

const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}

let scene: Scene
let heroShip: Sprite

const onLoad = () => {
  resizeCanvas()

  const sceneResult = initScene()
  scene = sceneResult.scene
  heroShip = sceneResult.heroShip
  
  const loop = GameLoop({  // create the main game loop
    update: (dt) => { // update the game state
      scene.update(dt)
      scene.lookAt(heroShip)
    },
    render: () => { // render the game state
      scene.render()
    }
  });
  
  loop.start();    // start the game
}

window.addEventListener('load', onLoad);
window.addEventListener('resize', resizeCanvas);

onKey('space', function() {
  switch (heroShip.direction) {
    case 'n': heroShip.coordY -= 1;break
    case 'e': heroShip.coordX += 1;break
    case 's': heroShip.coordY += 1;break
    case 'w': heroShip.coordX -= 1;break
  }
})
// TODO: consider ship blink
onKey(['w', 'up'], function() {
  heroShip.direction = 'n'
})
onKey(['a', 'left'], function() {
  heroShip.direction = 'w'
})
onKey(['s', 'down'], function() {
  heroShip.direction = 's'
})
onKey(['e', 'right'], function() {
  heroShip.direction = 'e'
})
