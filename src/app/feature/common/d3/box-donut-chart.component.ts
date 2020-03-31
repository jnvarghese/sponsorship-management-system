import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Graph } from '../../model';

@Component({
    selector: 'sms-box-donut-chart',
    template: `
    <div class="widget">
        <div class="header">{{title}}</div>
        <div id="chart{{diagramId}}" class="chart-container">
        </div>
    </div>
    `,
    styles: [`
    .widget {
        margin: 0 auto;
        width:350px;
        margin-top:50px;
        background-color: #fff; /*222D3A*/
        border-radius: 5px;
        box-shadow: 0px 0px 1px 0px #06060d;
    
    }
    /* #cbcfd4 */
    .header{
        background-color: #e6e6f3;   /*#29384D*/
        height:40px;
        color:#242325;  /*#929DAF*/
        text-align: center;
        line-height: 40px;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        font-weight: 400;
        font-size: 1.5em;
        text-shadow: 1px 1px #b8aada; /*#06060d*/
    }
    
    .chart-container{
        padding:25px;
    }
    
    .shadow {
        -webkit-filter: drop-shadow( 0px 3px 3px rgba(0,0,0,.5) );
        filter: drop-shadow( 0px 3px 3px rgba(0,0,0,.5) );
    }
    `]
})
export class BoxDonutChartComponent implements OnInit {

    @Input()
    dataset:any;

    @Input()
    title: string;

    diagramId: any = Math.floor(Math.random() * 1000);

    ngOnInit(): void {

    }
    ngAfterViewInit() {
        this.drawChart(this.dataset);
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
        var pie = d3.pie()
            .value(function (d) { return d.count })
            .sort(null)
            .padAngle(.03);

        var w = 300, h = 300;

        var outerRadius = w / 2;
        var innerRadius = 100;

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        var svg = d3.select(`#chart${this.diagramId}`)
            .append('svg')
            .attr('width', w).attr('height', h)
            .attr('class', 'shadow')
            .append('g')
            .attr('transform', `translate(${w / 2}, ${h / 2})`);



        var path = svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(d.data.name));

        path.transition()
            .duration(1000)
            .attrTween('d', function (d) {
                var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arc(interpolate(t));
                };
            });


        var restOfTheData = function () {
            var text = svg.selectAll('text')
                .data(pie(data))
                .enter()
                .append("text")
                .transition()
                .duration(200)
                .attr('transform', (d, i) => {
                    return 'translate(' + arc.centroid(d) + ')';
                })
                .attr("dy", ".4em")
                .attr("text-anchor", "middle")
                .text((d) => d.data.count)
                .style('fill', '#fff')
                .style('font-size', '10px');

            var legendRectSize = 20;
            var legendSpacing = 7;
            var legendHeight = legendRectSize + legendSpacing;


            var legend = svg.selectAll('.legend')
                .data(color.domain())
                .enter()
                .append('g')
                .attr('class', 'legend')
                .attr('transform', (d, i) => {
                    return 'translate(-35,' + ((i * legendHeight) - 65) + ')';
                });

            legend
                .append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .attr('rx', 20)
                .attr('ry', 20)
                .style('fill', color)
                .style('stroke', color);

            legend
                .append('text')
                .attr('x', 30)
                .attr('y', 15)
                .text((d) => d)
                .style('fill', '#000000')
                .style('font-size', '14px');
        };
        //929DAF
        setTimeout(restOfTheData, 1000);

    }
}