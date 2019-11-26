export default function geneD3(d3, vizId, selection, regionStart, regionEnd) {

    // defaults
    var geneD3_showLabel = false;
    var geneD3_showXAxis = true;
    var container = null;

    // dimensions
    var margin = {top: 10, right: 0, bottom: 15, left: 110},
        geneD3_width = 1000,
        geneD3_height = 10;

    // scales
    var x = d3.scaleLinear(),
        y = d3.scaleLinear();

    // axis
    var xAxis = d3.axisBottom(x)
        .tickFormat(tickFormatter);

    // variables
    var geneD3_trackHeight = 40,
        borderRadius = 1,
        minFtWidth = 0.5;
    var transcriptClass = function () {
        return 'transcript';
    };
    var geneD3_utrHeight = undefined,
        geneD3_cdsHeight = 12,
        geneD3_arrowHeight = 8,
        geneD3_regionStart = regionStart,
        geneD3_regionEnd = regionEnd,
        geneD3_widthPercent = '100%',
        geneD3_heightPercent = '100%';

    //  options
    var featureClass = function (d) { return d.feature_type.toLowerCase() };
    var featureGlyphHeight = +0;

    // do work
    function chart(selection) {
        // set variables if not user set
        geneD3_cdsHeight = geneD3_cdsHeight || geneD3_trackHeight;
        geneD3_utrHeight = geneD3_utrHeight || geneD3_cdsHeight / 2;
        geneD3_arrowHeight = geneD3_arrowHeight || geneD3_trackHeight / 2;

        selection.each(function(data) {

            // calculate height
            var padding = data.length > 1 ? geneD3_trackHeight / 2 : 0;
            geneD3_height = data.length * (geneD3_trackHeight + padding);

            // determine inner height (w/o margins)
            var innerHeight = geneD3_height - margin.top - margin.bottom;

            // set svg element
            container = d3.select(this);
            container.selectAll("svg").remove();

            // Update the x-scale.
            if (geneD3_regionStart && geneD3_regionEnd) {
                x.domain([geneD3_regionStart, geneD3_regionEnd]);
            } else {
                x.domain([d3.min(data, function (d) {
                    return d3.min(d.features, function (f) {
                        return parseInt(f.start);
                    })
                }),
                    d3.max(data, function (d) {
                        return d3.max(d.features, function (f) {
                            return parseInt(f.end);
                        })
                    })
                ]);

            }
            x.range([0, geneD3_width - margin.left - margin.right]);

            // Update the y-scale.
            y.domain([0, data.length]);
            y.range([innerHeight, 0]);


            data.forEach(function (transcript) {
                transcript.features.forEach(function (feature) {
                    feature.transcript_type = transcript.transcript_type;
                })
            });


            // Select the svg element, if it exists.
            var svg = container.selectAll("svg").data([0]);

            var g = svg.join("svg")
                .attr("width", geneD3_widthPercent ? geneD3_widthPercent : geneD3_width)
                .attr("height", geneD3_heightPercent ? geneD3_heightPercent : geneD3_height + margin.top + margin.bottom)
                .attr('viewBox', "0 0 " + parseInt(geneD3_width + margin.left + margin.right) + " " + parseInt(geneD3_height + margin.top + margin.bottom + featureGlyphHeight))
                .attr("preserveAspectRatio", "none")
                .append('g')
                .attr("transform", "translate(" + margin.left + "," + parseInt(margin.top + featureGlyphHeight - 30) + ")");


            // The chart dimensions could change after instantiation, so update viewbox dimensions
            // every time we draw the chart.
            if (geneD3_widthPercent && geneD3_heightPercent) {
                d3.select(this).selectAll("svg")
                    .filter(function () {
                        return this.parentNode === container.node();
                    })
                    .attr('viewBox', "0 0 " + parseInt(geneD3_width + margin.left + margin.right) + " " + parseInt(geneD3_height + margin.top + margin.bottom + featureGlyphHeight))
                    .attr("preserveAspectRatio", "none");
            }

            g.selectAll(".x.axis").remove();
            if (geneD3_showXAxis) {
                g.append('g')
                    .style('font-size', '15px')
                    .attr("class", "x axis")
                    .attr("transform", "translate(0, " + parseInt(margin.top + margin.bottom + 10) + ")")
                    .call(xAxis);
            }

            // Start gene model
            // add elements
            var transcript = g.selectAll('.transcript')
                .data(data, function (d) {
                    return d.transcript_id;
                }).join('g')
                .attr('class', transcriptClass)
                .attr("id", function (d) {
                    return 'transcript_' + d.transcript_id.split(".").join("_");
                })
                .attr('transform', function (d, i) {
                    return "translate(0," + (y(i + 1)) + ")"
                });
            transcript.exit();

            transcript.selectAll(".selection-box").remove();
            transcript.selectAll(".selection-box")
                .data(function (d) {
                    if (geneD3_regionStart && geneD3_regionEnd) {
                        return [[geneD3_regionStart, geneD3_regionEnd]];
                    } else {
                        return [[d.start, d.end]]
                    }
                })
                .join('rect')
                .style('fill', 'transparent')
                .attr('x', (margin.left * -1) + 2)
                .attr('y', 0)
                .attr('width', margin.left + geneD3_width)
                .attr('height', geneD3_trackHeight);

            transcript.selectAll(".reference").remove();
            transcript.selectAll('.reference')
                .data(function (d) {
                    if (geneD3_regionStart && geneD3_regionEnd) {
                        return [[geneD3_regionStart, geneD3_regionEnd]];
                    } else {
                        return [[d.start, d.end]]
                    }
                })
                .join('line')
                .style('stroke', '#969696')
                .attr('x1', function (d) {
                    return Math.round(x(d[0]))
                })
                .attr('x2', function (d) {
                    return Math.round(x(d[1]))
                })
                .attr('y1', geneD3_trackHeight / 2)
                .attr('y2', geneD3_trackHeight / 2)
                .style("pointer-events", "none");

            transcript.selectAll(".name,.type").remove();
            if (geneD3_showLabel) {
                transcript.selectAll('.name').data(function (d) {
                    return [[d.start, d.transcript_id]]
                })
                    .join('text')
                    .attr('class', 'name')
                    .attr('x', function() {
                        return margin.left > 5 ? 5 - margin.left : 0
                    })
                    .attr('y', 0)
                    .attr('text-anchor', 'top')
                    .attr('alignment-baseline', 'left')
                    .text(function (d) {
                        return d[1];
                    })
                    .style('fill-opacity', 0)
                    .style("pointer-events", "none");

                transcript.selectAll('.type').data(function (d) {
                    return [[d.start, d.transcript_type, (d.isCanonical ? ' CANONICAL' : ''), (d.xref != null ? "(" + d.xref + ")" : ''), d.sort]]
                })
                    .join('text')
                    .attr('class', 'type')
                    .style('font-size', '16px')
                    .attr('x', function () {
                        return (geneD3_width - margin.left - margin.right - 5) + 10
                    })
                    .attr('y', 12)
                    .attr('text-anchor', 'top')
                    .attr('alignment-baseline', 'left')
                    .style("pointer-events", "none")
                    .text(function (d) {
                        var type = (d[1] === 'protein_coding' || d[1] === 'mRNA' ? '' : d[1]);
                        return type + ' ' + d[2] + ' ' + d[3];
                    })


            }
            transcript.selectAll(".arrow").remove();
            transcript.selectAll('.arrow').data(centerSpan)
                .join('path')
                .style('stroke', '#969696')
                .style('fill', 'transparent')
                .attr('d', centerArrow);

            var filterFeature = function (feature) {
                if (feature.transcript_type === 'protein_coding'
                    || feature.transcript_type === 'mRNA'
                    || feature.transcript_type === 'transcript'
                    || feature.transcript_type === 'primary_transcript') {
                    return feature.feature_type.toLowerCase() === 'utr' || feature.feature_type.toLowerCase() === 'cds';
                } else {
                    return feature.feature_type.toLowerCase() === 'exon';
                }
            };

            transcript.selectAll('.transcript rect.utr, .transcript rect.cds, .transcript rect.exon').data(function (d) {
                return d['features'].filter(function (d) {
                    return filterFeature(d);
                }, function (d) {
                    return d.feature_type + "-" + d.seq_id + "-" + d.start + "-" + d.end;
                });
            }).join('rect')
                .style('fill', '9f9f9f')
                .style('stroke', 'hsla(0,0%,65%,.6')
                .attr('rx', borderRadius)
                .attr('ry', borderRadius)
                .attr('x', function (d) {
                    return Math.round(x(d.start))
                })
                .attr('width', function (d) {
                    return Math.max(minFtWidth, Math.round(x(d.end) - x(d.start)))
                })
                .attr('y', function (d) {
                    if (d.feature_type.toLowerCase() === 'utr') return (geneD3_trackHeight - geneD3_utrHeight) / 2;
                    else return (geneD3_trackHeight - geneD3_cdsHeight) / 2;
                })
                .attr('height', function (d) {
                    if (d.feature_type.toLowerCase() === 'utr') return geneD3_utrHeight;
                    else return geneD3_cdsHeight;
                });

                // .attr("pointer-events", "all")
                // .style("cursor", "pointer")
                // .on("mouseover", function (d) {
                //     // show the tooltip
                //     var featureObject = d3.select(this);
                //
                //     // select the transcript
                //     svg.selectAll('.transcript.selected').classed("selected", false);
                //     d3.select(this.parentNode).classed("selected", true);
                // })
                // .on("mouseout", function (d) {
                //     // de-select the transcript
                //     d3.select(this.parentNode).classed("selected", false);
                //
                // })
                // .on("click", function (d) {
                //     // select the transcript
                //     svg.selectAll('.transcript.current').classed("current", false);
                //     d3.select(this.parentNode).classed("current", true);
                //     selectedTranscript = d3.select(this.parentNode)[0][0].__data__;
                //     dispatch.d3selected(selectedTranscript);


                    // // show the tooltip
                    // var featureObject = d3.select(this);
                    // dispatch.d3featuretooltip(featureObject, d, true);
                // });


            // Add any feature glyphs
            // transcript.selectAll(".feature_glyph").remove();
            // transcript.selectAll('.transcript rect.utr, .transcript rect.cds, .transcript rect.exon').data(function (d) {
            //     return d['features'].filter(function (d) {
            //         return filterFeature(d);
            //     }, function (d) {
            //         return d.feature_type + "-" + d.seq_id + "-" + d.start + "-" + d.end;
            //     });
            // }).each(function (d, i) {
            //         var me = this;
            //         var featureX = d3.round(x(d.start));
            //         featureGlyph.call(me, d, i, featureX);
            //     });

            // transcript.selectAll(".feature_glyph")
            //     .on("mouseover", function (d) {
            //         // show the tooltip
            //         var featureObject = d3.select(this);
            //         dispatch.d3featureglyphtooltip(featureObject, d, false);
            //     })
            //     .on("mouseout", function (d) {
            //         if (container.select('.tooltip.locked').empty()) {
            //             dispatch.d3featureglyphtooltip();
            //         }
            //     })
            //     .on("click", function (d) {
            //         // show the tooltip
            //         var featureObject = d3.select(this);
            //         dispatch.d3featureglyphtooltip(featureObject, d, true);
            //     })


            // Update class
            transcript.selectAll('.transcript rect.utr, .transcript rect.cds, .transcript rect.exon').data(function (d) {
                return d['features'].filter(function (d) {
                    return filterFeature(d);
                }, function (d) {
                    return d.feature_type + "-" + d.seq_id + "-" + d.start + "-" + d.end;
                });
            }).attr('class', function (d, i) {
                    return featureClass(d, i);
                });


            // update
            transcript.transition()
                .duration(700)
                .attr('transform', function (d, i) {
                    return "translate(0," + (y(i + 1)) + ")"
                });


            transcript.selectAll('.reference').transition()
                .duration(700)
                .attr('x1', function (d) {
                    return x(d[0])
                })
                .attr('x2', function (d) {
                    return x(d[1])
                });

            transcript.selectAll('.arrow').transition()
                .duration(700)
                .attr('d', centerArrow);


            transcript.selectAll('.name').transition()
                .duration(700)
                .attr('x', function () {
                    return margin.left > 5 ? 5 - margin.left : 0;
                })
                .attr('y', function () {
                    return margin.left > 5 ? geneD3_trackHeight - (geneD3_trackHeight / 2) + 2 : -10;
                })
                .text(function (d) {
                    return d[1];
                })
                .style('fill-opacity', 1);


            transcript.selectAll('.utr,.cds,.exon').sort(function (a, b) {
                return parseInt(a.start) - parseInt(b.start)
            })
                .transition()
                .duration(700)
                .attr('x', function (d) {
                    return Math.round(x(d.start))
                })
                .attr('width', function (d) {
                    return Math.max(minFtWidth, Math.round(x(d.end) - x(d.start)))
                })
                .attr('y', function (d) {
                    if (d.feature_type.toLowerCase() === 'utr') return (geneD3_trackHeight - geneD3_utrHeight) / 2;
                    else return (geneD3_trackHeight - geneD3_cdsHeight) / 2;
                })
                .attr('height', function (d) {
                    if (d.feature_type.toLowerCase() === 'utr') return geneD3_utrHeight;
                    else return geneD3_cdsHeight;
                });

            // Update the x-axis.
            svg.select(".x.axis").transition()
                .duration(200)
                .call(xAxis);

            // Draw brush if desired
            // toggleBrush(geneD3_showBrush, container);
        });

    }

    // moves selection to front of svg
    // function moveToFront(selection) {
    //     return selection.each(function () {
    //         this.parentNode.appendChild(this);
    //     });
    // }

    // updates the hash with the center of the biggest span between features
    function centerSpan(d) {
        var span = 0;
        var center = 0;
        var sorted = d.features
            .filter(function (f) {
                var ft = f.feature_type.toLowerCase();
                return ft == 'utr' || ft == 'cds'
            })
            .sort(function (a, b) {
                return parseInt(a.start) - parseInt(b.start)
            });

        for (var i = 0; i < sorted.length - 1; i++) {
            var currSpan = parseInt(sorted[i + 1].start) - parseInt(sorted[i].end);
            if (span < currSpan) {
                span = currSpan;
                center = parseInt(sorted[i].end) + span / 2;
            }
        }
        d.center = center;
        return [d];
    }

    // generates the arrow path
    function centerArrow(d) {
        var arrowHead = parseInt(d.strand + '5');
        var pathStr = "M ";
        pathStr += x(d.center) + ' ' + (geneD3_trackHeight - geneD3_arrowHeight) / 2;
        pathStr += ' L ' + parseInt(x(d.center) + arrowHead) + ' ' + geneD3_trackHeight / 2;
        pathStr += ' L ' + x(d.center) + ' ' + parseInt(geneD3_trackHeight + geneD3_arrowHeight) / 2;
        return pathStr;
    }

    function tickFormatter(d) {

        if ((d / 1000000) >= 1)
            d = d / 1000000 + "M";
        else if ((d / 1000) >= 1)
            d = d / 1000 + "K";
        return d;
    }

    // Call chart
    chart(selection);


    // chart.transcriptClass = function (_) {
    //     if (!arguments.length) return transcriptClass;
    //     transcriptClass = _;
    //     return chart;
    // };
    //
    // chart.featureClass = function (_) {
    //     if (!arguments.length) return featureClass;
    //     featureClass = _;
    //     return chart;
    // };
    //
    // chart.featureGlyphHeight = function (_) {
    //     if (!arguments.length) return featureGlyphHeight;
    //     featureGlyphHeight = _;
    //     return chart;
    // };
    //
    // chart.featureGlyph = function (_) {
    //     if (!arguments.length) return featureGlyph;
    //     featureGlyph = _;
    //     return chart;
    // };
    //
    // chart.margin = function (_) {
    //     if (!arguments.length) return margin;
    //     margin = _;
    //     return chart;
    // };
    //
    // chart.width = function (_) {
    //     if (!arguments.length) return geneD3_width;
    //     geneD3_width = _;
    //     return chart;
    // };
    //
    // chart.height = function (_) {
    //     if (!arguments.length) return geneD3_height;
    //     geneD3_height = _;
    //     return chart;
    // };
    //
    // chart.widthPercent = function (_) {
    //     if (!arguments.length) return geneD3_widthPercent;
    //     geneD3_widthPercent = _;
    //     return chart;
    // };
    //
    // chart.heightPercent = function (_) {
    //     if (!arguments.length) return geneD3_heightPercent;
    //     geneD3_heightPercent = _;
    //     return chart;
    // };
    //
    // chart.x = function (_) {
    //     if (!arguments.length) return x;
    //     x = _;
    //     return chart;
    // };
    //
    // chart.y = function (_) {
    //     if (!arguments.length) return y;
    //     y = _;
    //     return chart;
    // };
    //
    // chart.xAxis = function (_) {
    //     if (!arguments.length) return xAxis;
    //     xAxis = _;
    //     return chart;
    // };
    //
    // chart.yAxis = function (_) {
    //     if (!arguments.length) return yAxis;
    //     yAxis = _;
    //     return chart;
    // };
    // chart.trackHeight = function (_) {
    //     if (!arguments.length) return geneD3_trackHeight;
    //     geneD3_trackHeight = _;
    //     return chart;
    // };
    //
    // chart.utrHeight = function (_) {
    //     if (!arguments.length) return geneD3_utrHeight;
    //     geneD3_utrHeight = _;
    //     return chart;
    // };
    //
    // chart.cdsHeight = function (_) {
    //     if (!arguments.length) return geneD3_cdsHeight;
    //     geneD3_cdsHeight = _;
    //     return chart;
    // };
    //
    // chart.arrowHeight = function (_) {
    //     if (!arguments.length) return geneD3_arrowHeight;
    //     geneD3_arrowHeight = _;
    //     return chart;
    // };
    //
    // chart.showXAxis = function (_) {
    //     if (!arguments.length) return geneD3_showXAxis;
    //     geneD3_showXAxis = _;
    //     return chart;
    // };
    //
    // chart.regionStart = function (_) {
    //     if (!arguments.length) return geneD3_regionStart;
    //     geneD3_regionStart = _;
    //     return chart;
    // };
    // chart.regionEnd = function (_) {
    //     if (!arguments.length) return geneD3_regionEnd;
    //     geneD3_regionEnd = _;
    //     return chart;
    // };
    //
    // chart.showBrush = function (_) {
    //     if (!arguments.length) return geneD3_showBrush;
    //     geneD3_showBrush = _;
    //     return chart;
    // }
    //
    // chart.drawBrush = function (_) {
    //     if (!arguments.length) return geneD3_drawBrush;
    //     geneD3_drawBrush = _;
    //     return chart;
    // };
    //
    // chart.selectedTranscript = function (_) {
    //     if (!arguments.length) return selectedTranscript;
    //     selectedTranscript = _;
    //     return chart;
    // };
    //
    // chart.showLabel = function (_) {
    //     if (!arguments.length) return geneD3_showLabel;
    //     geneD3_showLabel = _;
    //     return chart;
    // };
    //
    // chart.toggleBrush = function (_) {
    //     if (!arguments.length) return toggleBrush;
    //     toggleBrush = _;
    //     return chart;
    // };
    //
    //
    // // This adds the "on" methods to our custom exports
    // d3.rebind(chart, dispatch, "on");

    return chart;
}