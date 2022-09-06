import { collides, GameObject, Sprite, Vector } from "kontra";
import CONSTS from "../consts";
import EnemyWalkerGhost from "./enemy-walker-ghost";

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
          if (sprite.type === CONSTS.ENEMY_TYPE && collides(this, sprite)) {
            group.removeChild(this)
            sprite.health -= this.damage
            if (sprite.health <= 0) {
              // generate a walker ghost
              const ghost = EnemyWalkerGhost(
                Vector(sprite.x, sprite.initCoord.y + CONSTS.LAND_THICKNESS * 2 + (sprite.isJumper ? CONSTS.WALKER_GHOST_HEIGHT : 0)),
                group
              )
              group.removeChild(sprite)
              group.addChild(ghost)
            }
            break
          }
        }
      }
    },
  })
}
