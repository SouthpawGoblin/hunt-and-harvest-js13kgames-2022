import { GameObject, initKeys, initPointer, onKey, onPointer, Scene, Vector } from "kontra"
import CONSTS from './consts'
import Director from './director'
import PlayerHunter from './sprites/player-hunter'
import PlayerDeath from './sprites/player-death'
import Land from './sprites/land'
import TheVessel from "./sprites/the-vessel"

const initScene = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  const objectGroup = GameObject()
  const scene = Scene({
    id: 'main',
    objects: [objectGroup],
    cullObjects: false,
  })
  
  const land = Land(canvas.height / 2, canvas.width)
  const playerHunter = PlayerHunter(Vector(200, canvas.height / 2 - CONSTS.LAND_THICKNESS / 2))
  const playerDeath = PlayerDeath(Vector(200, canvas.height / 2 + CONSTS.LAND_THICKNESS / 2), objectGroup)

  // const theVessel = TheVessel(Vector(canvas.width / 4 * 3, canvas.height / 2 - CONSTS.LAND_THICKNESS / 2), objectGroup)
  // objectGroup.addChild(theVessel)

  objectGroup.addChild(land)
  objectGroup.addChild(playerHunter)
  objectGroup.addChild(playerDeath)

  const director = Director(scene)
  objectGroup.addChild(director)
  
  initKeys()
  onKey('space', function() {
    if (playerHunter.ddy === 0) {
      playerHunter.dy = -CONSTS.PLAYER_JUMP_VELOCITY
      playerHunter.ddy = CONSTS.GRAVITY_DDY
    }
    if (playerDeath.ddy === 0) {
      playerDeath.dy = CONSTS.PLAYER_JUMP_VELOCITY
      playerDeath.ddy = -CONSTS.GRAVITY_DDY
    }
  })
  onKey(['a', 'left'], function() {
    if (playerHunter.dx === 0) {
      playerHunter.dx = -CONSTS.PLAYER_MOVE_VELOCITY
      playerHunter.rotation = -CONSTS.UNIT_MOVE_ROTATION
    }
    if (playerDeath.dx === 0) {
      playerDeath.dx = -CONSTS.PLAYER_MOVE_VELOCITY
      playerDeath.rotation = CONSTS.UNIT_MOVE_ROTATION
    }
  }, { handler: 'keydown' })
  onKey(['a', 'left'], function() {
    if (playerHunter.dx < 0) {
      playerHunter.dx = 0
      playerHunter.rotation = 0
    }
    if (playerDeath.dx < 0) {
      playerDeath.dx = 0
      playerDeath.rotation = 0
    }
  }, { handler: 'keyup' })
  
  onKey(['d', 'right'], function() {
    if (playerHunter.dx === 0) {
      playerHunter.dx = CONSTS.PLAYER_MOVE_VELOCITY
      playerHunter.rotation = CONSTS.UNIT_MOVE_ROTATION
    }
    if (playerDeath.dx === 0) {
      playerDeath.dx = CONSTS.PLAYER_MOVE_VELOCITY
      playerDeath.rotation = -CONSTS.UNIT_MOVE_ROTATION
    }
  }, { handler: 'keydown' })
  onKey(['d', 'right'], function() {
    if (playerHunter.dx > 0) {
      playerHunter.dx = 0
      playerHunter.rotation = 0
    }
    if (playerDeath.dx > 0) {
      playerDeath.dx = 0
      playerDeath.rotation = 0
    }
  }, { handler: 'keyup' })

  initPointer()
  onPointer('up', function(event: MouseEvent) {
    if (event.button === 0) {
      // left click
      playerHunter.shoot(objectGroup)
    } else if (event.button === 2) {
      // right click
      playerDeath.harvest()
    }
  })

  return scene
}

export default initScene
