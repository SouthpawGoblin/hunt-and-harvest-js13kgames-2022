import { collides, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import EnemyWalkerGhost from "./enemy-walker-ghost";
import TheVesselSoul from './the-vessel-soul';

export default function Bullet(coord: Vector, group: GameObject) {
  const initialCoord = coord

  return Sprite({
    x: coord.x,
    y: coord.y,
    width: CONSTS.BULLET_WIDTH,
    height: CONSTS.BULLET_HEIGHT,
    anchor: { x: 0, y: 0.5 },
    color: 'yellow',
    dx: CONSTS.BULLET_VELOCITY,

    type: CONSTS.ATTACK_TYPE,
    damage: CONSTS.BULLET_DAMAGE,

    update: function(dt) {
      this.advance(dt)
      
      if (this.x > initialCoord.x + CONSTS.BULLET_MAX_DISTANCE){
        group.removeChild(this)
      } else {
        for (let obj of group.children) {
          const sprite = obj as Sprite
          if ([CONSTS.ENEMY_TYPE, CONSTS.VESSEL_TYPE].includes(sprite.type) && collides(this, sprite)) {
            group.removeChild(this)
            sprite.health -= this.damage
            if (sprite.health <= 0) {
              if (sprite.type === CONSTS.ENEMY_TYPE) {
                // generate a walker ghost
                const ghost = EnemyWalkerGhost(
                  Vector(sprite.x, sprite.initCoord.y + CONSTS.LAND_THICKNESS * 2 + (sprite.isJumper ? CONSTS.WALKER_GHOST_HEIGHT * 1.3 : 0)),
                  group
                )
                group.addChild(ghost)
                group.removeChild(sprite)
              } else if (sprite.type === CONSTS.VESSEL_TYPE) {
                const vesselSoul = TheVesselSoul(Vector(sprite.x, sprite.initCoord.y + CONSTS.LAND_THICKNESS * 2), group)
                group.addChild(vesselSoul)
                group.removeChild(sprite)
              }
            }
            break
          }
        }
      }
    },
  })
}
