import { defineStore } from "pinia";
import axios from "axios";

export const usePromotion = defineStore("PromotionStore", {
  state: () => ({
    backendUrl: "http://localhost:8200",
    token: localStorage.getItem("token") || null,
  }),

  actions: {
   
   async applyCoupon (order_id, code){
    try{
      await axios.post(`${this.backendUrl}/api/customer/orders/apply_coupon/${order_id}`,
        {
         coupon_code : code
        },{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }

        })
      console.log("Applied")
    }
    catch(e){

    }



   }
  
  },

  getters: {
    
  }, 

});
export default usePromotion;
