import PIXI from "expose-loader?PIXI!phaser-ce/build/custom/pixi.js";
import p2 from "expose-loader?p2!phaser-ce/build/custom/p2.js";
import Phaser from "expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js";

import gameOver, {
    bootState,
    gameState,
    sandboxState,
    gameOverState
} from "./states";
import { gameStates } from "./enums/gameStates";

const config = {};

config.USE_DEVICE_PIXEL_RATIO = false; // here you can change to use or not the device pixel ratio - it is not supported by all browsers

if (config.USE_DEVICE_PIXEL_RATIO) {
    config.DEVICE_PIXEL_RATIO = window.devicePixelRatio;
    config.CANVAS_WIDTH = window.innerWidth * config.DEVICE_PIXEL_RATIO;
    config.CANVAS_HEIGHT = window.innerHeight * config.DEVICE_PIXEL_RATIO;
} else {
    config.DEVICE_PIXEL_RATIO = 1.0;
    config.CANVAS_WIDTH = window.innerWidth * config.DEVICE_PIXEL_RATIO;
    config.CANVAS_HEIGHT = window.innerHeight * config.DEVICE_PIXEL_RATIO;
}

config.ASPECT_RATIO = config.CANVAS_WIDTH / config.CANVAS_HEIGHT;
config.ASPECT_RATIO_ROUND = Math.round(config.ASPECT_RATIO);

if (config.ASPECT_RATIO > 1) {
    config.SCALE_RATIO = config.CANVAS_HEIGHT / config.CANVAS_WIDTH;
} else {
    config.SCALE_RATIO = config.CANVAS_WIDTH / config.CANVAS_WIDTH;
}

var game = new Phaser.Game(
    config.CANVAS_WIDTH,
    config.CANVAS_HEIGHT,
    Phaser.AUTO,
    "game"
);

// const game = new Phaser.Game(
//     100,
//     100,
//     // gameConfig.GAME_CONTAINER_WIDTH,
//     // gameConfig.GAME_CONTAINER_HEIGHT,
//     Phaser.AUTO,
//     "game"
// );

window.game = game;

game.state.add(gameStates.BOOT, bootState);
game.state.add(gameStates.GAME, gameState);
game.state.add(gameStates.SANDBOX, sandboxState);
game.state.add(gameStates.GAME_OVER, gameOverState);

game.state.start(gameStates.BOOT);
