/* 
 * A DeployScript.groovy allows you to automate the deployment of geOrchestra webapps into tomcat, from the command line.
 * 
 * The current one targets a single host, reachable at @shared.server.name@, hosting three tomcat instances:
 *  - one for the proxy (ROOT) and cas webapps
 *  - one for the geoserver webapp
 *  - an other one for the remaining webapps (analytics, extractorapp, geonetwork, header, ldapadmin, mapfishapp, geofence)
 *
 * It is provided as an example, and **should** be adapted to match your local setup. 
 * The server-deploy-support module provides all the classes required to create your own deployment script.
 * You can do pretty much anything you can dream of (multiple servers, multiple tomcat instances, multiple environments).
 * 
 * To make use of it, you should:
 *   - log into your build server as a custom "deploy_user", whose SSH key is trusted by your production or dev server(s),
 *   - build and install the geOrchestra artifacts into the local maven repository /home/deploy_user/.m2/repository/
 *     via ./mvn -Dmaven.test.skip=true -Dserver=your_profile install
 *   - cd server-deploy && ../mvn -Pupgrade -Dserver=your_profile -DskipTests -Dnon-interactive=true
 *
 * Please read on for more details.
 * You will also need to create (or edit) the /home/deploy_user/.m2/settings.xml file from your build server.
 */

def artifacts = new Artifacts(project, Artifacts.standardGeorchestraAliasFunction)
/*
  Reads all war dependencies of of server-deploy module to determine which webapps need to be deployed.
  The second param is the Alias function. The war files that are supplied to the script have the full 
  module name and version as defined in their pom.  For example extractorapp-1.0.war is the 
  actual file, the aliasFunction will map that to extractorapp.war which is what the deployed
  system expects.  The artifacts can be mapped to any desired name.  
  
  The Artifacts object uses the maven dependencies to look up the artifacts that need to be deployed
  and depending on the maven profile those dependencies can be controlled.  For example the extractorapp profile
  only has a dependency on extractorapp so artifacts will only contain that one artifact.
  
  This class is only for assisting deployment. It is not required to be used but it is recommended
  so that deploy scripts are all similar
*/

def ssh = new SSH(log:log, settings:settings, host:"@shared.server.name@")

/*
  Creates an SSH option that operates on server: server1.
  The authentication information is read from /home/deploy_user/.m2/settings.xml
  Passwords do not have to be in this file.  
  
  If the passwords/passphrases are the deploy will require no interaction with a user.  
  
  If they are not, a user will have to enter the password.  
  
  The options are privateKey/passphrase or username/password
  
For the record, here is a typical settings.xml file:

<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                      http://maven.apache.org/xsd/settings-1.0.0.xsd">
	<servers>
		<server>
			<id>server1</id>
			<username>deploy_user</username>
			<privateKey>/home/deploy_user/.ssh/id_rsa</privateKey>
		</server>
		<server>
			<id>server2</id>
			<username>deploy_user</username>
			<privateKey>/home/deploy_user/.ssh/id_rsa</privateKey>
		</server>
	</servers>
</settings>
*/

// Deploy all geOrchestra webapps except proxy, cas and geoserver:
def server1Deployer = new SSHWarDeployer(
    log: log,
    ssh: ssh,
    projectProperties: project.properties,
    webappDir: "/var/lib/tomcat-georchestra/webapps",
    startServerCommand: "sudo /etc/init.d/tomcat-georchestra start",
    stopServerCommand: "sudo /etc/init.d/tomcat-georchestra stop"
)
// Note that the deploy_user should have the rights to restart tomcat instances !
server1Deployer.deploy(artifacts.findAll{ it.name.contains("analytics") || it.name.contains("extractorapp") || it.name.contains("geonetwork") || it.name.contains("header") || it.name.contains("ldapadmin") || it.name.contains("mapfishapp") || it.name.contains("geofence") })

// Deploy proxy and cas to their own tomcat instance:
def proxycasDeployer = server1Deployer.copy(
    webappDir: "/var/lib/tomcat-proxycas/webapps",
    startServerCommand: "sudo /etc/init.d/tomcat-proxycas start",
    stopServerCommand: "sudo /etc/init.d/tomcat-proxycas stop"
)
proxycasDeployer.deploy(artifacts.findAll{it.name.contains("ROOT") || it.name.contains("cas")})

// Deploy geoserver to it's own tomcat instance:
def geoserverArtifact = artifacts.find{it.name.startsWith("geoserver")}
if (geoserverArtifact != null) {
  def geoserverDeployer = server1Deployer.copy(
    webappDir: "/var/lib/tomcat-geoserver0/webapps",
    startServerCommand: "sudo /etc/init.d/tomcat-geoserver0 start",
    stopServerCommand: "sudo /etc/init.d/tomcat-geoserver0 stop"
  )
  geoserverDeployer.deploy(geoserverArtifact)
}


