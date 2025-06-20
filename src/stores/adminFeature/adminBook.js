import { defineStore } from "pinia";
import axios from "axios";

export const useAdminBooks = defineStore("AdminBookStore", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    backendUrl: "https://projectip2-book-store-api.up.railway.app"
  }),

  actions: {
    async createNewBook(
      Title,
      Author,
      Description,
      Published_date,
      Discount,
      Quantity,
      Price,
      Url,
      Image,
      Languages,
      CategoryId
    ) {
      try {
        // Validate Image
        if (Image && !(Image instanceof File)) {
          throw new Error("Image must be a File object");
        }
        if (Image) {
          const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
          if (!validImageTypes.includes(Image.type)) {
            throw new Error("Image must be of type jpeg, png, jpg, or gif");
          }
        }

        // Ensure Languages is an array
        const languagesArray = Array.isArray(Languages) && Languages.length ? Languages : [];

        const formData = new FormData();
        formData.append("title", Title);
        formData.append("author", Author);
        formData.append("description", Description || "");
        formData.append("published_date", Published_date || "");
        formData.append("discount", Discount || 0);
        formData.append("quantity", Quantity || 0);
        formData.append("price", Price);
        formData.append("url_image", Url || "");
        formData.append("category_id", CategoryId);

        // Append languages as an array using repeated keys
        if (languagesArray.length) {
          languagesArray.forEach(lang => {
            formData.append("languages[]", lang);
          });
        } else {
          formData.append("languages[]", ""); // Send empty array if no languages
        }

        if (Image) {
          formData.append("path_image", Image);
        }

        // Debug FormData contents
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }

        const response = await axios.post(`${this.backendUrl}/api/admin/books`, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("API Response:", response.data);
        return response.data;

      } catch (e) {
        console.error("Error adding book:", e);
        if (e.response) {
          console.error("Backend Error Details:", e.response.data);
        }
        throw e;
      }
    },
    
    async reStock(Quantity,Id) {
       try {
        await axios.post(
          `https://projectip2-book-store-api.up.railway.app/api/admin/books/re_stock/${Id}`,
          {
            quantity : Quantity
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        // console.log("Notification marked as read:", res.data);
        
        } catch (e) {
        // console.error("Error marking notification as read:", e);
      }
    }

    // ... other actions like deleteBook
  },

  getters: {},
});

export default useAdminBooks;
