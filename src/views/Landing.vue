<script>
import Book_Landing from '@/components/Books/Category_landing.vue';

export default {
    name: "Landing",

    components: {
        Book_Landing
    }
}
</script>

<template>
    <div class="Landing">
        <h2>Landing page</h2>
        <Book_Landing />
        <Book_Landing />
        <Book_Landing />
        <Book_Landing />
        <Book_Landing />
    </div>

</template>

<style></style>