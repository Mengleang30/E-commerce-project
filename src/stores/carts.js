import api from "@/axios";
import { defineStore } from "pinia";


export const useCarts = defineStore("CartStore", {
  state: () => ({
     carts: [],
     token: localStorage.getItem("token") || null,
  }),

  actions: {
    async fetchCarts(){
       try {
        const res = await api.get(`/api/customer/carts`);
        this.carts= res.data;
        // console.log("carts ", this.carts) 

      }
      catch(e){
      //  if (e.response && e.response.status === 404) {
      //   // Optional: Initialize carts as empty or show a message
      //   this.carts = [];
      //   console.warn("No cart found for this user.");
      // } else {
      //   // Handle other errors (e.g., 500, 401)
      //   console.error("An error occurred while fetching carts:", e);
      // }
    }
      

    },

    async addCarts(bookId, quantities) {
        try {
        await api.post(`/api/customer/carts/add`,
           {
            book_id: bookId,
            quantity: quantities
           }
          );

        await this.fetchCarts();
        console.log("carts added") 

      }
      catch(e){}
    },

    async deleteCart(id){
      try {
        await api.delete(`/api/customer/carts/delete/${id}`
          );
        console.log("carts deleted") 

      }
      catch(e){}
    },
    async clearCart(){
      try {
        await api.delete(`/api/customer/carts/clear`);
        this.carts = [];
        await this.fetchCarts();

      }
      catch(e){}
    },
    async updateQuantity(id, quantities){
      try {
        await api.patch(`/api/customer/carts/update/${id}`
          ,{
            quantity:quantities

           });
        await this.fetchCarts();
        console.log("Updated")
      
      }
      catch(e){}

    },

    async checkout(){
       try {
        await api.post(`/api/customer/carts/checkout`
          ,{});
        await this.fetchCarts();
        this.carts=[];
        console.log("Checkout")
      
      }
      catch(e){}

    },
  },

  getters: {
    
  }, 

});
export default useCarts;
