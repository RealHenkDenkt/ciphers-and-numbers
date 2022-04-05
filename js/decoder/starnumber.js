let StarnumberManager = function () {

}

StarnumberManager.prototype.getNthStarnumber = function (number) {
    return 6 * number * (number - 1) + 1;
}

StarnumberManager.prototype.getIndex = function (number) {
    let i, t = 0;

    for (i = 0; i <= number; i++) {
        if (true === this.isStarnumber(i)) {
            t++;
        }
    }
    return t;
}

StarnumberManager.prototype.isStarnumber = function (number) {
    let n
        = (6 + Math.sqrt(24 * number + 12))
        / 6;

    // Condition to check if the
    // number is a star number
    return (n - parseInt(n)) === 0;
}