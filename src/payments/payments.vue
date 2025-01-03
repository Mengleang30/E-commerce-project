<script setup>
import { computed, ref } from 'vue';
import { defineProps } from 'vue';
import {saveAs} from 'file-saver'
import Qrcode from '@/assets/Qrcode.jpg'
import invoice from './invoice.vue';
import { useUserStore } from '@/stores/userBookStore';


const useStore = useUserStore();


const activeMethod = ref("");
const agreed = ref(false);
const selectedMethod = ref(undefined);





const cvv =ref('');
const messageCvv = ref("");
const validateCvv = () => {
  const Cvv = parseInt(cvv.value, 10);

  if( Cvv.length < 3 || Cvv.length > 3) {
    messageCvv.value = "Your CVV invalid";
    return false;
  }
  else if (isNaN(Cvv)){
    messageCvv.value = "Must be 3 digits number !";
    return false;
  }

  else {
    messageCvv.value = "";
    return true
  }

}

const cardNumber = ref("");
const messageCard = ref("")
const validateCardNumber = () => {
  const number = cardNumber.value;
  if (!/^\d{13,19}$/.test(number)) {
    messageCard.value = "Invalid card length. Must be 13-19 digits.";
    return false;
  }

  messageCard.value = ""; // Clear message if valid
  return true;
};

const month = ref("");
const messageMonth = ref('')
const validateMonth = ()=>{
  const Month = parseInt(month.value, 10);
  if(isNaN(Month) || Month<1 || Month > 12){
    messageMonth.value = "Invalid month !";
    return false;
  }

  else {
    messageMonth.value = "";
    return true;

  }

}


const year = ref("");
const messageYear = ref("");
const validateYear = ()=>{
  const Year = parseInt(year.value,10);
  if(isNaN(Year)){
    messageYear.value = "Invalid year !";
    return false;
  }
  else if( Year <2024 || Year >3000){
    messageYear.value = "Invalid year !";
    return false

  }
  else {
    messageYear.value= "";
    return true;
  }
 

}

const invoiceShow = ref(false)
const showInvoice = () =>{
    invoiceShow.value = !invoiceShow.value;
    if(invoiceShow.value==false){
      useStore.clearInvoive();
    }
   
}



const Buy = () => {
  // Ensure handleBuy updates the cart and bought status
 
 
  // Validate the card details
  const isCardNumberValid = validateCardNumber();
  const isCvvValid = validateCvv();
  const isMonthValid = validateMonth();
  const isYearValid = validateYear();

  // If QR is showing, toggle the invoice view
  if (showQr.value === true) {
    invoiceShow.value = !invoiceShow.value;
    useStore.handleBuy()
    return true 
  }
  
  invoiceShow.value = true
  // If any of the card validations fail, stop the process
  if (!isCardNumberValid || !isCvvValid || !isMonthValid || !isYearValid) {
    return false;  // Return false if validation fails
  } 
};


const showQr = ref(false);
const showQrCode = ()=>{
  showQr.value = !showQr.value;
}


const downloadQr = ()=>{
 
  fetch(Qrcode)
  .then((rep)=>rep.blob())
  .then((blob)=>{
    saveAs(blob, "BookShopQr.jpg");
  })
  .catch((err)=>{
    console.error("Error download : ", err);
  })
} 

const selectMethod = (methodsName)=>{
  activeMethod.value=methodsName;

  selectedMethod.value = methods.find((m) => m.name === methodsName);

  if(showQr.value==true){
    showQr.value = false;
  }
  
  
}


