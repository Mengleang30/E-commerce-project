<script>
import { useBookStore } from '@/stores';

export default {
    name: "Card_book",

    setup() {

        const cart_data = useBookStore();
        return {
            Card_data : cart_data.BookData
        }

    },
    computed : {
        FilterCard (){

        }
    },

    data() {
        return {
            current_index: 0,
            previous_index : 0,
        }
    },
    methods: {
        nextCard() {
            setTimeout(()=>{
                this.previous_index = this.current_index;
                const random_index = Math.floor(Math.random() * this.Card_data.length);
                this.current_index = random_index;
            },250)
           
        },
        previousCard() {
            setTimeout(()=>{
                this.current_index = this.previous_index;
            },250)
           
        }
    },


}
</script>

<template>
    <div class="card">
        <div class="wrap_arrow">
            <div @click="previousCard" class="left">&lt;</div>
            <div @click="nextCard" class="right">&gt;</div>
        </div>
        <article class="article">
            <h4>{{ Card_data[current_index].title }}</h4>
            <p> {{ Card_data[current_index].description }} </p>
                <RouterLink :to="`/detail/${Card_data[current_index].id}`">
                    <button>View Now</button>
                </RouterLink>
        </article>
        <img :src="Card_data[current_index].url_image" alt="books">
    </div>
</template>

<style scoped>
.card {
    display: flex;
    padding: 16px 30px;
    justify-content: center;
    height: 16rem;
    width: 50rem;
    box-shadow: 0px 4px 2px rgb(0, 0, 0, 20%);
    background: linear-gradient(to right,
            rgba(135, 161, 174, 1) 29%,
            rgba(217, 217, 217, 1) 81%);
    color: white;
    border-radius: .4rem;
    position: relative;
    z-index: 120;
    transition: 1.8s all; 
}

.wrap_arrow {
    position: absolute;
    width: 100%;
    top: 50%;
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
}

.card img {
    width: 10rem;
    box-shadow: 2px 4px 2px rgb(0, 0, 0, 20%);
}

.left,
.right {
    background-color: transparent;
    width: 2rem;
    height: 2rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: rgb(13, 13, 13);
    font-weight: bold;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
    cursor: pointer;
}

.left {
    top: 50%;
    left: 4%;
}

.right {
    top: 50%;
    right: 0%;
}

.card .article {
    display: inline;
    padding-top: 10px;
    height: auto;
    line-height: 1.5rem;
}

.card .article p {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 6rem;
}

.card .article h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 1.6rem;
}
.card .article button:hover, .left:hover ,.right:hover{
    background-color: rgb(60, 162, 245);
    outline: none;
    color: aliceblue; 
}
.card .article button {
    border: none;
    width: 5rem;
    border-radius: .16rem;
    height: 2rem;
    background-color: aliceblue;
    margin-top: 10px;
    margin-left: 1rem;
    outline: 1px solid rgb(255, 255, 255);
    cursor: pointer;
}
</style>