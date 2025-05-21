<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <!-- Helper template to get the first path segment after the domain -->
  <xsl:template name="get-path-segment">
    <xsl:param name="url"/>
    <xsl:variable name="after-domain" select="substring-after(substring-after($url, '://'), '/')"/>
    <xsl:choose>
      <xsl:when test="contains($after-domain, '/')">
        <xsl:value-of select="substring-before($after-domain, '/')"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$after-domain"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
  <!-- Create a key for grouping URLs by their first path segment -->
  <xsl:key name="urls-by-segment" match="sm:url" use="substring-before(concat(substring-after(substring-after(sm:loc, '://'), '/'), '/'), '/')"/>
  
  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title"/>
        </title>
        <style>
          @font-face {
          font-family: Inter;
          src: url(/fonts/Inter-Variable.ttf);
          }
          
          :root {
          --bg: #212529;
          --altbg: #1d1f20;
          --acc: #343a40;
          --text: #f1f3f5;
          --sec: #ced4da;
          --link: #a4b6fd;
          --link-hover: #c7d2fd;
          }
          body {
          font-family: Inter, sans-serif;
          background-color: var(--altbg);
          padding: 0;
          margin: 0;
          }
          #container {
          max-width: 800px;
          min-height: 100vh;
          margin: 0 auto;
          background-color: var(--bg);
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          h1 {
          color: var(--text);
          margin: 0px;
          }
          h2 {
          color: var(--text);
          margin: 20px 0 10px 0;
          }
          .group {
          margin-bottom: 20px;
          }
          ul {
          display: grid;
          grid-template-columns: repeat(3, minmax(100px, 1fr));
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 6px;
          }
          li {
          background-color: var(--acc);
          padding: 6px;
          }
          li:last-child {
          border-bottom: none;
          }
          div {
            height: 100%;
          }
          div h2 {
          color: var(--link);
          text-decoration: none;
          }
          div:hover > h2 {
          color: var(--link-hover);
          text-decoration: underline;
          }
          a {
          color: var(--link);
          text-decoration: none;
          }
          a:hover {
          color: var(--link-hover);
          text-decoration: underline;
          }
          p {
          color: var(--text);
          margin: 0px;
          padding: 6px 0;
          }
          .date {
          font-size: 0.9em;
          color: var(--sec);
          margin: 0px;
          }
          em {
          font-style: italic;
          color: var(--sec);
          }
        </style>
      </head>
      <body>
        <div id="container">
          <h1>
            jb's site sitemap
          </h1>
          
          <!-- Use Muenchian method for grouping in XSLT 1.0 -->
          <!-- First, handle root URLs (no path segment after domain) -->
          <xsl:if test="count(sm:urlset/sm:url[not(contains(substring-after(substring-after(sm:loc, '://'), '/'), '/'))])">
            <div class="group">
              <h2>Root</h2>
              <ul>
                <xsl:for-each select="sm:urlset/sm:url[not(contains(substring-after(substring-after(sm:loc, '://'), '/'), '/'))]">
                  <li>
                    <a href="{sm:loc}">
                      <p>/</p>
                    </a>
                  </li>
                </xsl:for-each>
              </ul>
            </div>
          </xsl:if>
          
          <!-- Then handle all URLs with path segments, grouped by first segment -->
          <xsl:for-each select="sm:urlset/sm:url[contains(substring-after(substring-after(sm:loc, '://'), '/'), '/')]">
            <!-- Get the path segment for current URL -->
            <xsl:variable name="segment">
              <xsl:call-template name="get-path-segment">
                <xsl:with-param name="url" select="sm:loc"/>
              </xsl:call-template>
            </xsl:variable>
            
            <!-- Only process the first URL for each unique segment -->
            <xsl:if test="generate-id(.) = generate-id(key('urls-by-segment', $segment)[1])">
              <div class="group">
                <h2>/<xsl:value-of select="$segment"/></h2>
                <ul>
                  <xsl:for-each select="key('urls-by-segment', $segment)">
                    <xsl:variable name="path-base" select="concat(substring-before(sm:loc, concat('://', substring-after(substring-before(sm:loc, '/'), '://'))), '://', substring-after(substring-before(sm:loc, '/'), '://'), '/', $segment, '/')"/>
                    <li>
                      <a href="{sm:loc}">
                        <p>
                          <xsl:choose>
                            <xsl:when test="sm:loc = substring($path-base, 1, string-length($path-base)-1)">
                              <em>index</em>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:choose>
                                <xsl:when test="substring-after(sm:loc, substring-after($path-base, '://')) = '/'">
                                    Root
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="concat('/', substring-after(sm:loc, substring-after($path-base, '://')))"/>
                                </xsl:otherwise>
                              </xsl:choose>
                            </xsl:otherwise>
                          </xsl:choose>
                        </p>
                      </a>
                    </li>
                  </xsl:for-each>
                </ul>
              </div>
            </xsl:if>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>