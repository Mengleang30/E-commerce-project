<template>

    <div class="category_landing_5star">
        <div class="wraping" >
            <h3 > 5 Stars Books ⭐⭐⭐⭐⭐
            </h3>         
        </div>
        <div class="contianer_book">
            <Book_landing  v-for="Books in fiveStarBooks.slice(0,12)" :key="Books.id "
            :Title="Books.title"
            :Author="Books.author"
            :Year="Books.published"
            :Url_img="Books.url_image"
            :Book_category="Books.category"
            :Price="Books.price"
            :LinkToDetail="Books.id"
            :HaveDiscount="Books.discount"
            :AfterDiscount="(Books.price)*(1 - Books.discount/100)"
            :idBook="Books.id"
            :Clicked_favorite="false"
            />
        </div>
    </div>
</template>


<script >
import Book_landing from './Book_landing.vue';
import { useBookStore } from '@/stores';
import { computed } from 'vue';
export default {
    name : "FiveStar",
    components : {
        Book_landing,
    },
    setup(){
    const store = useBookStore();
    const fiveStarBooks = computed(()=>{
    return store.BookData.filter((books)=> books.rated>4)
        })
    return {fiveStarBooks,}

}

}

</script>

<style scoped>
.category_landing_5star{
    background:linear-gradient(to right top, #d8e9b1, #d9ecad, #daf0a9, #dbf3a5, #dcf6a1);;
    padding: 1rem 0rem;
    margin: 2rem 0;

}
.category_landing_5star .wraping{
    background-color: rgb(207, 255, 255);
    padding: 5px 0;
    text-align: center;
}

.contianer_book{
    display: flex;
    padding: 5px;
    gap: 5px;
    overflow-x: auto;
    padding-bottom: .8rem;
    scroll-behavior: smooth;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
}
</style>