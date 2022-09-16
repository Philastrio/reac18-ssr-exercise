import React, { PropsWithChildren } from 'react';

type HtmlProps = PropsWithChildren<{ title: string }>;

const Html = ({ children, title }: HtmlProps) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="React18 SSR" />
        <link rel="stylesheet" href="/app.css" />
        <title>{title}</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
};

export default Html;
