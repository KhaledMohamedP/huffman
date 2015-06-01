var Huffman, timing;

//Encoder
var table = document.getElementsByTagName('table')[0];
var enCoder = document.getElementById('enCoder');

// Decoder
var deCoder = document.getElementById('deCoder');
var resultID = document.getElementById('result');

//Stat

function createRow(char, apperane, probability, code) {
    var row = document.createElement('tr');

    var charTD = document.createElement('td');
    var apperaneTD = document.createElement('td');
    var probabilityTD = document.createElement('td');
    var codeTD = document.createElement('td');
    
    //copy the info
    charTD.innerText = char;
    apperaneTD.innerText = apperane + 'x';
    probabilityTD.innerText = probability + '%';
    codeTD.innerText = code;

    //styling
    codeTD.className = 'code';

    //append to the table 
    row.appendChild(charTD);
    row.appendChild(apperaneTD);
    row.appendChild(probabilityTD);
    row.appendChild(codeTD);

    table.appendChild(row);
}

function removeAllRows(elm) {
    var lastElm;
    while (elm.length > 1) {
        lastElm = elm.length - 1;
        elm[lastElm].parentNode.removeChild(elm[lastElm]);
    }
}

function DefaultValues(){
    deCoder.value = '';
    resultID.innerText = '';
}

function updateTable(keys, HuffmanCode) {
    var probability,
        frequency,
        size = enCoder.value.length;

    //result 
    var charBits = 0,
        resultProb = 0;

    //End-result
    keys.forEach(function readElement(elm) {
        frequencys = elm.freq;
        probability = ((elm.freq / size) * 100).toFixed(0);
        var char = getChar(elm.value); 
        createRow(char, frequencys, probability, elm.code);

        //result
        resultProb += Number(probability);
        charBits += (elm.freq * 8);
        //change the dom
        //End-result
    });

    // fullCode.innerText = enCoder.value + '\nCode : ' + HuffmanCode.join(' ');
}


function getChar(char) {
    if (char.charCodeAt() == 32) {
        char = 'Space'
    } else if (char.charCodeAt() == 9) {
        char = 'Tabb'
    } else if (char.charCodeAt() == 10) {
        char = "New Line"
    }
    return char;
}

/*
keys.sort(function(a,b){ 
console.log(a,objs[a] , b,objs[b], objs[a] < objs[b]); 
return keys[a] < keys[b]})
 */

enCoder.addEventListener('input', function inputListener(e) {
    //cleanup 
    deCoder.disabled = true;
    timing = setTimeout(function() {
        removeAllRows(table.children);
        DefaultValues();
        if (enCoder.value !== "") {
            Huffman = new HuffmanCoding(enCoder.value);
            updateTable(Huffman.table, Huffman.code);
            deCoder.disabled = false;
        }
    }, 400);

    // sortedKeys = sortObject(list);

});

deCoder.addEventListener('input', function inputListener(e) {
    //cleanup 
    deCoder.value = e.target.value.replace(/[^01]/g, '');
    var str = Huffman.readCode(deCoder.value);
    resultID.innerText = str;

});
