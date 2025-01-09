
<template>
  <!-- <h1>Login page</h1> -->
  <div class="container" >
    <!-- <img src="./assets/images/store.svg" alt=""> -->
    <div class="left">
      <img src="../../assets/IP-Store.png" alt="" />
    </div>
    <form class="right">
      <h3>Create Account</h3>
      <input type="text" v-model="username" placeholder="Username" />
      <input type="email" v-model="email" placeholder="Email Address" :class="redBorderEmail ? 'RedBorder' : ''"/>
      <div class="input_password">
        <input :type="show_password ? 'text' : 'password'" v-model="password" placeholder="Password" />
        <div @click="handleShowPassword">
          <img class="show_password"  src="https://img.icons8.com/?size=100&id=42007&format=png&color=000000" alt="">
        </div>
      </div>
     
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm Password" :class="redBorderConfirm ? 'RedBorder' : ''"
      />
      <p class="message">{{ message }}</p>
      <button type="submit" @click="handleCreateAccount">Create</button>
      <p>
        Ready have an account?
        <RouterLink to="/login" class="Register" >Log in</RouterLink>
      </p>
    </form>

    <div class="describe" v-for="(describe,index) in help_SignUP" :key="describe.topic">
        <div class="each_topic">
          <h3>{{index+1}}. {{ describe.topic }}</h3>
          <p>{{ describe.describe }}</p>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "@/stores/userBookStore";
import { RouterLink, useRouter } from "vue-router";


export default {
  name : "SignUp",
 
  setup() {
    const newUser = useUserStore();
    const router= useRouter();
    const message = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const handleCreateAccount = (e) => {
     
      e.preventDefault();
      if (
        !username.value.trim() ||
        !email.value.trim() ||
        !password.value.trim() ||
        !confirmPassword.value.trim()
      ) {
        message.value = "Please input all information !";
        return;
      }

      if (!email.value.includes("@")) {
        message.value = "Email must be include @ !";
        redBorderEmail.value=true;
        setTimeout(()=>{
          redBorderEmail.value = false;
        },2000)
        return;
      }

      if (password.value !== confirmPassword.value) {
        message.value = "Password not match !";
        redBorderConfirm.value=true;
        setTimeout(()=>{
          redBorderConfirm.value=false;
        },2000)
        
        return;
      } 

      const CreateUser = newUser.signUp(
        username.value,
        password.value,
        email.value
      );

      console.log(CreateUser);
      if (CreateUser.success) {
        message.value = CreateUser.message || "Account created successfully!";
        username.value = "";
        password.value = "";
        email.value = "";
        confirmPassword.value = "";
        router.push('/login')
        
      } else {
        message.value = CreateUser.message || "Failed to create account!";
      }
    };


    const redBorderEmail = ref(false);
    const redBorderConfirm = ref(false);

    const show_password = ref(false);
    const handleShowPassword =(()=>{
      show_password.value= !show_password.value;
    })

    return {
      username,
      email,
      password,
      confirmPassword,
      handleCreateAccount,
      message,
      redBorderEmail,
      redBorderConfirm,
      handleShowPassword,
      show_password,
    };
  },
};
</script>

<style scoped>
.container {
  justify-content: center;
  text-align: center;
  display: flex;
  background-color: #f4f4f4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.left {
  padding: 10px;
  background-color: #a7a682;
  text-align: center;
  width: 350px;
}

.right {
  padding: 30px;
  width: 400px;
}

h2 {
  margin-top: 10px;
}

img {
  max-width: 106%;
  height: 100%;
}

input {
  width: 100%;
  padding: 15px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 40%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  text-align: center;
}
.Register {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
  font-weight: bold;
}
.message {
  color: red;
}



.help{
  background-color: rgb(251, 251, 251);
  box-shadow: 3px 3px 5px rgba(172, 171, 171, 0.8);
  position: absolute;
  width: 95%;
  height: 95%;
  translate: -50% -50%;
  top: 50%;
  border-radius: .3rem;
  left: 50%;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid rgb(176, 173, 173);
}
.help .help_top {
  display: flex;
  padding: 0px 6px;
  position: relative;
  justify-content: center;
  color: rgb(4, 66, 235);
}
.help .help_top img{
  width: 2.3rem;
  position: absolute;
  right: 0%;
  cursor: pointer;
  padding: 3px;
  transition: all .3s;
}
.help .help_top img:hover{
  background-color: rgb(220, 217, 217);
  border-radius: 50%;

}
.describe{
  line-height: 1.6rem;
}
.describe p{
 color: rgb(48, 47, 47);
 font-weight: 500;
}
.describe h3{
  color: midnightblue;
}
.describe .each_topic{
  background-color: rgb(247, 247, 247);
  margin-bottom: 5px;
  padding: 5px;
  border-radius: .4rem;

}

.RedBorder{
  border: 2px solid red;
}

.input_password{
  position: relative;
}

.show_password{
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  translate: -50% -50%;
  font-size: small;
  right: 0%;
  top: 50%;
  cursor: pointer;
}

    
@media screen and (max-width : 560px){
  .left{
    display: none;
  }


    }
</style>
