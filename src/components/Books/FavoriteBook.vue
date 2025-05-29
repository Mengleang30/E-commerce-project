<script setup> 
 import { useUserStore } from '@/stores/userBookStore';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';//home page
import { useBookStore } from '@/stores';
import { BookData } from '@/stores/Data';

const userStore = useUserStore();
const BooksData = useBookStore();



const favoriteBooks = computed (()=>{
    if(!userStore.loggedInUser){
        return []; 
    }
    return BooksData.BookData.filter((books) =>
        userStore.loggedInUser.favorite.includes(books.id) 
        
    );
}
)


const handleRemove = (id)=>{
    if(!userStore.loggedInUser){
        return []; 
    }
    userStore.addToFavorite(id)
}

console.log(favoriteBooks.value);

</script>

<template>
    <article>
    
     <div class="favorites">
        
        <h2 >
            <hr>
    <div class="book-list">
           
        <div v-for="namebook in favoriteBooks" class="book-card" :key="namebook.id">
            <img :src="namebook.url_image" alt="book" class="book-image">

            <div class="book-content" >
            
                <h3 class="book-title">{{ namebook.title }}</h3>
                <p class="book-price">$ {{ namebook.price }}</p>
                <RouterLink :to="`/detail/${namebook.id}`" class="description">View Description</RouterLink>
            </div>
            <div class="book-actions">
                <button 
                @click="handleRemove(namebook.id)"
                class="delete-btn" title="Delete">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKwoPKQU2hidR3sNc12cNjYkuvDIR6p9_QgA&s" alt="Button" class="button-image">
                    
                        </button>
                        <button 
                        class="add-btn" title="Add">➕</button>
            </div>

        </div>
            
            </div>
           <RouterLink to="/">
            <button 

            class="add-product-btn" title="Add">Add Book</button>
        
           </RouterLink> 
            
            <div class="social-share">
        <span>Share on:</span>
        <div class="social-icons">
            
                <img src="https://e7.pngegg.com/pngimages/201/462/png-clipart-computer-icons-facebook-facebook-logo-black-and-white-thumbnail.png" class="share-image">
        
            
                <img src="https://cdn3.iconfinder.com/data/icons/transparent-on-dark-grey/500/icon-04-512.png" class="share-image">
        
    
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC2H6nbsX6BGEcajo-K-St33vlON_E-K7sAw&s" class="share-image">
            
            
                <img src="https://sweetwaternow.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2024/01/Depositphotos_676194222_XL-1-scaled.jpg" class="share-image">
            
           
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjuEnG5nObeDxGDzNOX7d0VKeNx5mL08a2yg&s" class="share-image">
            
            
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6c_wkx7wDbOuteOhc4LDZF2hPtEw-VzujAw&s" class="share-image">
        
            
            </div>
            </div>
            </hr>
        </h2>
       
        </div>
    
    </article>
    
</template>

<style scoped>
hr{
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
}

.favorites {
    max-width: 1500px;
    margin: 20px auto;
    padding: 20px;
    background: #f3eded;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(245, 244, 244, 0.1);
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 30px;
}


.book-list {
    max-height: 900px;
    overflow-y: auto;
    padding-right: 15px;
    scrollbar-width: 40px;
    scrollbar-color: #636161 #dee2e1;
}


.book-list::-webkit-scrollbar {
    width: 20px;
}
.book-list::-webkit-scrollbar-thumb {
    background: #202020;
    border-radius: 50px;
}
.book-list::-webkit-scrollbar-thumb:hover {
    background: #1b1a1a;
}

.book-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px; /* Inside card spacing */
    margin-bottom: 20px; /* Spacing between cards */
    border: 1px solid #d3cdcd;
    border-radius: 8px;
    background: #f3f2f2e1;
    box-shadow: 0 2px 4px rgb(167, 163, 163);
}
.book-card:last-child {
    border-bottom: none;
}

.book-image {
    height: 80px;
    width: auto;
    border-radius: 5px;
    margin-right: 10px;
}
.button-image {
    
    height: 20px;
    border-radius: 5px;
    margin: center;
}


.book-content {
    flex-grow: 1;
    margin-right: 100px;
}

.book-title {
    font-size: 14px;
    font-weight: bold;
    margin: 10;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.book-price {
    color: #333;
    font-size: 13px;
    margin: 10px 0;
}
.description{
    font-size: 12px;
    color: #252b68;

}
.book-edition {
    font-size: 12px;
    color: #007BFF;
    text-decoration: none;
}

.book-edition:hover {
    text-decoration: underline;
}


.book-actions {
    display: flex;
    flex-direction: column;
    gap: 15px; 
    
}

button {
    background: rgb(248, 247, 247);
    border: rgb(243, 233, 233);
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
    border-radius: 100%;
    transition: background-color 0.3s ease;
}

.delete-btn:hover {
    background-color: #f8d7da;
    color: #c82333;
}

.add-btn:hover {
    background-color: #d4edda;
    color: #218838;
}


.add-product-btn {

    margin: 0 auto;
    margin-top: 50px;
    padding: 10px 20px;
    background-color: #000;
    color: #ece3e3;

    border-radius: 15px;
    font-size: 14px;

}
.social-share {
    text-align: center;
    margin-top: 60px;
    font-size: 15px;
}
.share-image{
    height: 20px;
    border-radius: 1px;
    margin-right: 1px;
}


.social-icons {
    margin: 8px;
    font-size: 40px;
    color: #333;
    text-decoration: none;

}
.social-icons img{
    margin: 5px;
}

</style>