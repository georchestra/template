<%@ page contentType="text/html; charset=UTF-8" %>
<jsp:directive.include file="includes/top.jsp" />


<c:if test="${not pageContext.request.secure}">
  <div id="msg" class="errors">
    <h2>Non-secure Connection</h2>
    <p>You are currently accessing CAS over a non-secure connection.  Single Sign On WILL NOT WORK.  In order to have single sign on work, you MUST log in over HTTPS.</p>
  </div>
</c:if>


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
            <form:input cssClass="required" cssErrorClass="error" id="username" tabindex="1" accesskey="${userNameAccessKey}" path="username" autocomplete="on" htmlEscape="true" />
          </c:if>
        </fieldset>
        </div>
        <div class="row">
          <fieldset>
            <label for="password"><spring:message code="screen.welcome.label.password" /></label>
            <spring:message code="screen.welcome.label.password.accesskey" var="passwordAccessKey" />
            <form:password cssClass="required" cssErrorClass="error" id="password" tabindex="2" path="password"  accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off" />
            <div id="forgot"><a href="/ldapadmin/account/passwordRecovery"><spring:message code="screen.welcome.link.forgot" /></a></div>
          </fieldset>
        </div>
        <div class="row btn-row" style="text-align: center;">
          <input type="hidden" name="lt" value="${loginTicket}" />
          <input type="hidden" name="execution" value="${flowExecutionKey}" />
          <input type="hidden" name="_eventId" value="submit" />

          <input class="btn-submit" name="submit" accesskey="l" value="<spring:message code="screen.welcome.button.login" />" tabindex="4" type="submit" />
          <input class="btn-reset" name="reset" accesskey="c" value="<spring:message code="screen.welcome.button.clear" />" tabindex="5" type="reset" />
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
            <c:set var="loginUrl" value="login?${query}${not empty query ? '&amp;' : ''}locale=" />
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
