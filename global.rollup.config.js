import babel from 'rollup-plugin-babel';
import includePaths from "rollup-plugin-includepaths";
import replace from 'rollup-plugin-replace';
import uglify from "rollup-plugin-uglify";

const fs = require("fs");
const path = require('path');

let rootDir = __dirname;
while (!fs.existsSync(path.join(rootDir, "package.json"))) {
    rootDir = path.dirname(rootDir);
    if (rootDir === path.dirname(rootDir)) {
        exit("Can't find package.json in the path tree.");
    }
}
rootDir = path.normalize(rootDir + "/");

const includePathOptions = {
    paths: [
        rootDir,
        path.join(rootDir, "stem-core", "src")
    ],
    extensions: [".jsx", ".js"],
};

const babelOptions = {
    babelrc: false,
    plugins: [
        [
            "@babel/plugin-transform-react-jsx",
            {
                pragma: "UI.createElement"
            }
        ],
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true
            }
        ],
        ["@babel/plugin-proposal-class-properties", { loose : true }],
    ],
    runtimeHelpers: true,
    presets: [
        [
            "@babel/env",
            {
                modules: false,
                // useBuiltIns: "usage",
                targets: "> 0.25%, not dead",
                // debug: true,
                // loose: true, // Make code more compact, is not 100% compatible with ES6 specs
            }
        ]
    ]
};

const globalPlugins = [
    includePaths(includePathOptions),
    babel(babelOptions),
    // progress(),
    // analyzer({limit: 5, hideDeps: true}),
];

function getBuildPath(...paths) {
    return path.join(rootDir, ...paths);
}

export {globalPlugins, getBuildPath}
