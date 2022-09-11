import { collides, GameObject, Sprite } from "kontra";
import CONSTS from "../consts";

export default function Scyth(group: GameObject) {
  let hit = false
  let attackingOut = false
  let attackingBack = false

  return Sprite({
    x: 0,
    y: CONSTS.PLAYER_HEIGHT * 0.6,
    width: 270,
    height: 80,
    anchor: { x: 0, y: 0.5 },
    rotation: CONSTS.SCYTH_START_ANGLE,

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.SCYTH_DAMAGE,

    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = 'brown'
      ctx.fillRect(-50, 0, 200, 20)
      ctx.fillStyle = 'silver'
      ctx.fillRect(150, -60, 20, 80)
    },

    update: function(dt) {
      if (dt) {
        if (attackingOut && this.rotation <= CONSTS.SCYTH_START_ANGLE && this.rotation > CONSTS.SCYTH_END_ANGLE) {
          this.rotation -= dt / (CONSTS.SCYTH_ANIMATION_DURATION / 1000) * Math.PI
          if (this.rotation <= CONSTS.SCYTH_END_ANGLE) {
            attackingOut = false
            attackingBack = true
          }
        } else if (attackingBack) {
          this.rotation += dt / (CONSTS.SCYTH_ANIMATION_DURATION / 1000) * Math.PI
          if (this.rotation >= CONSTS.SCYTH_START_ANGLE) {
            attackingBack = false
            hit = false
            this.rotation = CONSTS.SCYTH_START_ANGLE
          }
        }

        if (!hit && (attackingOut || attackingBack)) {
          for (let obj of group.children) {
            const sprite = obj as Sprite
            if (sprite.type === CONSTS.ENEMY_TYPE && collides(this, sprite)) {
              hit = true
              sprite.health -= this.damage
              if (sprite.health <= 0) {
                group.removeChild(sprite)
              }
            }
          }
        }
      }
    },

    attack() {
      attackingOut = true
    }
  })
}
