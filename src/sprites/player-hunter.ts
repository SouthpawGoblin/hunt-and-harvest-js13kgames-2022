import { GameObject, Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import Bullet from './bullet';

export default function PlayerHunter(coord: Vector) {
  const initialCoord = coord
  let attackTimeout: any = null

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.PLAYER_WIDTH,
    height: CONSTS.PLAYER_HEIGHT,
    anchor: { x: 0, y: 1 },
    color: 'blue',
    ttl: 5,

    type: CONSTS.PLAYER_TYPE,
    health: CONSTS.PLAYER_HUNTER_MAX_HEALTH,

    update: function(dt) {
      this.advance(dt)

      if (this.y > initialCoord.y) {
        this.y = initialCoord.y
        this.dy = 0
        this.ddy = 0
      }
    },

    shoot: function(group: GameObject) {
      if (attackTimeout) {
        return
      }
      attackTimeout = setTimeout(() => attackTimeout = null, CONSTS.BULLET_THROTTLE)
      // TODO: use Pool
      const bullet = Bullet(Vector(this.x + this.width, this.y - this.height * 0.6), group)
      group.addChild(bullet)
    },
  })
}
