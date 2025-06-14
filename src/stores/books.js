import { defineStore } from "pinia";
import axios from "axios";

export const useBooks = defineStore("BookStore", {
  state: () => ({
    books: [],
    wishlist:[],
    backendUrl: "http://localhost:8200",
    resultSearched: null,

     Search : "",
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async fetchBooks () {
        try{
            const res = await axios.get(`${this.backendUrl}/api/books`);
            // console.log("Books from backend:", res.data);
           
            this.books = res.data;
            //  console.log("In Books",this.books)
        }
        catch (e) {
            // console.log(e)
        }
    },

    async fetchWishList() {
      try {
        const res = await axios.get(`${this.backendUrl}/api/customer/wishlist`,{
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.wishlist = res.data;
        // console.log("wishlist",this.wishlist)
      } 
      catch (e){

      }
    },

    async addWishList(bookId){
       try {
        const res = await axios.post(`${this.backendUrl}/api/customer/wishlist`,{book_id : bookId},{
         withCredentials: true,
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.wishlist.push(res.data)
        console.log("Add", res.data)
      } 
      catch (e){
        console.log(e)
      }
    },
   async removeWishList(wishlistId) {
  try {
    await axios.delete(`${this.backendUrl}/api/customer/wishlist/remove/${wishlistId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    this.wishlist = this.wishlist.filter(item => item.id !== wishlistId);
  } catch (e) {
    console.log(e);
  }
},   

   async searchBooksAPI(query) {
      if (!query || !query.trim()) {
        this.resultSearched = [];
        return;
      }
      try {
        const res = await axios.get(`${this.backendUrl}/api/books/search`, {
          params: { query },
        });
        this.resultSearched = res.data;
        console.log("result", this.resultSearched)
      } catch (e) {
        console.error("Search API error:", e);
        this.resultSearched = [];
      }
    },

  },

  getters: {
     getTextFromSearch : (state) => (text)=> {
        return state.Search = text;
      }
  }, 

});
export default useBooks;
