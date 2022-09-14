const esbuild = require("esbuild");
const fs = require("fs-extra");

if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

fs.copy("./public", "./dist", (err) => {
  if (err) throw err;
});

esbuild
  .build({
    entryPoints: ["client/src/index.tsx"],
    outfile: "built/app.js",
    logLevel: "info",

    minify: true,
    target: ["chrome58", "firefox57", "edge18", "safari11"],
    bundle: true,
    sourcemap: true,
    format: "esm",
    loader: {
      ".js": "jsx",
      ".png": "dataurl",
      ".jpeg": "dataurl",
      ".jpg": "dataurl",
    },
    publicPath: "./dist",
    platform: "node",
    // absWorkingDir: process.cwd(),
    // watch: {
    //   onRebuild(error, result) {
    //     if (error) console.error("watch build failed:", error);
    //     else console.log("watch build succeeded:", result);
    //   },
    // },
    // plugins: [
    //   sassPlugin({
    //     precompile(source, pathname) {
    //       const basedir = path.dirname(pathname);
    //       // console.log(basedir, "basedir");
    //       return source.replace(
    //         /(url\(['"]?)(\.\.?\/)([^'")]+['"]?\))/g,
    //         `$1${basedir}/$2$3`
    //       );
    //     },
    //   }),
    // ],
  })
  .catch(() => process.exit(1));
