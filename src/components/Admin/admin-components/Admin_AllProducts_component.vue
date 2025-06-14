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
      <tr
        v-for="(product, index) in Book_Products_Data"
        :key="index"
        :style="{ backgroundColor: product.bgColor }"
      >
        <td>{{ product.bookID }}</td>
        <td>{{ product.bookTitle }}</td>
        <td>{{ product.AddDate }}</td>
        <td>{{ product.bookPrice }}</td>
        <td>{{ product.Discount }}%</td>
        <td>
          <span>{{ product.Inventory }}/20</span>
        </td>
        <td>
          <div class="action-buttons">
            <button
              v-for="(action, actionIndex) in product.Actions"
              :key="actionIndex"
              class="action-button"
            >
              <svg
                v-if="action.icon === 'edit'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-2.34 2.34 3.75 3.75 2.34-2.34z"
                />
              </svg>
              <svg
                v-if="action.icon === 'delete'"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 19c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V7H6v12zm5-14h4l1-1H8l1 1zm7-2H6c-1.11 0-2 .89-2 2v2h16V5c0-1.11-.89-2-2-2z"
                />
              </svg>
              {{ action.action }}
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Admin_AllProducts_component",
  props: {
    bookID: {
      type: String,
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    AddDate: {
      type: String,
      required: true,
    },
    bookPrice: {
      type: Number,
      required: true,
    },
    Discount: {
      type: Number,
      required: true,
    },
    Inventory: {
      type: Number,
      required: true,
    },
    Actions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      Book_Products_Data: [
        {
          bookID: "#20462",
          bookTitle: "The Great Gatsby",
          AddDate: "2023-10-01",
          bookPrice: 15.99,
          Discount: 10,
          Inventory: 50,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
        {
          bookID: "#20463",
          bookTitle: "To Kill a Mockingbird",
          AddDate: "2023-10-02",
          bookPrice: 12.99,
          Discount: 5,
          Inventory: 30,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
        {
          bookID: "#20464",
          bookTitle: "1984",
          AddDate: "2023-10-03",
          bookPrice: 14.99,
          Discount: 0,
          Inventory: 20,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
        {
          bookID: "#20465",
          bookTitle: "Pride and Prejudice",
          AddDate: "2023-10-04",
          bookPrice: 9.99,
          Discount: 15,
          Inventory: 10,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
        {
          bookID: "#20466",
          bookTitle: "The Catcher in the Rye",
          AddDate: "2023-10-05",
          bookPrice: 11.99,
          Discount: 20,
          Inventory: 5,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
        {
          bookID: "#20467",
          bookTitle: "The Hobbit",
          AddDate: "2023-10-06",
          bookPrice: 13.99,
          Discount: 25,
          Inventory: 15,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
        {
          bookID: "#20468",
          bookTitle: "Fahrenheit 451",
          AddDate: "2023-10-07",
          bookPrice: 10.99,
          Discount: 30,
          Inventory: 8,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
        {
          bookID: "#20469",
          bookTitle: "Brave New World",
          AddDate: "2023-10-08",
          bookPrice: 16.99,
          Discount: 0,
          Inventory: 12,
          Actions: [
            { action: "Edit", icon: "edit" },
            { action: "Delete", icon: "delete" },
          ],
        },
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
  background-color: lightgreen;
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
.action-button svg {
  fill: darkgreen;
}
.action-button svg:hover {
  fill: #f0f0f0;
}
.action-button svg:focus {
  fill: #f0f0f0;
}
</style>
