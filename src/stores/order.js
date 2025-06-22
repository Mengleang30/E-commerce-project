import api from "@/axios";
import { defineStore } from "pinia";


export const useOrder = defineStore("OrderStore", {
  state: () => ({
     orders: [],
     payments: [],
     token: localStorage.getItem("token") || null,
  }),

  actions: {

    async fetchOrder(){
      try {
        const res = await api.get(`/api/customer/orders`);
        this.orders=res.data.orders
        // console.log(this.orders)
        return success = true
        
         
      }
      catch(e){}
    },
     async cannelOrder(orderId){
      try {
        await api.delete(`/api/customer/orders/cancel/${orderId}`);
        this.orders = []
        await this.fetchOrder();
         
         
      }
      catch(e){}
    },

    async paypal(orderId){
       try {
        const res = await api.post(`/api/pay`
          ,{
            order_id: orderId,
            payment_method: 'paypal',
          });
        const { approval_url } = res.data;
        // Redirect to PayPal approval URL
        window.location.href = approval_url;
        await this.fetchOrder();
        console.log("Pay")
         
         
      }
      catch(e){}
    },

   async fetchPayment(){
       try {
        const res = await api.get(`/api/customer/payments`);
        this.payments = res.data;
         
      }
      catch(e){
        console.error(e);
      }
    },
  
  },

  getters: {
    
  }, 

});
export default useOrder;
