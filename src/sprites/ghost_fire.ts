import { collides, Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function GhostFire(coord: Vector, scene: Scene, curve: boolean = false) {
  const initialCoord = coord

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.GHOST_FIRE_WIDTH,
    height: CONSTS.GHOST_FIRE_HEIGHT,
    anchor: { x: 1, y: 0.5 },
    color: 'yellow',
    dx: -CONSTS.GHOST_FIRE_VELOCITY,

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.GHOST_FIRE_DAMAGE,

    update: function(dt) {
      if (curve) {
        // if (this.y > initialCoord.y )
      }
      this.advance(dt)
      
      if (this.x < initialCoord.x - CONSTS.GHOST_FIRE_MAX_DISTANCE){
        scene.remove(this)
      } else {
        for (let obj of scene.objects) {
          const sprite = obj as Sprite
          if (sprite.type === CONSTS.PLAYER_TYPE && collides(this, sprite)) {
            scene.remove(this)
            sprite.health -= this.damage
            if (sprite.health <= 0) {
              alert('YOU LOSE')
              // TODO:
            }
            break
          }
        }
      }
    },
  })
}
