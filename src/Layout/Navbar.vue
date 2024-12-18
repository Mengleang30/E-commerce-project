<script>
export default {
    name: "Navbar",
    props : {
        Nav_name : String,
        Link : String,
        Image : String,
        isSelectRoute : Boolean,
        NavWithCart : String,
        NumberCart : Number
    },
}
</script>
<template>
    <nav>
        <ul>
            <RouterLink :class="{active : isSelectRoute}"  class="link" :to=Link>
                    <img :src="Image" alt="">
                    <span>{{ Nav_name }}</span>
                    <div class="Number_cart" v-if="NavWithCart=='Cart'">{{ NumberCart }}</div>
            </RouterLink>
        </ul>
    </nav>

</template>

<style>

.Number_cart{
    background-color: red;
    min-width: 2rem;
    height: 2rem;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: aliceblue;
}

</style>