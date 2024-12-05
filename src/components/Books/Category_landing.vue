<script>

import { BookData } from '@/stores/Data';
import Book_landing from './Book_landing.vue';
import { useBookStore } from '@/stores';



export default {
    name: "Category_landing",
    data () {
        return {
            Category_showing : [
            "Motivational",
            "Inspirational",
            "Novel",
            "Philosophy",
            "Productivity",
            ],
        }
    },
    components: {
        Book_landing
    },

    computed : {
        FilterBooksByCategory() {
      // Return a function to filter books for a specific category
      return (category) =>
        this.Book_by_category.BookData.filter((book) =>
          book.category.some(
            (bookCategory) =>
              bookCategory.trim().toLocaleLowerCase() === category.trim().toLocaleLowerCase()
          )
        );
    },
    },

    setup () {
        const Book_by_category = useBookStore(); 
        
        return {
            Book_by_category
        }
    },
    methods : {
        afterDiscount(price){
            
        }

    },

}
</script>

<template>
    <div class="category_landing" v-for="category in this.Category_showing" :key="category" >
        <div class="wraping" >
            <h4 >Best {{ category }}</h4>
            <!-- <div class="wraping_arrow">
                <div  class="left">&lt;</div>
                <div  class="right">&gt;</div>
            </div> -->
            <span class="More_by_category">More</span>
           
        </div>
        <div class="contianer_book" v-if="FilterBooksByCategory(category).length>0" >
            <Book_landing v-for="Books in FilterBooksByCategory(category)" :key="Books.id"
            :Title="Books.title"
            :Author="Books.author"
            :Year="Books.published"
            :Url_img="Books.url_image"
            :Book_category="Books.category"
            :Price="Books.price"
            :LinkToDetail="Books.id"
            :HaveDiscount="Books.discount"
            :AfterDiscount="(Books.price)*(1 - Books.discount/100)"
            />
        </div>
    </div>
</template>

<style>
.category_landing {
    height: auto;
    margin: 10px 0;
   
}

.category_landing .wraping {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
}

.wraping_arrow {
    display: flex;
    font-size: larger;
    gap: 10px;
    padding-right: 4%;
}

.wraping_arrow .left,
.right {
    background-color: rgb(255, 255, 255);
    width: 1.6rem;
    height: 1.6rem;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
}
.wraping_arrow .left:hover,
.right:hover {
    background-color: rgb(219, 255, 243);
   
}
.contianer_book {
    display: flex;
    padding: 2.6px;
    gap: 5px;
    overflow-x: auto;
    padding-bottom: .8rem;
    scroll-behavior: smooth;
}
::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
    height: 6px;
}
::-webkit-scrollbar-thumb {
    border-radius: .6rem;
    background-color: #7c7d7d; /* Color of the thumb */
    border: 2px solid transparent; /* Creates space around the thumb */
}
::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Darken thumb color on hover */
}

</style>