<script>
import My_Card_book from '@/components/Books/My_Card_book.vue';
export default {
    name : "Cart",
    components: {
        My_Card_book
    }

}

</script>

<template>
    <h2>My Cart</h2>
    <My_Card_book/>
</template>

<style scoped>
h2{
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    margin-top: 30px;
}

</style>