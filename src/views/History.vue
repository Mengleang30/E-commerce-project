<script setup>
import { useBookStore } from '@/stores';
import { useUserStore } from '@/stores/userBookStore';
import { computed, ref } from 'vue';
import his_invoice from '@/payments/his_invoice.vue';

const userStore = useUserStore();
const bookDate = useBookStore();

const ShowInvoice = ref(false)

const hanldeShowInvoice = (()=>{
  ShowInvoice.value = false;
})

const handleAvatarClick = (purchase) => {
  console.log("Avatar clicked:", purchase); 
  selectedPurchase.value = purchase; 
  ShowInvoice.value = !ShowInvoice.value
};


const selectedPurchase = ref(null);

const ListBookHistory = computed(() => {
  if (!userStore.loggedInUser) {
    return [];
  }
  return userStore.loggedInUser.history || [];
});

const getBookTitle = (bookId) => {
  const book = bookDate.getProductId(bookId);
  return book.title.substring(0, 30) + (book.title.length > 10 ? '...' : ',') || 'No Title';
};


</script>

<template>
  <div class="historycontainer" >
    <div v-if="ListBookHistory.length > 0" >
      <h1 class="h2">History</h1>
      <div class="history-container">
        <hr />
        <div
          class="history-card"
          v-for="(book, index) in ListBookHistory"
          :key="book.id || index"
        >
          <div  >
            <div class="history-header" @click="handleAvatarClick(book)">
              <div class="avatar">&#128100;</div>
              <div>
                <div class="history-title">
                  <p><strong>Payment Method: </strong></p>
                </div>
                <p class="history-details">Invoice No: #{{ book.item[0].purchaseId }}</p>
                <p class="history-details">Date: {{ book.item[0].purchaseDate }}</p>
                <p class="history-details">Customer Name: {{ userStore.loggedInUser.username }}</p>
              </div>
            </div>
          </div>
          <div class="card-content">
            <span
              class="name"
              v-for="(invoice, index) in book.item"
              :key="invoice.bookId || index">
              <p>{{ getBookTitle(invoice.bookId) }}</p>
            </span>
          </div>
        </div>
      </div>
    </div>

    
   
    <his_invoice v-if="ShowInvoice"
    :purchase="selectedPurchase" 
    :closeBtn="hanldeShowInvoice" />
   
  </div>
</template>



<style scoped>
.historycontainer{
  position: relative;
}
   .h2 {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;
  color: #333;
  font-family: 'Courier New', Courier, monospace;
}
   .history-container {
  max-width: 1500px;
  margin: 20px auto;
  padding: 20px;
  background: #f3eded9c;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(245, 244, 244, 0.1);
  font-family: Arial, sans-serif;
}

  .history-card{
    
    max-width: 90%;
    height: 50% 50%;
    margin: 20px auto;
    padding: 20px;
    background: #f0ecec;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(245, 244, 244, 0.1);
    font-family: Arial, sans-serif;
}
.history-card::-webkit-scrollbar {
  width: 20px;
}

.history-card::-webkit-scrollbar-thumb {
  background: #202020;
  border-radius: 50px;
}

.history-card::-webkit-scrollbar-thumb:hover {
  background: #1b1a1a;
}

       .history-header {
    display: flex;
    overflow-y: auto;
    padding-right: 15px;
    cursor: pointer;
    
    
  }
           
        .history-header {
           display: flex;
            align-items: center;
            margin-bottom: 20px;
        }


        .avatar {
            
            width: 50px;
            height: 50px;
            background-color: #e0e0e0;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: #9e9e9e;
            margin-right: 15px;
        }


        .history-title {
            
            font-size: 18px;
            font-weight: bold;
            color: #333;
            margin: 0;
        }


        .history-details {
            font-size: 14px;
            color: #777;
            margin: 5px 0;
        }
        .history-content {
            font-size: 16px;
            color: #c4b8b8;
            line-height: 1.5;
        }
        .card-content {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        .name {
            color: #272323dc;
            margin-right: 10px;
            margin-bottom: 10px;
        }
      

        
        
</style>