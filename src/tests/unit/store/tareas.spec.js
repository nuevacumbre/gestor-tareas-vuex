// src/tests/unit/store/tareas.spec.js
import { describe, it, expect, beforeEach } from 'vitest'
import tareasModule from '../../../store/modules/tareas'
//import axios from 'axios'

// Creamos un mock completo de Axios
//vi.mock('axios')
//const mockedAxios = axios

describe('Módulo Vuex: tareas', () => {
  let state

  beforeEach(() => {
    // Reiniciamos el estado antes de cada prueba
    state = {
      items: [],
      loading: false,
      error: null
    }
  })

  // --- PRUEBAS DE MUTATIONS ---
  describe('mutations', () => {
    it('SET_TAREAS: debe asignar las tareas y limpiar el error', () => {
      const tareasMock = [{ id: 1, texto: 'Test', completada: false }]
      
      tareasModule.mutations.SET_TAREAS(state, tareasMock)
      
      expect(state.items).toEqual(tareasMock)
      expect(state.error).toBeNull()
    })

    it('AGREGAR_TAREA: debe agregar una nueva tarea al inicio del array', () => {
      state.items = [{ id: 1, texto: 'Tarea 1', completada: false }]
      const nuevaTarea = { id: 2, texto: 'Tarea 2', completada: true }
      
      tareasModule.mutations.AGREGAR_TAREA(state, nuevaTarea)
      
      expect(state.items).toHaveLength(2)
      expect(state.items[0]).toEqual(nuevaTarea) // Verifica que se agregó al inicio
    })

    it('SET_LOADING: debe cambiar el estado de loading', () => {
      tareasModule.mutations.SET_LOADING(state, true)
      expect(state.loading).toBe(true)
      
      tareasModule.mutations.SET_LOADING(state, false)
      expect(state.loading).toBe(false)
    })

    it('SET_ERROR: debe asignar un mensaje de error', () => {
      const errorMsg = 'Error de conexión'
      tareasModule.mutations.SET_ERROR(state, errorMsg)
      expect(state.error).toBe(errorMsg)
    })
  })

  // --- PRUEBAS DE GETTERS ---
  describe('getters', () => {
    beforeEach(() => {
      state.items = [
        { id: 1, texto: 'Tarea 1', completada: false },
        { id: 2, texto: 'Tarea 2', completada: true },
        { id: 3, texto: 'Tarea 3', completada: false }
      ]
    })

    it('tareasPendientes: debe retornar solo las tareas no completadas', () => {
      const pendientes = tareasModule.getters.tareasPendientes(state)
      expect(pendientes).toHaveLength(2)
      expect(pendientes.every(t => !t.completada)).toBe(true)
    })

    it('tareasCompletadas: debe retornar solo las tareas completadas', () => {
      const completadas = tareasModule.getters.tareasCompletadas(state)
      expect(completadas).toHaveLength(1)
      expect(completadas[0].id).toBe(2)
    })

    it('totalTareas: debe retornar el número total de tareas', () => {
      const total = tareasModule.getters.totalTareas(state)
      expect(total).toBe(3)
    })
  })
})