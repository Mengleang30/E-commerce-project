<template>
  <div class="main_container">
    <div class="header_form">
      <div class="btn-div">
        <button class="back-btn" @click="handleGoBack" aria-label="Go back to all products">
          <img src="../../assets/back-svg.svg" width="20" alt="Back icon" />
          Back
        </button>
      </div>
      <div class="title-div">
        <h1>Add New Product</h1>
      </div>
    </div>
    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="input-div">
        <label for="book-title">Book Title</label>
        <input v-model="form.title" type="text" placeholder="Book Title" required id="book-title" name="book-title" />
      </div>
      <div class="input-div">
        <label for="author-name">Author Name</label>
        <input v-model="form.author" type="text" placeholder="Author Name" required id="author-name" name="author-name" />
      </div>

      <div class="input-div-2col">
        <div class="input-div">
          <label for="book-price">Book Price</label>
          <input v-model.number="form.price" type="number" placeholder="Price $" step="0.01" min="0" required id="book-price" name="book-price" />
        </div>
        <div class="input-div">
          <label for="book-quantity">Book Quantity</label>
          <input v-model.number="form.quantity" type="number" placeholder="Quantity" min="0" required id="book-quantity" name="book-quantity" />
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
          <select v-model="form.category" id="book-category" name="book-category" required>
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
          <input v-model="form.publishedDate" type="date" required id="book-publishDate" name="book-publishDate" />
        </div>
        <div class="input-div">
          <label for="book-discount">Book Discount</label>
          <input v-model.number="form.discount" type="number" placeholder="Include Discount (%)" min="0" max="100" id="book-discount" name="book-discount" />
        </div>
      </div>

      <!-- File Upload & Image Preview -->
      <div class="input-div file-url-wrapper">
        <label for="book-image">Book Image</label>
        <input type="file" id="book-image" name="book-image" accept="image/jpeg,image/png,image/jpg,image/gif" @change="handleFileUpload" />
        <p v-if="error.image" class="error-message">{{ error.image }}</p>
      </div>
      <div class="input-div" v-if="form.image">
        <label>Image Preview</label>
        <img :src="form.image" alt="Book cover preview" class="image-preview" />
      </div>

      <div class="input-div">
        <label for="image-url">Book Image URL</label>
        <input v-model="form.imageUrl" type="text" placeholder="Images URL" id="image-url" name="image-url" />
      </div>

      <!-- Description -->
      <div class="input-div">
        <label for="book-description">Book Description</label>
        <textarea v-model="form.description" rows="4" placeholder="Book Description" id="book-description" name="book-description"></textarea>
      </div>

      <!-- Submit Button -->
      <div class="btn-div">
        <button type="submit" class="colored-functioned-btn" :disabled="isLoading" aria-label="Add new book">
          {{ isLoading ? "Adding..." : "Add Now" }}
        </button>
        <p v-if="error.form" class="error-message">{{ error.form }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import useAdminBooks from "@/stores/adminFeature/adminBook";
import useCategory from "@/stores/category";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "AdminAddProductForm",
  setup() {
    const router = useRouter();
    const useAdminBook = useAdminBooks();

    const form = ref({
      title: "",
      author: "",
      price: "",
      quantity: "",
      language: "",
      category: "",
      publishedDate: "",
      discount: "",
      imageUrl: "",
      image: null,
      description: "",
    });

    const isLoading = ref(false);
    const error = ref({ form: null, image: null });

    const handleSubmit = async () => {
      if (
        !form.value.title ||
        !form.value.author ||
        !form.value.price ||
        !form.value.quantity ||
        !form.value.language ||
        !form.value.category ||
        !form.value.publishedDate ||
        !form.value.description
      ) {
        error.value.form = "Please fill in all required fields.";
        return;
      }

      isLoading.value = true;
      error.value.form = null;

      try {
        // Convert language to an array
        const languagesArray = form.value.language ? [form.value.language] : [];

        // Debug form data
        console.log("Submitting Form Data:", {
          ...form.value,
          languagesArray,
          imageType: form.value.image ? form.value.image.type : "No Image",
          isFile: form.value.image instanceof File
        });

        await useAdminBook.createNewBook(
          form.value.title,
          form.value.author,
          form.value.description,
          form.value.publishedDate,
          form.value.discount || 0,
          form.value.quantity,
          form.value.price,
          form.value.imageUrl,
          form.value.image,
          languagesArray,
          form.value.category
        );
        router.push("/admin/all-products");
      } catch (err) {
        console.error("Submission Error:", err);
        // Display specific validation errors if available
        if (err.response?.data?.errors) {
          const errors = Object.values(err.response.data.errors).flat().join(" ");
          error.value.form = errors || err.response?.data?.message || "Failed to add book.";
        } else {
          error.value.form = err.message || "Failed to add book.";
        }
      } finally {
        isLoading.value = false;
      }
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (!["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(file.type)) {
          error.value.image = "Please upload a JPEG, PNG, JPG, or GIF image.";
          return;
        }
        if (file.size > 2 * 1024 * 1024) {
          error.value.image = "Image size must be under 2MB.";
          return;
        }
        form.value.image = file;
        // form.value.imageUrl = URL.createObjectURL(file);
        // error.value.image = null;
      } else {
        form.value.image = null;
        form.value.imageUrl = "";
        error.value.image = null;
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
      handleGoBack: () => router.push("/admin/all-products"),
      form,
      isLoading,
      error,
      handleSubmit,
      handleFileUpload,
      useAdminBook,
      router,
      listCategory,
    };
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
