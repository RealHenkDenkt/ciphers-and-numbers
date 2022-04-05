let OctagonalManager = function () {
        this.octagonals = Octagonals;
}

OctagonalManager.prototype.getOctagonalNumber = function (number) {
        return this.octagonals.indexOf(number);
}

OctagonalManager.prototype.getNthOcta = function (n) {
        return 3 * n * n - 2 * n;
}

OctagonalManager.prototype.getIndex = function (number) {
        let i, t = 0;
        for (i = 0; i <= number; i++) {
                if (true === this.isOctagonal(i)) {
                        t++;
                }
        }
        return t;
}

OctagonalManager.prototype.isOctagonal = function (number) {
        let n = (2 + Math.sqrt(12 * number + 4)) / 6;

        // Condition to check if the
        // number is a octagonal number
        return (n - parseInt(n) === 0);
}

let Octagonals = [
    0,1,8,21,40,65,96,133,176,225,280,341,408,481, 560,645,736,833,936,1045,1160,1281,1408,1541,1680, 1825,1976,2133,2296,2465,2640,2821,3008,3201,3400, 3605,3816,4033,4256,4485,4720,4961,5208,5461 ];