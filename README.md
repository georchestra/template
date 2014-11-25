template
========

Template configuration for geOrchestra: fork me !

This configuration folder contains:
 * a ```build_support``` directory hosting:
   * a ```shared.maven.filters``` file, which lists most of the shared maven filters you want to customize for your own setup,
   * a ```GenerateConfig.groovy``` file, which is used to customize the application specific default maven filters,
 * several directories matching the names of geOrchestra modules, whose files will override the default ones in the webapp,
 * a ```DeployScript.groovy``` file, which may optionally be used to automate the deployment of geOrchestra artifacts into tomcat.
 * an ```excluded``` directory, which can be used to store extra scripts or files that are not directly related to the geOrchestra configuration. They will not be shipped into the configuration jar.
 
Please refer to the [main configuration instructions](https://github.com/georchestra/georchestra/blob/master/config/README.md) if you want to know more about the configuration process in geOrchestra.
