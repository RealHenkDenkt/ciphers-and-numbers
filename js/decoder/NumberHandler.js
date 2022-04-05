let NumberHandler = function () {
    this.number = -1;

}

NumberHandler.prototype.setNumber = function (number) {
    this.number = parseInt(number);
    this.numberProperties = {
        'index': -1,
        'composite' : -1,
        'prime' : -1,
        'pythagorean_prime': -1,
        'semi_prime': -1,
        'fibonacci': -1,
        'triangular': -1,
        'tetrahedral': -1,
        'hexagonal': -1,
        'star': -1,
        'octagonal': -1,
        'lucas': -1,
        'reduced': 0,
        'summed': 0,
        'times_self': 0,
        'plus_mirror': 0,
        'times_mirror': 0,
        'count_divisors': 0,
        'sum_divisors': 0,
        'sum_divisors_full': 0,
        'divisors': [],
        'factorization_text': ''

    }

    this.setProperties();
}

NumberHandler.prototype.setProperties = function () {
    this.setPrime();
    this.setFibonacci();
    this.setTriangular();
    this.setTetrahedral();
    this.setHexagonal();
    this.setStar();
    this.setOctagonal();
    this.setLucas();
    this.setReduced();
    this.setTimesSelf();
    this.setPlusMirror();
    this.setTimesMirror();
    this.setSummedAndDivisors();
    this.setComposite();
}

NumberHandler.prototype.setReduced = function (){
    this.numberProperties.reduced = this.reduce(this.number);
}
NumberHandler.prototype.setTimesSelf = function (){
    this.numberProperties.times_self = this.number * this.number;
}
NumberHandler.prototype.setTimesMirror = function (){
    this.numberProperties.times_mirror = this.number * this.mirrorNumber(this.number);
}
NumberHandler.prototype.setPlusMirror = function (){
    this.numberProperties.plus_mirror = this.number + this.mirrorNumber(this.number);
}

NumberHandler.prototype.isInt = function (value) {
    return !isNaN(value) &&
        parseInt(Number(value)) === value &&
        !isNaN(parseInt(value, 10));
}

NumberHandler.prototype.setSummedAndDivisors = function (){
    let sum = 0,
        fac = 0,
        facM = 0,
        sumdiv = 0,
        countDivisors = 0,
        res = [];

    for (let i = 1; i <= this.number; i++) {
        sum += i;
        fac = i * fac;
        let t = this.number / i;
        if (this.isInt(t)) {
            sumdiv += i;
            countDivisors ++;
            res.push(i);
        }

        if (i === this.number - 1 && fac !== 'Infinity') facM = fac;
    }
    this.numberProperties.divisors = res;
    this.numberProperties.sum_divisors_full = sumdiv;
    this.numberProperties.sum_divisors = sumdiv - this.number - 1;
    this.numberProperties.summed = sum;
    this.numberProperties.count_divisors = countDivisors;
    this.numberProperties.factorization_text = this.cleanString(this.factor(this.number));

    //console.log(fac, facM, sumdiv, countDivisors, res);
}

NumberHandler.prototype.factor = function (n) {
    if (isNaN(n) || !isFinite(n) || n % 1 !== 0 || n === 0) return '' + n;
    if (n < 0) return '-' + this.factor(-n);
    let minFactor = this.leastFactor(n);
    if (n === minFactor) return '' + n;
    return minFactor + '*' + this.factor(n / minFactor);
}

NumberHandler.prototype.cleanString = function (string) {
    if (string.substring(1, string.length -1) === ',') {
        string = string.substring(0, string.length - 2);
    }

    return string;
}

NumberHandler.prototype.leastFactor = function (n) {
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n === 0) return 0;
    if (n % 1 || n * n < 2) return 1;
    if (n % 2 === 0) return 2;
    if (n % 3 === 0) return 3;
    if (n % 5 === 0) return 5;
    let m = Math.sqrt(n);

    for (let i = 7; i <= m; i += 30) {
        if (n % i === 0) return i;
        if (n % (i + 4) === 0) return i + 4;
        if (n % (i + 6) === 0) return i + 6;
        if (n % (i + 10) === 0) return i + 10;
        if (n % (i + 12) === 0) return i + 12;
        if (n % (i + 16) === 0) return i + 16;
        if (n % (i + 22) === 0) return i + 22;
        if (n % (i + 24) === 0) return i + 24;
    }
    return n;
}

