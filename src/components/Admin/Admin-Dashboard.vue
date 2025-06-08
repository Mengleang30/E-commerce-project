<template>
  <div class="admin-dashboard">
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
</template>

<script>
import expenseTracker from "@/components/Admin/admin-components/expense-tracker.vue";
import stockAlerts from "@/components/Admin/admin-components/stock-alert.vue";
import topSellingProduct from "@/components/Admin/admin-components/top-selling-product.vue";
import InfoColoredComponent from "@/components/Admin/admin-components/info-colored-component.vue";

import dollarCoin from "@/assets/dollar-hand.svg";
import plusRound from "@/assets/plus-round-green.svg";

export default {
  name: "AdminDashboard",
  components: {
    expenseTracker,
    stockAlerts,
    topSellingProduct,
    InfoColoredComponent,
  },
  data() {
    return {
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
  min-height: 100vh;
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
}

.dashboard-details {
  width: 100%;
  height: 100%;
  gap: 50px;
  padding: 20px;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  /* background-color: yellowgreen; */
}

h2 {
  font-size: 1.5rem;
  color: green;
}
.expense-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
  padding: 10px;
}

.Info-detail {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: stretch; */
  font-size: 2rem;
  font-weight: bold;
  width: 100%;
  /* background-color: rebeccapurple; */
  /* height: 100%; */
}

.list-info-colored {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
  grid-template-rows: repeat(2, auto);   /* 2 rows */
  gap: 30px;
  background-color: aqua;
  padding: 10px;
  overflow: hidden; /* prevent scrolling */
  width: 100%;
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
