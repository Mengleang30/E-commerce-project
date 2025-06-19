<script setup>
import useOrder from "@/stores/order";
import { computed, onMounted, ref } from "vue";
import jsPDF from 'jspdf';
import { Phone } from 'lucide-vue-next';

const isLoading = ref(true);
const payment = useOrder();

const listPayment = computed(() => payment.payments);
const selectedPaymentId = ref(null);

const listDetailInvoice = computed(() => {
  return listPayment.value.find((item) => {
    return item.id === selectedPaymentId.value;
  });
});



function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function toggleDetails(paymentId) {
  if (selectedPaymentId.value === paymentId) {
    selectedPaymentId.value = null; // close if already open
  } else {
    selectedPaymentId.value = paymentId; // open clicked one
  }
}



const CreatePDF = () => {
  const invoice = document.getElementById("invoice");
  invoice.classList.add("pdf-mode");

  const doc = new jsPDF("p", "mm", "a4");

  doc.html(invoice, {
    callback: function (doc) {
      doc.save("BookStoreInvoice.pdf");
      invoice.classList.remove("pdf-mode");
    },
    x: 10,
    y: 10,
    width: 180,
    windowWidth: 650,
    html2canvas: {
      // scale: 2.5,
      useCORS: true,
    },
  });
};


onMounted(() => {
  payment.fetchPayment();
  isLoading.value = false;
});

</script>

<template>
  <div class="historycontainer">
    <h1 class="heading">History Orders</h1> 
   
    <div class="no-history" v-if="!listPayment.length">
      <h3>No payment history yet</h3>
    </div>

    <div class="history-container" v-else>
      <template v-for="payment in listPayment" :key="payment.id" 
     
      >
        <div 
          class="history-card"
          @click="toggleDetails(payment.id)"
          style="cursor: pointer"
          :class="{ 'selected-payment': selectedPaymentId == payment.id }"
        >
          <div class="history-header">
          <div class="avatar">&#129534;</div>

            <div class="history-meta">
              <p class="history-title">
                Payment Method: <span>{{ payment.payment_method }}</span>
              </p>
              <p class="history-details">
                Order No: <span># {{ payment.order_id }}</span>
              </p>
              <p class="history-details">
                Date: <span>{{ formatDate(payment.created_at) }}</span>
              </p>
              <p class="history-details">
                Status: <span>{{ payment.status }}</span>
              </p>
              <p class="history-details">
                Amounts: <span>$ {{ payment.amount }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Inline popup detail below selected card -->
        <div
          v-if="selectedPaymentId === payment.id"
          class="inline-popup"
          @click.stop
        >
          <!-- <h3>Payment Details</h3>
          <p><strong>Payment Method:</strong> {{ payment.payment_method }}</p>
          <p><strong>Order ID:</strong> {{ payment.order_id }}</p>
          <p><strong>Date:</strong> {{ formatDate(payment.created_at) }}</p>
          <p><strong>Status:</strong> {{ payment.status }}</p>
          <p><strong>Amount:</strong> $ {{ payment.amount }}</p>
          <p><strong>Transaction ID:</strong> {{ payment.transaction_id }}</p>
          <button @click="selectedPaymentId = null">Close</button> -->
       
            <div class="invoice-container" >
              <button class="close" @click="selectedPaymentId = null">Close</button> 
              <div id="invoice">
                <div class="header">
                  <img src="../assets/logo_bookstore.jpg" alt="" />
                  <h1 class="NameShop">Book Store Invoice</h1>
                </div>

                <h4>Invoice Details</h4>
                <hr />

                <div class="details" v-if="listDetailInvoice">
                 
                  <div class="inform">
                    <p><strong>Invoice No : </strong>{{ listDetailInvoice.id }}</p>
                    <p><strong>Date : </strong> {{ listDetailInvoice.created_at }}</p>
                    <p><strong>Customer Name : </strong> {{ listDetailInvoice.user.name }}</p>
                  </div>

                  <div class="right_details">
                    <div class="inform">
                      <p><strong>Payment Method : </strong>{{ listDetailInvoice.payment_method.toUpperCase() }}</p>
                      <p>
                        <strong>Transaction ID : </strong> {{ listDetailInvoice.transaction_id }}
                      </p>
                      <p style="white-space: nowrap;"><strong>Email : </strong> {{ listDetailInvoice.user.email }}</p>
                    </div>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Book ID</th>
                      <th>Quantity</th>
                      <th>Price ($)</th>
                      <th>Discount (%)</th>
                      <!-- <th>After Discount ($)</th> -->
                      <th>Subtotal ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order_book in listDetailInvoice.order.order_books" :key="order_book.id"> 
                      <td>1</td>
                      <td>{{ order_book.book_id }}</td>
                      <td>{{ order_book.quantity }}</td>
                      <td>{{ order_book.price }}</td>
                      <td v-if="!listDetailInvoice.order.coupon">{{ 0 }}</td>
                      <td v-if="listDetailInvoice.order.coupon">{{ listDetailInvoice.order.coupon.discount }}</td>
                      <!-- <td >13.50</td> -->
                      <td >{{ order_book.sub_total }}</td>
                     
                    </tr>
                    
                  </tbody>
                </table>

                 <p class="total">Total: $ {{ listDetailInvoice.order.total_price }}</p>
                 <p class="total" v-if="listDetailInvoice.order.coupon">Discount: % {{ listDetailInvoice.order.coupon.discount }}</p>
                  <p class="total" v-if="listDetailInvoice.order.coupon">After Discount: $ {{ listDetailInvoice.order.final_price }}</p>
                <div class="footer">
                  <hr />
                  <div class="bottom_invoice">
                    <div class="each_inform">
                      <img
                        src="https://img.icons8.com/?size=100&id=ufkkYBXJSuPy&format=png&color=000000"
                        alt=""
                      />
                      <i class="specific">+885-102973812,</i>
                      <i class="specific">+885-972973812 (24/24h)</i>
                    </div>

                    <div class="each_inform">
                      <img
                        src="https://img.icons8.com/?size=100&id=3AYCSzCO85Qw&format=png&color=000000"
                        alt=""
                      />
                      <i class="specific">bookshopkh@gmail.com</i>
                    </div>

                    <div class="each_inform">
                      <img
                        src="https://img.icons8.com/?size=100&id=PZTTDl8ML4vy&format=png&color=000000"
                        alt=""
                      />
                      <i> ITC, Phnom Penh, Cambodia</i>
                    </div>
                  </div>

                  <p>Thank you for your purchase!</p>
                </div>
              </div>

              <div class="invoice_download" @click="CreatePDF">
                <div class="invoice_download_button">
                  <img
                    src="https://img.icons8.com/?size=100&id=zB23ceOpCgiv&format=png&color=000000"
                    alt=""
                  />
                  <span>Download</span>
                </div>
              </div>
            </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
.historycontainer {
  padding: 1rem;
  background-color: #f9fafb;
  position: relative;
}

.selected-payment {
  border: 2px solid rgb(0, 17, 208);
}

.heading {
  text-align: center;
  margin: 2rem 0;
  font-size: 2rem;
  font-weight: bold;
  color: #2d2d2d;
  font-family: "Courier New", Courier, monospace;
}

.history-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 10px;
}
.close{
  float: right;
}
.history-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  margin-bottom: 2rem;
  transition: box-shadow 0.3s ease;
}

