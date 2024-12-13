<script>
import { useBookStore } from "@/stores";

import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BackButton from "./Btn_Elements/BackButton.vue";
import Fovite_icons from "./Fovite_icons.vue";
import Star from "./Btn_Elements/Star.vue";
import alert_message from "./Btn_Elements/alert_message.vue";
import RelatedBooks from "./RelatedBooks.vue";

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
    const bookStore = useBookStore();
    const route = useRoute();
    const ShowAlert = ref(false)
    const isLoading = ref(true)

    const bookId = ref(parseInt(route.params.id)); 
    
    const found_book = computed(() => {
      return bookStore.getProductId(bookId.value);
    });

    
    const booksRelated = computed (()=> {
      const category = found_book.value.category;
      if (!category) return [];
      return bookStore.BookData.filter((books)=>books.id !== bookId && 
      books.category.some((cat) => category.includes(cat))
    )})
    isLoading.value = false;

    watch (
      ()=>route.params.id,
      (newId)=>{
        bookId.value = parseInt(newId);
        window.scrollTo(0, 0);
        console.log("New Book ID:", bookId.value);
      }
    )

    return {
      found_book,
      ShowAlert,
      booksRelated,
      bookId,
      isLoading
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  data() {
    return {
      numberOrder: 1,
      Clicked_fav: true,
      
    };
  },
  methods: {
    Back() {
      this.$router.go(-1);
      // window.history.back();
    },
    AddNumberOrder() {
      this.numberOrder += 1;
    },
    SubNumberOrder() {
      if (this.numberOrder > 0) {
        this.numberOrder -= 1;
      }
    },
    addToCart(){
      if(this.numberOrder>0){
        this.ShowAlert = true
      setTimeout(()=>{
        this.ShowAlert = false
      },3000)
      }
     
    },
  },
};
</script>

<template>
  <div v-if="found_book" class="detail_book">
    <div class="book_container">
    <alert_message v-if="ShowAlert"/>
      <BackButton @click="Back" />
      <div class="img_container">
        <img :src="found_book.url_image" alt="" />
        <hr />
        <div class="book_description">
          <h3>Description</h3>
          <p>{{ found_book.description }}</p>
        </div>
      </div>
      <article class="information_container">
        <h2>{{ found_book.title }}</h2>
        <div class="label_inform" v-if="found_book.discount==0">
            <p>Price :</p>
          <h2 class="price">${{ found_book.price.toFixed(2) }}</h2>
        </div>
        <div class="label_inform" v-else>
            <div class="wrap_price">
                <h3 class="price">${{ (found_book.price*(1-found_book.discount/100)).toFixed(2) }}</h3>
                <p>${{ found_book.price }}</p>
              <br>
            </div>
        </div>
        <div class="wrap_cart">
          <div class="subtract" @click="SubNumberOrder">-</div>
          <input type="number" placeholder="1" v-model="this.numberOrder" />
          <div class="adding" @click="AddNumberOrder">+</div>
          <button @click="addToCart">Add To Cart</button>
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
            <h4>Rated</h4>
            <div class="wrap_star">
              <Star v-for="i in Math.floor(found_book.rated)" :key="i" />
            </div>
          </div>
          <div class="box_inform">
            <h4>Language</h4>
            <p>{{ found_book.Language.join(", ") }}</p>
          </div>

          <div class="box_inform">
            <h4>Category</h4>
            <p>{{ found_book.category.join(", ") }}</p>
          </div>
          <div class="box_inform">
            <h4>Available Format</h4>
            <p>{{ found_book.format.join(", ") }}</p>
          </div>
          <div class="box_inform">
            <h4>Published</h4>
            <p>{{ found_book.published }}</p>
          </div>
          <div class="box_inform">
            <h4>Discount</h4>
            <p>{{ found_book.discount }}%</p>
          </div>
          <div class="box_inform">
            <h4>Favorite</h4>
            <div class="wrapping_fav">
            <Fovite_icons :Clicked_favorite="true" class="Favorite_btn" />
          </div>
          </div>

          <div class="box_inform">
            <h4>Code</h4>
            <p>{{ found_book.code }}</p>
          </div>
        
        </div>

        <hr />
      </article>
    </div>
    <div class="comment_container" >
        <h3>Comment</h3>
      <article class="each_comment" v-for="userComment in found_book.user_comment" :key="userComment">
        <img
          src="https://img.icons8.com/?size=100&id=mlMB8cHGuy5i&format=png&color=000000"
          alt=""
        />
        <div class="warp">
          <div class="box_comment">
            <div class="profile">
                <span class="name">{{ userComment.name}}</span>
                <div class="date">
                    <span >{{ userComment.date }}</span>
                </div>
            </div>
            <div class="comment">{{ userComment.comment }}</div>
          </div>
        </div>
      </article>
    </div>
    
    <RelatedBooks :RelatedBooks="booksRelated" /> 
  </div>
  <h2 v-else>Book not found</h2>
</template>

<style scoped>
.detail_book {
  width: auto;
  min-height: 80vh;
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
    flex-grow: 1;
   
}
.warp{
    display: flex;
    min-width: 40%;
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

.profile {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.each_comment .comment{
    background: linear-gradient(to right bottom, #8e9797, #96a19e, #a1aaa4, #adb3a9, #bcbcaf);
    display: block;
    padding: 5px;
    border: 1px solid rgb(159, 156, 156);
    border-radius: .4rem;
    font-size: small;
    box-shadow: 3px 3px 5px rgb(148, 148, 148);
    outline: 1px solid rgb(158, 158, 158);
}

</style>
