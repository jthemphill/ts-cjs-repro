export default [
  {
    input: "./src/index.js",
    output: {
      name: "Y",
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
  },
  {
    input: "./src/index.js",
    output: {
      name: "Y",
      file: "dist/index.mjs",
      format: "esm",
      sourcemap: true,
    },
  },
];
