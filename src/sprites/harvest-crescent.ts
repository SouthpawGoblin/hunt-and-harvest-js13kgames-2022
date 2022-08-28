import { Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function HarvestCrescent(coord: Vector, player: Sprite) {
  let lifeTime = 0

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.BULLET_WIDTH,
    height: CONSTS.BULLET_HEIGHT,
    anchor: { x: 0, y: 0 },
    color: 'yellow',

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
      }
    },
  })
}
