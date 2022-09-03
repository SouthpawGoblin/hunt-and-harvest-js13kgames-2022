import { collides, Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function HarvestCrescent(coord: Vector, player: Sprite, scene: Scene) {
  let lifeTime = 0
  let hit = false

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.CRESCENT_WIDTH,
    height: CONSTS.CRESCENT_HEIGHT,
    anchor: { x: 0, y: 0 },
    color: 'yellow',

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.CRESCENT_DAMAGE,

    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.strokeStyle = this.color
      ctx.lineWidth = 5
      ctx.beginPath();
      ctx.ellipse(0, 0, CONSTS.CRESCENT_WIDTH, CONSTS.CRESCENT_HEIGHT, 0, -Math.PI / 2, Math.PI / 2)
      ctx.stroke();
    },

    update: function(dt) {
      this.advance(dt)
      if (lifeTime > CONSTS.CRESCENT_TTL / 1000) {
        player.removeChild(this)
        lifeTime = 0
      } else {
        lifeTime += dt || 0
        if (!hit) {
          for (let obj of scene.objects) {
            const sprite = obj as Sprite
            if (sprite.type === CONSTS.ENEMY_TYPE && collides(this, sprite)) {
              hit = true
              sprite.health -= this.damage
              if (sprite.health <= 0) {
                scene.remove(sprite)
              }
            }
          }
        }
      }
    },
  })
}
