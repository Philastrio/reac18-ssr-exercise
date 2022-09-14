import express from "express";
import ReactDOMServer from "react-dom/server";
import { App } from "../../client/src/App";

const app = express();

app.get("/", (req, res) => {
  // const options = {
  //   onShellReady() {
  //     // The content above all Suspense boundaries is ready.
  //     // If something errored before we started streaming, we set the error code appropriately.
  //     res.statusCode = didError ? 500 : 200;
  //     res.setHeader('Content-type', 'text/html');
  //     stream.pipe(res);
  //   },
  //   onShellError(error) {
  //     // Something errored before we could complete the shell so we emit an alternative shell.
  //     res.statusCode = 500;
  //     res.send(
  //       '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
  //     );
  //   },
  //   onAllReady() {
  //     // If you don't want streaming, use this instead of onShellReady.
  //     // This will fire after the entire page content is ready.
  //     // You can use this for crawlers or static generation.

  //     // res.statusCode = didError ? 500 : 200;
  //     // res.setHeader('Content-type', 'text/html');
  //     // stream.pipe(res);
  //   },
  //   onError(err) {
  //     didError = true;
  //     console.error(err);
  //   },
  // }

  const app = ReactDOMServer.renderToPipeableStream(<App />);
  // const app = ReactDOMServer.renderToReadableStream(<App />);

  const html = `
        <html lang="en">
        <head>
            <script src="app.js" async defer></script>
        </head>
        <body>
            <div id="root">
              <div>Hello world Server</div>
              <div>${app}</div>
            </div>
        </body>
        </html>
    `;
  res.send(html);
});

app.use(express.static("./built"));

app.listen(4242);
