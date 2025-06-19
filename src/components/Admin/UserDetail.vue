<template>
   <div v-if="isLoading" class="loading">
      <p>Loading user...</p>
    </div>
   <div class="user-detail" v-else-if="detailUser && !isLoading">
    {{  }}
    <button @click="$router.push('/admin/all-users')" class="back-btn">Back</button>

    <div class="card" >
      <div class="profile">
       <img
        v-if="detailUser && !detailUser.google_id"
        :src="`https://bucket-production-853a.up.railway.app/storage/${detailUser.picture}`"
        class="avatar"
        alt="Avatar"
      />
      <img
        v-else-if="detailUser && detailUser.google_id"
        :src="detailUser.picture"
        class="avatar"
        alt=""
      />
       <img
        v-else
        class="avatar"
        alt="User Avatar"
      />

        <!-- <img  class="avatar" alt="" /> -->
        <div>
          <h2>{{ detailUser.name  }}</h2>
          <p>{{ detailUser.email }}</p>
          <span class="status-badge">1 Day ago</span>
        </div>
      </div>
      <div>
      <div class="info-section">
        <div><label>Full Name</label><input readonly :value="detailUser.name"/></div>
        <div><label>Joined Date</label><input :value="detailUser.created_at" readonly /></div>
        <div><label>User ID</label><input :value="detailUser.id" readonly /></div>
        <div><label>Role</label><input readonly :value="detailUser.role"/></div>
      </div>
      </div>
      
      <div class="email-info">
        <h3 class="h">User’s Address</h3>
        <p>📧 {{ detailUser.address }}</p>
        <span class="email-date">1 month ago</span>
      </div>

      <hr />
      <div class="mid">
      <h3>Order History</h3></div>
      <div class="order-history">
        <div class="order-card">
          <div>
           
        

          <div>
            <img  class="#" alt="" />
            ✔️ History Method</div>
          <p>Invoice No: {{  }}</p>
          <p>{{  }}</p>
          <p class="book-title">{{  }}</p>
        </div>
      </div>
    </div>
  </div></div>
</template>

<script setup>

import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const isLoading = ref(true)
const route = useRoute()

const detailUser = ref(null)

const token = localStorage.getItem("token") || null
const backendUrl = "https://projectip2-book-store-api.up.railway.app/api/admin/users_management"

onMounted(async () => {
  const userId = route.params.user_id

console.log('userId', userId)
  try {
    const response = await axios.get(`${backendUrl}/${userId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    detailUser.value = response.data
    // console.log("User Detail:", detailUser.value)
    isLoading.value = false
  } catch (e) {
    console.error("❌ Failed to fetch user:", e)
    if (e.response) {
      console.error("Status:", e.response.status)
      console.error("Data:", e.response.data)
    }
  }
})


  </script>
  
  <style scoped>
.user-detail {
  padding: 30px;
  margin-left: 20px;
}
.back-btn {
  background: #3b82f6;
  color: white;
  padding: 5px 5px;
  border: none;
  border-radius: 6px;
  margin-bottom: 20px;
  
  
}
.card {
  background: #fff;
  padding: 20px;
  margin-top: 50px;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.profile {
  display: flex;
  align-items: center;
  gap: 15px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: black;
  
}
.status-badge {
  background: #d1fadf;
  color: #0f5132;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 12px;
  display: inline-block;
  margin-top: 5px;
}
.info-section {
 
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 40px;
  margin-bottom: 40px;
}
.info-section input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f9f9f9;
}
.email-info {
  
  text-align: center;
  margin-top: 100px;
  margin-bottom: 20px;
  
}
.h{
  margin-bottom: 20px;
  margin-right: 50px;
}
.order-history {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}
.order-card {
  background: #f7f7f7;
  padding: 12px;
  border-radius: 8px;
  width: 250px;
}
.book-title {
  color: blue;
  font-weight: bold;
}
.mid{
  
  text-align: center;
  margin-top: 20px;
  white-space: 20px;
}
.tick {
  width:50px;
        height:50px;
        style:border-radius 50%; 
        background-color: aliceblue;
}

.loading{
  font-size: larger;
}
</style>