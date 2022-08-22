import { Sprite } from 'kontra';
import CONSTS from './consts';

const CELL_SIZE = CONSTS.UNIT_PIXELS
const HALF_CELL_SIZE = CELL_SIZE / 2

export enum SPRITE_TYPE {
  BLOCK = 1,
  BLOCK_SHOOTABLE,
  BLOCK_BOMBABLE,
  HERO_SHIP,
  EMEMY_ROCK,
  EMEMY_TENTACLE,
  EMEMY_SPITTER,
  UPGRADE_MISSILE,
  UPGRADE_BLINK,
  UPGRADE_NANOBOTS,
  UPGRADE_SHIELD,
  THE_EYE,
  THE_SOCKET,
}

export type CustomSpriteProps = {
  coordX: number
  coordY: number
  preUpdate?: (dt?: number) => void
  postUpdate?: (dt?: number) => void
}

export const CustomSprite = ({
  preUpdate,
  postUpdate,
  update,
  ...otherProps
}: CustomSpriteProps & Parameters<typeof Sprite>['0']) => {
  return Sprite({
    ...otherProps,
    anchor: { x: 0.5, y: 0.5 },
    update: function(dt) {
      preUpdate?.bind(this)(dt)
      update?.bind(this)(dt)
      this.x = this.coordX * CELL_SIZE
      this.y = this.coordY * CELL_SIZE
      postUpdate?.bind(this)(dt)
    },
  })
}

