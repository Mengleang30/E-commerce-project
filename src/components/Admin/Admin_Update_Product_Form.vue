<template>
  <div class="main_container">
    <div class="header_form">
      <div class="btn-div">
        <button class="back-btn" @click="handleGoBack">
          <img src="../../assets/back-svg.svg" width="20px" alt="" />Back
        </button>
      </div>
      <div class="title-div">
        <h1>Update Product</h1>
      </div>
    </div>
    <form @submit.prevent="handleUpdate" class="form-grid">
      <div class="input-div">
        <label for="book-title">Book title</label>
        <input v-model="form.title" type="text" placeholder="Book Title" required id="book-title" name="book-title" />
      </div>
      <div class="input-div">
        <label for="author-name">Author Name</label>
        <input v-model="form.author" type="text" placeholder="Author Name" required id="author-name"
          name="author-name" />
      </div>

      <div class="input-div-2col">
        <div class="input-div">
          <label for="book-price">Book Price</label>
          <input v-model="form.price" type="number" placeholder="Price $" step="0.01" required id="book-price"
            name="book-price" />
        </div>
        <div class="input-div">
          <label for="book-quantity">Book Quantity</label>
          <input v-model="form.quantity" type="number" placeholder="Quantity" required id="book-quantity"
            name="book-quantity" />
        </div>
      </div>

      <div class="input-div-2col">
        <div class="input-div">
          <label for="book-language">Book Language</label>
          <select v-model="form.language" id="book-language" name="book-language" required>
            <option disabled value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <div class="input-div">
          <label for="book-category">Book Category</label>
          <select v-model="form.category_id" id="book-category" name="book-category" required>
            <option disabled value="">Select Category</option>
            <option v-for="category in listCategory" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="input-div-2col">
        <div class="input-div">
          <label for="book-publishDate">Book Publish Date</label>
          <input v-model="form.published_date" type="date" required id="book-publishDate" name="book-publishDate" />
        </div>
        <div class="input-div">
          <label for="book-discount">Book Discount</label>
          <input v-model="form.discount" type="number" placeholder="Include Discount (%)" min="0" max="100" />
        </div>
      </div>

      <!-- File Upload & Image URL -->
      <div class="input-div file-url-wrapper">
        <label for="book-image">Book Image</label>
        <input type="file" @change="handleFileUpload" />
        <!-- <label><input type="checkbox" v-model="form.useUrl" /> Use URL</label> -->
      </div>

      <div class="input-div">
        <label for="image-url">Book Image URL</label>
        <input v-model="form.url_image" type="text" placeholder="Images URL" :disabled="!form.useUrl" id="image-url"
          name="image-url" />
      </div>

      <!-- Description -->
      <div class="input-div">
        <label for="book-description">Book Description</label>
        <textarea v-model="form.description" rows="3" placeholder="Book Description"  id="book-description"
          name="book-description"></textarea>
      </div>

      <!-- Submit Button -->
      <div class="btn-div">
        <button type="submit" @click="handleUpdate" class="colored-functioned-btn">Update Now</button>
      </div>
    </form>
  </div>
</template>

