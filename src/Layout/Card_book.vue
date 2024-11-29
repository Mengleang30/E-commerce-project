<script>
export default {
    name: "Card_book"
}
</script>

<template>
    <div class="card">
        <article class="article">
            <h4>The 7 Habits of Highly Effective People®</h4>
            <p>These seven habits guide individuals in developing
                discipline, integrity, and emotional intelligence, ultimately
                leading to fulfilling and successful relationships and achievements.
            </p>
            <button>Buy Now</button>
        </article>
        <img src="https://th.bing.com/th/id/R.241d77e83e757b349dc5393cfb543151?rik=atrj7tViVkX%2bmg&pid=ImgRaw&r=0"
            alt="">
    </div>
</template>

<style>
.card img {
    width: 10rem;
    box-shadow: 2px 4px 2px rgb(0, 0, 0, 20%);
}

.card .article {
    display: inline;
    padding-top: 10px;
    height: auto;
    line-height: 1.5rem;
}

.card .article p {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 6rem;
}
.card .article h4{
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 1.6rem;
}

.card .article button{
    border: none;
    width: 5rem;
    border-radius: .16rem;
    height: 2rem;
    background-color: aliceblue;
    margin-top: 10px;
    outline: 1px solid rgb(255, 255, 255);
    cursor: pointer;
}

.card {
    display: flex;
    padding: 16px 30px;
    justify-content: center;
    min-height: 16rem;
    width: 50rem;
    box-shadow: 0px 4px 2px rgb(0, 0, 0, 20%);
    background:linear-gradient(to right ,
    rgba(135, 161, 174, 1) 29%,
    rgba(217, 217, 217, 1) 81%
    );
    color: white;
    border-radius: .4rem;
}
</style>