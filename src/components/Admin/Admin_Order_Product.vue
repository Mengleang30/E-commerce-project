<template>
    <div class="p-6 bg-white rounded shadow">
        <h2 class="text-xl font-bold text-purple-600 mb-4">Orders</h2>

        <div class="flex flex-wrap mb-4 gap-2">
            <div class="relative">

                <input type="text" placeholder="Search" class="border pl-8 p-2 rounded w-full md:w-auto"
                    v-model="searchQuery" @keyup.enter="searchQuery = searchQuery.trim()"
                    @keyup="searchQuery = searchQuery.trim()" @click="searchQuery = searchQuery.trim()" />
            </div>
            <input type="date" class="border p-2 rounded" v-model="selectedDate" />
            <select class="border p-2 rounded" v-model="selectedFilter">
                <option value="Filter">Filter</option>
                <option value="Successful">Successful</option>
                <option value="Pending">Pending</option>
                <option value="Cancel">Cancel</option>
            </select>

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
                    <th class="p-2 border">Payment Method</th>
                    <th class="p-2 border">Total Amounts</th>
                    <th class="p-2 border">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in filteredOrders" :key="index">
                    <td class="p-2 border">{{ order.orderId }}</td>
                    <td class="p-2 border">{{ order.customerName }}</td>
                    <td class="p-2 border">{{ order.customerId }}</td>
                    <td class="p-2 border">
                        <div :class="['status-badge', statusClass(order.status)]" :title="order.status">
                            {{ order.status }}
                        </div>
                    </td>
                    <td class="p-2 border">{{ order.date }}</td>
                    <td class="p-2 border">{{ order.items }}</td>
                    <td class="p-2 border">{{ order.payment }}</td>
                    <td class="p-2 border">{{ order.total }}</td>
                    <td class="p-2 border">
                        <button class="bg-blue-700 text-white rounded px-3 py-1 cursor-pointer hover:bg-blue-800">View
                            &gt;</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
            selectedDate: '',
            selectedFilter: 'Filter',
            orders: [
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Successful', date: '2023-01-12', items: 10, payment: 'ABA', total: '$42,000' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Pending', date: '2023-02-04', items: 10, payment: 'ABA', total: '$36,850' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Cancel', date: '2023-03-18', items: 10, payment: 'ABA', total: '$12,300' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Successful', date: '2023-04-27', items: 10, payment: 'ABA', total: '$98,456' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Successful', date: '2023-05-18', items: 10, payment: 'ABA', total: '$32,800' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Successful', date: '2023-06-21', items: 10, payment: 'ABA', total: '$12,300' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Successful', date: '2023-07-28', items: 10, payment: 'ABA', total: '$98,270' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Pending', date: '2023-08-22', items: 10, payment: 'ABA', total: '$34,000' },
                { orderId: '#109933', customerName: 'Piseth', customerId: '#109933', status: 'Successful', date: '2023-09-13', items: 10, payment: 'ABA', total: '$23,500' },
            ]
        }
    },
    computed: {
        filteredOrders() {
            return this.orders.filter(order => {
                const matchesSearch = order.customerName.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesDate = this.selectedDate ? order.date === this.selectedDate : true;
                const matchesStatus = this.selectedFilter === 'Filter' ? true : order.status === this.selectedFilter;
                return matchesSearch && matchesDate && matchesStatus;
            });
        }
    },
    methods: {
        statusClass(status) {
            return {
                'text-white px-2 py-1 rounded': true,
                'bg-green-500': status === 'Successful',
                'bg-yellow-400': status === 'Pending',
                'bg-red-400': status === 'Cancel',
            };
        }
    }
};
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
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
</style>
