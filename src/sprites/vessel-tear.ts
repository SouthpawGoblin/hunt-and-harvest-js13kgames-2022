import { collides, emit, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function VesselTear(coord: Vector, group: GameObject) {
  const initialCoord = coord

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.VESSEL_TEAR_WIDTH,
    height: CONSTS.VESSEL_TEAR_HEIGHT,
    anchor: { x: 0, y: 0.5 },
    color: 'red',
    dx: -CONSTS.VESSEL_TEAR_VELOCITY,

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.VESSEL_TEAR_DAMAGE,

    update: function(dt) {
      this.advance(dt)
      
      if (this.x > initialCoord.x + CONSTS.VESSEL_TEAR_MAX_DISTANCE){
        group.removeChild(this)
      } else {
        for (let obj of group.children) {
          const sprite = obj as Sprite
          if (sprite.type === CONSTS.PLAYER_TYPE && collides(this, sprite)) {
            group.removeChild(this)
            sprite.health -= this.damage
            if (sprite.health <= 0) {
              emit('gameover', false)
            }
            break
          }
        }
      }
    },
  })
}
