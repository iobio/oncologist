/* SJG Nov2019 adapted from http://bl.ocks.org/tjdecke/5558084 */

export default function drugHeatmap(d3, vizId, xAxisLabels, yAxisLabels, fileName, scaleFactor, cardHeight, cardWidth, colors, shiftCols) {
    // TODO: take in margin param instead of relying on shiftCols
    var margin = {top: (shiftCols ? 75: 50), right: 150, bottom: 100, left: (shiftCols ? 75 : 150)},
        width = cardWidth - margin.left - margin.right + 300, // hardcoded adding margin back in to scale correctly
        height = cardHeight - margin.top - margin.bottom,
        gridSize = Math.floor(width / scaleFactor),
        gridSpacing = 5,
        // legendElementWidth = gridSize * 2,
        // TODO: make width adjustable via argument
        buckets = colors.length;

    var dispatch = d3.dispatch("drugClick", "sort");

    var svg = d3.select("#" + vizId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "gViz")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // TODO: rename labels to more generic
    svg.selectAll(".drugLabel")
        .data(yAxisLabels)
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
            return i * gridSize;
        })
        .style("text-anchor", "end")
        .style("font-family", "Raleway")
        .style("color", "#888")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
        .attr("class", function (d, i) {
            return ((i >= 0 && i <= 4) ? "drugLabel mono axis axis-drugs" : "drugLabel mono axis");
        });

    svg.selectAll(".timeLabel")
        .data(xAxisLabels)
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .style("font-family", "Raleway")
        .style("color", "#888")
        .attr("x", -6)
        .attr("y", 0)
        .style("text-anchor", function() { return shiftCols ? "start" : "middle"})
        .attr("transform", function (d, i) {
            if (shiftCols) {
                return "translate(" + (i * gridSize + gridSize / 2) + ", -10)rotate(-65)";
            } else {
                return "translate(" + (i * gridSize + gridSize / 2) + ", -6)";
            }
        })
        .attr("class", function (d, i) {
            return ((i >= 7 && i <= 16) ? "evidLabel mono axis axis-evid" : "evidLabel mono axis");
        });

    var heatmapChart = function (fileName) {
        // TODO: rename mapping to be more generic
        d3.tsv(fileName)
            .then(function (fileData) {
                var formattedData = fileData.map(function (d) {
                    return {drug: +d.drug, evidType: +d.evidType, value: +d.value}
                });

                var colorScale = d3.scaleQuantile()
                    .domain([0, buckets - 1, d3.max(formattedData, function (d) {
                        return d.value;
                    })])
                    .range(colors);

                var cards = svg.selectAll(".drug")
                    .data(formattedData, function (d) {
                        return d.evidType + ':' + d.drug;
                    });

                cards.append("title");

                cards.enter().append("rect")
                    .attr("x", function (d) {
                        return (d.drug - 1) * gridSize;
                    }).attr("y", function (d) {
                        return (d.evidType - 1) * gridSize;
                    }).attr("rx", 5)
                    .attr("ry", 4)
                    .attr("class", "drug bordered")
                    .attr("width", gridSize - gridSpacing)
                    .attr("height", gridSize - gridSpacing)
                    .style("fill", function (d) {
                        return colorScale(d.value);
                    })
                    .on("click", function(d) {
                        dispatch.call("drugClick", this, xAxisLabels[d.drug - 1] );
                    });

                cards.select("title").text(function (d) {
                    return d.value;
                });

                cards.exit().remove();

                var legend = svg.selectAll(".legend")
                    .data([0].concat(colorScale.quantiles()), function (d) {
                        return d;
                    });

                // TODO: get rid of this 300 or name it above
                var adjWidth = shiftCols ? width : width - 150;
                var sectionWidth = adjWidth / colorScale.quantiles().length;

                legend.enter().append("rect")
                    .attr("x", function (d, i) {
                        return sectionWidth * i;
                    })
                    .attr("y", height + margin.top)
                    .attr("width", sectionWidth)
                    .attr("height", gridSize / 2)
                    .style("fill", function (d, i) {
                        return colors[i];
                    });

                // legend.append("text")
                //     .attr("class", "mono")
                //     .text(function (d) {
                //         return "≥ " + Math.round(d);
                //     })
                //     .attr("x", function (d, i) {
                //         return legendElementWidth * i;
                //     })
                //     .attr("y", height + gridSize);

                legend.exit().remove();
            });

        return svg.node();
    };
    heatmapChart(fileName);

    // New rebind paradigm
    heatmapChart.on = function() {
        var value = dispatch.on.apply(dispatch, arguments);
        return value === dispatch ? heatmapChart : value;
    };
    return heatmapChart;
}