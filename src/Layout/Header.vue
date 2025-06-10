<script>
import Navbar from "./Navbar.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";

import cart from "@/assets/icons_nav/cart.png";
import bookmark from "@/assets/icons_nav/bookmark.png";
import feedback from "@/assets/icons_nav/feedback.png";
import login from "@/assets/icons_nav/login.png";
import product from "@/assets/icons_nav/product.png";
import notification from "@/assets/icons_nav/notifications.png";
import books from "@/assets/icons_nav/books.png";
import logo_bookstore from "@/assets/logo_bookstore.jpg";
import { useUserStore } from "@/stores/userBookStore";
import { useBookStore } from "@/stores";
import { useAuthentication } from "@/stores/authentication";
import { useNotification } from '@/stores/notification';
import { Bell, ShoppingCart, User } from 'lucide-vue-next';
import { Search } from 'lucide-vue-next';
import useCarts from "@/stores/carts";
export default {

  name: "Header",
  components: {
    Navbar,
    Bell,
    User,
    ShoppingCart,
    Search
  },

  setup() {
    const isNavbarVisible = ref(false);
    const isRotated = ref(false);
    const navbarRef = ref(null);
    const Auth = useAuthentication();

    const CheckLogin = ref(false)

    const router = useRouter();

    const userStore = useUserStore();
    const useCart = useCarts();

    const textSearch = ref('');

    const NotificationStore = useNotification();

    const number_notice = computed(() => {
      if (!NotificationStore.notifications || !Array.isArray(NotificationStore.notifications)) {
        return 0;
      }
      return NotificationStore.notifications.filter(noti => noti.read_at === null).length;
    });

   
    const countCart = computed(() => {
      if (!userStore.loggedInUser) {
        return 0;
      }
      return userStore.loggedInUser.cart.length;
    })


    const show_notice = computed(() => {
      if (!userStore.loggedInUser || userStore.loggedInUser.history.length < 1) {
        return false;
      }
      return true;
    })

    const ShowOptionLogout = ref(false);

    const handleShowOptionLogout = () => {
      ShowOptionLogout.value = !ShowOptionLogout.value;
    };

    const userName = computed(() => {
      return Auth.loggedInUser?.name || "Guest";
    });

     const userEmail = computed(() => {
      return Auth.loggedInUser?.email || "Guest Account";
    });

    const handleLogout = () => {
      Auth.logout(); // Call logout method
      ShowOptionLogout.value = !ShowOptionLogout.value;
      router.push("/"); // Redirect to login page
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
    onMounted(async () => {
      document.addEventListener("click", handleClickOutside);

      // if(Auth.token){
      //   Auth.fetchLoggedUser();
      //   // console.log(Auth.fetchLoggedUser)
      // }
      await Auth.fetchLoggedUser();
      useCart.fetchCarts();


    });
     const numberCart = computed(() => {
      if (!useCart.carts || !Array.isArray(useCart.carts.cart_books)) {
        return 0;
      }
      return useCart.carts.cart_books.length;
    })

    //  console.log("Carts :",numberCart.value.length)
      //  console.log("Carts1 :",useCart.carts)


    onUnmounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    // console.log("Header mounted", Auth.isAuthenticated);
    const check_online = computed(() => {

      if (navigator.onLine) {
        return { message: "You are online !", status: true };
      }
      return { message: "You are offline !", status: false };
    })

    const searchQuery = ref('');
    const handleSearch = () => {
      router.push({ path: '/search', query: { query: searchQuery.value } });
      };

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
      Auth,
      userEmail,
      NotificationStore,
      number_notice,
      CheckLogin,
      searchQuery,
      numberCart
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
          nav_name: "Notification",
          link: "/notification",
          icon: notification,
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
      if (this.Auth.isAuthenticated) {
        return this.NavBar_data.filter(nav => nav.link !== "/login");
      }
      return this.NavBar_data;
    },
   loggedInUser(){
    return this.loggedInUser || {}
   }
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
        <svg @click="toggleNavbar" :class="isRotated ? 'rotated' : 'non-rotated'" xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
          <RouterLink to="/profile" class="profile_link">
               <img
          v-if="loggedInUser.google_id == null && loggedInUser.picture"
          :src="`http://localhost:8200/storage/${loggedInUser.picture}`"
          alt="Profile"
          class="picture"
        />
        <img
            v-else-if="
            
              Auth.loggedInUser.google_id !== null && Auth.loggedInUser.picture"
            :src="`http://localhost:8200/storage/${Auth.loggedInUser.picture}`"
            alt="Profile"
            class="picture"
          />
        <img
          v-else-if="!loggedInUser.picture"
          src="https://img.icons8.com/?size=100&id=1cYVFPowIgtd&format=png&color=000000"
          alt="Profile"
          class="picture"
        />
        <img
          v-else
          :src="loggedInUser.picture"
          alt="Profile"
          class="picture"
        />
          </RouterLink>
        
          <div class="profile_nav">
            <h4>{{ userName }}</h4>
            <span v-if="Auth.isAuthenticated">{{ userEmail }}</span>
            <span v-else>Guest Account</span>
          </div>
        </div>
        <hr />
        <Navbar v-for="NavbarItem in this.NavBar_Data" :Nav_name="NavbarItem.nav_name" :Link="NavbarItem.link"
          :key="NavbarItem.nav_name" :Image="NavbarItem.icon" :isSelectRoute="isSelectRoute(NavbarItem.link)"
          :NavWithCart="NavbarItem.nav_name" :-number-cart="countCart" :number_notice="number_notice" />
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
      <input type="text" placeholder="Search..." v-model="searchQuery" @keydown.enter="handleSearch" />
      <div class="search_btn" title="Search Now">
        <RouterLink to="/search">
           <Search @click="handleSearch"/>
        </RouterLink>
      </div>

    </div>



    <div class="cart_sign_in">
      <RouterLink to="/cart" class="header_cart">
        <div class="number_cart">{{ numberCart }}</div>
        <ShoppingCart />
      </RouterLink>


      <RouterLink to="/notification" class="notification">
        <div class="number_cart">{{ number_notice }}</div>
        <Bell />
        <div v-if="show_notice" class="number_notice"></div>
      </RouterLink>


      <RouterLink to="/login" class="sign_in" v-if="!Auth.isAuthenticated">
        <span class="username">{{ this.userName.substring(0, 18) + "..." }}</span>
        <User class="user" />
      </RouterLink>
      <div class="sign_in" v-else>
        <RouterLink class="profile" to="/profile">{{ this.userName }}</RouterLink>
        <User class="user" />
        <span @click="handleShowOptionLogout" class="logout">Logout</span>
      </div>
      <div class="modal-overlay" v-if="ShowOptionLogout" @click="handleShowOptionLogout">
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


.wrap_logo svg:hover {
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

.logo:hover {
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

.profile {
  text-decoration: none;
  color: #296be0;
  font-weight: 600;
  padding: 4px;
  border-radius: 6px;
  transition: all .3s;
}

.profile:hover {
  background-color: rgb(21, 144, 245);
  color: white;
}

.search_form .search_btn {
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

.search_btn:hover {
  transform: scale(.9);
}

.search_btn svg {
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

.header_cart {
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
  text-align: center;
  color: black;
  font-size: small;
  box-shadow: 3px 3px 3px rgb(0, 0, 0, 20%);
  gap: 3px;
  position: relative;
  width: 80%;

}

.sign_in img {
  width: 1.6rem;
  cursor: pointer;
}

.sign_in .username {
  font-size: small;
  text-align: center;
}

.sign_in .status {
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
  background-image: linear-gradient(to right bottom,
      #629aee,
      #4e8aea,
      #3b7be6,
      #296be0,
      #165ada);
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
  color: white;
  font-size: 0.8rem;
  padding: 0.4rem;
  border-radius: 6px;
  background-color: red;
  box-shadow: 2px 2px 3.6px rgba(29, 28, 28, 0.4);

}

.logout:hover {
  background-color: rgb(244, 44, 44);
}



.option_logout {
  background-color: #eeeeee;
  border-radius: 6px;
  padding: 8px;
  width: 20rem;
  height: auto;
  text-align: center;
  box-shadow: 2px 2px 3.6px rgba(29, 28, 28, 0.4);
  z-index: 1001;
}

.option_logout .btnContainer {
  display: flex;
}

.noBtn,
.yesBtn {
  background-color: white;
  width: 14rem;
  margin: 10%;
  border: none;
  outline: none;
  font-size: large;
  border-radius: 0.5rem;
  height: 2.4rem;
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

.profile_nav {
  text-align: start;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.profile_nav span {
  font-size: 11px;
  background-color: #296be0;
  width: 100%;
  border-radius: 4px;
  padding: 2px;
  color: white;
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

.notification {
  position: relative;
}

.number_notice {
  background-color: #296be0;
  position: absolute;
  top: 0;
  right: 0;
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
}

.online {
  color: rgb(8, 223, 8);
  font-weight: bold;
}

.offline {
  color: rgb(255, 17, 0);
  font-weight: bold;
}

.picture {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

@media screen and (max-width : 560px) {
  .header {
    padding: .5rem;
  }

  .logo {
    display: none;
  }

  .user {
    display: none;

  }

  .search_form .search_btn {
    top: 3px;
    right: 3px;
    width: 1.8rem;
    height: 1.8rem;
  }

  .search_form {
    width: 65%;
  }

  .sign_in img {
    display: none;
  }

  .sign_in {
    display: flex;
    flex-direction: column;
  }

  .logout {
    color: white;
    font-size: 0.8rem;
    padding: 0.4rem;
    width: 100%;
    text-align: center;
    border-radius: 6px;
    background-color: red;

  }

}
</style>
