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
    }
  },

  getters: {
     
  }, 

});
export default useAdminPromotion;
