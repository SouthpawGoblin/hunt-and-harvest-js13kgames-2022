import { collides, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function TheVessel(coord: Vector, group: GameObject) {
  const initialCoord = coord
  let attackTimeout: any = null

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.WALKER_WIDTH,
    height: CONSTS.WALKER_HEIGHT,
    anchor: { x: 0, y: 1 },

    initCoord: initialCoord,
    type: CONSTS.ENEMY_TYPE,
    health: CONSTS.VESSEL_MAX_HEALTH,

    render: function() {
      console.log('render')
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = '#379139'
      ctx.fillRect(-CONSTS.VESSEL_RADIUS - 10, CONSTS.VESSEL_RADIUS - CONSTS.VESSEL_LEG_HEIGHT, CONSTS.VESSEL_LEG_WIDTH, CONSTS.VESSEL_LEG_HEIGHT)
      ctx.fillRect(CONSTS.VESSEL_RADIUS - CONSTS.VESSEL_LEG_WIDTH - 10, CONSTS.VESSEL_RADIUS - CONSTS.VESSEL_LEG_HEIGHT, CONSTS.VESSEL_LEG_WIDTH, CONSTS.VESSEL_LEG_HEIGHT)
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.ellipse(0, -20, CONSTS.VESSEL_RADIUS, CONSTS.VESSEL_RADIUS, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'red'
      ctx.beginPath()
      ctx.ellipse(CONSTS.VESSEL_EYE_RADIUS - CONSTS.VESSEL_RADIUS, -20, CONSTS.VESSEL_EYE_RADIUS, CONSTS.VESSEL_EYE_RADIUS, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#3FBC3D'
      ctx.fillRect(-CONSTS.VESSEL_RADIUS + 10, CONSTS.VESSEL_RADIUS - CONSTS.VESSEL_LEG_HEIGHT, CONSTS.VESSEL_LEG_WIDTH, CONSTS.VESSEL_LEG_HEIGHT)
      ctx.fillRect(CONSTS.VESSEL_RADIUS - CONSTS.VESSEL_LEG_WIDTH + 10, CONSTS.VESSEL_RADIUS - CONSTS.VESSEL_LEG_HEIGHT, CONSTS.VESSEL_LEG_WIDTH, CONSTS.VESSEL_LEG_HEIGHT)
    },

    update: function(dt) {
      this.advance(dt)
    },
  })
}
