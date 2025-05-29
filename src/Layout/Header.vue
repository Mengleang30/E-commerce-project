<script>
import Navbar from "./Navbar.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

import cart from "@/assets/icons_nav/cart.png";
import bookmark from "@/assets/icons_nav/bookmark.png";
import feedback from "@/assets/icons_nav/feedback.png";
import login from "@/assets/icons_nav/login.png";
import product from "@/assets/icons_nav/product.png";
import books from "@/assets/icons_nav/books.png";
import logo_bookstore from "@/assets/logo_bookstore.jpg";
import { useUserStore } from "@/stores/userBookStore";
import { useBookStore } from "@/stores";

export default {
  name: "Header",
  components: {
    Navbar,
  },

  setup() {
    const isNavbarVisible = ref(false);
    const isRotated = ref(false);
    const navbarRef = ref(null);

    const router = useRouter();

    const userStore = useUserStore();
    const useStore = useBookStore();

    const textSearch = ref('');

   

    const handleSearch = ()=>{
      if(textSearch.value.trim()===""){
        return;
      }
      
      useStore.setTextFromSearch(textSearch.value)
      console.log(textSearch.value)
      textSearch.value = ""
      if (router.currentRoute.value.path !== '/search') {
        router.push('/search');
      }
      
    }


    const countCart = computed (()=>{
      if(!userStore.loggedInUser){
        return 0;
      }
      return userStore.loggedInUser.cart.length;
    })

   
    const show_notice = computed(()=>{
      if(!userStore.loggedInUser || userStore.loggedInUser.history.length<1){
        return false;
      }
      return true;
    })

    const ShowOptionLogout = ref(false);

    const handleShowOptionLogout = () => {
      ShowOptionLogout.value = !ShowOptionLogout.value;
    };

    const userName = computed(() => {
      return userStore.loggedInUser?.username || "Guest";
    });

    const handleLogout = () => {
      userStore.logout(); // Call logout method
      ShowOptionLogout.value = !ShowOptionLogout.value;
    };

    
    const toggleNavbar = () => {
      isNavbarVisible.value = !isNavbarVisible.value;
      isRotated.value = !isRotated.value;
    };

   
    const handleClickOutside = (e) => {
      if (navbarRef.value && !navbarRef.value.contains(e.target)) {
        isNavbarVisible.value = false;
        isRotated.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.addEventListener("click", handleClickOutside);
    });


    const check_online = computed(()=>{

      if (navigator.onLine){
        return {message : "You are online !" , status :true};
      }
        return {message : "You are offline !" , status :false};
    })

    return {
      isNavbarVisible,
      toggleNavbar,
      isRotated,
      navbarRef,
      userName,
      userStore,
      handleLogout,
      countCart,
      show_notice,
      ShowOptionLogout,
      handleShowOptionLogout,
      textSearch,
      handleSearch,
      check_online,
    };
  },

  data() {
    return {
      logo: logo_bookstore,

      NavBar_data: [
        {
          nav_name: "Home",
          link: "/",
          icon: books,
        },
        {
          nav_name: "Product",
          link: "/list-book",
          icon: product,
        },
        {
          nav_name: "Cart",
          link: "/cart",
          icon: cart,
        },
        {
          nav_name: "Favorite",
          link: "/favorite",
          icon: bookmark,
        },
        {
          nav_name: "History",
          link: "/history",
          icon: feedback,
        },
        {
          nav_name: "Sign In or Sign Up",
          link: "/login",
          icon: login,
        },
      ],
    };
  },

  computed: {
    NavBar_Data() {
      return this.NavBar_data;
    },
  },

  methods: {
    isSelectRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>
<template>
  <header ref="navbarRef">
    <div class="option">
      <div class="wrap_logo">
        <svg
          @click="toggleNavbar"
          :class="isRotated ? 'rotated' : 'non-rotated'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <RouterLink to="/">
          <img class="logo" :src="logo" alt="" />
        </RouterLink>
      </div>
    </div>

    <transition name="nav-transition">
      <div v-if="isNavbarVisible" class="wrap_nav">
        <h4>Welcome to Books Shop</h4>
        <div class="Nav_profile">
          <img
            src="https://img.icons8.com/?size=100&id=1cYVFPowIgtd&format=png&color=000000"
            alt=""
            width="45"
          />
          <div class="profile_nav">
            <h4>{{ this.userName }}</h4>
            <u>{{ userStore.loggedInUser?.email }}</u>
          </div>
        </div>
        <hr />
        <Navbar
          v-for="NavbarItem in this.NavBar_Data"
          :Nav_name="NavbarItem.nav_name"
          :Link="NavbarItem.link"
          :key="NavbarItem.nav_name"
          :Image="NavbarItem.icon"
          :isSelectRoute="isSelectRoute(NavbarItem.link)"
          :NavWithCart="NavbarItem.nav_name"
          :-number-cart="countCart"
          
        />
        <div>
          <div>
           <p :class="check_online.status ? 'online' : 'offline'">{{ check_online.message }}</p>
          </div>
          <p v-if="!userStore.loggedInUser">
            You can sign Up to create personal account .
          </p>
          <p v-else>
            Now you can purchase,add to your favorite and view history of purchasing.
          </p>
        </div>
      </div>
    </transition>


    <div class="search_form">
      <input type="text" placeholder="Search..." v-model="textSearch" @keydown.enter="handleSearch"/>
      <div class="search_btn"title="Search Now">
        <RouterLink to="/search" >
          <svg @click="handleSearch" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 80 80">
          <path fill="#b6c9d6" d="M6.998,77.5c-1.202,0-2.331-0.468-3.181-1.317c-1.753-1.753-1.753-4.607,0-6.36l36.828-35.11 l4.656,4.661L10.17,76.191C9.329,77.032,8.199,77.5,6.998,77.5z"></path><path fill="#788b9c" d="M40.636,35.411l3.966,3.97L9.825,75.829C9.069,76.584,8.066,77,6.998,77 c-1.068,0-2.072-0.416-2.827-1.171c-1.559-1.559-1.559-4.095-0.017-5.637L40.636,35.411 M40.654,34.013L3.464,69.469 c-1.952,1.952-1.951,5.116,0,7.068C4.44,77.512,5.719,78,6.998,78c1.279,0,2.558-0.488,3.534-1.464L46,39.366L40.654,34.013 L40.654,34.013z"></path><g><path fill="#d1edff" d="M52,53.5c-14.061,0-25.5-11.439-25.5-25.5S37.939,2.5,52,2.5S77.5,13.939,77.5,28 S66.061,53.5,52,53.5z"></path><path fill="#788b9c" d="M52,3c13.785,0,25,11.215,25,25S65.785,53,52,53S27,41.785,27,28S38.215,3,52,3 M52,2 C37.641,2,26,13.641,26,28s11.641,26,26,26s26-11.641,26-26S66.359,2,52,2L52,2z"></path></g>
          </svg>
        </RouterLink>
      </div>
       
    </div>



    <div class="cart_sign_in" >
      <RouterLink to="/cart" class="header_cart">
        <div class="number_cart">{{ countCart }}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 
                    .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358
                     60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 
                     2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
          />
        </svg>
      </RouterLink>


      <RouterLink to="/history" class="notification">
        <img width="32" height="32" src="https://img.icons8.com/?size=100&id=z8yqcMdq4T2h&format=png&color=000000" alt="">
        <div v-if="show_notice" class="number_notice"></div>
      </RouterLink>
      

      <RouterLink to="/login" class="sign_in" v-if="!userStore.loggedInUser">
        {{ this.userName }}
       
       <img
          src="https://img.icons8.com/?size=100&id=SGzXySsTA7pR&format=png&color=000000"
          alt=""
        />
      </RouterLink>
      <div class="sign_in" v-else>
        
        <p class="username">{{ this.userName }}</p>
        <img
          src="https://img.icons8.com/?size=100&id=SGzXySsTA7pR&format=png&color=000000"
          alt=""
        />
        <span @click="handleShowOptionLogout" class="logout">Logout</span>
      </div>
      <div class="modal-overlay" v-if="ShowOptionLogout"  @click="handleShowOptionLogout">
        <div class="option_logout" @click.stop>
          <h4>Do you want logout ?</h4>
          <div class="btnContainer">
            <button class="noBtn" @click="handleShowOptionLogout">No</button>
            <button class="yesBtn" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
header {
  background-color: rgb(255, 255, 255);
  display: flex;
  min-height: 5rem;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 1rem;
  width: 100%;
  column-gap: 1rem;
  justify-content: space-between;
  z-index: 300;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}

header svg {
  width: 2rem;
  background-color: transparent;
}



.search_form,
.option {
  display: flex;
  align-items: center;
  position: relative;
}

.option {
  width: 26%;
  gap: 6px;
}
.wrap_logo {
  background-color: white;
  align-items: center;
  display: flex;

}
.wrap_logo svg:hover{
  background-color: rgb(227, 227, 227);
  
}
.wrap_logo .title,
::placeholder {
  text-shadow: 0px 4px 2px rgb(0, 0, 0, 20%);
}

.logo {
  height: 4.2rem;
  width: 8rem;
  border-radius: 0.5rem;
  background-color: #296be0;
  display: flex;
}
.logo:hover{
  background-color: rgb(164, 164, 164);
}

::placeholder {
  font-size: 0.9rem;
  font-family: "Times New Roman", Times, serif;
}



.search_form {
  width: 40%;
  min-width: 6rem;
  padding: 5px;
  height: 2.2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;

}


.search_form .search_btn{
  position: absolute;
  right: 1%;
  top: 1%;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: .7rem;
}
.search_btn:hover{
  transform: scale(.9);
}

.search_btn svg{
  width: 1.4rem;
  height: 1.4rem;
}

.search_form input {
  outline: 1px solid rgb(132, 132, 132);
  padding-left: 0.6rem;
  width: 100%;
  height: 2.2rem;
  outline: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: .4rem;
  border: none;
  box-shadow: 0px 4px 3px rgb(0, 0, 0, 20%);
}
.search_form input:focus {
  outline-color: #3173ec;
}

header .header_cart {
  position: relative;
}

header .header_cart svg {
  color: green;
}

header .number_cart {
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 0.8rem;
  font-size: 0.6rem;
  height: 0.8rem;
  color: aliceblue;
  padding: 0.05rem;
  position: absolute;
  right: 0;
  box-shadow: 3px 3px 3px rgb(0, 0, 0, 20%);
}

.sign_in {
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.25rem;
  border-radius: 0.4rem;
  text-decoration: none;
  color: black;
  font-size: small;
  box-shadow: 3px 3px 3px rgb(0, 0, 0, 20%);
  gap: 3px;
  position: relative;

}

.sign_in img {
  width: 1.6rem;
  cursor: pointer;
}
.sign_in .username{
  overflow: hidden;
  width: 5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
    /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  text-align: center;
}
.sign_in .status{
  width: .6rem;
  height: .6rem;
  background-color: rgb(29, 246, 29);
  position: absolute;
  right: 0;
  border-radius: 50%;
  top: 0;
}

.cart_sign_in {
  display: flex;
  align-items: center;
  column-gap: 1.2rem;
}

.option svg,
.header_cart,
.sign_in {
  cursor: pointer;
}

nav {
  padding: 0.2rem;
  /* background-color: rgb(234, 234, 234); */
  height: auto;
}

nav ul {
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
}

nav ul img {
  width: 2rem;
}

nav ul .link {
  text-decoration: none;
  color: black;
  background-color: rgb(255, 255, 255);
  display: flex;
  height: 3rem;
  align-items: center;
  padding-left: 1.2rem;
  gap: 0.8rem;
  border-radius: 0.3rem;
  box-shadow: 3px 3px 6px rgb(0, 0, 0, 20%);
  width: 14rem;
}

nav ul .link:hover {
  background-color: rgb(234, 234, 234);
}

.wrap_nav {
  position: absolute;
  z-index: 100;
  left: 0rem;
  height: auto;
  top: 100%;
  background-color: whitesmoke;
  display: flex;
  max-width: 15rem;
  flex-direction: column;
  transition: transform 0.8s ease;
  padding: 5px;
  box-shadow: 3px 3px 4px rgba(93, 93, 93, 0.2);
  gap: 6px;
  text-align: center;
}

.nav-transition-enter-active,
.nav-transition-leave-active {
  transition: transform 0.7s ease;
}

.nav-transition-enter,
.nav-transition-leave-to {
  transform: translateX(-100%);
}
.nav-transition-enter-to {
  transform: translateX(0);
}

nav ul .link.active {
  color: white;
  font-weight: bold;
  text-decoration: underline;
  outline: 2px solid rgb(16, 152, 220);
  background-image: linear-gradient(
    to right bottom,
    #629aee,
    #4e8aea,
    #3b7be6,
    #296be0,
    #165ada
  );
}

.rotated {
  transform: rotate(90deg);
  transition: transform 0.3s;
}

.non-rotated {
  transform: rotate(0deg);
  transition: transform 0.3s;
}

.logout {
  color: red;
  font-size: 0.75rem;
 
}



.option_logout {
  background-color: #eeeeee;
  border-radius: 6px;
  padding: 8px;
  width: 14rem;
  height: auto;
  text-align: center;
  box-shadow: 2px 2px 3.6px rgba(29, 28, 28, 0.4);
  z-index: 1001;
}
.option_logout .btnContainer{
  display: flex;
}
.noBtn,
.yesBtn {
  background-color: white;
  width:12rem;
  margin: 10%;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  height: 2.2rem;
  cursor: pointer;
  transition: all 0.2s;
}
.noBtn {
  background-color: rgb(228, 228, 228);
}
.noBtn:hover {
  background-color: rgb(255, 255, 255);
}
.yesBtn {
  background-color: red;
  color: white;
}

.yesBtn:hover {
  background-color: rgb(255, 27, 27);
  color: white;
}

.Nav_profile {
  display: flex;
  align-items: center;
  gap: 5%;
}
.profile_nav{
  text-align: start;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
    /* Limit to 2 lines */
  -webkit-box-orient: vertical;
   overflow: hidden;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.notification{
  position: relative;
}
.number_notice{
  background-color: #296be0;
  position: absolute;
  top: 0;
  right: 0;
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
}

.online{
  color: rgb(8, 223, 8);
  font-weight: bold;
}
.offline{
  color: rgb(255, 17, 0);
  font-weight: bold;
}

@media screen and (max-width : 460px) {
  .header{
    padding: .5rem;
  }
  .logo {
    display: none;
  }
  
  .search_form .search_btn{
    top: 3px;
    right: 3px;
    width: 1.8rem;
    height: 1.8rem;
  }
  .search_form{
    width: 65%;
  }
  .sign_in img{
    display: none;
  }
  .sign_in{
    display: flex;
    flex-direction: column;
  }
  .logout {
  color: red;
  font-size: 0.75rem;
  background-color: rgb(240, 240, 240);
  width: 100%;
  text-align: center;
  border-radius: .2rem;
}
 
}

</style>
