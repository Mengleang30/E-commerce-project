import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/views/CartPage.vue'
import DetailBook from '@/components/Books/Detail_book.vue'
import Favorite from '@/views/Favorite_page.vue'
import Landing from '@/views/Landing.vue'
import ListBook from '@/views/List_book.vue'
import Login from '@/components/Users/Login.vue'
import History from '@/views/History.vue'
import { useUserStore } from '@/stores/userBookStore'
import Search from '@/views/Search.vue'
import SignUp from '@/components/Users/SignUp.vue'
import Admin_Dashboard from '@/components/Admin/Admin-Dashboard.vue'
import AdminAddProduct from '@/components/Admin/Admin_Add_Product_Form.vue'
import Component from 'vue-loading-overlay'

const authGuard = (to, from, next) => {
  const authStore = useUserStore();
  if (authStore.loggedInUser) {
    next(); // Allow access if logged in
  } else {
    // next('/login'); // Redirect to login page if not logged in
    alert("As Guest cannot access this feature , please sign in")
    next("/login");
  }
};

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/detail/:id',
    name: 'DetailBook',
    component: DetailBook,

  },
  {
    path: '/list-book',
    name: 'ListBook',
    component: ListBook,
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: Favorite,
    beforeEnter: authGuard,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: authGuard,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: "/history",
    name: "History",
    component: History,
    beforeEnter: authGuard,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/dashboard',
        name: 'AdminDashboard',
        component: Admin_Dashboard,
      },
      {
        path: '/add-product',
        name: 'AdminAddProduct',
        component: AdminAddProduct,
      }
    ]
  },
  {
    path: '/admin-add-product',
    name: 'AddProduct',
    component: AdminAddProduct,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
