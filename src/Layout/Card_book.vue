<script>
import axios from 'axios';
import { ref } from 'vue';
import { onMounted, onBeforeUnmount } from 'vue';

export default {
    name: "Card_book",

    setup() {
    const showBooks = ref(null);

    const fetchCardBooks = async ()=>{
        try{
            const res = await axios.get("http://localhost:8200/api/books/show_books")
            showBooks.value = res.data;
            // console.log("tttt",res.data)
        }
        catch(e){

        }
       
    }

    let intervalId = null;
    onMounted(() => {
        fetchCardBooks();
        intervalId = setInterval(fetchCardBooks, 4000); 
        setTimeout(()=>{

            fetchCardBooks();
        },4000)
     
    });

  
    onBeforeUnmount(() => {
      if (intervalId) {
        clearInterval(intervalId); // clean up the timer
      }
    });

   
    return {
      showBooks,
      
    };
  },


}
</script>

<template>
  
    <div v-if="showBooks" class="wrap">

  
    <div class="card" v-for="book in showBooks" :key="book.id">
      <article class="article">
        <h4>{{ book.title }}</h4>
        <p>By : <strong>{{ book.author }}</strong> - {{ book.description }}</p>
        <RouterLink :to="`/detail/${book.id}`">
          <button class="btn">View Now</button>
        </RouterLink>
      </article>
      <img v-if="book.url_image==null" :src="`http://localhost:8200/storage/${book.path_image}`" alt="Book Cover" />
      <img v-else :src="book.url_image" alt="Book Cover" />
    </div>
  </div>
  <div v-else>Loading books...</div>

</template>

<style scoped>
.card {
    display: flex;
    padding: 16px 30px;
    justify-content: space-between;
    height: 14rem;
    width: 32rem;
    box-shadow: 0px 4px 2px rgb(0, 0, 0, 20%);
    background: linear-gradient(to right,
            rgba(135, 161, 174, 1) 29%,
            rgba(217, 217, 217, 1) 81%);
    color: white;
    border-radius: .4rem;
    position: relative;
    z-index: 120;
    transition: 1.8s all; 
    
}
.wrap{
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
    padding: 5px;
    
}

.wrap_arrow {
    position: absolute;
    width: 100%;
    top: 50%;
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
}

.card img {
    width: 6rem;
    height: 8rem;
    box-shadow: 2px 4px 2px rgb(0, 0, 0, 20%);
}

.left,
.right {
    background-color: transparent;
    width: 2rem;
    height: 2rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: rgb(13, 13, 13);
    font-weight: bold;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
    cursor: pointer;
    transition: all .2s; 
}

.left {
    top: 50%;
    left: 4%;
}

.right {
    top: 50%;
    right: 0%;
}

.card .article {
    display: inline;
    padding-top: 10px;
    height: auto;
    line-height: 1.5rem;
    transition: all .3s; 
}

.card .article p {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 6rem;
}

.card .article h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 1.6rem;
}
.card .article button:hover, .left:hover ,.right:hover{
    background-color: rgb(83, 173, 247);
    outline: none;
    color: aliceblue; 
}
.card .article button {
    border: none;
    width: 5rem;
    border-radius: .16rem;
    height: 2rem;
    background-color: aliceblue;
    margin-top: 10px;
    margin-left: 1rem;
    outline: 1px solid rgb(255, 255, 255);
    cursor: pointer;
    transition: all .4s;
}


@media screen and (max-width : 460px) {
    .card img {
    width: 4rem;
    box-shadow: 2px 4px 2px rgb(0, 0, 0, 20%);
}
    /* .card {
    height: 70%;
    } */
    .card .article{
    font-size: 14px;
    }
    .card .article .btn{
        font-size: 12px;
        width: 4rem;
        margin-left: 30%;
    }
}
</style>