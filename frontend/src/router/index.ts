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
      },
      {
        path: "collections",
        name: "collections",
        component: () => import("@/views/storefront/ProductListView.vue")
      },
      {
        path: "collections/:slug",
        name: "collections.show",
        component: () => import("@/views/storefront/ProductDetailView.vue")
      }
    ]
  }
  // TODO Auth Routes
  // TODO Dashboard Routes
  // TODO Catch-all Routes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // use savedPosition if to and from routes exist
    if (savedPosition && to.name && from.name) {
      return savedPosition
    }

    return { top: 0, behavior: "smooth" }
  }
})

export default router
