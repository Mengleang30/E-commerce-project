<script>
import { useBookStore } from "@/stores";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackButton from "./Btn_Elements/BackButton.vue";
import Fovite_icons from "./Fovite_icons.vue";
import Star from "./Btn_Elements/Star.vue";
import alert_message from "./Btn_Elements/alert_message.vue";
import RelatedBooks from "./RelatedBooks.vue";
import { useUserStore } from "@/stores/userBookStore";
import axios from "axios";
import useAuthentication from "@/stores/authentication";
import useBooks from "@/stores/books";
import useCarts from "@/stores/carts";
import api from "@/axios";

export default {
  name: "Detail_book",
  components: {
    BackButton,
    Fovite_icons,
    Star,
    alert_message,
    RelatedBooks,
  },
  setup() {
    const route = useRoute();
    const ShowAlert = ref(false);
    const comments = ref(null);
    const NotLoginMessage = ref("");
    const userStore = useUserStore();
    const bookId = ref(parseInt(route.params.id));
    const found_book = ref(null);
    const loading = ref(true); // Add loading state

    const fetchBookDetails = async (bookId) => {
      try {
        const res = await api.get(`/api/books/id/${bookId}`);
        found_book.value = res.data;
      } catch (e) {
        console.log("Error fetching book details:", e);
      }
    };

    const fetchComments = async (bookId) => {
      try {
        const res = await api.get(`/api/books/get_comments/${bookId}`);
        comments.value = res.data;
      } catch (e) {
        console.log("Error fetching comments:", e);
      }
    };

    const loadData = async (bookId) => {
      loading.value = true; // Set loading to true before fetching
      try {
        await Promise.all([
          fetchBookDetails(bookId),
          fetchComments(bookId),
        ]);
      } finally {
        loading.value = false; // Set loading to false after both requests complete
      }
    };

    const commentText = ref("");
    const TextShow = ref("");
    const NotLogin = ref("");
    const Auth = useAuthentication();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    const handleAddComment = async () => {
      if (!auth.isAuthenticated) {
      const proceed = confirm("please login. Do you want to login now?");
      if (proceed) {
        router.push('/login');
      }
      return;
    }

      try {
        if (!Auth.isAuthenticated) {
          NotLogin.value = "You must be logged in to add a comment.";
          NotLoginMessage.value = "You must be logged in to add a comment.";
          setTimeout(() => {
            NotLoginMessage.value = "";
          }, 2000);
          console.log("You must be logged in to add a comment.");
          return;
        }
        TextShow.value = "Adding comment...";
        NotLogin.value = "";
        await api.post(
          `/api/customer/comments/${bookId.value}`,
          { comment: commentText.value }
        );
        await fetchComments(bookId.value);
        TextShow.value = "Comment added successfully! ✅";
        commentText.value = "";
        NotLogin.value = "";
      } catch (e) {
        console.log("Error adding comment:", e);
      }
    };

    const numberOrder = ref(1);
    const useBook = useBooks();
    
    const processing = ref(new Set());
    // mark for books that already in favorite
    const isInWishlist = (bookId) => useBook.wishlistSet.has(bookId);
    const auth = useAuthentication();

    const handleAddWishlist = async (bookId) => {
       if (!auth.isAuthenticated) {
        const proceed = confirm("Please login to find your favorite books. Do you want to login now?");
        if (proceed) {
          router.push('/login');
        }
        return;
      }

       if (processing.value.has(bookId)) return; // prevent re-click
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
     if (!auth.isAuthenticated) {
  const proceed = confirm("Please login to find your favorite books. Do you want to login now?");
  if (proceed) {
    router.push('/login');
  }
  return;
}

      const index = useBook.wishlist.findIndex(item => item.book_id === bookId);
       if (index === -1) {
        
        return;
      }
      const removed = useBook.wishlist[index];
      useBook.wishlist.splice(index,1)

      try{

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


    const CartStore = useCarts();
    const addingStatus = ref("Add To Cart");
    const router = useRouter();
    const handleAddToCarts = async (bookId) => {
          if (!auth.isAuthenticated) {
        const proceed = confirm("Please login or register account !. Do you want to login now?");
        if (proceed) {
          router.push('/login');
        }
        return;
      }

      addingStatus.value = "Adding...";
      await CartStore.addCarts(bookId, numberOrder.value);
      addingStatus.value = "Add To Cart";
    };

    watch(
      () => route.params.id,
      (newId) => {
        bookId.value = parseInt(newId);
        loadData(bookId.value); // Fetch data with loading state
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 300);
        console.log("New Book ID:", bookId.value);
      }
    );

    onMounted(() => {
      loadData(bookId.value); // Fetch data with loading state
      useBook.fetchWishList();
      window.scrollTo(0, 0);
    });

    return {
      found_book,
      addingStatus,
      handleRemoveWishList,
      useBook,
      ShowAlert,
      handleAddToCarts,
      handleAddWishlist,
      bookId,
      isInWishlist,
      numberOrder,
      NotLoginMessage,
      comments,
      commentText,
      handleAddComment,
      TextShow,
      NotLogin,
      loading, // Expose loading state
      processing
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    AddNumberOrder() {
      this.numberOrder += 1;
    },
    SubNumberOrder() {
      if (this.numberOrder > 0) {
        this.numberOrder -= 1;
      }
    },
  },
};
</script>

<template>
  <div v-if="loading" class="loading-container">
    <p>Loading book details...</p>
    <!-- Optional: Add a spinner -->
    <div class="spinner"></div>
  </div>
  <div v-else-if="found_book" class="detail_book">
    <div class="book_container">
      <alert_message v-if="ShowAlert" />
      <p class="alert_successful">{{ NotLoginMessage }}</p>
      <BackButton @click="Back" />
      <div class="img_container">
        <img
          v-if="found_book.path_image !== null"
          :src="`https://bucket-production-853a.up.railway.app/storage/${found_book.path_image}`"
          alt="Book_image_path"
        />
        <img
          v-else-if="found_book.url_image !== null"
          :src="found_book.url_image"
          alt="Book_image_url"
        />
        <img
          v-else
          src="https://upload.wikimedia.org/wikipedia/commons/2/21/Blank_book_on_a_table.jpg"
        />
        <hr />
        <div class="book_description">
          <h3>Description</h3>
          <p>{{ found_book.description }}</p>
        </div>
      </div>
      <article class="information_container">
        <h2>{{ found_book.title }}</h2>
        <div class="label_inform" v-if="found_book.discount == 0">
          <p>Price :</p>
          <h2 class="price">${{ found_book.price.toFixed(2) }}</h2>
        </div>
        <div class="label_inform" v-else>
          <div class="wrap_price">
            <h3 class="price">${{ (found_book.price * (1 - found_book.discount / 100)).toFixed(2) }}</h3>
            <p>${{ found_book.price }}</p>
            <br />
          </div>
        </div>
        <div class="wrap_cart">
          <div class="subtract" @click="SubNumberOrder">-</div>
          <input type="number" placeholder="1" v-model="numberOrder" />
          <div class="adding" @click="AddNumberOrder">+</div>
          <button @click="handleAddToCarts(found_book.id)">{{ addingStatus }}</button>
        </div>
        <div class="grid_container">
          <div class="box_inform">
            <h4>Author</h4>
            <p>{{ found_book.author }}</p>
          </div>
          <div class="box_inform">
            <h4>Original Price</h4>
            <p class="price">${{ found_book.price }}</p>
          </div>
          <div class="box_inform">
            <h4>Language</h4>
            <p v-if="found_book.languages !== null">{{ found_book.languages }}</p>
            <p v-else>Don't mention</p>
          </div>
          <div class="box_inform">
            <h4>Category</h4>
            <p>{{ found_book.category.name }}</p>
          </div>
          <div class="box_inform">
            <h4>Favorite</h4>
            <div class="wrapping_fav">
              <Fovite_icons
                v-if="!isInWishlist(found_book.id)"
                @click="handleAddWishlist(found_book.id)"
                :Clicked_favorite="false"
                :class="{ disabled: processing.has(found_book.id) }"
                class="Favorite_btn"
              />
              <Fovite_icons
                v-else
                @click="handleRemoveWishList(found_book.id)"
                :Clicked_favorite="true"
                :class="{ disabled: processing.has(found_book.id) }"
                class="Favorite_btn"
              />

            </div>
          </div>
          <div class="box_inform">
            <h4>Published</h4>
            <p>{{ found_book.published_date }}</p>
          </div>
          <div class="box_inform">
            <h4>Discount</h4>
            <p>{{ found_book.discount }}%</p>
          </div>
          <div class="box_inform">
            <h4>Code</h4>
            <p>{{ found_book.id }}</p>
          </div>
        </div>
        <hr />
      </article>
    </div>
    <div class="comment_container">
      <h3>📝 Comment</h3>
      <span class="TextShow">{{ TextShow }}</span>
      <span class="NotLogin">{{ NotLogin }}</span>
      <form @submit.prevent="handleAddComment" class="commentAdd">
        <h4 for="comment">Add Comment</h4>
        <textarea
          v-model="commentText"
          name="comment"
          id="comment"
          cols="30"
          required
          rows="2"
          placeholder="Write your comment here..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <p v-if="comments == null">No comments yet.</p>
      <article v-else class="each_comment" v-for="comment in comments" :key="comment.id">
        <img
          src="https://img.icons8.com/?size=100&id=mlMB8cHGuy5i&format=png&color=000000"
          alt=""
        />
        <div class="warp">
          <div class="box_comment">
            <div class="profile_comment">
              <span class="name">{{ comment.username }}</span>
              <div class="date">
                <span>{{ new Date(comment.created_at).toLocaleString() }}</span>
              </div>
            </div>
            <div class="comment">{{ comment.comment }}</div>
          </div>
        </div>
      </article>
    </div>
  </div>
  <h2 v-else>Book not found</h2>
</template>


<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 1.5rem;
  color: #333;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Existing styles remain unchanged */
.detail_book {
  width: auto;
  min-height: 80vh;
}

.commentAdd{
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 8px;
  padding-left: .5rem;
}
.commentAdd textarea {
  width: 100%;
  height: 4rem;
  border-radius: 0.4rem;
  font-size: 15px;
  resize:vertical;
  padding: 5px;
}
.commentAdd button{
  height: 2rem;
  min-width: 16%;
  align-self: center;
  border-radius: 6px;
  cursor: pointer;
  background-color:rgb(67, 139, 255);
  font-weight: 700;
  color: white;
  border: none;
}
.commentAdd button:hover{
  background-color: red;
}
.NotLogin{
  color: red;
}

.book_container {
  display: flex;
  background: linear-gradient(rgba(217, 217, 217, 1), rgba(255, 255, 255, 1));
  padding: 1rem;
  margin: 0 0.5rem;
  border-radius: 0.6rem;
  position: relative;
  padding-top: 2.4rem;
  box-shadow: 3px 3px 5px rgb(148, 148, 148);
  outline: 1px solid rgb(158, 158, 158);
}
.img_container {
  display: flex;
  width: 25rem;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  border-radius: 5px;
  gap: 10px;
}
.book_container img {
    aspect-ratio: 2/3;
    width: 80%;
    border: 1px solid black;
    border-radius: 6px;
}

.TextShow{
  color:rgb(0, 138, 53);
  font-weight:500;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}


.book_description {
  width: 100%;
  padding: 2px;
  /* font-size: 0.8rem; */
  font-size: clamp(0.7rem, 2vw, 1rem); 
  text-align: center;
}

.grid_container {
  padding: 2px;
  display: grid;
  margin: 1rem 0;
  gap: 4px;
  height: auto;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));

}
.box_inform {
  background: linear-gradient(
    to left bottom,
    #686868,
    #5e5f5f,
    #202020,
    #6e6f6d,
    #7b7b7b
  );
  display: flex;
  flex-grow: 1;
  height: auto;
  flex-direction: column;
  padding: 5px;
  align-items: center;
  border: 2px solid rgb(136, 136, 136);
  border-radius: 0.6rem;
  color: white;
  
}

