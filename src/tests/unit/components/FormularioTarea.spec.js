// src/tests/unit/components/FormularioTarea.spec.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import FormularioTarea from '../../../components/FormularioTarea.vue'
import { createTestStore } from '../../setup'

describe('FormularioTarea', () => {
  let wrapper
  let store
  let dispatchMock

  const mountComponent = (loading = false) => {
    store = createTestStore(loading ? { loading: true } : {})

    dispatchMock = vi.fn().mockImplementation((action, payload) => {
      if (action === 'tareas/agregarTarea') {
        return Promise.resolve({ id: 3, ...payload })
      }
      return Promise.resolve()
    })

    store.dispatch = dispatchMock

    wrapper = mount(FormularioTarea, {
      global: {
        plugins: [store],
        stubs: {
          'v-card': { template: '<div><slot /></div>' },
          'v-card-title': { template: '<h3><slot /></h3>' },
          'v-card-text': { template: '<div><slot /></div>' },
          'v-form': { template: '<form><slot /></form>' },
          'v-text-field': {
            template:
              '<input type="text" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue']
          },
          'v-btn': {
            template: '<button :disabled="disabled"><slot /></button>',
            props: ['disabled', 'loading']
          },
          'v-icon': { template: '<span><slot /></span>' }
        }
      }
    })

    // Inyectar los mocks en $refs.form usando Object.defineProperty
    // para evitar el error "trap returned falsish for property '$refs'"
    Object.defineProperty(wrapper.vm.$refs, 'form', {
      value: {
        validate: vi.fn().mockResolvedValue({ valid: true }),
        reset: vi.fn()
      },
      writable: true,
      configurable: true
    })
  }

  beforeEach(() => {
    mountComponent()
  })

  it('debe renderizar sin errores', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h3').text()).toContain('Nueva Tarea')
  })

  it('debe tener campo de texto inicialmente vacío', () => {
    expect(wrapper.vm.tarea.texto).toBe('')
  })

  it('debe llamar a agregarTarea cuando el formulario es válido', async () => {
    // Establecer valor
    await wrapper.setData({ tarea: { texto: 'Nueva tarea' } })

    // Enviar formulario
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    // Verificar que se llamó a dispatch con los datos correctos
    expect(dispatchMock).toHaveBeenCalledWith(
      'tareas/agregarTarea',
      { texto: 'Nueva tarea' }
    )
  })

  it('debe deshabilitar el botón cuando loading es true', async () => {
    mountComponent(true)
    await wrapper.vm.$nextTick()

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })
})