import { Sprite, Vector } from "kontra";

export default function PlayerHunter(coord: Vector) {
  return Sprite({
    x: coord.x,
    y: coord.y,
    width: 100,
    height: 300,
    anchor: { x: 0.5, y: 1 },
    color: 'blue',
  })
}
