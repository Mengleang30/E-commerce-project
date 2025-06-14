<script setup>
import { computed, onMounted, ref } from 'vue';
import useCarts from '@/stores/carts';
import useOrder from '@/stores/order';
import { usePromotion } from '@/stores/promotion';

const cartStore = useCarts();
const orderStore = useOrder();
const isLoading = ref(true);

const listOrder = computed(() => {
  return orderStore.orders[0] || null;
});

// Check if order is cancellable (e.g., status is 'pending')
const isCancellable = computed(() => {
  return listOrder.value?.status.toLowerCase() === 'pending';
});

onMounted(async () => {
  try {
    await orderStore.fetchOrder();
  } catch (error) {
    console.error('Failed to fetch order:', error);
  } finally {
    isLoading.value = false;
  }
});

// Format date consistently
const formatDate = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const payment = ref('Payment');

const handleToPay = (orderId)=>{
  payment.value = 'Payment...'
    orderStore.paypal(orderId)
  payment.value = 'Payment'
}

// Handle order cancellation
const cancelOrder = (id) => {
  try {
     orderStore.cannelOrder(id);
     orderStore.fetchOrder(); // Refresh order data
    // window.location.reload();
  } catch (error) {
  }
};

const code = ref();
const useCoupon = usePromotion()
function handleApplyCoupon(id){
   useCoupon.applyCoupon(id, code.value);
   orderStore.fetchOrder();
}

onMounted(()=>{

    

})

</script>

<template>
  <div class="order-summary" role="region" aria-labelledby="order-summary-title">
    <h2 id="order-summary-title">🎉 Order Confirmed!</h2>

    <div v-if="isLoading" class="loading">
      <p>Loading your order...</p>
    </div>

    <div v-else-if="listOrder" class="order-details">
      <div class="order-header">
        <p><strong>Order ID:</strong> {{ listOrder.id }}</p>
        <p><strong>Status:</strong> {{ listOrder.status }}</p>
        <p><strong>Date:</strong> {{ formatDate(listOrder.created_at) }}</p>
      </div>

      <div class="order-items">
        <div
          class="order-item"
          v-for="item in listOrder.order_books"
          :key="item.id"
          role="article"
        >
          <img
            :src="
              item.book.path_image
                ? `http://localhost:8200/storage/${item.book.path_image}`
                : item.book.url_image || '/fallback-book-image.jpg'
            "
            :alt="`Cover of ${item.book.title}`"
            class="book-image"
            loading="lazy"
          />
          <div class="details">
            <h3>{{ item.book.title }}</h3>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Price: ${{ item.book.price }}</p>
            <p>Discount: {{ item.book.discount }}%</p>
            <p>Subtotal: ${{ item.sub_total }}</p>
          </div>
        </div>
      </div>

   <div class="coupon">
  <h3>🎟️ Apply Coupon</h3>
  <div class="coupon-input-group">
    <input v-model="code" type="text" placeholder="Enter your coupon code" />
    <button @click="handleApplyCoupon(listOrder.id)">Apply</button>
  </div>
</div>


      <div class="grand-total">
        <h3>Grand Total: ${{ listOrder.total_price }}</h3>
        <h3 v-if="listOrder.final_price">Final Total: ${{ listOrder.final_price }}</h3>
      </div>

      <div class="actions">
        <button @click="handleToPay(listOrder.id)" class="payment-btn" aria-label="Proceed to payment">
            {{ payment }} <img src="https://img.icons8.com/?size=100&id=13611&format=png&color=000000" alt=""></button>
        <button
          v-if="isCancellable"
          class="cancel-btn"
          @click="cancelOrder(listOrder.id)"
          aria-label="Cancel this order"
        >
          Cancel Order
        </button>
        <button
          class="back-btn"
          @click="$router.push('/')"
          aria-label="Return to shop"
        >
          Back to Shop
        </button>
      </div>
    </div>

    <div v-else class="no-orders">
      <p>No recent orders found.</p>
      <button
        class="back-btn"
        @click="$router.push('/')"
        aria-label="Return to shop"
      >
        Start Shopping
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Base styles */
.order-summary {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #fff;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

.actions button img{
  width: 2rem;
}

.grand-total h3{
  color: green;
}

.actions button {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 5px;
}

/* Headings */
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1a3c34;
  font-size: 2rem;
  font-weight: 600;
}

/* Loading state */
.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

/* Order header */
.order-header {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.order-header p {
  margin: 0;
  color: #444;
}

/* Order items */
.order-items {
  display: grid;
  gap: 1.5rem;
}

.order-item {
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.book-image {
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0,0.2);
}

.details h3 {
  margin-bottom: 0.75rem;
  color: #222;
  font-size: 1.25rem;
  font-weight: 500;
}

.details p {
  margin: 0.3rem 0;
  color: #444;
  font-size: 0.95rem;
}

/* Grand total */
.grand-total {
  margin-top: 1rem;
  text-align: right;
  font-size: 1.5rem;
  color: #1a3c34;
}

/* Buttons */
.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5;
}

.payment-btn, .cancel-btn, .back-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s;
}

.payment-btn {
  background-color: #3b82f6;
  color: white;
}

.payment-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.cancel-btn {
  background-color: #ef4444;
  color: white;
}

.cancel-btn:hover {
  background-color: #dc2626;
  transform: translateY(-1px);
}

.back-btn {
  background-color: #e2e8f0;
  color: #1a3c34;
}

.back-btn:hover {
  background-color: #cbd5e1;
  transform: translateY(-1px);
}

/* No orders state */
.no-orders {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.coupon {
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.coupon h3 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.coupon-input-group {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.coupon-input-group input {
  flex: 1;
  min-width: 180px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.coupon-input-group button {
  background-color: #0070ba; /* PayPal blue */
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.coupon-input-group button:hover {
  background-color: #005c99;
}


/* Responsive design */
@media (max-width: 768px) {
  .order-summary {
    margin: 1rem;
    padding: 1.5rem;
  }

  .order-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .book-image {
    width: 100px;
    height: 150px;
  }

  .order-header {
    grid-template-columns: 1fr;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .payment-btn,
  .cancel-btn,
  .back-btn {
    width: 100%;
    max-width: 200px;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.5rem;
  }

  .grand-total {
    font-size: 1.25rem;
  }
}
</style>