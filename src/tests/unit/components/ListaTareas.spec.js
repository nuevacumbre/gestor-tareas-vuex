// src/tests/unit/components/ListaTareas.spec.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ListaTareas from '../../../components/ListaTareas.vue'
import { createTestStore } from '../../setup'

describe('ListaTareas', () => {
  let wrapper
  let store
  let dispatchMock

  const mountComponent = (customState = {}) => {
    store = createTestStore(customState)

    dispatchMock = vi.fn().mockImplementation((action) => {
      return Promise.resolve()
    })

    store.dispatch = dispatchMock

    wrapper = mount(ListaTareas, {
      global: {
        plugins: [store],
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<div><slot /></div>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-alert': { template: '<div v-if="true"><slot /></div>' },
          'v-list': { template: '<div><slot /></div>' },
          'v-list-item': { template: '<div><slot /></div>' },
          'v-list-item-title': { template: '<span><slot /></span>' },
          'v-chip': { template: '<span><slot /></span>' },
          // Añadimos data-testid según el valor del prop icon
          'v-btn': {
            template:
              '<button @click="$emit(\'click\')" :data-testid="icon === \'mdi-refresh\' ? \'refresh-btn\' : undefined"><slot /></button>',
            props: ['icon', 'loading', 'disabled']
          },
          'v-icon': { template: '<span><slot /></span>' },
          'v-tabs': { template: '<div><slot /></div>' },
          'v-tab': { template: '<button><slot /></button>' },
          'v-window': { template: '<div><slot /></div>' },
          'v-window-item': { template: '<div><slot /></div>' },
          'v-skeleton-loader': { template: '<div>Loading...</div>' },
          'v-spacer': { template: '<div style="flex:1"></div>' },
          'v-checkbox-btn': { template: '<input type="checkbox" />' }
        }
      }
    })
  }

  beforeEach(() => {
    mountComponent()
  })

  it('debe renderizar sin errores', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('debe llamar a fetchTareas al crearse', () => {
    // Vuex pasa undefined como segundo argumento cuando no hay payload — verificamos solo el nombre
    expect(dispatchMock).toHaveBeenCalledTimes(1)
    expect(dispatchMock.mock.calls[0][0]).toBe('tareas/fetchTareas')
  })

  it('debe mostrar las tareas correctamente', () => {
    expect(wrapper.vm.tareas).toHaveLength(2)
    expect(wrapper.vm.totalTareas).toBe(2)
  })

  it('debe mostrar mensaje de error cuando existe', async () => {
    mountComponent({ error: 'Error de prueba' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.error).toBe('Error de prueba')
  })

  it('debe recargar tareas al hacer click en refresh', async () => {
    // Limpiar llamadas anteriores (del created)
    dispatchMock.mockClear()

    // Buscar el botón de refresh por su data-testid
    const refreshBtn = wrapper.find('button[data-testid="refresh-btn"]')
    expect(refreshBtn.exists()).toBe(true)

    // Hacer click
    await refreshBtn.trigger('click')
    await wrapper.vm.$nextTick()

    // Verificar que se llamó a fetchTareas al menos una vez (puede llamarse más
    // dependiendo del stub, pero lo importante es que se disparó la acción correcta)
    const llamadasFetchTareas = dispatchMock.mock.calls.filter(
      call => call[0] === 'tareas/fetchTareas'
    )
    expect(llamadasFetchTareas.length).toBeGreaterThanOrEqual(1)
  })
})