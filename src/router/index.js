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
import GoogleCallBack from '@/components/Users/GoogleCallBack.vue'
import ResetPassword from '@/components/Users/ResetPassword.vue'
import EnterCode from '@/components/Users/EnterCode.vue'
import { useRoute } from 'vue-router'
import Admin from '@/components/Admin/Admin_component.vue'
import AdminDashboard from '@/components/Admin/Admin-Dashboard.vue'
import Admin_Product_all from '@/components/Admin/Admin_Product_all.vue'
import Admin_Add_Product_Form from '@/components/Admin/Admin_Add_Product_Form.vue'


const route = useRoute();
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
    path: '/auth/google/callback',
    name: 'GoogleCallback',
    component: GoogleCallBack,
  },
  {
    path: '/detail/:id',
    name: 'DetailBook',
    component: DetailBook,

  },
   {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
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
    name: 'AdminComponent',
    component: Admin,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard,
      },
      {
        path: 'all-products',
        name: 'AdminProductAll',
        component: Admin_Product_all,
      },
      {
        path: 'add-product-form',
        name: 'AdminAddProductForm',
        component: Admin_Add_Product_Form,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
