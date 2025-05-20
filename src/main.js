import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // @ what is it?  -- 
                                    // in 5-20 the @ casuses somehow crash, change to . is fine
import store from './store/index'   // same . is work
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueAxios, axios)

app.mount('#app')
