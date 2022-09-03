import { Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import HarvestCrescent from './harvest-crescent';

export default function PlayerDeath(coord: Vector, scene: Scene) {
  const initialCoord = coord
  let attackTimeout: any = null

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.PLAYER_WIDTH,
    height: CONSTS.PLAYER_HEIGHT,
    anchor: { x: 0, y: 0 },
    color: 'red',

    type: CONSTS.PLAYER_TYPE,
    health: CONSTS.PLAYER_DEATH_MAX_HEALTH,

    update: function(dt) {
      this.advance(dt)

      if (this.y < initialCoord.y) {
        this.y = initialCoord.y
        this.dy = 0
        this.ddy = 0
      }
    },

    harvest: function() {
      if (attackTimeout) {
        return
      }
      attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.CRESCENT_THROTTLE)
      // TODO: use Pool
      const crescent = HarvestCrescent(Vector(this.width * 2, this.height / 2), this, scene)
      this.addChild(crescent)
    },
  })
}
