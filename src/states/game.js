import {
    debugRender,
    playSound,
    randomIntBetween,
    now,
    randomBetween,
    setBounds
} from "../game/util";
import { sounds } from "../enums/sounds";
import { gameStates } from "../enums/gameStates";

const DEBUG_SHOW_FPS = false;
const DEBUG_SHOW_HITBOXES = false;
const FIRE_DELAY = 1000;

let mallowStart;

let activeMallow;
let arrow;

let gators;
let mallows;

let score = 0;
let scoreDisplay;
let didPress = false;
let lastFired = 0;
let lastSpawn = 0;

let gameStart;

function init() {
    mallowStart = { x: game.world.centerX, y: game.world.height - 300 };

    gators = game.add.group();
    mallows = game.add.group();

    score = 0;
    scoreDisplay = game.add.bitmapText(20, 20, "menu", "Gators: " + score, 36);

    gameStart = now();
}

function getGatorSpeed() {
    const BASE_SPEED = 15;

    const increment = (now() - gameStart) / 5000;
    const random = randomBetween(20, 30);

    return BASE_SPEED + increment + random;
}

function shouldSpawnGator() {
    const delay = 1000 - (now() - gameStart) / 1000 + randomBetween(500, 1500);

    if (lastSpawn > now() - delay) return false;

    return true;
}

function gameOver() {
    game.state.start(gameStates.GAME_OVER, true, false, score);
}

function spawnGator() {
    const x = randomBetween(0, game.world.width);

    const gator = game.add.sprite(x, 0, "gators_large", 0);

    const baseFrame = 3 * randomIntBetween(0, 3);

    const frames = [baseFrame + 0, baseFrame + 1, baseFrame + 2];

    gator.animations.add("default", frames, 4, true);
    gator.animations.play("default");
    gator.anchor.setTo(0.5);
    gator.scale.setTo(1.75);

    game.physics.enable(gator);

    setBounds(gator, { top: -65, left: -45, right: 0, bottom: 20 });

    gator.body.velocity.y = getGatorSpeed();

    gators.addChild(gator);

    if (lastSpawn === 0 || randomIntBetween(0, 4) === 0) {
        playSound(sounds.GATOR);
    }

    lastSpawn = now();
}

function spawnMallow() {
    let mallow = game.add.sprite(
        mallowStart.x,
        mallowStart.y,
        "marshmallow",
        0
    );
    mallow.anchor.setTo(0.5);
    mallow.scale.setTo(0.2);
    game.physics.enable(mallow);

    setBounds(mallow, { top: -10, left: -25, right: 340, bottom: 350 });

    return mallow;
}

function createArrow() {
    arrow = game.add.sprite(mallowStart.x, mallowStart.y, "power_arrow");
    arrow.anchor.setTo(0.5);
}

function create() {
    game.time.advancedTiming = true;

    game.stage.disableVisibilityChange = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    const swamp = game.add.sprite(0, 0, "swamp");
    swamp.alpha = 0.2;
    swamp.scale.setTo(
        game.world.width / swamp.width,
        game.world.height / swamp.height
    );

    spawnGator();
    createArrow();
    activeMallow = spawnMallow();
}

function update() {
    const pointerx = game.input.x;
    const pointery = game.input.y;
    const justPressed = game.input.activePointer.justPressed();
    const justReleased = game.input.activePointer.justReleased();
    const isDown = game.input.activePointer.isDown;
    const dist = Phaser.Math.distance(arrow.x, arrow.y, pointerx, pointery);
    const angle =
        Math.PI / 2 +
        game.physics.arcade.angleBetween(arrow, {
            x: pointerx,
            y: pointery
        });

    if (isDown) {
        activeMallow.frame = 2;
        arrow.visible = true;
    } else {
        activeMallow.frame = 0;
        arrow.visible = false;
    }

    if (justPressed) {
        didPress = true;
    }

    if (
        justReleased &&
        didPress &&
        (lastFired < now() - FIRE_DELAY || mallows.children.length === 0) &&
        dist >= 50
    ) {
        didPress = false;
        lastFired = now();

        activeMallow.body.velocity.x = dist * 2 * -Math.sin(angle);
        activeMallow.body.velocity.y = dist * 2 * Math.cos(angle);

        activeMallow.frame = 3;

        mallows.addChild(activeMallow);

        playSound(sounds.FLING);

        activeMallow = spawnMallow();
    }

    arrow.rotation = angle;

    const scale = Math.min(4, dist / 50);
    arrow.scale.setTo(1, -scale);

    game.physics.arcade.overlap(
        mallows.children,
        gators.children,
        (mallow, gator) => {
            killGator(gator, true);
            killMallow(mallow);
            playSound(sounds.HIT);
        }
    );

    mallows.children.forEach(mallow => {
        if (!mallow.inCamera) {
            killMallow(mallow);
        }
    });

    gators.children.forEach(gator => {
        if (!gator.inCamera) {
            killGator(gator);
        }
    });

    if (shouldSpawnGator()) {
        spawnGator();
    }

    // debugRender({
    //     mallows: mallows.children.length,
    //     gators: gators.children.length
    // });
}

function killGator(gator, wasHit) {
    gator.kill();
    gators.remove(gator);

    if (wasHit) {
        score += 1;
        scoreDisplay.text = "Gators: " + score;
    } else {
        gameOver();
    }
}

function killMallow(mallow) {
    mallow.kill();
    mallows.remove(mallow);
}

function render() {
    if (DEBUG_SHOW_FPS) {
        game.debug.text(
            "FPS: " + game.time.fps || "FPS: --",
            40,
            40,
            "#00ff00"
        );
    }

    if (DEBUG_SHOW_HITBOXES) {
        mallows.children.forEach(mallow => game.debug.body(mallow));
        gators.children.forEach(gator => game.debug.body(gator));
    }
}

export default { init, create, update, render };