<script>
import useCategory from "@/stores/category";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "AdminAddProductForm",
  setup() {
    const router = useRouter();

    const route = useRoute();

    const form = ref({
      title: "",
      author: "",
      price: "",
      quantity: "",
      language: "",
      category_id: "",
      published_date: "",
      discount: "",
      url_image: "",
      path_image: null,
      description: "",
    });

    const isLoading = ref(false);

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (
          !["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
            file.type
          )
        ) {
          error.value.path_image = "Please upload a JPEG, PNG, JPG, or GIF image.";
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          error.value.path_image = "Image size must be under 2MB.";
          return;
        }
        form.value.path_image = file;
        // form.value.imageUrl = URL.createObjectURL(file);
        // error.value.image = null;
      } else {
        form.value.path_image = null;
        form.value.url_image = "";
        error.value.path_image = null;
      }
    };

    const fetchId = route.query;

    console.log(fetchId.id);

    const token = localStorage.getItem("token") || null;

    const handleUpdate = async () => {
  try {
    const formData = new FormData();
    formData.append("title", form.value.title);
    formData.append("author", form.value.author);
    formData.append("price", form.value.price);
    formData.append("quantity", form.value.quantity);
    formData.append("language", form.value.language);
    formData.append("category_id", form.value.category_id);
    formData.append("published_date", form.value.published_date);
    formData.append("discount", form.value.discount);
    formData.append("description", form.value.description);

    if (form.value.path_image) {
      formData.append("path_image", form.value.path_image);
    }

    if (form.value.url_image) {
      formData.append("url_image", form.value.url_image);
    }

    await axios.post(
      `https://projectip2-book-store-api.up.railway.app/api/admin/books/${fetchId.id}?_method=PATCH`,
      formData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Product updated successfully!");
    alert("Product updated successfully!");
    router.push("/admin/all-products");
  } catch (e) {
    console.error("Update error:", e);
    alert("Update failed!");
  }
};

    const useCategories = useCategory();
    const listCategory = computed(() => {
      return useCategories.categories;
    });

    onMounted(() => {
      useCategories.fetchCategories();

    });


    return {
      handleGoBack: () => router.push("/admin/all-products"), // Adjust the path as needed
      form,
      handleFileUpload,
      handleUpdate,
      listCategory,
    };
  },
  data() {
    return {
      // Define any data properties needed for the form
      // form: {
      //   title: "",
      //   author: "",
      //   price: "",
      //   quantity: "",
      //   language: "",
      //   category_id: "",
      //   publishedDate: "",
      //   discount: "",
      //   imageUrl: "",
      //   useUrl: false,
      //   description: "",
      // },
    };
  },
  methods: {
    handleSubmit() {
      if (
        !this.form.title ||
        !this.form.author ||
        !this.form.price ||
        !this.form.quantity
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      // You can submit to an API here
      // axios.post('/api/products', this.form)

      console.log("Form submitted:", this.form);
      alert("Product added successfully!");

      console.log("Form Data:", this.form);
      // Submit logic here (API call or state update)
    },
    // handleFileUpload(event) {
    //   const file = event.target.files[0];
    //   if (file) {
    //     this.form.imageUrl = URL.createObjectURL(file);
    //     this.form.useUrl = false;
    //   }
    // },
  },
};
</script>
<style scoped>
.main_container {
  margin: 0 auto;
  padding: 1.5rem; /* Scalable padding */
  background-color: #fff;
  font-family: "Segoe UI", Arial, sans-serif;
}

.header_form {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.btn-div {
  display: flex;
  justify-content: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #453f3f;
  border: 1px solid #ccc;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: #e0e0e0;
}

.back-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
}

.back-btn img {
  width: 1.2rem;
  height: 1.2rem;
}

.title-div h1 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
}

.form-grid {
  display: grid;
  gap: 1.5rem; /* Scalable gap between form elements */
}

.input-div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-div-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.input-div label {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.input-div input,
.input-div select,
.input-div textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%; /* Full width inputs */
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.input-div input:focus,
.input-div select:focus,
.input-div textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.input-div input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.input-div textarea {
  resize: vertical; /* Allow vertical resizing only */
  min-height: 100px;
}

.file-url-wrapper input[type="file"] {
  padding: 0.5rem;
  border: none;
}

.colored-functioned-btn {
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.colored-functioned-btn:hover {
  background-color: #218838;
}

.colored-functioned-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .main_container {
    padding: 1rem; /* Reduce padding for tablets */
  }

  .input-div-2col {
    grid-template-columns: 1fr; /* Stack two-column inputs vertically */
  }

  .header_form {
    flex-direction: column;
    align-items: flex-start;
  }

  .title-div h1 {
    font-size: 1.5rem; /* Smaller heading */
  }

  .back-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .back-btn img {
    width: 1rem;
    height: 1rem;
  }

  .input-div input,
  .input-div select,
  .input-div textarea {
    font-size: 0.9rem;
    padding: 0.6rem;
  }

  .colored-functioned-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 600px) {
  .main_container {
    padding: 0.75rem; /* Further reduce padding for mobile */
  }

  .form-grid {
    gap: 1rem; /* Smaller gap */
  }

  .title-div h1 {
    font-size: 1.3rem;
  }

  .input-div label {
    font-size: 0.9rem;
  }

  .input-div input,
  .input-div select,
  .input-div textarea {
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  .back-btn,
  .colored-functioned-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .file-url-wrapper input[type="file"] {
    font-size: 0.85rem;
  }
}

@media (min-width: 1024px) {
  .main_container {
    padding: 2rem; /* More padding for desktops */
  }

  .title-div h1 {
    font-size: 2rem;
  }

  .input-div input,
  .input-div select,
  .input-div textarea {
    font-size: 1.1rem;
    padding: 0.85rem;
  }

  .back-btn,
  .colored-functioned-btn {
    padding: 0.85rem 1.75rem;
    font-size: 1.1rem;
  }
}
</style>
