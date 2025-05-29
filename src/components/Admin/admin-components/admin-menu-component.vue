<template>
  <nav class="menu-panel">
    <RouterLink :class="{ active: isSelectRoute }" class="link" :to="Link">
      <span>{{ Admin_Nav_name }}</span>
      <img :src="Image_svg" alt="" width="20px" />
    </RouterLink>
  </nav>
</template>

<script>
export default {
  name: "Navbar_Admin",
  props: {
    Admin_Nav_name: String,
    Link: String,
    Image_svg: String,
    isSelectRoute: Boolean,
  },
};
</script>

<style scoped>
.menu-panel {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.menu-panel span {
  color: aliceblue;
}
.menu-panel a {
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
}
</style>
