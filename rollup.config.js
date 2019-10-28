import vue from "rollup-plugin-vue";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import babel from "rollup-plugin-babel";

export default {
  external: ["vue", "bootstrap-vue"],
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "esm"
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
    vue({
      style: {
        preprocessOptions: {
          scss: {
            includePaths: ["node_modules"]
          }
        }
      }
    }),
    babel({
      rootMode: "upward",
      extensions: [".ts", ".js", ".vue"]
    }),
    postcss()
  ]
};
