<template>
  <div>
    <Navbar />
    <div class="admin-dashboard">
      <!-- Admin Dashboard Content Goes Here -->
      <div class="admin-menu">
        <Menu
          v-for="item in this.NavBar_Data"
          :key="item.nav_name"
          :Admin_Nav_name="item.nav_name"
          :Link="item.link_admin"
          :Image_svg="item.icon"
          :isSelectRoute="isSelectRoute(item.link_admin)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Admin/navBar-component.vue";
import Menu from "@/components/Admin/admin-menu-component.vue";

import Dashboard from "@/assets/icons_nav/dashboard-gauge-solid-white.svg";
import Product from "@/assets/icons_nav/book-solid-white.svg";
import User from "@/assets/icons_nav/user-solid-white.svg";
import Order from "@/assets/icons_nav/receipt-solid-white.svg";
import Page from "@/assets/icons_nav/file-lines-solid-white.svg";
import Promotion from "@/assets/icons_nav/bullhorn-solid-white.svg";
import Accounting from "@/assets/icons_nav/calculator-solid-white.svg";
import Notifcation from "@/assets/icons_nav/bell-solid-white.svg";
import Option from "@/assets/icons_nav/gear-solid-white.svg";

import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, computed } from "vue";

export default {
  name: "AdminDashboard",
  components: {
    Navbar,
    Menu,
  },
  data() {
    return {
      NavBar_data: [
        {
          nav_name: "Dashboard",
          link_admin: "#",
          icon: Dashboard,
        },
        {
          nav_name: "Products",
          link_admin: "#",
          icon: Product,
        },
        {
          nav_name: "Users",
          link_admin: "#",
          icon: User,
        },
        {
          nav_name: "Orders",
          link_admin: "#",
          icon: Order,
        },
        {
          nav_name: "Pages",
          link_admin: "#",
          icon: Page,
        },
        {
          nav_name: "Promotion",
          link_admin: "#",
          icon: Promotion,
        },
        {
          nav_name: "Accounting",
          link_admin: "#",
          icon: Accounting,
        },
        {
          nav_name: "Notifcation",
          link_admin: "#",
          icon: Notifcation,
        },
        {
          nav_name: "Options",
          link_admin: "#",
          icon: Option,
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

<style scoped>
.admin-dashboard {
  /* padding: 20px; */
  width: 100%;
  background-color: aqua;
  display: flex;
  justify-content: space-between;
}
.admin-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 13%;
  height: 500px;
  position: sticky;
  background-color: #292929;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.admin-menu a {
  color: aliceblue;
}
</style>
