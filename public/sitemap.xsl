<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template name="get-first-path-segment">
        <xsl:param name="url"/>
        <xsl:variable name="path" select="substring-after(substring-after($url, '://'), '/')"/>
        <xsl:choose>
            <xsl:when test="contains($path, '/')">
                <xsl:value-of select="substring-before($path, '/')"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$path"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template name="get-relative-path">
        <xsl:param name="url"/>
        <xsl:param name="segment"/>
        
        <xsl:variable name="after-segment" select="substring-after(substring-after(substring-after($url, '://'), '/'), concat($segment, '/'))"/>
        <xsl:choose>
            <xsl:when test="$after-segment = ''">index</xsl:when>
            <xsl:otherwise><xsl:value-of select="$after-segment"/></xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>jb's site sitemap</title>
                <style>
                    @font-face {
                    font-family: Inter;
                    src: url(/fonts/Inter-Variable.ttf);
                    }
                    body {
                    font-family: Inter, system-ui, -apple-system, sans-serif;
                    background-color: #1d1f20;
                    color: #f1f3f5;
                    padding: 20px;
                    margin: 0;
                    }
                    .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background-color: #212529;
                    padding: 20px;
                    border-radius: 8px;
                    }
                    h1 {
                    margin-top: 0;
                    color: #f1f3f5;
                    }
                    h2 {
                    margin-top: 20px;
                    margin-bottom: 8px;
                    color: #a4b6fd;
                    }
                    .group {
                    margin-bottom: 20px;
                    }
                    ul {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                    }
                    li {
                    background-color: #343a40;
                    padding: 8px;
                    border-radius: 4px;
                    }
                    a {
                    color: #a4b6fd;
                    text-decoration: none;
                    }
                    a:hover {
                    text-decoration: underline;
                    }
                    .index {
                    font-style: italic;
                    color: #ced4da;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>jb's site sitemap</h1>
                    
                    <xsl:variable name="all-urls" select="sm:urlset/sm:url"/>
                    
                    <xsl:choose>
                        <xsl:when test="$all-urls[not(contains(substring-after(substring-after(sm:loc, '://'), '/'), '/'))]">
                            <div class="group">
                                <h2>Root</h2>
                                <ul>
                                    <xsl:for-each select="$all-urls[not(contains(substring-after(substring-after(sm:loc, '://'), '/'), '/'))]">
                                        <li>
                                            <a href="{sm:loc}">
                                                <xsl:text>/</xsl:text>
                                            </a>
                                        </li>
                                    </xsl:for-each>
                                </ul>
                            </div>
                        </xsl:when>
                        <xsl:otherwise>
                            <div class="group">
                                <h2>Sitemap Chunks</h2>
                                <ul>
                                    <xsl:for-each select="sm:sitemapindex/sm:sitemap">
                                        <li>
                                            <a href="{sm:loc}">
                                                <xsl:value-of select="substring-after(substring-after(sm:loc, '://'), '/')"/>
                                            </a>
                                        </li>
                                    </xsl:for-each>
                                </ul>
                            </div>
                        </xsl:otherwise>
                    </xsl:choose>
                    
                    <xsl:for-each select="$all-urls[contains(substring-after(substring-after(sm:loc, '://'), '/'), '/')]">
                        <xsl:variable name="current-segment">
                            <xsl:call-template name="get-first-path-segment">
                                <xsl:with-param name="url" select="sm:loc"/>
                            </xsl:call-template>
                        </xsl:variable>
                        
                        <xsl:if test="not(preceding-sibling::sm:url[contains(substring-after(substring-after(sm:loc, '://'), '/'), '/')][substring-before(substring-after(substring-after(sm:loc, '://'), '/'), '/') = $current-segment])">
                            <div class="group">
                                <h2>/<xsl:value-of select="$current-segment"/></h2>
                                <ul>
                                    <xsl:for-each select="$all-urls[contains(substring-after(substring-after(sm:loc, '://'), '/'), '/')]">
                                        <xsl:variable name="segment">
                                            <xsl:call-template name="get-first-path-segment">
                                                <xsl:with-param name="url" select="sm:loc"/>
                                            </xsl:call-template>
                                        </xsl:variable>
                                        
                                        <xsl:if test="$segment = $current-segment">
                                            <li>
                                                <a href="{sm:loc}">
                                                    <xsl:variable name="rel-path">
                                                        <xsl:call-template name="get-relative-path">
                                                            <xsl:with-param name="url" select="sm:loc"/>
                                                            <xsl:with-param name="segment" select="$segment"/>
                                                        </xsl:call-template>
                                                    </xsl:variable>
                                                    
                                                    <xsl:choose>
                                                        <xsl:when test="$rel-path = 'index'">
                                                            <span class="index">index</span>
                                                        </xsl:when>
                                                        <xsl:otherwise>
                                                            <xsl:value-of select="$rel-path"/>
                                                        </xsl:otherwise>
                                                    </xsl:choose>
                                                </a>
                                            </li>
                                        </xsl:if>
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