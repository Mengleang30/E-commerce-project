import { defineStore } from "pinia";
import { BookData } from "./Data";

export const useBookStore = defineStore('BookData', {
    state: () => ({
        BookData
    }),

    getters : {
        
    },
    actions: {
        getBookData() {
          console.log('BookData:', this.BookData); // Check if BookData is initialized
        },
      },
})