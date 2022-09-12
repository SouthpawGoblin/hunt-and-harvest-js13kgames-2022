import { collides, GameObject, Sprite, Vector, Text } from "kontra";
import CONSTS from "../consts";
import VesselTear from './vessel-tear'
import VesselCanon from './vessel-canon'
import HealthText from './health-text'

export default function TheVesselSoul(coord: Vector, group: GameObject) {
  const initialCoord = coord
  let attackTimeout: any = null

  const vesselSoul = Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.VESSEL_RADIUS * 2,
    height: CONSTS.VESSEL_RADIUS,
    anchor: { x: 0, y: 0 },

    initCoord: initialCoord,
    type: CONSTS.VESSEL_TYPE,
    health: CONSTS.VESSEL_SOUL_MAX_HEALTH,

    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = '#aaaaaa'
      ctx.beginPath()
      ctx.ellipse(0, CONSTS.VESSEL_RADIUS, CONSTS.VESSEL_RADIUS, CONSTS.VESSEL_RADIUS, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#b20000'
      ctx.beginPath()
      ctx.ellipse(CONSTS.VESSEL_EYE_RADIUS - CONSTS.VESSEL_RADIUS, CONSTS.VESSEL_RADIUS, CONSTS.VESSEL_EYE_RADIUS, CONSTS.VESSEL_EYE_RADIUS, 0, 0, Math.PI * 2)
      ctx.fill()
    },

    update: function(dt) {
      this.advance(dt)

      if (!attackTimeout) {
        attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.VESSEL_ATTACK_INTERVAL)
        const rand = Math.random()
        if (rand < 0.5) {
          const tear = VesselTear(Vector(this.x - this.width / 2, this.y + this.height), group)
          group.addChild(tear)
        } else {
          const canon = VesselCanon(Vector(this.x - this.width / 2, this.y + this.height), group, true)
          group.addChild(canon)
        }
      }
    },
  })

  const healthText = HealthText(
    Vector(0, CONSTS.VESSEL_RADIUS * 2 + 60),
    CONSTS.VESSEL_SOUL_MAX_HEALTH,
    () => vesselSoul.health
  )

  vesselSoul.addChild(healthText)
  return vesselSoul
}
