<script>
export default {
  name: "History",
  data() {
    return {
      historyItems: [
        {
          invoice: "L77929083",
          date: "Nov 19, 2024 5:07 PM",
          description: "Ikigai: The Japanese, You got this: 90, Good vibes",
        },
        {
          invoice: "L77929083",
          date: "Nov 19, 2024 5:07 PM",
          description: "Ikigai: The Japanese, You got this: 90, Good vibes",
        },
        {
          invoice: "L77929083",
          date: "Nov 19, 2024 5:07 PM",
          description: "Ikigai: The Japanese, You got this: 90, Good vibes",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="h2">
    <h2>History</h2>
  </div>
  <div class="history-page">
    
    <div class="history-list">
      <div class="history-item" v-for="(item, index) in historyItems" :key="index">
        <div class="icon">
          
        </div>
        <div class="details">
          <h2>History Method</h2>
          <p>Invoice No: {{ item.invoice }}</p>
          <p>{{ item.date }}</p>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.h2{
  text-align: center;
  margin: 20px;
}
.history-page {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.back-button {
  background-color: #f0f0f0;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 20px;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.history-item {
  display: flex;
  background-color: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  align-items: center;
}
.icon img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
}
.details h2 {
  margin: 0;
  font-size: 18px;
}
.details p {
  margin: 5px 0;
  color: #555;
  font-size: 14px;
}
</style>