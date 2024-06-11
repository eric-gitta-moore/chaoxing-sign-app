/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 在找更好的方案 postcss-px-to-viewport-8-plugin
    "postcss-mobile-forever": {
      viewportWidth: 375,
      maxDisplayWidth: 500,
      unitPrecision: 5,
      appSelector: "#__app",
      appContainingBlock: "auto",
      necessarySelectorWhenAuto: "#__app-wrapper",
      experimental: {
        minDisplayWidth: 300,
      },
    },
  },
};

module.exports = config;
