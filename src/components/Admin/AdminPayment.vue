<template>
  <!-- {{ listOrders }} -->
  <div class="container">
    <h2>All Payments</h2>


    <div class="flex flex-wrap mb-4 gap-2">
      <div class="relative">
        <input
          type="text"
          placeholder="Search"
          class="border pl-8 p-2 rounded w-full md:w-auto"
          v-model="searchQuery"
          @keyup.enter="searchQuery = searchQuery.trim()"
          @keyup="searchQuery = searchQuery.trim()"
          @click="searchQuery = searchQuery.trim()"
        />
      </div>
      <div class="wrap_date">
        <label for="input"> Select Date <input type="date" class="border p-2 rounded" v-model="selectedDate" /></label>

      <select class="select" v-model="selectedFilter">
        <option value="Filter">Filter</option>
        <option value="bakong">Bakong</option>
        <option value="paypal">paypal</option>
        <option value="canceled">Other</option>
      </select>

      <select class="select" v-model="sortDirection" >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
      </select>
      </div>
    
    </div>

    <table class="w-full text-left border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Order ID</th>
          <th class="p-2 border">Customer ID</th>
          <th class="p-2 border">Payment ID</th>
          <th class="p-2 border">Transaction ID</th>
          <th class="p-2 border">Payment Status</th>
          <th class="p-2 border">Date</th>
          <th class="p-2 border">Payment Method</th>
          <th class="p-2 border">Amounts($)</th>
          <th class="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payment, index) in filteredPayment" :key="payment.id">
           <td class="p-2 border">{{ payment.id }}</td>
        
          <td class="p-2 border">{{ payment.user_id }}</td>
           <td class="p-2 border">{{ payment.order_id }}</td>
            <td class="p-2 border">{{ payment.transaction_id }}</td>
          
          <td class="p-2 border">
            <div
              v-if="payment.status === 'completed'"
              class="status-badge bg-green-500"
            >
              {{ payment.status }}
            </div>
            <div
              v-if="payment.status === 'pending'"
              class="status-badge bg-yellow-400"
            >
              {{ payment.status }}
            </div>
            <div
              v-if="payment.status === 'canceled'"
              class="status-badge bg-red-400"
            >
              {{ payment.status }}
            </div>
          </td>
          
          <td class="p-2 border">
            {{ formatTimestampToLocal(payment.created_at) }}
          </td>
          <td class="p-2 border">{{ payment.payment_method }}</td>
          <td class="p-2 border">{{ payment.amount }}</td>
          <td class="p-2 border">
            <button
              class="bg-blue-700 text-white rounded px-3 py-1 cursor-pointer hover:bg-blue-800"
            >
              View &gt;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import useAdminPayment from "@/stores/adminFeature/adminPayment";
import { computed, onMounted, ref } from "vue";


    const useAdminPayments = useAdminPayment();

    const listPayment = computed(() => {
      return useAdminPayments.payment_list;
    });

    const searchQuery = ref("");
    const selectedDate = ref("");
    const selectedFilter = ref("Filter");
    const sortDirection = ref("desc"); // default to Newest


   const filteredPayment = computed(() => {
  let filtered = listPayment.value.filter(payment => {
    const matchesSearch = payment.payment_method.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDate = selectedDate.value
      ? new Date(payment.created_at).toISOString().startsWith(selectedDate.value)
      : true;
    const matchesFilter =
      selectedFilter.value === "Filter" || payment.payment_method === selectedFilter.value;

    return matchesSearch && matchesDate && matchesFilter;
  });

  // ✅ Sort payments by date
  return filtered.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return sortDirection.value === "asc"
      ? dateA - dateB
      : dateB - dateA;
  });
});


    onMounted(() => {
      useAdminPayments.fetchOrderList();
    });
    function formatTimestampToLocal(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        timeZone: "Asia/Phnom_Penh", // Cambodia time
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // or false for 24h format
      });
    }

</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 5px;
}

h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1rem;
}
table {
  border-collapse: collapse;
  width: 100%;
}

.wrap_date{
    display: flex;
    gap: 10px;
    margin: 12px 0;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f3f4f6;
  font-weight: 600;
}

input,
select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

button {
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
}

.bg-blue-700 {
  background-color: #3461db;
  color: white;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 9999px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  display: inline-block;
}

.bg-green-500 {
  background-color: #10b981;
}

.bg-yellow-400 {
  background-color: #facc15;
}

.bg-red-400 {
  background-color: #f87171;
}

.detail{
    width: 50%;
    background-color: #ddd;
    height: 25rem;
}

.select {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 6px;
}

</style>
