This is a reproduction of a problem I've encountered when trying to migrate TypeScript's `compilerOptions.module: "node"` to `compilerOptions.module: "node16"`.

Our codebase imports the popular library [YJS](https://github.com/yjs/yjs/). This library provides a CommonJS version which consumers can `require()`, and a module version which consumers can `import`.

However, if you try to use the package from a CommonJS project with `node16` module resolution, TypeScript will incorrectly throw an error:

```
ts-cjs-repro/packages/app % pnpm build

> app@ build /Users/jhemphill/oss/ts-cjs-repro/packages/app
> tsc

index.ts:1:23 - error TS1479: The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("lib")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/Users/jhemphill/oss/ts-cjs-repro/packages/app/package.json'.

1 import * as dual from "lib";
                        ~~~~~


Found 1 error in index.ts:1
```

TypeScript tells us that we are trying to `require()` a module, which is not true. TypeScript does generate a `require()` call. But NodeJS's module resolution respects the `exports["."].require` setting on `lib/package.json`, so Node will actually `require()` the CommonJS version, `index.cjs`.

There are two packages in this repository:

* `packages/lib` is a simplified version of `yjs`.
  * It uses `"type": "module"` inside of `package.json`.
  * It uses Rollup to build `index.cjs` and `index.mjs` from `index.js`.
  * It uses TypeScript in `declarationOnly` mode to build `index.d.ts` from `index.js`.
* `packages/app` is a simplified consumer of `yjs`.
  * It does not use `"type": "module"` inside of `package.json`.
  * It tries to use `packages/lib`, and runs into a TypeScript error.

To build and run the package, you will need to install `pnpm`. You can run the repro with

```sh
cd packages/app
pnpm install
pnpm run build
```
