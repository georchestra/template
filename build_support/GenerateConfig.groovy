/*
 * This file can optionally generate configuration files.  The classic example
 * is when a project has both a integration and a production server.
 *
 * The configuration might be in a subdirectory of build_support (which is not copied into the configuration by default)
 * This script can copy the files to the outputDir and copy a shared.maven.filters with the parameters that
 * are needed depending on target and subTarget.  More can be done but that is the classic example
 */
class GenerateConfig {

    // Feel free to customize your instance name,
    // It will prefix every outgoing email.
    def instanceName = "geOrchestra"

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

        installGeoServerExtensions()
        updateGeoServerProperties()
        updateGeoFenceProperties()
        updateMapfishappMavenFilters()
        updateExtractorappMavenFilters()
        updateSecProxyMavenFilters()
        updateLDAPadminMavenFilters()
    }

    /**
     * installGeoServerExtensions
     */
    def installGeoServerExtensions() {
        def gsVersion = System.getProperty('geoserver.version', '2.3.2')
        def gtVersion = System.getProperty("geotools.version", '9.2')

        new MavenDownloader(
            to: 'geoserver-webapp/WEB-INF/lib',
            artifacts: [
                /*
                 * The INSPIRE extension allows GeoServer to be compliant with the View Service specification 
                 * put forth by the Infrastructure for Spatial Information in the European Community (INSPIRE) directive.
                 * Please refer to http://docs.geoserver.org/stable/en/user/extensions/inspire/index.html
                 * Activated by default for geOrchestra.
                 */
                ['org.geoserver.extension','inspire', gsVersion]

                /*
                 * The control-flow module allows the administrator to control the amount of concurrent requests 
                 * actually executing inside the server.
                 * Please refer to http://docs.geoserver.org/stable/en/user/extensions/controlflow/index.html
                 * Activated by default for geOrchestra.
                 */
                ,['org.geoserver.extension','control-flow', gsVersion]

                /*
                 * GeoServer can leverage the ImageI/O-Ext GDAL libraries to read selected coverage formats.
                 * Please refer to http://docs.geoserver.org/stable/en/user/data/raster/gdal.html
                 * Not activated by default since it requires the GDAL native libraries
                 *
                ,['org.geoserver.extension','gdal', gsVersion]
                */

                /*
                 * SpatiaLite is the spatial extension of the popular SQLite embedded relational database.
                 * Please refer to http://docs.geoserver.org/stable/en/user/community/spatialite/index.html
                 * Not activated by default since it requires native libraries
                 *
                ,['org.geotools.jdbc','gt-jdbc-spatialite', gtVersion]
                ,['org.xerial', 'sqlite-jdbc-spatialite', '3.7.2-2.4']
                */
            ]
        ).download()
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
            properties['servicesUrl'] = "http://localhost:8080/geofence-private/remoting/RuleReader"
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
            properties['geofenceGlobalConfiguration.baseLayerURL'] = "http://demo1.geo-solutions.it/geoserver-enterprise/wms"
            properties['geofenceGlobalConfiguration.baseLayerName'] = "GeoSolutions:ne_shaded"
            properties['geofenceGlobalConfiguration.baseLayerTitle'] = "GeoSolutions Natural Earth"
            properties['geofenceGlobalConfiguration.baseLayerFormat'] = "image/jpeg"
            properties['geofenceGlobalConfiguration.baseLayerStyle'] = ""
            properties['geofenceGlobalConfiguration.mapCenterLon'] = "0.10626"
            properties['geofenceGlobalConfiguration.mapCenterLat'] = "44.35909"
            properties['geofenceGlobalConfiguration.mapZoom'] = "6"
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

        def proxyDefaultTarget = "http://localhost:8080"

        new PropertyUpdate(
            path: 'maven.filter',
            from: 'defaults/security-proxy',
            to: 'security-proxy'
        ).update { properties ->
            properties['cas.private.host'] = "localhost"
            properties['public.ssl'] = "443"
            properties['private.ssl'] = "8443"
            properties['proxy.defaultTarget'] = proxyDefaultTarget
            properties['proxy.mapping'] = """
<entry key="analytics"     value="proxyDefaultTarget/analytics-private/" />
<entry key="catalogapp"    value="proxyDefaultTarget/catalogapp-private/" />
<entry key="downloadform"  value="proxyDefaultTarget/downloadform-private/" />
<entry key="extractorapp"  value="proxyDefaultTarget/extractorapp-private/" />
<entry key="geonetwork"    value="proxyDefaultTarget/geonetwork-private/" />
<entry key="geoserver"     value="proxyDefaultTarget/geoserver-private/" />
<entry key="geofence"      value="proxyDefaultTarget/geofence-private/" />
<entry key="header"        value="proxyDefaultTarget/header-private/" />
<entry key="ldapadmin"     value="proxyDefaultTarget/ldapadmin-private/" />
<entry key="mapfishapp"    value="proxyDefaultTarget/mapfishapp-private/" />
<entry key="static"        value="proxyDefaultTarget/header-private/" />""".replaceAll("\n|\t","").replaceAll("proxyDefaultTarget",proxyDefaultTarget)
            properties['header.mapping'] = """
<entry key="sec-email"     value="mail" />
<entry key="sec-firstname" value="givenName" />
<entry key="sec-lastname"  value="sn" />
<entry key="sec-org"       value="o" />
<entry key="sec-tel"       value="telephoneNumber" />""".replaceAll("\n|\t","")
            // database health check settings:
            // If the HEALTH CHECK feature is activated, the security proxy monitors db connections.
            properties['checkHealth'] = "false"
            properties['psql.db'] = "geonetwork"
            properties['max.database.connections'] = "170"
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
            // Application path as seen from the external world:
            properties['publicContextPath'] = "/ldapadmin"
            // Email subjects:
            properties['subject.account.created'] = "["+instanceName+"] Your account has been created"
            properties['subject.account.in.process'] = "["+instanceName+"] Your new account is waiting for validation"
            properties['subject.requires.moderation'] = "["+instanceName+"] New account waiting for validation"
            properties['subject.change.password'] = "["+instanceName+"] Update your password"
            // Moderated signup or free account creation ?
            properties['moderatedSignup'] = "true"
            // Delay in days before the tokens are purged from the db:
            properties['delayInDays'] = "1"
            // List of required fields in forms (CSV list) - possible values are:
            // firstName,surname,phone,facsimile,org,title,description,postalAddress
            // Note that email, uid, password and confirmPassword are always required
            properties['requiredFields'] = "firstName,surname"
            // Enable auto generation of uid field for new users
            properties['generateUid'] = "true"
            // RegExp for uid field validation (by default: one letter, followed by letters, numbers or point)
            properties['uidRegExp'] = "[A-Za-z]+[A-Za-z0-9\.]*"
        }
    }

}
