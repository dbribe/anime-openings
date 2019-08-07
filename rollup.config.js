import {getBuildPath, globalPlugins} from "./global.rollup.config";

export default {
    input: "Bundle.js",
    plugins: globalPlugins,
    output: {
        file: getBuildPath( "page.js"),
        format: "iife",
        name: "Bundle",
        sourcemap: true,
    },
};
