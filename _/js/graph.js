function drawGraph(HuffmanTable) {
    //parse data 
    var list = [].concat(HuffmanTable),
        tableSize = HuffmanTable.length;

    while (list.length > 1) {
        var y = list.pop();
        var x = list.pop();
        var obj = {
            'value': x.value + y.value,
            'children': [x, y]
        }
        list.push(obj);
    }

    // Draw graph 
    var margin = {
            top: 25,
            right: 5,
            bottom: 5,
            left: 5
        },
        width = (70 * tableSize) - margin.right - margin.left,
        height = (70 * tableSize) - margin.top - margin.bottom;

    var i = 0;

    var tree = d3.layout.tree().size([height, width]);
    var diagonal = d3.svg.diagonal().projection(function(d) {
        return [d.x, d.y];
    });
    var svg = d3.select(".graph").append("svg")
        .attr("width", width + margin.right + margin.left).attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    root = list.pop();

    var nodes = tree.nodes(root),
        links = tree.links(nodes);

    nodes.forEach(function(d) {
        d.y = d.depth * 70;
    });

    var gNode = svg.selectAll("g.node")
        .data(nodes, function(d) {
            return d.id || (d.id = ++i);
        });

    var nodeEnter = gNode.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    var circle = nodeEnter.append("circle")
        .attr("r", 0);

    circle.transition()
        .delay(function(d, i) {
            return i * 80;
        })
        .attr("r", 20)
        .style("fill", function(d, i) {
            return d.children || d._children ? '#FFE066' : '#fff';
        })
        .duration(1000)
        .ease('elastic');

    //Enter the char 
    var charText = nodeEnter.append('text')
        .attr('y', 5)
        .attr("text-anchor", "middle")
        .style('font-size', function(d, i) {
            if (d.value.length > 14) {
                return 8;
            }

            return 12;
        });

    charText.transition()
        .delay(function(d, i) {
            return i * 90;
        })
        .text(function(d) {
            return d.value;
        });

    //Enter the code & frequency 
    var codeText = nodeEnter.append('text')
        .attr("y", 40)
        .attr("id", "code")
        .attr("text-anchor", "middle")
        .style('display', 'none')
        .style('font-size', function(d, i) {
            if (d.code) {
                if (d.code.length > 14) {
                    return 8;
                }
            }
            return 11;
        })
        .style('font-weight', 'normal')
        .text(function(d, i) {
            return d.code;
        })

    gNode.on('mouseover', function() {
        d3.select(this).select('#code')
            .style('display', 'block');

    }).on('mouseout', function() {
        d3.select(this).select('#code')
            .style('display', 'none');
    })

    //Enter the path code  0/1
    var pathText = nodeEnter.append('text')
        .attr("y", -30)
        .style('font-size', '10px');

    pathText.transition()
        .delay(function(d, i) {
            return i * 85;
        })
        .text(function(d) {
            return d.code ? d.code.substr(d.code.length - 1) : 1
        });


    //PATH 
    var path = svg.selectAll("path.link")
        .data(links, function(d) {
            return d.target.id;
        });

    var pathT = path.enter().insert("path", "g")
        .attr("class", "link");

    pathT.transition()
        .delay(function(d, i) {
            return i * 85;
        })
        .attr("d", diagonal);
}
