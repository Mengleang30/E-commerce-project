<template>
  <div class="stock-alert-detail">
    <h3>Stock Alert</h3>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Date</th>
          <th>Quantity</th>
          <th>Alert amt.</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in stockAlerts" :key="index">
          <td>{{ item.orderId }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.alertAmt }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "StockAlertTable",
  props: {
    orderId: String,
    date: String,
    quantity: Number,
    alertAmt: Number,
    status: String,
  },
  data() {
    return {
      stockAlerts: [
        {
          orderId: "ORD001",
          date: "2025-04-30",
          quantity: 10,
          alertAmt: 5,
          status: "Low",
        },
        {
          orderId: "ORD002",
          date: "2025-04-29",
          quantity: 20,
          alertAmt: 15,
          status: "OK",
        },
        {
          orderId: "ORD003",
          date: "2025-04-28",
          quantity: 4,
          alertAmt: 5,
          status: "Critical",
        },
      ],
    };
  },
};
</script>

<style scoped>
.stock-alert-detail {
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  margin-right: 10px;
  background-color: #f9f9f9;
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
}
.stock-alert-detail table {
  width: 100%;
  border-collapse: collapse;
}
.stock-alert-detail th,
.stock-alert-detail td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
td {
  color: rgb(76, 76, 76);
}
</style>
