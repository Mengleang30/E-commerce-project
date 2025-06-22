<script setup>
import useNotification from '@/stores/notification';
import { computed, onMounted, ref } from 'vue';
import { useAuthentication } from '@/stores/authentication';

const Auth = useAuthentication();
const UseNotification = useNotification();
const loading = ref(false); // Add loading state

onMounted(async () => {
  try {
    loading.value = true; // Set loading to true
    await UseNotification.fetchNotifications();
  } catch (error) {
    console.error("Error fetching notifications:", error);
  } finally {
    loading.value = false; // Reset loading
  }
});

const notifications = computed(() => UseNotification.notifications);

function formatTime(dateStr) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${formattedTime} ${formattedDate}`;
}

const markAllAsRead = async () => {
  try {
    loading.value = true; // Set loading to true
    await UseNotification.markNotificationAsRead();
    await UseNotification.fetchNotifications(); // Refresh notifications
  } catch (error) {
    console.error("Error marking notifications as read:", error);
  } finally {
    loading.value = false; // Reset loading
  }
};

const markAsRead = async (id) => {
  try {
    loading.value = true; // Set loading to true
    await UseNotification.markNotificationAsReadById(id);
    await UseNotification.fetchNotifications(); // Refresh notifications
  } catch (error) {
    console.error("Error marking notification as read:", error);
  } finally {
    loading.value = false; // Reset loading
  }
};
</script>

<template>
  <div v-if="!Auth.isAuthenticated" class="login-box">
    <h3>Please Login First</h3>
    <RouterLink to="/login"><button>Login</button></RouterLink>
  </div>

  <div v-else class="container">
    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div v-if="notifications.length > 0 && !loading">
      <div class="header">
        <h2>🔔 Notifications</h2>
        <button class="readAllBtn" @click="markAllAsRead" :disabled="loading">
          Mark All as Read
        </button>
      </div>

      <div class="notification_section">
        <!-- Unread -->
        <h3 class="section_title">📬 Unread</h3>
        <div
          v-for="noti in notifications.filter(n => n.read_at === null)"
          :key="noti.id"
          class="notification_card unread"
        >
          <div class="notification_header">
            <p class="title">{{ noti.data.title }}</p>
            <div class="actions">
              <button @click="markAsRead(noti.id)" :disabled="loading">
                Mark as Read
              </button>
              <span class="time">{{ formatTime(noti.created_at) }}</span>
            </div>
          </div>
          <p class="message">{{ noti.data.message }}</p>
          <p class="message" v-if="noti.data.transaction_id">Order Id: {{ noti.data.order_id }}</p>
          <p class="message" v-if="noti.data.order_id">Order Id: {{ noti.data.order_id }}</p>
        </div>

        <!-- Read -->
        <h3 class="section_title">✅ Read</h3>
        <div
          v-for="noti in notifications.filter(n => n.read_at !== null)"
          :key="noti.id"
          class="notification_card read"
        >
          <div class="notification_header">
            <p class="title">{{ noti.data.title }}</p>
            <span class="time">{{ formatTime(noti.created_at) }}</span>
          </div>
          <p class="message">{{ noti.data.message }}</p>
          <p class="message" v-if="noti.data.transaction_id">Order Id: {{ noti.data.order_id }}</p>
          <p class="message" v-if="noti.data.order_id">Order Id: {{ noti.data.order_id }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="!loading" class="container">
      <h2>No Notifications</h2>
      <p>You have no notifications at this time.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  padding: 2rem;
  background-color: #fdf6ec;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  position: relative; /* For positioning the loading overlay */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.readAllBtn {
  background-color: #e66a00;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}
.readAllBtn:hover {
  background-color: #ff3600;
}
.readAllBtn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-box {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.login-box h3 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}
.login-box button {
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.login-box button:hover {
  background: #1e40af;
}

.notification_section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section_title {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #444;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.3rem;
}

.notification_card {
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}
.notification_card:hover {
  transform: scale(1.02);
}

.notification_card.unread {
  border-left: 5px solid #ff8c00;
  background-color: #fffbe6;
}

.notification_card.read {
  border-left: 5px solid #00c853;
  background-color: #f0f0f0;
}

.notification_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.title {
  font-weight: bold;
  font-size: 1rem;
  color: #d84315;
}

.message {
  font-size: 0.95rem;
  color: #333;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.actions button {
  background-color: #2979ff;
  color: white;
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.3s;
}
.actions button:hover {
  background-color: #1565c0;
}
.actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.time {
  font-size: 0.75rem;
  color: gray;
}

/* Loading Spinner Styles */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e66a00;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>