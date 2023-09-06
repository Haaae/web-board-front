// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: "http://127.0.0.1:8080"
  }
}
// defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ]
// })
