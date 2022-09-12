import { collides, emit, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function VesselCanonBlast(coord: Vector, group: GameObject, inverse: boolean) {
  let lifetime = 0
  let hit = false

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.VESSEL_CANON_BLAST_RADIUS * 2,
    height: CONSTS.VESSEL_CANON_BLAST_RADIUS,
    anchor: { x: 0.5, y: inverse ? 0 : 1 },
    color: 'red',

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.VESSEL_CANON_BLAST_DAMAGE,

    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = 'red'
      ctx.beginPath()
      ctx.ellipse(0, CONSTS.VESSEL_CANON_BLAST_RADIUS * (inverse ? 0 : 1), CONSTS.VESSEL_CANON_BLAST_RADIUS, CONSTS.VESSEL_CANON_BLAST_RADIUS, inverse ? Math.PI : 0, -Math.PI, 0)
      ctx.fill()
    },

    update: function(dt) {
      this.advance(dt)
      
      lifetime += (dt || 0) * 1000
      if (lifetime >= CONSTS.VESSEL_CANON_BLAST_LIFETIME) {
        group.removeChild(this)
      } else if (!hit) {
        for (let obj of group.children) {
          const sprite = obj as Sprite
          if (sprite.type === CONSTS.PLAYER_TYPE && collides(this, sprite)) {
            hit = true
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
