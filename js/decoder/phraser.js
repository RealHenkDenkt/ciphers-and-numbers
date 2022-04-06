let Phraser = function (phrase, cipher) {
    this.phrase = phrase;
    this.cipher = cipher;
    this.phraseHtml = '';
    this.totals;
    this.analyzed;
    this.htmlElements;
    this.summedElements;
    this.elementsPerWord;
    this.elementsPerWordHtml = '';
    this.elementsWordSumLeft;
    this.elementsWordSumRight;
}

Phraser.prototype.getPhraseValue = function () {
    if (this.phrase === '') return;
    this.analyzed = this.analyze();
    this.phraseHtml = this.iterateWords();
    this.totals = this.totalize();
    this.htmlElements = this.elementIterator();
    this.summedElements = this.sumElements();

    let summedString = this.summedElements.toString();
    let summedArray = summedString.split('.');
    this.elementsWordSumLeft = parseInt(summedArray[0]);
    this.elementsWordSumRight = parseInt(summedArray[1]);

    this.elementsPerWord = this.wordElements();
    if (false !== this.elementsPerWord) this.wordElementsHtml();
}

Phraser.prototype.wordElementsHtml = function () {
    let html = '';
    for (let i = 0; i < this.elementsPerWord.elements.length; i++) {
        if (undefined === this.elementsPerWord.element) continue;
        if (this.elementsPerWord.elements[i].value > 0) {
            try {
                html += '<td class="' + this.elementsPerWord.elements[i].element.color + '"><div><el class="elementName">' + this.elementsPerWord.elements[i].element.name + '</el><br />';
                html += '<el class="elementProp">' + this.elementsPerWord.elements[i].element.mass + '</el><br /></div>';
                html += '<el class="elementProp">' + this.elementsPerWord.elements[i].value + '</el></td>';

            } catch (E) {
                console.log(E);
            }
        }
    }

    let summed = 0;

    for (let l = 0; l < this.elementsPerWord.elements.length; l++) {
        if (undefined === this.elementsPerWord.elements[l].element) continue;

        if (this.elementsPerWord.elements[l]) summed += this.elementsPerWord.elements[l].element.mass;

    }
    this.elementsPerWordHtml = html;
}

Phraser.prototype.elementIterator = function () {
    let htmlArray = [];
    htmlArray[0] = '';
    htmlArray[1] = '';
    htmlArray[2] = '';

    let tHtml = '';

    for (let i = 0; i < this.analyzed.length; i++) {

        for (let t = 0; t < this.analyzed[i][6].length; t++) {
            htmlArray[0] += '<div class="col-xs-4">' + this.analyzed[i][6][t] + '</div>';
            tHtml = '';
            let currentElement;

            if (undefined !== this.analyzed[i][5][t]) {
                currentElement = this.analyzed[i][5][t];
                tHtml = '<div data-toggle="modal" data-target="#elementDetailModal" data-tooltip="' + currentElement.value + '" class="col-xs-4 ' + currentElement.color + '">';
                tHtml += '<div class="col-xs-4 elementDiv"><el class="elementProp">' + currentElement.value + '</el><el class="elementAb">&nbsp;&nbsp;' + currentElement.ab + '&nbsp;</el><br><el class="elementName">' + currentElement.name + '</el>' +  '</el><br />';
                tHtml += '<el class="elementProp">' + currentElement.mass + '</el><br /></div>';
                tHtml += '</div>';
            }

            htmlArray[1] += tHtml;
        }
    }

    return htmlArray;
}

Phraser.prototype.wordElements = function () {
    let elementsPerWord = {
        elements: [],
        summed: 0
    };
    let sum = 0;

    for (let i = 0; i < this.analyzed.length; i++) {
        elementsPerWord.elements.push({
            value: this.analyzed[i][1],
            element: Elements[this.analyzed[i][1]]
        })
    }

    elementsPerWord.summed = sum;
    return elementsPerWord;
}


Phraser.prototype.sumElements = function () {
    let total = 0;
    for (let i = 0; i < this.analyzed.length; i++) {
        total += parseFloat(this.analyzed[i][7]);
    }

    return total.toFixed(3);
}

Phraser.prototype.iterateWords = function () {
    //returns html
    let html = '';
    let words = this.analyzed;

    for (let i = 0; i < words.length; i++) {
        for (let t = 0; t < words[i][4].length; t++) {
            html += words[i][0][t] + '<sup>' + words[i][4][t] + '</sup>';
        }

        html += '<sub>' + words[i][1] + '/' + words[i][2] + '</sub>';
    }

    return html;
}

Phraser.prototype.totalize = function () {
    let words = this.analyzed,
        A = 0, B = 0, C = 0, D = 0;

    for (let i = 0; i < words.length; i++) {
        // count letters
        for (let l = 0; l < words[i][0].length; l++) {
            if (AcceptedChars.indexOf(words[i][0][l].toUpperCase()) > -1) {
                C++;
            }
        }
        A += words[i][1];
        B += words[i][2];
        D++;
    }

    let S = (A + B + C + D);

    return {
        'A': A,
        'B': B,
        'C': C,
        'D': D,
        'S': S
    };
}

Phraser.prototype.analyze = function () {
    let analyzed = [],
        result = 0,
        letter,
    // split the phrase by spaces
        words = this.phrase.split(' '),
        letters;

    // Each word
    for (let i = 0; i < words.length; i++) {
        let word = words[i],
            wordNew = '',
            letterValues = [],
            elements = [],
            wordLetters = [];

        // each letter
        letters = 0;

        for (let t = 0; t < word.length; t++) {

            if (CipherExceptions.indexOf(this.cipher) > -1) {
                letter = word[t];
            } else {
                letter = word[t].toUpperCase();
            }

            if (AcceptedChars.indexOf(letter) > -1) {
                wordNew += word[t];
                result += Ciphers[this.cipher][letter];
                letterValues.push(Ciphers[this.cipher][letter]);
                elements.push(Elements[Ciphers[this.cipher][letter]]);
                wordLetters.push(letter);
                letters++;
            }

        }
        // Add elementTotals
        let elementTotal = 0;

        for (let l = 0; l < elements.length; l++) {
            if (undefined !== elements[l]) {
                elementTotal += elements[l].mass;
            }
        }

        letters = this.reduce(letters + this.reduce(result));
        analyzed.push([wordNew, result, this.reduce(result), letters, letterValues, elements, wordLetters, elementTotal.toFixed(3)]);
        result = 0;
    }

    return analyzed;
}

Phraser.prototype.reduce = function (total) {
    if (total === undefined) return total;

    let reduced = 0,
        totalString = total.toString();

    if (totalString.length > 1) {

        for (let i = 0; i < totalString.length; i++) {
            reduced += Number(totalString[i]);
        }
    }

    if (reduced > 0 && reduced < 10) return reduced;
    if (reduced > 9)         return this.reduce(reduced);

    return total;
}
