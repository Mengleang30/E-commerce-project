<template>
  <nav class="navbar">
    <span>Book Store</span>
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
    <div class="log-out-btn">
      <!--SVG log out-->
      <button @click="$emit('logout')">Log Out</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      // Add component-specific data here
    };
  },
  methods: {
    // Add component-specific methods here
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
  font-size: 1rem;
}
.navbar span {
  font-size: 1.5rem;
}

.role-admin-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.admin-profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 1rem;
}
log-out-btn {
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
</style>
