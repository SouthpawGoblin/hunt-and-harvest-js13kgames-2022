import { Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import GhostFire from './ghost_fire'

export default function EnemyWalkerGhost(coord: Vector, scene: Scene) {
  let attackTimeout: any = null

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.WALKER_GHOST_WIDTH,
    height: CONSTS.WALKER_GHOST_HEIGHT,
    anchor: { x: 0, y: 0 },
    color: 'gray',
    dx: -CONSTS.WALKER_GHOST_MOVE_VELOCITY,

    type: CONSTS.ENEMY_TYPE,
    health: CONSTS.WALKER_GHOST_MAX_HEALTH,

    update: function(dt) {
      this.advance(dt)
      if (!attackTimeout) {
        attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.WALKER_GHOST_ATTACK_INTERVAL)
        const fire = GhostFire(Vector(this.x, this.y + this.height / 2), scene)
        scene.add(fire)
      }
    },
  })
}
