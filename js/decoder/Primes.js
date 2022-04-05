let PrimeManager = function () {
    this.primesList = Primes;
}

PrimeManager.prototype.getPrimeNumber = function (number) {
    if (number > this.primesList.length) {
        return this.getPrimeIndex(number);
    }
    
    return this.primesList[number - 1];
}

PrimeManager.prototype.isPythagoreanPrime = function (n) {
    return this.isPrime(n) && (n % 4 === 1);
}


PrimeManager.prototype.checkSemiprime = function(num) {
    let cnt = 0;

    for (let i = 2; cnt < 2 &&
        i * i <= num; ++i)

        while (num % i === 0){
            num /= i;
            ++cnt;
        }

    if (num > 1)
        ++cnt;

    return cnt === 2 ? 1 : 0;
}

PrimeManager.prototype.isSemiprime = function (n){
    return this.checkSemiprime(n) !== 0;
}

PrimeManager.prototype.getPythagoreanPrimeIndex = function (prime) {
    let index = 0;
    for (let i = 2; i <=prime; i++) {
        if (this.isPythagoreanPrime(i)) {
            index++;
        }
    }
    return index;
}

PrimeManager.prototype.getSemiPrimeIndex = function (prime) {
    let index = 0;
    for (let i = 2; i <=prime; i++) {
        if (this.isSemiprime(i)) {
            index++;
        }
    }
    return index;
}

PrimeManager.prototype.getPrimeIndex = function (prime) {
    let index = 0;
    for (let i = 2; i <=prime; i++) {
        if (this.isPrime(i)) {
            index++;
        }
    }
    return index;
}

PrimeManager.prototype.isPrime = function (n) {
        if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;

        let m=Math.sqrt(n); //returns the square root of the passed value

    for (let i=2;i<=m;i++) if (n%i === 0) return false;
        return true;
}

PrimeManager.prototype.getNthSemiPrime = function (num) {
    let c = 0, i = 2;
    //for (let i = 2; i <= num; i+=2) {
    while (true) {
        if (this.isSemiprime(i)) {
            c++;
        }
        i++;
        if (c === num)
            return i -1;
    }
}

PrimeManager.prototype.getNthPythagoreanPrime = function (num) {
    let c = 0, i = 2;
    //for (let i = 2; i <= num; i+=2) {
    while (true) {
        if (this.isPythagoreanPrime(i)) {
            c++;
        }
        i++;
        if (c === num)
            return i -1;
    }
}

PrimeManager.prototype.getNthPrime = function (num) {
        let i, primes = [2, 3], n = 5;
        function isPrime(n) {
            let i = 1, p = primes[i],
                limit = Math.ceil(Math.sqrt(n));
            while (p <= limit) {
                if (n % p === 0) {
                    return false;
                }
                i += 1;
                p = primes[i];
            }
            return true;
        }
        for (i = 2; i <= num; i += 1) {
            while (!isPrime(n)) {
                n += 2;
            }
            primes.push(n);
            n += 2;
        }
        return primes[num - 1];
}

let FiboStuff = function () {
    this.fiboList = Fibonaccis;
}

FiboStuff.prototype.getFiboNumber = function (number) {
    return this.fiboList[number -1];
}


