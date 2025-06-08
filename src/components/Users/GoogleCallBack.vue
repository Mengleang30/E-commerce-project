<template>
  <div>Logging you in with Google...</div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useAuthentication from "@/stores/authentication";

const router = useRouter();
const auth = useAuthentication();

onMounted(async () => {
  // Grab token from URL query string 
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");

  if (token) {
    const result = await auth.googleLogin(token);
    if (result.success) {
      router.push("/"); // redirect after successful login
    } else {
      router.push("/login"); // redirect if login failed
    }
  } else {
    router.push("/login"); // no token found, redirect to login
  }
});
</script>
