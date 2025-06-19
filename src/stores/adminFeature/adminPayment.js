import { defineStore } from "pinia";
import axios from "axios";

export const useAdminPayment = defineStore("AdminPaymentStore", {
  state: () => ({
     payment_list: [],
     token: localStorage.getItem("token") || null,
     backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {
    async fetchOrderList() {
        try {
          const response = await axios.get(`${this.backendUrl}/api/admin/payments`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.payment_list = response.data;
        }
        catch (e) {
          console.error("Error fetching order list:", e);
        }
    }
  },

  getters: {
    //  countOrders: (state) => {
    //     return state.order_list.length;
    //  },
  }, 

});
export default useAdminPayment;;