.history-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.history-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 60px;
  height: 60px;
  background-color: #e2e8f0;
  border-radius: 50%;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #718096;
  margin-right: 1rem;
}

.history-meta {
  flex-grow: 1;
}

.history-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1a202c;
}
@media print {
  body {
    margin: 0;
    font-size: 14px;
  }
}


.history-details {
  font-size: 0.875rem;
  color: #4a5568;
  margin-top: 4px;
}

.history-details span,
.history-title span {
  font-weight: normal;
  color: #2d3748;
}

.card-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.name {
  background-color: #edf2f7;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #2d3748;
}

.no-history {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f1f5f9;
  color: #718096;
  border-radius: 10px;
}

.detail-popup {
  max-width: 600px;
  margin: 2rem auto;
/*   
  position: absolute;
  top: 50%;
  left: 50; */
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.detail-popup button {
  margin-top: 1rem;
  background: #2d3748;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.detail-popup button:hover {
  background: #4a5568;
}
.inline-popup {
  margin: 1.5rem 0rem;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background: #fefefe;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  user-select: text;
}

.inline-popup button {
  margin-top: 0.75rem;
  background: #2d3748;
  color: white;
  border: none;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.inline-popup button:hover {
  background: #4a5568;
}


.invoice-container {
      border-radius: 8px;
      padding: 5px;
      text-align: center;
}
.invoice-container h4{
  color: slateblue;
}
#invoice{
  width: 100%;
  /* padding: 5px; */
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
      color: #0519f4;
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
    
@media (max-width : 560px){
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
  .total{
    font-size: small;
  }
  
  

    }


.pdf-mode {
  font-family: Arial, sans-serif !important;
  font-size: 14px;
  line-height: 1.6;
  color: #000;
  background-color: #fff;
  padding: 0;
  margin: 0;
}

.pdf-mode *,
.pdf-mode *::before,
.pdf-mode *::after {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

.pdf-mode .header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.pdf-mode .header img {
  width: 80px;
  height: auto;
}

.pdf-mode h1.NameShop {
  font-size: 20px;
  color: #00bfff;
  font-weight: bold;
}

.pdf-mode .details,
.pdf-mode .footer {
  margin-top: 10px;
}

.pdf-mode table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.pdf-mode th,
.pdf-mode td {
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 12px;
  text-align: center;
}

.pdf-mode .total {
  text-align: right;
  font-weight: bold;
  margin-top: 5px;
  font-size: 12px;
}

.pdf-mode .bottom_invoice {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 12px;
}

</style>
