<script>
import { RouterLink } from 'vue-router';
export default {
    name: "Navbar"

}
</script>

<template>

    <nav>
        <ul>
            <li>
                <RouterLink  class="link" to="/">
                    Home
                </RouterLink>
            </li>
            <li>
                <RouterLink  class="link" to="/list-book">List_Books
                </RouterLink>
            </li>
            <li>

                <RouterLink  class="link" to="/cart">
                    Cart
                </RouterLink>
            </li>

            <li>
                <RouterLink  class="link" to="/favorite">
                    Favorite
                </RouterLink>
            </li>
            <li>
                <RouterLink  class="link" to="/feedback">
                    Feedback
                </RouterLink>
            </li>
            <li>
                <RouterLink  class="link" to="/login">
                    Login
                </RouterLink>
            </li>
            

        </ul>
    </nav>

</template>

<style>
nav {
    padding: .4rem;
    background-color: rgb(199, 199, 199);
    box-shadow: 0px 4px 3px rgb(0, 0, 0, 20%);
    position: absolute;
    left: 1rem;
    top: 3.4rem;
    width: 9.6rem;
    height: auto;
    
}

nav ul {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: .2rem;
}

nav ul li .link {
    text-decoration: none;
    color: black;
    background-color: rgba(248, 243, 243, 1);
    display: flex;
    height: 2rem;
    align-items: center;
    padding-left: 5px;
}
</style>