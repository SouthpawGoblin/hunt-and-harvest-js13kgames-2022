import { GameObject, Scene, Vector } from "kontra";
import CONSTS from "./consts";
import EnemyWalker from "./sprites/enemy-walker";

export default function Director(scene: Scene) {
  return GameObject({
    x: 0,
    y: 0,
    width: 0,
    height: 0,

    gameTime: 0,

    update: function(dt) {
      this.gameTime += dt

      // spawn walker
      if (this.gameTime > 2) {
        console.log('spawn')
        const canvas = scene.context.canvas
        const enemyWalker = EnemyWalker(Vector(canvas.width - 800, canvas.height / 2 - CONSTS.LAND_THICKNESS / 2), scene, true)
        scene.add(enemyWalker)
        console.log(scene.objects)
        this.gameTime = 0
      }
    },
  })
}
