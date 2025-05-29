<template>
  <div class="expense-item">
    <p>{{ title }}</p>
    <div>
      <img :src="icon_money" alt="" width="20px" />
      <img :src="icon_status" alt="" width="20px" />
      <p>{{ amount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpenseTracker",
  props: {
    id: Number,
    title: String,
    amount: String,
    icon_money: String,
    icon_status: String,
  },
};
</script>

<style scoped>
.expense-item {
  width: 180px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #9f9f9f;
  font-weight: 500;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
}
.expense-item p {
  font-size: 0.7rem;
  color: #000;
}
.expense-item div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 90%;
}
.expense-item div p {
  font-size: 1.5rem;
  color: #000;
}
</style>
