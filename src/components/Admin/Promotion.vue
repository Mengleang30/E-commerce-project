<template>
  <div class="container">
    <!-- Header -->
  
    <div class="top-bar">
      <span class="remaining">{{countCouponRemaining}}/{{ countCoupon }}</span>
      <span class="label">Coupons Remaining</span>
      <input
        type="text"
        placeholder="Search by name"
        v-model="search"
        class="search-input"
      />
    </div>

    <!-- Coupon Creation Form -->
    <div class="coupon-bar">
      <div class="dat">
        <div class="form-group">
          <span class="label">Limit</span>
          <input
            type="number"
            placeholder="##"
            v-model.number="limitUsage"
            class="input small"
          />
        </div>
        <div class="form-group">
          <span class="label">Start time</span>
          <input type="date" v-model="startDate" class="input" />
        </div>
        <div class="form-group">
          <span class="label">End time</span>
          <input type="date" v-model="endDate" class="input" />
        </div>
        <div class="form-group">
          <span class="label">Coupon Code</span>
          <input placeholder="Coupon code" v-model="code" class="input put" />
        </div>
        <div class="form-group">
          <span class="label">Discount (%)</span>
          <input
            type="number"
            placeholder="Discount %"
            v-model.number="discount"
            class="input put"
          />
        </div>
        <!-- <div class="form-group">
          <span class="label">Coupon Type</span>
          <select v-model="newCoupon.couponType" class="input select">
            <option>string</option>
            <option>numeric</option>
          </select>
        </div> -->
        <div class="form-group buttons">
          <button class="btn undo" @click="handleUndo">Undo</button>
          <button class="btn create" @click="handleCreateNew">Create Coupon</button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <table class="coupon-table">
      <thead>
        <tr>
          <th @click="sort('name')">Created at <span class="sort-icon">{{ sortArrow('name') }}</span></th>
          <th @click="sort('takeDate')">Limit usage <span class="sort-icon">{{ sortArrow('takeDate') }}</span></th>
          <th>Status</th>
          
          <th @click="sort('startDate')">Start time <span class="sort-icon">{{ sortArrow('startDate') }}</span></th>
          <th @click="sort('endDate')">End time <span class="sort-icon">{{ sortArrow('endDate') }}</span></th>
          <th @click="sort('code')">Discount <span class="sort-icon">{{ sortArrow('code') }}</span></th>
          <th @click="sort('code')">Coupon code <span class="sort-icon">{{ sortArrow('code') }}</span></th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listCoupon" :key="item.id">
          <td>{{ formatTimestampToLocal(item.created_at) }}</td>
          <td>{{ item.usage_limit }}</td>
          
          <td>
            <span class="status"  v-if="new Date(item.end_date) < new Date()" >Expired</span>
            <span class="status coming"  v-else-if="new Date(item.start_date) > new Date()" >Coming</span>
            <span class="status use" v-else>Available</span>
          </td>
          
         
          <td>{{ item.start_date }}</td>
           <td>{{ item.end_date }}</td>
            <td>{{ item.discount }}</td>
          <td>{{ item.code }}</td>
          <td>
            <div class="wrapAction">
    <!-- If active, clicking disables -->
    <button class="is_active disable"
            v-if="item.is_active == 1"
            @click="handleAction(item.id, false)"
            title="disable">Disable</button>

    <!-- If inactive, clicking enables -->
    <button class="is_active"
            v-else
            @click="handleAction(item.id, true)"
            title="enable">Enable</button>

    <button class="delete" title="delete" @click="deleteCoupon(index)">✕</button>
  </div>
            </td>
        </tr>
      </tbody>
    </table>

    <!-- Footer -->
    <div class="footer">
      <span>Showing {{ paginatedData.length }} out of {{ data.length }}.</span>
      <div class="pagination">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useAdminPromotion from '@/stores/adminFeature/AdminPromotion';
import { computed, onMounted, ref } from 'vue';

