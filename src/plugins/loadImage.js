export default {
  install(app) {
    app.config.globalProperties.$ = src => {
      return new Promise(resolve => {
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          resolve()
        })
      })
    }
  }
}