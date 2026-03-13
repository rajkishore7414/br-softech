const GAME = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
};

const COLORS = {
  pink:   0xff6b9d,
  red:    0xff4444,
  blue:   0x4488ff,
  purple: 0x9b59b6,
  yellow: 0xffd700,
  green:  0x44cc77,
};

const KEYS = {
  // backgrounds
  BG_MENU:       "bg-menu",
  BG_LEVELSELECT:"bg-levelselect",
  BG_GAME:       "bg-game",

  // tube
  TUBE:          "tube",

  // cans
  CAN_PINK:      "can-pink",
  CAN_RED:       "can-red",
  CAN_BLUE:      "can-blue",
  CAN_PURPLE:    "can-purple",
  CAN_YELLOW:    "can-yellow",
  CAN_GREEN:     "can-green",

  // ui
  BTN_PLAY:      "btn-play",
  BTN_BACK:      "btn-back",
  LEVEL_BADGE:   "level-badge",
  PANEL_NEXT:    "panel-next",
  PANEL_QUIT:    "panel-quit",
};

export { GAME, COLORS, KEYS };