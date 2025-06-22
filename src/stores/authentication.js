import { defineStore } from "pinia";
import axios from "axios";
import api from "@/axios";


export const useAuthentication = defineStore("AuthStore", {
  state: () => ({
    user: null,
    loggedInUser: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    logout() {
      this.user = [];
      window.location.reload();
      localStorage.removeItem("token");
      this.loggedInUser = {};
      // clear local storage 
      this.token = null;
      axios.defaults.headers.common["Authorization"] = "";
      console.log("User logged out successfully.");
    },

    async uploadPicture(picture) {
      const formData = new FormData();
      formData.append("picture", picture); // picture is File

      try {
        await api.post(
          `/api/customer/upload_picture`,
          formData,
        );
        console.log("Profile picture uploaded successfully");
      } catch (e) {
        console.error("Upload failed:", e.response?.data || e.message);
      }
    },
    async fetchLoggedUser() {
      try {
        const response = await api.get(`/api/logged_user`
          );
        this.loggedInUser = response.data;
        // console.log("Fetched user:", this.loggedInUser);
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error.response?.data || error.message
        );
        this.loggedInUser = {};
      }
    },
    async SignUp(name, email, password, password_confirmation, phone) {
      try {
        const response = await api.post(`/api/register`, {
          name,
          email,
          password,
          password_confirmation,
          phone,
        });
        // console.log("User registered successfully:", response.data);
        return {
          success: true,
          message: response.data.message,
        };
      } catch (e) {
        console.error("Registration error:", e.response?.data || e.message);
        return {
          success: false,
          message:
            e.response?.data?.message ||
            "Registration failed. Please try again.",
        };
      }
    },

    async login(email, password) {
      try {
        await api.get(`/sanctum/csrf-cookie`);
        console.log("CSRF cookie fetched");
        const res = await api.post(`/api/login`, {
          email,
          password,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        const role = res.data.role;
        this.token = token;
        console.log("Login response:", res.data);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        this.user = {
          email,
          role,
          token,
        };
      
        // console.log("User logged in:", this.user);
        if (role === "admin") {
          
        }
        await this.fetchLoggedUser();
        return {
          success: true,
          message: `Welcome back, ${email}!`,
          role: res.data.role
        };
      } catch (error) {
        if (error.response) {
          // Server responded with a status outside 2xx
          console.error(
            "Response error:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          // Request made but no response received
          console.error("No response received:", error.request);
        } else {
          // Something else triggered error
          console.error("Error setting up request:", error.message);
        }
        return {
          success: false,
          message: "Login failed. Please check your credentials.",
        };
      }
    },

    async googleLogin(tokenFromCallback) {
      try {
        localStorage.setItem("token", tokenFromCallback);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${tokenFromCallback}`;
        this.token = tokenFromCallback;
        await this.fetchLoggedUser();
        this.user = {
          email: this.loggedInUser?.email,
          role: this.loggedInUser?.role,
          token: tokenFromCallback,
        };
        
        return {
          success: true,
          message: `Welcome back, ${this.loggedInUser.name || this.loggedInUser.email}!`,
        };
      } catch (error) {
        console.error("Google login failed:", error);
        return {
          success: false,
          message: "Google login failed. Please try again.",
        };
      }
    },

    async sendCode(email) {
      try {
        const response = await api.post(
          `/api/password/forgot`,
          {
            email,
          }
        );
        return {
          success: true,
          message: response.data.message,
        };
      } catch (e) {
        console.error(
          "Send Code error:",
          e.response?.data.message || e.message
        );
        return {
          success: false,
          message:
            e.response?.data?.message ||
            "Registration failed. Please try again.",
        };
      }
    },
    async resetPassword(email, code, new_password, new_password_confirmation) {
      try {
        const response = await api.post(
          `/api/password/reset`,
          {
            email,
            code,
            new_password,
            new_password_confirmation,
          }
        );
        return {
          success: true,
          message: response.data.message,
        };
      } catch (e) {
        console.error("Code error:", e.response?.data.message || e.message);
        return {
          success: false,
          message:
            e.response?.data?.message || "Reset failed. Please try again.",
        };
      }
    },

    async updateInformation (name, phone, description, address){
      try{
         await api.patch(`/api/customer/update_inform`,{
          name, phone, description, address
         });

      }
      catch(e){
          console.log(e)
      }
     
      
    }
  },

  getters: {
    isAuthenticated: (state) => {
      return !!state.token;
    },

    getUserRole: (state) => {
      return state.user ? state.user.role : {};
    },
    isAdmin :(state)=>state.loggedInUser?.role === "admin",
    isCustomer: (state) => {
      return state.loggedInUser?.role === "customer";
    },
  },
});
export default useAuthentication;
