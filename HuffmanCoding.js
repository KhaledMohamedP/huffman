/**
 * Huffman file 
 */

function Node(char, val, right, left) {
    this.value = char;
    this.freq = val;
    this.code = '';
    this.right = right;
    this.left = left;
}

Node.prototype = {
    isLeaf: function() {
        return this.right == null && this.left == null;
    },
    search: function(value) {

        return (function findElm(node, value) {
            if (node == null) return;
            console.log(node.value, value)
            if (node.value === value) return node;
            findElm(node.left, value)
            findElm(node.right, value)
        })(this, value);
    }
}

function HuffmanCoding(str) {
    this.input = str;
    this.list = this.createTable(str);
    this.table = this.sortObject(this.list);
    this.root = this.createTree();
    this.code = this.createCode();
}

HuffmanCoding.prototype = {
    createTable: function(str) {
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
    sortObject: function(obj) {
        var list = [];

        //add all obj {value, freq} in the list array 
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var elm = new Node(key, obj[key], null, null);
                list.push(elm);
            }
        }

        list.sort(function(a, b) {
            return a.freq - b.freq;
        });

        return list.reverse();
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
            output = [],
            code = code.replace(/\s/g, '');
        while (code.length > 0) {
            var ch = code.charAt(0);
            if (ch === '0') {
                node = node.left;
            } else if (ch === '1') {
                node = node.right;
            }


            if (node.isLeaf()) {
                output.push(node.value);
                node = this.root; //After finding the element 
            }

            code = code.substr(1);
        }

        return output.join('');
    }
}
