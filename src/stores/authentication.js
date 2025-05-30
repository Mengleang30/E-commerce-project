import { defineStore } from "pinia";
import axios from "axios";
import SignUp from "@/components/Users/SignUp.vue";

export const useAuthentication = defineStore("AuthStore", {
  state: () => ({
    user: null,
    loggedInUser: null,
    backendUrl: "http://localhost:8200",
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(email, password) {
      try {
        await axios.get(`${this.backendUrl}/sanctum/csrf-cookie`, {
          withCredentials: true,
        });
        console.log("CSRF cookie fetched");
        const res = await axios.post(`${this.backendUrl}/api/login`, {
          email,
          password,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        const role = res.data.role;
        this.token= token
        console.log("Login response:", res.data);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        this.user = {
          email,
          role,
          token,
        };
        
        await this.fetchLoggedUser();

        return {
          success: true,
          message: `Welcome back, ${email}!`,
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

    logout() {
      this.user = null;
      localStorage.removeItem("token");
      this.loggedInUser=null;
      this.token= null
      axios.defaults.headers.common["Authorization"] = "";
      console.log("User logged out successfully.");
    },

    async fetchLoggedUser() {
      try {
        const token = this.token;
        const response = await axios.get(`${this.backendUrl}/api/logged_user`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.loggedInUser = response.data;
        console.log("Fetched user:", this.loggedInUser);
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error.response?.data || error.message
        );
        this.loggedInUser = null;
      }
    },
    async SignUp(name ,email, password, password_confirmation, phone) {
        try {
            const response = await axios.post(`${this.backendUrl}/api/register`,{
                name, email, password, password_confirmation, phone
            })
             console.log("User registered successfully:", response.data);
            return {
                success : true,
                message: response.data.message
            }
        }
        catch (e){
           console.error("Registration error:", e.response?.data || e.message);
           return {
                success: false,
                message:
                    e.response?.data?.message ||
                    "Registration failed. Please try again.",
                };
                    }
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user,

    getUserRole: (state) => {
      return state.user ? state.user.role : null;
    },
  },
});
export default useAuthentication;
