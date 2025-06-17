<template>
  <div class="main_container" v-if="auth.isAdmin && auth.loggedInUser.role==='admin'">
    <Navbar />
    <div class="router-view">
      <div class="sidebar"><Admin_menu_component/></div>
      <main class="main-content">
        <RouterView />
      </main>
    </div>
  </div>
  <div v-else>
    <h2>Checking Your role to access this page...</h2>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Navbar from "./admin-components/navBar-component.vue";
import Admin_menu_component from "./admin-components/admin-menu-component.vue";
import { useRouter } from "vue-router";
import useAuthentication from "@/stores/authentication";

export default {
  name: "AdminComponent",
  components: {
    Navbar,
    Admin_menu_component,
  },
  data() {
    return {
    };
  },
  computed: {
    NavBar_Data() {
      return this.NavBar_data;
    },
  },

  methods: {
    isSelectRoute(route) {
      return this.$route.path === route;
    },
  },
  setup() {
    const router = useRouter();
    const isAdmin = ref(false);
    const auth = useAuthentication();

    onMounted(() => {
      // Check if the user is an admin
      // This could be a call to an API or checking a store state
      isAdmin.value = true; // For demonstration, we assume the user is an admin
    });

    return {
      isAdmin,
      router,
      auth,
    };
  },
};
</script>

<style scoped>
.router-view {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
}
.sidebar {
  width: 280px;
}
.main-content {
  flex: 1;
  overflow-y: auto;
  min-height: 100vh;
}

</style>