export const spriteFactory: Record<SPRITE_TYPE, (coord: CustomSpriteProps) => Sprite> = {
  [SPRITE_TYPE.BLOCK]: (coord) => CustomSprite({
    color: '#888888',
    width: CELL_SIZE * 0.9,
    height: CELL_SIZE * 0.9,
    ...coord,
  }),
  [SPRITE_TYPE.BLOCK_SHOOTABLE]: (coord) => CustomSprite({
    color: '#777777',
    width: CELL_SIZE * 0.9,
    height: CELL_SIZE * 0.9,
    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = this.color
      ctx.fillRect(0, 0, this.width, this.height)
      ctx.strokeStyle = '#444444'
      ctx.beginPath()
      ctx.moveTo(this.width * 0.2, this.height * 0.5)
      ctx.lineTo(this.width * 0.4, this.height * 0.3)
      ctx.lineTo(this.width * 0.5, this.height * 0.7)
      ctx.lineTo(this.width * 0.8, this.height * 0.2)
      ctx.moveTo(this.width * 0.6, this.height * 0.6)
      ctx.lineTo(this.width * 0.7, this.height * 0.8)
      ctx.lineTo(this.width * 0.9, this.height * 0.7)
      ctx.stroke()
    },
    ...coord,
  }),
  [SPRITE_TYPE.BLOCK_BOMBABLE]: (coord) => CustomSprite({
    color: '#962a00',
    width: CELL_SIZE * 0.9,
    height: CELL_SIZE * 0.9,
    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = this.color
      ctx.fillRect(0, 0, this.width, this.height)
      ctx.strokeStyle = '#aaaaaa'
      ctx.beginPath()
      ctx.moveTo(this.width * 0.2, this.height * 0.5)
      ctx.lineTo(this.width * 0.4, this.height * 0.3)
      ctx.lineTo(this.width * 0.5, this.height * 0.7)
      ctx.lineTo(this.width * 0.8, this.height * 0.2)
      ctx.moveTo(this.width * 0.6, this.height * 0.6)
      ctx.lineTo(this.width * 0.7, this.height * 0.8)
      ctx.lineTo(this.width * 0.9, this.height * 0.7)
      ctx.stroke()
    },
    ...coord,
  }),
  [SPRITE_TYPE.HERO_SHIP]: (coord) => CustomSprite({
    color: 'blue',
    direction: 'n',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -HALF_CELL_SIZE)
      ctx.lineTo(-HALF_CELL_SIZE, HALF_CELL_SIZE)
      ctx.lineTo(0, CELL_SIZE * 0.3)
      ctx.lineTo(HALF_CELL_SIZE, HALF_CELL_SIZE)
      ctx.lineTo(0, -HALF_CELL_SIZE)
      ctx.fill()
    },
    preUpdate: function() {
      console.log('direction', this.direction)
      switch (this.direction) {
        case 'n': this.rotation = 0;break
        case 'e': this.rotation = Math.PI / 2;break
        case 's': this.rotation = Math.PI;break
        case 'w': this.rotation = -Math.PI / 2;break
      }
    },
    ...coord,
  }),
  [SPRITE_TYPE.EMEMY_ROCK]: (coord) => CustomSprite({
    color: '#a70000',
    render: function() {
      const ctx: CanvasRenderingContext2D = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, CELL_SIZE * 0.4, 0, 2  * Math.PI)
      ctx.fill();
      ctx.fillStyle = '#750000'
      ctx.beginPath()
      ctx.arc(-CELL_SIZE * 0.3, -CELL_SIZE * 0.2, CELL_SIZE * 0.2, Math.PI * 2 / 3, Math.PI * 5 / 3)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(CELL_SIZE * 0.25, CELL_SIZE * 0.1, CELL_SIZE * 0.25, 0, Math.PI * 2)
      ctx.fill()
    },
    ...coord,
  }),
  [SPRITE_TYPE.EMEMY_TENTACLE]: (coord) => CustomSprite({
    color: '#750000',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -CELL_SIZE)
      ctx.lineTo(-HALF_CELL_SIZE * 0.8, HALF_CELL_SIZE)
      ctx.lineTo(HALF_CELL_SIZE * 0.8, HALF_CELL_SIZE)
      ctx.closePath()
      ctx.fill();
      ctx.fillStyle = '#a70000'
      ctx.beginPath()
      ctx.arc(-CELL_SIZE * 0.2, CELL_SIZE * 0.2, CELL_SIZE * 0.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = this.color;
      ctx.beginPath()
      ctx.arc(-CELL_SIZE * 0.2, CELL_SIZE * 0.2, CELL_SIZE * 0.1, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#a70000'
      ctx.beginPath()
      ctx.arc(CELL_SIZE * 0.2, -CELL_SIZE * 0.2, CELL_SIZE * 0.15, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = this.color;
      ctx.beginPath()
      ctx.arc(CELL_SIZE * 0.2, -CELL_SIZE * 0.2, CELL_SIZE * 0.07, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#a70000'
      ctx.beginPath()
      ctx.arc(-CELL_SIZE * 0.2, -CELL_SIZE * 0.4, CELL_SIZE * 0.1, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = this.color;
      ctx.beginPath()
      ctx.arc(-CELL_SIZE * 0.2, -CELL_SIZE * 0.4, CELL_SIZE * 0.05, 0, Math.PI * 2)
      ctx.fill()
    },
    ...coord,
  }),
  [SPRITE_TYPE.EMEMY_SPITTER]: (coord) => CustomSprite({
    color: 'red',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = '#750000'
      ctx.beginPath();
      ctx.arc(0, 0, CELL_SIZE * 0.4, 0, 2  * Math.PI)
      ctx.fill();
      ctx.fillStyle = this.color;
      ctx.beginPath()
      ctx.fillRect(-CELL_SIZE * 0.2, CELL_SIZE * 0.3, CELL_SIZE * 0.4, CELL_SIZE * 0.2)
    },
    ...coord,
  }),
  [SPRITE_TYPE.UPGRADE_MISSILE]: (coord) => CustomSprite({
    color: '#222222',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -HALF_CELL_SIZE)
      ctx.lineTo(-HALF_CELL_SIZE, HALF_CELL_SIZE)
      ctx.lineTo(0, CELL_SIZE * 0.3)
      ctx.lineTo(HALF_CELL_SIZE, HALF_CELL_SIZE)
      ctx.lineTo(0, -HALF_CELL_SIZE)
      ctx.fill()
      ctx.fillStyle = 'green'
      ctx.beginPath();
      ctx.moveTo(0, -HALF_CELL_SIZE * 0.9)
      ctx.lineTo(-HALF_CELL_SIZE * 0.1, HALF_CELL_SIZE * 0.9)
      ctx.lineTo(HALF_CELL_SIZE * 0.1, HALF_CELL_SIZE * 0.9)
      ctx.fill()
    },
    ...coord,
  }),
  [SPRITE_TYPE.UPGRADE_BLINK]: (coord) => CustomSprite({
    color: 'red',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(CELL_SIZE * 0.5, CELL_SIZE * 0.5, CELL_SIZE * 0.4, 0, 2  * Math.PI);
      ctx.fill();
    },
    ...coord,
  }),
  [SPRITE_TYPE.UPGRADE_NANOBOTS]: (coord) => CustomSprite({
    color: 'red',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(CELL_SIZE * 0.5, CELL_SIZE * 0.5, CELL_SIZE * 0.4, 0, 2  * Math.PI);
      ctx.fill();
    },
    ...coord,
  }),
  [SPRITE_TYPE.UPGRADE_SHIELD]: (coord) => CustomSprite({
    color: 'red',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(CELL_SIZE * 0.5, CELL_SIZE * 0.5, CELL_SIZE * 0.4, 0, 2  * Math.PI);
      ctx.fill();
    },
    ...coord,
  }),
  [SPRITE_TYPE.THE_EYE]: (coord) => CustomSprite({
    color: 'red',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(CELL_SIZE * 0.5, CELL_SIZE * 0.5, CELL_SIZE * 0.4, 0, 2  * Math.PI);
      ctx.fill();
    },
    ...coord,
  }),
  [SPRITE_TYPE.THE_SOCKET]: (coord) => CustomSprite({
    color: 'red',
    render: function() {
      const ctx = this.context
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(CELL_SIZE * 0.5, CELL_SIZE * 0.5, CELL_SIZE * 0.4, 0, 2  * Math.PI);
      ctx.fill();
    },
    ...coord,
  }),
}
