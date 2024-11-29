<script>

export default {
    name: "Footer",

    data() {
        return {
            img_src: [
                "https://th.bing.com/th/id/OIP.Hp6EwayI_Y31g27vO3IjGwHaHa?w=198&h=198&c=7&r=0&o=5&dpr=2.3&pid=1.7",
                "https://th.bing.com/th/id/OIP.ZbQLwlzXJOyUcnyKf48rEQHaHl?w=198&h=203&c=7&r=0&o=5&dpr=2.3&pid=1.7",
                "https://th.bing.com/th/id/OIP.PonlIT-GEydycZXbE5_upgHaHa?w=199&h=199&c=7&r=0&o=5&dpr=2.3&pid=1.7",
                "https://th.bing.com/th/id/OIP.IKcfqoeAJdVG2m_HEGL8RAHaHa?w=200&h=200&c=7&r=0&o=5&dpr=2.3&pid=1.7",
            ]
        }
    }
}

</script>

<template>
    <footer class="footer">
        <hr>
            <img v-for="Iteam in img_src" :src=Iteam
                alt="footer">
    </footer>
</template>

<style>
.footer {
    padding: 5px;
    text-align: center;
}

.footer img {
    width: 20rem;
    height: 20rem;
    margin: 5px;
    box-shadow: 0px 4px 3px rgb(0, 0, 0, 20%);
    border-radius: .16rem;
    border: 2px solid rgb(136, 136, 136);
}
</style>
