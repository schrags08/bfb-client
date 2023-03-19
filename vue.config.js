module.exports = {
  lintOnSave: false,
  pluginOptions: {
    quasar: {
      importStrategy: "manual",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "BFB🍔";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "production" ? "/bfb-client/" : "/",
};
