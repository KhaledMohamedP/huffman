var table = document.getElementsByTagName('table')[0];
var enCoder = document.getElementById('enCoder');
var deCoder = document.getElementById('deCoder');
var resultID = document.getElementById('result');
var Huffman;
//result
var countChar = document.getElementById('countChar');
var bits = document.getElementById('bits');
var fullCode = document.getElementById('fullCode');
// var prob = document.getElementById('prob');
//End-result



function createRow(char, apperane, probability, code) {
    var row = document.createElement('tr');
    var charTD = document.createElement('td');
    var apperaneTD = document.createElement('td');
    var probabilityTD = document.createElement('td');
    var codeTD = document.createElement('td');

    //copy the info
    charTD.innerText = char;
    apperaneTD.innerText = apperane;
    probabilityTD.innerText = probability
    codeTD.innerText = code;

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
        // if(elm[lastElm].tagName == "TR"){
        elm[lastElm].parentNode.removeChild(elm[lastElm]);
        // }
    }
    countChar.innerHTML = '0';
    bits.innerHTML = '0';
    fullCode.innerText = '';
    deCoder.value = '';
    result.innerText = '';
}

function updateTable(keys, HuffmanCode) {
        var probability,
            occurance,
            size = enCoder.value.length;

        //result 
        var charBits = 0,
            resultProb = 0;
        //End-result
        keys.forEach(function readElement(e) {
            occurance = e.freq;
            probability = e.freq / size;
            probability = probability.toPrecision(3);

            createRow(e.value, occurance, probability, e.code);

            //result
            resultProb += Number(probability);
            charBits += (e.freq * 8);
            //change the dom
            //End-result
        });
        countChar.innerHTML = keys.length + ' Characters';
        bits.innerHTML = size + ' Times';
        fullCode.innerText = enCoder.value + '\nCode : ' + HuffmanCode.join(' ');
    }
    /*
    keys.sort(function(a,b){ 
    console.log(a,objs[a] , b,objs[b], objs[a] < objs[b]); 
    return keys[a] < keys[b]})
     */

var timing;
enCoder.addEventListener('input', function inputListener(e) {
    //cleanup 
    deCoder.disabled = true;

    clearTimeout(timing);
    timing = setTimeout(function() {
        removeAllRows(table.children);
        if (enCoder.value !== "") {
            Huffman = new HuffmanCoding(enCoder.value);
            updateTable(Huffman.table, Huffman.code);
            deCoder.disabled = false;
        }
    }, 200);


    // sortedKeys = sortObject(list);

});
deCoder.addEventListener('input', function inputListener(e) {
    //cleanup 
    var str = Huffman.readCode(deCoder.value);
    resultID.innerText = str;
    // sortedKeys = sortObject(list);

});
