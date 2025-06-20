<template>
  <table class="product_table">
    <thead>
      <tr>
        <th>Book ID</th>
        <th>Book Title</th>
        <th>Add Date</th>
        <th>Price</th>
        <th>Discount</th>
        <th>Inventory</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product) in listBooks" :key="product.id" :style="{ backgroundColor: product.bgColor }">
        <td>{{ product.id }}</td>
        <td>{{ product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title }}</td>
        <td>{{formatTimestampToLocal(product.created_at) }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.discount }}%</td>
        <td >
          <span class="lowStock" v-if="product.quantity<5" >{{ product.quantity }}</span>
           <span v-else>{{ product.quantity }}</span>
        </td>
        <td>
          <div class="action-buttons">
           <RouterLink :to="{ path: '/admin/update-product-form', query: { id: product.id } }">
              <button class="action-button update">
                <SquarePen />
              </button>
            </RouterLink>
          
             <!-- <button class="action-button delete">
              <CircleX/>
            </button> -->
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import useBooks from '@/stores/books';
import { computed, onMounted } from 'vue';
import { SquarePen,CircleX } from 'lucide-vue-next';

export default {
  name: "Admin_AllProducts_component",
  components:{
    SquarePen,
    CircleX
  },
 
  setup(){
    const useBook =useBooks();

    const listBooks = computed(()=>{
        return useBook.books;
    })

     function formatTimestampToLocal(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        timeZone: "Asia/Phnom_Penh", // Cambodia time
        year: "numeric",
        month: "numeric",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // hour12: true, // or false for 24h format
      });
    }

    onMounted(()=>{
      useBook.fetchBooks();
    })

    return {
      listBooks,
      formatTimestampToLocal
    }
  },
  data() {
    return {
      Book_Products_Data: [
        // {
        //   bookID: "#20462",
        //   bookTitle: "The Great Gatsby",
        //   AddDate: "2023-10-01",
        //   bookPrice: 15.99,
        //   Discount: 10,
        //   Inventory: 50,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
        // {
        //   bookID: "#20463",
        //   bookTitle: "To Kill a Mockingbird",
        //   AddDate: "2023-10-02",
        //   bookPrice: 12.99,
        //   Discount: 5,
        //   Inventory: 30,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
        // {
        //   bookID: "#20464",
        //   bookTitle: "1984",
        //   AddDate: "2023-10-03",
        //   bookPrice: 14.99,
        //   Discount: 0,
        //   Inventory: 20,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
        // {
        //   bookID: "#20465",
        //   bookTitle: "Pride and Prejudice",
        //   AddDate: "2023-10-04",
        //   bookPrice: 9.99,
        //   Discount: 15,
        //   Inventory: 10,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
        // {
        //   bookID: "#20466",
        //   bookTitle: "The Catcher in the Rye",
        //   AddDate: "2023-10-05",
        //   bookPrice: 11.99,
        //   Discount: 20,
        //   Inventory: 5,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
        // {
        //   bookID: "#20467",
        //   bookTitle: "The Hobbit",
        //   AddDate: "2023-10-06",
        //   bookPrice: 13.99,
        //   Discount: 25,
        //   Inventory: 15,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
        // {
        //   bookID: "#20468",
        //   bookTitle: "Fahrenheit 451",
        //   AddDate: "2023-10-07",
        //   bookPrice: 10.99,
        //   Discount: 30,
        //   Inventory: 8,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
        // {
        //   bookID: "#20469",
        //   bookTitle: "Brave New World",
        //   AddDate: "2023-10-08",
        //   bookPrice: 16.99,
        //   Discount: 0,
        //   Inventory: 12,
        //   Actions: [
        //     { action: "Edit", icon: "edit" },
        //     { action: "Delete", icon: "delete" },
        //   ],
        // },
      ],
    };
  },
};
</script>

<style scoped>
.product_table {
  width: 100%;
  border-collapse: collapse;
  
  font-size: 1.5rem;
}
table{
  table-layout: auto;
}
.product_table td,
.product_table th {
  border: 1px solid #adadad;
  padding: 8px;
}
.product_table td:nth-child(2),
.product_table td:nth-child(5) {
  color: blue;
  font-weight: bold;
}
.product_table td:nth-child(4) {
  color: red;
  font-weight: bold;
}
.product_table td:nth-child(6) span {
  background-color: aquamarine;
  color: darkgreen;
  border-radius: 10px;
  padding: 5px;
}
.product_table tr:nth-child(even) {
  background-color: snow;
}
.product_table tr:nth-child(odd) {
  background-color: lightyellow;
}
.product_table th {
  font-weight: bold;
  background-color: #ffffff;
  text-align: left;
}
.action-buttons {
  display: flex;
  gap: 10px;
}
.action-button {
  background-color: rgb(222, 222, 222);
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
}
.action-button svg {
  margin-right: 5px;
}
.action-button:hover {
  background-color: #0056b3;
}
.action-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}
/* .action-button svg {
  fill: darkgreen;
} */
.action-button svg:hover {
  fill: #f0f0f0;
}
.action-button svg:focus {
  fill: #f0f0f0;
}

.delete{
  color: red;
}
.update{
  color: cadetblue;
}
.lowStock{
  background-color: red !important;
  color: rgb(255, 255, 255) !important;
}
</style>
