import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/WebPageTestExportPlugin.js",
  output: {
    file: "dist/WebPageTestExportPlugin.js",
    format: "iife",
  },
  plugins: [
    nodeResolve({
      resolveOnly: ["webpagetest-chrome-recorder", "@puppeteer/replay"],
    }),
  ],
};
