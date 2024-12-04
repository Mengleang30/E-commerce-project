<script setup>

import Card_book from './Layout/Card_book.vue';
import Footer from './Layout/Footer.vue';
import Header from './Layout/Header.vue';
import { RouterView } from 'vue-router';





</script>

<template>

    <Header />
    <main class="Main_page">
        <div class="wrap_card">
            <Card_book />
        </div>
        <RouterView :key="$route.params.id"/>
    </main>

    <Footer />

</template>

<style scoped>
.Main_page {
    min-height: 90vh;
    padding: 2px;
}
.wrap_card{
    display: flex;
    margin-top: 0.5rem;
    width: 100%;
    overflow: auto;
    justify-content: center;
    height: auto;
}
</style>
