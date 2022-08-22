import { Scene, Sprite } from "kontra"
import CONSTS from "./consts"
import { spriteFactory, SPRITE_TYPE } from "./sprites"

const initScene = () => {
  const sprites: Sprite[] = []
  let heroShip: Sprite

  const scene = Scene({
    id: 'main',
    objects: sprites,
    cullObjects: false,
  })

  return {
    scene,
    heroShip,
  }
}

export default initScene
