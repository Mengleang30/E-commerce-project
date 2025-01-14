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
        <div class="filter_factors">
            <!-- {{ UseBookStore.BookData.length }} -->
        </div>
        <div class="render_book" v-for="data in UseBookStore.BookData" :key="data.id">
           <div class="each_book">
                <img height="100"  :src="data.url_image" alt="">
                <p>{{ data.title }}</p>
                <div class="book_inform_container">
                    h
                </div>
           </div>
            <!-- <p><RouterLink :to="`/detail/${data.id}`">{{ data.title }}</RouterLink> </p> -->
        </div>
    </div>
</template>

<style>
    .list_book_panel{
        margin: 30px 30px 30px 0;
        display: flex;
        flex-wrap: wrap;
        background-color: aqua;
    }
    .filter_factors{
        display: flex;
        flex-direction: column;
    }
    .render_book{
        display: flex;
        background-color: gold;
        margin: 30px;
    }
    .each_book{
        display: flex;
    }
</style>