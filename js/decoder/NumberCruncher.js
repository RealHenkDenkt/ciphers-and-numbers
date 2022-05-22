let NumberCruncher = function (number) {
    this.number = number;
}

NumberCruncher.prototype.clearModalContent = function (direction) {
    let element;
    element = '#fm'+direction+'-number';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-composite';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-prime';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-pythagorean-prime';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-semi-prime';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-fibonacci';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-triangular';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-hexagonal';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-tetrahedral';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-star';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-octagonal';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-lucas';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-harshad';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-reduced';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-cubed';
    this.setModalCell(element, '')
    element = '#fm'+direction+'-summed';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-times-self';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-times-mirror';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-plus-mirror';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-number-of-divisors';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-summed-divisors';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-summed-divisors-full';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-divisors';
    this.setModalCell(element, '');
    element = '#fm'+direction+'-factorization-text';
    this.setModalCell(element, '');
}

NumberCruncher.prototype.fillModalContent = function (number) {
    // left
    this.setModalContent(parseInt(number), 'l');
    let mirror = '',
        numberString = number.toString();

    for (let i = numberString.length; i >=0; i--) {
        if (undefined !== numberString[i])  mirror += numberString[i];
    }
    this.setModalContent(parseInt(mirror), 'r');
}

NumberCruncher.prototype.setModalContent = function (number, direction) {
    // clear first
    this.clearModalContent(direction);
    let numberHandler = new NumberHandler();
    numberHandler.setNumber(number);

    // set Number
    let element = '#fm'+direction+'-number';
    this.setModalCell(element, number);
    // set composite
    if (numberHandler.numberProperties.composite !== -1)  {
        element = '#fm'+direction+'-composite';
        this.setModalCell(element, numberHandler.numberProperties.composite);
    } else {
        // set prime
        if (numberHandler.numberProperties.prime !== -1) {
            element = '#fm'+direction+'-prime';
            this.setModalCell(element, numberHandler.numberProperties.prime);
        }
        // set Pythagorean prime
        if (numberHandler.numberProperties.pythagorean_prime !== -1) {
            element = '#fm'+direction+'-pythagorean-prime';
            this.setModalCell(element, numberHandler.numberProperties.pythagorean_prime);
        }
    }
    // Semi prime
    if (numberHandler.numberProperties.semi_prime !== -1) {
        element = '#fm'+direction+'-semi-prime';
        this.setModalCell(element, numberHandler.numberProperties.semi_prime);
    }

    // Fibonacci
    if (numberHandler.numberProperties.fibonacci !== -1) {
        element = '#fm'+direction+'-fibonacci';
        this.setModalCell(element, numberHandler.numberProperties.fibonacci);
    }
    // Triangular
    if (numberHandler.numberProperties.triangular !== -1) {
        element = '#fm'+direction+'-triangular';
        this.setModalCell(element, numberHandler.numberProperties.triangular);
    }
    // Hexagonal
    if (numberHandler.numberProperties.hexagonal !== -1) {
        element = '#fm'+direction+'-hexagonal';
        this.setModalCell(element, numberHandler.numberProperties.hexagonal);
    }
    // Tetrahedral
    if (numberHandler.numberProperties.tetrahedral !== -1) {
        element = '#fm'+direction+'-tetrahedral';
        this.setModalCell(element, numberHandler.numberProperties.tetrahedral);
    }
    // Star
    if (numberHandler.numberProperties.star !== -1) {
        element = '#fm'+direction+'-star';
        this.setModalCell(element, numberHandler.numberProperties.star);
    }
    // Octagonal
    if (numberHandler.numberProperties.octagonal !== -1) {
        element = '#fm'+direction+'-octagonal';
        this.setModalCell(element, numberHandler.numberProperties.octagonal);
    }
    // Lukas
    if (numberHandler.numberProperties.lucas !== -1) {
        element = '#fm'+direction+'-lucas';
        this.setModalCell(element, numberHandler.numberProperties.lucas);
    }
    // Harshad
    if (numberHandler.numberProperties.harshad !== -1) {
        element = '#fm'+direction+'-harshad';
        this.setModalCell(element, numberHandler.numberProperties.harshad);
    }
    // Reduced
    element = '#fm'+direction+'-reduced';
    this.setModalCell(element, numberHandler.numberProperties.reduced);
    // Cubed
    element = '#fm'+direction+'-cubed';
    this.setModalCell(element, numberHandler.number * numberHandler.number * numberHandler.number )
    // Summed
    element = '#fm'+direction+'-summed';
    this.setModalCell(element, numberHandler.numberProperties.summed);
    // TimesSelf
    element = '#fm'+direction+'-times-self';
    this.setModalCell(element, numberHandler.numberProperties.times_self);
    // TimesMirror
    element = '#fm'+direction+'-times-mirror';
    this.setModalCell(element, numberHandler.numberProperties.times_mirror);
    // PlusMirror
    element = '#fm'+direction+'-plus-mirror';
    this.setModalCell(element, numberHandler.numberProperties.plus_mirror);
    // Number of divisors
    element = '#fm'+direction+'-number-of-divisors';
    this.setModalCell(element, numberHandler.numberProperties.count_divisors);
    // Divisors summed
    element = '#fm'+direction+'-summed-divisors';
    this.setModalCell(element, numberHandler.numberProperties.sum_divisors);
    // Divisors summed full
    element = '#fm'+direction+'-summed-divisors-full';
    this.setModalCell(element, numberHandler.numberProperties.sum_divisors_full);
    // Divisors
    element = '#fm'+direction+'-divisors';
    this.setModalCell(element, numberHandler.numberProperties.divisors.join(', '));

    element = '#fm'+direction+'-factorization-text';
    this.setModalCell(element, numberHandler.numberProperties.factorization_text);

}

NumberCruncher.prototype.setModalCell = function (element, value) {
    $(element).html(value);
}

NumberCruncher.prototype.setModalClicks = function () {
    $('#numberCruncherModalTable td').each(function (){
        $(this).on('click', function () {
            if (undefined !== $(this).attr('data-toggle')) {
                $('#numberCruncherModalNumber').attr('value', $(this).attr('data-totals'));
                let numberCruncher = new NumberCruncher(0);
                numberCruncher.fillModalContent($(this).attr('data-totals'));
            }
        })
    });
}