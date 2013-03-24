(function () {
    var chart_id = "#box_plot";
    // Based on http://strongriley.github.com/d3/ex/box.html
    // Uses https://github.com/d3/d3-plugins
    var w = 120,
        h = 100,
        h_padding = w/2,
        v_padding = 0.25*h,
        margin = {top: 10, right: 50, bottom: 20, left: 50},
        min = Infinity,
        max = -Infinity;

    var chart = d3.box()
        .whiskers(iqr(1.5))
        .width(w - margin.right - margin.left)
        .height(h - margin.top - margin.bottom);

    var boxes = [
        [0,0,25],
        [0,1,97],
        [0,2,0],
        [0,3,33],
        [0,4,20],
        [0,5,59],
        [0,6,25],
        [0,7,34],
        [0,8,57],
        [0,9,72],
        [0,10,85],
        [0,11,53],
        [0,12,20],
        [0,13,72],
        [0,14,40],
        [0,15,63],
        [0,16,42],
        [0,17,75],
        [0,18,63],
        [0,19,13],
        [1,0,99],
        [1,1,23],
        [1,2,75],
        [1,3,54],
        [1,4,5],
        [1,5,92],
        [1,6,50],
        [1,7,37],
        [1,8,75],
        [1,9,65],
        [1,10,16],
        [1,11,67],
        [1,12,74],
        [1,13,71],
        [1,14,30],
        [1,15,20],
        [1,16,21],
        [1,17,95],
        [1,18,36],
        [1,19,37],
        [2,0,5],
        [2,1,34],
        [2,2,11],
        [2,3,36],
        [2,4,83],
        [2,5,39],
        [2,6,37],
        [2,7,19],
        [2,8,93],
        [2,9,58],
        [2,10,99],
        [2,11,24],
        [2,12,33],
        [2,13,6],
        [2,14,14],
        [2,15,20],
        [2,16,90],
        [2,17,24],
        [2,18,12],
        [2,19,20],
        [3,0,1],
        [3,1,51],
        [3,2,37],
        [3,3,52],
        [3,4,17],
        [3,5,10],
        [3,6,70],
        [3,7,40],
        [3,8,1],
        [3,9,80],
        [3,10,98],
        [3,11,4],
        [3,12,51],
        [3,13,60],
        [3,14,66],
        [3,15,33],
        [3,16,25],
        [3,17,42],
        [3,18,87],
        [3,19,42],
        [4,0,53],
        [4,1,80],
        [4,2,14],
        [4,3,3],
        [4,4,25],
        [4,5,10],
        [4,6,60],
        [4,7,15],
        [4,8,91],
        [4,9,74],
        [4,10,20],
        [4,11,41],
        [4,12,58],
        [4,13,77],
        [4,14,30],
        [4,15,88],
        [4,16,80],
        [4,17,92],
        [4,18,51],
        [4,19,78],
        [5,0,69],
        [5,1,97],
        [5,2,60],
        [5,3,10],
        [5,4,12],
        [5,5,16],
        [5,6,2],
        [5,7,86],
        [5,8,97],
        [5,9,28],
        [5,10,42],
        [5,11,60],
        [5,12,47],
        [5,13,27],
        [5,14,91],
        [5,15,52],
        [5,16,59],
        [5,17,57],
        [5,18,46],
        [5,19,21],
        ];

    var num_plots;
    (function () {
        var data = [];

        for (var i=0; i<boxes.length; i++) {
            var entry = boxes[i];
            var e = entry[0];
            var r = entry[1];
            var s = entry[2];
            var d = data[e];
            if (!d) {
                data[e] = [s];
            } else {
                d.push(s);
            }
            if (s >max) {
                max = s;
            }
            if (s < min) {
                min = s;
            }
        };
        num_plots = data.length;

        chart.domain([min, max]);

        var vis = d3.select(chart_id).selectAll("svg")
            .data(data)
            .enter()
            .append("svg:svg")
                .attr("class", "box")
                .attr("width", w)
                .attr("height", h)
            .append("svg:a")
                .attr("xlink:href", function (d) {return 'assessment.html#section=Algebra2Section1#assessment=test1';})
            .append("svg:g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(chart);

        var xScale = d3.scale.linear()
            .domain([0, d3.max(boxes, function(d) { return d[0]; })])
            .range([h_padding, w*num_plots-h_padding]);

        //Define X axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .ticks(num_plots)
            .orient("bottom");

        d3.select(chart_id)
            .append("svg")
                .attr("class", "axis")
                .attr("height", 30)
            .append("g")
                .call(xAxis);
    })();

    // Returns a function to compute the interquartile range.
    function iqr(k) {
    return function(d, i) {
        var q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k,
            i = -1,
            j = d.length;
        while (d[++i] < q1 - iqr);
        while (d[--j] > q3 + iqr);
        return [i, j];
    };
    }
})();
