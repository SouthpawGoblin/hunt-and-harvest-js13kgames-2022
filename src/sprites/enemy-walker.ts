import { Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function EnemyWalker(coord: Vector) {
  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.WALKER_WIDTH,
    height: CONSTS.WALKER_HEIGHT,
    anchor: { x: 0, y: 1 },
    color: 'green',
    dx: -CONSTS.WALKER_MOVE_VELOCITY,

    update: function(dt) {
      this.advance(dt)
      // collision detection
    },
  })
}
