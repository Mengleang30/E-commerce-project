<script>
import Navbar from "./Navbar.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink } from "vue-router";

import cart from "@/assets/icons_nav/cart.png";
import bookmark from "@/assets/icons_nav/bookmark.png";
import feedback from "@/assets/icons_nav/feedback.png";
import login from "@/assets/icons_nav/login.png";
import product from "@/assets/icons_nav/product.png";
import books from "@/assets/icons_nav/books.png";
import logo_bookstore from "@/assets/logo_bookstore.jpg";
import { useUserStore } from "@/stores/userBookStore";

export default {
  name: "Header",
  components: {
    Navbar,
  },

  setup() {
    const isNavbarVisible = ref(false);
    const isRotated = ref(false);
    const navbarRef = ref(null);

    const userStore = useUserStore();


    const countCart = computed (()=>{
      if(!userStore.loggedInUser){
        return 0;
      }
      return userStore.loggedInUser.cart.length;
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

    return {
      isNavbarVisible,
      toggleNavbar,
      isRotated,
      navbarRef,
      userName,
      userStore,
      handleLogout,
      countCart,
      ShowOptionLogout,
      handleShowOptionLogout,
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
          nav_name: "Feedback",
          link: "/feedback",
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
        <img class="logo" :src="logo" alt="" />
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
      <input type="text" placeholder="Search Book here..." />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>

    <div class="cart_sign_in">
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
      <div class="option_logout" v-if="ShowOptionLogout">
        <h4>Do you want logout ?</h4>
        <button class="noBtn" @click="handleShowOptionLogout">No</button>
        <button class="yesBtn" @click="handleLogout">Logout</button>
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

.search_form {
  width: 36%;
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
.wrap_logo .title,
::placeholder {
  text-shadow: 0px 4px 2px rgb(0, 0, 0, 20%);
}

.logo {
  height: 4.2rem;
  width: 8rem;
  border-radius: 0.5rem;
}

::placeholder {
  font-size: 0.9rem;
  font-family: "Times New Roman", Times, serif;
}

.search_form input,
button {
  height: 2.2rem;
  outline: 1px solid rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: 0px 4px 3px rgb(0, 0, 0, 20%);
}

.search_form button {
  position: absolute;
  right: 0;
  width: 2.4rem;
  padding: 0.1rem;
  border-radius: 0 0.6rem 0.6rem 0;
  background-color: rgba(237, 237, 237, 1);
  cursor: pointer;
}

.search_form button svg {
  width: 1.2rem;
}

.search_form input {
  outline: 1px solid rgb(132, 132, 132);
  border-radius: 0.6rem;
  padding-left: 0.6rem;
  width: 100%;
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

}

.sign_in img {
  width: 1.6rem;
  cursor: pointer;
}
.sign_in .username{
  overflow: hidden;
  width: 4.2rem;
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
  top: 6.02rem;
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
  position: absolute;
  top: 5rem;
  right: 1rem;
  box-shadow: 2px 2px 3.6px rgba(29, 28, 28, 0.4);
}
.noBtn,
.yesBtn {
  background-color: white;
  width: 30%;
  margin: 10%;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  height: 2rem;
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
</style>
