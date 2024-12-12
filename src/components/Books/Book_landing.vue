<script>
import { useBookStore } from '@/stores';
import Favorite_icons from './Fovite_icons.vue'
export default {

    name: "Book_landing",
    components: {
        Favorite_icons,
    },

    props : {
        Title : String,
        Url_img : String,
        Price : Number,
        Author : String,
        Year : Number,
        Book_category : Array,
        LinkToDetail : Number,
        HaveDiscount : Number,
        AfterDiscount :  Number,
        idBook : Number,
        
    },

    data (){
        return {
            Click_fav : false,
        }
    },

    setup (){
        const BooksFav = useBookStore();
        const handleFavoriteBooks = (id)=>{
            if (BooksFav.FavoriteBooks.includes(id)){
                BooksFav.removeFromFavorite(id);
            }
        else{
            BooksFav.addToFavorite(id);
        }
        }
        return {
            handleFavoriteBooks,
           
        }
    },
    methods : {
        handleAddFavorite(){
            this.handleFavoriteBooks(this.idBook);
        }
    },
    
}
</script>

<template>
    <article class="Each_book" v-if="true" >
        <Favorite_icons :Clicked_favorite="Click_fav" @click="this.handleAddFavorite(idBook)"/>
        <div class="each_book">
            <div class="wraping">
                <img :src="Url_img"
                    alt="book">
                <h4>{{ Title }}
                </h4>
                <span class="author_year">{{ Author }} | {{ Year }}</span>
                <span class="Category" >
                    {{ Book_category.join('/') }}
                </span>
            </div>
            <div class="price_btn">
                <h4 class="price" v-if="HaveDiscount==0">$ {{ Price.toFixed(2) }}</h4>
                <div class="discount_UI" v-else>
                    <h2 class="discount">{{ HaveDiscount }}%</h2>
                    <h2 class="after_discount">${{ AfterDiscount.toFixed(2) }}</h2>
                    <span class="before_dis">${{ Price.toFixed(2) }}</span>
                </div>

                <!-- Link to each book -->
                <RouterLink :to="`/detail/${ LinkToDetail}`">
                    <button class="btn">View Now</button>
                </RouterLink>
            </div>
        </div>
    </article>

</template>
<style scoped>
.icons_love {
    width: 1.2rem;
    position: absolute;
    right: 2%;
    top: 2%;
    cursor: pointer;
}

.each_book img {
   
    height: 10rem;
}
.discount_UI{
    display: flex;
}
.discount_UI .after_discount{
    color: rgb(255, 52, 7);
}
.discount_UI .before_dis{
    text-decoration: line-through;
}
.each_book {
    width: 12rem;
    padding: 5px;
    height: 19rem;
}

.Each_book {
    position: relative;
    font-size: 12px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
    border-radius: .1rem;
    outline: 1px solid rgb(221, 221, 221);
    transition: all .3s;
}
.Each_book:hover{
    transform: scale(1.01);
    background-color: rgb(239, 239, 239);

}

.wraping {
    display: flex;
    padding: 5px;
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 100%;
}
.discount {
    position: absolute;
    top: 5%;
    left: 5%;
    transform: rotate(-45deg);
    color: red;
    font-weight: bold;
}

.wraping h4 {
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 100%;
    height: 2rem;
}
.wraping .author_year{
    width: 100%;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.Category {
    font-size: smaller;
    padding: 2px;
    height: 2rem;
    width: 100%;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* Hide overflowing text */
    text-align: center;
}


.price_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}

.price_btn .price {
    font-size: 1.4rem;
    font-weight: 500;

}

.price_btn .btn {
    background-color: rgba(39, 133, 255, 0.82);
    border: none;
    border-radius: .2rem;
    padding: 4px;
    cursor: pointer;
    color: white;
    width: 5rem;
    height: 2rem;
    font-size: 12px;
}

.price_btn .btn:hover {
    background-color: red;
}
</style>