import { GameObject, Scene, Vector, Text, on } from "kontra";
import CONSTS from "./consts";
import EnemyWalker from "./sprites/enemy-walker";
import TheVessel from "./sprites/the-vessel";

enum EnemyEnum {
  WALKER = 1,
  JUMPER,
  GHOST,
  FLYING_GHOST,
  THE_VESSEL,
}

export default function Director(scene: Scene) {
  let waveTime = 0
  let nextInterval = CONSTS.ENEMY_SPAWN_INTERVAL
  let souls = 0
  let vesselLetLoose = false

  on('harvest', () => {
    console.log('harvest')
    if (souls < CONSTS.SOULS_NEEDED) {
      souls += 1
    }
  })

  const director = GameObject({
    x: 0,
    y: 0,
    width: 0,
    height: 0,

    update: function(dt) {
      if (vesselLetLoose) {
        return
      }
      if (souls >= CONSTS.SOULS_NEEDED) {
        vesselLetLoose = true
        setTimeout(() => {
          const canvas = scene.context.canvas
          const group = scene.objects[0] as GameObject
          group.children.forEach((child) => {
            if (child.type === CONSTS.ENEMY_TYPE) {
              group.removeChild(child)
            }
          })
          const vessel = TheVessel(Vector(canvas.width - 100, canvas.height / 2 - CONSTS.LAND_THICKNESS / 2), group)
          group.addChild(vessel)
        }, 1000)
        return
      }

      waveTime += dt * 1000
      // spawn enemy
      if (waveTime > nextInterval) {
        const canvas = scene.context.canvas
        const group = scene.objects[0] as GameObject
        const chance = souls > (CONSTS.SOULS_NEEDED / 2) ? 0.5 : (souls / (CONSTS.SOULS_NEEDED / 2) * 0.5)
        const type = Math.random() > chance ? EnemyEnum.WALKER : EnemyEnum.JUMPER
        switch(type) {
          case EnemyEnum.WALKER: {
            const enemyWalker = EnemyWalker(Vector(canvas.width, canvas.height / 2 - CONSTS.LAND_THICKNESS / 2), group)
            group.addChild(enemyWalker)
            break;
          }
          case EnemyEnum.JUMPER: {
            const enemyJumper = EnemyWalker(Vector(canvas.width, canvas.height / 2 - CONSTS.LAND_THICKNESS / 2), group, true)
            group.addChild(enemyJumper)
            break;
          }
        }
        waveTime = 0
        nextInterval = CONSTS.ENEMY_SPAWN_INTERVAL + Math.random() * 1000 - 800
      }
    },
  })

  const soulsText = Text({
    x: 40,
    y: 40,
    text: '',
    color: 'white',
    font: 'bold 32px Arial',

    update() {
      this.text = `Souls Harvested: ${souls} / ${CONSTS.SOULS_NEEDED}`
    }
  })

  director.addChild(soulsText)
  return director
}
