import { GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import Scyth from './scyth';

export default function PlayerDeath(coord: Vector, group: GameObject) {
  const initialCoord = coord
  let attackTimeout: any = null

  const scyth = Scyth(group)

  const death = Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.PLAYER_WIDTH,
    height: CONSTS.PLAYER_HEIGHT,
    anchor: { x: 0.5, y: 0 },
    color: 'red',

    type: CONSTS.PLAYER_TYPE,
    health: CONSTS.PLAYER_DEATH_MAX_HEALTH,
    scyth,

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
      attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.SCYTH_INTERVAL)
      this.scyth.attack()
    },
  })

  death.addChild(scyth)
  return death
}
