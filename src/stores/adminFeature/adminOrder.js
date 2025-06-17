import { defineStore } from "pinia";
import axios from "axios";

export const useAdminOrder = defineStore("AdminOrderStore", {
  state: () => ({
     order_list: [],
     token: localStorage.getItem("token") || null,
     backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {
    fetchOrderList() {
        try {
          const res = axios.get(`${this.backendUrl}/api/admin/orders`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.order_list = res.data;
        }
        catch (e) {
          console.error("Error fetching order list:", e);
        }
    }
   
  
  },

  getters: {
    
  }, 

});
export default useAdminOrder;
