<script>
import Book_Landing from '@/components/Books/Category_landing.vue';
import { useBookStore } from '@/stores';
export default {
    name: "Landing",

    components: {
        Book_Landing
    },

    setup() {
        const BookStore = useBookStore();

        return {
            BookStore,
        }
    }
}
</script>

<template>
    <div class="Landing">
        <Book_Landing />
    </div>

</template>

<style></style>