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
            <h2>WELCOME TO IP STORE</h2>
            <img src="./assets/images/store.svg" alt="">
        </div>
        <div class="right">
            <h3>Create account</h3>
            <input type="text" v-model="username" placeholder="Username" />
            <input type="email" v-model="email" placeholder="Email Address" />
            <input type="password" v-model="password" placeholder="Password" />
            <input type="password" v-model="confirmPassword" placeholder="Confirm Password" />
            <button @click="createAccount">Create</button>
            <p>Ready have an account? <a href="#">Log in</a></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        createAccount() {
            alert(`Account Created for ${this.username}`);
        }
    }
}
</script>

<style scoped>
.container {
    justify-content: center;
    display: flex;
    background-color: #f4f4f4;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.left {
    padding: 10px;
    background-color: #a7a682;
    text-align:center;
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
    margin-left: -10px;
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
</style>
