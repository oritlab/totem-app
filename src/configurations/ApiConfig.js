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
    ProductDetails: function (sku) {
      return "/products/" + sku;
    },
    Categories: function () {
      return "/v1/categories";
    },
    CategoryProducts: function (categoryId, params) {
      const query = buildQueryString(params);
      return "/v1/categories/" + categoryId + "/products?" + query;
    },
    CategoryFilters: function (categoryId, params) {
      const query = buildQueryString(params);
      return "/v1/categories/" + categoryId + "/filters?" + query;
    },
  },
};

// Suporta valores em array (ex: { metal: ["OURO", "PRATA"] }) gerando chaves
// repetidas (?metal=OURO&metal=PRATA) — é assim que o backend (qs/Nest)
// espera múltiplos valores do mesmo filtro.
function buildQueryString(params) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(function ([key, value]) {
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        query.append(key, item);
      });
    } else if (value !== undefined && value !== null) {
      query.append(key, value);
    }
  });
  return query.toString();
}
