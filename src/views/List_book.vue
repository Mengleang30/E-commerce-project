<script>
    import search_component from "../components/Books/search_component.vue";
    import list_book_panel from "../components/Books/list_book_panel.vue";
    export default {
        name: " list_book",
        components: {
            list_book_panel,
        }
    }

</script>

<template>
    <div class="main_panel">
        <list_book_panel/>
    </div>
</template>

<style scoped>
    .main_panel{
        display: flex;
    }
</style>