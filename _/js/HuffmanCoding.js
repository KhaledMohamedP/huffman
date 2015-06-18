/**
 * Huffman Algorithm 
 */

function Node(char, freq, right, left) {
    this.value = char;
    this.freq = freq;
    this.code = '';
    this.right = right;
    this.left = left;
}

Node.prototype = {
    isLeaf: function() {
        return this.right == null && this.left == null;
    }
}

//Huffman Implementation starts here 
function HuffmanCoding() {
    this.input; 
    this.list;
    this.table;
    this.root; 
}

HuffmanCoding.prototype = {
    init: function(str) {
        this.input = str;
        this.list = this.createTable();
        this.table = this.sortObject();
        this.root = this.createTree();
        this.createCode();
    },
    createTable: function() {
        var str = this.input;
        var list = {};
        for (var i = str.length - 1; i >= 0; i--) {
            char = str[i];
            if (list[char] == undefined) {
                list[char] = 1;
            } else {
                list[char] = ++list[char];
            }
        }
        return list;
    },
    sortObject: function() {
        var list = [];

        //add all obj {value, freq} in the list array as node object
        for (var key in this.list) {
            if (this.list.hasOwnProperty(key)) {
                list.push(new Node(key, this.list[key], null, null));
            }
        }

        //sort list of nodes based on frequency Ascending 
        list.sort(function(a, b) {
            return a.freq - b.freq;
        });

        return list.reverse(); //return nodes in Descending order 
    },
    createTree: function() {
        var list = [].concat(this.table);
        if (list.length == 1) {
            var x = list.pop();
            list.push(new Node(x.value, x.freq, null, x))
        }
        while (list.length > 1) {
            var x = list.pop();
            var y = list.pop();
            var parent = new Node((x.value + y.value), (x.freq + y.freq), x, y);
            list.push(parent);
        }
        return list.pop();
    },
    createCode: function() {
        (function generating(node, s) {
            if (node == null) return;
            if (node.isLeaf()) {
                node.code = s;
                return;
            }
            generating(node.left, s + '0');
            generating(node.right, s + '1');
        })(this.root, '');
    },
    readCode: function(code) {
        var node = this.root,
            output = [];
        while (code.length > 0) {
            var ch = code.charAt(0);
            if (ch === '0' && node.left != null) {
                node = node.left;
            } else if (ch === '1' && node.right != null) {
                node = node.right;
            }
            if (node.isLeaf()) {
                output.push(node.value);
                node = this.root; //After finding the element 
            }

            code = code.substr(1);
        }

        return output;
    },
    createOutput: function() {
        var str = this.input;
        var list = [];
        for (var i = 0; i < str.length; i++) {
            var node = this.find(str[i]);
            if (node) {
                var code = node.code;
                list.push(code);
            }
        };
        return list;
    },
    find: function(value) {
        var list = this.table;
        for (var i = 0; i < list.length; i++) {
            if (list[i].value == value) {
                return list[i]
            }
        };
        return false;
    },
    stat: function() {
        var result = {
            'totalBits': this.input.length * 8 /* char * ASCII bit*/ ,
            'totalCode': 0 /* Total Binary bits */
        }
        result.totalCode = this.createOutput().join('').length;

        result['compressionRatio'] = result.totalBits / result.totalCode;
        result['compressionPrecent'] = result.totalCode / result.totalBits * 100;
        return result;
    }
}
