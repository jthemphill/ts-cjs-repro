import { readFile } from "fs/promises";
import path from "node:path";

/**
 * Each `.d.ts` file must represent exactly one JavaScript file in the final output.
 *
 * This plugin copies `dist/src/index.d.ts` into
 *  - `dist/yjs.d.cts` (which represents `dist/yjs.cjs`)
 *  - `dist/yjs.d.mts` (which represents `dist/yjs.mjs`)
 *
 * @param {string} fileName
 * @param {string} inputFile
 * @returns {import('rollup').Plugin}
 */
function copyTypeDeclarations(fileName, inputFile = "./dist/src/index.d.ts") {
  return {
    async generateBundle(_options, _bundle, isWrite) {
      if (isWrite) {
        let source = await readFile(path.resolve(inputFile), "utf8");
        this.emitFile({ fileName, source, type: "asset" });
      }
    },
    name: "copy-type-declarations",
  };
}

export default [
  {
    input: "./src/index.js",
    output: {
      name: "Y",
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [copyTypeDeclarations("index.d.cts")],
  },
  {
    input: "./src/index.js",
    output: {
      name: "Y",
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
    plugins: [copyTypeDeclarations("index.d.mts")],
  },
];
