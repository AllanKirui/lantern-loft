import { createRouter, createWebHistory } from "vue-router"
import StorefrontLayout from "@/layouts/StorefrontLayout.vue"
import AuthLayout from "@/layouts/AuthLayout.vue"

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
        component: () => import("@/views/storefront/ProductListView.vue"),
        meta: {
          breadcrumb: [{ label: "Home", to: "/" }, { label: "Collections" }]
        }
      },
      {
        path: "collections/:slug",
        name: "collections.show",
        component: () => import("@/views/storefront/ProductDetailView.vue"),
        meta: {
          breadcrumb: (route: any) => [
            { label: "Home", to: "/" },
            { label: "Collections", to: "/collections" },
            { label: route.params.slug.replace(/-\d+$/, "").replace(/-/g, " ") }
          ]
        }
      }
    ]
  },
  // Auth Routes
  {
    path: "/account",
    component: AuthLayout,
    children: [
      {
        path: "create",
        name: "account.create",
        component: () => import("@/views/auth/RegisterView.vue")
      },
      {
        path: "sign-in",
        name: "account.signIn",
        component: () => import("@/views/auth/LoginView.vue")
      },
      {
        path: "admin/sign-in",
        name: "admin.signIn",
        component: () => import("@/views/auth/AdminLoginView.vue")
      }
    ]
  }
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
