<template>
  <div class="admin-menu">
    <nav class="menu-panel" v-for="item in NavBar_data" :key="item.nav_name">
      <RouterLink
        :class="{ active: isSelectRoute(item.link_admin) }"
        class="link"
        :to="item.link_admin"
      >
        <span>{{ item.nav_name }}</span>
        <img :src="item.icon" alt="" width="20px" />
      </RouterLink>
    </nav>
  </div>
</template>

<script>
  import Dashboard from "@/assets/icons_nav/dashboard-solid-white.svg";
  import Product from "@/assets/icons_nav/book-solid-white.svg";
  import User from "@/assets/icons_nav/user-solid-white.svg";
  import Order from "@/assets/icons_nav/receipt-solid-white.svg";
  import Page from "@/assets/icons_nav/file-lines-solid-white.svg";
  import Promotion from "@/assets/icons_nav/bullhorn-solid-white.svg";
  import Accounting from "@/assets/icons_nav/calculator-solid-white.svg";
  import Notifcation from "@/assets/icons_nav/bell-solid-white.svg";
  import Option from "@/assets/icons_nav/gear-solid-white.svg";

export default {
  name: "Navbar_Admin",

  data() {
    return {
      NavBar_data: [
        {
          nav_name: "Dashboard",
          link_admin: "/admin",
          icon: Dashboard,
        },
        {
          nav_name: "Products",
          link_admin: "/admin/all-products",
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
  methods: {
    isSelectRoute(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
.menu-panel {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
}
.menu-panel span {
  color: aliceblue;
  font-size: 1.5rem;
}
.menu-panel a {
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
}
.admin-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #292929;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.admin-menu a {
  color: aliceblue;
}
.admin-menu nav:hover {
  background-color: #444;
  border-radius: 5px;
}
</style>
