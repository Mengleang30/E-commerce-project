<script>
import Book_landing from "../components/Books/Book_landing.vue";
import { useBookStore } from "@/stores";
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userBookStore";
import useBooks from "@/stores/books";
import { useCategory } from "@/stores/category";
import axios from "axios";

export default {
  name: "Category_landing",
  data() {
    return {
      Category_showing: [
        // "Motivational",
        // "Classic",
        // "Romance",
        "Novel",
        // "Philosophy",
        // "Adventure",
        // "History",
        // "Education",
      ],
    };
  },
  components: {
    Book_landing,
  },

  setup() {
    const Book_by_category = useBookStore();



    const apiBooks = useBooks();

    const userStore = useUserStore();
    const apiCategory = useCategory();



    const useBook = useBooks();
     const processing = ref(new Set());
    // mark for books that already in favorite
    const isInWishlist = (bookId) => useBook.wishlistSet.has(bookId);


    const handleAddWishlist = async (bookId) => {
      if (processing.value.has(bookId)) return;
          processing.value.add(bookId);
      useBook.wishlist.push({book_id : bookId});

      try{
         await useBook.addWishList(bookId);
      }
      catch(e){
        useBook.wishlist = useBook.wishlist.filter(b => b.book_id !== bookId);

      }
      finally{
        processing.value.delete(bookId);
      }
     
      // await useBook.fetchWishList();
    };

    const handleRemoveWishList = async (bookId) => {
      if (processing.value.has(bookId)) return;
        processing.value.add(bookId);
      const index = useBook.wishlist.findIndex(item => item.book_id === bookId);
       if (index === -1) {
        
        return;
      }
      const removed = useBook.wishlist[index];
      useBook.wishlist.splice(index,1)

      try{
        useBook.removeWishlistLocallyByBookId(bookId);
        await useBook.removeWishList(removed.id);

      }
      catch(e){
         // Rollback if API failed
        useBook.wishlist.splice(index, 0, removed);

      }
      finally{
        processing.value.delete(bookId);
      }

    };

    const checkFavorite = (BookId) => {
      return (
        userStore.loggedInUser &&
        userStore.loggedInUser.favorite.includes(BookId)
      );
    };

    const handleAddFavorite = (BookId) => {
      if (!userStore.loggedInUser) {
        // console.log("You must be logged in to add favorites.");
        return;
      }
      // console.log("Adding to favorite, Book ID:", BookId);
      // const result = userStore.addToFavorite(BookId);
      // console.log(result.message);
      // console.log(userStore.loggedInUser.favorite);
    };

    const discountBooks = computed(() => {
      return apiBooks.books
        .filter((books) => books.discount >= 15)
        .sort((a, b) => b.discount - a.discount);
    });

    const filterBooksByCategory = (category) => {
  return apiBooks.books.filter((book) => {
    const categories = Array.isArray(book.category)
      ? book.category
      : [book.category]; // convert string to array

    return categories.some(
      (bookCategory) =>
        String(bookCategory).trim().toLowerCase() === category.trim().toLowerCase()
    );
  });
    };

    const useCategories = useCategory();
    // console.log("attdatdt",useCategories.categories)

    const groupBook = ref([]);

    const fetchGroupBooks = async () => {
      const res = await axios.get(`https://projectip2-book-store-api.up.railway.app/api/books/list_category_name`);
      groupBook.value = res.data
      
    }

    const computedGroupBooks = computed(()=>{
      return groupBook.value.filter((item)=>{
        return item.category_name && item.books && item.books.length > 0;
      })
    })

    // console.log("List", groupBook)
    onMounted(async () => {
      await useBook.fetchWishList();
      // Make sure you pass a valid category ID
      await fetchGroupBooks();
    });

    return {
      Book_by_category,
      discountBooks,
      filterBooksByCategory,
      handleAddFavorite,
      checkFavorite,
      computedGroupBooks,
      apiBooks,
      apiCategory,
      isInWishlist,
      handleAddFavorite,
      handleRemoveWishList,
      handleAddWishlist,
      groupBook,
      fetchGroupBooks,
      useCategories,
      processing
    };
  },
  methods: {


  }
};
</script>

