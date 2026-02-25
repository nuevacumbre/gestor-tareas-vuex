Perfecto, entiendo. Tomando como base la estructura clara del README del proyecto de Bodyboard Gallery, voy a crear un README.md completamente nuevo y detallado para el ejercicio de **"Gestor de Tareas con Vue 3, Vuex y Vuetify"** que hemos estado construyendo. Este README será una guía paso a paso para tus alumnos.

---

```markdown
# 📋 GESTOR DE TAREAS - VUEX + VUETIFY (MÓDULO 7, LECCIÓN 3)

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)
![Vuex](https://img.shields.io/badge/Vuex-4.x-4FC08D?logo=vuex)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![Vuetify](https://img.shields.io/badge/Vuetify-3.x-1867C0?logo=vuetify)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios)
![JSON Server](https://img.shields.io/badge/JSON_Server-0.x-000000?logo=json)

**Proyecto educativo para el Módulo 7, Lección 3 (PF1161).**  
El objetivo es aprender a manejar el estado global de una aplicación con **Vuex**, siguiendo las mejores prácticas y aplicando conceptos de seguridad. La aplicación es un gestor de tareas que consume una API simulada con **JSON Server** y utiliza **Vuetify** para una interfaz de usuario profesional.

---

## 🎯 **Lo que Aprenderás**

Esta guía práctica te llevará paso a paso para que puedas:

1.  **Configurar un proyecto Vue 3 con Vite** sin errores de instalación.
2.  **Estructurar un store de Vuex de forma modular** (state, mutations, actions, getters).
3.  **Conectar componentes al store** usando `mapState`, `mapActions` y `mapGetters`.
4.  **Consumir una API REST** con Axios desde las actions de Vuex.
5.  **Implementar un backend simulado** con JSON Server para pruebas locales.
6.  **Aplicar buenas prácticas de seguridad** en el frontend (validación, manejo de errores, protección de datos sensibles).
7.  **Diseñar una interfaz moderna** con Vuetify 3.

---

## 🛠️ **Paso a Paso: Instalación y Configuración Perfecta**

Sigue estos pasos en orden para evitar cualquier error. Trabajaremos en la ruta que ya tienes creada: `E:\CLASES\PF1161\M7\MÓDULO 7-20251105T122658Z-1-001\MÓDULO 7\L3\gestor-tareas-vuex`

### **Paso 1: Verificar Versiones (Antes de Empezar)**

Abre una terminal (PowerShell o CMD) en la carpeta de tu proyecto y ejecuta:

```bash
node --version
npm --version
```

**Debes tener:**
*   **Node.js:** v16.0 o superior (tú tienes v22.18.0 ✅)
*   **npm:** v8.0 o superior (tú tienes 11.6.2 ✅)

> ⚠️ **Nota Importante:** No uses espacios ni caracteres especiales (como acentos) en las rutas de tu proyecto. La ruta actual es correcta, pero tenlo en cuenta para futuros proyectos.

### **Paso 2: Crear el Proyecto Base con Vite**

Si aún no tienes el proyecto creado, ejecuta:

```bash
npm create vite@latest gestor-tareas-vuex -- --template vue
cd gestor-tareas-vuex
```

Si ya tienes la carpeta y los archivos base (como en tu caso), salta este paso y continúa con el siguiente.

### **Paso 3: Instalar Dependencias (Versiones Correctas)**

**¡MUY IMPORTANTE!** No uses `@next` ni `@latest` sin verificar. Usa estos comandos exactos:

```bash
# Instalar Vuex 4 (para Vue 3)
npm install vuex@4

# Instalar Axios
npm install axios

# Instalar Vuetify 3 y sus dependencias
npm install vuetify@3
npm install @mdi/font      # Para iconos (opcional pero recomendado)

# Instalar JSON Server (para el backend simulado)
npm install -D json-server
```

**Verifica que las dependencias se hayan instalado correctamente:**

```bash
npm list --depth=0
```

Deberías ver algo similar a:
```
gestor-tareas-vuex@0.0.0 E:\...\gestor-tareas-vuex
├── @mdi/font@7.4.47
├── @vitejs/plugin-vue@... 
├── axios@1.13.5
├── json-server@...  
├── vite@...
├── vue@3.5.28
├── vuetify@3.12.0
└── vuex@4.1.0
```

### **Paso 4: Estructura de Carpetas (Organización Profesional)**

Dentro de `src/`, crea la siguiente estructura de carpetas. Puedes hacerlo manualmente o con comandos:

```bash
cd src
mkdir components plugins store store\modules
```

La estructura final debe verse así:

```
src/
├── assets/
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
└── style.css (puedes eliminarlo o conservarlo)
```

### **Paso 5: Configurar JSON Server (Backend Simulado)**

En la **RAÍZ** de tu proyecto (donde está el `package.json`), crea un archivo llamado `db.json` con el siguiente contenido:

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
    }
  ]
}
```