NumberHandler.prototype.reduce = function (number) {
    if (this.number === undefined) return this.number;
    let reduced = 0;
    let totalString = number.toString();

    if (totalString.length > 1) {
        // +1 number
        for (let i = 0; i < totalString.length; i++) {
            reduced += Number(totalString[i]);
        }
    }
    if (reduced > 0 && reduced < 10) return reduced;

    if (reduced > 9) {
        return this.reduce(reduced);
    }

}
NumberHandler.prototype.setTetrahedral = function () {
    if (true === this.checkTetrahedral()) {
        let tetrahedralManager = new TetrahedralManager();
        this.numberProperties.tetrahedral = tetrahedralManager.getIndex(this.number);
    }
}

NumberHandler.prototype.checkTetrahedral = function () {
    let tetrahedralManager = new TetrahedralManager();
    return tetrahedralManager.isTetrahedral(this.number);
}

NumberHandler.prototype.setStar = function () {
    if (true === this.checkStar()) {
        let starnumberManager = new StarnumberManager();
        this.numberProperties.star = starnumberManager.getIndex(this.number)};

}

NumberHandler.prototype.checkStar = function () {
    let starNumberManager = new StarnumberManager();
    return starNumberManager.isStarnumber(this.number);
}

NumberHandler.prototype.setHexagonal = function () {
    if (true === this.checkHexagonal()) {
        let hexagonalManager = new HexagonalManager();
        this.numberProperties.hexagonal = hexagonalManager.getHexagonalIndex(this.number);
    }
}

NumberHandler.prototype.checkHexagonal = function () {
    let hexagonalManager = new HexagonalManager();
    return hexagonalManager.isHexagonal(this.number);
}

NumberHandler.prototype.setOctagonal = function () {
    if (true === this.checkOctagonal()) {
        let octagonalManager = new OctagonalManager();
        this.numberProperties.octagonal = octagonalManager.getIndex(this.number);
    }
}

NumberHandler.prototype.checkOctagonal = function () {
    let octagonalManager = new OctagonalManager();
    return octagonalManager.isOctagonal(this.number);
}

NumberHandler.prototype.setLucas = function () {
    if (true === this.checkLucas()) {
        let lucasManager = new LucasManager();
        this.numberProperties.lucas = lucasManager.getIndex(this.number);
    }
}

NumberHandler.prototype.checkLucas = function () {
    let lucasManager = new LucasManager();
    return lucasManager.isLucasNumber(this.number);
}

NumberHandler.prototype.setPrime = function () {
    let primeManager = new PrimeManager ();

    // Normal prime
    if (primeManager.isPrime(this.number)) {
        this.numberProperties.prime = primeManager.getPrimeIndex(this.number);
    }

    if (primeManager.isPythagoreanPrime(this.number)) {
        this.numberProperties.pythagorean_prime = primeManager.getPythagoreanPrimeIndex(this.number);
    }

    if (primeManager.isSemiprime(this.number)) {
        this.numberProperties.semi_prime = primeManager.getSemiPrimeIndex(this.number);

    }
}

NumberHandler.prototype.mirrorNumber = function (number) {
    let numberString = number.toString();

    if (1 === numberString.length) return number;
    let mirror = '';

    for (let i=numberString.length; i > -1; i--) {
        if (undefined !== numberString[i]) mirror += numberString[i];
    }

    return parseInt(mirror);

}
NumberHandler.prototype.setComposite = function () {
    if (true === this.checkComposite()) {
        let compositeManager = new CompositeManager();
        this.numberProperties.composite = compositeManager.isComposite(this.number);
    }
}

NumberHandler.prototype.checkComposite = function () {
    return (this.numberProperties.prime === -1);


}
NumberHandler.prototype.setTriangular = function () {
    if (true === this.checkTriangular()) this.numberProperties.triangular = Triangulars.indexOf(this.number) + 1;
}

NumberHandler.prototype.checkTriangular = function () {
    return Triangulars.indexOf(this.number) > -1;

}

NumberHandler.prototype.setFibonacci = function () {
    this.checkFibonacci();

    if (true === this.fibonacci) this.numberProperties.fibonacci = Fibonaccis.indexOf(this.number) + 1;
}

NumberHandler.prototype.checkFibonacci = function () {
    let n = this.number,
        c = 1,
        prev = 1;

    while (c <= n) {
        c += prev;
        if (c === n) {
            this.fibonacci = true;
            return;
        }
        prev = c- prev;
    }
}



