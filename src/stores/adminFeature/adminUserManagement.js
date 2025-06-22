import { defineStore } from "pinia";
import axios from "axios";
import api from "@/axios";


export const useUseManagement = defineStore("UserManagement", {
  state: () => ({
     users: [],
     detailUser: null,
     token: localStorage.getItem("token") || null,
     backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {
    async fetchUser() {
        try {
          const response = await api.get(`/api/admin/users_management`);
          this.users = response.data;
        //   console.log("Users fetched:", this.users);
        }
        catch (e) {
          console.error("Error fetching order list:", e);
        }
    }
    ,

    async fetchUserById(userId) {
      try {
        const response = await api.get(`/api/admin/users_management/${userId}`);
        this.detailUser = response.data;
        // console.log("User details fetched:", this.detailUser);
      } catch (e) {
        console.error("Error fetching user by ID:", e);
      }
    }
  },

  getters: {
    
  }, 

});
export default useUseManagement;
