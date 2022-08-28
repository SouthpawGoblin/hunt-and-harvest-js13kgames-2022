import { GameObject, Scene, Vector } from "kontra";
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

      if (this.gameTime > 5) {
        console.log('spawn')
        // FIXME: enemy y coord
        const enemyWalker = EnemyWalker(Vector(300, 447))
        scene.add(enemyWalker)
        console.log(scene.objects)
        this.gameTime = 0
      }
    },
  })
}
