<script setup>
import { useBookStore } from '@/stores';

import { defineProps } from 'vue';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const useStore = useBookStore();

const textSearch = ref('');

   

const handleSearch = ()=>{
  if(textSearch.value.trim()===""){
    return;
  }
  
  useStore.setTextFromSearch(textSearch.value)
  console.log(textSearch.value)
  textSearch.value = ""
  router.push('/search');
  
}

const handleSearchByCategory = (text)=>{
  useStore.setTextFromSearch(text)
  router.push('/search');
  
}

const texts = [
    "Your next adventure awaits in the pages of a book.",
    "Discover the world of imagination with us!",
    "Find your perfect book today!"
  ];
const index = ref(0)
  

setInterval(()=>{
        index.value = (index.value + 1) % (texts.length);
},6000)



const Category = [
   'History',
   'Philosophy',
   'Motivational',
   'Novel',
   'Drama',
   'Romance',
]
const Author = [
   'Jane Austen',
   'Rhonda Byrne',
   'Harper Lee',
   'James Clear',
   'Charles Duhigg',
   'Donalyn Miller',
]


defineProps ({
  Scroll : Function,
  ScrollToTop : Function,

})

</script>

<template>
    <div class="ShowLanding">
        <div class="left_show">
            <div class="wrap_quick_link">
                <div class="wrap_btn">
                    <button><RouterLink class="link" to="/list-book">Our Product</RouterLink> </button>
                    <button>Contact</button>
                    <button>Support</button>
                    <button>Custom Service</button>
                </div>
            </div>
            <div class="showing"> 
                <h1>
                    Huge collection of <strong>best books</strong> 
                </h1>
                <h2>Discover the Joy of Real Books</h2>
                <div class="wrap_btn">
                    <button @click="Scroll">Start your collection today!</button>
                    <p class="telling_text">{{ texts[index] }}</p>
                </div>
                <p>
                    An online book is a resource in book-like form that is only available to read on 
                    the internet. It differs form the common idea of an e-book
                </p>  
            </div>
            <div class="form">
                <div class="wrap_form">
                    <input  @keydown.enter="handleSearch" type="text" placeholder="Search for books ..." v-model="textSearch">
                    <button type="submit" @click="handleSearch">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0,0,256,256">
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M27,9c-9.925,0 -18,8.075 -18,18c0,9.925 8.075,18 18,18c4.12921,0 7.9263,-1.41263 10.9668,-3.75977l13.08203,13.08203c0.904,0.904 2.36944,0.904 3.27344,0c0.904,-0.904 0.904,-2.36944 0,-3.27344l-13.08203,-13.08203c2.34713,-3.0405 3.75977,-6.83758 3.75977,-10.9668c0,-9.925 -8.075,-18 -18,-18zM27,13c7.719,0 14,6.281 14,14c0,7.719 -6.281,14 -14,14c-7.719,0 -14,-6.281 -14,-14c0,-7.719 6.281,-14 14,-14z"></path></g></g>
                            </svg>
                    Search</button>
                </div>
            </div>
            <div class="explore">
                <h3>Explore Our Collections </h3>
                <h4>Quick Search </h4>
                <div class="wrap_grid">
                    <div class="container_explore">
                        <div v-for="list in Category" @click="handleSearchByCategory(list)" class="child">{{ list }}</div>
                    </div>
                    <div class="container_explore">
                        <div v-for="list in Author" @click="handleSearchByCategory(list)" class="child">{{ list }}</div>
                    </div>  
                </div>
            </div>
        </div>        
        <div class="backToTop" @click="ScrollToTop">
            <img src="https://img.icons8.com/?size=100&id=80689&format=png&color=000000" alt="Back To Top">
        </div>
    </div>
  
</template>

<style scoped>

