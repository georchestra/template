/**
 * Sample geOrchestra viewer config file
 *
 * Instructions: copy this buffer into GEOR_custom.js,
 * uncomment lines you wish to modify and 
 * modify the corresponding values to suit your needs.
 */

Ext.namespace("GEOR");

GEOR.custom = {
    /**
     * Constant: CONTEXTS
     * {Array} the array of arrays describing the available contexts
     *
     * Each "context array" consists of 4 mandatory fields:
     *   * the first field is the label which appears in the UI
     *   * the second one is the path to the thumbnail
     *   * the third one is the path to the context (WMC) file
     *   * the last one is a comment which will be shown on thumbnail hovering
     *
     * Example config : 
     *   [
     *      ["OpenStreetMap", "app/img/contexts/osm.png", "default.wmc", "A unique OSM layer"],
     *      ["Orthophoto", "app/img/contexts/ortho.png", "contexts/ortho.wmc", "Orthophoto 2009"],
     *      ["Forêts", "app/img/contexts/forets.png", "contexts/forets.wmc", "Les 3 couches forêts sur fond OSM"]
     *   ]
     *
     * Defaults to ["OpenStreetMap", "app/img/contexts/osm.png", "default.wmc", "A unique OSM layer"]
     * Should *not* be empty !
     *
    CONTEXTS: [
        ["OpenStreetMap", "app/img/contexts/osm.png", "default.wmc", "A unique OSM layer"]
    ],*/

    /**
     * Constant: ADDONS
     * An array of addons config objects.
     * Defaults to []
     * 
     * An "addon config object" is an object with the following properties:
     *  id - {String} required identifier, which *MUST* :
     *        * be stable across deployments in order to let your users recover their tools
     *        * be unique in the ADDONS array
     *  name - {String} required addon name, which, once lowercased, gives the addon folder name
     *  title - {Object} a required hash storing addon titles by lang key
     *  description - {Object} a required hash storing addon descriptions by lang key
     *  roles - {Array} optional array of roles allowed to use this addon - defaults to [], which means everyone is allowed to.
     *          eg: ["ROLE_SV_ADMIN"] will allow the current addon for admin users only
     *  group - {String} an optional group for mutual exclusion between activated tools - default group is "tools"
     *  options - {Object} an optional config object which overrides the package default_options (in manifest.json)
     *  thumbnail - {String} an optional thumbnail path, relative to app/addons/{addon_name.toLowerCase()}/ (defaults to img/icon.png)
     *  
     */
    ADDONS: [{
        "id": "magnifier_zoom", // unique & stable string identifier for this addon instance
        "name": "Magnifier",
        "title": {
            "en": "Aerial imagery magnifier",
            "es": "Lupa ortofoto",
            "fr": "Loupe orthophoto"
        },
        "description": {
            "en": "A tool which allows to zoom in an aerial image on a map portion",
            "es": "Una herramienta que te permite hacer un zoom sobre una parte del mapa ortofoto",
            "fr": "Un outil qui permet de zoomer dans une orthophoto sur une portion de la carte"
        }
    }],
    
    /**
     * Constant: GEOSERVER_WFS_URL
     * The URL to GeoServer WFS.
     * This is required if and only if the edit application is used
     * or if the "referentials" module is activated.
     * Defaults to /geoserver/wfs
     */
    GEOSERVER_WFS_URL: "http://geobretagne.fr/geoserver/wfs",

    /**
     * Constant: GEOSERVER_WMS_URL
     * The URL to the GeoServer WMS. 
     * This is required if and only if OSM_AS_OVMAP is set to false.
     * Defaults to /geoserver/wms
     */
    //GEOSERVER_WMS_URL: "/geoserver/wms",

    /**
     * Constant: GEONETWORK_URL
     * The URL to the GeoNetwork server.
     * Defaults to "/geonetwork/srv/fre"
     */
    GEONETWORK_URL: "http://geobretagne.fr/geonetwork/srv/fre",

    /**
     * Constant: CSW_GETDOMAIN_SORTING
     * true to case insensitive sort (client side) the keywords 
     * got from a CSW getDomain request. false to disable 
     * client side sorting 
     * (which is preferable in case of too many keywords).
     * Defaults to false
     */
    //CSW_GETDOMAIN_SORTING: false,

    /**
     * Constant: THESAURUS_NAME
     * Thesaurus name to display for the CSW GetDomain request.
     * Defaults to 'mots clés'
     */
    //THESAURUS_NAME: 'mots clés',

    /**
     * Constant: CATALOGS
     * List of catalogs for freetext search
     *
    CATALOGS: [
        ['http://geobretagne.fr/geonetwork/srv/fre/csw', 'le catalogue GeoBretagne'],
        ['http://ids.pigma.org/geonetwork/srv/fre/csw', 'le catalogue PIGMA'],
        ['http://sandre.eaufrance.fr/geonetwork_CSW/srv/fre/csw', 'le catalogue du Sandre'],
        ['http://geocatalog.webservice-energy.org/geonetwork/srv/fre/csw', 'le catalogue de webservice-energy']
    ],

    /**
     * Constant: DEFAULT_CSW_URL
     * CSW URL which should be used by default for freetext search
     * Note: must be one of the URLs in the above CATALOGS config option
     */
    //DEFAULT_CSW_URL: 'http://geobretagne.fr/geonetwork/srv/fre/csw',

    /**
     * Constant: MAX_CSW_RECORDS
     * The maximum number of CSW records queried for catalog search
     * Note: if you set this to a low value, you run the risk of not having
     * enough results (even 0). On the contrary, setting a very high value
     * might result in browser hanging (too much XML data to parse).
     * Defaults to 20.
     */
    //MAX_CSW_RECORDS: 20,

    /**
     * Constant: NO_THUMBNAIL_IMAGE_URL
     * URL to a thumbnail image shown when none is provided by the CSW service
     * Defaults to the provided one ('app/img/nopreview.png')
     */
    //NO_THUMBNAIL_IMAGE_URL: 'app/img/nopreview.png',

    /**
     * Constant: DEFAULT_THESAURUS_KEY
     * Key (as the one in the response from /geonetwork/srv/fre/xml.thesaurus.getList) 
     * of the thesaurus to use as the default (selected) one.
     */
    //DEFAULT_THESAURUS_KEY: 'external.theme.inspire-theme',

    /**
     * Constant: MAX_FEATURES
     * The maximum number of vector features displayed.
     * Defaults to a value estimated by an empirical formula
     */
    MAX_FEATURES: 500,
    
    /**
     * Constant: MAX_LENGTH
     * The maximum number of chars in a XML response 
     * before triggering an alert.
     * Defaults to a value estimated by an empirical formula
     */
    MAX_LENGTH: 500000,

    /**
     * Constant: OSM_AS_OVMAP
     * Boolean: if true, use OSM mapnik as overview map baselayer 
     * instead of GEOR.config.OVMAP_LAYER_NAME.
     * Defaults to true
     */
    //OSM_AS_OVMAP: true,
    
    /**
     * Constant: OVMAP_LAYER_NAME
     * The name of the base layer which will be displayed in the overview map.
     * This is required if and only if OSM_AS_OVMAP is set to false.
     * This layer must be served by the server GEOSERVER_WMS_URL as image/png
     * Defaults to "geor_loc:DEPARTEMENTS"
     */
    //OVMAP_LAYER_NAME: "geor_loc:DEPARTEMENTS",
    
    /**
     * Constant: WMSC2WMS
     * Hash allowing correspondance between WMS-C server URLs and WMS server URLs for print
     * This assumes that layers share the same name on both servers
     * Eventually, Administrator can setup a mirror WMS server configured to consume WMS-C and serve them as WMS ...
     *
     * Example usage:
     *
     * "wmsc_url": "wms_url",
     *
     * For a WMSC with no WMS counterpart,
     * referencing the wmsc_url here allows the user 
     * to be warned that this layer will not be printed:
     *
     * "wmsc_url": undefined,
     */
    //WMSC2WMS: {},

    /**
     * Constant: MAP_DOTS_PER_INCH
     * {Float} Sets the resolution used for scale computation.
     * Defaults to GeoServer defaults, which is 25.4 / 0.28
     */
    //MAP_DOTS_PER_INCH: 25.4 / 0.28,
    
    /**
     * Constant: RECENTER_ON_ADDRESSES
     * {Boolean} whether to display the recenter on addresses tab.
     * Defaults to false
     */
    //RECENTER_ON_ADDRESSES: false,
    
    /**
     * Constant: ADDRESS_URL
     * {String} The URL to the OpenAddresses web service.
     * Defaults to "/addrapp/addresses"
     */
    //ADDRESS_URL: "/addrapp/addresses",

    /**
     * Constant: DEACCENTUATE_REFERENTIALS_QUERYSTRING
     * {Boolean} Whether to deaccentuate the referentials widget query string
     * Defaults to true
     */
    //DEACCENTUATE_REFERENTIALS_QUERYSTRING: true,

    /**
     * Constant: NS_LOC
     * {String} The referentials layers' namespace alias as defined in
     *    the GeoServer configuration.
     * Defaults to "geor_loc"
     */
    //NS_LOC: "geor_loc",
    
    /**
     * Constant: NS_EDIT
     * {String} The editing layers' namespace alias as defined in
     *    the GeoServer configuration.
     * Defaults to "geor_edit"
     */
    //NS_EDIT: "geor_edit",

    /**
     * Constant: CSW_GETDOMAIN_PROPERTY
     * {String} the property used to query the CSW for keywords.
     * Defaults to "subject"
     */
    //CSW_GETDOMAIN_PROPERTY: "subject",

    /**
     * Constant: MAP_SCALES
     * {Array} The map's scales.
     * Defaults to GeoBretagne GWC compliant scales
     */
    /*MAP_SCALES : [
        266.591197934,
        533.182395867,
        1066.364791734,
        2132.729583468,
        4265.459166936,
        8530.918333871,
        17061.836667742,
        34123.673335484,
        68247.346670968,
        136494.693341936,
        272989.386683873,
        545978.773367746,
        1091957.546735491,
        2183915.093470982,
        4367830.186941965,
        8735660.373883929
    ],*/

    /**
     * Constant: MAP_SRS
     * {String} The default map SRS code.
     * Defaults to EPSG:2154
     */
    //MAP_SRS: "EPSG:2154",

    /**
     * Constant: MAP_XMIN aka "left"
     * {Float} The max extent xmin in MAP_SRS coordinates.
     * Defaults to -357823.2365 (EPSG:2154 left)
     */
    //MAP_XMIN: -357823.2365,

    /**
     * Constant: MAP_YMIN aka "bottom"
     * {Float} The max extent ymin in MAP_SRS coordinates.
     * Defaults to 6037008.6939 (EPSG:2154 bottom)
     */
    //MAP_YMIN: 6037008.6939,

    /**
     * Constant: MAP_XMAX aka "right"
     * {Float} The max extent xmax in MAP_SRS coordinates.
     * Defaults to 1313632.3628 (EPSG:2154 right)
     */
    //MAP_XMAX: 1313632.3628,

    /**
     * Constant: MAP_YSMAX aka "top"
     * {Float} The max extent ymax in MAP_SRS coordinates
     * Defaults to 7230727.3772 (EPSG:2154 top)
     */
    //MAP_YMAX: 7230727.3772,

    /**
     * Constant: POINTER_POSITION_SRS_LIST
     * {Array} The cursor position will be displayed using these SRS.
     * Defaults to [["EPSG:4326", "WGS 84"],["EPSG:2154", "Lambert 93"]]
     * Note: be sure to have all these projections defined in PROJ4JS_STRINGS
     *
    POINTER_POSITION_SRS_LIST: [
        ["EPSG:4326", "WGS 84"],
        ["EPSG:2154", "Lambert 93"]
    ],*/

    /**
     * Constant: PROJ4JS_STRINGS
     * {Object} The list of supported SRS with their definitions.
     * Defaults to "EPSG:4326", "EPSG:2154" & "EPSG:900913" being defined
     * Note that "EPSG:900913" is required if OSM_AS_OVMAP is set to true
     *
    PROJ4JS_STRINGS: {
        "EPSG:4326": "+title=WGS 84, +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
        "EPSG:2154": "+title=RGF-93/Lambert 93, +proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",
        "EPSG:900913": "+title=Web Spherical Mercator, +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"
    },*/

    /**
     * Constant: TILE_SINGLE
     * {Boolean} When false, activates WMS tiled requests.
     * Defaults to false
     */
    //TILE_SINGLE: false,
    
    /**
     * Constant: TILE_WIDTH
     * {Integer} Width of the WMS tiles in pixels.
     * Defaults to 512
     */
    //TILE_WIDTH: 512,
    
    /**
     * Constant: TILE_HEIGHT
     * {Integer} Height of the WMS tiles in pixels.
     * Defaults to 512
     */
    //TILE_HEIGHT: 512,

    /**
     * Constant: GEONAMES_FILTERS
     * {Object} Describes the geonames search options for the searchJSON web service.
     * (documentation here: http://www.geonames.org/export/geonames-search.html)
     *
     * Defaults to France/populated places
     *
     * Note that it is possible to restrict search to an admin area
     * by specifying either an adminCode1 or adminCode2 or adminCode3
     * See http://download.geonames.org/export/dump/admin1CodesASCII.txt for adminCode1
     * Aquitaine matches '97' while Bretagne (Brittany) matches 'A2'
     *
    GEONAMES_FILTERS: {
        country: 'FR',         // France
        //adminCode1: '97',
        style: 'short',        // verbosity of results
        lang: 'fr',
        featureClass: 'P',     // class category: populated places
        maxRows: 20            // maximal number of results
    },*/

    /**
     * Constant: GEONAMES_ZOOMLEVEL
     * {Integer} The number of zoom levels from maximum zoom level
     *           to zoom to, when using GeoNames recentering
     * Should always be >= 1.
     * Defaults to 5
     */
    //GEONAMES_ZOOMLEVEL: 5,
    
    /**
     * Constant: ANIMATE_WINDOWS
     * {Boolean} Display animations on windows opening/closing
     * Defaults to true
     */
    //ANIMATE_WINDOWS: true,

    /**
     * Constant: DISPLAY_VISIBILITY_RANGE
     * {Boolean} Display the layer visibility range in layer tree
     * Defaults to true
     */
    //DISPLAY_VISIBILITY_RANGE: true,

    /**
     * Constant: ROLES_FOR_STYLER
     * {Array} roles required for the styler to show up
     * Empty array means the module is available for everyone
     * ROLE_SV_USER means the user needs to be connected.
     * Defaults to ['ROLE_SV_USER', 'ROLE_SV_REVIEWER', 'ROLE_SV_EDITOR', 'ROLE_SV_ADMIN']
     */
    ROLES_FOR_STYLER: [],
    
    /**
     * Constant: ROLES_FOR_QUERIER
     * {Array} roles required for the querier to show up
     * Empty array means the module is available for everyone
     * ROLE_SV_USER means the user needs to be connected.
     * Defaults to []
     */
    //ROLES_FOR_QUERIER: [],
    
    /**
     * Constant: ROLES_FOR_PRINTER
     * {Array} roles required to be able to print
     * Empty array means printing is available for everyone
     * ROLE_SV_USER means the user needs to be connected.
     * Defaults to []
     */
    //ROLES_FOR_PRINTER: [],

    /**
     * Constant: PRINT_LAYOUTS_ACL
     * {Object} roles required for each print layout
     * Empty array means "layout is available for everyone"
     *
    PRINT_LAYOUTS_ACL: {
        // A4 allowed for everyone:
        'A4 paysage': [],
        'A4 portrait': [],
        // A3 not allowed for unconnected users (guests):
        'A3 paysage': ['ROLE_SV_USER', 'ROLE_SV_REVIEWER', 'ROLE_SV_EDITOR', 'ROLE_SV_ADMIN'],
        'A3 portrait': ['ROLE_SV_USER', 'ROLE_SV_REVIEWER', 'ROLE_SV_EDITOR', 'ROLE_SV_ADMIN']
    },*/

    /**
     * Constant: DEFAULT_PRINT_LAYOUT
     * {String} The default (ie selected) print layout.
     * Defaults to "A4 paysage".
     * Note: be sure to choose a layout available for everyone
     */
    //DEFAULT_PRINT_LAYOUT: "A4 paysage",

    /**
     * Constant: DEFAULT_PRINT_RESOLUTION
     * {String} The default (ie selected) print resolution.
     * Defaults to "127"
     */
    //DEFAULT_PRINT_RESOLUTION: "127",

    /**
     * Constant: PDF_FILENAME
     * {String} The PDF filename prefix.
     * Defaults to "georchestra_${yyyy-MM-dd_hhmmss}"
     */
    //PDF_FILENAME: "georchestra_${yyyy-MM-dd_hhmmss}",

    /**
     * Constant: HELP_URL
     * {String} URL of the help ressource.
     * Defaults to "http://www.geobretagne.fr/web/guest/assistance"
     */
    //HELP_URL: "http://www.geobretagne.fr/web/guest/assistance",

    /**
     * Constant: DISPLAY_SELECTED_OWS_URL
     * {Boolean} - If set to false, do not display the selected WMS/WFS server URL
     * in the second field from the "Add layers" popup window.
     * (pretty much useless, I know...)
     * Defaults to true.
     */
    //DISPLAY_SELECTED_OWS_URL: true,

    /**
     * Constant: CONFIRM_LAYER_REMOVAL
     * {Boolean} Do we want a popup dialog to appear on layer removal ?
     * Defaults to false
     */
    //CONFIRM_LAYER_REMOVAL: false,
    
    /**
     * Constant: WMS_SERVERS
     * {Array} List of externals WMS to display in the WMS servers tab.
     */
    WMS_SERVERS: [
        {"name": "GeoBretagne", "url": "http://geobretagne.fr/geoserver/wms"},
        {"name": "Sandre/zonages", "url": "http://services.sandre.eaufrance.fr/geo/zonage"},
        {"name": "Sandre/ouvrages", "url": "http://services.sandre.eaufrance.fr/geo/ouvrage"},
        {"name": "Sandre/stations", "url": "http://services.sandre.eaufrance.fr/geo/stations"},
        {"name": "BRGM/géologie", "url": "http://geoservices.brgm.fr/geologie"},
        {"name": "BRGM/risques", "url": "http://geoservices.brgm.fr/risques"},
        {"name": "Cartorisque33, risques naturels", "url": "http://cartorisque.prim.net/wms/33"},
        {"name": "Cartorisque24, risques naturels", "url": "http://cartorisque.prim.net/wms/24"},
        {"name": "Cartorisque47, risques naturels", "url": "http://cartorisque.prim.net/wms/47"},
        {"name": "Cartorisque40, risques naturels", "url": "http://cartorisque.prim.net/wms/40"},
        {"name": "Cartorisque64, risques naturels", "url": "http://cartorisque.prim.net/wms/64"},
        {"name": "Carmen", "url": "http://ws.carmen.application.developpement-durable.gouv.fr/WFS/10/Nature_Paysage"},
        {"name": "GeoSignal", "url": "http://www.geosignal.org/cgi-bin/wmsmap"},
        {"name": "Corine Land Cover", "url": "http://sd1878-2.sivit.org/geoserver/wms"},
        {"name": "GeoLittoral", "url": "http://geolittoral.application.equipement.gouv.fr/wms/metropole"},
        {"name": "Gest'Eau", "url": "http://gesteau.oieau.fr/service"},
        {"name": "IFREMER/littoral", "url": "http://www.ifremer.fr/services/wms1"},
        {"name": "Cartelie/CETE Ouest", "url": "http://mapserveur.application.developpement-durable.gouv.fr/map/mapserv?map%3D%2Fopt%2Fdata%2Fcarto%2Fcartelie%2Fprod%2FCETE_Ouest%2Fxdtyr36laj.www.map"}
    ],
    
    /**
     * Constant: WFS_SERVERS
     * {Array} List of externals WFS to display in the WFS servers tab.
     */
    WFS_SERVERS: [
        {"name": "GeoBretagne", "url": "http://geobretagne.fr/geoserver/wfs"},
        {"name": "Corine Land Cover", "url": "http://sd1878-2.sivit.org/geoserver/wfs"}
    ]
    // No trailing comma for the last line (or IE will complain)
}
