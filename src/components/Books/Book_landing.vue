<script>
import Favorite_icons from './Fovite_icons.vue'
export default {
    name: "Book_landing",
    components: {
        Favorite_icons,
    },
    data() {
        return {
            Click_fav: false
        }
    },

    methods: {

        HandleClickFav() {
            this.Click_fav = !this.Click_fav
        }

    }
}
</script>

<template>
    <article class="Each_book">
        <Favorite_icons :Cliekd_favorite="Click_fav" @click="HandleClickFav" />
        <div class="each_book">
            <div class="wraping">
                <img src="https://th.bing.com/th/id/OIP.5IePslOy6hKU_yG6GhFVGAHaLf?w=119&h=185&c=7&r=0&o=5&dpr=2.3&pid=1.7"
                    alt="book">
                <h4>The 7 Habits of Highly Effective People®
                </h4>
                <span>Author | 2020</span>
                <span class="Category">
                    Category/Category/Category/Category/Category/dfai/dgajaj/daa
                </span>
            </div>
            <div class="price_btn">
                <h4 class="price">$9.00</h4>
                <button class="btn">Add To Cart</button>
            </div>
        </div>
    </article>
</template>
<style scoped>
.icons_love {
    width: 1.2rem;
    position: absolute;
    right: 2%;
    top: 2%;
    cursor: pointer;
}

.each_book img {
    width: 6rem;
}

.each_book {
    width: 12rem;
    padding: 5px;
    height: 18.6rem;
}

.Each_book {
    position: relative;
    font-size: 12px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 2px 2px rgb(0, 0, 0, 20%);
    border-radius: .1rem;
    outline: 1px solid rgb(221, 221, 221);
}

.wraping {
    display: flex;
    padding: 5px;
    flex-direction: column;
    align-items: center;
    height: auto;
    width: 100%;
}

.wraping h4 {
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 100%;
}

.Category {
    font-size: smaller;
    padding: 2px;
    height: 2rem;
    width: 100%;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Limit to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    /* Hide overflowing text */
}


.price_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
}

.price_btn .price {
    font-size: 1.4rem;
    font-weight: 500;

}

.price_btn .btn {
    background-color: rgba(27, 25, 156, 0.82);
    border: none;
    border-radius: .2rem;
    padding: 4px;
    cursor: pointer;
    color: white;
    width: 5rem;
    height: 2rem;
    font-size: 12px;
}

.price_btn .btn:hover {
    background-color: red;
}
</style>