import { defineStore } from "pinia";
import axios from "axios";

export const useAdminPromotion = defineStore("AdminPromotionStore", {
  state: () => ({
     coupons: [],
     token: localStorage.getItem("token") || null,
     backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {
    async fetchCoupons() {
        try {
          const response = await axios.get(`${this.backendUrl}/api/admin/coupons`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.coupons = response.data.coupons;
        //   console.log("Coupons fetched:", this.coupons);
        }
        catch (e) {
          console.error("Error coupons:", e);
        }
    },

    async createNewCoupon(Code,Discount,startDate,endDate,usageLimit) {
        try {
          const newCoupon = {
            code: Code,
            discount: Discount,
            start_date: startDate,
            end_date: endDate,
            usage_limit: usageLimit,
            is_active: true
          }
          await axios.post(`${this.backendUrl}/api/admin/coupons/add`,
             newCoupon
            , {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          await this.fetchCoupons();
          // this.coupons.push(response.data);
        //   console.log("Coupons fetched:", this.coupons);
        }
        catch (e) {
          console.error("Error coupons:", e);
        }
    },
     async actionCoupon(coupon_id, Is_active) {
        try {
         
          await axios.patch(`${this.backendUrl}/api/admin/coupons/action/${coupon_id}`,
            {is_active: Is_active}, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          await this.fetchCoupons();
          // this.coupons.push(response.data);
        //   console.log("Coupons fetched:", this.coupons);
        }
        catch (e) {
          console.error("Error coupons:", e);
        }
    }
  },

  getters: {
     
  }, 

});
export default useAdminPromotion;
