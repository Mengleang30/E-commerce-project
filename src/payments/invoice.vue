<script setup>

import { useBookStore } from '@/stores';
import { useUserStore } from '@/stores/userBookStore';
import jsPDF from 'jspdf';

const userStore = useUserStore();
const bookDate = useBookStore();

const purchase = userStore.handleBuy();

const ListBookInvoice = userStore.loggedInUser.bought;



console.log(purchase.message)
console.log(userStore.loggedInUser.bought)
console.log(userStore.loggedInUser.bought.map((item)=>item.purchaseId))
console.log(userStore.loggedInUser.bought.map((item)=>item.bookId))
console.log(userStore.loggedInUser.bought.map((item)=>item.quantity))
// const boughtItems = userStore.boughtItems;
// console.log("Bought Items:", boughtItems);

const getBookTitle =(bookId)=>{
  const book = bookDate.getProductId(bookId)
  return book.title.substring(0,10) + "..." ;
}
const getBookPrice = (bookId) => {
  const book = bookDate.getProductId(bookId);
  return book.price.toFixed(2) ? book.price.toFixed(2) : 0;
};

const getBookDiscount = (bookId)=>{
  const book = bookDate.getProductId(bookId);
  // return price * (1 - book.discount/100);
  return book.discount;

}


const calculateTotal = (invoice) => {
  return invoice.reduce((total, item) => {
    const price = getBookPrice(item.bookId);
    const discount = getBookDiscount(item.bookId);
    const afterDiscout = price * (1 - discount/100)
    return (total + afterDiscout * item.quantity);
  }, 0);
};



const CreatePDF = ()=>{
  const content = document.getElementById("invoice");
  const doc = new jsPDF();
  doc.html(content,{
    callback :function(doc){
      doc.save("BookStoreInvoice.pdf")
    },
    x : 10,
    y : 10,
    width : 180,
    windowWidth : 650,
    
  })
  
  
} 

defineProps ({
  Payment : String,
  AccId : String, 
})

</script>

<template>
    <div v-if="ListBookInvoice" class="invoice-container" >
      <div id="invoice" >
        <div class="header">
      <img src="../assets/logo_bookstore.jpg" alt="">
      <h1 class="NameShop">Book Store Invoice</h1>
    </div>
    <h4>Invoice Details</h4>
    <hr>
    <div class="details">
      <div class="inform">
        <p><strong>Invoice No : </strong>#{{ ListBookInvoice[0].purchaseId }}</p>
        <p><strong>Date : </strong> {{ ListBookInvoice[0].purchaseDate }}</p>
        <p><strong>Customer Name : </strong> {{ userStore.loggedInUser.username }}</p>
      </div>
      <div class="right_details">
        <div class="inform">
          <p ><strong>Payment Method : </strong>{{ Payment }}</p>
          <p v-if="AccId===''"><strong>Account Number : </strong> QRCode Pay</p>
          <p v-else><strong>Account Number : </strong>{{ AccId }}</p>
          <p><strong>Email : </strong>{{ userStore.loggedInUser.email.substring(0,20) + "..."  }}</p>
        </div>
    </div>
    </div>
   
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Book Name</th>
          <th>Quantity</th>
          <th>Price ($)</th>
          <th>Discout (%)</th>
          <th>After Discout ($)</th>
          <th>Subtotal ($)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book,index in ListBookInvoice " :key="book.purchaseId">
          <td>{{ index+1 }}</td>
          <td>{{ getBookTitle(book.bookId) }}</td>
          <td >{{ book.quantity }}</td>
          <td>{{ getBookPrice(book.bookId)}}</td>
          <td>{{ getBookDiscount(book.bookId) }}</td>
          <td>{{ (getBookPrice(book.bookId) * (1 - getBookDiscount(book.bookId)/100)).toFixed(2) }}</td>
          <td>{{ (getBookPrice(book.bookId) * (1 - getBookDiscount(book.bookId)/100) * book.quantity).toFixed(2) }}</td>
        </tr>
       
      </tbody>
    </table>

    <p class="total">Total: $ {{ calculateTotal(ListBookInvoice).toFixed(2) }}</p>

   
    <div class="footer">
      <hr>

    <div class="bottom_invoice">

      <div class="each_inform">
        <img
            src="https://img.icons8.com/?size=100&id=ufkkYBXJSuPy&format=png&color=000000" alt=""
          />
            <i class="specific">+885-102973812,</i>
            <i class="specific">+885-972973812 (24/24h)</i>
          
      </div>
      <div class="each_inform">
        <img
                src="https://img.icons8.com/?size=100&id=3AYCSzCO85Qw&format=png&color=000000"
                alt=""
              />
              <i class="specific">bookshopkh@gmail.ocm</i>
      </div>
      <div class="each_inform">
        <img
             src="https://img.icons8.com/?size=100&id=PZTTDl8ML4vy&format=png&color=000000"
            alt=""
              />
            <i> ITC,Phnom Penh,Cambodia</i>
      </div>
      </div>
      <p>Thank you for your purchase!</p>
    </div>
      </div>
    <div class="invoice_download">
        <div @click="CreatePDF" class="invoice_download_button">
          <img src="https://img.icons8.com/?size=100&id=zB23ceOpCgiv&format=png&color=000000" alt="">
          <span>Download</span>
        </div>
        
      </div>
  </div>
  
    
