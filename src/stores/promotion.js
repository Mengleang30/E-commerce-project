import { defineStore } from "pinia";

import api from "@/axios";

export const usePromotion = defineStore("PromotionStore", {
  state: () => ({
  
    token: localStorage.getItem("token") || null,
  }),

  actions: {
   
   async applyCoupon (order_id, code){
    try{
      const res = await api.post(`/api/customer/orders/apply_coupon/${order_id}`,
        {
         coupon_code : code
        })
      console.log("Applied")
      return {
        success: true,
        message: res.data.message || "Coupon applied successfully!",
      };
    }
    catch(e){
          let message = "Something went wrong while applying the coupon.";

        if (e.response && e.response.data) {
          message = e.response.data.message || e.response.data.error || message;
        } else if (e.message) {
          message = e.message;
        }
      return {
        success: false,
        message
      };

    }



   }
  
  },

  getters: {
    
  }, 

});
export default usePromotion;
