<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
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
          margin: 0px;
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
        </style>
      </head>
      <body>
        <div id="container">
          <h1>
            <xsl:value-of select="/rss/channel/title"/>
          </h1>
          <p>
            <xsl:value-of select="/rss/channel/description"/>
          </p>
          <ul>
            <xsl:for-each select="/rss/channel/item">
              <li>
                <a href="{link}">
                  <div>
                    <p class="date">
                      <xsl:value-of select="pubDate"/>
                    </p>
                    <h2>
                      <xsl:value-of select="title"/>
                    </h2>
                    <p>
                      <xsl:value-of select="description"/>
                    </p>
                  </div>
                </a>
              </li>
            </xsl:for-each>
          </ul>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
