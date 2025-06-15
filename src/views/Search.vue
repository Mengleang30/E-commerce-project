<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchQuery = ref(route.query.query?.toLocaleLowerCase() || '');
const books = ref([]);
const loading = ref(false);

const fetchBooks = async () => {
  if (!searchQuery.value) {
    books.value = [];
    return;
  }
  loading.value = true;
  try {
    const res = await axios.get(`https://projectip2-book-store-api.up.railway.app/api/books/search?query=${searchQuery.value}`);
    books.value = res.data;
  } catch (err) {
    console.error('Fetch error:', err);
  } finally {
    loading.value = false;
  }
};

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
  const regex = new RegExp(`${adjustedQuery}`, "ig");
  return text.replace(regex, `<mark>${query}</mark>`);
};
</script>

<template>
  <div class="search_container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="search_page" v-if="books.length>0">
        <span>
          The Result of <strong>{{ searchQuery }}</strong>
        </span>
        <p>Found : {{ books.length }} books</p>
        <div class="findByTitle">
          <div class="listBook" v-for="listBooks in books" :key="listBooks.id">
            <img v-if="listBooks.url_image == null" :src="`https://bucket-production-853a.up.railway.app/storage/${listBooks.path_image}`" alt="Image" />
            <img v-else :src="listBooks.url_image" alt="Image" />
            <RouterLink class="Link" :to="`/detail/${listBooks.id}`">
              <span class="title" v-html="highLightText(listBooks.title, searchQuery)"></span><br />
              <span v-html="highLightText(listBooks.author, searchQuery)"></span><br />
              <span v-html="highLightText(listBooks.category, searchQuery)"></span><br />
              <span v-html="highLightText(listBooks.description, searchQuery)"></span><br />
            </RouterLink>
          </div>
        </div>
      </div>
      <h3 v-else>
        Book not found !
      </h3>
    </div>
  </div>
</template>

<style scoped>
.listBook img {
  width: 4rem;
}
h3 {
  text-align: center;
}
.Link {
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
  padding: 10px 0;
  font-size: 0.9rem;
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
.loading {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem 0;
  color: #0058e5;
}
</style>