export default {
  name: "CouponTable",
  setup(){

    const usePromotion = useAdminPromotion();

    const listCoupon = computed(()=>{
      return usePromotion.coupons;
    })

    const countCoupon = computed(()=>{
        return usePromotion.coupons.length;
    })
    const countCouponRemaining = computed(() => {
      // Count coupons that are still usable (active and not expired)
      return usePromotion.coupons.filter(i => i.is_active && new Date(i.end_date) >= new Date()).length;
    });

    const code = ref('');
    const discount = ref(0);
    const startDate = ref();
    const endDate = ref();
    const limitUsage = ref();

    const handleCreateNew = ()=> {
      usePromotion.createNewCoupon(code.value,discount.value,startDate.value,endDate.value,limitUsage.value);
    }

    const handleUndo = ()=>{
       code = ref('');
        discount.value = ref(0);
       startDate.value = ref();
        endDate.value = ref();
        limitUsage.value = ref();
    }
   const handleAction = async (id, is_active) => {
      try {
        await usePromotion.actionCoupon(id, is_active);
        usePromotion.fetchCoupons();
        // alert(`Coupon ${is_active ? 'enabled' : 'disabled'} successfully!`);
      } catch (e) {
        console.error('Action error:', e.message);
        // alert(`Error: ${e.message}`);
      }
    };

 onMounted(()=>{
      usePromotion.fetchCoupons();
    })
 function formatTimestampToLocal(isoString) {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        timeZone: "Asia/Phnom_Penh", // Cambodia time
        year: "numeric",
        month: "numeric",
        day: "numeric",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // hour12: true, // or false for 24h format
      });
    }

    return {
      listCoupon,
      code,
      discount,
      startDate,
      endDate,
      limitUsage,
      formatTimestampToLocal,
      countCoupon,
      countCouponRemaining,
      handleCreateNew,
      handleUndo,
      handleAction
    }

  },
  data() {
    return {
      search: "",
      newCoupon: {
        code: "",
        limit: null,
        startDate: "",
        endDate: "",
        couponType: "string",
        discount: null, // Added for discount percentage
      },
      data: [
        {
          name: "Minnie Sanders",
          takeDate: "03/01/2018",
          status: "Redeemed",
          endDate: "03/28/2018",
          startDate: "05/17/2018",
          code: "89ABCDEF1234567890",
        },
        {
          name: "Elnora Hines",
          takeDate: "09/10/2018",
          status: "Redeemed",
          endDate: "07/19/2018",
          startDate: "04/24/2018",
          code: "XYZ1234567890ABCD",
        },
        {
          name: "Pauline Morris",
          takeDate: "11/18/2018",
          status: "Redeemed",
          endDate: "12/18/2018",
          startDate: "12/19/2018",
          code: "12345ABCDE67890FG",
        },
      ],
      currentPage: 1,
      itemsPerPage: 5,
      sortKey: "",
      sortOrder: 1, // 1 for ascending, -1 for descending
    };
  },
  computed: {
    filteredData() {
      return this.listCoupon.filter((item) =>
        item.code.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
  },
  methods: {
    createCoupon() {
      if (
        this.newCoupon.code &&
        this.newCoupon.limit &&
        this.newCoupon.startDate &&
        this.newCoupon.endDate &&
        this.newCoupon.discount
      ) {
        this.data.push({
          name: "Unknown", // Replace with actual user data
          takeDate: new Date().toLocaleDateString("en-US"),
          status: "Active",
          endDate: this.newCoupon.endDate,
          startDate: this.newCoupon.startDate,
          code: this.newCoupon.code,
          discount: this.newCoupon.discount,
        });
        this.resetForm();
      } else {
        alert("Please fill in all fields.");
      }
    },
    resetForm() {
      this.newCoupon = {
        code: "",
        limit: null,
        startDate: "",
        endDate: "",
        couponType: "string",
        discount: null,
      };
    },
    deleteCoupon(index) {
      this.data.splice(index, 1);
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
      this.data.sort((a, b) => {
        const valA = a[key].toString().toLowerCase();
        const valB = b[key].toString().toLowerCase();
        return valA < valB ? -this.sortOrder : valA > valB ? this.sortOrder : 0;
      });
    },
    sortArrow(key) {
      if (this.sortKey === key) {
        return this.sortOrder === 1 ? "↑" : "↓";
      }
      return "↑↓";
    },
  },
};
</script>

<style scoped>
.container {
  background: #fff;
  padding: 24px;
  font-family: "Segoe UI", sans-serif;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-input {
  margin-left: auto;
  flex-grow: 1;
  max-width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.remaining {
  background: #f44336;
  color: white;
  padding: 4px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.label {
  font-weight: 500;
}

.coupon-bar {
  padding: 15px;
  border: 1px solid #c6e1c6;
  border-radius: 6px;
  background-color: #f9fff9;
  margin-bottom: 20px;
}

.dat {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.form-group.buttons {
  flex-direction: row;
  align-items: center;
}

.input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 120px;
}

.input.put {
  max-width: 300px;
}

.input.small {
  width: 60px;
}

.select {
  background: white;
  cursor: pointer;
}

.btn {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f5f5f5;
  cursor: pointer;
  font-weight: bold;
}

.btn.undo {
  background: #eee;
}

.btn.create {
  background: #28a745;
  color: white;
  border: none;
}

.coupon-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  
}

.coupon-table th,
.coupon-table td {
  border-bottom: 1px solid #eee;
  padding: 10px;
  text-align: left;
  font-size: 14px;
}

.coupon-table th {
  cursor: pointer;
}

.sort-icon {
  color: #11131173;
}

.status {
  color: red;
  font-weight: bold;
}

.delete {
  width: 20px;
  height: 20px;
  background-color: #f2f2f2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
  text-align: center;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.pagination button {
  margin-left: 4px;
  border: 1px solid #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.pagination button.active {
  background: #28a745;
  color: white;
  border: none;
}
.wrapAction{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrapAction button{
  font-size: 1.1rem;
}

.is_active{
  background-color: royalblue;
  padding: 2px;
  color: white;
  font-size: smaller;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  width: 4rem;
}
.disable{
  background-color: rgb(244, 14, 41);
}

.use{
  color: #28a745;
}
.coming{
  color: cornflowerblue;
}

@media (max-width: 768px) {
  .top-bar,
  .dat {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input,
  .input.put {
    max-width: 100%;
  }
}
</style>