/**
 * Sample geOrchestra extractor config file
 *
 * Instructions: copy this buffer into GEOR_custom.js,	
 * uncomment lines you wish to modify and 
 * modify the corresponding values to suit your needs.
 */
	
Ext.namespace("GEOR");

	
GEOR.custom = {
    
    /**
     * Constant: HEADER_HEIGHT
     * Integer value representing the header height, as set in the shared maven filters
     * Defaults to 90
     */
    HEADER_HEIGHT: @shared.header.height@,

    /**
     * Constant: DOWNLOAD_FORM
     * Boolean: should the app display a form requesting user data and data usage ?
     * Defaults to true (see shared.download_form.activated var in shared.maven.filters file)
     */
    DOWNLOAD_FORM: @shared.download_form.activated@,
    
    /**
     * Constant: PDF_URL
     * String: the URL to the downloaded data Terms Of Use
     * Defaults to /header/cgu.pdf (see shared.download_form.pdf_url var in shared.maven.filters file)
     */
    PDF_URL: "@shared.download_form.pdfurl@",
    
    /***** Beginning of config options which can be set in this file *****/

    /**
     * Constant: SUPPORTED_RASTER_FORMATS
     * List of supported raster formats.
     * Defaults to GeoTiff & Tiff
     *
    SUPPORTED_RASTER_FORMATS: [
        ["geotiff", "GeoTiff"],
        ["tiff", "Tif + TFW"]
    ],*/

    /**
     * Constant: SUPPORTED_VECTOR_FORMATS
     * List of supported vector formats.
     * Defaults to SHP, MIF/MID, TAB, KML
     *
    SUPPORTED_VECTOR_FORMATS: [
        ["shp", "Shapefile"],
        ["mif", "Mif/Mid"],
        ["tab", "TAB"],
        ["kml", "KML"]
    ],*/
    
    /**
     * Constant: GEOSERVER_WMS_URL
     * The URL to GeoServer WMS.
     */
    GEOSERVER_WMS_URL: "http://sdi.georchestra.org/geoserver/gshhs/wms",

    /**
     * Constant: GEOSERVER_WFS_URL
     * The URL to GeoServer WFS.
     */
    //GEOSERVER_WFS_URL: "/geoserver/wfs",

    /**
     * Constant: MAX_FEATURES
     * The maximum number of vector features displayed.
     */
    //MAX_FEATURES: 500,
    
    /**
     * Constant: MAX_LENGTH
     * The maximum number of chars in a XML response 
     * before triggering an alert.
     */
    //MAX_LENGTH: 500000,

    /**
     * Constant: MAP_DOTS_PER_INCH
     * {Float} Sets the resolution used for scale computation.
     * Defaults to GeoServer defaults, which is 25.4 / 0.28
     */
    //MAP_DOTS_PER_INCH: 25.4 / 0.28,

    /**
     * Constant: GLOBAL_EPSG
     * SRS of the map used to select the global extraction parameters
     */
    //GLOBAL_EPSG: "EPSG:4326",

    /**
     * Constant: MAP_XMIN aka "left"
     * {Float} The max extent xmin in GLOBAL_EPSG coordinates.
     * Defaults to -180
     */
    //MAP_XMIN: -180,

    /**
     * Constant: MAP_YMIN aka "bottom"
     * {Float} The max extent ymin in GLOBAL_EPSG coordinates.
     * Defaults to -90
     */
    //MAP_YMIN: -90,

    /**
     * Constant: MAP_XMAX aka "right"
     * {Float} The max extent xmax in GLOBAL_EPSG coordinates.
     * Defaults to 180
     */
    //MAP_XMAX: 180,

    /**
     * Constant: MAP_YSMAX aka "top"
     * {Float} The max extent ymax in GLOBAL_EPSG coordinates
     * Defaults to 90
     */
    //MAP_YMAX: 90,
    
    /**
     * Constant: BASE_LAYER_NAME
     * The WMS base layer which will be displayed under each extracted layer.
     * Defaults to "geor:countries"
     */
    BASE_LAYER_NAME: "GSHHS_l_L1",
        
    /**
     * Constant: NS_LOC
     * {String} The referentials layers' namespace alias as defined in
     *    the GeoServer configuration.
     * Defaults to "geor_loc"
     */
    //NS_LOC: "geor_loc",

    /**
     * Constant: DEFAULT_WCS_EXTRACTION_WIDTH
     * Default width of the extracted image from WCS. This constant
     * is to be used to calculate the default resolution of WCS.
     * Defaults to 1024
     *
     * FIXME: not sure it is really useful.
     *
     */
    //DEFAULT_WCS_EXTRACTION_WIDTH: 1024,

    /**
     * Constant: SUPPORTED_REPROJECTIONS
     * List of projections that extractor supports for reprojection
     */
    /*SUPPORTED_REPROJECTIONS: [
        ["EPSG:27562", "EPSG:27562 - Lambert II carto"], 
        ["EPSG:27572", "EPSG:27572 - Lambert II étendu"],
        ["EPSG:2154", "EPSG:2154 - Lambert 93"],
        ["EPSG:3948", "EPSG:3948 - Lambert-93 CC48"],
        ["EPSG:4171", "EPSG:4171 - RGF93"],
        ["EPSG:4326", "EPSG:4326 - WGS84"]
    ],*/

    /**
     * Constant: METRIC_MAP_SCALES
     * {Array} The map scales for the case where the SRS is metric.
     * Defaults to null, which means scales will be automatically computed
     *
    METRIC_MAP_SCALES: [
        266.590664750604,
        533.181329502208,
        1066.362659004416,
        2132.725318008832,
        4265.450636017664,
        8530.90127203433,
        17061.80254406866,
        34123.60508813732,
        68247.21017627465,
        136494.4203525493,
        272988.8407050995,
        545977.681410199,
        1091955.3628203971,
        2183910.7256407943,
        4367821.451281589,
        8735642.902563179,
        17471285.805126358,
        34942571.610252716,
        69885143.22050543,
        139770286.44101086,
        279540572.8820217,
        559081145.7640435
    ],*/

    /**
     * Constant: GEOGRAPHIC_MAP_SCALES
     * {Array} The map scales for the case where the SRS is based on angles.
     * Defaults to null, which means scales will be automatically computed
     */
    //GEOGRAPHIC_MAP_SCALES: null,
        
    /**
     * Constant: MAP_POS_SRS1
     * {String} The cursor position will be displayed using this SRS.
     * Defaults to "EPSG:2154"
     */
    //MAP_POS_SRS1: "EPSG:2154",
    
    /**
     * Constant: MAP_POS_SRS2
     * {String} The cursor position will be displayed using this SRS.
     * Defaults to ""
     */
    //MAP_POS_SRS2: "",

    /**
     * Constant: EXTRACT_BTN_DISABLE_TIME
     * Duration in seconds for the extract button being disabled after an extraction
     * Defaults to 30
     */
    //EXTRACT_BTN_DISABLE_TIME: 30,

    /**
     * Constant: LAYERS_CHECKED
     * Layers checked by default or not ?
     * Defaults to true
     */
    //LAYERS_CHECKED: true,
    
    /**
     * Constant: BUFFER_VALUES
     * {Array} Array of buffer values with their display name
     */
    /*BUFFER_VALUES: [
        [0, "None"],
        [10, "BUFFER meters"],
        [50, "BUFFER meters"],
        [100, "BUFFER meters"],
        [500, "BUFFER meters"],
        [1000, "BUFFER kilometer"],
        [5000, "BUFFER kilometers"],
        [10000, "BUFFER kilometers"]
    ],*/
    
    /**
     * Constant: DEFAULT_BUFFER_VALUE
     * Default buffer value in meters.
     * Valid values are those from BUFFER_VALUES
     * Defaults to 0
     */
    //DEFAULT_BUFFER_VALUE: 0,
        
    /**
     * Constant: STARTUP_LAYERS
     * {Array} OGC layers loaded at startup if none are sent
     */
    STARTUP_LAYERS: [
        {
            owstype: "WMS",
            owsurl: "http://sdi.georchestra.org/geoserver/wms",
            layername: "gshhs:GSHHS_l_L2"
        }
    ],
    
    /**
     * Constant: STARTUP_SERVICES
     * {Array} OGC services loaded at startup if none are sent
     */
    STARTUP_SERVICES: [
        {
            text: "Example layers",
            owstype: "WMS",
            owsurl: "http://sdi.georchestra.org/geoserver/wms"
        }
    ],

    /**
     * Constant: SPLASH_SCREEN
     * {String} The message to display on extractorapp startup
     * Defaults to null, which means no message will be displayed
     *
    SPLASH_SCREEN: [
        "Afin d'utiliser au mieux la fonctionnalité d'extraction en ligne, nous vous ",
        "invitons à respecter les conseils suivants : ",
        "<br/><br/>",
        "Pour les données <b>image</b> : ",
        "La taille maximale pour une extraction de l'orthophotographie est d'environ 50 Km². ",
        "Au-delà, l'extraction risque de ne pas aboutir. ",
        "<br/>",
        "Le format ECW est limité à des fichiers de 500 Mo maximum. ",
        "Privilégiez plutôt les formats JPEG 2000 ou TIF. ",
        "<br/><br/>",
        "Pour les données <b>vecteur</b> : ",
        "Les couches comportant un trop grand nombre d'objets (~ million) ",
        "ne pourront pas être extraites. ",
        "<br/><br/>",
        "Si vous ne parvenez pas à extraire une couche à l'aide de l'extracteur en ",
        "ligne, <a href=\"mailto:psc@georchestra.org\">prenez contact</a> avec l'administrateur."].join(""),
    */

    /**
     * Constant: HELP_URL
     * {String} URL of the help ressource.
     * Defaults to "/doc/html/documentation.html#extractor"
     */
    //HELP_URL: "/doc/html/documentation.html#extractor"
    
    // No trailing comma for the last line (or IE will complain)
};
