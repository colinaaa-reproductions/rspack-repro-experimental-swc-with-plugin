import { createRequire } from "node:module";

import { rspack } from "@rspack/core";

const require = createRequire(import.meta.url);

const code = `
console.log('test')
`;

const result = await rspack.experiments.swc.transform(code, {
  jsc: {
    parser: {
      syntax: "ecmascript",
    },
    target: "es2018",
    experimental: {
      plugins: [[require.resolve("@swc/plugin-remove-console"), {}]],
    },
  },
  filename: "test.js",
});

console.log(result.code);
