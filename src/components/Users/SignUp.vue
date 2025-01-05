<!-- <script>

export default{
    name : "Login"
}

</script>

<template>
    <h2>Login page</h2>
</template>
 -->
<template>
  <!-- <h1>Login page</h1> -->
  <div class="container">
    <!-- <img src="./assets/images/store.svg" alt=""> -->
    <div class="left">
      <img src="../../assets/IP-Store.png" alt="" />
    </div>
    <form class="right">
      <h3>Create account</h3>
      <input type="text" v-model="username" placeholder="Username" />
      <input type="email" v-model="email" placeholder="Email Address" />
      <input type="password" v-model="password" placeholder="Password" />
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm Password"
      />
      <p class="message">{{ message }}</p>
      <button type="submit" @click="handleCreateAccount">Create</button>
      <p>
        Ready have an account?
        <span class="Register" @click="show_login">Log in</span>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "@/stores/userBookStore";
import { useRouter } from "vue-router";

export default {
  props: {
    show_login: Function,
  },
  setup() {
    const newUser = useUserStore();

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
        return;
      }

      if (password.value !== confirmPassword.value) {
        message.value = "Password not match !";
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
      } else {
        message.value = CreateUser.message || "Failed to create account!";
      }
    };

    return {
      username,
      email,
      password,
      confirmPassword,
      handleCreateAccount,
      message,
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
}
.message {
  color: red;
}
</style>
