import { defineStore } from "pinia";
import axios from "axios";

export const useAdminOrder = defineStore("AdminOrderStore", {
  state: () => ({
     order_list: [],
     token: localStorage.getItem("token") || null,
     backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {
    async fetchOrderList() {
        try {
          const response = await axios.get(`${this.backendUrl}/api/admin/orders`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.order_list = response.data.orders;
        }
        catch (e) {
          console.error("Error fetching order list:", e);
        }
    }
  },

  getters: {
     countOrders: (state) => {
        return state.order_list.length;
     },
  }, 

});
export default useAdminOrder;