const methods = [
  { name: "Credit Card", icons: ["https://thumbs.dreamstime.com/b/web-141701054.jpg", "https://images.seeklogo.com/logo-png/29/2/visa-logo-png_seeklogo-299317.png?v=1958564521198137576"] },
  { name: "Paypal", icon: "https://img.utdstc.com/icon/d49/c48/d49c4851fcbdecccece71a27cddf0a6bddb23173461e763ec32cd08eeb778c69:200"},
  { name: "Google Pay", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR4ArUxtci1ip0bL0K9hs9QtwcJGy_gu9iYA&s" },
  { name: "Apple Pay", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSjFABHvm8QvXtakqYBhCKx7pPSHHQUKHlwg&s" },
  { name: "ABA Pay", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtY2aqkYA54jTqgCQmP2Zl0W7BwjM_XQ7vjg&s" },
  { name: "Acleda Pay", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM37KLHTgu31C4LMRGMBzIu7QwwJXVeOC-EA&s" },
];
defineProps({
  total : {
    type : Number,
  },
  click_close: {
    type : Function,
  },
}
 
)

</script>
<template>
  <div class="payment" >
    <img @click="click_close" v-if="!invoiceShow==true" class="close" src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000" alt="">
    <img @click="showInvoice" v-else class="close" src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000" alt="">
    <div class="payMethod" v-if="!invoiceShow">
      <h3>How do you want to pay ?</h3>

      <div
        v-for="method in methods" class="method" :title="method.name"
        :key="method.name"
        :class="{ 'method-active': activeMethod === method.name }"
        @click="selectMethod(method.name)" >

        <span>{{ method.name }}</span>
        <div v-if="method.icons" class="master_cart">
          <img v-for="icon in method.icons" :key="icon" :src="icon" alt="" />
        </div>
        <img v-else :src="method.icon" alt="" />
        
      </div>

      <div v-if="selectedMethod" class="selected_method" >

        <div class="icons">
          <div v-if="selectedMethod.icons">
            <img v-for="icon in selectedMethod.icons" :src="icon" alt="" :key="icon">
          </div>
          <img v-else :src="selectedMethod.icon" alt="">
          <h3>{{ selectedMethod.name }}</h3>
        </div>
        
        <div v-if="showQr" class="Qrcode_show_container">
          <img @click="downloadQr" class="download" src="https://img.icons8.com/?size=100&id=vDfvxaQA6L2e&format=png&color=000000" alt="">
          <div class="title">
            <h4>Book Shop</h4>
            <span>$ 0</span>
          </div>
          <hr>
          <img class="Qrcode_show" src="https://img.icons8.com/?size=100&id=45920&format=png&color=000000" alt="">
          <img @click="showQrCode" class="close" src="https://img.icons8.com/?size=100&id=13903&format=png&color=000000" alt="">
        </div>

        <div class="container">
            <div >Card Number </div>
            <input class="cardNumber" v-model="cardNumber" 
            @input="validateCardNumber" type="number" placeholder="Enter Card" inputmode="numeric">
            <p class="Invalid">{{ messageCard }}</p>
        <div>
          Expire Date 
          <div class="wrapDate">
            <div>
              <input v-model="month" class="input_date"
            @input="validateMonth" type="month" placeholder="MM" max="12" min="0" maxlength="2" >
            <p class="Invalid">{{ messageMonth }}</p>
            </div>
         <div>
          <input v-model="year" 
            @input="validateYear" class="input_date"
            type="text" placeholder="YY" max="3000"min="2000" maxlength="4"  >
            <p class="Invalid">{{ messageYear }}</p>
         </div>
          </div>
          <div class="wrapQR">
            <div>
              <div>Security Code</div>
              <input 
              v-model="cvv"
              @input="validateCvv"
              type="text" maxlength="3" placeholder="CVV">
              <div class="Invalid">{{ messageCvv }}</div>
            </div>
            <div @click="showQrCode" class="qrcode" title="using QR">
              <img src="@/assets/icons_qr_code.gif" alt="">
              <span>Using QR</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      
      <div class="accept">
        <input type="checkbox" v-model="agreed"/>
        <p v-if="agreed">Thank you for agreeing!</p>
        <p v-else>Agree with the payment</p>
      </div>

      <div class="total">
        <h3>Total : ${{ total.toFixed(2) }}</h3>
        <button title="Buy Now" @click="Buy" :disabled="!agreed || !activeMethod || useStore.loggedInUser.cart.length === 0">Pay Now
          <img width="25" height="25" src="https://img.icons8.com/officel/30/cheap-2.png" alt="lock-2"/>
        </button>
      </div>
    
    </div>
    <div v-else >
      <invoice :-payment="selectedMethod.name" :-acc-id="cardNumber"
      />
    </div>
  </div>


</template>


<style scoped>

.payment{
    padding: 5px;
    text-align: center;
    z-index: 1001;
    position: relative;
    display: flex;
    height: auto;
    font-size: 14px;
}
.payment .close{
  width: 2rem;
  position: absolute;
  z-index: 2000;
  right: 1.5%;
  top: 1.5%;
  cursor: pointer;
  transition: all .2s;
}
.payment .close:active{
  transform: scale(1.05);
}
.payment .close:hover{
  background-color: rgb(255, 36, 36);
  border-radius: 50%;
}

.payMethod{
    padding: .5rem;
    display: flex;
    flex-direction: column;
    width: auto;
    align-items: center;
    background-color: rgb(235, 235, 235);
    padding: 10px 25px;
    border-radius: .65rem;
    overflow: auto;
    box-shadow: 2px 2px 2px rgba(70, 70, 70, 0.3);
    position: relative;
}
.payMethod .method{
    background-color: rgb(255, 255, 255);
    margin-top: .4rem;
    align-items: center;
    display: flex;
    width: 20rem;
    height: 2.65rem;
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
   width: 1.8rem;
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
    width: 5.4rem;
    height: 2.5rem;
    border: none;
    border-radius: .4rem;
    transition: all 0.2s;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.total button:disabled{
  background-color: grey;
  cursor: not-allowed;

}
.total button:enabled{
  background-color: rgb(20, 177, 255);
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


.selected_method {
  background-color: rgb(252, 252, 247);
  margin-top: .2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: .5rem;
  padding: 5px;
  gap: 5px;


}
.selected_method img {
  width: 2rem;
  border-radius: .4rem;
  padding: 1px;
  margin: 1px;
}
.selected_method .icons{
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: space-evenly;
  background-color: aliceblue;
  border-radius: .6rem;
  padding: 5px;
}

.selected_method .container{
  text-align: center;
  height: auto;

}
.selected_method .container input{
  height: 2rem;
  margin: 1px;
  text-align: center;
  width: 5rem;
  border: 1px solid rgba(179, 179, 179,0.7);
  border-radius: .4rem;
}
.selected_method .container input:focus{
 outline: 1px solid #007BFF;
}

.selected_method .container .cardNumber  {
  width: 100%;
  -moz-appearance: textfield;
  appearance: textfield;
  -webkit-appearance: textfield;
}

.wrapQR {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  
}
.wrapQR img {
  width: 2.4rem;
 
}

.wrapQR .qrcode{
  background-color: rgb(229, 241, 254);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  cursor: pointer;
  margin-right: 5px;
  box-shadow: 1px 1px 2px rgba(174, 174, 174,.6);
  width: 40%;
  border-radius: .4rem;
  transition: ease-in-out 1s;
}
.wrapQR .qrcode:hover{
  background-color: snow;
}

.Qrcode_show_container{
  background-color: rgb(255, 255, 255);
  position: absolute;
  width: 100%;
  height: 80%;
  translate: -50% -50%;
  top: 60%;
  left: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #007BFF;
}
.Qrcode_show_container .Qrcode_show{
  width: 8rem;
  border: 2px solid rgb(201, 202, 199);
  box-shadow: 2px 2px 2px rgba(174, 174, 174,.6);
  cursor: zoom-in;
}
.Qrcode_show_container hr{
  width: 90%;
  border: none;
  border-top: 1px dashed #007BFF; 
}

.download {
  width: 2.05rem;
  position: absolute;
  z-index: 2000;
  right: 15%;
  top: 25%;
  cursor: pointer;
  transition: all .2s;
  cursor:alias;
}

.Invalid {
  color: red;
  font-size: small;
}

.wrapDate {
  display: flex;
  justify-content: space-evenly;
}

.input_date{
  width: 6.5rem;
}

</style>
