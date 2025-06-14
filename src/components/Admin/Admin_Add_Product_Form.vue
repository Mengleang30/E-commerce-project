<template>
  <div class="main_container">
    <div class="header_form">
      <div class="btn-div">
        <button class="back-btn" @click="handleGoBack">
          <img src="../../assets/back-svg.svg" width="20px" alt="" />Back
        </button>
      </div>
      <div class="title-div">
        <h1>Add New Product</h1>
      </div>
    </div>
    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="input-div">
        <label for="book-title">Book title</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Book Title"
          required
          id="book-title"
          name="book-title"
        />
      </div>
      <div class="input-div">
        <label for="author-name">Author Name</label>
        <input
          v-model="form.author"
          type="text"
          placeholder="Author Name"
          required
          id="author-name"
          name="author-name"
        />
      </div>

      <div class="input-div-2col">
        <div class="input-div">
          <label for="book-price">Book Price</label>
          <input
            v-model="form.price"
            type="number"
            placeholder="Price $"
            step="0.01"
            required
            id="book-price"
            name="book-price"
          />
        </div>
        <div class="input-div">
          <label for="book-quantity">Book Quantity</label>
          <input
            v-model="form.quantity"
            type="number"
            placeholder="Quantity"
            required
            id="book-quantity"
            name="book-quantity"
          />
        </div>
      </div>

      <div class="input-div-2col">
        <div class="input-div">
          <label for="book-language">Book Language</label>
          <select
            v-model="form.language"
            id="book-language"
            name="book-language"
            required
          >
            <option disabled value="">Select Language</option>
            <option>Educations</option>
            <option>Self-help</option>
            <option>Freelancer</option>
            <option>Retired</option>
          </select>
        </div>
        <div class="input-div">
          <label for="book-category">Book Category</label>
          <select
            v-model="form.category"
            id="book-category"
            name="book-category"
            required
          >
            <option disabled value="">Select Category</option>
            <option>Educations</option>
            <option>Self-help</option>
            <option>Freelancer</option>
            <option>Retired</option>
          </select>
        </div>
      </div>

      <div class="input-div-2col">
        <div class="input-div">
          <label for="book-publishDate">Book Publish Date</label>
          <input
            v-model="form.publishedDate"
            type="date"
            required
            id="book-publishDate"
            name="book-publishDate"
          />
        </div>
        <div class="input-div">
          <label for="book-discount">Book Discount</label>
          <input
            v-model="form.discount"
            type="number"
            placeholder="Include Discount (%)"
            min="0"
            max="100"
          />
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
        <input
          v-model="form.imageUrl"
          type="text"
          placeholder="Images URL"
          :disabled="!form.useUrl"
          id="image-url"
          name="image-url"
        />
      </div>

      <!-- Description -->
      <div class="input-div">
        <label for="book-description">Book Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Book Description"
          required
          id="book-description"
          name="book-description"
        ></textarea>
      </div>

      <!-- Submit Button -->
      <div class="btn-div">
        <button type="submit" class="colored-functioned-btn">Add Now</button>
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "AdminAddProductForm",
  setup() {
    const router = useRouter();
    return {
      handleGoBack: () => router.push('/admin/all-products'), // Adjust the path as needed
    };
  },
  data() {
    return {
      // Define any data properties needed for the form
      form: {
        title: "",
        author: "",
        price: "",
        quantity: "",
        language: "",
        category: "",
        publishedDate: "",
        discount: "",
        imageUrl: "",
        useUrl: false,
        description: "",
      },
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
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.imageUrl = URL.createObjectURL(file);
        this.form.useUrl = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
