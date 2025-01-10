<script>
    import detail_book from "../Books/Detail_book.vue";
    export default {
        name: "list_book_panel",
        components: {
            detail_book,
        }
    }
</script>
<template>
    <div class="list_book_panel">
        <div class="filter_factors"></div>
        <div class="render_book">
            <detail_book/>
        </div>
    </div>
</template>