.wrap_price{
    display: flex;
   
}
.wrap_price p{
    text-decoration:line-through;
    font-weight: bold;
    font-size: 1.2rem;
}

.box_inform:hover {
  background: rgb(50, 54, 57);
}
.box_inform p {
  font-size: small;
  text-align: center;
}
.box_inform .price {
  font-size: medium;
}
.wrap_star {
  display: flex;
  gap: 5px;
}


.information_container {
  padding-left: 1rem;
  row-gap: 0.25rem;
  height: auto;
  flex-grow: 1;

}
.wrap_cart {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  gap: 0.4rem;
  
}

.wrap_cart .subtract,
.adding {
  background-color: rgb(67, 139, 255);
  color: white;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
  cursor: pointer;
}
.wrap_cart .subtract {
  background-color: rgb(102, 102, 102);
  opacity: 80%;
}
.subtract:hover {
  background-color: rgb(92, 92, 92);
}

.wrap_cart .adding:hover {
  background-color: red;
}
.label_inform {
  display: flex;
  gap: 10px;
  align-items: center;
}
.label_inform .price {
  color: red;
  text-shadow: 1px 1px 2px rgba(185, 185, 185, 0.6);
  font-size: 2rem;
}
.label_inform .star {
  width: 1rem;
  color: goldenrod;
}
.wrap_cart input {
  width: 3rem;
  height: 1.8rem;
  text-align: center;
  font-size: large;
  background-color: rgb(67, 139, 255);
  border: none;
  border-radius: 0.45rem;
  outline: 1px solid rgb(40, 232, 40);
  color: white;
}
.wrap_cart input[type="number"] {
  -moz-appearance: textfield;
}
.wrap_cart input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.wrap_cart button {
  height: 2.4rem;
  border-radius: 0.4rem;
  width: 5.4rem;
  border: none;
  background-color: rgb(67, 139, 255);
  cursor: pointer;
  color: white;
}
.wrap_cart button:hover {
  background-color: red;
}
.BackBtn {
  width: 2.2rem;
  padding: 2px;
  cursor: pointer;
  position: absolute;
  top: 1%;
  left: 1%;
}
.BackBtn:hover {
  color: gray;
}

