<script>
 
    import {useBookStore } from "@/stores";
import { computed, ref } from "vue";
    export default {
        name: "list_book_panel",
        props : {

        },
       
        setup(){

            const UseBookStore = useBookStore();

            const princeSortValues = ref("");
            

            const SortByPrice = computed(() => {
                const OriginalData = [...UseBookStore.BookData]
                if (princeSortValues.value ==="1") {
                    // Low to High
                    return UseBookStore.BookData = [...UseBookStore.BookData].sort((a, b) => a.price - b.price);
                } else if (princeSortValues.value ==="2") {
                    // High to Low
                    return UseBookStore.BookData = [...UseBookStore.BookData].sort((a, b) => b.price - a.price);
                }
                else {
                    return OriginalData;
                }
               
    });
            return{
                UseBookStore,
                SortByPrice,
                princeSortValues,
            }
        }
    }
</script>
<template>

<div class="search_main_panel">
        <div class="search_genre">
            <h3>Search by Genre</h3>
            <form action="" class="inputs-search">
                <div class="inp_opt">
                    <input type="checkbox" name="sci_fi" id="">
                    <label for="sci_fi">Science-Fiction</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="fantasty" id="">
                    <label for="fantasty">Fantasty</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="romance" id="">
                    <label for="romance">Romance</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="motivation" id="">
                    <label for="motivation">Motivation</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="mystery" id="">
                    <label for="mystery">Mystery</label>
                </div>
            </form>
        </div>
        <hr>
        <div class="search_num">
            <h3>Search by Year</h3>
            <input type="number" name="num_year" id="num_input" value="2024">
        </div>
        <hr>
        <div class="search_genre">
            <h3>Search by Language</h3>
            
            <form action="" class="inputs-search">
                <div class="inp_opt">
                    <input type="checkbox" name="khmer" id="">
                    <label for="khmer">Khmer</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="english" id="">
                    <label for="english">English</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="chinese" id="">
                    <label for="chinese">Chinese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="french" id="">
                    <label for="french">French</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="korean" id="">
                    <label for="korean">Korean</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="japanese" id="">
                    <label for="japanese">Japanese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="thai" id="">
                    <label for="thai">Thai</label>
                </div>
            </form>
        </div>
        <hr>
        <div class="search_num">
            <h3>Sort by Price</h3>
            <select name="price" v-model="princeSortValues" @change="SortByPrice" id="prince" >
                <option value="0" selected>Prince</option>
                <option value="1">Low-High</option>
                <option value="2">High-Low</option>
            </select>
        </div>
        <hr>
        <div class="search_genre">
            <h3>Search by Language</h3>
            <form action="" class="inputs-search">
                <div class="inp_opt">
                    <input type="checkbox" name="khmer" id="">
                    <label for="khmer">Khmer</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="english" id="">
                    <label for="english">English</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="chinese" id="">
                    <label for="chinese">Chinese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="french" id="">
                    <label for="french">French</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="korean" id="">
                    <label for="korean">Korean</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="japanese" id="">
                    <label for="japanese">Japanese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="thai" id="">
                    <label for="thai">Thai</label>
                </div>
            </form>
        </div>
        <button class="reset_btn">
            Reset Filter
        </button>
    </div>

    <div class="list_book_panel">
        <!-- <div class="filter_factors">
            {{ UseBookStore.BookData.length }}
        </div> -->
        <div class="render_book" v-for="data in SortByPrice" :key="data.id">
           <div class="each_book">
                <div class="main_title_book">
                    <img height="150" :src="data.url_image" alt="">
                    <h4>{{ data.title }}</h4>
                </div>
                <div class="book_inform_container">
                    <span style="font-size: small;">
                        {{ data.category.join('/') }}
                    </span>
                    <span style="font-weight: bold;">
                        {{ data.author }}
                    </span>
                    <div>
                        <div v-if="data.discount>0" class="wrap_prince">
                            <span class="after_discount">${{ (data.price * (1 - data.discount/100)).toFixed(2) }}</span>
                            <span class="prince">${{ data.price.toFixed(2) }}</span>
                        </div>
                        <span v-else class="prince">${{ data.price.toFixed(2) }}</span>

                    </div>
                   
                    <RouterLink class="link" :to="`/detail/${data.id}`">
                        <button>View</button>
                    </RouterLink>
                </div>

           </div>
            
        </div>
            <!-- <p><RouterLink :to="`/detail/${data.id}`">{{ data.title }}</RouterLink> </p> -->
    </div>
</template>

<style scoped>
    .list_book_panel{
        margin: 30px 0px 10px 0px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
        border: 1px solid;
        flex-grow: 1;
        border-radius: 10px;
        background-color: rgb(230, 230, 230);
        gap: 5px;
        overflow-y: scroll;
        padding: 5px;
    }   
    .prince{
        color: blue;
        font-size: larger;
        font-weight: bold;
    }
    .wrap_prince{
        
    }
    .wrap_prince .prince{
        text-decoration: line-through;
        color: black;
    }
    .after_discount {
        color: red;
        font-size:1.6rem;
        font-weight: bold;
    }
    .each_book{
        padding: 10px;
        height: 100%;
        display: flex;
        flex-grow: 1;
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
        cursor: pointer;
    }
    .link{
        cursor: pointer;
    }
    hr{
        width: 85%;
        align-self: center;
    }
    .search_main_panel{
        height: 100%;
        margin: 30px 5px;
        width: 28%;
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(to right, #bebebe, #FFFFFF); /*grey, white*/
        border: 1px solid;
        border-radius: 10px;
    }
    .search_genre{
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
    .search_num{
        margin: 30px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .search_genre h3{
        text-align: center;
    }
    .inputs-search{
        margin: 10px;
    }
    .inp_opt{
        display: flex;
        width: 150px;
        margin: 10px;
    }
    .inp_opt label{
        /*Add some space between checkbox and label */
        margin-left: 10px;
    }
    #num_input{
        font-size: 1.3rem;
        width: 100px;
        height: 50px;
        border: 1px solid;
        border-radius: 10px;
        padding: 5px;
    }
    .reset_btn{
        color: aliceblue;
        background-color: black;
        font-size: 1.3rem;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
    }
    .reset_btn:hover{
        background-color: rgb(125, 125, 125);
        color: black;
    }
    .reset_btn:active{
        transform: translateY(5px);
    }
    button{
        cursor: pointer;
    }
</style>