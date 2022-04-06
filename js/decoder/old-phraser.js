let Phraser = function (phrase, cipher) {
    this.phrase = phrase;
    this.cipher = cipher;
    this.phraseHtml = '';
    this.totals;
    this.analyzed;
}

Phraser.prototype.getPhraseValue = function () {
    if (this.phrase === '') return;
    this.analyzed = this.analyze();
    this.phraseHtml = this.iterateWords();
    this.totals = this.totalize();
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
                wordLetters.push(letter);
                letters++;
            }

        }

        letters = this.reduce(letters + this.reduce(result));
        analyzed.push([wordNew, result, this.reduce(result), letters, letterValues, 0, wordLetters, 0]);
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
