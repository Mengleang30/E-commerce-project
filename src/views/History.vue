<script setup>
import useOrder from "@/stores/order";
import { computed, onMounted, ref } from "vue";
import jsPDF from 'jspdf';
import useAuthentication from "@/stores/authentication";

const isLoading = ref(true); // Loading state
const payment = useOrder();
const Auth = useAuthentication();

const listPayment = computed(() => payment.payments);
const selectedPaymentId = ref(null);

const listDetailInvoice = computed(() => {
  return listPayment.value.find((item) => item.id === selectedPaymentId.value);
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
    selectedPaymentId.value = null; // Close if already open
  } else {
    selectedPaymentId.value = paymentId; // Open clicked one
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
      useCORS: true,
    },
  });
};

onMounted(async () => {
  try {
    isLoading.value = true; // Set loading to true
    await payment.fetchPayment(); // Fetch payments
  } catch (error) {
    console.error("Error fetching payments:", error);
  } finally {
    isLoading.value = false; // Reset loading
  }
});
</script>

<template>
  <div v-if="!Auth.isAuthenticated" class="login-box">
    <h3>Please Login First</h3>
    <RouterLink to="/login"><button>Login</button></RouterLink>
  </div>
  <div v-else class="historycontainer">
    <!-- Loading Spinner -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <h1 class="heading">History Orders</h1>

    <div class="no-history" v-if="!listPayment.length && !isLoading">
      <h3>No payment history yet</h3>
    </div>

    <div class="history-container" v-else-if="!isLoading">
      <template v-for="payment in listPayment" :key="payment.id">
        <div
          class="history-card"
          @click="!isLoading && toggleDetails(payment.id)"
          style="cursor: pointer"
          :class="{ 'selected-payment': selectedPaymentId == payment.id }"
        >
          <div class="history-header">
            <div class="avatar">🧾</div>
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
          <div class="invoice-container">
            <button class="close" @click="selectedPaymentId = null">Close</button>
            <div id="invoice">
              <div class="header">
                <img src="../assets/logo_bookstore.jpg" alt="Book Store Logo" />
                <h1 class="NameShop">Book Store Invoice</h1>
              </div>

              <h4>Invoice Details</h4>
              <hr />

              <div class="details" v-if="listDetailInvoice">
                <div class="inform">
                  <p><strong>Invoice No: </strong>{{ listDetailInvoice.id }}</p>
                  <p><strong>Date: </strong>{{ formatDate(listDetailInvoice.created_at) }}</p>
                  <p><strong>Customer Name: </strong>{{ listDetailInvoice.user.name }}</p>
                </div>

                <div class="right_details">
                  <div class="inform">
                    <p><strong>Payment Method: </strong>{{ listDetailInvoice.payment_method.toUpperCase() }}</p>
                    <p><strong>Transaction ID: </strong>{{ listDetailInvoice.transaction_id }}</p>
                    <p style="white-space: nowrap;"><strong>Email: </strong>{{ listDetailInvoice.user.email }}</p>
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
                    <th>Subtotal ($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(order_book, index) in listDetailInvoice.order.order_books" :key="order_book.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ order_book.book_id }}</td>
                    <td>{{ order_book.quantity }}</td>
                    <td>{{ order_book.price }}</td>
                    <td>{{ listDetailInvoice.order.coupon ? listDetailInvoice.order.coupon.discount : 0 }}</td>
                    <td>{{ order_book.sub_total }}</td>
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
                      alt="Phone Icon"
                    />
                    <i class="specific">+885-102973812,</i>
                    <i class="specific">+885-972973812 (24/24h)</i>
                  </div>
                  <div class="each_inform">
                    <img
                      src="https://img.icons8.com/?size=100&id=3AYCSzCO85Qw&format=png&color=000000"
                      alt="Email Icon"
                    />
                    <i class="specific">bookshopkh@gmail.com</i>
                  </div>
                  <div class="each_inform">
                    <img
                      src="https://img.icons8.com/?size=100&id=PZTTDl8ML4vy&format=png&color=000000"
                      alt="Location Icon"
                    />
                    <i>ITC, Phnom Penh, Cambodia</i>
                  </div>
                </div>
                <p>Thank you for your purchase!</p>
              </div>
            </div>

            <div class="invoice_download" @click="!isLoading && CreatePDF()">
              <div class="invoice_download_button" :class="{ disabled: isLoading }">
                <img
                  src="https://img.icons8.com/?size=100&id=zB23ceOpCgiv&format=png&color=000000"
                  alt="Download Icon"
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
  position: relative; /* For loading overlay */
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

.close {
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

.no-history {
  text-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f1f5f9;
  color: #718096;
  border-radius: 10px;
}

.inline-popup {
  margin: 1.5rem 0;
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

.invoice-container h4 {
  color: slateblue;
}

#invoice {
  width: 100%;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.invoice-container hr {
  border: 0.4px groove rgb(104, 184, 193);
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
  color: deepskyblue;
  text-shadow: 2px 2px 3px rgba(107, 107, 107, 0.2);
}

.details .inform {
  text-align: start;
  padding: 5px;
}

.details {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

table th,
table td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 10px;
}

table th {
  background-color: #bebebe;
}

table tr:hover {
  background-color: #ebebeb;
  transition: all 0.3s;
}

table tr:nth-child(even) {
  background-color: #ebebeb;
}

.total {
  text-align: right;
  font-weight: bold;
  font-size: 18px;
  color: #0519f4;
}

.footer .each_inform img {
  width: 1.6rem;
  height: 1.6rem;
  border: none;
}

.footer .each_inform {
  display: flex;
  align-items: center;
  font-size: small;
}

.bottom_invoice {
  text-align: start;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.invoice_download img {
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

.invoice_download .invoice_download_button {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  width: 25%;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
  transition: all 0.3s;
  padding: 5px;
}

.invoice_download .invoice_download_button:hover {
  background-color: #d5d5d5;
  color: rgb(0, 117, 213);
}

.invoice_download .invoice_download_button.disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #666;
}

@media (max-width: 560px) {
  #invoice {
    font-size: 8px;
  }

  .invoice_download_button {
    font-size: 10px;
  }

  .invoice_download_button img {
    width: 1rem;
    height: 1rem;
  }

  .invoice-container {
    padding: 0;
  }

  .invoice-container .NameShop {
    font-size: 18px;
  }

  .total {
    font-size: small;
  }
}

@media print {
  body {
    margin: 0;
    font-size: 14px;
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

.login-box {
  max-width: 400px;
  margin: 80px auto;
  padding: 30px;
  text-align: center;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.login-box h3 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.login-box button {
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.login-box button:hover {
  background: #1e40af;
}

/* Loading Spinner Styles */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e66a00;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>