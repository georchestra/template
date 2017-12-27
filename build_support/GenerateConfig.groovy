/*
 * This file can optionally generate configuration files.  The classic example
 * is when a project has both a integration and a production server.
 *
 * The configuration might be in a subdirectory of build_support (which is not copied into the configuration by default)
 * This script can copy the files to the outputDir and copy a shared.maven.filters with the parameters that
 * are needed depending on target and subTarget.  More can be done but that is the classic example
 */
class GenerateConfig {

    def instanceName = "@shared.instance.name@"

    /**
     * @param project The maven project.  you can get all information about
     * the project from this object
     * @param log a logger for logging info
     * @param ant an AntBuilder (see groovy docs) for executing ant tasks
     * @param basedirFile a File object that references the base directory
     * of the conf project
     * @param target the server property which is normally set by the build
     * profile.  It indicates the project that is being built
     * @param subTarget the "subTarget" that the project is being deployed
     * to. For example integration or production
     * @param targetDir a File object referencing the targetDir
     * @param buildSupportDir a File object referencing the build_support
     * dir of the target project
     * @param outputDir the directory to copy the generated configuration
     * files to
     */
    def generate(def project, def log, def ant, def basedirFile,
      def target, def subTarget, def targetDir,
      def buildSupportDir, def outputDir) {

        updateGeoServerProperties()
        updateGeoFenceProperties()
        updateMapfishappMavenFilters()
        updateExtractorappMavenFilters()
        updateSecProxyMavenFilters()
        updateLDAPadminMavenFilters()
    }

    /**
     * updateMapfishappMavenFilters
     */
    def updateMapfishappMavenFilters() {
        new PropertyUpdate(
            path: 'maven.filter',
            from: 'defaults/mapfishapp', 
            to: 'mapfishapp'
        ).update { properties ->
            // this is the directory where older temporary documents are stored:
            properties['docTempDir'] = "/tmp/mapfishapp"
        }
    }


    /**
     * updateGeoServerProperties
     */
    def updateGeoServerProperties() {
        new PropertyUpdate(
            path: 'geofence-geoserver.properties',
            from: 'defaults/geoserver-webapp/WEB-INF/classes',
            to: 'geoserver-webapp/WEB-INF/classes'
        ).update { properties ->
            // if you're running GeoFence, update the following URL to match your setup:
            properties['servicesUrl'] = "http://localhost:8280/geofence/remoting/RuleReader"
        }
    }


    /**
     * updateGeoServerProperties
     */
    def updateGeoFenceProperties() {
        new PropertyUpdate(
            path: 'geofence-datasource-ovr.properties',
            from: 'defaults/geofence-webapp/WEB-INF/classes',
            to: 'geofence-webapp/WEB-INF/classes'
        ).update { properties ->
            properties['geofenceGlobalConfiguration.baseLayerURL'] = "@shared.url.scheme@://sdi.georchestra.org/geoserver/wms"
            properties['geofenceGlobalConfiguration.baseLayerName'] = "unearthedoutdoors:truemarble"
            properties['geofenceGlobalConfiguration.baseLayerTitle'] = "True Marble"
            properties['geofenceGlobalConfiguration.baseLayerFormat'] = "image/jpeg"
            properties['geofenceGlobalConfiguration.baseLayerStyle'] = ""
            properties['geofenceGlobalConfiguration.mapCenterLon'] = "273950.30933606"
            properties['geofenceGlobalConfiguration.mapCenterLat'] = "5901246.3506556"
            properties['geofenceGlobalConfiguration.mapZoom'] = "4"
            properties['geofenceGlobalConfiguration.mapMaxResolution'] = "156543.03390625"
            properties['geofenceGlobalConfiguration.mapMaxExtent'] = "-20037508.34,-20037508.34,20037508.34,20037508.34"
            properties['geofenceGlobalConfiguration.mapProjection'] = "EPSG:3857"
        }
    }

    /**
     * updateExtractorappMavenFilters
     */
    def updateExtractorappMavenFilters() {
        new PropertyUpdate(
            path: 'maven.filter',
            from: 'defaults/extractorapp', 
            to: 'extractorapp'
        ).update { properties ->
            properties['maxCoverageExtractionSize'] = "99999999"
            properties['maxExtractions'] = "5"
            properties['remoteReproject'] = "true"
            properties['useCommandLineGDAL'] = "false"
            properties['extractionFolderPrefix'] = "extraction-"
            properties['emailfactory'] = "org.georchestra.extractorapp.ws.EmailFactoryDefault"
            properties['emailsubject'] = "["+instanceName+"] Your extraction request"
        }
    }


