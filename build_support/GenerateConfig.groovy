/*
 * This file can optionally generate configuration files.  The classic example
 * is when a project has both a integration and a production server.
 *
 * The configuration my be in a subdirectory of build_support (which is not copied into the configuration by default)
 * Depending on serverId, this script can copy the files to the outputDir and copy a shared.maven.filters with the parameters that
 * are needed depending on serverId.  More can be done but that is the classic example
 */
class GenerateConfig {
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

      ]).download()
  }
}