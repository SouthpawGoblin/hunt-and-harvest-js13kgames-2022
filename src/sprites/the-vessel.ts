import { collides, GameObject, Sprite, Vector, Text } from "kontra";
import CONSTS from "../consts";
import VesselTear from './vessel-tear'
import VesselCanon from './vessel-canon'
import HealthText from './health-text'
import EnemyWalkerGhost from "./enemy-walker-ghost";

enum VesselMoveBehavior {
  STILL = 1,
  FORWARD,
  BACKWARD,
  JUMP_FORWARD,
  JUMP_BACKWARD,
}

export default function TheVessel(coord: Vector, group: GameObject) {
  const initialCoord = coord
  let attackTimeout: any = null
  let moveBehavior = 1
  let moving = false
  let moveTimeCount = 0

  const vessel = Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.VESSEL_RADIUS * 2,
    height: CONSTS.VESSEL_RADIUS,
    anchor: { x: 0, y: 1 },

    initCoord: initialCoord,
    type: CONSTS.VESSEL_TYPE,
    health: CONSTS.VESSEL_MAX_HEALTH,

    render: function() {
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

      if (!moving) {
        moving = true
        switch(moveBehavior) {
          case VesselMoveBehavior.FORWARD: {
            this.dx = -CONSTS.VESSEL_MOVE_VELOCITY
            break
          }
          case VesselMoveBehavior.BACKWARD: {
            this.dx = CONSTS.VESSEL_MOVE_VELOCITY
            break
          }
          case VesselMoveBehavior.JUMP_FORWARD: {
            this.dx = -CONSTS.VESSEL_MOVE_VELOCITY
            this.dy = -CONSTS.VESSEL_JUMP_VELOCITY
            this.ddy = CONSTS.GRAVITY_DDY
            break
          }
          case VesselMoveBehavior.JUMP_BACKWARD: {
            this.dx = CONSTS.VESSEL_MOVE_VELOCITY
            this.dy = -CONSTS.VESSEL_JUMP_VELOCITY
            this.ddy = CONSTS.GRAVITY_DDY
            break
          }
        }
      } else {
        let shouldChangeMove = false
        switch(moveBehavior) {
          case VesselMoveBehavior.STILL:
          case VesselMoveBehavior.FORWARD:
          case VesselMoveBehavior.BACKWARD: {
            moveTimeCount += dt * 1000
            if (moveTimeCount > CONSTS.VESSEL_MOVE_INTERVAL) {
              shouldChangeMove = true
            }
            break
          }
          case VesselMoveBehavior.JUMP_FORWARD:
          case VesselMoveBehavior.JUMP_BACKWARD: {
            if (this.y > initialCoord.y) {
              this.y = initialCoord.y
              this.dx = 0
              this.dy = 0
              this.ddy = 0
              shouldChangeMove = true
            }
            break
          }
        }
        if (shouldChangeMove) {
          moveTimeCount = 0
          moving = false
          let choices = [1, 2, 3, 4, 5]
          if (this.x <= this.context.canvas.width / 2) {
            choices = [3, 5]
          } else if (this.x >= this.context.canvas.width - this.width) {
            choices = [2, 4]
          }
          moveBehavior = choices[Math.floor(Math.random() * choices.length)] as VesselMoveBehavior
        }
      }

      if (!attackTimeout) {
        attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.VESSEL_ATTACK_INTERVAL)
        const rand = Math.random()
        if (rand < 0.4) {
          const tear = VesselTear(Vector(this.x - this.width / 2, this.y - this.height), group)
          group.addChild(tear)
        } else if (rand > 0.6) {
          const canon = VesselCanon(Vector(this.x - this.width / 2, this.y - this.height), group, false)
          group.addChild(canon)
        } else {
          const ghost = EnemyWalkerGhost(
            Vector(this.x, initialCoord.y + CONSTS.LAND_THICKNESS * 2 + (Math.random() > 0.5 ? CONSTS.WALKER_GHOST_HEIGHT * 1.3 : 0)),
            group
          )
          group.addChild(ghost)
        }
      }
    },
  })

  const healthText = HealthText(
    Vector(0, -CONSTS.VESSEL_RADIUS * 2 - 20 - 20),
    CONSTS.VESSEL_MAX_HEALTH,
    () => vessel.health
  )

  vessel.addChild(healthText)
  return vessel
}