<template>
  <div class="category_landing">
    <div class="wraping">
      <h4 class="tittle_discount">Discount Books 15% off</h4>
    </div>
    <div class="contianer_book">
      <Book_landing
        v-for="Books in discountBooks.slice(0, 20)"
        :key="Books.id"
        :Title="Books.title"
        :Author="Books.author"
        :Year="Books.published_date.split('-')[0]"
        :Url_img="Books.url_image"
        :Path_image="Books.path_image"
        :Book_category="Books.category"
        :Price="Books.price"
        :LinkToDetail="Books.id"
        :HaveDiscount="Books.discount"
        :AfterDiscount="Books.price * (1 - Books.discount / 100)"
        :idBook="Books.id"
        :class="{ disabled: processing.has(Books.id) }"
        @addFavorite="handleAddWishlist(Books.id)"
        :isFavorite="isInWishlist(Books.id)"
        @removeFavorite="handleRemoveWishList(Books.id)"
      />
    </div>
  </div>
  <div
    class="category_landing"
    v-for="category in this.Category_showing"
    :key="category"
  >
  <!-- <button v-for="category in useCategories.categories"  @click="fetchGroupBooks(category.id)">
  {{ category.name }}
</button> -->

  <div class="wraping"  v-for="ListBook in computedGroupBooks" :key="ListBook.category_id">
    <div class="listByCategory" >
       <!-- {{ computedGroupBooks }} -->
    <h4>Best {{ ListBook.category_name	}}</h4>
    <div class="wrap_book">
    <Book_landing
        v-for="book in ListBook.books"
        :key="book.id"
        :Title="book.title"
        :Author="book.author"
        :Year="book.published_date.split('-')[0]"
        :Url_img="book.url_image"
        :Path_image="book.path_image"
        :Book_category="book.category_id"
        :Price="book.price"
        :LinkToDetail="book.id"
        :HaveDiscount="book.discount"
        :AfterDiscount="book.price * (1 - book.discount / 100)"
        :idBook="book.id"
        :class="{ disabled: processing.has(book.id) }"
        @addFavorite="handleAddWishlist(book.id)"
        :isFavorite="isInWishlist(book.id)"
        @removeFavorite="handleRemoveWishList(book.id)"
      />
    </div>
    
      </div>
     
  </div>
    <div class="contianer_book"></div>
  </div>
  <!-- <div class="category_landing_5star">
        <div class="wraping" >
            <h3 > 5 Stars Books ⭐⭐⭐⭐⭐
            </h3>         
        </div>
       
    </div> -->
</template>

<style scoped>
.category_landing {
  height: auto;
  margin: 10px 0;
}

.category_landing .wraping {
  display: flex;
  padding: 5px 10px;
  font-size: 1.5rem;
  color: rgb(0, 0, 255);
}

.contianer_book {
  display: flex;
  padding: 2.6px;
  gap: 5px;
  overflow-x: auto;
  padding-bottom: 0.8rem;
  scroll-behavior: smooth;
}
.tittle_discount {
  color: rgb(255, 11, 11);
}

::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
  height: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 0.6rem;
  background-color: #7c7d7d; /* Color of the thumb */
  border: 2px solid transparent; /* Creates space around the thumb */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Darken thumb color on hover */
}

.category_landing_5star {
  background: linear-gradient(
    to right top,
    #d8e9b1,
    #d9ecad,
    #daf0a9,
    #dbf3a5,
    #dcf6a1
  );
  padding: 1rem 0rem;
  margin: 2rem 0;
}
.category_landing_5star .wraping {
  background-color: rgb(207, 255, 255);
  padding: 5px 0;
  text-align: center;
}

.contianer_book {
  display: flex;
  padding: 5px;
  gap: 5px;
  overflow-x: auto;
  padding-bottom: 0.8rem;
  scroll-behavior: smooth;
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
}

.listByCategory{
  display: flex;
  flex-direction: column;
}

.wrap_book{
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

/* .disabled {
  pointer-events: none;
  opacity: 0.5;
} */

</style>
