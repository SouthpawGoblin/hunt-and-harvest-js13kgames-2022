import { collides, Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function EnemyWalker(coord: Vector, scene: Scene) {
  let attackTimeout: any = null

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.WALKER_WIDTH,
    height: CONSTS.WALKER_HEIGHT,
    anchor: { x: 0, y: 1 },
    color: 'green',
    dx: -CONSTS.WALKER_MOVE_VELOCITY,

    type: CONSTS.ENEMY_TYPE,
    health: CONSTS.WALKER_MAX_HEALTH,
    damage: CONSTS.WALKER_DAMAGE,

    update: function(dt) {
      for (let obj of scene.objects) {
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
