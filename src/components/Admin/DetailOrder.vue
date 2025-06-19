<template>
  <div class="order-container">
    <h2>Order #{{ order.id }}</h2>

    <div class="order-info">
      <p><strong>Customer Name:</strong> {{ order.username }}</p>
      <p><strong>User ID:</strong> {{ order.user_id }}</p>
      <p><strong>Status:</strong> <span :class="'badge ' + order.status">{{ order.status }}</span></p>
      <p><strong>Total Items:</strong> {{ order.total_items }}</p>
      <p><strong>Total Price:</strong> ${{ order.total_price }}</p>
      <p><strong>Order Date:</strong> {{ formatDate(order.created_at) }}</p>
    </div>

    <h3>Ordered Books</h3>
    <table class="book-table">
      <thead>
        <tr>
          <th>Book ID</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in order.order_books" :key="book.id">
          <td>{{ book.book_id }}</td>
          <td>{{ book.quantity }}</td>
          <td>${{ book.price }}</td>
          <td>${{ book.sub_total }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DetailOrder',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
    }
  }
};
</script>

<style>
.order-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fafafa;
}

.order-info p {
  margin: 8px 0;
}

.badge {
  padding: 3px 8px;
  border-radius: 5px;
  color: white;
  text-transform: capitalize;
}

.badge.completed {
  background-color: #28a745;
}

.badge.pending {
  background-color: #ffc107;
  color: #000;
}

.badge.canceled {
  background-color: #dc3545;
}

.book-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.book-table th,
.book-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.book-table th {
  background-color: #eee;
}
</style>
