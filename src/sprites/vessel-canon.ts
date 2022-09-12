import { collides, emit, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import VesselCanonBlast from './vessel-canon-blast'

export default function VesselCanon(coord: Vector, group: GameObject, inverse: boolean) {
  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.VESSEL_CANON_WIDTH,
    height: CONSTS.VESSEL_CANON_HEIGHT,
    anchor: { x: 1, y: 0.5 },
    color: 'red',
    dx: -Math.floor(Math.random() * (CONSTS.VESSEL_CANON_MAX_VELOCITY - CONSTS.VESSEL_CANON_MIN_VELOCITY) + CONSTS.VESSEL_CANON_MIN_VELOCITY),
    dy: CONSTS.VESSEL_CANON_Y_VELOCITY * (inverse ? 1 : -1),
    ddy: CONSTS.GRAVITY_DDY * (inverse ? -1 : 1),

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.VESSEL_CANON_DAMAGE,

    update: function(dt) {
      this.advance(dt)
      
      if (
        (inverse && this.y < (this.context.canvas.height / 2 + CONSTS.LAND_THICKNESS / 2)) ||
        (!inverse && this.y > (this.context.canvas.height / 2 - CONSTS.LAND_THICKNESS / 2))
      ) {
        const blast = VesselCanonBlast(Vector(this.x, this.y), group, inverse)
        group.addChild(blast)
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
