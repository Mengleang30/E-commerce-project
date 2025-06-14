<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentDateTime = ref("");
let intervalId = null;
const show_feedback = ref(false);

const hanldeShowFeedback= () =>{
  show_feedback.value = !show_feedback.value
}

function updateDateTime() {
  // Get the current date and time in Cambodia
  const options = {
    timeZone: "Asia/Phnom_Penh",
    year: "numeric",
    month: "short",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  currentDateTime.value = new Date().toLocaleTimeString("en-US", options);
}

onMounted(() => {
  updateDateTime();
  intervalId = setInterval(updateDateTime, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <footer class="footer" >
    <hr />
    <div class="wrapping_footer">
      <div class="wrap_first">
        <h3>Contact Us</h3>
        <span>Follow Us</span>
      
        <div class="wrap_icon">
          <img
            src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
            alt=""
          />
          <img
            src="https://img.icons8.com/?size=100&id=63306&format=png&color=000000"
            alt=""
          />
          <img
            src="https://img.icons8.com/?size=100&id=Xy10Jcu1L2Su&format=png&color=000000"
            alt=""
          />
          <img
            src="https://img.icons8.com/?size=100&id=38863&format=png&color=000000"
            alt=""
          />
        </div>
        <h4 @click="hanldeShowFeedback" class="showFeedback">
          Feedback
        </h4>
        <div v-if="show_feedback" class="feedback">
         
          <div class="wrapping_input">
                Email 
                <input type="email" placeholder="Email"></input>
          </div>
          <div class="wrapping_input"> 
                <textarea type="text" placeholder="Write feedback here..."></textarea>
          </div>
          
          <button>Submit</button>

        </div>
      </div>

      <div class="wrap_link">
        <h4>Quick links</h4>
        <a href="#">Home</a>
        <a href="#">Feature</a>
        <a href="#">How to Work</a>
        <a href="#">FAQ</a>
        <a href="#">Contact</a>
      </div>
      <div class="wrap_link">
        <h4>Legal Links</h4>
        <a href="#">Teams of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Supports</a>
        <a href="#">Help Center</a>
        <a href="#">Security</a>
      </div>
      <div class="wrap_link_Customer">
        <h4>Customer Service</h4>
        <div class="Wrap_email">
          <div class="wrapping_div">
            <div class="email">
              <img
                src="https://img.icons8.com/?size=100&id=3AYCSzCO85Qw&format=png&color=000000"
                alt=""
              />
              <span>Email </span>
            </div>
            <i class="specific">bookshopkh@gmail.ocm</i>
          </div>
          <div class="wrapping_div">
            <div class="phone">
              <img
                src="https://img.icons8.com/?size=100&id=ufkkYBXJSuPy&format=png&color=000000"
                alt=""
              />
              <span>Phone </span>
            </div>
            <i class="specific">+885 102973812 (24/24h)</i>
          </div>

          <div class="wrapping_div">
            <div class="address">
              <img
                src="https://img.icons8.com/?size=100&id=PZTTDl8ML4vy&format=png&color=000000"
                alt=""
              />
              <span>Address</span>
            </div>
            <address class="specific">
              ITC ,Phnom Penh, Cambodia
              <p>{{ currentDateTime }}</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.footer {
  text-align: center;
}

.footer img {
  width: 20rem;
  height: 20rem;
  margin: 5px;
  box-shadow: 0px 4px 3px rgb(0, 0, 0, 20%);
  border-radius: 0.16rem;
  border: 2px solid rgb(136, 136, 136);
 
}
.wrapping_footer {
  display: grid;
  
  padding: 5px;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  background-color: rgb(207, 207, 207);
  gap: 5px;
  padding: 1rem 0.5rem;
}
.wrap_first {
  background-color: rgb(227, 227, 227);
  box-shadow: 2px 2px 2px rgba(136, 136, 136, 0.4);
  border-radius: 0.6rem;
  padding: 5px;
}
.wrap_first h3 {
  color: rgb(4, 71, 196);
}
.wrap_first .wrap_icon {
  display: block;
  gap: 5px;
}
.wrap_first img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid rgb(255, 255, 255);
  padding: 2.4px;
  cursor: pointer;
  transition: all 0.2s;
}
.wrap_first img:hover {
  transform: scale(1.1);
}
.wrap_link img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  border: 1px solid rgb(255, 255, 255);
}
.wrap_link {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 5px;
  padding: 8px;
  background-color: rgb(227, 227, 227);
  box-shadow: 2px 2px 2px rgba(136, 136, 136, 0.4);
  border-radius: 0.6rem;
  flex-grow: 1;
}
.wrap_link a {
  text-decoration: none;
  color: rgb(104, 104, 104);
  font-weight: bold;
  font-size: 0.9rem;
}
.wrap_link a:hover {
  color: rgb(235, 102, 24);
}
.wrap_link_Customer {
  background-color: rgb(227, 227, 227);
  box-shadow: 2px 2px 2px rgba(136, 136, 136, 0.4);
  border-radius: 0.6rem;
  padding: 5px;
}
.wrap_link_Customer img {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  border: 1px solid rgb(255, 255, 255);
}
.Wrap_email {
  display: flex;
  height: 50%;
  flex-direction: column;
  padding: 3px;
  width: 100%;
  gap: 5px;
  align-items: center;
}
.email,
.phone {
  align-items: center;
  display: flex;
  border-radius: 0.6rem;
  justify-content: center;
}
.address {
  align-items: center;
  display: flex;
  height: 50%;
}
.wrapping_div {
  background-color: rgb(224, 222, 222);
  box-shadow: 2px 2px 2px rgba(136, 136, 136, 0.4);
  flex-grow: 1;
  border-radius: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  font-weight: 500;
  padding: 5px;
  width: 95%;
}
.wrapping_div:hover {
  background-color: floralwhite;
  cursor: pointer;
  transform: scale(1.02);
  transition: all 0.2s;
}
.specific {
  font-size: 0.8rem;
}

.feedback{
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
}

.feedback .wrapping_input{
  display: flex;
  align-items: center;
  gap: 3px;
  justify-content: space-between;
}
.feedback .wrapping_input input , textarea{
  width: 70%;
  border: 1px solid rgb(196, 195, 195);
  padding-left: 5px;
  height: 2rem;
  border-radius: .25rem;
 
  
}
.feedback .wrapping_input textarea{
  width: 100%;
  border: 1px solid rgb(196, 195, 195);
  resize: none;
  resize: vertical;
  min-height: 4rem;
  max-height: 20rem;

  
  
}
.feedback button{
  width: 50%;
  border: 1px solid rgb(196, 195, 195);
  text-align: center;
  height: 1.6rem;
  padding: 5px;
  align-self: center;
  border-radius: .3rem;
  background-color: rgb(62, 125, 244);
  margin-bottom: 4px;
  color: white;
  cursor: pointer;
}
.feedback button:hover{
  background-color: red;
 
}

.showFeedback{
  text-decoration: underline;
  margin-top: 10px;
  color: rgb(8, 172, 237);
  cursor: pointer;

}

</style>
