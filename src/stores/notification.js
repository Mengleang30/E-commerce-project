import { defineStore } from "pinia";
import axios from "axios";


export const useNotification = defineStore("NotificationStore", {
  state: () => ({
    notifications: [],
    token: localStorage.getItem("token") || null,
  }),
  actions: {

    async fetchNotifications() {
        if(!this.token) {
          return;
        }
        try {
        const res =  await axios.get("https://projectip2-book-store-api.up.railway.app/api/customer/notifications", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.notifications = res.data.notifications ?? [];
        // console.log("Notifications from backend:", this.notifications);
        }
        catch(e){
            // console.log("Error fetching notifications:", e);
            this.notifications = []; 
        }
    },

    async markNotificationAsRead() {
      try {
        const res = await axios.patch(
          `https://projectip2-book-store-api.up.railway.app/api/customer/notifications/mark_all_as_read`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // console.log("Notification marked as read:", res.data);
        await this.fetchNotifications(); // Refresh notifications after marking one as read
      } catch (e) {
        // console.error("Error marking notification as read:", e);
      }
    },
     async markNotificationAsReadById(Id) {
      try {
        const res = await axios.patch(
          `https://projectip2-book-store-api.up.railway.app/api/customer/notifications/mark_as_read/${Id}`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // console.log("Notification marked as read:", res.data);
        await this.fetchNotifications(); // Refresh notifications after marking one as read
      } catch (e) {
        // console.error("Error marking notification as read:", e);
      }
    }

  },
  getters: {
    getNotifications: (state) => {
      return state.notifications;
    },
   
  },
});
export default useNotification;
