<template>
  <div class="top-product-detail">
    <h3>Top Selling Product</h3>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Quantity</th>
          <th>Alert amt.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in TopProducts" :key="index">
          <td>{{ item.orderId }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.alertAmt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TopProducts",
  props: {
    orderId: String,
    quantity: Number,
    alertAmt: Number,
  },
  data() {
    return {
      TopProducts: [
        {
          orderId: "ORD034",
          quantity: 80,
          alertAmt: 5,
        },
        {
          orderId: "ORD012",
          quantity: 60,
          alertAmt: 15,
        },
        {
          orderId: "ORD033",
          quantity: 45,
          alertAmt: 5,
        },
      ],
    };
  },
};
</script>

<style scoped>
.top-product-detail {
  width: 60%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  margin-left: 10px;
  background-color: #f9f9f9;
  border: 1px solid #9f9f9f;
  border-radius: 10px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);
}
.top-product-detail table {
  width: 100%;
  border-collapse: collapse;
}
.top-product-detail th,
.top-product-detail td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
td {
  color: rgb(76, 76, 76);
}
</style>
