import { defineStore } from "pinia";
import axios from "axios";
import api from "@/axios";

export const useAdminOrder = defineStore("AdminOrderStore", {
  state: () => ({
     order_list: [],
     token: localStorage.getItem("token") || null,
  }),

  actions: {
    async fetchOrderList() {
        try {
          const response = await api.get(`/api/admin/orders`);
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
