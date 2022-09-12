import { init, GameLoop, Scene, initKeys, onKey, offKey, on } from 'kontra';
import initScene from './scene'
import Intro from './intro'
import Outro from './outro'

const canvasElement = document.getElementById('main-canvas') as HTMLCanvasElement
const { canvas, context } = init(canvasElement)
initKeys()

const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}

let scene: Scene = null
let loop: GameLoop = null

const onLoad = () => {
  resizeCanvas()
  const intro = Intro(canvas)
  intro.render()

  onKey('space', function() {
    offKey('space')

    resizeCanvas()
    scene = initScene(canvas, context)
    loop = GameLoop({  // create the main game loop
      update: (dt) => { // update the game state
        scene.update(dt)
      },
      render: () => { // render the game state
        scene.render()
      }
    });
    loop.start();    // start the game
  })

  onKey('esc', function() {
    alert(`
    Game Controls:

    [A]: Move left
    [D]: Move right
    [Space]: Jump
    [Left Mouse]: Hunter shoot
    [Right Mouse]: Death harvest
    `)
  })
}

on('gameover', (success: boolean) => {
  loop.stop()
  scene.objects.forEach((obj) => scene.remove(obj))
  const outro = Outro(canvas, success)
  scene.add(outro)
})

window.addEventListener('load', onLoad);
window.addEventListener('resize', resizeCanvas);
window.addEventListener('contextmenu', (event) => event.preventDefault());
