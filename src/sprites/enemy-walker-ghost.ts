import { GameObject, Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import GhostFire from './ghost_fire'
import HealthText from "./health-text";

export default function EnemyWalkerGhost(coord: Vector, group: GameObject) {
  let attackTimeout: any = null

  const ghost = Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.WALKER_GHOST_WIDTH,
    height: CONSTS.WALKER_GHOST_HEIGHT,
    anchor: { x: 0, y: 0 },
    color: 'gray',
    dx: -CONSTS.WALKER_GHOST_MOVE_VELOCITY,

    type: CONSTS.ENEMY_TYPE,
    health: CONSTS.WALKER_GHOST_MAX_HEALTH,

    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = 'gray'
      ctx.fillRect(0, 0, CONSTS.WALKER_GHOST_WIDTH, CONSTS.WALKER_GHOST_HEIGHT)
      ctx.fillStyle = '#4d4d4d'
      ctx.fillRect(-50, CONSTS.WALKER_GHOST_HEIGHT * 0.7 - 30, 100, 30)
      ctx.fillStyle = 'red'
      ctx.fillRect(0, CONSTS.WALKER_GHOST_HEIGHT * 0.9 - 10, 30, 10)
    },

    update: function(dt) {
      this.advance(dt)
      if (!attackTimeout) {
        attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.WALKER_GHOST_ATTACK_INTERVAL)
        const fire = GhostFire(Vector(this.x, this.y + this.height / 2), group)
        group.addChild(fire)
      }
    },
  })

  const healthText = HealthText(
    Vector(0, CONSTS.WALKER_GHOST_HEIGHT + 60),
    CONSTS.WALKER_GHOST_MAX_HEALTH,
    () => ghost.health
  )

  ghost.addChild(healthText)
  return ghost
}
