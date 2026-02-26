// src/tests/setup.js
import { config } from '@vue/test-utils'
import { createStore } from 'vuex'
import { vi } from 'vitest'
import tareasModule from '../store/modules/tareas'

// Mock para localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  }
})

// Mock para requestAnimationFrame
global.requestAnimationFrame = vi.fn()

// Crear un store real para pruebas
export const createTestStore = (customState = {}) => {
  const state = {
    items: customState.items || [
      { id: 1, texto: 'Tarea 1', completada: false },
      { id: 2, texto: 'Tarea 2', completada: true }
    ],
    loading: customState.loading || false,
    error: customState.error || null
  }

  const store = createStore({
    modules: {
      tareas: {
        namespaced: true,
        state: () => state,
        getters: tareasModule.getters,
        mutations: tareasModule.mutations,
        actions: tareasModule.actions
      }
    },
    state: {
      usuario: customState.usuario || { nombre: 'Test', autenticado: true }
    }
  })
  
  return store
}