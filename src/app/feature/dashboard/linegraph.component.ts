import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Graph } from '../model';


@Component({
    selector: 'sms-line-graph',
    template: '<div id="div{{diagramId}}"></div>',
    styles: [`
      .line-chart {
        border: 2px solid #ddd;
      }
    
    .axis {
        font: 10px sans-serif;
    }
    
    .axis path,
    .axis line {
      fill: none;
      stroke: #D4D8DA;
      stroke-width: 2px;
      shape-rendering: crispEdges;
    }
    
    .line {
      fill: none;
      stroke: #6F257F;
      stroke-width: 5px;
    }
    
    .overlay {
      fill: none;
      pointer-events: all;
    }
    
    .focus circle {
      fill: #F1F3F3;
      stroke: #6F257F;
      stroke-width: 5px;
    }
      
    .hover-line {
      stroke: #6F257F;
      stroke-width: 2px;
      stroke-dasharray: 3,3;
    }
      `]
})
export class LineGraphComponent {

    @Input()
    dataset: Array<Graph>;

    @Input()
    svgWidth: number;

    @Input()
    svgHeight: number;

    @Input()
    top: number;

    @Input()
    left: number;

    @Input()
    title: string;

    @Input()
    yLegend: string;

    diagramId: any = Math.floor(Math.random() * 1000);

    ngAfterViewInit() {
        const data = {}
        this.dataset.map(item => data[item.xaxis] = item.yaxis)
        this.getLineChart(data);
    }

    getLineChart(data: any) {
        this.drawChart(this.parseData(data));
    }

    parseData(data) {
        let arr = [];
        for (let i in data) {
            arr.push({
                date: new Date(i), //date
                value: +data[i] //convert string to number
            });
        }
        const sortedArray = arr.sort((a, b) => a.date - b.date);
        return sortedArray;
    }

    /**
 * Creates a chart using D3
 * @param {object} data Object containing historical data of BPI
 */
    drawChart(data) {
        var svgWidth = this.svgWidth, svgHeight = this.svgHeight;
        var margin = { top: this.top, right: 20, bottom: 30, left: this.left };
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;
        const id = this.diagramId;
        var svg = d3.select('#div' + id).append('svg')
            .attr("width", svgWidth)
            .attr("height", svgHeight);
        var bisectDate = d3.bisector(function (d) { return d.date; }).left;
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var line = d3.line()
            .x(function (d) { return x(d.date) })
            .y(function (d) { return y(d.value) })
        x.domain(d3.extent(data, function (d) { return d.date }));
        y.domain(d3.extent(data, function (d) { return d.value }));

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text(this.yLegend);

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", line);
        g.append('text')
            .attr('class', 'title')
            .attr('y', -10)
            .attr('x', 120)
            .text(this.title);
        /*
        var focus = g.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("line")
            .attr("class", "x-hover-line hover-line")
            .attr("y1", 0)
            .attr("y2", height);

        focus.append("line")
            .attr("class", "y-hover-line hover-line")
            .attr("x1", width)
            .attr("x2", width);

        focus.append("circle")
            .attr("r", 7.5);

        focus.append("text")
            .attr("x", 15)
            .attr("dy", ".31em");

        svg.append("rect")
            .attr("transform", "translate(" + 40 + "," +20 + ")")
            .attr("class", "overlay")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .on("mouseover", function () { focus.style("display", null); })
            .on("mouseout", function () { focus.style("display", "none"); })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisectDate(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");
            focus.select("text").text(function () { return d.value; });
            focus.select(".x-hover-line").attr("y2", height - y(d.value));
            focus.select(".y-hover-line").attr("x2", width + width);
        }*/
    }
}
//https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f