<script>
import Book_landing from './Book_landing.vue';


export default {
    name: "Category_landing",
    components: {
        Book_landing
    }
}
</script>


<template>
    <div class="category_landing">
        <div class="wraping">
            <h4>Best Motivational</h4>
            <div class="wraping_arrow">
                <div class="left">&lt;</div>
                <div class="right">&gt;</div>
            </div>
        </div>
        <div class="contianer_book">
            <Book_landing />
            <Book_landing />
            <Book_landing />
            <Book_landing />
            <Book_landing />
            <Book_landing />
            <Book_landing />
        </div>
    </div>
</template>

<style>
.category_landing {
    height: auto;
    margin: 10px 0;
}

.category_landing .wraping {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
}

.wraping_arrow {
    display: flex;
    font-size: larger;
    gap: 10px;
}

.wraping_arrow .left,
.right {
    background-color: rgb(255, 255, 255);
    width: 1.6rem;
    height: 1.6rem;
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
}
.wraping_arrow .left:hover,
.right:hover {
    background-color: rgb(219, 255, 243);
   
}
.contianer_book {
    display: flex;
    padding: 2.6px;
    gap: 5px;
    overflow-x: auto;
    padding-bottom: .8rem;
}
::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
    height: 6px;
}
::-webkit-scrollbar-thumb {
    border-radius: .6rem;
    background-color: #7c7d7d; /* Color of the thumb */
    border: 2px solid transparent; /* Creates space around the thumb */
}
::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Darken thumb color on hover */
}

</style>