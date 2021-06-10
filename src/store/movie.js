import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _dafaultMessage = 'Search for the movie title!'

export default {
  namespaced: true, //module! 
  // data
  state: () => ({
    movies: [],
    message: _dafaultMessage,
    loading: false,
    theMovie: {}
  }), 
  getters: {},
  // methods
  // 변이
  mutations: { //commit 
    updateState(state, payload){
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]

      })
    },
    resetMovies(state){
      state.movies = []
      state.message = _dafaultMessage
      state.loading = false
    }
  }, 
  // 비동기
  actions: {
    async searchMovies({state, commit}, payload){
      if(state.loading) return

      commit('updateState', {
        message: '',
        loading: true
      })

      try{
        const res = await _fetchMovie({
          ...payload, 
          page: 1
        })
        const {Search, totalResults} = res.data
        commit('updateState',{
          movies: _uniqBy(Search, 'imdbID')
        })
        // console.log(totalResults) 268
        // console.log(typeof totalResults) string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
        
        // 추가 요청 전송!
        if(pageLength > 1){
          for(let page = 2 ; page <= pageLength ; page++ ){
            if (page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState',{
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID') //lodash _uniqBy([배열], 속성이름) 중복제거
              ]
            })
          }
        }
      }catch({ message }){
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({state, commit}, payload) {
      if(state.loading) return

      commit('updateState',{
        theMovie: {},
        loading: true
      })
      try {
        const res = await _fetchMovie(payload)
        commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}
// _ movie.js 내부에서만 사용한다는 의미
async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}