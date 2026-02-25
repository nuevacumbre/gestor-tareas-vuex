<!-- src/components/FormularioTarea.vue -->
<template>
  <v-card class="ma-4" elevation="2">
    <v-card-title class="bg-primary text-white">
      <v-icon start icon="mdi-plus-circle"></v-icon>
      Nueva Tarea
    </v-card-title>
    
    <v-card-text class="pt-4">
      <v-form @submit.prevent="guardarTarea" ref="form" v-model="valido">
        <v-text-field
          v-model="tarea.texto"
          label="¿Qué necesitas hacer?"
          :rules="reglasTexto"
          required
          variant="outlined"
          :disabled="loading"
          clearable
          counter="100"
          maxlength="100"
          prepend-inner-icon="mdi-format-list-text"
        ></v-text-field>
        
        <v-btn
          type="submit"
          color="primary"
          :loading="loading"
          block
          size="large"
          :disabled="!valido"
        >
          <v-icon start icon="mdi-content-save"></v-icon>
          Agregar Tarea
        </v-btn>
      </v-form>
    </v-card-text>

    <!-- Mensaje de ayuda -->
    <v-card-text v-if="!usuario" class="bg-grey-lighten-3 text-center">
      <v-icon color="warning" icon="mdi-information"></v-icon>
      Inicia sesión para agregar tareas
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FormularioTarea',
  data() {
    return {
      tarea: {
        texto: ''
      },
      valido: false,
      reglasTexto: [
        v => !!v || 'La tarea es requerida',
        v => (v && v.length >= 3) || 'La tarea debe tener al menos 3 caracteres',
        v => (v && v.length <= 100) || 'La tarea no puede exceder 100 caracteres'
      ]
    }
  },
  computed: {
    ...mapState('tareas', ['loading']),
    ...mapState(['usuario'])
  },
  methods: {
    ...mapActions('tareas', ['agregarTarea']),
    
    async guardarTarea() {
      // Validar que el formulario sea válido
      const { valid } = await this.$refs.form.validate()
      if (!valid) return

      try {
        await this.agregarTarea({
          texto: this.tarea.texto
        })
        
        // Limpiar formulario
        this.tarea.texto = ''
        this.$refs.form.reset()
        
        // Mostrar mensaje de éxito (opcional)
        // Podrías usar un snackbar aquí
      } catch (error) {
        // Error manejado en el store
        console.error('Error al guardar:', error)
      }
    }
  }
}
</script>