</template>


<style scoped>  
.invoice-container {
      margin: 0 auto;
      background: #ffffff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 5px;
     
}
#invoice{
  width: 100%;
  padding: 10px;
  font-size: 14px;
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
.invoice-container hr{
  border: .4px groove rgb(104, 184, 193);
}

.right_details {
  text-align: right;
}

    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      gap: 10%;

    }
    .header img {
        width: 6rem;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      color: #d26969;
      color:deepskyblue;
      text-shadow: 2px 2px 3px rgba(107, 107, 107, 0.2);
    }

    .details .inform{
        text-align: start;
        padding: 5px;
    }

    .details {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between; 
    }

    .details h3 {
      margin-bottom: 10px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    table th, table td {
      border: 1px solid #ddd;
      text-align: left;
      padding: 10px;
    }

    table th {
      background-color: #bebebe;
    }
    table tr:hover{
        background-color: #ebebeb;
        transition: all .3s;
        
    }
    table tr:nth-child(even){
      background-color: #ebebeb;
    }

    .total {
      text-align: right;
      font-weight: bold;
      font-size: 18px;
      color: #333;
    }

    .footer .each_inform img{
      width: 1.6rem;
      height: 1.6rem;
      border: none;
      
    }
    .footer .each_inform {
      display: flex;
      align-items: center;
      font-size: small;
    }
    .bottom_invoice{
      text-align: start;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
      color: #666;
      
    }
     .invoice_download img{
      width: 1.6rem;
      height: 1.6rem;
      border: 1px solid rgb(115, 115, 254);
      border-radius: 50%;
      padding: 2px;
      box-shadow: none;
    }
     .invoice_download {
      font-size: 12px;
      justify-content: right;
      display: flex;
      padding: 4px;
      width: 100%;
    
    }
     .invoice_download .invoice_download_button{
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      width: 25%;
      justify-content: center;
      cursor: pointer;
      gap: 5px;
      transition: all .3s;
      padding: 5px;
    }
    .invoice_download .invoice_download_button:hover{
     background-color: #d5d5d5;
     color: rgb(0, 117, 213);
    }
    
@media screen and (max-width : 460px){
  #invoice{
    font-size: 8px;
  }

  .invoice_download_button{
    font-size: 10px;

  }
  .invoice_download_button img{
    width: 1rem;
    height: 1rem;
  }
  .invoice-container {
    padding: 0;
  }
  .invoice-container .NameShop{
    font-size: 18px;
  }
  
  


    }

</style>