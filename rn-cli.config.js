// const blacklist = require("metro/src/blacklist");

module.exports = {
    getTransformModulePath () {
        return require.resolve("react-native-typescript-transformer");
    },
    getSourceExts () {
        return ["ts", "tsx"];
    },
    // getBlacklistRE () {
    //     return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
    // },
};
