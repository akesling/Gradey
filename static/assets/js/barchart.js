(function () {
    var chart_id = "#bar_plot";
    // Based on http://strongriley.github.com/d3/ex/box.html
    // Uses https://github.com/d3/d3-plugins
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        h_padding = width/2,
        v_padding = 0.25*height,
        min = Infinity,
        max = -Infinity;

    var grades = [
        [0,0.83],
        [1,0.32],
        [2,0.52],
        [3,0.89],
        [4,0.86],
        [5,0.63],
        [6,0.62],
        [7,0.97],
        [8,0.71],
        [9,0.28],
        [10,0.54],
        [11,0.54],
        [12,0.16],
        [13,0.84],
        [14,0.78],
        [15,0.67],
        [16,0.15],
        [17,0.33],
        [18,0.47],
        [19,0.12]
    ];


    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var svg = d3.select(chart_id)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    (function () {
        x.domain(grades.map(function(d) { return d[0]; }));
        y.domain([0, d3.max(grades, function(d) { return d[1]; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Grade");

        svg.selectAll(".bar")
            .data(grades)
            .enter()
            .append("svg:a")
                .attr("xlink:href", function (d) {return 'student.html#section=Algebra2section1';})
            .append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d[0]); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return height - y(d[1]); });
    })();
})();
