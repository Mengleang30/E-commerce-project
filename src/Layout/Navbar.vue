<script>
import {useNotification} from '@/stores/notification';
import { computed } from 'vue';
export default {
    name: "Navbar",
    props : {
        Nav_name : String,
        Link : String,
        Image : String,
        isSelectRoute : Boolean,
        NavWithCart : String,
        NumberCart : Number,
        number_notice : Number

    },
    setup() {
      
    }
}
</script>
<template>
    <nav>
        <ul>
            <RouterLink :class="{active : isSelectRoute}"  class="link" :to=Link>
                    <img :src="Image" alt="">
                    <span>{{ Nav_name }}</span>
                    <div class="Number_cart" v-if="NavWithCart=='Cart'">{{ NumberCart }}</div>
                    <div class="Number_notice" v-if="NavWithCart=='Notification'">{{ number_notice }}</div>
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
.Number_notice{
    background-color: rgb(231, 229, 226);
    min-width: 2rem;
    height: 2rem;
    padding: 2px;
    display: flex;
    justify-content: center;
    color: blue;
    text-decoration: none;
    align-items: center;
    border-radius: 30%;
}
</style>