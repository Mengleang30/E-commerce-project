<script setup>
import useNotification from '@/stores/notification';
import axios from 'axios';

import { computed, onMounted } from 'vue';

import { useAuthentication } from '@/stores/authentication';

const Auth = useAuthentication();

const UseNotification = useNotification();

onMounted(async () => {
    try {
        await UseNotification.fetchNotifications();
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
});

const notifications = computed(() => UseNotification.notifications);

function formatTime(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' });
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedTime} ${formattedDate} `;
}

const markAllAsRead = async () => {
    try {
        await UseNotification.markNotificationAsRead();
        await UseNotification.fetchNotifications(); // Refresh notifications after marking as read
    } catch (error) {
        console.error("Error marking notifications as read:", error);
    }
};

const markAsRead = async (id)=>{
    try {
        await UseNotification.markNotificationAsReadById(id);
        await UseNotification.fetchNotifications(); // Refresh notifications after marking as read
    } catch (error) {
        console.error("Error marking notification as read:", error);
    }
}



</script>
<template>
  <div v-if="!Auth.loggedInUser" class="container">
    <h3>Please Login First</h3>
  </div>

  <div v-else>
    <div class="container" v-if="notifications.length > 0">
      <div class="header">
        <h2>🔔 Notifications</h2>
        <button class="readAllBtn" @click="markAllAsRead">Mark All as Read</button>
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
              <button @click="markAsRead(noti.id)">Mark as Read</button>
              <span class="time">{{ formatTime(noti.created_at) }}</span>
            </div>
          </div>
          <p class="message">{{ noti.data.message }}</p>
           <p class="message" v-if="noti.data.transaction_id"> Order Id : {{ noti.data.order_id }}</p>
           <p class="message" v-if="noti.data.order_id"> Order Id : {{ noti.data.order_id }}</p>
     
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
           <p class="message" v-if="noti.data.transaction_id"> Order Id : {{ noti.data.order_id }}</p>
          <p class="message" v-if="noti.data.order_id"> Order Id : {{ noti.data.order_id }}</p>
        </div>
      </div>
    </div>

    <div v-else class="container">
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

.time {
  font-size: 0.75rem;
  color: gray;
}

</style>