<script>
import Navbar from './Navbar.vue';
import { ref } from 'vue';



export default {
    name: "Header",
    components: {
        Navbar
    },

    setup() {
        const isNavbarVisible = ref(false)
        const toggleNavbar = () => {
           
            isNavbarVisible.value = !isNavbarVisible.value;
        };

        return {
            isNavbarVisible,
            toggleNavbar
            
        };
    },



}
</script>

<template>

    <header>
        <div class="option" @click="toggleNavbar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <h3 class="title">Book Store</h3>
        </div>
        <Navbar v-if="isNavbarVisible" />

        <div class="search_form">
            <input type="text" placeholder="Search Book here...">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>

        <div class="cart_sign_in">
            <div class="header_cart">
                <div class="number_cart">1</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path
                        d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 
                    .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358
                     60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 
                     2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
            </div>
            <div class="sign_in">
                Sign In
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 
                14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>


            </div>
        </div>


    </header>

</template>

<style>
header {
    background-color: rgb(211, 211, 211);
    display: flex;
    height: 5rem;
    align-items: center;
    position: sticky;
    top: 0;
    padding: 1rem;
    column-gap: 1rem;
    justify-content: space-between;
}

header svg {
    width: 2rem;
    background-color: transparent;
}

.search_form {
    width: 50%;
}

.search_form,
.option {
    display: flex;
    align-items: center;
    position: relative;

}

.title,
::placeholder {
    text-shadow: 0px 4px 2px rgb(0, 0, 0, 20%);

}

::placeholder {
    font-size: .9rem;
    font-family: 'Times New Roman', Times, serif;
}

.search_form input,
button {
    height: 2.5rem;
    outline: 1px solid rgba(0, 0, 0, 0.3);
    border: none;
    box-shadow: 0px 4px 3px rgb(0, 0, 0, 20%);
}

.search_form button {
    position: absolute;
    right: 0;
    width: 2.8rem;
    padding: .1rem;
    border-radius: 0 0.6rem .6rem 0;
    background-color: rgba(237, 237, 237, 1);
    cursor: pointer;

}

.search_form button svg {
    width: 1.5rem;
}

.search_form input {
    outline: 1px solid rgb(132, 132, 132);
    border-radius: .6rem;
    padding-left: .6rem;
    width: 100%;
}

header .header_cart {
    position: relative;
}

header .header_cart svg {
    color: green;
}

header .number_cart {
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: .8rem;
    font-size: .6rem;
    height: .8rem;
    color: aliceblue;
    padding: .05rem;
    position: absolute;
    right: 0;
    box-shadow: 3px 3px 3px rgb(0, 0, 0, 20%);
}

.sign_in {
    display: flex;
    align-items: center;
    background-color: white;
    padding: .25rem;
    border-radius: .4rem;
    box-shadow: 3px 3px 3px rgb(0, 0, 0, 20%);
}

.sign_in svg {
    width: 1.6rem;
    cursor: pointer;
}

.cart_sign_in {
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
}

.option,
.header_cart,
.sign_in {
    cursor: pointer;
}
</style>