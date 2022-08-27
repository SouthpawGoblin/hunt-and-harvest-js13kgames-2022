import { Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function PlayerDeath(coord: Vector) {
  const initialCoord = coord

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.PLAYER_WIDTH,
    height: CONSTS.PLAYER_HEIGHT,
    anchor: { x: 0, y: 0 },
    color: 'red',

    update: function(dt) {
      this.advance(dt)

      if (this.y < initialCoord.y) {
        this.y = initialCoord.y
        this.dy = 0
        this.ddy = 0
      }
    },
  })
}
