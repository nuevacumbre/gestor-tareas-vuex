<!-- src/components/ListaTareas.vue -->
<template>
  <v-card class="ma-4" elevation="2">
    <v-card-title class="d-flex align-center">
      <v-icon start icon="mdi-format-list-checkbox"></v-icon>
      Lista de Tareas
      <v-spacer></v-spacer>
      <v-chip
        :color="tareasPendientes.length > 0 ? 'warning' : 'success'"
        class="ma-2"
      >
        Pendientes: {{ tareasPendientes.length }}
      </v-chip>
      <v-chip color="info" class="ma-2">
        Total: {{ totalTareas }}
      </v-chip>
      <v-btn
        icon="mdi-refresh"
        variant="text"
        :loading="loading"
        @click="cargarTareas"
        :disabled="loading"
      ></v-btn>
    </v-card-title>

    <v-card-text>
      <!-- Mensaje de error -->
      <v-alert
        v-if="error"
        type="error"
        closable
        @click:close="limpiarError"
        class="mb-4"
        variant="tonal"
      >
        <v-icon start icon="mdi-alert"></v-icon>
        {{ error }}
      </v-alert>

      <!-- Tabs para filtrar -->
      <v-tabs
        v-model="tab"
        color="primary"
        align-tabs="center"
        class="mb-4"
      >
        <v-tab value="todas">Todas</v-tab>
        <v-tab value="pendientes">Pendientes</v-tab>
        <v-tab value="completadas">Completadas</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="todas">
          <v-list v-if="tareas.length > 0">
            <v-list-item
              v-for="tarea in tareas"
              :key="tarea.id"
              class="mb-2 border rounded"
            >
              <template v-slot:prepend>
                <v-checkbox-btn
                  :model-value="tarea.completada"
                  @update:model-value="toggleTarea(tarea)"
                  :disabled="loading"
                  :color="tarea.completada ? 'success' : 'primary'"
                ></v-checkbox-btn>
              </template>

              <v-list-item-title 
                :class="{
                  'text-decoration-line-through text-grey': tarea.completada,
                  'font-weight-bold': !tarea.completada
                }"
              >
                {{ tarea.texto }}
              </v-list-item-title>

              <template v-slot:append>
                <v-chip
                  :color="tarea.completada ? 'success' : 'warning'"
                  size="x-small"
                >
                  {{ tarea.completada ? 'Completada' : 'Pendiente' }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="pendientes">
          <v-list v-if="tareasPendientes.length > 0">
            <v-list-item
              v-for="tarea in tareasPendientes"
              :key="tarea.id"
              class="mb-2 border rounded"
            >
              <template v-slot:prepend>
                <v-checkbox-btn
                  :model-value="tarea.completada"
                  @update:model-value="toggleTarea(tarea)"
                  :disabled="loading"
                  color="warning"
                ></v-checkbox-btn>
              </template>

              <v-list-item-title class="font-weight-bold">
                {{ tarea.texto }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-window-item>

        <v-window-item value="completadas">
          <v-list v-if="tareasCompletadas.length > 0">
            <v-list-item
              v-for="tarea in tareasCompletadas"
              :key="tarea.id"
              class="mb-2 border rounded"
            >
              <template v-slot:prepend>
                <v-checkbox-btn
                  :model-value="tarea.completada"
                  @update:model-value="toggleTarea(tarea)"
                  :disabled="loading"
                  color="success"
                ></v-checkbox-btn>
              </template>

              <v-list-item-title class="text-decoration-line-through text-grey">
                {{ tarea.texto }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-window-item>
      </v-window>

      <!-- Mensaje cuando no hay tareas -->
      <v-alert
        v-if="!loading && tareas.length === 0"
        type="info"
        variant="tonal"
        class="text-center"
      >
        <v-icon icon="mdi-information" size="large"></v-icon>
        <div class="mt-2">No hay tareas. ¡Agrega una usando el formulario!</div>
      </v-alert>

      <!-- Skeleton loader mientras carga -->
      <v-skeleton-loader
        v-if="loading && !tareas.length"
        type="list-item-three-line"
        class="mt-4"
      ></v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ListaTareas',
  data() {
    return {
      tab: 'todas'
    }
  },
  computed: {
    ...mapState('tareas', {
      tareas: state => state.items,
      loading: state => state.loading,
      error: state => state.error
    }),
    ...mapGetters('tareas', ['tareasPendientes', 'tareasCompletadas', 'totalTareas'])
  },
  methods: {
    ...mapActions('tareas', ['fetchTareas']),
    ...mapMutations('tareas', ['SET_ERROR']),
    
    cargarTareas() {
      this.fetchTareas()
    },
    
    limpiarError() {
      this.SET_ERROR(null)
    },
    
    toggleTarea(tarea) {
      // Aquí iría la acción de actualizar (para el portafolio)
      console.log('Toggle tarea:', tarea.id, 'Estado actual:', tarea.completada)
      // Mostramos un mensaje visual de que esta función está en desarrollo
      alert('Función de actualización en desarrollo para el portafolio')
    }
  },
  created() {
    this.cargarTareas()
  }
}
</script>