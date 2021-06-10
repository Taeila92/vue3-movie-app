import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'
// 인덱스 생략가능 from './store/index.js'

createApp(App)
  .use(router) // $route, 
  .use(store) // $store
  .use(loadImage) // $loadImage
  .mount('#app')