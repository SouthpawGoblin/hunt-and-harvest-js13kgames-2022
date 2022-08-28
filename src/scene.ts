import { initKeys, initPointer, onKey, onPointer, Scene, Vector } from "kontra"
import CONSTS from './consts'
import Director from './director'
import PlayerHunter from './sprites/player-hunter'
import PlayerDeath from './sprites/player-death'
import Land from './sprites/land'

const initScene = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  const land = Land(canvas.height / 2, canvas.width)
  const playerHunter = PlayerHunter(Vector(200, canvas.height / 2 - land.height / 2))
  const playerDeath = PlayerDeath(Vector(200, canvas.height / 2 + land.height / 2))
  
  const scene = Scene({
    id: 'main',
    objects: [
      land,
      playerHunter,
      playerDeath,
    ],
    cullObjects: false,
  })

  const director = Director(scene)
  scene.add(director)
  
  initKeys()
  onKey('space', function() {
    if (playerHunter.ddy === 0) {
      playerHunter.dy = -CONSTS.PLAYER_JUMP_VELOCITY
      playerHunter.ddy = 2000
    }
    if (playerDeath.ddy === 0) {
      playerDeath.dy = CONSTS.PLAYER_JUMP_VELOCITY
      playerDeath.ddy = -2000
    }
  })
  onKey(['a', 'left'], function() {
    if (playerHunter.dx === 0) {
      playerHunter.dx = -CONSTS.PLAYER_MOVE_VELOCITY
    }
    if (playerDeath.dx === 0) {
      playerDeath.dx = -CONSTS.PLAYER_MOVE_VELOCITY
    }
  }, { handler: 'keydown' })
  onKey(['a', 'left'], function() {
    if (playerHunter.dx < 0) {
      playerHunter.dx = 0
    }
    if (playerDeath.dx < 0) {
      playerDeath.dx = 0
    }
  }, { handler: 'keyup' })
  
  onKey(['d', 'right'], function() {
    if (playerHunter.dx === 0) {
      playerHunter.dx = CONSTS.PLAYER_MOVE_VELOCITY
    }
    if (playerDeath.dx === 0) {
      playerDeath.dx = CONSTS.PLAYER_MOVE_VELOCITY
    }
  }, { handler: 'keydown' })
  onKey(['d', 'right'], function() {
    if (playerHunter.dx > 0) {
      playerHunter.dx = 0
    }
    if (playerDeath.dx > 0) {
      playerDeath.dx = 0
    }
  }, { handler: 'keyup' })

  initPointer()
  onPointer('up', function(event: MouseEvent) {
    if (event.button === 0) {
      // left click
      playerHunter.shoot(scene)
    } else if (event.button === 2) {
      // right click
      playerDeath.harvest()
    }
  })

  return scene
}

export default initScene
