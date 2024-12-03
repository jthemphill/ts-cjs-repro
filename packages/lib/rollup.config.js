import copy from "rollup-plugin-copy";

export default [
  {
    input: "./src/index.js",
    output: {
      name: "Y",
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [
      copy({
        targets: [
          {
            src: "./dist/src/index.d.ts",
            dest: "./dist",
            rename: "index.d.cts",
          },
        ],
      }),
    ],
  },
  {
    input: "./src/index.js",
    output: {
      name: "Y",
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      copy({
        targets: [
          {
            src: "./dist/src/index.d.ts",
            dest: "./dist",
            rename: "index.d.mts",
          },
        ],
      }),
    ],
  },
];
