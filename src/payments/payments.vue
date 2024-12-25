<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const activeMethod = ref("");
const agreed = ref(false);

const selectMethod = (methods)=>{
  activeMethod.value=methods;
}


const methods = [
  { name: "Credit Card", icons: ["https://thumbs.dreamstime.com/b/web-141701054.jpg", "https://images.seeklogo.com/logo-png/29/2/visa-logo-png_seeklogo-299317.png?v=1958564521198137576"] },
  { name: "Paypal", icon: "https://img.utdstc.com/icon/d49/c48/d49c4851fcbdecccece71a27cddf0a6bddb23173461e763ec32cd08eeb778c69:200" },
  { name: "Google Pay", icon: "https://play-lh.googleusercontent.com/HArtbyi53u0jnqhnnxkQnMx9dHOERNcprZyKnInd2nrfM7Wd9ivMNTiz7IJP6-mSpwk" },
  { name: "Apple Pay", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSjFABHvm8QvXtakqYBhCKx7pPSHHQUKHlwg&s" },
  { name: "ABA Pay", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtY2aqkYA54jTqgCQmP2Zl0W7BwjM_XQ7vjg&s" },
  { name: "Acleda Pay", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM37KLHTgu31C4LMRGMBzIu7QwwJXVeOC-EA&s" },
];
defineProps({
  total : {
    type : Number,
  }
}
 
)

</script>
<template>
  <div class="payment">
    <div class="payMethod">
      <h3>How do you want to pay ?</h3>
      <div
        v-for="method in methods" class="method"
        :key="method.name"
        :class="{ 'method-active': activeMethod === method.name }"
        @click="selectMethod(method.name)"
      >
        {{ method.name }}
        <div v-if="method.icons" class="master_cart">
          <img v-for="icon in method.icons" :key="icon" :src="icon" alt="" />
        </div>
        <img v-else :src="method.icon" alt="" />
      </div>
      <div class="accept">
        <input type="checkbox" v-model="agreed"/>
        <p v-if="agreed">Thank you for agreeing!</p>
        <p v-else>Agree with the payment</p>
      </div>
      <div class="total">
        <h3>Total : ${{ total.toFixed(2) }}</h3>
        <button :disabled="!agreed || !activeMethod">Pay Now</button>
      </div>
    </div>
  </div>
</template>


<style scoped>

.payment{
    padding: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1001;
    
}
.payMethod .close{
  width: 1.5rem;
  position: absolute;
  right: 1%;
  top: 1%;
}
.payMethod{
    padding: .2rem;
    display: flex;
    flex-direction: column;
    width: auto;
    align-items: center;
    background-color: rgb(235, 235, 235);
    padding: 10px 25px;
    border-radius: .65rem;
    box-shadow: 2px 2px 2px rgba(70, 70, 70, 0.3);
    position: relative;
}
.payMethod .method{
    background-color: rgb(255, 255, 255);
    margin-top: .4rem;
    align-items: center;
    display: flex;
    width: 16rem;
    height: 3rem;
    padding: 5px 15px;
    justify-content: space-between;
    gap: 1rem;
    border-radius: .6rem;
    transition: all 0.2s;
   
    border: none;
    font-weight: 500;
    box-shadow: 2px 2px 2px rgba(70, 70, 70, 0.3);
  
}
.payMethod .method-active {
  font-weight: bold;
  outline: 2px solid rgb(16, 152, 220);
  background-color: rgb(64, 122, 248);
  color: rgb(255, 255, 255);
}
.payMethod .method:hover{
    background-color: rgb(250, 250, 215);
    cursor: pointer;
    transform: scale(.99);
    color: black;
    border: 1px solid rgba(174, 174, 174,.9);

}
.payMethod .method img{
   width: 2rem;
   border: 1px solid rgb(219, 219, 219);
   padding: 2px;
   border-radius: .5rem;
   margin-left: 5px;

}
.master_cart {
    display: flex;
}
.total button {
    background-color: royalblue;
    color: white;
    width: 5rem;
    border: none;
    border-radius: .4rem;
    transition: all 0.2s;
    outline: none;
    cursor: pointer;
}
.total button:disabled{
  background-color: grey;
  cursor: not-allowed;

}
.total button:enabled{
  background-color: red;
}
.total button:enabled:hover{
  background-color: rgb(246, 28, 28);
}

.total {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: 4rem;
}
.total h3{
  color: rgb(23, 93, 255);
}

.accept{
  display: flex;
  margin: 5px;
  gap: 1rem;
  align-items: center;
  
}
.accept input{
  width: 1.2rem;
  height: 1.2rem;
  accent-color: blue;
  cursor: pointer;
}

</style>
