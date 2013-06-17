<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:java="java:org.fao.geonet.util.XslUtil" exclude-result-prefixes="#all">

    <xsl:variable name="modal"
        select="count(/root/gui/config/search/use-modal-box-for-banner-functions)"/>

    <xsl:template name="banner">
        <div id="go_head">
            <iframe src="/static/?lang={/root/gui/language}&amp;active=geonetwork" style="width:100%;height:@shared.header.height@px;border:none;overflow:none;" scrolling="no" onload="_headerOnLoad(this)"></iframe>
        </div>
        <!-- see http://stackoverflow.com/questions/1037839/how-to-force-link-from-iframe-to-be-opened-in-the-parent-window -->
        <script type="text/javascript">
            var _headerOnLoad = function(iframe) {
                var base = iframe.contentDocument.createElement('base');
                base.setAttribute('target', '_parent');
                iframe.contentDocument.getElementsByTagName('head')[0].appendChild(base);
            };
        </script>
    </xsl:template>

    <!--
    main html banner in a popup window
    -->
    <xsl:template name="bannerPopup">

        <table width="100%">

            <!-- title -->
            <!-- TODO : Mutualize with main banner template -->
            <tr class="banner">
                <td class="banner">
                    <img src="{/root/gui/url}/images/header-left.jpg" alt="GeoNetwork opensource"
                        align="top"/>
                </td>
                <td align="right" class="banner">
                    <img src="{/root/gui/url}/images/header-right.gif" alt="World picture"
                        align="top"/>
                </td>
            </tr>

            <!-- buttons -->
            <tr class="banner">
                <td class="banner-menu" colspan="2"> </td>
            </tr>

            <tr class="banner">
                <td class="banner-login" colspan="2"> </td>
            </tr>
        </table>
    </xsl:template>
    <xsl:template mode="casParams" match="casLogin" priority="10"/>
    <xsl:template mode="casParams" match="*">&amp;<xsl:value-of select="name(.)"/><xsl:if
            test="normalize-space(text())!=''">=<xsl:value-of select="text()"
        /></xsl:if></xsl:template>

</xsl:stylesheet>
