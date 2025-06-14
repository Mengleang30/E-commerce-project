<script setup>
import { ref } from 'vue';
import useAuthentication from '@/stores/authentication';
import EnterCode from './EnterCode.vue';
import { useRouter } from 'vue-router';
import { RouterView } from 'vue-router';

const email = ref('');
const Auth = useAuthentication();

const showEmail = ref(); 

const sending = ref(false);

const loading = ref(false);

const error = ref()





const handleSendCode = async () => {
  if(!email.value.trim()){
    return
  }
    loading.value = true;
    error.value = null;
    showEmail.value = `The code is sending... to ${email.value}`;
    const res = await Auth.sendCode(email.value)
    showEmail.value = `The code sent to ${email.value}`;
    loading.value = false;

    if (res.success) {
      console.log('The Code sent');
      sending.value = true;
    } else {
      error.value = res.message;
      sending.value = false;
    }
  }


</script>

<template>
  <div class="container">
    <div class="box">
      <div class="title">
       
      <img src="https://img.icons8.com/?size=100&id=K5bOaoSkbg1n&format=png&color=000000" alt="">
      <h2>Reset Password</h2>
    </div>
      <div class="box" @submit.prevent="handleSendCode">
        <h4>Enter your email  </h4>
        <form class="form">
        <input required type="email" v-model="email" placeholder="Email here" />
        <button type="submit" :disabled="loading">
        <span v-if="loading">Sending...</span>
        <span v-else>Send Now</span>
      </button>
        </form>
      </div>
      <small class="explanation-text">
            Please enter the email address associated with your account. We will send you a code to reset your password.
         </small>
    </div>
    <div v-if="!error">
        <span ><i class="text">{{ showEmail }}</i></span>
    </div>
     <div v-else>
        <span class="error">{{ error }}</span>
    </div>
    <EnterCode :email="email"/>
  </div>
 
</template>

<style scoped>

.explanation-text{
    color: rgb(63, 63, 63);
  
}

.text{
  color: rgb(239, 72, 47);
  font-weight: bold;
}
.error{
  color: red;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgb(255, 255, 255);
  margin: 10px;
  min-height: 30vh;
  padding: 1rem;
  color:rgb(41, 47, 53);
  border-radius: 9px;
  box-shadow: 3px 3px 4px rgba(70, 69, 69, 0.4);


}

.box {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.box input {
  min-width: 50%;
  height: 2.2rem;
  border: 1px solid rgb(210, 210, 210);
  border-radius: 7px;
  padding-left: .6rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.box input:focus {
  /* min-width: 60%; */
  border: 1px solid black;
  border-radius: 7px;
  outline: 1px solid blue;
}
.box img{
  width: 4rem;
  align-self: center;
}
.box button {
  width: 6rem;
  height: 40px;
  background-color: blue;
  color: aliceblue;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}
.box button{
  align-self: center;
} 
.box button:hover{
    background-color: cadetblue;
    color: whitesmoke;
}

.form{
  padding: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
