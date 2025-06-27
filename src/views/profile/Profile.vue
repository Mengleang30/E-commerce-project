<script setup>
import useAuthentication from "@/stores/authentication";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const auth = useAuthentication();
const router = useRouter();

const editProfile =ref(false);

const logout = () => {
  auth.logout();
  router.push("/");
};

const name = ref('');
const phone = ref('');
const description =ref('');
const address = ref('');





const processEdit = computed(()=>{
  if(editProfile.value==false){
    return "Edit Profile"
  }
  return "Cancel Editing"
});
const handleEdit = async () => {
  await auth.updateInformation(name.value,phone.value, description.value, address.value);
  await auth.fetchLoggedUser();

  name.value= ''
  phone.value= ''
  description.value=''
  address.value=''
  editProfile.value = false
  window.scrollTo(0,0);
}

const listData = computed(()=>{
  return auth.loggedInUser || {}
})

onMounted(async () => {
  await auth.fetchLoggedUser();
});

function formatTime(dateStr) {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return `${formattedDate} `;
}

// const image = ref();
// // File input handler
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, or GIF)');
      image.value = null;
      fileInput.value.value = '';
      return;
    }
    if (file.size > maxSize) {
      alert('File size exceeds 5MB limit');
      image.value = null;
      fileInput.value.value = '';
      return;
    }
    image.value = file;
    // console.log('Selected file:', image.value);
    // console.log('Type:', image.value.type);
  } else {
    image.value = null;
    fileInput.value.value = '';
  }
}


// const Text = ref("Update");
// // Submit handler
// const handleUpload = async () => {
//   if (!image.value) return;

//   const formData = new FormData();
//   formData.append("picture", image.value);
//   Text.value = "Updating...";
//   try {
//     await auth.uploadPicture(image.value);
//     await auth.fetchLoggedUser(); // Refresh user data
//     Text.value = "Update";
//   } catch (error) {
//     alert("Failed to upload image");
//     console.error(error);
//     alert('Failed updated picture !')
//   }
// };

const fileInput = ref(null);
const image = ref(null);
const Text = ref('Update');

const handleUpload = async () => {
  if (!image.value) {
    alert('Please select an image to upload');
    return;
  }

  const formData = new FormData();
  formData.append('picture', image.value);
  // console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    // console.log(`${key}: ${value.name || value}`);
  }
  Text.value = 'Updating...';
  try {
   
    await auth.uploadPicture(formData); // Pass formData
    await auth.fetchLoggedUser();
    Text.value = 'Update';
    image.value = null;
    fileInput.value.value = '';
  } catch (error) {
    alert('Failed to upload image');
    console.error('Upload error:', error.response?.data || error.message);
    Text.value = 'Update';
  }
};
</script>
<!-- http://localhost:8200/storage/profile_pictures/cWyxacaK3oNaP4JIklqOjQmgpEURrNjHYUpllTih.jpg -->

