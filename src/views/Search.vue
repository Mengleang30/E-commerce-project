<script setup>
import { useBookStore } from "@/stores";
import { computed, watch } from "vue";

const SearchBooks = useBookStore();
const TextSearch = computed(() => SearchBooks.Search);
const filterBooks = computed(() => {
const SearchTerm = TextSearch.value.trim().toLocaleLowerCase();
 

  if (!SearchTerm) {
    return [];
  } else {
    return SearchBooks.BookData.filter((book) => {
      const titleMatch = book.title.trim().toLocaleLowerCase().includes(SearchTerm);
      const authorMatch = book.author.trim().toLocaleLowerCase().includes(SearchTerm);
      const categoryMatch = book.category.join("").trim().toLocaleLowerCase().includes(SearchTerm)
      // Return true if any field matches
      return titleMatch || authorMatch || categoryMatch;
    });
  }
});

const highLightText = (text, query) => {

  const adjustedQuery = query.trim().replace(/\s+/g, "\\s+");

  const regex = new RegExp(`${adjustedQuery}`, "ig"); //Case-insensitive matching
  return text.replace(regex, `<mark>${query}</mark>`); // replace by highlight
};
</script>


<template>
  <div class="search_container">
    <div class="search_page" v-if="filterBooks.length>0">
      <span
        >The Result of <strong>{{ TextSearch }}</strong></span
      >
      <p>Found : {{ filterBooks.length }} books</p>
      <div class="findByTitle">
        <div class="listBook" v-for="books in filterBooks">
          <img :src="books.url_image" alt="Image" />
          <RouterLink class="Link" :to="`/detail/${books.id}`">
              <span
                class="title"
                v-html="highLightText(books.title, TextSearch)"
              ></span
              ><br />
              <span v-html="highLightText(books.author, TextSearch)"></span
              ><br />
              <span v-html="highLightText(books.category.join(' /'), TextSearch)"></span
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  height: auto;
  place-items: center;
  row-gap: 5px;
  column-gap: 5px;
  padding: 10px;
}
</style>
