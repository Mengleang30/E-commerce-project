import { defineStore } from "pinia";

import api from "@/axios";


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
        const res =  await api.get("/api/customer/notifications")
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
        const res = await api.patch(
          `/api/customer/notifications/mark_all_as_read`,
          {});
        // console.log("Notification marked as read:", res.data);
        await this.fetchNotifications(); // Refresh notifications after marking one as read
      } catch (e) {
        // console.error("Error marking notification as read:", e);
      }
    },
     async markNotificationAsReadById(Id) {
      try {
        const res = await api.patch(
          `/api/customer/notifications/mark_as_read/${Id}`,
          {}
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
