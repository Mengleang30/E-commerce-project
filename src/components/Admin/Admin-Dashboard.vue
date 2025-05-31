<template>
  <div class="admin-dashboard">
    <Navbar />
    <div class="dashboard-content">
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
      <div class="dashboard-details">
        <h1>Dashboard</h1>
        <div class="expense-tracker-detail">
          <h2>Expense Tracker</h2>
          <div class="expense-items">
            <expenseTracker
              v-for="expense in this.expenses"
              :key="expense.id"
              :title="expense.title"
              :amount="expense.amount"
              :icon_money="expense.icon_money"
              :icon_status="expense.icon_status"
            />
          </div>
        </div>
        <div class="Info-detail">
          <h2>Information</h2>
          <div class="list-info-colored">
            <infoColoredComponent />
          </div>
        </div>
        <div class="product-activity-detail">
          <h2>Product Activity</h2>
          <div class="pro-act-two-col">
            <stockAlerts />
            <topSellingProduct />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Admin/admin-components/navBar-component.vue";
import Menu from "@/components/Admin/admin-components/admin-menu-component.vue";
import expenseTracker from "@/components/Admin/admin-components/expense-tracker.vue";
import stockAlerts from "@/components/Admin/admin-components/stock-alert.vue";
import topSellingProduct from "@/components/Admin/admin-components/top-selling-product.vue";
import InfoColoredComponent from "@/components/Admin/admin-components/info-colored-component.vue";

import Dashboard from "@/assets/icons_nav/dashboard-gauge-solid-white.svg";
import Product from "@/assets/icons_nav/book-solid-white.svg";
import User from "@/assets/icons_nav/user-solid-white.svg";
import Order from "@/assets/icons_nav/receipt-solid-white.svg";
import Page from "@/assets/icons_nav/file-lines-solid-white.svg";
import Promotion from "@/assets/icons_nav/bullhorn-solid-white.svg";
import Accounting from "@/assets/icons_nav/calculator-solid-white.svg";
import Notifcation from "@/assets/icons_nav/bell-solid-white.svg";
import Option from "@/assets/icons_nav/gear-solid-white.svg";

import dollarCoin from "@/assets/dollar-hand.svg";
import plusRound from "@/assets/plus-round-green.svg";

import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted, onUnmounted, computed } from "vue";

export default {
  name: "AdminDashboard",
  components: {
    Navbar,
    Menu,
    expenseTracker,
    stockAlerts,
    topSellingProduct,
    InfoColoredComponent,
  },
  data() {
    return {
      NavBar_data: [
        {
          nav_name: "Dashboard",
          link_admin: "/admin-dashboard",
          icon: Dashboard,
        },
        {
          nav_name: "Products",
          link_admin: "/admin-add-product",
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
      expenses: [
        {
          id: 1,
          title: "Revenues",
          amount: "50,000",
          icon_money: dollarCoin,
          icon_status: plusRound,
        },
        {
          id: 2,
          title: "Sales Return",
          amount: "100,000",
          icon_money: dollarCoin,
          icon_status: plusRound,
        },
        {
          id: 3,
          title: "Purchase",
          amount: "12,000",
          icon_money: dollarCoin,
          icon_status: plusRound,
        },
        {
          id: 4,
          title: "Income",
          amount: "20,000",
          icon_money: dollarCoin,
          icon_status: plusRound,
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
  width: 100%;
  /* min-height: 100%; */
  /* flex: 1; */
  height: 100%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dashboard-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  /* flex: 1; */
}
.admin-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
  background-color: #292929;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.admin-menu a {
  color: aliceblue;
}
.admin-menu nav {
  margin: 10px 0;
}
.admin-menu nav:hover {
  background-color: #444;
  border-radius: 5px;
}
.dashboard-details {
  width: 100%;
  height: 100%;
  gap: 50px;
  /* flex: 1; */
  padding: 20px;
  /* background-color: khaki; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
}
.dashboard-details h1 {
  font-size: 2.5rem;
  color: dodgerblue;
}
.expense-tracker-detail {
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  /* background-color: yellowgreen; */
}

h2 {
  font-size: 1.2rem;
  color: green;
}
.expense-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 30px;
  /* overflow-x: auto; */
  padding: 10px;
  /* background-color: wheat; */
}

.Info-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  /* background-color: rebeccapurple; */
  /* height: 100%; */
}

.list-info-colored {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
  /* height: 440px; */
  /* background-color: yellow; */
  padding: 10px;
}

.product-activity-detail {
  display: flex;
  font-size: 1rem;
  font-weight: 500;
  flex-direction: column;
  width: 100%;
  /* height: 100%; */
  /* background-color: violet; */
}
.pro-act-two-col {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 10px;
  /* background-color: yellowgreen; */
}
</style>
