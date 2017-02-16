# Template profile for geOrchestra

This repository contains **files which were previously used to configure a geOrchestra instance, at compilation time**.

From 16.12 on, building geOrchestra with this template profile is **no longer required**, since the magic happens at runtime with the [geOrchestra datadir](https://github.com/georchestra/datadir/) !


## Contents

This configuration folder contains:
 * a ```build_support``` directory hosting:
   * a ```shared.maven.filters``` file, which lists most of the shared maven filters you want to customize for your own setup,
   * a ```GenerateConfig.groovy``` file, which is used to customize the application specific default maven filters,
 * several directories matching the names of geOrchestra modules, whose files will override the default ones in the webapp,
 * a ```DeployScript.groovy``` file, which may optionally be used to automate the deployment of geOrchestra artifacts into tomcat.
 * an ```excluded``` directory, which can be used to store extra scripts or files that are not directly related to the geOrchestra configuration. They will not be shipped into the configuration jar.


## Hypotheses

This configuration profile makes the following main hypotheses:
 * a single machine, "3 tomcats"-based setup, as described by the [official documentation](https://github.com/georchestra/georchestra/blob/master/doc/setup.md),
 * tomcat connectors configured to bind to ports 8180 (proxy/cas), 8280 (all other webapps), 8380 (geoserver) on localhost,
 * HTTPS scheme is assumed on the front web server,
 * english language is the default one,
 * minimal (production) logging level.