### **Paso 6: Agregar los Códigos Fuente**

Copia y pega los siguientes códigos en los archivos correspondientes. **Es crucial que respetes los nombres de archivo y carpetas.**

#### **Archivo: `src/plugins/vuetify.js`**
```javascript
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

#### **Archivo: `src/store/modules/tareas.js`**
```javascript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const state = {
  items: [],
  loading: false,
  error: null
}

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

const actions = {
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
    if (!nuevaTarea.texto || nuevaTarea.texto.trim() === '') {
      throw new Error('La tarea no puede estar vacía')
    }
    commit('SET_LOADING', true)
    try {
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

#### **Archivo: `src/store/index.js`**
```javascript
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
    login({ commit }, credenciales) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const usuario = {
            id: 1,
            nombre: credenciales.email.split('@')[0],
            email: credenciales.email
          }
          commit('SET_USUARIO', usuario)
          resolve(usuario)
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

#### **Archivo: `src/components/FormularioTarea.vue`**
```vue
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
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'FormularioTarea',
  data() {
    return {
      tarea: { texto: '' },
      valido: false,
      reglasTexto: [
        v => !!v || 'La tarea es requerida',
        v => (v && v.length >= 3) || 'Mínimo 3 caracteres',
        v => (v && v.length <= 100) || 'Máximo 100 caracteres'
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
      const { valid } = await this.$refs.form.validate()
      if (!valid) return
      try {
        await this.agregarTarea(this.tarea)
        this.tarea.texto = ''
        this.$refs.form.reset()
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }
}
</script>
```

#### **Archivo: `src/components/ListaTareas.vue`**
```vue
<template>
  <v-card class="ma-4" elevation="2">
    <v-card-title class="d-flex align-center">
      <v-icon start icon="mdi-format-list-checkbox"></v-icon>
      Lista de Tareas
      <v-spacer></v-spacer>
      <v-chip color="warning" class="ma-2">Pendientes: {{ tareasPendientes.length }}</v-chip>
      <v-chip color="info" class="ma-2">Total: {{ totalTareas }}</v-chip>
      <v-btn icon="mdi-refresh" variant="text" :loading="loading" @click="cargarTareas"></v-btn>
    </v-card-title>
    <v-card-text>
      <v-alert v-if="error" type="error" closable @click:close="limpiarError" class="mb-4">
        {{ error }}
      </v-alert>
      <v-tabs v-model="tab" color="primary" align-tabs="center" class="mb-4">
        <v-tab value="todas">Todas</v-tab>
        <v-tab value="pendientes">Pendientes</v-tab>
        <v-tab value="completadas">Completadas</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="todas">
          <v-list v-if="tareas.length > 0">
            <v-list-item v-for="tarea in tareas" :key="tarea.id" class="mb-2 border rounded">
              <template v-slot:prepend>
                <v-checkbox-btn :model-value="tarea.completada" @update:model-value="toggleTarea(tarea)" :disabled="loading"></v-checkbox-btn>
              </template>
              <v-list-item-title :class="{ 'text-decoration-line-through text-grey': tarea.completada }">
                {{ tarea.texto }}
              </v-list-item-title>
              <template v-slot:append>
                <v-chip :color="tarea.completada ? 'success' : 'warning'" size="x-small">
                  {{ tarea.completada ? 'Completada' : 'Pendiente' }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>
        <v-window-item value="pendientes">
          <!-- Similar al anterior pero usando tareasPendientes -->
        </v-window-item>
        <v-window-item value="completadas">
          <!-- Similar al anterior pero usando tareasCompletadas -->
        </v-window-item>
      </v-window>
      <v-alert v-if="!loading && tareas.length === 0" type="info">No hay tareas. ¡Agrega una!</v-alert>
      <v-skeleton-loader v-if="loading && !tareas.length" type="list-item-three-line"></v-skeleton-loader>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'ListaTareas',
  data() { return { tab: 'todas' } },
  computed: {
    ...mapState('tareas', { tareas: state => state.items, loading: state => state.loading, error: state => state.error }),
    ...mapGetters('tareas', ['tareasPendientes', 'tareasCompletadas', 'totalTareas'])
  },
  methods: {
    ...mapActions('tareas', ['fetchTareas']),
    ...mapMutations('tareas', ['SET_ERROR']),
    cargarTareas() { this.fetchTareas() },
    limpiarError() { this.SET_ERROR(null) },
    toggleTarea(tarea) { alert('Función de actualización en desarrollo') }
  },
  created() { this.cargarTareas() }
}
</script>
```

#### **Archivo: `src/App.vue`**
```vue
<template>
  <v-app>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-title>
        <v-icon start icon="mdi-checkbox-marked-circle"></v-icon>
        Gestor de Tareas Profesional
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-menu v-if="isAuthenticated">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" variant="text">
            <v-icon start icon="mdi-account-circle"></v-icon>
            {{ currentUser?.nombre }}
            <v-icon end icon="mdi-chevron-down"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon start icon="mdi-logout"></v-icon> Cerrar Sesión
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else variant="text" @click="simularLogin">
        <v-icon start icon="mdi-login"></v-icon> Login Demo
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-alert v-if="isAuthenticated" type="success" variant="tonal">
              ¡Bienvenido, {{ currentUser?.nombre }}!
            </v-alert>
            <v-alert v-else type="info" variant="tonal">
              Haz click en "Login Demo" para comenzar.
            </v-alert>
          </v-col>
          <v-col cols="12" md="5"><FormularioTarea /></v-col>
          <v-col cols="12" md="7"><ListaTareas /></v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormularioTarea from './components/FormularioTarea.vue'
import ListaTareas from './components/ListaTareas.vue'

export default {
  components: { FormularioTarea, ListaTareas },
  computed: { ...mapGetters(['isAuthenticated', 'currentUser']) },
  methods: {
    ...mapActions(['login', 'logout']),
    simularLogin() {
      this.login({ email: 'demo@ejemplo.com', password: 'demo123' })
    }
  }
}
</script>

<style>
.v-main { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
</style>
```

#### **Archivo: `src/main.js`**
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(store)
app.use(vuetify)
app.mount('#app')
```

---

## 🚀 **Paso 7: Ejecutar la Aplicación (Dos Terminales)**

Necesitas **dos terminales abiertas** en la raíz del proyecto.

### **Terminal 1: Iniciar JSON Server (Backend)**
```bash
npx json-server --watch db.json --port 3000
```
*Deberías ver: `JSON Server started on PORT :3000`*

### **Terminal 2: Iniciar la Aplicación Vue (Frontend)**
```bash
npm run dev
```
*Deberías ver: `VITE v... ready in xxx ms ➜ Local: http://localhost:5173/`*

### **Abrir el Navegador**
Ve a `http://localhost:5173`. Haz click en **"Login Demo"** y la aplicación debería funcionar perfectamente.

---

## ✅ **Checklist de Verificación para el Alumno**

- [ ] ¿Ejecuté `node --version` y `npm --version` para verificar versiones?
- [ ] ¿Instalé las dependencias con los comandos exactos (`vuex@4`, `vuetify@3`)?
- [ ] ¿Creé la estructura de carpetas dentro de `src/`?
- [ ] ¿Copié y pegué todos los códigos en los archivos correctos?
- [ ] ¿Creé el archivo `db.json` en la raíz?
- [ ] ¿Inicié JSON Server en una terminal y se ve el mensaje de éxito?
- [ ] ¿Inicié `npm run dev` en otra terminal y no muestra errores?
- [ ] ¿La aplicación abre en `http://localhost:5173`?
- [ ] ¿Al hacer click en "Login Demo" se habilita el formulario?
- [ ] ¿Las tareas se cargan desde JSON Server?
- [ ] ¿Puedo agregar una nueva tarea desde el formulario?

---

## 🐛 **Solución de Problemas Comunes**

| Error | Posible Solución |
|-------|------------------|
| `Cannot find module 'vuetify/components'` | Ejecuta `npm uninstall vuetify && npm install vuetify@3.5.0` |
| `Error: listen EADDRINUSE: address already in use :::3000` | El puerto 3000 está ocupado. Usa `npx json-server --watch db.json --port 3001` y actualiza la `baseURL` en `tareas.js` a `http://localhost:3001`. |
| Las tareas no se cargan | Verifica que JSON Server esté corriendo y que la URL en `apiClient` sea correcta. |
| El botón "Agregar Tarea" no hace nada | Abre la consola del navegador (F12) para ver errores de JavaScript. Asegúrate de haber iniciado sesión con "Login Demo". |

---

## 📚 **Conceptos Clave Reforzados**

*   **Vuex Store:** Almacén centralizado con **state** (datos), **mutations** (cambios síncronos), **actions** (lógica asíncrona) y **getters** (datos derivados).
*   **Modularización:** El store se divide en módulos (`tareas.js`) para mantener el código ordenado y escalable.
*   **Mapeo de helpers:** Uso de `mapState`, `mapActions`, `mapGetters` para conectar componentes al store sin código repetitivo.
*   **Seguridad:** Validación de entradas en el formulario, manejo centralizado de errores, timeouts en Axios y conciencia de no guardar datos sensibles en el estado.
*   **Backend simulado:** Uso de JSON Server para desarrollar y probar la integración con APIs sin necesidad de un backend real.

---

## 🏁 **Conclusión**

¡Felicidades! Has construido una aplicación profesional que demuestra el poder de **Vuex** para manejar el estado global. Este patrón de arquitectura es el mismo que usarías en proyectos del mundo real, y las buenas prácticas aplicadas aquí (modularización, manejo de errores, validación) te preparan para tu portafolio y para los siguientes módulos donde implementarás pruebas unitarias.

**Autor:** Christopher Espinoza | Módulo 7, Lección 3 - PF1161
```

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
