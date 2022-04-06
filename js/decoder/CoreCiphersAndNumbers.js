const Vowels = [
    'A', 'E', 'I', 'O', 'U', 'Y'
];
const Consonants = [
    'B', 'C', 'D', 'F', 'G',
    'H', 'J', 'K', 'L', 'M',
    'N', 'P', 'Q', 'R', 'S',
    'T', 'V', 'W', 'X', 'Z'
];
const AcceptedChars = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z', '1', '2',
    '3', '4', '5', '6', '7', '8', '9', '0',
    'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u',
    'v', 'w', 'x', 'y', 'z', '1', '2'
];

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) === value && // EYE added extra x
        !isNaN(parseInt(value, 10));
}

$(document).ready(function () {
    let ciph = $('#ciph'),
        aTotal = $('#A_total'),
        bTotal = $('#B_total'),
        cTotal = $('#C_total'),
        dTotal = $('#D_total'),
        cipherFullDisplay = $('#cipher_full_display'),
        showCipher = $('#show_cipher'),
        cipher = ciph.val(),
        phrase = $('#phrase'),
        phraseResult = $('#phrase_result'),
        total = $('#totaal'),
        magickThing = $('#magick'),
        extraCiphersButton = $('#extra-ciphers-button'),
        phraseAddToHistoryButton = $('#phraseAddToHistoryButton'),
        phrasesHistorySelect = $('#phrasesHistorySelect'),
        otherCiphersButton = $('#otherCiphersButton'),
        elementNumberIput = $('#elementNumberInput'),
        elementsElements = $('#elements-elements'),
        elementsWordsSumLeft = $('#elementsWordsSumLeft'),
        elementsWordsSumRight = $('#elementsWordsSumRight'),
        elementsText = $('#elements-text'),
        elementsTotals = $('#elements-totals'),
        elementsWords = $('#elements-words'),
        searchElement = $('#search-element'),
        searchElementResult = $('#searchElementResult'),
        searchElementByNumberResult = $('#searchElementByNumberResult'),
        massInput = $('#massInput')
    ;


    // Extra Ciphers toggle
    extraCiphersButton.on('click', function () {
        console.log($(this).val());
        if (parseInt($(this).val()) === 0) {
            $(this).val(1);
            $('#extra-ciphers-panel').show();
        } else {
            $(this).val(0);
            $('#extra-ciphers-panel').hide();
        }
    });

    // ELEMENT SEARCH UI
    searchElement.on('input', function () {
        searchElementsByMass();
    });

    elementNumberIput.on('input', function () {
        searchElementsByNumber();
    });

    // FUNCTIONS FROM INPUT
    function searchElementsByMass() {
        let mass = parseInt(massInput.val());
        let elements = new Element();
        let html = elements.searchByMass(mass);

        searchElementResult.html(html);
        elements.makeElementPopup('#element-by-mass');
    }
    function searchElementsByNumber() {
        let number = parseInt(elementNumberIput.val());
        let element = new Element();
        let html = element.searchByNumber(number);
        searchElementByNumberResult.html(html);
        // set the popup
        element.makeElementPopup('#element-by-number');
    }

    phrasesHistorySelect.on('change', function () {
        selectHistoryPhrase();
    });

    let cipherHandler = new CipherHandler(cipher);
    cipherHandler.setCipherDisplay();

    // Select extra ciphers //
    $('#extraCipher1 select').val('EnglishOrdinal');
    $('#extraCipher1 option[value=EnglishOrdinal]').attr('selected','selected');
    $('#extraCipher2 option[value=EnglishOrdinalFullReduction]').attr('selected','selected');
    $('#extraCipher3 option[value=EnglishOrdinalReversed]').attr('selected','selected');
    $('#extraCipher4 option[value=EnglishOrdinalReversedFullReduction]').attr('selected','selected');

    // Connect functions to UI
    ciph.on('change', function () {
        cipher = $('#ciph').val();
        cipherHandler.setCipher(cipher);
        cipherHandler.setCipherDisplay();
        phraser(phrase.val());
    });

    phrase.on("input", function () {
        phraser(phrase.val());
        if ($('#extra-ciphers-button').val() == '1'){
            extraCiphers();
        }
    });

    phraseAddToHistoryButton.on('click', function () {
        addPhraseToHistory();
    });

    showCipher.on('change', function () {
        cipherFullDisplay.toggle(this.checked);
    });

    otherCiphersButton.on('click', function () {
        $('#tabs2-icons-text-4-tab').tab('show');
        otherCiphers();
    })

    // Initialize clickable numbers
    $('#A_total, ' +
        '#B_total, ' +
        '#C_total, ' +
        '#D_total, ' +
        '#totaal, ' +
        '#extraCipher1Total, '  +
        '#extraCipher1Summed, ' +
        '#extraCipher1Reduced, ' +
        '#extraCipher2Total, ' +
        '#extraCipher2Summed, ' +
        '#extraCipher2Reduced, ' +
        '#extraCipher3Total, '  +
        '#extraCipher3Summed, ' +
        '#extraCipher3Reduced, ' +
        '#extraCipher4Total, '  +
        '#extraCipher4Summed, ' +
        '#extraCipher4Reduced, ' +
        '#extraCipherTotal, ' +
        '#extraCipherReduced, ' +
        '#extraCipherSummed'
    ).on('click', function () {
            let value = parseInt($(this).attr('data-totals'));
            let factorMatrix = new FactorMatrix(value, 0, true);
            factorMatrix.fillModalContent(value);
        });

    function otherCiphers () {
        let handler = new ApiHandler();
        handler.otherCiphers();
    }

    function selectHistoryPhrase() {
        $('#phrase').val($('#phrasesHistorySelect option:selected').text()).trigger('input');
    }

    function addPhraseToHistory () {
        let textOption = $('#phrase').val();
        if (textOption.length > 0) {
            let o = new Option(textOption, textOption);
            /// jquerify the DOM object 'o' so we can use the html method
            $(o).html(textOption);
            $("#phrasesHistorySelect").append(o);
        }
    }

    function extraCiphers () {
        let prefix = '#extraCipher',
            phrase = $('#phrase').val(),
            cipher,
            el,
            total,
            totals,
            reduced,
            summed,
            weight,
            weightVal,
            fTotal = 0,
            fReduced = 0,
            fSummed = 0,
            fWeight = 0;

        for (let i = 1; i < 5; i++) {
            el = prefix + i;
            total = prefix + i + 'Total';
            summed = prefix + i + 'Summed';
            reduced = prefix + i + 'Reduced';
            weight = prefix + i + 'Weight';

            cipher = $(el).val();
            if (phrase === '' || cipher === '') {
                $(total).html('0');
                $(summed).html('0');
                $(reduced).html('0');
                $(weight).html('0.0');

            } else {
                let p = new Phraser(phrase, cipher);
                p.getPhraseValue();

                fTotal += p.totals.A;
                fReduced += p.totals.B;
                fSummed += p.totals.S;

                $(total)
                    .html(p.totals.A)
                    .attr('data-totals', p.totals.A)
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#factorMatrixModal');
                $(summed)
                    .html(p.totals.S)
                    .attr('data-totals', p.totals.S)
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#factorMatrixModal');
                $(reduced)
                    .html(p.totals.B)
                    .attr('data-totals', p.totals.B)
                    .attr('data-toggle', 'modal')
                    .attr('data-target', '#factorMatrixModal');
                        }
        }
        // Calculate totals
        $('#extraCipherTotal')
            .html(fTotal)
            .attr('data-totals', fTotal)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
        $('#extraCipherReduced')
            .html(fReduced)
            .attr('data-totals', fReduced)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
        $('#extraCipherSummed')
            .html(fSummed)
            .attr('data-totals', fSummed)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
        $('#extraCipherWeight')
            .html(fWeight)
            .attr('data-totals', fWeight)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
    }

    function phraser(phrase) {
        if (phrase === '') {
            aTotal.html('');
            bTotal.html('');
            cTotal.html('');
            dTotal.html('');
            total.html('');
            return;
        }
        $(document).prop('title', phrase);
        let phraseHandler = new Phraser(phrase, cipher);
        phraseHandler.getPhraseValue();
        phraseResult.html(phraseHandler.phraseHtml);
        let totals = phraseHandler.totals;
        aTotal.html(totals.A)
            .attr('data-totals', totals.A)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
        bTotal.html(totals.B)
            .attr('data-totals', totals.B)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
        cTotal.html(totals.C)
            .attr('data-totals', totals.C)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
        dTotal.html(totals.D)
            .attr('data-totals', totals.D)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');
        total.html(totals.S)
            .attr('data-totals', totals.S)
            .attr('data-toggle', 'modal')
            .attr('data-target', '#factorMatrixModal');

        elementsWords.html(phraseHandler.elementsPerWordHtml);
        elementsText.html(phraseHandler.htmlElements[0]);
        elementsElements.html(phraseHandler.htmlElements[1]);
        elementsTotals.html(phraseHandler.htmlElements[2]);
        elementsWordsSumLeft.html(phraseHandler.elementsWordSumLeft).attr('data-totals', phraseHandler.elementsWordSumLeft);
        elementsWordsSumRight.html(phraseHandler.elementsWordSumRight).attr('data-totals', phraseHandler.elementsWordSumRight);
        // activate element search

        if (phraseHandler.elementsWordSumLeft < 119) {
            $('#elementNumberInput').val(phraseHandler.elementsWordSumLeft).trigger('input');
        } else if (phraseHandler.elementsWordSumRight < 119) {
            $('#elementNumberInput').val(phraseHandler.elementsWordSumRight).trigger('input');
        } else {
            $('#elementNumberInput').val(0).trigger('input');
        }

        $('#massInput').val(phraseHandler.elementsWordSumLeft).trigger('input');
    }
});