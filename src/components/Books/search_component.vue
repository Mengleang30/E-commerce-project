<script>
    export default{
        name : "search_component"
    }
</script>

<template>
    <!-- <h2>List book page</h2> -->
    <div class="search_main_panel">
        <div class="search_genre">
            <h2>Search by Genre</h2>
            <form action="" class="inputs-search">
                <div class="inp_opt">
                    <input type="checkbox" name="sci_fi" id="">
                    <label for="sci_fi">Science-Fiction</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="fantasty" id="">
                    <label for="fantasty">Fantasty</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="romance" id="">
                    <label for="romance">Romance</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="motivation" id="">
                    <label for="motivation">Motivation</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="mystery" id="">
                    <label for="mystery">Mystery</label>
                </div>
            </form>
        </div>
        <hr>
        <div class="search_num">
            <h2>Search by Year</h2>
            <input type="number" name="num_year" id="num_input" value="2024">
        </div>
        <hr>
        <div class="search_genre">
            <h2>Search by Language</h2>
            <form action="" class="inputs-search">
                <div class="inp_opt">
                    <input type="checkbox" name="khmer" id="">
                    <label for="khmer">Khmer</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="english" id="">
                    <label for="english">English</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="chinese" id="">
                    <label for="chinese">Chinese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="french" id="">
                    <label for="french">French</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="korean" id="">
                    <label for="korean">Korean</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="japanese" id="">
                    <label for="japanese">Japanese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="thai" id="">
                    <label for="thai">Thai</label>
                </div>
            </form>
        </div>
        <hr>
        <div class="search_num">
            <h2>Search by Price</h2>
            <input type="number" name="num_price" id="num_input" value="30">
        </div>
        <hr>
        <div class="search_genre">
            <h2>Search by Language</h2>
            <form action="" class="inputs-search">
                <div class="inp_opt">
                    <input type="checkbox" name="khmer" id="">
                    <label for="khmer">Khmer</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="english" id="">
                    <label for="english">English</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="chinese" id="">
                    <label for="chinese">Chinese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="french" id="">
                    <label for="french">French</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="korean" id="">
                    <label for="korean">Korean</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="japanese" id="">
                    <label for="japanese">Japanese</label>
                </div>
                <div class="inp_opt">
                    <input type="checkbox" name="thai" id="">
                    <label for="thai">Thai</label>
                </div>
            </form>
        </div>
        <button class="reset_btn">
            Reset Filter
        </button>
    </div>
</template>

<style>
    div{
        /* margin: 30px; */
        padding: 0;
    }
    hr{
        width: 85%;
        align-self: center;
    }
    .search_main_panel{
        height: 100%;
        margin: 30px;
        width: 30%;
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(to right, #bebebe, #FFFFFF); /*grey, white*/
        border: 1px solid;
        border-radius: 10px;
    }
    .search_genre{
        display: flex;
        flex-direction: column;
        margin: 30px;
    }
    .search_num{
        margin: 30px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .inputs-search{
        margin: 10px;
    }
    .inp_opt{
        display: flex;
        width: 150px;
        margin: 10px;
    }
    .inp_opt label{
        /*Add some space between checkbox and label */
        margin-left: 10px;
    }
    #num_input{
        font-size: 1.3rem;
        width: 100px;
        height: 50px;
        border: 1px solid;
        border-radius: 10px;
        padding: 5px;
    }
    .reset_btn{
        color: aliceblue;
        background-color: black;
        font-size: 1.3rem;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        padding: 15px;
        margin: 10px;
    }
    .reset_btn:hover{
        background-color: rgb(125, 125, 125);
        color: black;
    }
    .reset_btn:active{
        transform: translateY(5px);
    }
    button{
        cursor: pointer;
    }
</style>