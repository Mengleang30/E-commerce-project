<script>

import Book_landing from './Book_landing.vue';
import { useBookStore } from '@/stores';
import { computed } from 'vue';
import FiveStar from './FiveStar.vue';



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
            "Education"
            ],
        }
    },
    components: {
        Book_landing,
        FiveStar,
    },

    computed : {
        /// Return a function to filter books for a specific category
        FilterBooksByCategory() {
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
        
        const discountBooks = computed(()=>{
            return Book_by_category.BookData.filter((books)=>books.discount>0);
        })
       
         return {
            Book_by_category,
            discountBooks,
        }

    },
}
</script>

<template>

    <div class="category_landing">
        <div class="wraping" >
            <h4 >Discount Books</h4>         
        </div>
        <div class="contianer_book">
            <Book_landing  v-for="Books in discountBooks.slice(0,7)" :key="Books.id "
            :Title="Books.title"
            :Author="Books.author"
            :Year="Books.published"
            :Url_img="Books.url_image"
            :Book_category="Books.category"
            :Price="Books.price"
            :LinkToDetail="Books.id"
            :HaveDiscount="Books.discount"
            :AfterDiscount="(Books.price)*(1 - Books.discount/100)"
            :idBook="Books.id"
            :Clicked_favorite="false"
            />
        </div>
    </div>
    <div class="category_landing" v-for="category in this.Category_showing" :key="category" >
        <div class="wraping" >
          
            <h4 >Best {{ category }}</h4>         
        </div>
        <div class="contianer_book" v-if="FilterBooksByCategory(category).length>0" >
            <Book_landing  v-for="Books in FilterBooksByCategory(category).slice(0,7)" :key="Books.id "
            :Title="Books.title"
            :Author="Books.author"
            :Year="Books.published"
            :Url_img="Books.url_image"
            :Book_category="Books.category"
            :Price="Books.price"
            :LinkToDetail="Books.id"
            :HaveDiscount="Books.discount"
            :AfterDiscount="(Books.price)*(1 - Books.discount/100)"
            :idBook="Books.id"
            :Clicked_favorite="false"
            />
        </div>
    </div>
    <FiveStar />

   
</template>

<style scoped>
.category_landing {
    height: auto;
    margin: 10px 0;
   
}

.category_landing .wraping {
    display: flex;
    padding: 5px 10px;
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