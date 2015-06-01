var table = document.getElementsByTagName('table')[0];
var enCoder = document.getElementById('enCoder');
var deCoder = document.getElementById('deCoder');
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
    probabilityTD.innerText = probability + '%';
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
    result.value = '';
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
        probability = probability.toPrecision(2);

        createRow(getChar(e.value), occurance, probability, e.code);

        //result
        resultProb += Number(probability);
        charBits += (e.freq * 8);
        //change the dom
        //End-result
    });

    countChar.innerHTML = keys.length + ' Characters';
    bits.innerHTML = size + ' Times';
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

var timing, time = [];
enCoder.addEventListener('input', function inputListener(e) {
    //cleanup 
    deCoder.disabled = true;

    timing = setTimeout(function() {
        if (enCoder.value !== "") {
            // for (var i = 500; i >= 0; i--) {
            removeAllRows(table.children);
            var beginTime = +new Date();
            Huffman = new HuffmanCoding(enCoder.value);
            var endTime = +new Date();
            time.push(endTime - beginTime)
                // };
            updateTable(Huffman.table, Huffman.code);
            // var result = time.reduce(function(a, b) {
            //     return a + b;
            // });
            console.log(time[0]);
            console.log(beginTime);
            console.log(endTime);
            deCoder.disabled = false;
        }
    }, 200);
    time = [];

    // sortedKeys = sortObject(list);

});
deCoder.addEventListener('input', function inputListener(e) {
    //cleanup 
    var str = Huffman.readCode(deCoder.value);
    var resultID = document.getElementById('result');
    resultID.innerText = str;
    // sortedKeys = sortObject(list);

});
