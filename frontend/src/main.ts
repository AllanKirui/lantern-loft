import { createApp } from "vue"
import { createPinia } from "pinia"
import "./index.css"
import App from "./App.vue"
import BaseIcon from "./components/base/BaseIcon.vue"
import router from "./router"

const app = createApp(App)

// Globally registered components
app.component("BaseIcon", BaseIcon)

app.use(createPinia())
app.use(router)
app.mount("#app")
