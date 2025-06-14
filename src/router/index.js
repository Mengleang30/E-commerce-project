import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/views/CartPage.vue'
import DetailBook from '@/components/Books/Detail_book.vue'
import Favorite from '@/views/Favorite_page.vue'
import Landing from '@/views/Landing.vue'
import ListBook from '@/views/List_book.vue'

import History from '@/views/History.vue'


import { useRoute } from 'vue-router'
import Admin from '@/components/Admin/Admin_component.vue'
import AdminDashboard from '@/components/Admin/Admin-Dashboard.vue'
import Admin_Product_all from '@/components/Admin/Admin_Product_all.vue'
import Admin_Add_Product_Form from '@/components/Admin/Admin_Add_Product_Form.vue'
import Admin_Update_Product_Form from '@/components/Admin/Admin_Update_Product_Form.vue'
import SignUp from '@/authentication/SignUp.vue'
import Login from '@/authentication/Login.vue'
import GoogleCallBack from '@/authentication/GoogleCallBack.vue'
import ResetPassword from '@/authentication/ResetPassword.vue'


import CustomerNotification from '@/views/notification/CustomerNotification.vue'
import useAuthentication from '@/stores/authentication'
import Profile from '@/views/profile/Profile.vue'
import Order from '@/views/Order.vue'
import CapturePayment from '@/payments/CapturePayment.vue'
import ThankYou from '@/payments/ThankYou.vue'
import Search from '@/views/Search.vue'

const route = useRoute();




const authGuard = (to, from, next) => {
  const Auth = useAuthentication();
  if (Auth.isAuthenticated) {
    next(); // Allow access if logged in
  } else {
    // next('/login'); // Redirect to login page if not logged in
    // alert("As Guest cannot access this feature , please sign in")
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
    path: '/notification',
    name: 'Notification',
    component: CustomerNotification,
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
    // beforeEnter : authGuard,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: authGuard,
    // beforeEnter : authGuard,
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
    path : "/history",
    name : "History",
    component : History,
    // beforeEnter : authGuard,
  },
  {
    path: '/search',
    name: "Search",
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
      },
      {
        path: 'update-product-form',
        name: 'AdminUpdateProduct',
        component: Admin_Update_Product_Form,
      }
    ]
  },
    {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authGuard
  },
   {
    path: '/order',
    name: 'Order',
    component: Order,
    beforeEnter: authGuard
  },
  {
  path: '/capture-payment',
  name: 'CapturePayment',
  component: CapturePayment, // this Vue page should call Laravel to capture payment
  },
   {
  path: '/thank-you',
  name: 'ThankYou',
  component: ThankYou, 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
