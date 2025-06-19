<script setup>
import useUseManagement from '@/stores/adminFeature/adminUserManagement';
import { CircleEllipsis } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';



const useUser = useUseManagement();

const users = computed(()=>{
  return useUser.users;
})

const filterSearch = computed(() => {
  return users.value.filter(user => {
    return user.name.toLowerCase().includes(search.value.toLowerCase());
  });
});

const search = ref('');

 function formatTimestampToLocal(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        timeZone: "Asia/Phnom_Penh", // Cambodia time
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // hour12: true, // or false for 24h format
      });
    }

onMounted(() => {
   useUser.fetchUser();
});

</script>

<template>
  <div class="user-management">
    <h1>User Management</h1>
    <!-- {{ users }} -->

    <div class="search-filter">
      <input v-model="search" placeholder="Search users" />
     
    </div>

    <div class="filters">
      <label>
        <input type="radio" value="active" />
        Active Users
      </label>
      <label>
        <input type="radio" value="customer" />
        Customer
      </label>
    </div>

    <table border="1">
      <thead>
        <tr>
          <th>No.</th>
          <th>UserID</th>
          <th>Username</th>
          <th>Role</th>
          <th>Email</th>
          <th>Joined</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filterSearch" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.id }}</td>

          <td>{{ user.name }}</td>
          <td class="role">{{ user.role }}</td>
          <td>{{ user.email }}</td>
          <td class="status">{{ formatTimestampToLocal(user.created_at) }}</td>
        <td>
          <router-link class="link" :to="{ name: 'UserDetail', params: { user_id: user.id } }">
            <CircleEllipsis/>
          </router-link>
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>



<style scoped>
.user-management {
  font-family: sans-serif;
  padding: 20px;
  line-height: 3rem;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
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
  table-layout: auto;
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
  background-color: aqua;


}
.user-page {
    padding: 20px;
    color: #333;
  }

@media (max-width: 768px) {
    .user-management {
      padding: 10px;
    }
    .user-management h1 {
      font-size: 1.5rem;
    }
    .search-filter input {
      width: 100%;
    }
    table {
      font-size: 12px;
      text-wrap: wrap;
    }
    
  }
</style>

  

  