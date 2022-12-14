const CONSTS = {
  UNIT_PIXELS: 100,
  LAND_THICKNESS: 20,
  GRAVITY_DDY: 2000,
  UNIT_MOVE_ROTATION: Math.PI / 12,
  ENEMY_SPAWN_INTERVAL: 3500,
  SOULS_NEEDED: 20,

  PLAYER_TYPE: 'player',
  PLAYER_WIDTH: 100,
  PLAYER_HEIGHT: 240,
  PLAYER_MOVE_VELOCITY: 300,
  PLAYER_JUMP_VELOCITY: 1000,
  PLAYER_HUNTER_MAX_HEALTH: 100,
  PLAYER_DEATH_MAX_HEALTH: 150,

  ATTACK_TYPE: 'attack',

  BULLET_WIDTH: 50,
  BULLET_HEIGHT: 25,
  BULLET_VELOCITY: 1600,
  BULLET_MAX_DISTANCE: 800,
  BULLET_THROTTLE: 600,
  BULLET_DAMAGE: 50,

  SCYTH_ANIMATION_DURATION: 200,
  SCYTH_INTERVAL: 500,
  SCYTH_START_ANGLE: Math.PI / 2,
  SCYTH_END_ANGLE: -Math.PI * 0.1,
  SCYTH_DAMAGE: 100,
  
  ENEMY_TYPE: 'enemy',

  WALKER_WIDTH: 100,
  WALKER_HEIGHT: 200,
  WALKER_MOVE_VELOCITY: 100,
  WALKER_JUMP_VELOCITY: 1200,
  WALKER_MAX_HEALTH: 100,
  WALKER_DAMAGE: 10,
  WALKER_ATTACK_THROTTLE: 1000,

  WALKER_GHOST_WIDTH: 100,
  WALKER_GHOST_HEIGHT: 200,
  WALKER_GHOST_MOVE_VELOCITY: 50,
  WALKER_GHOST_MAX_HEALTH: 100,
  WALKER_GHOST_ATTACK_INTERVAL: 3000,

  GHOST_FIRE_WIDTH: 50,
  GHOST_FIRE_HEIGHT: 50,
  GHOST_FIRE_VELOCITY: 350,
  GHOST_FIRE_MAX_DISTANCE: 700,
  GHOST_FIRE_DAMAGE: 15,
  GHOST_FIRE_CURVE_VELOCITY: 400,

  VESSEL_TYPE: 'vessel',

  VESSEL_RADIUS: 160,
  VESSEL_EYE_RADIUS: 50,
  VESSEL_LEG_WIDTH: 80,
  VESSEL_LEG_HEIGHT: 120,
  VESSEL_MAX_HEALTH: 1000,
  VESSEL_MOVE_VELOCITY: 200,
  VESSEL_JUMP_VELOCITY: 800,
  VESSEL_MOVE_INTERVAL: 1000,
  VESSEL_ATTACK_INTERVAL: 2000,
  VESSEL_SOUL_MAX_HEALTH: 500,

  VESSEL_TEAR_WIDTH: 60,
  VESSEL_TEAR_HEIGHT: 25,
  VESSEL_TEAR_VELOCITY: 500,
  VESSEL_TEAR_MAX_DISTANCE: 800,
  VESSEL_TEAR_DAMAGE: 10,

  VESSEL_CANON_WIDTH: 60,
  VESSEL_CANON_HEIGHT: 60,
  VESSEL_CANON_MIN_VELOCITY: 300,
  VESSEL_CANON_MAX_VELOCITY: 800,
  VESSEL_CANON_Y_VELOCITY: 1000,
  VESSEL_CANON_DAMAGE: 10,

  VESSEL_CANON_BLAST_RADIUS: 160,
  VESSEL_CANON_BLAST_LIFETIME: 300,
  VESSEL_CANON_BLAST_DAMAGE: 20, 
}

export default CONSTS
