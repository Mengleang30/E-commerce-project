<script>
import Book_Landing from "@/components/Books/Category_landing.vue";
import Detail_book from "@/components/Books/Detail_book.vue";
import { useBookStore } from "@/stores";

export default {
  name: "Landing",

  components: {
    Book_Landing,
    Detail_book,
  },

  setup() {
    const BookStore = useBookStore();

    return {
      BookStore,
    };
  },
};
</script>

<template>
  <div class="Landing">
    <Book_Landing />
  </div>
</template>

<style scoped></style>
