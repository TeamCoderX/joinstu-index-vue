import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/lib/bootstrap/js/bootstrap.min.js'
import mitt from 'mitt';
const emitter = mitt();  
import vue3GoogleLogin from 'vue3-google-login'

const app=createApp(App)
app.use(vue3GoogleLogin, {
    clientId: '963371699123-9es2ofihc2lod0lhnim7sno4efsnipmq.apps.googleusercontent.com'
})
app.config.globalProperties.emitter = emitter;
app.use(router).mount('#app')