.Favorite_btn {
  width: 1.8rem;
  cursor: pointer;
  color: rgb(218, 69, 10);
}

.comment_container {
  background: linear-gradient(rgba(217, 217, 217, 1), rgba(255, 255, 255, 1));
  padding: .3rem;
  margin: 0.5rem 0.5rem;
  box-shadow: 3px 3px 5px rgb(148, 148, 148);
  outline: 1px solid rgb(158, 158, 158);
}
.comment_container img {
  width: 3rem;
  height: 3rem;
}
.each_comment {
   
    display: flex;
    padding: 5px;
    gap: 2px;
   
   
}
.warp{
    display: flex;
    max-width: 100%;
    border-radius: .4rem;
}

.date{
    font-size: 10px;
}
.name{
    font-size: 0.9rem;
}
.box_comment{
    padding: 5px;
    flex-grow: 1;
}

.profile_comment {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 3px;
}

.each_comment .comment{
    /* background: linear-gradient(to right bottom, #8e9797, #96a19e, #a1aaa4, #adb3a9, #bcbcaf); */
    display: block;
    padding: 5px;
    border: 1px solid rgb(159, 156, 156);
    border-radius: .4rem;
    background-color: rgb(242, 242, 242);
    font-size: small;
    box-shadow: 3px 3px 5px rgb(148, 148, 148);
   
    /* outline: 1px solid rgb(158, 158, 158); */
}


@media screen and (max-width : 460px) {
  .box_inform{
    justify-content: center;
    font-size: 12px;
  }
  .box_inform p {
    font-size: .6rem;
  }
  .wrapping_fav svg{
    width: 1.5rem;
  }
  .wrap_cart .subtract,
  .adding {
    width: 1.5rem;
    height: 1.5rem;
  }
  .wrap_cart button {
    width: 4rem;
    height: 2rem;
    font-size: 10px;
  }
  .information_container {
    font-size: 14px;
  }
  .label_inform .price{
    font-size: 22px;
  }
  .BackBtn {
    width: 2rem;
  }
  .alert_successful{
    font-size: 10px;
  }

  
}
</style>
