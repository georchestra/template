<%@ page contentType="text/html; charset=UTF-8" %>
<jsp:directive.include file="includes/top.jsp" />
<form:form method="post" id="fm1" cssClass="fm-v clearfix" commandName="${commandName}" htmlEscape="true">
  <form:errors path="*" cssClass="errors" id="status" element="div" />
    <div class="box" id="login">
      <div class="row">
        <fieldset>
          <label for="username"><spring:message code="screen.welcome.label.netid" /></label>
          <c:if test="${not empty sessionScope.openIdLocalId}">
          <strong>${sessionScope.openIdLocalId}</strong>
          <input type="hidden" id="username" name="username" value="${sessionScope.openIdLocalId}" />
          </c:if>

          <c:if test="${empty sessionScope.openIdLocalId}">
          <spring:message code="screen.welcome.label.netid.accesskey" var="userNameAccessKey" />
          <form:input cssClass="required" cssErrorClass="error" id="username" tabindex="1" accesskey="${userNameAccessKey}" path="username" autocomplete="false" htmlEscape="true" />
          </c:if>
        </fieldset>
        </div>
        <div class="row">
          <fieldset>
            <label for="password"><spring:message code="screen.welcome.label.password" /></label>
            <spring:message code="screen.welcome.label.password.accesskey" var="passwordAccessKey" />
            <form:password cssClass="required" cssErrorClass="error" id="password" tabindex="2" path="password"  accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off" />
            <div id="forgot"><a href="/ldapadmin/account/passwordrecovery"><spring:message code="screen.welcome.link.forgot" /></a></div>
          </fieldset>
        </div>
        <div class="row btn-row" style="text-align: center;">
            <input type="hidden" name="lt" value="${flowExecutionKey}" />
            <input type="hidden" name="_eventId" value="submit" />

            <input class="btn-submit" name="submit" accesskey="l" value="<spring:message code="screen.welcome.button.login" />" tabindex="4" type="submit" />
          </div>

		<div id="link">
			<div class="mm-or"><spring:message code="screen.welcome.or" /></div>
			<a href="/ldapadmin/account/new"><spring:message code="screen.welcome.link.newaccount" /></a>
		</div>
        </div>

        <div id="sidebar">
          <p><spring:message code="screen.welcome.security" /></p>
          <div id="list-languages">
            <%final String queryString = request.getQueryString() == null ? "" : request.getQueryString().replaceAll("&locale=([A-Za-z][A-Za-z]_)?[A-Za-z][A-Za-z]|^locale=([A-Za-z][A-Za-z]_)?[A-Za-z][A-Za-z]", "");%>
            <c:set var='query' value='<%=queryString%>' />
            <c:set var="loginUrl" value="login?${query}${not empty query ? '&' : ''}locale=" />
          </div>
        </div>
        </form:form>
        <script type="text/javascript">
        //<![CDATA[
        function init(){
            var firstElement = document.getElementById('username');
            if (firstElement != null) {
                firstElement.focus();
                firstElement.select();
            }
        }
        //]]>
        </script>
        <jsp:directive.include file="includes/bottom.jsp" />
