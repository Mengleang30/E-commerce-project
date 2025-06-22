<template>
  <div class="top-product-detail">
    <h3>Top Selling Product</h3>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Quantity</th>
          <th>Alert amt.</th>
        </tr>
      </thead>
      <tbody>
        <!-- {{ TopSellerProduct }}
         -->
        <tr v-for="(item, index) in TopSellerProduct" :key="index">
          <td>{{ item.book_id }}</td>
          <td>{{ item.total_quantity }}</td>
          <td>{{ item.alert_amt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import useAdminOrder from '@/stores/adminFeature/adminOrder';
import { computed, onMounted } from 'vue';

export default {
  name: "TopProducts",

    setup(){
      const useOrders = useAdminOrder();

      // Compute top selling products by aggregating quantities per book_id from completed orders
      const TopSellerProduct = computed(() => {
        const bookSales = {};

        // Only consider completed orders
        useOrders.order_list
          .filter(order => order.status === 'completed')
          .forEach(order => {
        order.order_books.forEach(book => {
          if (!bookSales[book.book_id]) {
            bookSales[book.book_id] = {
          book_id: book.book_id,
          total_quantity: 0,
          alert_amt: 5, // example alert amount, adjust as needed
          order_ids: []
            };
          }
          bookSales[book.book_id].total_quantity += book.quantity;
          bookSales[book.book_id].order_ids.push(book.order_id);
        });
          });

        // Convert to array and sort by total_quantity descending
        return Object.values(bookSales)
          .sort((a, b) => b.total_quantity - a.total_quantity)
          .slice(0, 5);
      });


      onMounted(()=>{
        useOrders.fetchOrderList();
      })
      return {
        TopSellerProduct,
        
      }
      
    },

  props: {
    orderId: String,
    quantity: Number,
    alertAmt: Number,
  },
  data() {
    return {
      // TopProducts: [
      //   {
      //     orderId: "ORD034",
      //     quantity: 80,
      //     alertAmt: 5,
      //   },
      //   {
      //     orderId: "ORD012",
      //     quantity: 60,
      //     alertAmt: 15,
      //   },
      //   {
      //     orderId: "ORD033",
      //     quantity: 45,
      //     alertAmt: 5,
      //   },
      // ],
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
