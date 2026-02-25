// src/store/modules/tareas.js
import axios from 'axios'

// Configuración de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Para json-server
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Estado inicial
const state = {
  items: [],
  loading: false,
  error: null
}

// Mutaciones (SÍNCRONAS)
const mutations = {
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
}

// Acciones (ASÍNCRONAS)
const actions = {
  async fetchTareas({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await apiClient.get('/tareas')
      commit('SET_TAREAS', response.data)
    } catch (error) {
      commit('SET_ERROR', 'Error al cargar tareas: ' + error.message)
      console.error('Error en fetchTareas:', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async agregarTarea({ commit }, nuevaTarea) {
    commit('SET_LOADING', true)
    try {
      // Validación básica antes de enviar
      if (!nuevaTarea.texto || nuevaTarea.texto.trim() === '') {
        throw new Error('La tarea no puede estar vacía')
      }

      const response = await apiClient.post('/tareas', {
        texto: nuevaTarea.texto.trim(),
        completada: false
      })
      
      commit('AGREGAR_TAREA', response.data)
      return response.data
    } catch (error) {
      const mensaje = error.response?.data?.message || error.message || 'Error al agregar tarea'
      commit('SET_ERROR', mensaje)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  }
}

// Getters (PROPIEDADES COMPUTADAS)
const getters = {
  tareasPendientes: (state) => state.items.filter(t => !t.completada),
  tareasCompletadas: (state) => state.items.filter(t => t.completada),
  totalTareas: (state) => state.items.length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}