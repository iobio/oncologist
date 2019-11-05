import * as d3 from 'd3'

export default function drugHeatmap(vizId, drugs, scoreDataFileName) {
    var margin = {top: 50, right: 150, bottom: 100, left: 150},
        width = 800 - margin.left - margin.right + 300, // hardcoded adding margin back in to scale correctly
        height = 450 - margin.top - margin.bottom,
        gridSize = Math.floor(width / 8),
        gridSpacing = 5,
        legendElementWidth = gridSize * 2,
        buckets = 7,
        evidenceTypes = ["Drug Screen", "Genomic Evidence", "Expression Evidence"],
        // colors = ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"];
        colors = ['#b2182b','#ef8a62','#fddbc7','#f7f7f7','#d1e5f0','#67a9cf','#2166ac'];

    var svg = d3.select("#" + vizId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.selectAll(".drugLabel")
        .data(evidenceTypes)
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
        .data(drugs)
        .enter().append("text")
        .text(function (d) {
            return d;
        })
        .style("font-family", "Raleway")
        .style("color", "#888")
        .attr("x", function (d, i) {
            return i * gridSize;
        })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function (d, i) {
            return ((i >= 7 && i <= 16) ? "evidLabel mono axis axis-evid" : "evidLabel mono axis");
        });

    var heatmapChart = function (fileName) {
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
                    })
                    .attr("y", function (d) {
                        return (d.evidType - 1) * gridSize;
                    })
                    .attr("rx", 5)
                    .attr("ry", 4)
                    .attr("class", "drug bordered")
                    .attr("width", gridSize - gridSpacing)
                    .attr("height", gridSize - gridSpacing)
                    .style("fill", function (d) {
                        return colorScale(d.value);
                    });


                cards.select("title").text(function (d) {
                    return d.value;
                });

                cards.exit().remove();

                var legend = svg.selectAll(".legend")
                    .data([0].concat(colorScale.quantiles()), function (d) {
                        return d;
                    });

                legend.enter().append("g")
                    .attr("class", "legend");

                legend.append("rect")
                    .attr("x", function (d, i) {
                        return legendElementWidth * i;
                    })
                    .attr("y", height)
                    .attr("width", legendElementWidth)
                    .attr("height", gridSize / 2)
                    .style("fill", function (d, i) {
                        return colors[i];
                    });

                legend.append("text")
                    .attr("class", "mono")
                    .text(function (d) {
                        return "≥ " + Math.round(d);
                    })
                    .attr("x", function (d, i) {
                        return legendElementWidth * i;
                    })
                    .attr("y", height + gridSize);

                legend.exit().remove();
            });
    };
    heatmapChart(scoreDataFileName);
}