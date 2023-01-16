"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.multiply = multiply;
var _reactNative = require("react-native");
const LINKING_ERROR =
  `The package 'react-native-citizen-escposprinter' doesn't seem to be linked. Make sure: \n\n` +
  _reactNative.Platform.select({
    ios: "- You have run 'pod install'\n",
    default: "",
  }) +
  "- You rebuilt the app after installing the package\n" +
  "- You are not using Expo Go\n";

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const CitizenEscposprinterModule = isTurboModuleEnabled
  ? require("./NativeCitizenEscposprinter").default
  : _reactNative.NativeModules.CitizenEscposprinter;
const CitizenEscposprinter = CitizenEscposprinterModule
  ? CitizenEscposprinterModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      },
    );
function multiply(a, b) {
  return CitizenEscposprinter.multiply(a, b);
}
//# sourceMappingURL=index.js.map
