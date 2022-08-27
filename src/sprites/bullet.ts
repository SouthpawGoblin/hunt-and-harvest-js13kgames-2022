import { Scene, Sprite, Vector } from "kontra";
import CONSTS from "../consts";

export default function Bullet(coord: Vector, scene: Scene) {
  const initialCoord = coord

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.BULLET_WIDTH,
    height: CONSTS.BULLET_HEIGHT,
    anchor: { x: 0, y: 0.5 },
    color: 'yellow',
    dx: CONSTS.BULLET_VELOCITY,

    update: function(dt) {
      this.advance(dt)
      
      if (this.x > initialCoord.x + CONSTS.BULLET_MAX_DISTANCE){
        scene.remove(this)
      }
    },
  })
}
