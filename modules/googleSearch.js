const L = require('leaflet');
require('./Google.js');
let GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyDZenxlhLZOrDkzXOU8NPkqHizIfMIbAZM';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
import {updateMarker} from 'modules/leaflet-map.js';

let map;
const GooglePlacesSearchBox = L.Control.extend({
	onAdd: function () {
		let div = document.createElement('input');
		div.id = 'searchBox';
		L.DomEvent.disableClickPropagation(div);
		return div;
	}
});

const initGoogle = (google) => {
	(new GooglePlacesSearchBox()).addTo(map);
	let searchBox = new google.maps.places.SearchBox(
		document.getElementById('searchBox')
	);

	searchBox.addListener('places_changed', function () {
		const places = searchBox.getPlaces();
		if (places.length === 0) {
			return;
		}
		places.map(p =>
			updateMarker(p.geometry.location.lat(), p.geometry.location.lng(), true)
		);
	});
};

export const initGoogleSearchBox = (mapReference) => {
	map = mapReference;
	GoogleMapsLoader.load(google => {
		initGoogle(google);
	});
};

// (new GooglePlacesSearchBox()).addTo(map);
