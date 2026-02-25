// src/store/index.js
import { createStore } from 'vuex'
import tareas from './modules/tareas'

export default createStore({
  modules: {
    tareas
  },
  state: {
    usuario: null,
    autenticado: false
  },
  mutations: {
    SET_USUARIO(state, usuario) {
      state.usuario = usuario
      state.autenticado = !!usuario
    }
  },
  actions: {
    // Simulación de login para demostración
    login({ commit }, credenciales) {
      return new Promise((resolve, reject) => {
        // Simulamos una llamada API
        setTimeout(() => {
          if (credenciales.email && credenciales.password) {
            const usuario = {
              id: 1,
              nombre: credenciales.email.split('@')[0],
              email: credenciales.email,
              rol: 'usuario'
            }
            commit('SET_USUARIO', usuario)
            resolve(usuario)
          } else {
            reject(new Error('Credenciales inválidas'))
          }
        }, 500)
      })
    },
    
    logout({ commit }) {
      commit('SET_USUARIO', null)
    }
  },
  getters: {
    isAuthenticated: (state) => state.autenticado,
    currentUser: (state) => state.usuario
  }
})