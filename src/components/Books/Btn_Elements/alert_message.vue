<template>
      <div class="alert_successful">
        <span> Successfully added to cart</span>
        <img  src="https://img.icons8.com/flat-round/50/checkmark.png" alt="checkmark"/>
      </div>
</template>

<script setup>

</script>


<style >

.alert_successful{
  display: flex;
  position: absolute;
  color: rgba(39, 195, 15, 0.999);
  font-weight: bold;
  width: auto;
  padding: 5px;
  border-radius: .5rem;
  right: 1%;
  top: 1%;
  padding: 1px;
  font-size: .9rem;
  gap: 2px;
  transition: all 0.6s;
}

.alert_successful img{
  width: 1rem;
  height: 1rem;
}
.alert_successful .link_cart{
  font-weight: bold;
  color: royalblue;
}

</style>