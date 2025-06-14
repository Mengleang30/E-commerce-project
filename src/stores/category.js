import { defineStore } from "pinia";
import axios from "axios";

export const useCategory = defineStore("CategoryStore", {
  state: () => ({
    categories: null,
    backendUrl: "http://localhost:8200",
  }),

  actions: {
    async fetchCategories () {
        try{
            const res = await axios.get(`${this.backendUrl}/api/categories`);
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
