<template>

    <div class="category_landing_related" >
        <div class="wraping" >
            <h3 > Related Books
            </h3>         
        </div>
        
        <div class="contianer_book">
            <Book_landing  v-for="Books in RelatedBooks" :key="Books.id"
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
            :isFavorite="isBookFavorite(Books.id)"
            @addFavorite="toggleFavorite(Books.id)"
            />
        </div>
    </div>
</template>


<script >
import Book_landing from './Book_landing.vue';
import { useUserStore } from '@/stores/userBookStore';

export default {
    name : "RelatedBooks",
    components : {
        Book_landing,
    },
    props : {
        RelatedBooks: {
        type: Array,
        required: true,
    },
    },
    setup() {

    const userStore = useUserStore(); // Access user store

    // Check if a book is already a favorite
    const isBookFavorite = (bookId) => {
      return userStore.loggedInUser?.favorite.includes(bookId);
    };

    // Add or remove book from favorites
    const toggleFavorite = (bookId) => {
      const result = userStore.addToFavorite(bookId);
      console.log(result.message, bookId);
    };

    return { isBookFavorite, toggleFavorite };

    }


}

</script>

<style scoped>
.loading-spinner {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 20px;
}

.category_landing_related{
    background:linear-gradient(to right top, #d8e9b1, #d9ecad, #daf0a9, #dbf3a5, #dcf6a1);;
    padding: 1rem 0rem;
    margin: 2rem 0;

}
.category_landing_related .wraping{
    background-color: rgb(207, 255, 255);
    padding: 5px 0;
    text-align: center;
}

.contianer_book{
    display: flex;
    padding: 5px;
    gap: 5px;
    overflow-x: auto;
    padding-bottom: .8rem;
    scroll-behavior: smooth;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
}
</style>