.ShowLanding{
    min-height: 125vh;
    display: flex;
    position: relative;
    background-image: linear-gradient(to right, #d8e0ec, #c8e1eb, #bce2e0, #bee0cc, #cfdab6);
    background-size: 300% 300%;
    animation: gradientAnimation 10s ease infinite;
}
.ShowLanding .backToTop{
    position: absolute;
    top: 98%;
    left: 50%;
    translate: -50% -50%;
    cursor: pointer;
    transform: rotate(90deg);
    display: flex;
    padding: 3px;
}
.backToTop img{
    width: 1.8rem;
   
}
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.left_show{
    flex-grow: 1;
    padding: 10px;
    max-height: 70vh;
}
.left_show .showing{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    /* font-size: 1rem; */
   
}
.showing h2{
    background: -webkit-linear-gradient(#2365eb, #289844);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    animation: gradientTextAnimation 5s ease infinite;
    font-size: 2.5rem;
}
@keyframes gradientTextAnimation {
    0% {
        background: -webkit-linear-gradient(#2365eb, #289844);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    25% {
        background: -webkit-linear-gradient(#7296dd, #289844);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    50% {
        background: -webkit-linear-gradient(#ff6a00, #ee0979);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    75% {
        background: -webkit-linear-gradient(#df7224, #85d807);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    100% {
        background: -webkit-linear-gradient(#2365eb, #289844);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
.showing h1{
    text-align: center;

}
.showing strong {
    background: -webkit-linear-gradient(#45a9f5, #1912ca);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.showing .wrap_btn{
    text-align: center;
}
.showing .telling_text{
    font-size: small;
    padding: 5px;
    color: rgb(91, 91, 90);
}
.showing p{
    color: gray;
    text-align: center;
}
.showing button {
    background-color: rgb(54, 13, 239);
    color: aliceblue;
    width: 14rem;
    height: 3rem;
    border-radius: .6rem;
    border: 1px solid rgb(213, 208, 208);
    padding-left: 5px;
    box-shadow: 1px 1px 1px rgba(1, 1, 1, .2);
    align-self: center;
    font-size: 1rem;
    font-weight: bold;
}
.showing button a{
  color: aliceblue;
  text-decoration: none;
}
.showing button:hover {
    background-color: rgb(83, 46, 248);
    color: aliceblue;
  
}
.left_show .form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
}

.left_show .form .wrap_form{
   justify-content: center;
}
.left_show .form input{
    height: 2.8rem;
    width: 40%;
    border-radius: .6rem;
    border: 1px solid rgb(213, 208, 208);
    padding-left: 8px;
    box-shadow: 1px 1px 1px rgba(1, 1, 1, .2);
}
.left_show .form input::placeholder{
    font-size: larger;
}
.left_show .form .wrap_form button{
    height: 2.8rem;
    width: 7rem;
    border-radius: 1rem;
    border: 1px solid rgb(160, 217, 252);
    padding-left: 5px;
    box-shadow: 1px 1px 1px rgba(1, 1, 1, .2);
    background-color: rgb(73, 88, 247);
    color: aliceblue;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;

}
.left_show .form wrap_form button:hover{
    background-color: steelblue;
}

.left_show .form .wrap_form {
    gap: 5px;
    display: flex;
}

.wrap_quick_link{
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.wrap_quick_link .wrap_btn{
    /* width: 500px; */
    margin-top: 5px;
    display: flex;
    gap: 1%;
    padding: 5px 10px;
    align-self: flex-end;
    /* align-items: center;
    justify-content: center;
    background-color: #1912ca; */
}
.wrap_quick_link button{
    width: 9rem;
    align-self: center;
    height: 2rem;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 2px 3px rgba(112, 112, 112,.3);
    border-radius: .4rem;;
    color: #000000;
    transition: all .3s;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 30px;
}
.wrap_quick_link button .link{
    text-decoration: none;
    color: #000000;
}
.wrap_quick_link button .link:hover{
    color: whitesmoke;
}
.wrap_quick_link button:hover {
    background-color: #45a9f5;
    color: whitesmoke;
}
.explore{
    text-align: center;
}
.container_explore{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 5px;
    width: 100%;
    padding: 5px;
    height: auto;
}
.explore h4{
    text-align: start;
    padding-left: 5px;
    color: #2821ff;
}

.explore .wrap_grid{
    display: flex;
}

.container_explore .child{
    background-color: #f3f3f3;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.6rem;
    font-weight: bold;
    color: rgb(90, 12, 224);
    cursor: pointer;
    border: 1px solid rgba(192, 192, 192, 0.4);
    border-radius: .3rem;
    box-shadow: 1px 1px 1px rgba(1, 1, 1, .2);
    transition: all .4s;
}
.container_explore .child:hover{
    background-color: #2821ff;
    color: #fffffd;
}



@media screen and (max-width : 460px) {
    .showing h2{
        font-size: 1.4rem;
    }
    .left_show .form .wrap_form button{
        font-size: small;
    }
    .wrap_quick_link button{
        font-size: 0.8rem;
        width: 6rem;
    }
 }

@media screen and (max-width : 560px) {
    .showing h2{
        font-size: 1.6rem;
    }
    .left_show .form .wrap_form button{
        font-size: small;
    }
    .wrap_quick_link button{
        font-size: 0.8rem;
        width: 6rem;
    }
 }
</style>