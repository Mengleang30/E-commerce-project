<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}



</script>

<template>
  <div class="thank-you-container">
    <div class="icon">
      <!-- Checkmark SVG icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="96"
        height="96"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
    <h1>Thank you for your purchase!</h1>
    <p>Your payment has been successfully processed.</p>
    <button @click="goHome">Back to Home</button>
  </div>
</template>

<style scoped>
.thank-you-container {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #f7f9fc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  max-width: 480px;
  margin: 40px auto;
}

.icon {
  color: #28a745; /* green */
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 12px;
}

p {
  font-size: 1.1rem;
  margin-bottom: 28px;
  color: #555;
  line-height: 1.4;
}

button {
  background-color: #0070ba; /* PayPal blue */
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #005c99;
}
</style>
