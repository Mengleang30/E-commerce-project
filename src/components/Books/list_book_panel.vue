<script>
import { useBookStore } from "@/stores";
import useBooks from "@/stores/books";
import useCategory from "@/stores/category";
import { computed, ref } from "vue";
export default {
  name: "list_book_panel",
  props: {},

  setup() {
    const UseBookStore = useBookStore();

    const princeSortValues = ref("");
    const selectedLanguage = ref([]);
    const selectedYear = ref(0);
    const selectedGenres = ref([]);
    const showDiscountBook = ref(false);
    const ListBooks = useBooks();
    const category = useCategory();

    const FilterBooks = computed(() => {
      let OriginalData = [...ListBooks.books];

      if (selectedLanguage.value.length > 0) {
        OriginalData = OriginalData.filter((book) =>
          book.Language.join(",").some((language) =>
            selectedLanguage.value.includes(language)
          )
        );
      }

      if (showDiscountBook.value) {
        OriginalData = OriginalData.filter((books) => books.discount > 0);
      }

     if (selectedGenres.value.length > 0) {
        OriginalData = OriginalData.filter((books) =>
          selectedGenres.value.includes(books.category.name)
        );
      }


      if (selectedYear.value) {
        OriginalData = OriginalData.filter(
          (books) => books.published === Number(selectedYear.value)
        );
      }

      if (princeSortValues.value === "1") {
        // Low to High
        return (ListBooks.books = [...ListBooks.books].sort(
          (a, b) => a.price - b.price
        ));
      } else if (princeSortValues.value === "2") {
        // High to Low
        return (ListBooks.books = [...ListBooks.books].sort(
          (a, b) => b.price - a.price
        ));
      } else {
        return OriginalData;
      }
    });
    const resetFilters = () => {
      selectedLanguage.value = [];
      selectedYear.value = 0;
      princeSortValues.value = 0;
      selectedGenres.value = [];
      showDiscountBook.value = false;
    };

    return {
      UseBookStore,
      FilterBooks,
      princeSortValues,
      selectedLanguage,
      selectedGenres,
      selectedYear,
      resetFilters,
      showDiscountBook,
      category,
    };
  },
};
</script>
<template>
  <div class="search_main_panel">
    <div class="search_genre">
      <h3>Search by Genre</h3>
      <form class="inputs-search">
        <div
          class="inp_opt"
          v-for="genre in category.categories"
          :key="genre"
        >
          <input type="checkbox" :value="genre.name" v-model="selectedGenres" />
          <label>{{ genre.name }}</label>
        </div>
      </form>
    </div>
    <hr />
    <div class="search_num">
      <h3>Search by Year</h3>
      <input
        type="number"
        v-model="selectedYear"
        name="num_year"
        id="num_input"
        value="0"
      />
    </div>
    <div class="search_discount">
      <h3>Discount</h3>
      <input
        class="discountBox"
        :checked="showDiscountBook"
        type="checkbox"
        v-model="showDiscountBook"
      />
    </div>
    <hr />
    <div class="search_genre">
      <h3>Search by Language</h3>
      <form class="inputs-search">
        <div
          class="inp_opt"
          v-for="lang in [
            'Khmer',
            'English',
            'Chinese',
            'French',
            'Korean',
            'Japanese',
            'Thai',
          ]"
          :key="lang"
        >
          <input type="checkbox" :value="lang" v-model="selectedLanguage" />
          <label>{{ lang }}</label>
        </div>
      </form>
    </div>
    <hr />
    <div class="search_num">
      <h3>Sort by Price</h3>
      <select
        name="price"
        v-model="princeSortValues"
        @change="SortByPrice"
        id="price"
      >
        <option value="0" selected>Price</option>
        <option value="1">Low-High</option>
        <option value="2">High-Low</option>
      </select>
    </div>
    <hr />

    <button class="reset_btn" @click="resetFilters">Reset Filter</button>
  </div>

  <div class="list_book_panel">
    <!-- <div class="filter_factors">
            {{ UseBookStore.BookData.length }}
        </div> -->
    <div class="render_book" v-for="data in FilterBooks" :key="data.id">
      <div class="each_book">
        <div class="main_title_book">
          <img v-if="data.path_image!==null" :src="`http://localhost:8200/storage/${data.path_image}`" alt="Book_image_path" />
          <img v-else-if="data.url_image !==null" :src="data.url_image" alt="Book_image_url" />
          <img v-else  src="https://upload.wikimedia.org/wikipedia/commons/2/21/Blank_book_on_a_table.jpg" />
            <h4 v-if="data.title.length < 40">
            {{ data.title.substring(0, 40) }}
          </h4>
          <h4 v-else>{{ data.title.substring(0, 40) + "..." }}</h4>
        </div>
        <div class="book_inform_container">
          <span style="font-size: small">
            {{ data.category.name }}
          </span>
          <span style="font-weight: bold">
            {{ data.author }}
          </span>
          
          <div>
            <div v-if="data.discount > 0" class="wrap_prince">
              <span class="after_discount"
                >${{
                  (data.price * (1 - data.discount / 100)).toFixed(2)
                }}</span
              >
              <span class="prince">${{ data.price }}</span>
            </div>
            <span v-else class="prince">${{ data.price }}</span>
          </div>

          <RouterLink class="link" :to="`/detail/${data.id}`">
            <button>View</button>
          </RouterLink>
        </div>
      </div>
    </div>
    
    <!-- <p><RouterLink :to="`/detail/${data.id}`">{{ data.title }}</RouterLink> </p> -->
  </div>
