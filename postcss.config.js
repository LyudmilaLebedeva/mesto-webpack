module.exports = {
  plugins: [
    require("cssnano")({
      // подключили cssnano
      preset: "default", // выбрали настройки по умолчанию
    }),
    require("autoprefixer")({
      browsers: "last 10 versions",
    }),
  ],
};
