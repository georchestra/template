<%@ page session="true" %>
<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
	<head>
	    <title>SSO - @shared.instance.name@</title>
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	    <style type="text/css" media="screen">@import 'css/cas.css'/**/;</style>
	    <!--[if gte IE 6]><style type="text/css" media="screen">@import 'css/ie_cas.css';</style><![endif]-->
	    <script type="text/javascript" src="js/common_rosters.js"></script>
	    <link rel="icon" href="<%= request.getContextPath() %>/favicon.ico" type="image/x-icon" />
	</head>

	<body id="cas" onload="init();">
    
        <iframe src="/static/" style="width:100%;height:@shared.header.height@px;border:none;overflow:none;" scrolling="no" onload="_headerOnLoad(this)"></iframe>
        <!-- see http://stackoverflow.com/questions/1037839/how-to-force-link-from-iframe-to-be-opened-in-the-parent-window -->
        <script type="text/javascript">
            var _headerOnLoad = function(iframe) {
                var base = iframe.contentDocument.createElement('base');
                base.setAttribute('target', '_parent');
                iframe.contentDocument.getElementsByTagName('head')[0].appendChild(base);
            };
        </script>

            <div id="content">

