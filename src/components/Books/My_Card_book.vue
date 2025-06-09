<script setup>
import { computed, devtools, onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userBookStore';
import { useBookStore } from '@/stores';
import payments from '@/payments/payments.vue';
import useCarts from '@/stores/carts';

const userStore = useUserStore();
const DataBooks = useBookStore();

const pay = ref(false);

const handleToPay = () => {
  pay.value = true;
  window.scrollTo(0,0);
}
const increaseQuantity = (id) => {
  userStore.increaseQuantity(id)
}
const decreaseQuantity = (id) => {
  userStore.decreaseQuantity(id)
}

const handleCloseBtn = () => {
  pay.value = false;-
  userStore.clearInvoive();
 

}

const CartBooks = computed(() => {
  if (!userStore.loggedInUser) {
    return [];
  }

  return userStore.loggedInUser.cart.map((cartItem) => {
    const book = DataBooks.BookData.find((b) => b.id === cartItem.bookId);
    if (book) {
      return {
        ...book,
        qualities: cartItem.quantity
      };

    }
    return null;
  })



})

const totalPrice = computed(() => {
  return CartBooks.value.reduce((sum, Carted) => {
    return sum + Carted.qualities * Carted.price * (1 - Carted.discount / 100);
  }, 0)
})
const SubQuantity = computed(() => {
  return CartBooks.value.reduce((sum, Carted) => {
    return sum + Carted.qualities;
  }, 0)
})
const handleRemove = (id) => {
  userStore.removeCarted(id)("decrement");
}

const updateQuantity = (id, newQuantity) => {
  userStore.updateCartQuantity(id, newQuantity);
}

const cartStore = useCarts();

const listCarts = computed(()=>{
  return cartStore.carts;
})

const deleteCart =async (id) => {
 await cartStore.deleteCart(id);
 await cartStore.fetchCarts();
}

const clearCart =async () => {
 await cartStore.clearCart();
//  await cartStore.fetchCarts();
}

onMounted(()=>{
  cartStore.fetchCarts();
})




</script>

<template scope>
  <div>
<hr>
    <div class="Card">
      <!-- {{ listCarts.cart_books }} -->
      <!-- <div v-if="pay" class="modal-overlay" >
            <div class="paymentContainer" @click.stop>
              <payments :total="totalPrice" :click_close="handleCloseBtn"/>
            </div>
        </div> -->
        <div class="book-list">
     
          <div v-if="listCarts.cart_books && listCarts.cart_books.length > 0">
            <div v-for="Carted in listCarts.cart_books" :key="Carted.book.id">
              <hr>
              <div class="each_cart">
                  <!-- {{ Carted }} -->
                <img v-if="Carted.book.path_image" :src="`http://localhost:8200/storage/${Carted.book.path_image}`" alt="CartBooks" class="book-image">
                <img v-else :src="Carted.book.url_image"  alt="CartBooks" class="book-image">
                <div class="book-content">

                  <h3 class="book-title">{{ Carted.book.title }}</h3>
                  <p class="book-quantity">Quantity: {{ Carted.quantity }} </p>
                  <p class="book-price">Price: $ {{ (Carted.book.price * (1 - Carted.book.discount / 100)).toFixed(2) }}</p>


                </div>
                  <div>
                    <div class="quantity-container">

                      <div class="quantity-controls">
                        <button @click="decreaseQuantity(Carted.id)">-</button>
                        <input v-model="Carted.quantity" @input="updateQuantity(Carted.id, Carted.quantity)"
                          type="number" id="quantity" min="1" max="99" value="1" />
                        <button @click="increaseQuantity(Carted.id)">+</button>
                      </div>

                      <div class="remove-button">
                        <button @click="deleteCart(Carted.id)">Remove</button>
                      </div>
                    </div>
                  </div>


                
              </div>
              <div class="sub_totals">
                SubTotal: $ {{ (Carted.quality * Carted.price * (1 - Carted.discount / 100)).toFixed(2) }}
              </div>

            </div>
            <button class="clear_btn">Clear Cart</button>
          </div>

          <div v-else class="No_cart">
            <div class="empty">
            <h3>Empty Book Yet</h3>
          </div>
</div>
        </div>

     
    </div>

  </div>
  
</template>


<style scoped>
.clear_btn{
  background-color: #f70707;
  color: rgb(250, 245, 245);
  border: none;
  border-radius: 10px;
  align-items: center;
  padding: 5px 20px;
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}
hr{
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}
.Card {
  max-width: 1500px;
  margin: 20px auto;
  padding: 20px;
  background: #f3eded;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(245, 244, 244, 0.1);
  font-family: Arial, sans-serif;
}


.book-list {
  max-height: 900px;
  overflow-y: auto;
  padding-right: 15px;
  scrollbar-width: 40px;
  scrollbar-color: #636161 #dee2e1;
  scroll-behavior: smooth;
}
hr{
  width: 99%;
}

.empty{
  font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin-top: 30px;
    color: #11101065;
}

.book-list::-webkit-scrollbar {
  width: 20px;
}

.book-list::-webkit-scrollbar-thumb {
  background: #202020;
  border-radius: 50px;
}

.book-list::-webkit-scrollbar-thumb:hover {
  background: #1b1a1a;
}

.h2 {
  text-align: center;
  margin-bottom: 30px;
}

.book-image {
  height: 100px;
  width: 4rem;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
}

.book-content {
  flex: 1;
}

.book-content div {
  margin-bottom: 8px;
}

.book-title {

  margin: 0;
  font-size: 15px;

}

.book-quantity {
  color: #333;
  ;

  font-size: 13px;
  margin: 20px 0;
}

.book-price {
  color: #333;
  font-size: 13px;
  margin: 10px 0;
}

.each_cart {

  display: flex;
  justify-content: space-between;
  padding: 20px;
  /* Inside card spacing */
  margin-bottom: 20px;
  /* Spacing between cards */
  border: 1px solid #d3cdcd;
  border-radius: 10px;
  background: #f3f2f2e1;
  box-shadow: 0 2px 4px rgb(167, 163, 163);


}

.each_cart button {
  background: rgb(248, 247, 247);
  border: rgb(243, 233, 233);
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  border-radius: 100%;
  transition: background-color 0.3s ease;

}

.each_cart input {
  width: 4rem;
  height: 2rem;
}

.paybtn {
  background-color: antiquewhite;
  display: flex;
  ;
  gap: 1rem;
  align-items: center;


}

.Topay button {
  background-color: #0f0c0cc4;
  color: white;
  width: 8rem;
  
  height: 2rem;;
  border: none;
  border-radius: .4rem;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;
}

.book-content {
  
  margin-right: 10px;
  text-align: top;
  
}

.paybtn button {
  width: 8rem;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.paymentContainer{
  background-color: #1b1a1a;
  padding: 5px;
  top: 0;
  position: absolute;
}

.coupon {
  display: flex;
  padding: 5px;
  gap: 10px;
  align-items: center;
}

.coupon input {
  border: none;
  padding-left: 10px;
  border-radius: .4rem;
  width: 40%;
  height: 2rem;
}

.coupon button {
  background-color: rgb(17, 17, 18);
  color: white;
  width: 5rem;
  border: none;
  border-radius: .4rem;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;
}

.coupon-input {
  width: calc(100% - 90px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.apply-btn {
  width: 80px;
  padding: 10px;
  background-color: #333333fb;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cart_Totals {
  max-width: 1500px;
  margin: 20px auto;
  padding: 20px;
  gap: 10px;
  background: #eee8e8;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(248, 243, 243, 0.1);
  font-family: Arial, sans-serif;
}

.Totals {
  margin: 20px;
  
  overflow-y: auto;
  padding-left: 15px;
  scrollbar-width: 40px;
  scrollbar-color: #636161 #dee2e1;
}

.quantity-container {
  display: flex;
  align-items: center;
  
  width: 40%;
  gap: 10px;
}

.quantity-controls {
  display: flex;
  align-items: end;
  gap: 10px;
  border-radius: 20px;
  padding: 45px 10px;

 
}

.quantity-controls button {
  background-color: #d6d2d2f6;
  border: none;
  color: rgb(24, 22, 22);
  font-size: 16px;
  /* Slightly larger size */
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.8rem;
  height: 1.8rem;

}

.quantity-controls input {
  width: 40px;
  text-align: center;
  border: none;
  font-size: 15px;
}
.quantity-controls button:hover{
  background-color: rgba(36, 34, 34, 0.493);
  border-radius: 50%;
}
.remove-button:hover{
  background-color: rgb(24, 23, 23);
  border-radius: 50%;
}
.remove-button button {
  background-color: #f70707;
  color: rgb(250, 245, 245);
  border: none;
  float: inline-end;
  border-radius: 10px;
  align-items: center;
  padding: 5px 20px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}
.sub_totals {
  padding: 10px;
  margin: 10px;
  font-size: 12px;
  color: #131212b4;
  
  
}


.end {
  padding: 15px;
  margin: 2px;
  line-height: 1.8;
}
@media(max-width: 768px) {


  .quantity-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  }

  .quantity-container.remove-button {
    margin-left: 0;
    margin-top: 10px;
  }
}
.No_cart {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 20px;
  color: #141414b2;
  font-weight: bold;
}
</style>
