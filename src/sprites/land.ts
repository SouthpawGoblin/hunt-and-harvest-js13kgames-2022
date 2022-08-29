import { Sprite } from "kontra";
import CONSTS from "../consts";

export default function Land(y: number, width: number) {
  return Sprite({
    x: 0,
    y,
    width,
    height: CONSTS.LAND_THICKNESS,
    anchor: { x: 0, y: 0.5 },
    color: 'white',
  })
}
