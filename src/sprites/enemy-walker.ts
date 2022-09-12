import { collides, emit, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import HealthText from "./health-text";

export default function EnemyWalker(coord: Vector, group: GameObject, jumper: boolean = false) {
  const initialCoord = coord
  let attackTimeout: any = null

  const walker = Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.WALKER_WIDTH,
    height: CONSTS.WALKER_HEIGHT,
    anchor: { x: 0, y: 1 },
    color: 'green',
    rotation: -Math.PI / 12,
    dx: -CONSTS.WALKER_MOVE_VELOCITY,

    initCoord: initialCoord,
    type: CONSTS.ENEMY_TYPE,
    health: CONSTS.WALKER_MAX_HEALTH,
    damage: CONSTS.WALKER_DAMAGE,
    isJumper: jumper,

    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = '#379139'
      ctx.fillRect(0, 0, CONSTS.WALKER_WIDTH, CONSTS.WALKER_HEIGHT)
      ctx.fillStyle = '#3FBC3D'
      ctx.fillRect(-50, CONSTS.WALKER_HEIGHT * 0.3, 100, 30)
      ctx.fillStyle = 'red'
      ctx.fillRect(0, CONSTS.WALKER_HEIGHT * 0.1, 30, 10)
    },

    update: function(dt) {
      if (jumper) {
        if (this.y === initialCoord.y) {
          this.dy = -CONSTS.WALKER_JUMP_VELOCITY
          this.ddy = CONSTS.GRAVITY_DDY
        } else if (this.y > initialCoord.y) {
          this.dy = 0
          this.ddy = 0
          this.y = initialCoord.y
        }
      }
      for (let obj of group.children) {
        const sprite = obj as Sprite
        if (sprite.type === CONSTS.PLAYER_TYPE && collides(this, sprite)) {
          if (!attackTimeout) {
            attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.WALKER_ATTACK_THROTTLE)
            sprite.health -= this.damage
            console.log('hunter hp', sprite.health)
            if (sprite.health <= 0) {
              emit('gameover', false)
            }
          }
          return
        }
      }
      this.advance(dt)
    },
  })

  const healthText = HealthText(
    Vector(0, -CONSTS.WALKER_HEIGHT - 20),
    CONSTS.WALKER_MAX_HEALTH,
    () => walker.health
  )

  walker.addChild(healthText)
  return walker
}
