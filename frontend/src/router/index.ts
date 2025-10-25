import { createRouter, createWebHistory } from "vue-router"
import StorefrontLayout from "@/layouts/StorefrontLayout.vue"

const routes = [
  // Storefront Routes
  {
    path: "/",
    component: StorefrontLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/storefront/HomeView.vue")
      }
    ]
  }
  // TODO Auth Routes
  // TODO Dashboard Routes
  // TODO Catch-all Routes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
