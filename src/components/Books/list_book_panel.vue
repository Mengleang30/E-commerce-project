<script>
    import { computed } from "vue";
    import {useBookStore } from "@/stores";
    export default {
        name: "list_book_panel",
       
        setup(){
            const UseBookStore = useBookStore();


            return{
                UseBookStore,
            }
        }
    }
</script>
<template>
    <div class="list_book_panel">
        <div class="filter_factors"></div>
        {{ UseBookStore.BookData.length }}
        <div class="render_book" v-for="data in UseBookStore.BookData" :key="data.id">
           <div class="each_book">
            <img width="100"  :src="data.url_image" alt="">
            <p>{{ data.title }}</p>
            <div class="book_inform_container">
            </div>
           </div>
            <!-- <p><RouterLink :to="`/detail/${data.id}`">{{ data.title }}</RouterLink> </p> -->

        </div>
    </div>
</template>