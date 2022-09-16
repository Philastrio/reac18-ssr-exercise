// import { build } from 'esbuild';
// import { nodeExternalsPlugin } from 'esbuild-node-externals';
// import fs from 'fs-extra';
const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const fs = require('fs-extra');

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist');
}

// fs.copy('./public', './dist', (err) => {
//   if (err) throw err;
// });

build({
  entryPoints: ['server/src/server.tsx'],
  bundle: true,
  outfile: 'built/server.js',
  logLevel: 'info',
  minify: true,
  tsconfig: './tsconfig.json',
  target: ['node14'],
  target: ['chrome58', 'firefox57', 'edge18', 'safari11'],
  sourcemap: true,
  format: 'esm',
  loader: {
    '.js': 'jsx',
    '.png': 'dataurl',
    '.jpeg': 'dataurl',
    '.jpg': 'dataurl',
  },
  publicPath: './dist',
  platform: 'node',
  // absWorkingDir: process.cwd(),
  // watch: {
  //   onRebuild(error, result) {
  //     if (error) console.error('watch build failed:', error);
  //     else console.log('watch build succeeded:', result);
  //   },
  // },
  plugins: [
    // sassPlugin({
    //   precompile(source, pathname) {
    //     const basedir = path.dirname(pathname);
    //     // console.log(basedir, "basedir");
    //     return source.replace(
    //       /(url\(['"]?)(\.\.?\/)([^'")]+['"]?\))/g,
    //       `$1${basedir}/$2$3`
    //     );
    //   },
    // }),
    // nodeExternalsPlugin(),
  ],
}).catch(() => process.exit(1));
