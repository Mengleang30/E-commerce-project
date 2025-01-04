<script setup>
import { ref, watch } from "vue";
import Card_book from "./Layout/Card_book.vue";
import Footer from "./Layout/Footer.vue";
import Header from "./Layout/Header.vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute();
const isLoading = ref(false);

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
</script>

<template>
  <Header />
  <main class="Main_page">
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <div class="wrap_card">
        <Card_book
          v-if="route.name !== 'DetailBook' && route.name !== 'Login'"
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
.Main_page {
  min-height: 90vh;
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
