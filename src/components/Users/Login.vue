<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthentication } from "@/stores/authentication";
import { useUserStore } from "@/stores/userBookStore";

const user = useUserStore();
const router = useRouter();
const Auth = useAuthentication();

const show_signUp = ref(false);
const show_signUp_help = ref(true);
const show_help = ref(false);

const email = ref("");
const password = ref("");
const message = ref("");
const loginSuccess = ref(false);
const sign_in_message = ref("");
const messageSuccessful = ref("");

const help_login = [
  {
    topic: "Navigate to the Login Page",
    describe: `Open the application and go to the login page by clicking on the "Login" button in the navigation menu or homepage.`,
  },
  {
    topic: "Enter Your Email",
    describe: `In the first input field, type the email address associated with your account. Ensure it's a valid email format (e.g., example@domain.com).`,
  },
  {
    topic: "Enter Your Password",
    describe: `In the second input field, type the password for your account. Ensure you enter the correct password to avoid errors.`,
  },
  {
    topic: "Click the Login Button",
    describe: `Press the "Login" button to submit your credentials.`,
  },
  {
    topic: "Successful Login",
    describe: `If your credentials are correct, you will see a success message and be redirected to the homepage. If your credentials are incorrect, an error message will be displayed asking you to check your email and password.`,
  },
];

const help_SignUP = [
  {
    topic: "Navigate to the Sign-Up Page",
    describe: `On the login page, click the "Register Now" link under the "Don't have an account?" section to open the sign-up page.`,
  },
  {
    topic: "Fill in Your Details",
    describe: `Enter a valid email address in the email field. Choose a secure password and type it in the password field. Provide any other necessary details (like name, email, or other fields, as required).`,
  },
  {
    topic: "Submit the Form",
    describe: `Click the "Sign Up" button to create your account.`,
  },
  {
    topic: "Successful Registration",
    describe: `If the registration is successful, you will see a confirmation message and may be redirected to the login page to access your new account. If there are any issues (e.g., missing required fields or invalid email), error messages will guide you to correct them.`,
  },
];

function ToSignUp() {
  show_signUp.value = !show_signUp.value;
}

function handleShowSignUpHelp() {
  show_signUp_help.value = true;
}

function handleShowHelpLogin() {
  show_signUp_help.value = false;
}

function handleClickHelp() {
  show_help.value = !show_help.value;
}
async function handleLogin() {
  const response = await Auth.login(email.value, password.value);
  loginSuccess.value = response.success;
  message.value = response.message;

  if (response.success) {
    // Optional: redirect or do something on successful login
    router.push("/");
    messageSuccessful.value = "Login successful!";
  }
}
</script>


<template>
  <!-- <h2>Login page</h2> -->
  <div class="sign_in_page">
    <img class="img_shop" src="../../assets/IP-Store.png" alt="IP Store" />
    <div class="login_page">
      <div class="button_home">
        <RouterLink to="/">
          <button>Home</button>
        </RouterLink>
      </div>
      <form class="sub_login_page " @submit.prevent="handleLogin()">
        <h2>Log in your account</h2>
        <input
          placeholder="Email-address"
          v-model="email"
          type="email"
          name=""
          id=""
          required
        />
        <input
          placeholder="Password"
          type="password"
          v-model="password"
          name=""
          id=""
          required
        />
        <p class="message">{{ sign_in_message }}</p>
        <p class="logged_in">{{ messageSuccessful }}</p>
        <button type="submit" id="login_btn">Login</button>
        <div class="additional_material">
          <h6>
            Don't have account?
            <RouterLink to="/signUp" class="Register">Register Now</RouterLink>
          </h6>
          <button>Help</button>
        </div>
      </form>
    </div>

    <div class="help" v-if="show_help">
      <div class="title">
        <div class="pick_help">
          <h3 @click="handleShowSignUpHelp" :class="show_signUp_help ? 'noFocusOn': 'focusOn'">How to Sign In ?</h3>
        </div>
        <div class="pick_help">
          <h3 @click="handleShowHelpLogin" :class="show_signUp_help ? 'focusOn': 'noFocusOn'">How to Create Account ?</h3>
        </div>
        
      </div>
      <img
            class="close"
            @click="handleClickHelp"
            src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000"
            alt=""
      />
      <div v-if="show_signUp_help">
        
        <div class="help_top"> 
        </div>
        <div
          class="describe"
          v-for="(describe, index) in help_login"
          :key="describe.topic"
        >
          <div class="each_topic">
            <h4>{{ index + 1 }}. {{ describe.topic }}</h4>
            <p>{{ describe.describe }}</p>
          </div>
        </div>
      </div>
      <div v-else>
       
        <div>
          <div class="help_top">
          </div>
          <div
            class="describe"
            v-for="(describe, index) in help_SignUP"
            :key="describe.topic"
          >
            <div class="each_topic">
              <h4>{{ index + 1 }}. {{ describe.topic }}</h4>
              <p>{{ describe.describe }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sign_in_page {
  display: flex;
  position: relative;
  background-color: rgb(255, 255, 255);
  margin: 2px;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 4px rgba(70, 69, 69, 0.8);
}
.sign_in_page img {
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
  border-radius: 0.55rem;
  border: 2px solid black;
}
.sub_login_page input:focus {
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
  transition: all 0.3s;
}
#login_btn:hover {
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

.message {
  color: red;
  height: 1rem;
}
.Register {
  text-decoration: underline;
  color: blue;
  cursor: pointer;
}
.logged_in {
  color: green;
}

.help {
  background-color: rgb(251, 251, 251);
  box-shadow: 3px 3px 5px rgba(172, 171, 171, 0.8);
  position: absolute;
  width: 95%;
  height: 95%;
  translate: -50% -50%;
  top: 50%;
  border-radius: 0.3rem;
  left: 50%;
  line-height: 2rem;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid rgb(176, 173, 173);
}
.help .help_top {
  padding: 0px 6px;
  text-align: center;
  color: rgb(4, 66, 235);
}
.help img {
  width: 2.3rem;
  position: absolute;
  right: 1%;
  top: 1%;
  cursor: pointer;
  padding: 3px;
  transition: all 0.3s;
  cursor: pointer;
}
.help img:hover {
  background-color: rgb(220, 217, 217);
  border-radius: 50%;
}
.describe {
  line-height: 1.6rem;
}
.describe p {
  color: rgb(48, 47, 47);
  font-weight: 500;
}
.describe h4 {
  color: midnightblue;
}
.describe .each_topic {
  background-color: rgb(247, 247, 247);
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 0.4rem;
}
.title{
  background-color: aliceblue;
  display: flex;
  justify-content: center;

  height :2rem;
  align-items: center;
  color: rgb(255, 255, 255);
  gap: 2px;
}
.title h3{
  padding: 5px 10px;
  cursor: pointer;
  border-radius: .4rem;
  transition: all .4s;
}

.title h3:hover{
  background-color: rgb(15, 20, 24);
 
}

.focusOn {
  background-color: rgb(26, 128, 230);
}

.noFocusOn {

  font-weight: bold;
  background-color: rgb(27, 34, 39) ;
  color: rgb(250, 250, 247);
}

.BorderRed{
  border: 2px solid red;
}

@media screen and (max-width : 560px){
 
  
  .title h3{
    font-size: 12px;
    height: 2rem;
    display: flex;
    align-items: center;
  }

  .describe{
    font-size: 12px;  
    line-height: 1.2rem;
  }

  .sign_in_page .img_shop{
    display: none;
  }
  .sign_in_page {
    font-size: 14px;
  }
  .login_page{
    width: 100%;
  }


    }
</style>
