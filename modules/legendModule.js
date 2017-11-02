import * as d3 from 'd3';

export const makeLegend = (data, innerColor, outerColor) => {
	const w = 140;
	const h = 200;

	d3.select('#mapLegend').remove();

	const key = d3.select('#legendContainer').append('svg')
		.attr('id', 'mapLegend')
		.attr('width', w)
		.attr('height', h);

	const legend = key.append('defs')
		.append('svg:linearGradient')
		.attr('id', 'gradient')
		.attr('x1', '100%')
		.attr('y1', '0%')
		.attr('x2', '100%')
		.attr('y2', '100%')
		.attr('spreadMethod', 'pad');

	legend.append('stop')
		.attr('offset', '0%')
		.attr('stop-color', innerColor)
		.attr('stop-opacity', 1);

	legend.append('stop')
		.attr('offset', '100%')
		.attr('stop-color', outerColor)
		.attr('stop-opacity', 1);

	key.append('rect')
		.attr('width', w / 4)
		.attr('height', h)
		.style('fill', 'url(#gradient)')
		.attr('transform', 'translate(0,10)');

	const y = d3.scaleOrdinal()
		.range(d3.quantize(d3.interpolateNumber(0, 0.93 * h), data.length))
		.domain(data);

	const yAxis = key.append('g')
		.call(d3.axisRight(y))
		.attr('transform', 'translate(41,10)')
		.attr('class', 'customAxis');
};
