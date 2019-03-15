module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "import",
      {
        "libraryName": "@ant-design/react-native"
      }
    ],
    [
      "@babel/transform-runtime",
      {
        "helpers": true,
        "regenerator": false
      }
    ],
    [
      "module-resolver",
      {
        "root": [
          "./src"
        ],
        "extensions": [
          ".ios.js",
          ".android.js",
          ".js",
          ".json"
        ],
        "alias": {
          "@": "./src",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@config": "./src/config",
          "@containers": "./src/containers",
          "@middleware": "./src/middleware",
          "@models": "./src/models",
          "@navigation": "./src/navigation",
          "@services": "./src/services",
          "@styles": "./src/styles",
          "@utils": "./src/utils"
        },
        "cwd": "babelrc"
      }
    ]
  ]
};
