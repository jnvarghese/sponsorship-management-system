import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Graph } from '../model';

@Component({
  selector: 'sms-barline-chart',
  template: '<div id="div22"></div>',
  styles: ['']
})
export class BarLineChartComponent implements OnInit {

  @Input()
  dataset: Array<Graph>;

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }


  diagramId: any = Math.floor(Math.random() * 1000);

  ngAfterViewInit() {
    let data = []
    data = this.dataset.reduce((initiatives, item) => {
      if(+item.yaxis > 30000)
      initiatives.push([item.xaxis, +item.xaxis2, +item.yaxis])
      return initiatives
    }, []);

    this.getLineChart(data);
  }

  getLineChart(data: any) {
    this.drawChart(data);
  }

 

  /**
* Creates a chart using D3
* @param {object} data Object containing historical data of BPI
*/
  drawChart(dataset) {
    console.log(' dataset' , dataset);
    
    var dataset2 = [
      ['札幌', 703, 1902],
      ['清水', 1473, 3341]
    ]; 
    console.log(' dataset2' , dataset2);
    
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
      .domain(dataset.map(function (d) {
        return d[0];
      }));
    var yScale = d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(dataset, (function (d) {
        return d[2];
      }))]);

   
    console.log(d3.select("div22"));
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // axis-x
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

    // axis-y
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale));

    var bar = g.selectAll("rect")
      .data(dataset)
      .enter().append("g");

    // bar chart
    bar.append("rect")
      .attr("x", function (d) { return xScale(d[0]); })
      .attr("y", function (d) { return yScale(d[2]); })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) { return height - yScale(d[2]); })
      .attr("class", function (d) {
        var s = "bar ";
        if (d[1] < 400) {
          return s + "bar1";
        } else if (d[1] < 800) {
          return s + "bar2";
        } else {
          return s + "bar3";
        }
      });

    // labels on the bar chart
    bar.append("text")
      .attr("dy", "1.3em")
      .attr("x", function (d) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .attr("y", function (d) { return yScale(d[2]); })
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("fill", "black")
      .text(function (d) {
        return d[2];
      });

    // line chart
    var line = d3.line()
      .x(function (d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .y(function (d) { return yScale(d[1]); })
      .curve(d3.curveMonotoneX);

    bar.append("path")
      .attr("class", "line") // Assign a class for styling
      .attr("d", line(dataset)); // 11. Calls the line generator

    bar.append("circle") // Uses the enter().append() method
      .attr("class", "dot") // Assign a class for styling
      .attr("cx", function (d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
      .attr("cy", function (d) { return yScale(d[1]); })
      .attr("r", 5);
  }
}
//https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f