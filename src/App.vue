<script setup>
import { ref, watch } from "vue";
import Card_book from "./Layout/Card_book.vue";
import Footer from "./Layout/Footer.vue";
import Header from "./Layout/Header.vue";
import { RouterView, useRoute } from "vue-router";
import Show_Landing from "./Layout/Show_Landing.vue";
import axios from "axios";

import { useAuthentication } from "./stores/authentication";

const route = useRoute();
const isLoading = ref(false);
const Auth = useAuthentication();

console.log(Auth.user)


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
  () => route.name,
  (newRoute, oldRoute) => {
    if (newRoute != oldRoute) {
      isLoading.value = true;
      window.scrollTo(0, 0);
    }
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
   
  }
);

// const testFetch = ref()

// axios.get('http://localhost:8200/api/books')
//   .then(response => {
//     testFetch.value = response.data;
//     console.log('Books:', response.data); // Handle the data
//   })
//   .catch(error => {
//     console.error('Error fetching books:', error);
//   });

fetch('http://localhost:8200/api/login', {
  method: 'POST',
  credentials: 'include', // important for cookies
    // others if needed
  // body: JSON.stringify({ email, password })
})



</script>

<template>
  <Header />
  <main class="Main_page">
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <Show_Landing v-if="route.name=='Landing'" :-scroll="scrollToCard" :-scroll-to-top="scrollToCardToTop"/>
      <div class="wrap_card" id="Card">
        <Card_book
          v-if="route.name !== 'DetailBook' && route.name !== 'Login' && route.name!=='SignUp'"
        />
      </div>
      <RouterView > 

      </RouterView > 
        <!-- v-slot="{ Component }" -->
        <!-- <KeepAlive exclude="Detail_book" >
          <component :is="Component" />
        </KeepAlive> -->
     
    </div>
  </main>
  <Footer />
</template>

<style scoped>
 html {
        scroll-behavior: smooth;
    }
.Main_page {
  min-height: 55vh;
  padding: 2px;
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
