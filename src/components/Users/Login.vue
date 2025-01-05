<script>
import { useUserStore } from '@/stores/userBookStore';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import SignUp from './SignUp.vue';
import { useRouter } from 'vue-router';



export default {
  name: "Login",

  components : {
    SignUp,
  },

  setup (){
    const user = useUserStore();
    const show_signUp = ref(false);
    const router = useRouter();
    
   

    const email = ref("");
    const password = ref("")
    const sign_in_message = ref("");
    const messageSuccessful = ref("")
    const handleLogin = (e)=>{
      e.preventDefault();
    
      if(!email.value.trim() || !password.value.trim()){
        sign_in_message.value = "Please enter email and password !";
        return  ;
      }
      const login = user.signIn(email.value, password.value);
      sign_in_message.value = login.message;
      if(login.success){
        messageSuccessful.value = login.message
        email.value = "";
        password.value = "";
        router.push("/")
      
      }
    }

    const ToSignUp= ()=>{
      show_signUp.value = !show_signUp.value;
    }
    return {
      email,
      password,
      handleLogin,
      sign_in_message,
      show_signUp,
      messageSuccessful,
      ToSignUp
    }

  }


};
</script>

<template>
  <!-- <h2>Login page</h2> -->
  <div class="sign_in_page" v-if="!show_signUp">
    <img src="../../assets/IP-Store.png" alt="IP Store" />
    <div class="login_page">
      <div class="button_home">
        <RouterLink to="/">
          <button>Home</button>
        </RouterLink>
      </div>
      <div class="sub_login_page">
        <h2>Log in your account</h2>
        <input placeholder="Email-address" v-model="email" type="email" name="" id="" required/>
        <input placeholder="Password" type="password" v-model="password" name="" id="" required/>
        <p class="message">{{ sign_in_message }}</p>
        <p class="logged_in">{{ messageSuccessful }}</p>
        <button @click="handleLogin" type="submit" id="login_btn">Login</button>
        <div class="additional_material">
          <h6>Don't have account? <span class="Register" @click="ToSignUp">Register Now</span></h6>
          <button>Help</button>
        </div>
      </div>
    </div>
  </div>
  <SignUp v-else :show_login="ToSignUp"/>

</template>

<style scoped>
.sign_in_page {
  display: flex;
  background-color: rgb(255, 255, 255);
  margin: 2px;
  border-radius: .5rem;
  box-shadow: 3px 3px 4px rgba(70, 69, 69, 0.8);
}
.sign_in_page img{
  width: 35%;
 
}
.login_page {
  display: flex;
  flex-direction: column;
  width: 75%;
}
.button_home {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
.button_home button {
  border-radius: 5px;
  background-color: black;
  color: aliceblue;
  width: 90px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.sub_login_page input {
  font-size: 24px;
  width: 70%;
  padding-left: 5px;
  height: 3.4rem;
  border-radius: .55rem;
  border: 2px solid black;
}
.sub_login_page input:focus{
  outline: 2px solid rgb(4, 66, 235);
}
.sub_login_page input:active {
  outline: black;
}
.sub_login_page {
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 5px;
}
#login_btn {
  width: 30%;
  height: 50px;
  background-color: blue;
  color: aliceblue;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: all .3s;
}
#login_btn:hover{
  background-color: red;
}
.additional_material {
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
}
.additional_material button {
  font-size: 20px;
  color: black;
  background-color: lightgray;
  border-radius: 5px;
  width: 80px;
  cursor: pointer;
}

.message{
  color: red;
  height: 1rem;
}
.Register {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
.logged_in{
  color: green;
}
</style>
