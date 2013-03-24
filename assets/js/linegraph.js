(function () {
    var chart_id = "#line_plot";
    // Based on http://strongriley.github.com/d3/ex/box.html
    // Uses https://github.com/d3/d3-plugins
    var margin = {top: 20, right: 80, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        h_padding = width/2,
        v_padding = 0.25*height,
        min = Infinity,
        max = -Infinity;

    var grades = {
        algebra: [
        ["20130324",0.84],
        ["20130325",0.74],
        ["20130326",0.09],
        ["20130327",0.65],
        ["20130328",0.73],
        ["20130329",0.28],
        ["20130330",0.18],
        ["20130331",0.6],
        ["20130401",0.09],
        ["20130402",0.4],
        ["20130403",0.91],
        ["20130404",0.63],
        ["20130405",0.12],
        ["20130406",0.02],
        ["20130407",0.66],
        ["20130408",0.67],
        ["20130409",0.52],
        ["20130410",0.29],
        ["20130411",0.73],
        ["20130412",0.37]
            ],
        english: [
        ["20130324",0.02],
        ["20130325",0.23],
        ["20130326",0.05],
        ["20130327",0.85],
        ["20130328",0.46],
        ["20130329",0.13],
        ["20130330",0.52],
        ["20130331",0.65],
        ["20130401",0.86],
        ["20130402",0.04],
        ["20130403",0.92],
        ["20130404",0.12],
        ["20130405",0.59],
        ["20130406",0.91],
        ["20130407",0.97],
        ["20130408",0.66],
        ["20130409",0.76],
        ["20130410",0.86],
        ["20130411",0.93],
        ["20130412",0.5]
            ],
        science: [
        ["20130324",0.04],
        ["20130325",0.34],
        ["20130326",0.61],
        ["20130327",0.86],
        ["20130328",0.96],
        ["20130329",0.24],
        ["20130330",0.15],
        ["20130331",0.8],
        ["20130401",0.15],
        ["20130402",0.99],
        ["20130403",0.37],
        ["20130404",0.2],
        ["20130405",0.66],
        ["20130406",0.07],
        ["20130407",0.22],
        ["20130408",0.12],
        ["20130409",0.08],
        ["20130410",0.18],
        ["20130411",0.09],
        ["20130412",0.05]
            ],
        history: [
        ["20130324",0.96],
        ["20130325",0.71],
        ["20130326",0.44],
        ["20130327",0.77],
        ["20130328",0.73],
        ["20130329",0.2],
        ["20130330",0.91],
        ["20130331",0.87],
        ["20130401",0.96],
        ["20130402",0.29],
        ["20130403",0.82],
        ["20130404",0.87],
        ["20130405",0.53],
        ["20130406",0.55],
        ["20130407",0.75],
        ["20130408",0.35],
        ["20130409",0.24],
        ["20130410",0.88],
        ["20130411",0.66],
        ["20130412",0.67]
            ]
    };

    var parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.grade); });

    var svg = d3.select(chart_id)
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    (function () {
        color.domain(d3.keys(Object.keys(grades)));
        var data = [[]].concat(Object.keys(grades))
            .reduce(function (arr, idx) {
                return arr.concat(grades[idx]);
            })
            .map(function(d) {
                return {date: parseDate(d[0]), grade: d[1]};
            });

        var subjects = color.domain().map(function(idx) {
            subject = Object.keys(grades)[idx]
            return {
                subject: subject,
                values: grades[subject].map(function(d) {
                    return {date: parseDate(d[0]), grade: d[1]};
                })
            };
        });

        x.domain(d3.extent(data, function(d) { return d.date; }));

        y.domain(d3.extent(data, function(d) { return d.grade; }));

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

        var subject = svg.selectAll(".subject")
            .data(subjects)
            .enter().append("g")
            .attr("class", "subject");

        subject.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return color(d.subject); });

        subject.append("text")
            .datum(function(d) { return {subject: d.subject, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.grade) + ")"; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function(d) { return d.subject; });
    })();

})();
