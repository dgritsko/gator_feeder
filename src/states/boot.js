import { gameStates } from "../enums/gameStates";
import { sounds } from "../enums/sounds";

function preload() {
    game.load.spritesheet("gators_large", "assets/gators_large.png", 96, 96);
    game.load.spritesheet("gators_small", "assets/gators_small.png", 96, 96);
    game.load.spritesheet("marshmallow", "assets/marshmallow.png", 400, 450);
    game.load.image("swamp", "assets/swamp.png");

    game.load.image("power_arrow", "assets/power_arrow.png");

    game.load.bitmapFont(
        "menu",
        "assets/fonts/pc-senior.png",
        "assets/fonts/pc-senior.fnt"
    );

    game.load.audio(sounds.FLING, "assets/sounds/fling.wav");
    game.load.audio(sounds.GAME_OVER, "assets/sounds/game_over.wav");
    game.load.audio(sounds.GATOR, "assets/sounds/growl.mp3");
    game.load.audio(sounds.HIT, "assets/sounds/splash.wav");
}

function create() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // game.world.setBounds(0, 0, gameConfig.GAME_WIDTH, gameConfig.GAME_HEIGHT);

    game.state.start(gameStates.GAME);
    // game.state.start(gameStates.GAME_OVER, true, false, 100);
}

export default { preload, create };
