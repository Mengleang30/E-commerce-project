<template>
  <div
    class="info-colored-detail"
    v-for="(info, index) in info_details"
    :key="index"
    :style="{ backgroundColor: info.bgColor_info }"
  >
  
  
    <div class="text-block">
      <RouterLink :to="info.link" class="link">
        <div class="title-info">
        <span class="number-big">{{ info.amount }}</span>
        <span>{{ info.unit }}</span>
      </div>
      <div class="detail-info">
        <span>{{ info.amount_status1 }} {{ info.status1 }}</span>
        <span>{{ info.amount_status2 }} {{ info.status2 }}</span>
      </div>
      </RouterLink>
      
    </div>
    <img :src="info.img_block" alt="" width="100px" />
  </div>
</template>

<script>
import products from "@/assets/icons_nav/product.png";
import orders from "@/assets/order_icon.png";
import users from "@/assets/user_icon.png";
import feedbacks from "@/assets/icons_nav/feedback.png";
import coupons from "@/assets/coupon_icon.png";
import online_users from "@/assets/clock_online_user.png";

import useBooks from "@/stores/books";
import { computed, onMounted } from "vue";
import useOrder from "@/stores/order";
import useAdminOrder from "@/stores/adminFeature/adminOrder";
import useUseManagement from "@/stores/adminFeature/adminUserManagement";
import usePromotion from "@/stores/promotion";
import useAdminPromotion from "@/stores/adminFeature/AdminPromotion";

export default {
  name: "InfoColoredComponent",
  props: {
    amount: Number,
    unit: String,
    amount_status1: Number,
    status1: String,
    // amount_status2: Number,
    status2: String,
    img_block: String,
    bgColor_info: String,
  },

  setup(){
    
    const booksStore = useBooks();
    const useOrders = useAdminOrder();
    const useUser = useUseManagement();


   
    const listProducts = computed(() => {
      return booksStore.books.length;
    });

    // Count total quantity of all books
    const countAllQuantity = computed(() => {
      return booksStore.books.reduce((total, book) => total + book.quantity, 0);
    });

    const showBookLowStock = computed(() => {
      return booksStore.books.filter(book => book.quantity < 5);
    });

   

    // console.log("List of products:", useOrders.countOrders);

    const AllQuantity = computed(() => {
      return booksStore.books.reduce((total, book) => total + book.quantity, 0);
    });

    const countOrder = computed(() => {
      return useOrders.order_list.length;
    });

    const countOrderCompleted = computed(() => {
      return useOrders.order_list.filter(order => order.status === 'completed').length;
    });
    console.log("countOrderCompleted:", countOrderCompleted.value);
    const countOrderPending = computed(() => {
      return useOrders.order_list.filter(order => order.status === 'pending').length;
    });

    const usePromotions = useAdminPromotion();

    const countCoupons = computed(() => {
      return usePromotions.coupons.length;
    });

    // console.log("countCoupons:", countCoupons.value);
    const countCouponsActive = computed(() => {
      return usePromotions.coupons.filter(coupon => coupon.is_active = true).length;
    });
    const countCouponsExpired = computed(() => {
      return usePromotions.coupons.length - countCouponsActive.value;
    });

     // Count all users

    const allUser = computed(() => {
      return useUser.users.length;
    });

    onMounted(()=>{
      useOrders.fetchOrderList();
      useUser.fetchUser();
      usePromotions.fetchCoupons();
      
    })

    const info_details = computed(()=> [
        {
          amount: listProducts.value,
          unit: "Products",
          amount_status1: AllQuantity.value,
          status1: "In Stock",
          amount_status2: "",
          status2: "Out of Stock",
          img_block: products,
          bgColor_info: "#BAD8B6",
          link: "admin/all-products"
        },
        {
          amount: countOrder.value,
          unit: "Orders",
          amount_status1: countOrderCompleted.value,
          status1: "Completed",
          amount_status2: countOrderPending.value,
          status2: 1,
          status2: "Pending",
          img_block: orders,
          bgColor_info: "#FFF2C2",
           link: "admin/Order-products"
        },
        {
          amount: allUser.value,
          unit: "Users",
          amount_status1: allUser.value,
          status1: "Active",
          amount_status2: 2,
          status2: "Inactive",
          img_block: users,
          bgColor_info: "#DBFFCB",
           link: "admin/all-users"
        },
        {
          amount: 5,
          unit: "Feedbacks",
          amount_status1: 2,
          status1: "Comment",
          amount_status2: 2,
          status2: "Rating",
          img_block: feedbacks,
          bgColor_info: "#81E7AF",
        },
        {
          amount: countCoupons.value,
          unit: "Coupons",
          amount_status1: countCouponsActive.value,
          status1: "Active",
          amount_status2: countCouponsExpired.value,
          status2: "Expired",
          img_block: coupons,
          bgColor_info: "#99BC85",
          link: "admin/promotion"
        },
        {
          amount: 1,
          unit: "Online Users",
          amount_status1: 1,
          status1: "Admin",
          amount_status2: 2,
          status2: "Customer",
          img_block: online_users,
          bgColor_info: "#FFE893",
        },
      ]);
    

    // console.log("countOrder:", countOrder.value);

    

  
    // console.log("Total quantity of books:", AllQuantity.value);  

    // You can use booksStore to access the store's state or actions if needed
    // For example: console.log(booksStore.books);
    return { 
      info_details,
      booksStore,
      listProducts,
      AllQuantity,
      countOrder,
      allUser,
      countOrderCompleted,
      countOrderPending,
      useOrders,
      countCoupons,
      countAllQuantity
      
    
     };

  },
  // methods: {
  //   amount_status2(info) {
  //     return info.amount - info.amount_status1;
  //   },
  // },
};
</script>

<style scoped>
.info-colored-detail {
  min-height: 200px;
  /* min-width: 200px; */
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
}
.text-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 140px;
}
.title-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  width: 100%;
}
.number-big {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  height: 55px;
}
.detail-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #555;
}
.info-colored-detail {
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  padding: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  transition: all 0.3s ease-in-out;
}

/* Wrap the whole grid if you haven't already */
:deep(.info-colored-wrapper) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  width: 100%;
}

/* Image inside each block */
.info-colored-detail img {
  width: 100px;
  height: auto;
}

/* Text block */
.text-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 140px;
  flex: 1;
  text-align: center;
}

/* Title with amount and unit */
.title-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Big number */
.number-big {
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 1.2;
}

/* Detail section (status) */
.detail-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  color: #555;
}
.link{
  text-decoration: none;
}

/* Responsive Tweaks */
@media (max-width: 768px) {
  .info-colored-detail {
    flex-direction: column;
    text-align: center;
  }

  .info-colored-detail img {
    width: 80px;
  }

  .number-big {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .title-info {
    font-size: 1.2rem;
  }

  .number-big {
    font-size: 1.8rem;
  }

  .detail-info {
    font-size: 0.9rem;
  }
}

</style>
