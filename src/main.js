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