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

  const scene = initScene(canvas, context)
  
  const loop = GameLoop({  // create the main game loop
    update: (dt) => { // update the game state
      scene.update(dt)
    },
    render: () => { // render the game state
      scene.render()
    }
  });
  
  loop.start();    // start the game
}

window.addEventListener('load', onLoad);
window.addEventListener('resize', resizeCanvas);
window.addEventListener('contextmenu', (event) => event.preventDefault());