</template>

<style scoped>
.list_book_panel {
  margin: 30px 0px 10px 0px;
  display: flex;
  flex-wrap: wrap;
  /* grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); */
  border: 1px solid;
  border-radius: 10px;
  justify-content: center;
  background-color: rgb(230, 230, 230);
  gap: 5px;
  width: 90%;
  padding: 5px;
}
.prince {
  color: blue;
  font-size: larger;
  font-weight: bold;
}
.wrap_prince {
}
.wrap_prince .prince {
  text-decoration: line-through;
  color: black;
}
.after_discount {
  color: red;
  font-size: 1.6rem;
  font-weight: bold;
}
.each_book {
  padding: 10px;
  height: 19.6rem;
  display: flex;
  flex-direction: column;
  min-width: 12rem;
  border-radius: 10px;
  border: 1px solid;
  background-color: aliceblue;
  transition: all .2s;
}
.each_book:hover{
  scale: 1.01;
  background-color:lightblue;
}
.main_title_book {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main_title_book img {
  width: 6rem;
  height: 10rem;
}
.main_title_book h4 {
  font-weight: 600;
  margin: 0 20px;
  text-align: center;
}
.book_inform_container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.book_inform_container button {
  background-color: blue;
  color: aliceblue;
  font-size: 1.2rem;
  width: 5.2rem;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.book_inform_container button:hover {
  background-color: rgb(227, 8, 8);
}
.link {
  cursor: pointer;
}
hr {
  width: 85%;
  align-self: center;
}
.search_main_panel {
  height: 100%;
  margin: 30px 5px;
  width: 28%;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to right, #bebebe, #ffffff); /*grey, white*/
  border: 1px solid;
  border-radius: 10px;
}
.search_genre {
  display: flex;
  flex-direction: column;

  padding: 5px;
}
.search_num {
  margin: 30px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.search_num select {
  height: 30px;
}
.search_genre h3 {
  text-align: center;
}
.inputs-search {
  margin: 10px 0px;
}
.inp_opt {
  display: flex;
  width: 100%;
  gap: 10px;
}
.inp_opt input {
  width: 1.6rem;
  margin-top: 2px;
  accent-color: blue;
}
.search_discount {
  text-align: center;
}
.search_discount .discountBox {
  height: 1.4rem;
  width: 1.4rem;
}
#num_input {
  font-size: 1.3rem;
  width: 100px;
  height: 50px;
  border: 1px solid;
  border-radius: 10px;
  padding: 5px;
}
.reset_btn {
  color: aliceblue;
  background-color: black;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
}
.reset_btn:hover {
  background-color: rgb(125, 125, 125);
  color: black;
}
.reset_btn:active {
  transform: translateY(5px);
}
button {
  cursor: pointer;
}
</style>
