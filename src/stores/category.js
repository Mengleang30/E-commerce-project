import { defineStore } from "pinia";

import api from "@/axios";

export const useCategory = defineStore("CategoryStore", {
  state: () => ({
    categories: null,
   
  }),

  actions: {
    async fetchCategories () {
        try{
            const res = await api.get(`/api/categories`);
            // console.log("Categories from backend:", res.data);
           
            this.categories= res.data;
            //  console.log("In Categories",this.categories)
        }
        catch (e) {
            // console.log(e)
        }
    }
  },



  getters: { } 

});
export default useCategory;
