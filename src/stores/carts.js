import { defineStore } from "pinia";
import axios from "axios";

export const useCarts = defineStore("CartStore", {
  state: () => ({
     carts: [],
     token: localStorage.getItem("token") || null,
     backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {
    async fetchCarts(){
       try {
        const res = await axios.get(`${this.backendUrl}/api/customer/carts`,{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
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
        await axios.post(`${this.backendUrl}/api/customer/carts/add`,
           {
            book_id: bookId,
            quantity: quantities
           }
          ,{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });

        await this.fetchCarts();
        console.log("carts added") 

      }
      catch(e){}
    },

    async deleteCart(id){
      try {
        await axios.delete(`${this.backendUrl}/api/customer/carts/delete/${id}`
          ,{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
        console.log("carts deleted") 

      }
      catch(e){}
    },
    async clearCart(){
      try {
        await axios.delete(`${this.backendUrl}/api/customer/carts/clear`
          ,{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
        this.carts = [];
        await this.fetchCarts();

      }
      catch(e){}
    },
    async updateQuantity(id, quantities){
      try {
        await axios.patch(`${this.backendUrl}/api/customer/carts/update/${id}`
          ,{
            quantity:quantities

           } ,{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
        await this.fetchCarts();
        console.log("Updated")
      
      }
      catch(e){}

    },

    async checkout(){
       try {
        await axios.post(`${this.backendUrl}/api/customer/carts/checkout`
          ,{},{
          withCredentials: true,
          headers:{
            Authorization: `Bearer ${this.token}`,
          }
        });
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
