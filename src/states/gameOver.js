import { gameStates } from "../enums/gameStates";
import { playSound } from "../game/util";
import { sounds } from "../enums/sounds";

let lastScore = 0;

function init(score) {
    lastScore = score;
}

function create() {
    playSound(sounds.GAME_OVER);

    const swamp = game.add.sprite(0, 0, "swamp");
    swamp.alpha = 0.2;
    swamp.scale.setTo(
        game.world.width / swamp.width,
        game.world.height / swamp.height
    );

    let gameOverLabel = game.add.bitmapText(
        game.world.centerX,
        game.world.centerY,
        "menu",
        "Game Over",
        40
    );
    gameOverLabel.anchor.setTo(0.5);

    let scoreDisplay = game.add.bitmapText(
        game.world.centerX,
        game.world.centerY + 44,
        "menu",
        "Gators: " + lastScore,
        24
    );
    scoreDisplay.anchor.setTo(0.5);

    game.input.onDown.add(() => {
        game.state.start(gameStates.GAME);
    });
}

export default { init, create };
