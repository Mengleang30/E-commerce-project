<template>
    <div class="main_container">
        <navBarComponent />
        <div class="sub-container">
            <admin_menu_component />
            <div class="add_product_form">
                <div class="header_form">
                    <button><img src="../../assets/back-svg.svg" width="20px" alt="">Back</button>
                    <h1>Add New Product</h1>
                </div>
                <form action="">

                </form>
            </div>
        </div>

    </div>
</template>

<script>

import admin_menu_component from "@/components/Admin/admin-components/admin-menu-component.vue";
import navBarComponent from "@/components/Admin/admin-components/navBar-component.vue";

export default {
    components: {
        adminMenuComponent: admin_menu_component,
        navBarComponent: navBarComponent,
    },
    name: "AdminAddProductForm",
    data() {
        return {
            // Define any data properties needed for the form
        };
    },
}

</script>