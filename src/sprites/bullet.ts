import { collides, Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function Bullet(coord: Vector, scene: Scene) {
  const initialCoord = coord

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.BULLET_WIDTH,
    height: CONSTS.BULLET_HEIGHT,
    anchor: { x: 0, y: 0.5 },
    color: 'yellow',
    dx: CONSTS.BULLET_VELOCITY,

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.BULLET_DAMAGE,

    update: function(dt) {
      this.advance(dt)
      
      if (this.x > initialCoord.x + CONSTS.BULLET_MAX_DISTANCE){
        scene.remove(this)
      } else {
        for (let obj of scene.objects) {
          const sprite = obj as Sprite
          if (sprite.type === CONSTS.ENEMY_TYPE && collides(this, sprite)) {
            scene.remove(this)
            sprite.health -= this.damage
            if (sprite.health <= 0) {
              scene.remove(sprite)
            }
            break
          }
        }
      }
    },
  })
}
