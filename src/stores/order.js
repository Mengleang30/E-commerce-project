import { defineStore } from "pinia";
import axios from "axios";

export const useOrder = defineStore("OrderStore", {
  state: () => ({
     orders: [],
     token: localStorage.getItem("token") || null,
     backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {

    async fetchOrder(){
      try {
        const res = await axios.get(`${this.backendUrl}/api/customer/orders`
          ,{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
        this.orders=res.data.orders
         
      }
      catch(e){}
    },
     async cannelOrder(orderId){
      try {
        await axios.delete(`${this.backendUrl}/api/customer/orders/cancel/${orderId}`
          ,{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
        this.orders = []
        await this.fetchOrder();
         
         
      }
      catch(e){}
    },

    async paypal(orderId){
       try {
        const res = await axios.post(`${this.backendUrl}/api/pay`
          ,{
            order_id: orderId,
            payment_method: 'paypal',
          },{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
        const { approval_url } = res.data;
        // Redirect to PayPal approval URL
        window.location.href = approval_url;
        await this.fetchOrder();
        console.log("Pay")
         
         
      }
      catch(e){}
    }
  
  },

  getters: {
    
  }, 

});
export default useOrder;
