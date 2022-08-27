import { Sprite } from "kontra";

export default function Land(y: number, width: number) {
  return Sprite({
    x: 0,
    y,
    width,
    height: 20,
    anchor: { x: 0, y: 0.5 },
    color: 'white',
  })
}
