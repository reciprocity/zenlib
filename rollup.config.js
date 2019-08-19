import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

export default {
  external: ["vue", "bootstrap-vue"],
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),
    commonjs({
      include: /node_modules/
    }),
    typescript({
      tsconfig: false,
      experimentalDecorators: true,
      module: "es2015"
    }),
    vue({
      style: {
        preprocessOptions: {
          scss: {
            includePaths: ["node_modules"]
          }
        }
      }
    }),
    postcss()
  ]
};
