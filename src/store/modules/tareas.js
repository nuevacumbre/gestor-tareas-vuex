// src/store/modules/tareas.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000
})

export default {
  namespaced: true,
  state: {
    items: [],
    loading: false,
    error: null
  },
  mutations: {
    SET_TAREAS(state, tareas) {
      state.items = tareas
      state.error = null
    },
    AGREGAR_TAREA(state, tarea) {
      state.items.unshift(tarea)
    },
    SET_LOADING(state, estado) {
      state.loading = estado
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    async fetchTareas({ commit }) {
      commit('SET_LOADING', true)
      try {
        const response = await apiClient.get('/tareas')
        commit('SET_TAREAS', response.data)
      } catch (error) {
        commit('SET_ERROR', 'Error al cargar tareas: ' + error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },
    async agregarTarea({ commit }, nuevaTarea) {
      commit('SET_LOADING', true)
      try {
        const response = await apiClient.post('/tareas', {
          texto: nuevaTarea.texto.trim(),
          completada: false
        })
        commit('AGREGAR_TAREA', response.data)
        return response.data
      } catch (error) {
        commit('SET_ERROR', 'Error al agregar tarea: ' + error.message)
        throw error
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },
  getters: {
    tareasPendientes: (state) => state.items.filter(t => !t.completada),
    tareasCompletadas: (state) => state.items.filter(t => t.completada),
    totalTareas: (state) => state.items.length
  }
}