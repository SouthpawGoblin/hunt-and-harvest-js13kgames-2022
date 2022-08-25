import { init, GameLoop, Scene, Sprite, initKeys, onKey } from 'kontra';
import initScene from './scene'

const canvasElement = document.getElementById('main-canvas') as HTMLCanvasElement
const { canvas, context } = init(canvasElement)
initKeys()

const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}

const onLoad = () => {
  resizeCanvas()

  const scene = initScene()
  
  const loop = GameLoop({  // create the main game loop
    update: (dt) => { // update the game state
      scene.update(dt)
    },
    render: () => { // render the game state
      scene.render()
    }
  });
  
  // onKey('space', function() {
  //   switch (heroShip.direction) {
  //     case 'n': heroShip.coordY -= 1;break
  //     case 'e': heroShip.coordX += 1;break
  //     case 's': heroShip.coordY += 1;break
  //     case 'w': heroShip.coordX -= 1;break
  //   }
  // })
  // onKey(['w', 'up'], function() {
  //   heroShip.direction = 'n'
  // })
  // onKey(['a', 'left'], function() {
  //   heroShip.direction = 'w'
  // })
  // onKey(['s', 'down'], function() {
  //   heroShip.direction = 's'
  // })
  // onKey(['e', 'right'], function() {
  //   heroShip.direction = 'e'
  // })

  loop.start();    // start the game
}

window.addEventListener('load', onLoad);
window.addEventListener('resize', resizeCanvas);

