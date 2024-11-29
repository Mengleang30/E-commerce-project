<script setup>

import Footer from './Layout/Footer.vue';
import Header from './Layout/Header.vue';
import { RouterView } from 'vue-router';



</script>

<template>

    <Header />
    <main class="Main_page">
        <RouterView />
    </main>

    <Footer />

</template>

<style scoped>
.Main_page {
    min-height: 90vh;
}
</style>
