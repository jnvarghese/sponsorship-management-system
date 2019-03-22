import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Graph } from '../model';

@Component({
    selector: 'sms-bar-chart',
    template: '<div id="div22"></div>',
    styles: ['']
})
export class BarChartComponent implements OnInit {

    @Input()
    dataset: Array<Graph>;

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }


    diagramId: any = Math.floor(Math.random() * 1000);

    ngAfterViewInit() {
        let data = []
        data = this.dataset.reduce((contributions, item) => {
            if (+item.yaxis > 10000)
                contributions.push({ parish: item.xaxis, contribution: +item.yaxis })
            return contributions
        }, [])
        this.getLineChart(data);
    }

    getLineChart(data: any) {
        this.drawChart(data);
    }



    /**
  * Creates a chart using D3
  * @param {object} data Object containing historical data of BPI
  */
    drawChart(data) {

        var svgWidth = 500, svgHeight = 300;
        var margin = { top: 40, right: 20, bottom: 30, left: 50 };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;

        var svg = d3.select('div#div22').append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        var xScale = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(data.map(function (d) {
                return d[0];
            }));
        var yScale = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, d3.max(data, (function (d) {
                return d[2];
            }))]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        // Scale the range of the data in the domains
        xScale.domain(data.map(function (d) { return d.parish; }));
        yScale.domain([0, d3.max(data, function (d) { return d.contribution; })]);


        // axis-x
        g.append("g")
            //.attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        // axis-y
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(yScale));

        var bar = g.selectAll("rect")
            .data(data)
            .enter().append("g");
        var tooltip = d3.select("body").append("div").attr("class", "barChartToolTip");
        // bar chart
        bar.append("rect")
            .attr("x", function (d) { return xScale(d.parish); })
            .attr("y", function (d) { return yScale(d.contribution); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.contribution); })
            .attr("class", "bar");

        // labels on the bar chart
        bar.append("text")
            .attr("dy", "1.3em")
            .attr("x", function (d) { return xScale(d.parish) + xScale.bandwidth() / 2; })
            .attr("y", function (d) { return yScale(d.contribution); })
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black")
            .text(function (d) {
                return d.contribution;
            })
            .on("mousemove", function (d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.parish));
            })
            .on("mouseout", function (d) { tooltip.style("display", "none"); });

    }
}
//https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f