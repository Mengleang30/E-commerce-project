<script setup>

import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";



const route = useRoute()
const searchQuery = ref(route.query.query.toLocaleLowerCase() || '') 
const books = ref([]);

const fetchBooks = async () => {
  
  if (!searchQuery.value) {
    books.value = [];
    return;
  }

  try {
    const res = await axios.get(`http://localhost:8200/api/books/search?query=${searchQuery.value}`);
    books.value = res.data;
   
  } catch (err) {
    console.error('Fetch error:', err);
  }
};
console.log("query",searchQuery.value)
// onMounted(()=>{
//   fetchBooks();
// })

console.log('Books', books.value)

watch(
  () => route.query.query,
  (newVal) => {
    searchQuery.value = newVal;
    fetchBooks();
  },
  { immediate: true }
);

const highLightText = (text, query) => {
  if (!text) return '';  

  const adjustedQuery = query.trim().replace(/\s+/g, "\\s+");
  const regex = new RegExp(`${adjustedQuery}`, "ig"); // Case-insensitive matching
  return text.replace(regex, `<mark>${query}</mark>`); // replace by highlight
};

</script>


<template>
  <div class="search_container">
    <div class="search_page" v-if="books.length>0">
      <span
        >The Result of <strong>{{ searchQuery }}</strong></span
      >
      <p>Found : {{ books.length }} books</p>
      <div class="findByTitle">
        <div class="listBook" v-for="listBooks in books">
          <img v-if="listBooks.url_image ==null " :src="`http://localhost:8200/storage/${listBooks.path_image}`" alt="Image" />
          <img v-else :src="listBooks.url_image" alt="Image" />
          <RouterLink class="Link" :to="`/detail/${listBooks.id}`">
              <span
                class="title"
                v-html="highLightText(listBooks.title, searchQuery)"
              ></span
              ><br />
              <span v-html="highLightText(listBooks.author, searchQuery)"></span
              ><br />
              <span v-html="highLightText(listBooks.category, searchQuery)"></span
              ><br />
               <span v-html="highLightText(listBooks.description, searchQuery)"></span
              ><br />
          </RouterLink>
        </div>
      </div>
    </div>

  <h3 v-else>
      Book not found !
  </h3>
  
  </div>
  
 
</template>

<style scoped>
.listBook img {
  width: 4rem;
}
h3{
  text-align: center;
}
.Link{
    text-decoration: none;
    height: 7rem;
    display: flex;
    flex-direction: column;
    color: black;
    justify-content: center;
}
.findByTitle .title {
  color: rgb(0, 88, 229);
}

.listBook {
  display: flex;
  background-color: rgb(255, 255, 255);
  align-items: center;
  
  
  gap: 1rem;
  padding: 5px;
  font-size: 0.9rem;
  min-height: 8rem;
  border: 1px solid rgb(210, 210, 210);
  width: 100%;
  transition: all 0.3s;
}

.listBook a {
  align-self: self-start;
}
.search_page {
  background-color: aliceblue;
  min-height: 100vh;
}
.search_page .findByTitle {
  display: flex;
  height: auto;
  flex-wrap: wrap;
  place-items: center;
  row-gap: 5px;
  column-gap: 5px;
  padding: 10px;
}
</style>
