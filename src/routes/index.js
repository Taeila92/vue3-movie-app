import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'
export default createRouter({
  //hash
  // http://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top : 0 }
  },
  // routes = pages 구분
  //https://google.com/About
  routes:[
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie/:id',
      component: Movie
    },
    {
      path:'/about',
      component: About
    },
    {
      path:'/:notFound(.*)',
      component: NotFound
    }
  ]
})