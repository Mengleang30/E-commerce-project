<template>
  <nav class="navbar">
    <div class="nav_title">
    <CircleArrowLeft v-if="showMenu" title="Hide Menu" @click="toggleMenu" class="toggle-icon" />
     <CircleArrowRight v-if="!showMenu" title="Show Menu"  @click="toggleMenu" class="toggle-icon" />
    <span>Book Store</span>
    </div>
   
    <div class="role-admin-div">
      <span>System Administrator</span>
      <img
        src="/profile-admin.png"
        alt="admin-profile"
        class="admin-profile"
        width="5px"
        height="5px"
        style="border-radius: 50%; background-color: aliceblue"
      />
    </div>
    <!-- <div class="log-out-btn">
     
      <button @click="$emit('logout')">Log Out</button>
    </div> -->
  </nav>
</template>

<script>
import { CircleArrowLeft, CircleArrowRight } from 'lucide-vue-next';
export default {
  name: "NavBar",
  components: {
    CircleArrowLeft,
    CircleArrowRight,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // Add component-specific data here
    };
  },
  methods: {
    // Add component-specific methods here
      toggleMenu() {
        this.$emit('toggle-menu', !this.showMenu);
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: aquamarine;
  padding: 1rem;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  /* font-size: 1rem; */
}
.navbar span {
  font-size: 1.5rem;
}

.role-admin-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav_title {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.admin-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 1rem;
}
.log-out-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: white;
}
.log-out-btn button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  color: red;
}
.toggle-icon{
  width: 40px;
  color: rgb(2, 77, 27);
  background-color: rgb(245, 245, 245);
  padding: 5px;
  border-radius: 50%;
  border: 1px solid rgb(147, 190, 249);
  height: 40px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}
.toggle-icon:hover {
  cursor: pointer;
  background-color: rgb(2, 77, 27);
  border-radius: 50%;
  color: aliceblue;
}

@media (max-width: 768px) {
  .navbar span{
    font-size: medium;
  }
  .admin-profile {
    width: 40px;
    height: 40px;
  }
  .navbar .toggle-icon {
    width: 30px;
    height: 30px;
  }
 
}
</style>
