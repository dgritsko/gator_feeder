const now = () => new Date().getTime();

const isNumber = value => typeof value === "number";
const isBool = value => typeof value === "boolean";
const isString = value => typeof value === "string";

const matchingProps = (state, test) => {
    const keys = Object.keys(test);

    return {
        actual: keys.filter(k => {
            if (Array.isArray(test[k])) {
                return test[k].indexOf(state[k]) > -1;
            } else if (typeof test[k] === "function") {
                return test[k](state);
            }

            return state[k] === test[k];
        }).length,
        target: keys.length
    };
};

const animationDuration = (frames, framerate) => {
    const timePerFrame = 1000 / framerate;

    const duration = frames * timePerFrame;

    return duration;
};

const dist = (a, b) => {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
};

const setBounds = (sprite, bounds) => {
    const { top, right, bottom, left } = bounds;

    const width = right - left;
    const height = bottom - top;

    const spriteWidth = Math.abs(sprite.width);
    const spriteHeight = Math.abs(sprite.height);

    sprite.body.setSize(
        width,
        height,
        spriteWidth / 2 + left,
        spriteHeight / 2 + top
    );
};

const exceptIndex = (items, index) => {
    const before = items.slice(0, index);
    const after = items.slice(index + 1);

    return [...before, ...after];
};

const removeAtIndex = (items, index) => {
    items.splice(index, 1);
};

const playSound = id => {
    const sound = game.add.sound(id);
    sound.play();
};

const randomBetween = (min, max) => {
    if (min >= max) {
        return min;
    }

    return min + Math.random() * (max - min);
};

const randomIntBetween = (min, max) => Math.round(randomBetween(min, max));

const debugRender = obj => {
    //const text = JSON.stringify(obj);
    // const width = 66;
    // for (let i = 0; i < text.length / width; i++) {
    //     const substr = text.substr(i * width, (i + 1) * width);
    //     game.debug.text(substr, 2, 14 + i * 16, "#ff0000");
    // }
    if (obj === null) {
        game.debug.text("null", 2, 14, "#ff0000");
        return;
    }

    if (typeof obj !== "object") {
        game.debug.text(obj + "", 2, 14, "#ff0000");
    }

    const keys = Object.keys(obj);
    let parts = keys.map(k => `${k}: ${obj[k]}`);

    for (let i = 0; i < parts.length; i++) {
        game.debug.text(parts[i], 2, 14 + i * 16, "#ff0000");
    }
};

export {
    now,
    isNumber,
    isBool,
    isString,
    matchingProps,
    animationDuration,
    dist,
    setBounds,
    exceptIndex,
    removeAtIndex,
    playSound,
    randomBetween,
    randomIntBetween,
    debugRender
};
