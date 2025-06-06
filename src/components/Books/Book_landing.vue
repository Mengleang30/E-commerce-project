<script>

import Favorite_icons from './Fovite_icons.vue'
export default {

    name: "Book_landing",
    components: {
        Favorite_icons,
    },

    props : {
        Title : String,
        Url_img : String,
        Path_image: String,
        Price : Number,
        Author : String,
        Year : Number,
        Book_category : Array,
        LinkToDetail : Number,
        HaveDiscount : Number,
        AfterDiscount :  Number,
        idBook : Number,
        isFavorite: Boolean
    },
  
    setup (){
    //     const BooksFav = useBookStore();
    //     const handleFavoriteBooks = (id)=>{
    //         if (BooksFav.FavoriteBooks.includes(id)){
    //             BooksFav.removeFromFavorite(id);
    //         }
    //     else{
    //         BooksFav.addToFavorite(id);
    //     }
    //     }
    //     return {
    //         handleFavoriteBooks,
           
    //     }
    // },

    },
    methods : {
        onFavoriteClick() {
      this.$emit("addFavorite", this.idBook); // Emit the favorite book ID to the parent
      
    },
      onFavoriteUnClick() {
      this.$emit("removeFavorite", this.idBook);
    },
    },
    
}
</script>

<template>
    <article class="Each_book" v-if="true" >
        <Favorite_icons v-if="!isFavorite" :Clicked_favorite="false" @click="onFavoriteClick"
         />
        <Favorite_icons v-else :Clicked_favorite="isFavorite" @click="onFavoriteUnClick"
         />
        <div class="each_book">
            <div class="wraping">
                <img v-if="Path_image!==null" :src="`http://localhost:8200/storage/${Path_image}`" alt="Book_image_path" />
                <img v-else-if="Url_img!==null" :src="Url_img" alt="Book_image_url" />
                <img v-else  src="https://upload.wikimedia.org/wikipedia/commons/2/21/Blank_book_on_a_table.jpg" />
                <h4>{{ Title }}
                </h4>
                <span class="author_year">{{ Author }} | {{ Year }}</span>
                <span class="Category" >
                    {{ Book_category.name }}
                </span>
            </div>
            <div class="price_btn">
                <h4 class="price" v-if="HaveDiscount==0">$ {{ Price.toFixed(2) }}</h4>
                <div class="discount_UI" v-else>
                    <h2 class="discount">{{ HaveDiscount }}%</h2>
                    <h2 class="after_discount">${{ AfterDiscount.toFixed(2) }}</h2>
                    <span class="before_dis">${{ Price }}</span>
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
   width: 10rem;
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
    width: 12.8rem;
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
    background-color: rgba(27, 25, 156, 0.82);
    border: none;
    border-radius: .2rem;
    padding: 4px;
    cursor: pointer;
    color: white;
    width: 5rem;
    height: 2rem;
    font-size: 12px;
    transition: all .3s;
}

.price_btn .btn:hover {
    background-color: red;
}

@media screen and (max-width : 460px) {
  .each_book{
    width: 8rem;
    padding: 5px;
    height: 12rem;
  }
  .each_book img{
    height: 5rem;
  }
    .icons_love {
        width: 1rem;
        position: absolute;
        right: 2%;
        top: 2%;
        cursor: pointer;
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
    .wraping h4{
       
        height: 1rem;
        font-size: 12px;
    }
    .wraping .author_year{
        font-size: 10px;
    }
    .price_btn{
        display: flex;
        flex-direction: column;
    }
    .price_btn .price{
        font-size: 14px;
        
    }
    .price_btn .after_discount{
        font-size: 14px;
    }
    .price_btn .btn {
        height: 1.4rem;
    }
    
    .Category {
        height: 1rem;
       
    }
    
  
}


</style>