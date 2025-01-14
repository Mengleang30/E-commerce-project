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
        <!-- <div class="filter_factors">
            {{ UseBookStore.BookData.length }}
        </div> -->
        <div class="render_book" v-for="data in UseBookStore.BookData" :key="data.id">
           <div class="each_book">
                <div class="main_title_book">
                    <img height="150" :src="data.url_image" alt="">
                    <h4>{{ data.title }}</h4>
                </div>
                <div class="book_inform_container">
                    <span>
                        {{ data.category.join('/') }}
                    </span>
                    <span style="font-weight: bold;">
                        {{ data.author }}
                    </span>
                    <span style="font-weight: bold; font-size: 1.5rem;">${{ data.price }}</span>
                    <button>View</button>
                </div>

           </div>
            
        </div>
            <!-- <p><RouterLink :to="`/detail/${data.id}`">{{ data.title }}</RouterLink> </p> -->
    </div>
</template>

<style>
    .list_book_panel{
        margin: 30px 30px 30px 0;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        border: 1px solid;
        border-radius: 10px;
        background-color: rgb(230, 230, 230);
    }
    /* .filter_factors{
        display: flex;
        flex-direction: column;
    } */
    .render_book{
        margin: 5px;   
    }
    .each_book{
        padding: 10px;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        border: 1px solid;
        background-color: aliceblue;
    }
    .main_title_book{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .main_title_book h4{
        font-weight: 600;
        margin: 0 20px;
        text-align: center;
    }
    .book_inform_container{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
    }
    .book_inform_container button{
        background-color: blue;
        color: aliceblue;
        font-size: 1.5rem;
        width: 150px;
        height: 40px;
        border: none;
        border-radius: 10px;
    }
</style>