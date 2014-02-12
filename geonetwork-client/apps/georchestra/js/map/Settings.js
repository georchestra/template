OpenLayers.DOTS_PER_INCH = 90.71;
OpenLayers.ImgPath = '../js/OpenLayers/img/';

OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;

// Define a constant with the base url to the MapFish web service.
//mapfish.SERVER_BASE_URL = '../../../../../'; // '../../';

// Remove pink background when a tile fails to load
OpenLayers.Util.onImageLoadErrorColor = "transparent";

// Lang
OpenLayers.Lang.setCode(GeoNetwork.defaultLocale);

OpenLayers.Util.onImageLoadError = function () {
	this._attempts = (this._attempts) ? (this._attempts + 1) : 1;
	if (this._attempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS) {
		this.src = this.src;
	} else {
		this.style.backgroundColor = OpenLayers.Util.onImageLoadErrorColor;
		this.style.display = "none";
	}
};

// add Proj4js.defs here
Proj4js.defs["EPSG:900913"] = "+title=Web Spherical Mercator, +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";
Proj4js.defs["EPSG:3857"] = "+title=Web Spherical Mercator, +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs";
Proj4js.defs["EPSG:4326"] = "+title=WGS 84, +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

GeoNetwork.map.printCapabilities = "../../pdf";

//// Config for OSM based maps
GeoNetwork.map.PROJECTION = "EPSG:900913";
GeoNetwork.map.EXTENT = new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34);
GeoNetwork.map.BACKGROUND_LAYERS = [
    new OpenLayers.Layer.XYZ(
        'OSM', 
        'http://tile.openstreetmap.org/${z}/${x}/${y}.png', 
        {
            attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>",
            sphericalMercator: true,
            wrapDateLine: true,
            transitionEffect: 'resize'
        }
    )
];

//GeoNetwork.map.RESOLUTIONS = [];

// Define background map layer from an OGC Context
// * PIGMA Default background
//GeoNetwork.map.CONTEXT = "../../maps/pigma.wmc";
// * DEMIS country layer
//GeoNetwork.map.OWS = "../../maps/demis.xml";
// * Default GeoServer layers
//GeoNetwork.map.OWS = "../../maps/geoserver_localhost.xml";
//GeoNetwork.map.CONTEXT = "../../maps/geoserver_localhost.wmc";

GeoNetwork.map.CONTEXT_MAP_OPTIONS = {
    controls: [],
    theme:null
};

GeoNetwork.map.CONTEXT_MAIN_MAP_OPTIONS = {
    controls: [],
    theme:null
};

GeoNetwork.map.MAP_OPTIONS = {
 projection: GeoNetwork.map.PROJECTION,
 maxExtent: GeoNetwork.map.EXTENT,
 restrictedExtent: GeoNetwork.map.EXTENT,
 resolutions: GeoNetwork.map.RESOLUTIONS,
 controls: [],
 theme:null
};

GeoNetwork.map.MAIN_MAP_OPTIONS = {
 projection: GeoNetwork.map.PROJECTION,
 maxExtent: GeoNetwork.map.EXTENT,
 restrictedExtent: GeoNetwork.map.EXTENT,
 resolutions: GeoNetwork.map.RESOLUTIONS,
 controls: [],
 theme:null
};
