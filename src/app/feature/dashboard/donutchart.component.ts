import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Graph } from '../model';


@Component({
    selector: 'sms-donut-chart',
    template: '<label class="title" style="padding-left:120px">{{title}}</label><div id="div{{diagramId}}"> </div>',
    styles: [`
    .legend {
        font-size: 10px;
        font-family: sans-serif;
        rect {
          stroke-width: 2;
        }
        text {
          fill: lightcyan;
        }
      }
    `]
})
export class DonutChartComponent implements OnInit {

    @Input()
    dataset: Array<Graph>;

    @Input()
    title: string;

    diagramId: any =Math.floor(Math.random() * 1000);

    ngOnInit(): void {
        
    }
    ngAfterViewInit(){
        const data = {}
        this.dataset.map(item => data[item.yaxis] = item.xaxis)
        this.drawChart(this.parseData(data));
    }
    parseData(data) {
        let arr = [];
        for (let i in data) {
            arr.push({
                value: i, //date
                label: data[i] //convert string to number
            });
        }
        return arr;
    }
    drawChart(data) {
        var height = 400
        var width = 400
        var totalRadius = Math.min(width, height) / 2
        var donutHoleRadius = totalRadius * 0.4
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const id = this.diagramId;
        var svg = d3.select('#div'+id).append('svg').attr('width', width).attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`)

        var arc = d3.arc().innerRadius(totalRadius - donutHoleRadius).outerRadius(totalRadius)
        
        const pie = d3.pie().value(d => d.value);

        var path = svg
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(d.data.label))

        var legendItemSize = 18
        var legendSpacing = 4

        var legend = svg
            .selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => {
                var height = legendItemSize + legendSpacing
                var offset = height * color.domain().length / 2
                var x = legendItemSize * -2;
                var y = (i * height) - offset
                return `translate(${x}, ${y})`
            })

        legend
            .append('rect')
            .attr('width', legendItemSize)
            .attr('height', legendItemSize)
            .style('fill', color);

        legend
            .append('text')
            .attr('x', legendItemSize + legendSpacing)
            .attr('y', legendItemSize - legendSpacing)
            .text((d) => d)
    }
}