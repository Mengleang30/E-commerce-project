<template>
  <div class="user-management">
    <h1>User Management</h1>

    <div class="search-filter">
      <input v-model="searchQuery" placeholder="Search users" />
      <span class="search-icon">🔍</span>
    </div>

    <div class="filters">
      <label>
        <input type="radio" value="active" v-model="filter" />
        Active Users
      </label>
      <label>
        <input type="radio" value="customer" v-model="filter" />
        Customer
      </label>
    </div>

    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>UserID</th>
          <th>Username</th>
          <th>Role</th>
          <th>Email</th>
          <th>Status</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="index">
          <td>{{ user.num }}</td>
          <td>{{ user.id }}</td>

          <td>{{ user.name }}</td>
          <td class="role">{{ user.role }}</td>
          <td>{{ user.email }}</td>
          <td class="status">{{ user.status }}</td>
          <router-link :to="{ name: 'UserDetail', params: { id: user.id } }">
          <td><button class="detail-btn">...</button></td>
        </router-link>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>
.user-management {
  font-family: sans-serif;
  padding: 20px;
}
h1 {
  color: purple;
}
.search-filter {
  position: relative;
  display: flex;
  margin-top: 20px;
  margin-bottom: 40px;
}
.search-filter input {
  width: 500px;
  padding: 8px 30px 8px 10px;
}
.search-icon {
  position: absolute;
  left: 470px;
  top: 8px;
}

.filters {
  margin-bottom: 40px;
}
.filters label {
  margin-right: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  background-color: #f0f0f0;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
.role {
  color: red;
}
.status {
  color: blue;
}
.detail-btn {

}
</style>

  
  <script>
  export default {
    name: "User",
    data() {
    return {
      searchQuery: "",
      filter: "",
      users: [
        {
          num: 1,
          id: "#2333",
          name: "Sothea",
          role: "Customer",
          email: "sothea@gmail.com",
          status: "1d ago",
        },
        // Repeat or fetch more users as needed
      ],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        const matchesSearch = user.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesFilter =
          this.filter === "customer"
            ? user.role.toLowerCase() === "customer"
            : true;
        return matchesSearch && matchesFilter;
      });
    },
  },
  };
  </script>
  
  <style scoped>
  .user-page {
    padding: 20px;
    color: #333;
  }
  </style>
  