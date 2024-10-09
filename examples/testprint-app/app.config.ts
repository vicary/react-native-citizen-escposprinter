import type { ConfigContext, ExpoConfig } from "@expo/config";
import { config } from "dotenv";
import * as path from "node:path";

config({
  path: [
    path.resolve(__dirname, ".env.local"),
    path.resolve(__dirname, ".env"),
  ],
});

const newArchEnabled = ["1", "true", "yes", "on", "enabled"].includes(
  process.env.RCT_NEW_ARCH_ENABLED?.toLowerCase().trim()!,
);

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "TestPrint",
  slug: "testprint-app",
  icon: "./assets/images/icon.png",
  scheme: "testprint",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.example.testprintapp",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.example.testprintapp",
    permissions: ["android.permission.ACCESS_WIFI_STATE"],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-font",
    "expo-router",
    [
      "expo-build-properties",
      {
        ios: { newArchEnabled },
        android: { newArchEnabled },
      },
    ],
    [
      "expo-dev-launcher",
      {
        launchMode: "most-recent",
      },
    ],
  ],
  experiments: {
    turboModules: newArchEnabled,
    typedRoutes: true,
  },
});
