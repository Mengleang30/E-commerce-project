import { defineStore } from "pinia";
import { BookData } from "./Data";

export const useBookStore = defineStore('BookData', {
    state: () => ({
        BookData
    }),

    getters : {
      getProductId: (state) => (id)=>{
        return state.BookData.find((books)=>books.id==id)
      }
        
    },
    actions: {
      
      },
})