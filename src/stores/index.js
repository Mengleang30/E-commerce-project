import { defineStore } from "pinia";
import { BookData } from "./Data";

export const useBookStore = defineStore('BookData', {
  state: () => ({
    BookData,
    Search: "",
  }),

  actions: {
    setTextFromSearch(Text) {
      this.Search = Text;

    }
  },

  getters: {
    getProductId: (state) => (id) => {
      return state.BookData.find((books) => books.id == id)
    },

    getTextFromSearch: (state) => (text) => {
      return state.Search = text;
    }
  },
})