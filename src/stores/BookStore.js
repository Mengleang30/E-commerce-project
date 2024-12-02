import { defineStore } from "pinia";
import { BookData } from "./Data";

export const useBookStore = defineStore('BookData', {
    state: () => ({
        BookData
    }),

    getters : {
        
    }
})