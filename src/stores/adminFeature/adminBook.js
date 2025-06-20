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
    async updateBook(
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

        const response = await axios.patch(`${this.backendUrl}/api/admin/books`, formData, {
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

     async updateBook(
      id,
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
        if (!id) {
          throw new Error("Book ID is required");
        }
        if (!Title || !Author || !Price || !CategoryId) {
          throw new Error("Title, Author, Price, and Category ID are required");
        }

        if (Image && !(Image instanceof File)) {
          throw new Error("Image must be a File object");
        }
        if (Image) {
          const validImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
          if (!validImageTypes.includes(Image.type)) {
            throw new Error("Image must be of type jpeg, png, jpg, or gif");
          }
        }

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

        if (languagesArray.length) {
          languagesArray.forEach(lang => {
            formData.append("languages[]", lang);
          });
        } else {
          formData.append("languages[]", "");
        }

        if (Image) {
          formData.append("path_image", Image);
        }

        formData.append("_method", "PUT");

        console.log("FormData contents (update):");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value instanceof File ? value.name : value}`);
        }

        const response = await axios.post(`${this.backendUrl}/api/admin/books/${id}`, formData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("API Response (update):", response.data);
        return response.data;
      } catch (e) {
        console.error("Error updating book:", e);
        if (e.response) {
          console.error("Backend Error Details:", e.response.data);
        }
        throw e;
      }
    },

    // ... other actions like deleteBook
  },

  getters: {},
});

export default useAdminBooks;
