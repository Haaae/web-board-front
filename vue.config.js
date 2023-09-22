// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: "http://ec2-52-78-164-213.ap-northeast-2.compute.amazonaws.com:8080"
  }
}
// defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ]
// })
