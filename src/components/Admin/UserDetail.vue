<template>
  <div class="user-detail">
    <button @click="$router.back()" class="back-btn">Back</button>

    <div class="card">
      <div class="profile">
        <img :src="user.avatar" class="avatar" alt="" />
        <div>
          <h2>{{ user.name }}</h2>
          <p>{{ user.email }}</p>
          <span class="status-badge">1 Day ago</span>
        </div>
      </div>
      <div>
      <div class="info-section">
        <div><label>Full Name</label><input :value="user.name" readonly /></div>
        <div><label>Joined Date</label><input value="30/10/2024" readonly /></div>
        <div><label>User ID</label><input :value="user.id" readonly /></div>
        <div><label>Role</label><input :value="user.role" readonly /></div>
      </div>
      </div>
      
      <div class="email-info">
        <h3 class="h">User’s email Address</h3>
        <p>📧 {{ user.email }}</p>
        <span class="email-date">1 month ago</span>
      </div>

      <hr />
      <div class="mid">
      <h3>Order History</h3></div>
      <div class="order-history">
        <div v-for="order in user.orders" :key="order.invoice" class="order-card">
          <div>
           
        

          <div>
            <img :src="user.tick" class="#" alt="" />
            ✔️ History Method</div>
          <p>Invoice No: {{ order.invoice }}</p>
          <p>{{ order.date }}</p>
          <p class="book-title">{{ order.bookTitle }}</p>
        </div>
      </div>
    </div>
  </div></div>
</template>

  <script >
  export default {
    props: ["id"],
    data() {
      return {
        user: {
          id: "#2333",
        name: "RATHA Sothea",
        email: "sothea@gmail.com",
        role: "Customer",
        avatar:("src/assets/profile_user.jpeg"),
        tick: "src/assets/tick.png",
        orders: [
          {
            invoice: "L77920883",
            date: "Nov 19, 2024 5:07 PM",
            bookTitle: "Ikigai: The Japanese, You got this 90+, Good vibes...",
          },
          {
            invoice: "L77920884",
            date: "Nov 20, 2024 3:15 PM",
            bookTitle: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
          },
          {
            invoice: "L77920885",
            date: "Nov 21, 2024 1:30 PM",
            bookTitle: "The Subtle Art of Not Giving a F*ck: A Counterintuitive Approach to Living a Good Life",
          }
        ],
        }
      };
    }
  };
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
</style>