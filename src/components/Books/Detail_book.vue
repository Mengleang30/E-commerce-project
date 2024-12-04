<script>
import { useBookStore } from '@/stores';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default{
    name : "Detail_book",


    setup () {
        
        const bookStore = useBookStore();
        const route = useRoute();

        const bookId = parseInt(route.params.id);

        const found_book = computed (()=>{
            return bookStore.getProductId(bookId);
        });
      
        return {
            found_book,
        }
    },

}
</script>

<template>
    <div v-if="found_book">
        <h2 >{{ found_book.title}}</h2>
    </div > 
    <h2 v-else>Book not found</h2>
</template>