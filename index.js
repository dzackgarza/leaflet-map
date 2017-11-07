const $ = window.$;
const L = window.L = require('leaflet');
require('leaflet/dist/leaflet.css');
require('leaflet-easyprint/dist/bundle.js');
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import {makeLegend} from 'modules/legendModule';
import {providers, getGradient, clearMap} from 'modules/leaflet-providers';

import {initGoogleSearchBox} from 'modules/googleSearch.js';

let marker;
let currentLayer;
let currentPolygons;
let polygonsDrawn = false;
let needsRezoom = false;
const defaultLocation = {lat: 39.8283, lng: -98.5795, zoom: 5};
let geoJsonLayer;
let gradient;

export let map;
export let latlng;
export let lat;
export let lng;

const drawPolygon = (breaks) => {
	geoJsonLayer.clearLayers();
	const bounds = new L.LatLngBounds();
	breaks.map((eachBreak, i) => {
		eachBreak.polygons
			.map(latlngs => {
				const swaps = latlngs.map(([a, b]) => [b, a]);
				const polygon = L.polygon(swaps, {color: gradient.colors[i]});
				// .addTo(map);
				const thisFeature = polygon.toGeoJSON();
				thisFeature.properties.ring = i;
				geoJsonLayer.addData(thisFeature);
				bounds.extend(polygon.getBounds());
			});
	});

	map.fitBounds(bounds);
	polygonsDrawn = true;
};

export const updateCurrentPolygons = (polygons) => {
	currentPolygons = polygons;
};

export const updateThemeAndLegend = (theme = 'redBrown') => {
	if (!currentPolygons) {
		return;
	}
	gradient = getGradient(theme, currentPolygons.length + 1);
	clearMap(map);
	drawPolygon(currentPolygons);
	makeLegend(
		currentPolygons
			.map(a => Number(a.mile))
			.sort((a, b) => a - b),
		gradient.inner, gradient.outer);
};

export const populateControls = () => {
	$('.leaflet-layer-control').change(function () {
		console.log('Changing layers..');

		const p = providers[this.value];
		const updateLayerAndMarker = () => {
			if (currentLayer) {
				map.removeLayer(currentLayer);
			}
			currentLayer = p.layer;
			currentLayer.addTo(map);
			if (marker) {
				map.removeLayer(marker);
				map.addLayer(marker);
			}
			$('.leaflet-color-control').val(p.theme);
			$('.customAxis line').css('stroke', p.legendColor);
			$('.customAxis path').css('stroke', p.legendColor);
			$('.customAxis text').css('stroke', p.legendColor);
			updateThemeAndLegend(p.theme);
		};
		if (map.getZoom() > p.layer.options.maxZoom) {
			needsRezoom = true;
			map.setZoom(Number(p.layer.options.maxZoom));
			map.on('zoomend', () => {
				if (needsRezoom) {
					updateLayerAndMarker();
					needsRezoom = false;
				}
			});
		} else {
			updateLayerAndMarker();
		}
	});

	L.control.colorChooser({ position: 'bottomright' }).addTo(map);
	$('.leaflet-color-control').change(function () {
		updateThemeAndLegend(this.value);
	});

	L.control.colorSlider({ position: 'bottomright' }).addTo(map);
	document.getElementById('myRange').oninput = function () {
		geoJsonLayer.setStyle({ fillOpacity: this.value / 100 });
	};


	// L.easyPrint({
	// 	tileLayer: currentLayer,
	// 	sizeModes: ['A4Landscape', 'A4Portrait'],
	// 	filename: 'review',
	// 	exportOnly: false,
	// 	hideControlContainer: true,
	// 	customWindowTitle: 'Google, Leaflet, DrivetimeMaps.com'
	// }).addTo(map);
};

export const updateMarker = (latitude, longitude, autoFitBounds = false) => {
	[lat, lng, latlng] = [latitude, longitude, new L.LatLng(latitude, longitude)];
	console.log(lat, lng, latlng);
	if (marker) {
		map.removeLayer(marker);
	}
	marker = new L.Marker(latlng);
	map.addLayer(marker);
	$('#processButton').removeClass('disabled');
	if (autoFitBounds) {
		const group = new L.featureGroup([marker]);
		map.fitBounds(group.getBounds());
	}
};


export const initializeLeaflet = ({
	mapDom = '',
	populate = false,
	clickable = true,
	loadedCallback = () => {},
	initialLocation
} = {}) => {
	map = new L.Map(mapDom)
		.whenReady(() => {
			if (clickable) {
				map.on('click', pt => {
					if (!pt.originalEvent.target.classList.contains('leaflet-layer-control')) {
						updateMarker(pt.latlng.lat, pt.latlng.lng, false);
					}
				});
			}
			L.control.layerSelect({ position: 'bottomright' }).addTo(map);
			initGoogleSearchBox(map);
			currentLayer = providers.Esri_WorldStreetMap.layer;
			currentLayer.addTo(map);
			geoJsonLayer = L.geoJson(null, {
				style: (feature) => {
					const v = parseInt(document.getElementById('myRange').value, 10);
					return {
						color: '#666',
						weight: 1,
						opacity: 1,
						fillOpacity: (v || 50) / 100,
						fillColor: gradient.colors[feature.properties.ring]
					};
				}
			}).addTo(map);
			if (populate) {
				populateControls();
			}
			loadedCallback(map);
			L.control.waterMark({ position: 'bottomleft' }).addTo(map);
		});
	if (initialLocation) {
		map.setView({ lat: initialLocation.lat, lng: initialLocation.lng }, initialLocation.zoom);
		updateMarker(initialLocation.lat, initialLocation.lng, false);
	} else {
		map.locate({
			setView: true,
			maxZoom: 14
		})
			.on('locationfound', res => {
				updateMarker(res.latlng.lat, res.latlng.lng, true);
				map.setZoom(12);
			})
			.on('locationerror', () => {
				map.setView({lat: defaultLocation.lat, lng: defaultLocation.lng}, defaultLocation.zoom);
				updateMarker(defaultLocation.lat, defaultLocation.lng, false);
			});
	}
};

console.log('LEAFLET LOADER BABY');
