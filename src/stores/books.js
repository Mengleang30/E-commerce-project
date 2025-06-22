import { defineStore } from "pinia";

import api from "@/axios";

export const useBooks = defineStore("BookStore", {
  state: () => ({
    books: [],
    wishlist: [],
    resultSearched: null,

    Search: "",
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async fetchBooks() {
      try {
        const res = await api.get(`/api/books`);
        // console.log("Books from backend:", res.data);

        this.books = res.data;
        //  console.log("In Books",this.books)
      } catch (e) {
        // console.log(e)
      }
    },

    async fetchWishList() {
      try {
        const res = await api.get(
          `/api/customer/wishlist`,
        );
        this.wishlist = res.data;
        // console.log("wishlist",this.wishlist)
      } catch (e) {}
    },

    
    async addWishList(bookId) {
      try {
        const res = await api.post(
          `/api/customer/wishlist`,
          { book_id: bookId },
        );
        this.wishlist.push(res.data);
        console.log("Add", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async removeWishList(wishlistId) {
      try {
        await api.delete(
          `/api/customer/wishlist/remove/${wishlistId}`,
        );
        this.wishlist = this.wishlist.filter((item) => item.id !== wishlistId);
      } catch (e) {
        console.log(e);
      }
    },
    removeWishlistLocallyByBookId(bookId) {
      const index = this.wishlist.findIndex((item) => item.book_id === bookId);
      if (index !== -1) {
        this.wishlist.splice(index, 1);
      }
    },

    async searchBooksAPI(query) {
      if (!query || !query.trim()) {
        this.resultSearched = [];
        return;
      }
      try {
        const res = await api.get(`/api/books/search`, {
          params: { query },
        });
        this.resultSearched = res.data;
        console.log("result", this.resultSearched);
      } catch (e) {
        console.error("Search API error:", e);
        this.resultSearched = [];
      }
    },
  },

  getters: {
    getTextFromSearch: (state) => (text) => {
      return (state.Search = text);
    },
    wishlistSet: (state) => new Set(state.wishlist.map((item) => item.book_id)),
  },
});
export default useBooks;
