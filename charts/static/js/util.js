this._seed = Date.now();

let rand = function (min, max) {
    var seed = this._seed;
    min = min === undefined
        ? 0
        : min;
    max = max === undefined
        ? 1
        : max;
    this._seed = (seed * 9301 + 49297) % 233280;
    return min + (this._seed / 233280) * (max - min);
};


let randomScalingFactor = function () {
    let result = Math.round(rand(0, 100));
    return result;
};