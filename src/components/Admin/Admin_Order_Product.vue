<template>
  <!-- {{ listOrders }} -->
  <div class="container">
    <h2>Orders</h2>


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
  <input type="date" class="border p-2 rounded" v-model="selectedDate" />
      <select class="select" v-model="selectedFilter">
        <option value="Filter">Filter</option>
        <option value="completed">completed</option>
        <option value="pending">pending</option>
        <option value="canceled">canceled</option>
      </select>
      </div>
    
    </div>

    <table class="w-full text-left border">
      <thead>
        <tr class="bg-gray-100">
          <th class="p-2 border">Order ID</th>
          <th class="p-2 border">Customer Name</th>
          <th class="p-2 border">Customer ID</th>
          <th class="p-2 border">Order Status</th>
          <th class="p-2 border">Date</th>
          <th class="p-2 border">Items</th>
          <th class="p-2 border">Total Amounts($)</th>
          <th class="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in filteredOrders" :key="order.id">
          <td class="p-2 border">{{ order.id }}</td>
          <td class="p-2 border">{{ order.username }}</td>
          <td class="p-2 border">{{ order.user_id }}</td>
          <td class="p-2 border">
            <div
              v-if="order.status === 'completed'"
              class="status-badge bg-green-500"
            >
              {{ order.status }}
            </div>
            <div
              v-if="order.status === 'pending'"
              class="status-badge bg-yellow-400"
            >
              {{ order.status }}
            </div>
            <div
              v-if="order.status === 'canceled'"
              class="status-badge bg-red-400"
            >
              {{ order.status }}
            </div>
          </td>
          <td class="p-2 border">
            {{ formatTimestampToLocal(order.created_at) }}
          </td>
          <td class="p-2 border">{{ order.total_items }}</td>
          <td class="p-2 border">{{ order.total_price }}</td>
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

<script>
import useAdminOrder from "@/stores/adminFeature/adminOrder";
import { computed, onMounted, ref } from "vue";

export default {
  setup() {
    const useAdminOrders = useAdminOrder();

    const listOrders = computed(() => {
      return useAdminOrders.order_list;
    });

    const searchQuery = ref("");
    const selectedDate = ref("");
    const selectedFilter = ref("Filter");

   const filteredOrders = computed(() => {
  // console.log("Statuses:", listOrders.value.map(o => o.status)); // Debug log

  return listOrders.value.filter(order => {
    const matchesSearch = order.username.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesDate = selectedDate.value
      ? new Date(order.created_at).toISOString().startsWith(selectedDate.value)
      : true;
    const matchesFilter =
      selectedFilter.value === "Filter" || order.status === selectedFilter.value;

    return matchesSearch && matchesDate && matchesFilter;
  });
});


    onMounted(() => {
      useAdminOrders.fetchOrderList();
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

    // console.log(listOrders);

    return {
      listOrders,
      formatTimestampToLocal,
      searchQuery,
      selectedDate,
      selectedFilter,
      filteredOrders,
    };
  },
};
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
</style>