<template>
  <div class="wrap_container">
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-image-wrapper">
          <img
            v-if="
              listData.google_id == null && listData.picture
            "
            :src="`https://bucket-production-853a.up.railway.app/storage/${listData.picture}`"
            alt="Profile"
            class="profile-image"
          />
          <img
            v-else-if="
              listData.google_id !== null
            "
            :src="`https://bucket-production-853a.up.railway.app/storage/${listData.picture}`"
            alt="Profile"
            class="profile-image"
          />
          <img
            v-else-if="!listData.picture"
            src="https://img.icons8.com/?size=100&id=1cYVFPowIgtd&format=png&color=000000"
            alt="Profile"
            class="profile-image"
          />
          <img
            v-else
            :src="listData.picture"
            alt="Profile"
            class="profile-image"
          />
          <!-- <label class="upload-button" title="Upload new photo">📷</label> -->
          <form
            @submit.prevent="handleUpload"
            name="picture"
            class="form"
            enctype="multipart/form-data"
            ref="fileInput"

          >
            <input
              @change="onFileChange"
               ref="fileInput"
              id="file-upload"
              
              type="file"
              name="picture"
              accept="image/*"
              required
            />
            <button type="submit" :disabled="!image || Text === 'Updating...'">📷 {{ Text }}</button>
          </form>
        </div>
        <div class="profile-details">
          <div class="profile-name">{{ listData.name }}</div>
          <div class="profile-status">✔ {{ listData.role }}</div>
        </div>
      </div>

      <div  class="info-section">
        <div @click="editProfile=!editProfile" class="button-group">
          <button class="btn btn-edit">{{ processEdit }}</button>
          <button @click="logout" class="btn btn-logout">Logout</button>
        </div>

        <div v-if="!editProfile">
        <div class="info-row">
          <span class="info-label">📧 Email:</span>
          <span class="info-value">{{ listData.email }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">📞 Phone:</span>
          <span v-if="listData.phone !== null" class="info-value">{{
            listData.phone
          }}</span>
          <span v-else class="info-value"> Not set </span>
        </div>
        <div class="info-row">
          <span class="info-label">🏠 Address:</span>
          <span class="info-value">{{ listData.address }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">🏠 Join From :</span>
          <span class="info-value">{{
            formatTime(listData.created_at)
          }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">🏠 Description :</span>
          <span class="info-value">
            {{ listData.description }}
          </span>
        </div>
        </div>
        <form v-if="editProfile" @submit.prevent="handleEdit" class="edit-form">
          <h3>Edit Customer Information</h3>
          <div class="form-row">
            <label for="name">👤 Name</label>
            <input v-model="name" type="text" id="name" required />
          </div>

          <div class="form-row">
            <label for="phone">📞 Phone</label>
            <input v-model="phone" type="tel" id="phone" />
          </div>

          <div class="form-row">
            <label for="address">🏠 Address</label>
            <input v-model="address" type="text" id="address" />
          </div>

          <div class="form-row">
            <label for="description">📝 Description</label>
            <textarea v-model="description" id="description" rows="3"></textarea>
          </div>

          <div class="form-row">
            <button type="submit" class="save-button">💾 Save Changes</button>
          </div>
        </form>
        <hr />
      </div>

      <div class="button-group-delete">
        <i
          >If you were delete your account , you can recover back before 30
          days</i
        >
        <button class="btn btn-delete">Delete Account</button>
      </div>
      <br />
      <hr />
      <br />
    </div>
  </div>
</template>

<style scoped>
.wrap_container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-container {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 75%;

  padding: 1rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-image-wrapper {
  position: relative;
}

.profile-image-wrapper .profile-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #4e73df;
}

.form {
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
}

.form button {
  background-color: rgb(3, 133, 254);
  width: 50%;
  border: none;
  height: 2rem;
  font-size: larger;
  cursor: pointer;
  padding: 5px;
  color: #fff;
  border-radius: 6px;
  margin-top: 10px;
  font-size: medium;
  align-items: center;
  justify-content: center;
  display: flex;
}
.form input {
  /* background-color: #2e59d9; */
  cursor: pointer;
  width: 78%;
  margin: 8px 0;
}
/* .upload-button {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #4e73df;
      color: white;
      border-radius: 50%;
      padding: 4px 6px;
      font-size: 12px;
      cursor: pointer;
    } */

.profile-details {
  flex: 1;
}
.edit-form h3 {
  text-align: center;
  color: #2e59d9;
}

.profile-name {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
}

.profile-status {
  font-size:larger;
  color: green;
  margin-top: 0.3rem;
}

.info-section {
  margin-top: 1.5rem;
}

.info-row {
  margin:  0.8rem 0;
}

.info-label {
  font-weight: bold;
  color: #555;
}

.info-value {
  margin-left: 0.5rem;
  color: #333;
}

.button-group {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
.button-group-delete {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button-group-delete button {
  background-color: red;
  color: rgb(255, 255, 255);
}
.button-group-delete i {
  font-size: smaller;
  color: #555;
}

.btn {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-edit {
  background-color: #4e73df;
  color: white;
}

.btn-edit:hover {
  background-color: #2e59d9;
}

.btn-logout {
  background-color: #e74a3b;
  color: white;
}

.btn-logout:hover {
  background-color: #c0392b;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  max-width: 600px;
}

.form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-row input,
.form-row textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-row textarea {
  resize: vertical;
  width: 100%;
  min-height: 6rem;
}

.save-button {
  padding: 0.6rem 1.2rem;
  background-color: #0d6efd;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;
}

.save-button:hover {
  background-color: #084298;
}

@media (max-width: 600px) {
  .profile-container {
    margin: 1rem;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .button-group {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
