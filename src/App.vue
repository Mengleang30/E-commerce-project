<script setup>

import Card_book from './Layout/Card_book.vue';
import Footer from './Layout/Footer.vue';
import Header from './Layout/Header.vue';
import { RouterView,useRoute } from 'vue-router';

const route = useRoute();





</script>

<template>

    <Header />
    <main class="Main_page">
        <div class="wrap_card">
            <Card_book v-if="route.name !== 'DetailBook'"/>
        </div>
        <RouterView v-slot="{Component}">
            <KeepAlive exclude="Detail_book">
                <component :is="Component"/>
            </KeepAlive>
        </RouterView>
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
