<script>
import FavoriteBook from '@/components/Books/FavoriteBook.vue';
import { useBookStore } from '@/stores';
export default{
    name : "Favorite",
    components : {
        FavoriteBook,
    }

    // setup(){
    //     const Data = useBookStore();

    //     return {
    //         BookData : Data.BookData,
    //     }
    // },

}
</script>

<template>

    <h2>Favorite page</h2>

    <FavoriteBook/>

    
   
</template>

<style scoped>
h2{
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin-top: 30px;
}


</style>