import { Scene, Vector } from "kontra"
import PlayerHunter from './sprites/player-hunter'
import PlayerDeath from './sprites/player-death'

const initScene = () => {
  const playerCoord = Vector(100, 300)
  const playerHunter = PlayerHunter(playerCoord)
  const playerDeath = PlayerDeath(playerCoord)

  const scene = Scene({
    id: 'main',
    objects: [
      playerHunter,
      playerDeath,
    ],
    cullObjects: false,
  })

  return scene
}

export default initScene
