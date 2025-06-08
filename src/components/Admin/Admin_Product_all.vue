<template>
  <div class="main_container">
    <div class="header_form">
      <div class="title-div">
        <h1>All Products</h1>
      </div>
      <div class="btn-div">
        <button @click="handleAddProduct" class="colored-functioned-btn">
          <img src="../../assets/plus-add.svg" width="20px" alt="" /> Add
          Product
        </button>
        <button @click="handleUpdateProduct" class="colored-functioned-btn">
          <img src="../../assets/update-svg.svg" width="20px" alt="" /> Update
          Product
        </button>
      </div>
    </div>
    <div class="search-section">
      <div class="search_form">
        <input
          type="text"
          placeholder="Search..."
          v-model="textSearch"
          @keydown.enter="handleSearch"
        />
        <div class="search_btn" title="Search Now">
          <RouterLink to="/search">
            <svg
              @click="handleSearch"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 80 80"
            >
              <path
                fill="#b6c9d6"
                d="M6.998,77.5c-1.202,0-2.331-0.468-3.181-1.317c-1.753-1.753-1.753-4.607,0-6.36l36.828-35.11 l4.656,4.661L10.17,76.191C9.329,77.032,8.199,77.5,6.998,77.5z"
              ></path>
              <path
                fill="#788b9c"
                d="M40.636,35.411l3.966,3.97L9.825,75.829C9.069,76.584,8.066,77,6.998,77 c-1.068,0-2.072-0.416-2.827-1.171c-1.559-1.559-1.559-4.095-0.017-5.637L40.636,35.411 M40.654,34.013L3.464,69.469 c-1.952,1.952-1.951,5.116,0,7.068C4.44,77.512,5.719,78,6.998,78c1.279,0,2.558-0.488,3.534-1.464L46,39.366L40.654,34.013 L40.654,34.013z"
              ></path>
              <g>
                <path
                  fill="#d1edff"
                  d="M52,53.5c-14.061,0-25.5-11.439-25.5-25.5S37.939,2.5,52,2.5S77.5,13.939,77.5,28 S66.061,53.5,52,53.5z"
                ></path>
                <path
                  fill="#788b9c"
                  d="M52,3c13.785,0,25,11.215,25,25S65.785,53,52,53S27,41.785,27,28S38.215,3,52,3 M52,2 C37.641,2,26,13.641,26,28s11.641,26,26,26s26-11.641,26-26S66.359,2,52,2L52,2z"
                ></path>
              </g>
            </svg>
          </RouterLink>
        </div>
      </div>
      <div class="checkbox-section">
        <div class="input-div">
          <input
            type="checkbox"
            id="in-stock-low-product"
            v-model="isInStockLowProduct"
          />
          <label for="in-stock-low-product">Products Low In Stock</label>
        </div>
        <div class="input-div">
          <input
            type="checkbox"
            id="in-popular-product"
            v-model="isPopularProduct"
          />
          <label for="in-stock-low-product">Most Popular</label>
        </div>
      </div>
    </div>
    <div class="main-content">
      <Admin_AllProducts_component/>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import Admin_AllProducts_component from "./admin-components/Admin_AllProducts_component.vue";
export default {
  name: "Admin_Product_all",
  components: {
    Admin_AllProducts_component,
  },
  setup() {
    const router = useRouter();
    const handleAddProduct = () => {
      router.push("/admin/add-product-form");
    };
    const handleUpdateProduct = () => {
      router.push("/admin/update-product-form");
    };

    return {
      handleAddProduct,
      handleUpdateProduct,
    };
  },
  data() {
    return {
      textSearch: "",
      isInStockLowProduct: false,
      isPopularProduct: false,
    };
  },
};
</script>

<style scoped>
.search_form {
  display: flex;
  align-items: center;
}
.search-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
.checkbox-section {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 50px;
  padding: 20px;
}
.main-content{
  width: 100%;
  display: flex;
  padding: 20px;
}

</style>
