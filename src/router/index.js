import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/components/Cart/Cart.vue'
import DetailBook from '@/components/Detail_book/Detail_book.vue'
import Favorite from '@/components/Favorite/Favorite.vue'
import Landing from '@/components/Landing/Landing.vue'
import ListBook from '@/components/List_book/List_book.vue'
import Login from '@/components/Login/Login.vue'
import Feedback from '@/components/Feedback/Feedback.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/detail',
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
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path : "/feedback",
    name : "Feedback",
    component : Feedback,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
