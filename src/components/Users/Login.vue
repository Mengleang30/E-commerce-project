
<script setup>

import router from '@/router';
import { useUserStore } from '@/stores/userBookStore';
import { computed, ref } from 'vue';

const userStore = useUserStore();

const username = ref('')
const email = ref('')
const password = ref('')

const email1 = ref('')
const password1 = ref('')
const signUpMessage = ref('')

const confirm = ref('');

const signInMessage = ref('')




const passwordStrength = computed(() => {
  if (!password.value) return "";
  if (password.value.length < 4) return "Password is weak!";
  if (password.value.length < 8) return "Password is moderate.";
  return "Password is strong!";
});

const SignUp = (e)=>{
    e.preventDefault();

    if (!username.value.trim() || !email.value.trim() || !password.value.trim()) {
    signUpMessage.value = "Please fill in all the fields!";
    return;
    }
    if(password.value !==confirm.value){
        signUpMessage.value = "password not match ! "
        return;
    }

    const newUser = userStore.signUp(username.value, password.value , email.value); 
    console.log("Created user : ",username.value, password.value , email.value)
    signUpMessage.value = newUser.message;

    if(newUser.success){
        username.value = "";
        password.value = "";
        email.value = "";
        confirm.value = '';
    }
   
    
}

const signIn = (e)=>{
    e.preventDefault();
    if (!email1.value.trim() || !password1.value.trim()) {
    signInMessage.value = "Please enter both email and password!";
    return;
  }

  const SingedIn = userStore.signIn(email1.value, password1.value);
  signInMessage.value = SingedIn.message;


  // Clear inputs if needed
  if (SingedIn.success) {
    email1.value = "";
    password1.value = "";
    // router.push("/")
    router.go(-1)
    
  }
}

</script>

<template>
    <h2>Login page</h2>
    <form >
        <h4>Sign Up</h4>
        <input v-model="username" type="text" placeholder="username">
        <input v-model="email" type="email" placeholder="email">
        <input v-model="password" type="password" placeholder="password">
        <input v-model="confirm" type="password" placeholder="confirm">
        <p>{{ passwordStrength }}</p>
        <p >{{ signUpMessage }}</p>
        <button @click="SignUp" type="submit">Sign up</button>
    </form>
    <form >
        <h4>Sign In</h4>
        <input v-model="email1" type="email" placeholder="email">
        <input v-model="password1" type="password" placeholder="password">
        <p>{{ signInMessage }}</p>
        <button @click="signIn" type="submit">Sign in</button>
    </form>
</template>

 