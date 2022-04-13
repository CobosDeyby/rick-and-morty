import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [],
    charactersFilter: [],
    page: 1,
    pages: 1
  },
  getters: {
  },
  mutations: {
    setCharacters(state, payload){
      state.characters = payload
    },
    setCharactersFilter(state, payload){
      state.charactersFilter = payload
    },
    setPages(state, payload){
      state.pages = payload
    },
    setPage(state, payload){
      state.page = payload
    }
  },
  actions: {
    async getCharacters({commit}, page){
      try{

        const response = await fetch('https://rickandmortyapi.com/api/character/'+ '?page='+page)
        const data = await response.json()
        commit('setCharacters', data.results)
        commit('setCharactersFilter', data.results)
        commit('setPages', data.info)

      } catch(e){
        console.log(e)
      }
    },
    FilterByStatus({commit, state}, status) {
      const results = state.characters.filter((character) =>{
      return character.status.includes(status)
    })
    commit('setCharactersFilter', results)
    },
    FilterByName({commit, state}, name){
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character) =>{
        const characterName = character.name.toLowerCase()

        if(characterName.includes(formatName)){
          return character
        }
        
      })
    commit('setCharactersFilter', results)
    },
    SetPagination({commit}){
      commit('setPages', this.setPages)
    },
    SetPage({state, dispatch }, page){
      state.page = page
      dispatch('getCharacters',page)
    }
  },
  modules: {
  }
})
