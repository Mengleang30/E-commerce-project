import { defineStore } from "pinia";
import axios from "axios";
import api from "@/axios";

export const useAdminPayment = defineStore("AdminPaymentStore", {
  state: () => ({
     payment_list: [],
     token: localStorage.getItem("token") || null,
  }),

  actions: {
    async fetchOrderList() {
        try {
          const response = await api.get(`/api/admin/payments`);
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
