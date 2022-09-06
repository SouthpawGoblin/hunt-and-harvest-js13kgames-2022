import { collides, GameObject, Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function GhostFire(coord: Vector, group: GameObject) {
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
      this.advance(dt)
      
      if (this.x < initialCoord.x - CONSTS.GHOST_FIRE_MAX_DISTANCE){
        group.removeChild(this)
      } else {
        for (let obj of group.children) {
          const sprite = obj as Sprite
          if (sprite.type === CONSTS.PLAYER_TYPE && collides(this, sprite)) {
            group.removeChild(this)
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
