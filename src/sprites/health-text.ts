import { Text, Vector } from "kontra";

export default function HealthText(coord: Vector, max: number, getCurrent: () => number) {
  return Text({
    text: '',
    color: 'white',
    font: 'bold 32px Arial',
    x: coord.x,
    y: coord.y,
    anchor: { x: 0.5, y: 1 },
    textAlign: 'center',

    update() {
      const cur = getCurrent()
      const ratio = cur / max
      this.text = `${cur} / ${max}`
      this.color = ratio > 0.7 ? 'green' : ratio < 0.3 ? 'red' : 'yellow'
    },
  })
}
