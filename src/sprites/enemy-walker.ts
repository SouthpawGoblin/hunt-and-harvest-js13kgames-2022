import { collides, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function EnemyWalker(coord: Vector, group: GameObject, jumper: boolean = false) {
  const initialCoord = coord
  let attackTimeout: any = null

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.WALKER_WIDTH,
    height: CONSTS.WALKER_HEIGHT,
    anchor: { x: 0, y: 1 },
    color: 'green',
    dx: -CONSTS.WALKER_MOVE_VELOCITY,

    initCoord: initialCoord,
    type: CONSTS.ENEMY_TYPE,
    health: CONSTS.WALKER_MAX_HEALTH,
    damage: CONSTS.WALKER_DAMAGE,
    isJumper: jumper,

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
              alert('YOU LOSE')
              // TODO:
            }
          }
          return
        }
      }
      this.advance(dt)
    },
  })
}
