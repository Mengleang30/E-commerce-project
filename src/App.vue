<script setup>
import { onMounted, ref, watch, computed } from "vue";
import Card_book from "./Layout/Card_book.vue";
import Footer from "./Layout/Footer.vue";
import Header from "./Layout/Header.vue";
import { RouterView, useRoute } from "vue-router";
import Show_Landing from "./Layout/Show_Landing.vue";

import { useAuthentication } from "./stores/authentication";
import {useBooks} from "./stores/books";
import {useCategory} from "./stores/category";
import useNotification from "./stores/notification";
import useCarts from "./stores/carts";
import useOrder from "./stores/order";



const route = useRoute();
const isLoading = ref(false);
const isAdmin = computed(() => {
  return route.path.startsWith("/admin");
});
const Auth = useAuthentication();


const routeName = ref([
  "Landing",
  // 'Search',
  "ListBook"
]);

const scrollToCard = () => {
  const viewportHeight = window.innerHeight * 1.2;
  window.scrollTo({
    top: viewportHeight,
    behavior: "smooth",
  });
};
const scrollToCardToTop = () => {
  const viewportHeight = 0;
  window.scrollTo({
    top: viewportHeight,
    behavior: "smooth",
  });
};

watch(
  // () => route.name,
  // (newRoute, oldRoute) => {
  //   if (newRoute != oldRoute) {
  //     isLoading.value = true;
  //     window.scrollTo(0, 0);
  //   }
  //   setTimeout(() => {
  //     isLoading.value = false;
  //   }, 300);
   
  // }
);



const useBook = useBooks();
const category = useCategory();
const useNotifications = useNotification();
const useCart = useCarts();
const useOrders = useOrder();
onMounted(()=>{
  useBook.fetchBooks();
  category.fetchCategories();
  useNotifications.fetchNotifications();
  useBook.fetchWishList();
  Auth.fetchLoggedUser();
  useCart.fetchCarts();
  useOrders.fetchOrder()
  
})


// console.log(useNotifications.notifications)


</script>

<template>
  <Header />
  <main class="Main_page">
    <!-- <div class="loading-overlay">
      <div class="spinner"></div>
    </div> -->
    <div >
      <Show_Landing v-if="route.name=='Landing'" :-scroll="scrollToCard" :-scroll-to-top="scrollToCardToTop"/>
      <div class="wrap_card" id="Card">
        <Card_book
          v-if="routeName.includes(route.name)"
        />
      </div>
      <RouterView > 

      </RouterView > 
     
    </div>
  </main>
  <Footer />
</template>

<style scoped>
html,
body {
  scroll-behavior: smooth;
  margin: 0;
  padding: 0;
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
.Main_page {
  /* min-height: 55vh; */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2px;
  flex: 1;
}
.wrap_card {
  display: flex;
  margin-top: 0.5rem;
  width: 100%;
  overflow: auto;
  justify-content: center;
  height: auto;
}
.wrap_card {
  display: flex;
  margin-top: 0.5rem;
  width: 100%;
  overflow: auto;
  justify-content: center;
  height: auto;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid transparent;
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
