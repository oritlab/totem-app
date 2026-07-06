export const ApiConfig = {
  Host: {
    production: process.env.NEXT_PUBLIC_API_URL,
    totemImages: process.env.NEXT_PUBLIC_TOTEM_CDN_HOST + "/totem-images/",
    totemVideos: process.env.NEXT_PUBLIC_TOTEM_CDN_HOST + "/video/",
  },
  Router: {
    TotemImage: function (name) {
      return ApiConfig.Host.totemImages + name + ".jpg";
    },
    TotemVideo: function (name) {
      return ApiConfig.Host.totemVideos + name + ".mp4";
    },
  },
};
