<!-- src/App.vue -->
<template>
  <v-app>
    <!-- Barra superior -->
    <v-app-bar color="primary" density="comfortable" elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <v-icon start icon="mdi-checkbox-marked-circle"></v-icon>
        Gestor de Tareas Profesional
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <!-- Menú de usuario -->
      <v-menu v-if="isAuthenticated" offset-y>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text">
            <v-icon start icon="mdi-account-circle"></v-icon>
            {{ currentUser?.nombre || 'Usuario' }}
            <v-icon end icon="mdi-chevron-down"></v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon start icon="mdi-logout"></v-icon>
              Cerrar Sesión
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-else
        variant="text"
        @click="simularLogin"
        :loading="cargandoLogin"
      >
        <v-icon start icon="mdi-login"></v-icon>
        Login Demo
      </v-btn>
    </v-app-bar>

    <!-- Navigation drawer (menú lateral) -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          title="Inicio"
          value="home"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-information"
          title="Acerca de"
          value="about"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main>
      <v-container fluid>
        <v-row>
          <!-- Mensaje de bienvenida -->
          <v-col cols="12">
            <v-alert
              v-if="isAuthenticated"
              type="success"
              variant="tonal"
              class="mb-4"
            >
              <v-icon start icon="mdi-hand-wave"></v-icon>
              ¡Bienvenido, {{ currentUser?.nombre }}! Ya puedes gestionar tus tareas.
            </v-alert>
            <v-alert
              v-else
              type="info"
              variant="tonal"
              class="mb-4"
            >
              <v-icon start icon="mdi-information"></v-icon>
              Haz click en "Login Demo" para comenzar a probar la aplicación.
            </v-alert>
          </v-col>

          <!-- Columnas de componentes -->
          <v-col cols="12" md="5">
            <FormularioTarea />
          </v-col>
          
          <v-col cols="12" md="7">
            <ListaTareas />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="grey-lighten-3">
      <v-col class="text-center text-caption">
        <v-icon icon="mdi-copyright" size="x-small"></v-icon>
        {{ new Date().getFullYear() }} - Demostración Vuex + Vuetify para Módulo 7
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import FormularioTarea from './components/FormularioTarea.vue'
import ListaTareas from './components/ListaTareas.vue'

export default {
  name: 'App',
  components: {
    FormularioTarea,
    ListaTareas
  },
  data() {
    return {
      drawer: false,
      cargandoLogin: false
    }
  },
  computed: {
    ...mapState(['usuario']),
    ...mapGetters(['isAuthenticated', 'currentUser'])
  },
  methods: {
    ...mapActions(['login', 'logout']),
    
    async simularLogin() {
      this.cargandoLogin = true
      try {
        await this.login({
          email: 'demo@ejemplo.com',
          password: 'demo123' // Esto solo es para demostración
        })
      } catch (error) {
        console.error('Error en login:', error)
      } finally {
        this.cargandoLogin = false
      }
    }
  }
}
</script>

<style>
.v-main {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
}

/* Scrollbar personalizado */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #1976D2;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1565C0;
}
</style>