<script>
export default {
    name: "Card_book",

    data() {
        return {
            Card_data: [
                {

                    title: "The 7 Habits of Highly Effective People®",
                    description: `These seven habits guide individuals in developing
                discipline, integrity, and emotional intelligence, ultimately
                leading to fulfilling and successful relationships and achievements.`,
                    book_img: "https://th.bing.com/th/id/R.241d77e83e757b349dc5393cfb543151?rik=atrj7tViVkX%2bmg&pid=ImgRaw&r=0"

                },
                {

                    title: "The Secret",
                    description: `The Secret by Rhonda Byrne is a self-help book that explores the concept of the law of attraction, 
                    which suggests that our thoughts and beliefs can shape our reality. Byrne emphasizes that positive
                     thinking, visualization, and gratitude are key to attracting success, health, happiness, and other 
                     desires into one’s life.`,
                    book_img: "https://th.bing.com/th/id/OIP.ulGjOz3ZlaFmtAot7UKBGQHaJV?w=138&h=180&c=7&r=0&o=5&dpr=2.3&pid=1.7"

                },
                {

                    title: "The Magic",
                    description: `In The Magic, Rhonda Byrne reveals life-changing knowledge about the power of gratitude that was hidden within a 2,000-year-old sacred text. 
                    Then, on an incredible 28-day journey, she teaches you how to apply this life-changing knowledge in your everyday life, completely transforming every aspect of your life into joy.`,
                    book_img: "https://th.bing.com/th/id/OIP.5IePslOy6hKU_yG6GhFVGAHaLf?w=119&h=185&c=7&r=0&o=5&dpr=2.3&pid=1.7"

                },
            ],

            current_index: 0,
        }
    },
    methods: {
        nextCard() {
            this.current_index = (this.current_index + 1) % this.Card_data.length
        },
        previousCard() {
            this.current_index = (this.current_index - 1 + this.Card_data.length) % this.Card_data.length;
        }
    },


}
</script>

<template>
    <div class="card">
        <div class="wrap_arrow">
            <div @click="previousCard" class="left">&lt;</div>
            <div @click="nextCard" class="right">&gt;</div>
        </div>
        <article class="article">
            <h4>{{ Card_data[current_index].title }}</h4>
            <p> {{ Card_data[current_index].description }} </p>
            <button>View Now</button>
        </article>
        <img :src="Card_data[current_index].book_img" alt="books">
    </div>
</template>

<style>
.card {
    display: flex;
    padding: 16px 30px;
    justify-content: center;
    height: 16rem;
    width: 50rem;
    box-shadow: 0px 4px 2px rgb(0, 0, 0, 20%);
    background: linear-gradient(to right,
            rgba(135, 161, 174, 1) 29%,
            rgba(217, 217, 217, 1) 81%);
    color: white;
    border-radius: .4rem;
    position: relative;
    z-index: 120;
}

.wrap_arrow {
    position: absolute;
    width: 100%;
    top: 50%;
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
}

.card img {
    width: 10rem;
    box-shadow: 2px 4px 2px rgb(0, 0, 0, 20%);
}

.left,
.right {
    background-color: transparent;
    width: 2rem;
    height: 2rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: rgb(13, 13, 13);
    font-weight: bold;
    box-shadow: 2px 4px 2px rgb(0, 0, 0, 20%);
    cursor: pointer;
}

.left {
    top: 50%;
    left: 4%;
}

.right {
    top: 50%;
    right: 0%;
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

.card .article h4 {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 100%;
    height: 1.6rem;
}

.card .article button {
    border: none;
    width: 5rem;
    border-radius: .16rem;
    height: 2rem;
    background-color: aliceblue;
    margin-top: 10px;
    margin-left: 2rem;
    outline: 1px solid rgb(255, 255, 255);
    cursor: pointer;
}
</style>