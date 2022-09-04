import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet } from "styled-components";

import App from "../App";
import connectDB from "./config/db";

let assets: any;

// connectDB();

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const cssLinksFromAssets = (
  assets: { [x: string]: { css: any[] } },
  entrypoint: string
) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
          .map((asset: any) => `<link rel="stylesheet" href="${asset}">`)
          .join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (
  assets: { [x: string]: { js: any[] } },
  entrypoint: string,
  extra = ""
) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
          .map((asset: any) => `<script src="${asset}"${extra}></script>`)
          .join("")
      : ""
    : "";
};

export const renderApp = (req: express.Request, res: express.Response) => {
  // This class is used for getting styles form styled_components and rendering it on server side
  const sheet = new ServerStyleSheet();

  const markup = renderToString(
    sheet.collectStyles(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    )
  );

  const styleTags = sheet.getStyleTags();
  const html =
    // prettier-ignore
    `<!doctype html>
  <html lang="">
  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet='utf-8' />
      <title>Welcome to Razzle</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;700&display=swap" rel="stylesheet">
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      ${cssLinksFromAssets(assets, 'client')}
      ${styleTags}
  </head>
  <body>
      <div id="root">${markup}</div>
      ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
  </body>
  </html>`;

  return { html };
};

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", (req: express.Request, res: express.Response) => {
    const { html = "" } = renderApp(req, res);
    res.send(html);
  });
export default server;
