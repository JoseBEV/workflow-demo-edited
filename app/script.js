var bardata = [30, 50, 70];

var height = 300,
    width = 500,
    barWidth = 50,
    barOffset = 5;

// Stores current color
var tempColor;

var colors = d3.scale.linear()
// Domain is relevant to the height of the data
.domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
.range(['red', 'blue', 'yellow'])

var yScale = d3.scale.linear()

        .domain([0, d3.max(bardata)])

        .range([0, height]);

var xScale = d3.scale.ordinal()
// Lenght of the array generated automatically
        .domain(d3.range(0, bardata.length))
// How to remap them
// Controls the padding between the elements and the width
        .rangeBands([0, width])

var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'green')
        .style('opacity', 0)

// Modified the chart and placed into a variable
var myChart = d3.select('#chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect').data(bardata)
    .enter().append('rect')
        .style('fill', function(d,i) {
            return colors(i);
        })
//
        .attr('width', xScale.rangeBand())
// Passes along the data (d) and an index which 
// is the second variable which handles positions like the offset
        .attr('x', function(d,i) {
// Map it to the ordinal values
            return xScale(i);
        })
        .attr('height', 0)
        .attr('y', height)

    .on('mouseover', function(d) {

        tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d)
        // x-position in relation to the page which
            .style('left', (d3.event.pageX) + 'px')
            .style('top',  (d3.event.pageY) + 'px')


        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'grey')
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
    })

// Creates the animation effect
// Separated the transition function using the myChart variable
myChart.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d) {
        return height - yScale(d);
    })
    .delay(function(d, i) {
        return i * 30;
    })
// Easing
    .duration(3000)
    .ease('bounce')

