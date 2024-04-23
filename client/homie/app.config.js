export default {
  expo: {
    name: "homie",
    slug: "homie",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.nguyenbahai.homie",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "09093910-a363-4fa7-ada1-d647c03859d1",
      },
    },
    plugins: [
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsDownloadToken: process.env.MAP_BOX_PRIVATE_KEY,
        },
      ],
      [
        "expo-location",
        {
          locationWhenInUsePermission: "Cho phép HOMiE sử dụng vị trí của bạn.",
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "Cho phép HOMiE truy cập kho ảnh của bạn.",
          cameraPermission: "Cho phép HOMiE sử dụng sử dụng camera của bạn.",
        },
      ],
    ],
  },
};
