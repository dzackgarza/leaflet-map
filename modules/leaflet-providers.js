const L = window.L = require('leaflet');
const d3 = window.d3 = require('d3');
require('leaflet-providers');
require('d3-interpolate');
import 'css/leaflet-control-styles.css';

const colors = {
	redBrown: {
		outer: '#fc9272',
		inner: '#67000d'
	},
	greens: {
		outer: '#a1d99b',
		inner: '#006d2c'
	},
	orangeRed: {
		outer: '#feb24c',
		inner: '#bd0026'
	},
	purples: {
		outer: '#fa9fb5',
		inner: '#7a0177'
	},
	blues: {
		outer: '#a6bddb',
		inner: '#045a8d'
	}
};

export const getGradient = function (theme, num) {
	return {
		name: theme,
		colors: d3.quantize(d3.interpolateRgb(colors[theme].outer, colors[theme].inner), num),
		inner: colors[theme].inner,
		outer: colors[theme].outer
	};
};

const thunderForestToken = '31a9454ad1db425cbbbb7d56497f17e2';

export const providers = {

	Esri_WorldStreetMap: {
		name: 'Streets',
		layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
		}),
		theme: 'redBrown',
		legendColor: 'blues'
	},

	OpenStreetMap_Mapnik: {
		name: 'Mapnik',
		layer: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}),
		theme: 'orangeRed',
		legendColor: 'black'
	},

	OpenStreetMap_BlackAndWhite: {
		name: 'Black and White',
		layer: L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}),
		theme: 'redBrown',
		legendColor: 'black'
	},

	OpenTopoMap: {
		name: 'Topographic',
		layer: L.tileLayer('http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
			maxZoom: 17,
			attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
		}),
		theme: 'redBrown',
		legendColor: 'greens'
	},

	Thunderforest_SpinalMap: {
		name: 'Flames',
		layer: L.tileLayer('http://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}', {
			attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			apikey: thunderForestToken,
			maxZoom: 22
		}),
		theme: 'blues',
		legendColor: 'black'
	},

	Thunderforest_TransportDark: {
		name: 'Transportation',
		layer: L.tileLayer('http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
			attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			apikey: thunderForestToken,
			maxZoom: 22
		}),
		theme: 'redBrown',
		legendColor: 'orangeRed'
	},

	Stamen_Toner: {
		name: 'Toner',
		layer: L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			subdomains: 'abcd',
			minZoom: 0,
			maxZoom: 20,
			ext: 'png'
		}),
		theme: 'orangeRed',
		legendColor: 'black'
	},

	Stamen_Watercolor: {
		name: 'Watercolors',
		layer: L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
			attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			subdomains: 'abcd',
			minZoom: 1,
			maxZoom: 16,
			ext: 'png'
		}),
		theme: 'blues',
		legendColor: 'black'
	},

	Esri_WorldImagery: {
		name: 'Satellite',
		layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		}),
		theme: 'orangeRed',
		legendColor: 'black'
	},

	Esri_WorldShadedRelief: {
		name: 'Shaded Relief',
		layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
			maxZoom: 13
		}),
		theme: 'purples',
		legendColor: 'black'
	},

	Esri_NatGeoWorldMap: {
		name: 'Nat. Geo.',
		layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
			maxZoom: 16
		}),
		theme: 'redBrown',
		legendColor: 'black'
	},

	Esri_WorldGrayCanvas: {
		name: 'Gray Canvas',
		layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
			maxZoom: 16
		}),
		theme: 'redBrown',
		legendColor: 'black'
	},

	CartoDB_DarkMatter: {
		name: 'Dark',
		layer: L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
			subdomains: 'abcd',
			maxZoom: 19
		}),
		theme: 'blues',
		legendColor: 'white'
	}

};


const LayerSelect = L.Control.extend({
	onAdd: function () {
		let div = L.DomUtil.create('div', '');
		let basemaps = L.DomUtil.create('select', 'form-control leaflet-layer-control', div);
		for (let [key, entry] of Object.entries(providers)) {
			let sel = L.DomUtil.create('option', '', basemaps);
			sel.value = key;
			sel.text = entry.name;
		}
		div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
		return div;
	},

	onRemove: function () {}
});

L.control.layerSelect = function (opts) {
	return new LayerSelect(opts);
};

const ColorChooser = L.Control.extend({
	onAdd: function () {
		let div = L.DomUtil.create('div', '');
		let colorList = L.DomUtil.create('select', 'form-control leaflet-color-control', div);
		for (let c in colors) {
			let sel = L.DomUtil.create('option', '', colorList);
			sel.value = c;
			sel.text = c;
		}
		div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
		L.DomEvent.disableClickPropagation(div);
		L.DomEvent.disableClickPropagation(colorList);
		return div;
	},

	onRemove: function () {}
});

L.control.colorChooser = function (opts) {
	return new ColorChooser(opts);
};

const ColorSlider = L.Control.extend({
	onAdd: function () {
		let div = L.DomUtil.create('div');
		div.id = 'slide-container';
		div.innerHTML = '<input type="range" min="1" max="100" value="50" class="slider" id="myRange">';
		div.onmousedown = div.ondblclick = L.DomEvent.stopPropagation;
		L.DomEvent.disableClickPropagation(div);
		return div;
	},

	onRemove: function () {}
});

L.control.colorSlider = function (opts) {
	const s = new ColorSlider(opts);
	return s;
};

export const clearMap = (m) => {
	for (let i in m._layers) {
		if (m._layers[i]._path) {
			try {
				m.removeLayer(m._layers[i]);
			} catch (e) {
				console.log('problem with ' + e + m._layers[i]);
			}
		}
	}
};

const WaterMark = L.Control.extend({
	onAdd: function () {
		this.container = L.DomUtil.create('div');
		this.container.id = 'container';
		this.container.innerHTML = '<img src="images/logo-transparent.png" style="height: 2vh; margin-bottom: 2vh;"/>';
		return this.container;
	},

	onRemove: function () {}
});

L.control.waterMark = function (opts) {
	return new WaterMark(opts);
};

const DemographySummary = L.Control.extend({
	onAdd: function () {
		const container = L.DomUtil.create('div');
		container.id = 'app';
		L.DomUtil.addClass(container, 'leaflet-demography-container');
		container.innerHTML = `
<table class='table table-hover table-condensed table-bordered' v-cloak>
	<thead>
		<tr>
			<th>Drivetime</th>
			<th>MedAge</th>
			<th>MedInc</th>
			<th>TotPop</th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="ring in rings">
			<td>{{ ring.driveTime }}</td>
			<td>{{ ring.medianAge }}</td>
			<td>{{ ring.medianIncome }}</td>
			<td>{{ ring.totalPopulation }}</td>
		</tr>
	</tbody>
</table>
	`;
		return container;
	},

	onRemove: function () {}
});

L.control.demographySummary = function (opts) {
	let n = new DemographySummary(opts);
	return n;
};
