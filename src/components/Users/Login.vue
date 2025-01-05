<script>
export default {
  name: "Login",
};
</script>

<template>
  <!-- <h2>Login page</h2> -->
  <div class="sign_in_page">
    <img src="../../assets/IP-Store.png" width="25%" alt="IP Store" />
    <div class="login_page">
      <div class="button_home">
        <button>Home</button>
      </div>
      <div class="sub_login_page">
        <h1>Log in your account</h1>
        <input placeholder="Email-address" type="email" name="" id="" />
        <input placeholder="Password" type="password" name="" id="" />
        <button id="login_btn">Login</button>
        <div class="additional_material">
          <h6>Don't have account? <a href="#">Register Now</a></h6>
          <button>Help</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.sign_in_page {
  display: flex;
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
  font-size: 1rem;
  font-weight: bold;
}
.sub_login_page input {
  font-size: 30px;
  width: 50%;
  height: 5rem;
  border-radius: 5px;
  border: 2px solid black;
}
.sub_login_page input:active {
  outline: black;
}
.sub_login_page {
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
#login_btn {
  width: 40%;
  height: 50px;
  background-color: blue;
  color: aliceblue;
  border-radius: 10px;
  font-size: 20px;
}
.additional_material {
  width: 40%;
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
}
</style>
