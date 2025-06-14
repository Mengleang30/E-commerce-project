<template>
  <div
    class="info-colored-detail"
    v-for="(info, index) in info_details"
    :key="index"
    :style="{ backgroundColor: info.bgColor_info }"
  >
    <div class="text-block">
      <div class="title-info">
        <span class="number-big">{{ info.amount }}</span>
        <span>{{ info.unit }}</span>
      </div>
      <div class="detail-info">
        <span>{{ info.amount_status1 }} {{ info.status1 }}</span>
        <span>{{ amount_status2(info) }} {{ info.status2 }}</span>
      </div>
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
  data() {
    return {
      info_details: [
        {
          amount: 50,
          unit: "Products",
          amount_status1: 20,
          status1: "In Stock",
          // amount_status2: amount_status2(),
          status2: "Out of Stock",
          img_block: products,
          bgColor_info: "#BAD8B6",
        },
        {
          amount: 5,
          unit: "Orders",
          amount_status1: 5,
          status1: "Completed",
          // amount_status2: amount_status2(),
          status2: "Pending",
          img_block: orders,
          bgColor_info: "#FFF2C2",
        },
        {
          amount: 5,
          unit: "Users",
          amount_status1: 3,
          status1: "Active",
          // amount_status2: amount_status2(),
          status2: "Inactive",
          img_block: users,
          bgColor_info: "#DBFFCB",
        },
        {
          amount: 5,
          unit: "Feedbacks",
          amount_status1: 2,
          status1: "Comment",
          // amount_status2: amount_status2(),
          status2: "Rating",
          img_block: feedbacks,
          bgColor_info: "#81E7AF",
        },
        {
          amount: 4,
          unit: "Coupons",
          amount_status1: 2,
          status1: "Active",
          // amount_status2: amount_status2(),
          status2: "Expired",
          img_block: coupons,
          bgColor_info: "#99BC85",
        },
        {
          amount: 1,
          unit: "Online Users",
          amount_status1: 1,
          status1: "Admin",
          // amount_status2: amount_status2(),
          status2: "Customer",
          img_block: online_users,
          bgColor_info: "#FFE893",
        },
      ],
    };
  },
  methods: {
    amount_status2(info) {
      return info.amount - info.amount_status1;
    },
  },
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
</style>
