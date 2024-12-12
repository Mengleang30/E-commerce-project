<script>
import { useBookStore } from "@/stores";

import { computed } from "vue";
import { useRoute } from "vue-router";
import BackButton from "./Btn/BackButton.vue";
import Fovite_icons from "./Fovite_icons.vue";
import Star from "./Btn/Star.vue";

export default {
  name: "Detail_book",
  components: {
    BackButton,
    Fovite_icons,
    Star,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  setup() {
    const bookStore = useBookStore();
    const route = useRoute();

    const bookId = parseInt(route.params.id);

    const found_book = computed(() => {
      return bookStore.getProductId(bookId);
    });

    return {
      found_book,
    };
  },
  data() {
    return {
      numberOrder: 0,
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
  },
};
</script>

<template>
  <div v-if="found_book" class="detail_book">
    <div class="book_container">
      <BackButton @click="Back" />
      <div class="img_container">
        <img :src="found_book.url_image" alt="" />
      </div>
      <article class="information_container">
        <h2>{{ found_book.title }}</h2>
        <div class="label_inform">
          Price :
          <h2 class="price">${{ found_book.price.toFixed(2) }}</h2>
        </div>
        <div class="wrap_cart">
          <div class="subtract" @click="SubNumberOrder">-</div>
          <input type="number" placeholder="1" v-model="this.numberOrder" />
          <div class="adding" @click="AddNumberOrder">+</div>
          <button>Add To Cart</button>
          <div class="wrapping_fav">
            <Fovite_icons :Clicked_favorite="true" class="Favorite_btn" />
          </div>
        </div>

        <div class="label_inform">
          Rated : <Star v-for="i in Math.floor(found_book.rated)" :key="i" />
        </div>
        <div class="label_inform">Published : {{ found_book.published }}</div>
        <div class="label_inform">
          Category : {{ found_book.category.join(" + ") }}
        </div>
        <div class="label_inform">Code : {{ found_book.code }}</div>
        <hr />
        <div class="book_description">
          <h4>Description</h4>
          <p>{{ found_book.description }}</p>
        </div>
      </article>
    </div>
  </div>
  <h2 v-else>Book not found</h2>
</template>

<style>
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
  box-shadow: 2px 2px 3px rgb(148, 148, 148);
}
.book_container img {
  width: 16rem;
  height: 24rem;
}

.book_description {
  width: 100%;
  padding: 2px;
}

.img_container {
  width: 18rem;
  background-color: antiquewhite;
  border: 1px solid rgb(133, 133, 133);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-shadow: 2px 2px 3px rgb(148, 148, 148);
  border-radius: 5px;
}

.information_container h2 {
}
.information_container {
  padding-left: 1rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 0.8rem;
  height: auto;
}
.wrap_cart {
  display: flex;
  align-items: center;
  gap: 0.8rem;
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
  background-color: rgb(174, 174, 174);
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
</style>
