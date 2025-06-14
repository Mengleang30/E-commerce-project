<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const status = ref('processing'); // 'processing', 'success', 'error'
const message = ref('Finalizing your payment... Please wait.');

onMounted(async () => {
  const token = route.query.token;

  if (!token) {
    status.value = 'error';
    message.value = 'Missing PayPal token!';
    return;
  }

  try {
    await axios.get(
      `https://projectip2-book-store-api.up.railway.app/api/capture-payment?token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    status.value = 'success';
    message.value = 'Payment successful! Redirecting...';
    setTimeout(() => {
      router.push('/thank-you');
    }, 2000); // redirect after 2 seconds
  } catch (err) {
    console.error(err);
    status.value = 'error';
    message.value = 'Payment failed. Please try again.';
    // optionally redirect or stay on the page
    // setTimeout(() => router.push('/payment-error'), 3000);
  }
});
</script>

<template>
  <div class="container">
    <div v-if="status === 'processing'" class="spinner"></div>

    <h2 :class="status">{{ message }}</h2>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  color: #333;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
}

h2 {
  margin-top: 16px;
  font-size: 1.6rem;
  font-weight: 600;
  max-width: 320px;
}

/* Status colors */
h2.processing {
  color: #0070ba; /* PayPal blue */
}

h2.success {
  color: #28a745; /* Green */
}

h2.error {
  color: #dc3545; /* Red */
}

.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #0070ba;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

/* Spinner animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
