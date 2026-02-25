

Perfecto! Veo que ya tienes todo instalado correctamente. El proyecto base ya existe (veo que tienes `vite` y `@vitejs/plugin-vue`). Ahora voy a proporcionarte **todos los códigos finales y la estructura completa** para que tu aplicación funcione sin problemas.

# 📁 ESTRUCTURA FINAL DE CARPETAS

Crea esta estructura exacta dentro de `E:\CLASES\PF1161\M7\MÓDULO 7-20251105T122658Z-1-001\MÓDULO 7\L3\gestor-tareas-vuex\src\`:

```
src/
├── assets/
│   └── (vacío, no necesitas crear nada aquí)
├── components/
│   ├── FormularioTarea.vue
│   └── ListaTareas.vue
├── plugins/
│   └── vuetify.js
├── store/
│   ├── index.js
│   └── modules/
│       └── tareas.js
├── App.vue
├── main.js
└── style.css (si existe, puedes mantenerlo o borrarlo)
```

---

# 📝 CÓDIGOS COMPLETOS (LISTOS PARA COPIAR Y PEGAR)

## **1. Primer archivo: `src/plugins/vuetify.js`**

```javascript
// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        }
      }
    }
  }
})
```

---

## **2. Segundo archivo: `src/store/modules/tareas.js`**

```javascript
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
```

---

## **3. Tercer archivo: `src/store/index.js`**

```javascript
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
```

---

## **4. Cuarto archivo: `src/components/FormularioTarea.vue`**

```vue
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
```

---

## **5. Quinto archivo: `src/components/ListaTareas.vue`**

```vue
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
```

---

## **6. Sexto archivo: `src/App.vue`**

```vue
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
```

---

## **7. Séptimo archivo: `src/main.js`**

```javascript
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

// Crear la aplicación
const app = createApp(App)

// Usar plugins
app.use(store)
app.use(vuetify)

// Montar la aplicación
app.mount('#app')
```

---

## **8. Octavo archivo: `db.json` (en la raíz del proyecto)**

```json
{
  "tareas": [
    {
      "id": 1,
      "texto": "Aprender los fundamentos de Vuex",
      "completada": true
    },
    {
      "id": 2,
      "texto": "Configurar el store modular",
      "completada": true
    },
    {
      "id": 3,
      "texto": "Implementar acciones asíncronas con Axios",
      "completada": false
    },
    {
      "id": 4,
      "texto": "Conectar componentes al store usando mapState",
      "completada": false
    },
    {
      "id": 5,
      "texto": "Manejar errores de manera elegante",
      "completada": false
    },
    {
      "id": 6,
      "texto": "Aplicar buenas prácticas de seguridad en el frontend",
      "completada": false
    }
  ]
}
```

---

# 🚀 INSTRUCCIONES FINALES DE EJECUCIÓN

## **PASO 1: Verificar que estás en la carpeta correcta**
```bash
cd "E:\CLASES\PF1161\M7\MÓDULO 7-20251105T122658Z-1-001\MÓDULO 7\L3\gestor-tareas-vuex"
```

## **PASO 2: Iniciar JSON Server (Terminal 1)**
```bash
npx json-server --watch db.json --port 3000
```
Deberías ver:
```
JSON Server started on PORT :3000
Press Ctrl+C to stop
```

## **PASO 3: Iniciar la aplicación Vue (Terminal 2 - NUEVA)**
Abre UNA NUEVA TERMINAL (no cierres la de JSON Server) y ejecuta:
```bash
cd "E:\CLASES\PF1161\M7\MÓDULO 7-20251105T122658Z-1-001\MÓDULO 7\L3\gestor-tareas-vuex"
npm run dev
```

## **PASO 4: Abrir el navegador**
- Ve a: **http://localhost:5173**
- Haz click en "Login Demo"
- ¡La aplicación debería funcionar perfectamente!

---

# ✅ VERIFICACIÓN FINAL

La aplicación debe:
1. Mostrar tareas cargadas desde JSON Server
2. Permitir agregar nuevas tareas (solo después del login)
3. Tener tabs para filtrar tareas
4. Mostrar contadores de tareas
5. Tener diseño responsive con Vuetify
6. Manejar errores elegantemente

Si todo funciona, ¡felicidades! Tienes un ejemplo completo y profesional de Vuex + Vuetify para tu portafolio.