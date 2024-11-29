<script>
export default {
    name: "Navbar",
    props : {
        Nav_name : String,
        Link : String,
        Image : String,
        isSelectRoute : Boolean
    }
}
</script>
<template>
    <nav>
        <ul>
            <li>
                <RouterLink :class="{active : isSelectRoute}"  class="link" :to=Link>
                    <img :src="Image" alt="">
                    {{ Nav_name }}
                </RouterLink>
            </li>
        </ul>
    </nav>

</template>