    /**
     * updateSecProxyMavenFilters
     */
    def updateSecProxyMavenFilters() {

        // We assume that georchestra webapps, except geoserver, proxy and cas
        // are served by an http connector on localhost, port 8280:
        def proxyDefaultTarget = "http://localhost:8280"

        // We also assume that geoserver is by default served
        // by an http connector on localhost, port 8380.
        def geoserverTarget = "http://localhost:8380"
        
        // Change the proxy.mapping value below to match your setup !
        new PropertyUpdate(
            path: 'maven.filter',
            from: 'defaults/security-proxy',
            to: 'security-proxy'
        ).update { properties ->
            properties['cas.private.host'] = "localhost"
            properties['public.ssl'] = "443"
            properties['private.ssl'] = "8443"
            // remove.xforwarded.headers holds a list of servers for which x-forwarded-* headers should be removed:
            // see https://github.com/georchestra/georchestra/issues/782
            properties['remove.xforwarded.headers'] = "<value>.*geo.admin.ch.*</value>"
            // proxy.mapping 
            properties['proxy.mapping'] = """
<entry key="analytics"     value="proxyDefaultTarget/analytics/" />
<entry key="catalogapp"    value="proxyDefaultTarget/catalogapp/" />
<entry key="extractorapp"  value="proxyDefaultTarget/extractorapp/" />
<entry key="geonetwork"    value="proxyDefaultTarget/geonetwork/" />
<entry key="geoserver"     value="geoserverTarget/geoserver/" />
<entry key="geowebcache"   value="proxyDefaultTarget/geowebcache/" />
<entry key="geofence"      value="proxyDefaultTarget/geofence/" />
<entry key="header"        value="proxyDefaultTarget/header/" />
<entry key="ldapadmin"     value="proxyDefaultTarget/ldapadmin/" />
<entry key="mapfishapp"    value="proxyDefaultTarget/mapfishapp/" />
<entry key="static"        value="proxyDefaultTarget/header/" />""".replaceAll("\n|\t","").replaceAll("proxyDefaultTarget",proxyDefaultTarget).replaceAll("geoserverTarget",geoserverTarget)
            properties['header.mapping'] = """
<entry key="sec-email"     value="mail" />
<entry key="sec-firstname" value="givenName" />
<entry key="sec-lastname"  value="sn" />
<entry key="sec-org"       value="o" />
<entry key="sec-tel"       value="telephoneNumber" />""".replaceAll("\n|\t","")
        }
    }


    /**
     * updateLDAPadminMavenFilters
     */
    def updateLDAPadminMavenFilters() {
        new PropertyUpdate(
            path: 'maven.filter',
            from: 'defaults/ldapadmin', 
            to: 'ldapadmin'
        ).update { properties ->
            // ReCaptcha keys for your own domain: 
            // (these are the ones for sdi.georchestra.org, they won't work for you !!!)
            properties['privateKey'] = "6LcfjucSAAAAAKcnHp14epYOiWOIUfEculd4PvLV"
            properties['publicKey'] = "6LcfjucSAAAAAKtNoK5r7IIXxBT-33znNJUgeYg1"
            // Email subjects:
            properties['subject.account.created'] = "["+instanceName+"] Your account has been created"
            properties['subject.account.in.process'] = "["+instanceName+"] Your new account is waiting for validation"
            properties['subject.requires.moderation'] = "["+instanceName+"] New account waiting for validation"
            properties['subject.change.password'] = "["+instanceName+"] Update your password"
            properties['subject.account.uid.renamed'] = "["+instanceName+"] New login for your account"
            // Moderated signup or free account creation ?
            properties['moderatedSignup'] = "true"
            // Delay in days before the tokens are purged from the db:
            properties['delayInDays'] = "1"
            // List of required fields in forms (CSV list) - possible values are:
            // firstName,surname,phone,facsimile,org,title,description,postalAddress
            // Note that email, uid, password and confirmPassword are always required
            properties['requiredFields'] = "firstName,surname"
        }
    }


}
