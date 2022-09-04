const CONSTS = {
  UNIT_PIXELS: 100,
  LAND_THICKNESS: 20,
  GRAVITY_DDY: 2000,

  PLAYER_TYPE: 'player',
  PLAYER_WIDTH: 100,
  PLAYER_HEIGHT: 240,
  PLAYER_MOVE_VELOCITY: 300,
  PLAYER_JUMP_VELOCITY: 840,
  PLAYER_HUNTER_MAX_HEALTH: 100,
  PLAYER_DEATH_MAX_HEALTH: 200,

  ATTACK_TYPE: 'attack',

  BULLET_WIDTH: 50,
  BULLET_HEIGHT: 25,
  BULLET_VELOCITY: 1600,
  BULLET_MAX_DISTANCE: 600,
  BULLET_THROTTLE: 1000,
  BULLET_DAMAGE: 50,

  CRESCENT_WIDTH: 100,
  CRESCENT_HEIGHT: 120,
  CRESCENT_TTL: 500,  // ms
  CRESCENT_THROTTLE: 800,
  CRESCENT_DAMAGE: 100,

  ENEMY_TYPE: 'enemy',

  WALKER_WIDTH: 100,
  WALKER_HEIGHT: 200,
  WALKER_MOVE_VELOCITY: 100,
  WALKER_JUMP_VELOCITY: 1200,
  WALKER_MAX_HEALTH: 100,
  WALKER_DAMAGE: 20,
  WALKER_ATTACK_THROTTLE: 1000,

  WALKER_GHOST_WIDTH: 100,
  WALKER_GHOST_HEIGHT: 200,
  WALKER_GHOST_MOVE_VELOCITY: 50,
  WALKER_GHOST_MAX_HEALTH: 100,
  WALKER_GHOST_ATTACK_INTERVAL: 3000,

  GHOST_FIRE_WIDTH: 50,
  GHOST_FIRE_HEIGHT: 50,
  GHOST_FIRE_VELOCITY: 400,
  GHOST_FIRE_MAX_DISTANCE: 1000,
  GHOST_FIRE_DAMAGE: 50,
  GHOST_FIRE_CURVE_VELOCITY: 400,
}

export default CONSTS
