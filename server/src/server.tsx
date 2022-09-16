import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../../client/src/App';

const app = express();

const port = process.env.PORT || 4242;

app.use(express.static('./built'));
// if (process.env.NODE_ENV === 'development') {
//   app.use(express.static('./built'));
// } else {
//   app.use(express.static('./public'));
// }

let didError = false;
const ABORT_DELAY = 10000;

const render = async (req: express.Request, res: express.Response) => {
  // console.log(req);
  new Promise((_resolve, reject) => {
    const stream = ReactDOMServer.renderToPipeableStream(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>,
      {
        // bootstrapScripts: ['/index.js'],
        onShellReady() {
          // The content above all Suspense boundaries is ready.
          // If something errored before we started streaming, we set the error code appropriately.
          res.statusCode = didError ? 500 : 200;
          res.setHeader('Content-type', 'text/html');
          stream.pipe(res);
        },
        onError() {
          didError = true;
          reject();
        },
      },
    );

    // setTimeout(() => {
    //   stream.abort();
    //   reject();
    // }, ABORT_DELAY);
  });
};

app.get('/', async (req, res) => {
  try {
    await render(req, res);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`🚀 Express server is running at http://localhost:${port}`);
});

// app.get('/', (req, res) => {
//   const app = ReactDOMServer.renderToPipeableStream(<App />);
//   // const app = ReactDOMServer.renderToReadableStream(<App />);

//   const html = `
//         <html lang="en">
//         <head>
//             <script src="app.js" async defer></script>
//         </head>
//         <body>
//             <div id="root">
//               <div>Hello world Server</div>
//               <div>${app}</div>
//             </div>
//         </body>
//         </html>
//     `;
//   res.send(html);
// });

// app.use(express.static('./built'));

// app.listen(4242);
