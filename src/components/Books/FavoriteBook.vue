<script setup> 
</script>

<template>
    <article>
        <div class="favorites">
            <h2>My Favourite</h2>
    <div class="book-list">
        <!-- Book Card Example -->
        <div class="book-card">
            <img src="https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UF1000,1000_QL80_.jpg" alt="Ikigai Book" class="book-image">
            <div class="book-content">
                <h3 class="book-title">Ikigai: The Japanese...</h3>
                <p class="book-price">$13.29</p>
                <a href="#" class="book-edition">Hardcover Edition</a>
            </div>
            <div class="book-actions">
                <button class="delete-btn" title="Delete">🗑️</button>
                <button class="add-btn" title="Add">➕</button>
            </div>
        </div>
                <div class="book-card">
                    <img src="https://m.media-amazon.com/images/I/61MQQcGSsgL._AC_UF1000,1000_QL80_.jpg" alt="You Got This Book" class="book-image">
                    <div class="book-content">
                        <h3 class="book-title">You got this: 90...</h3>
                        <p class="book-price">$ 10.99</p>
                        <a href="#" class="book-edition">Hardcover Edition</a>
                    </div>
                    <div class="book-actions">
                        <button class="delete-btn" title="Delete">🗑️</button>
                        <button class="add-btn" title="Add">➕</button>
                    </div>
                </div>
                <div class="book-card">
                    <img src="https://m.media-amazon.com/images/I/61EuEW9rABL._AC_UF894,1000_QL80_.jpg" alt="Good Vibes Book" class="book-image">
                    <div class="book-content">
                        <h3 class="book-title">Good vibes, goo....</h3>
                        <p class="book-price">$ 11.07</p>
                        <a href="#" class="book-edition">Hardcover Edition</a>
                    </div>
                    <div class="book-actions">
                        <button class="delete-btn" title="Delete">🗑️</button>
                        <button class="add-btn" title="Add">➕</button>
                    </div>
                </div>
                <div class="book-card">
                    <img src="https://m.media-amazon.com/images/I/81FA3MNp3iL._UF1000,1000_QL80_.jpg" alt="Motivation Book" class="book-image">
                    <div class="book-content">
                        <h3 class="book-title">Motivation: Special....</h3>
                        <p class="book-price">$ 11.97</p>
                        <a href="#" class="book-edition">Hardcover Edition</a>
                    </div>
                    <div class="book-actions">
                        <button class="delete-btn" title="Delete">🗑️</button>
                        <button class="add-btn" title="Add">➕</button>
                    </div>
                </div>
                <div class="book-card">
                    <img src="https://m.media-amazon.com/images/I/81ANaVZk5LL._SL1500_.jpg" alt="Atomic Habits Book" class="book-image">
                    <div class="book-content">
                        <h3 class="book-title">Atomic Habits</h3>
                        <p class="book-price">$ 15.99</p>
                        <a href="#" class="book-edition">Hardcover Edition</a>
                    </div>
                    <div class="book-actions">
                        <button class="delete-btn" title="Delete">🗑️</button>
                        <button class="add-btn" title="Add">➕</button>
                    </div>
                </div>
            </div>
            <button class="add-product-btn">Add product</button>
            <div class="social-share">
        <span>Share on:</span>
        <div class="social-icons">
            <a href="#" title="Facebook">📘</a>
            <a href="#" title="Twitter">🐦</a>
            <a href="#" title="Telegram">📲</a>
            <a href="#" title="Pinterest"></a>
            <a href="#" title="WhatsApp">💬</a>
            </div>
            </div>
        </div>
    </article>
</template>

<style>

.favorites {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #f3eded;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(245, 244, 244, 0.1);
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}


.book-list {
    max-height: 400px;
    overflow-y: auto; /* Enables vertical scrolling */
    padding-right: 10px; /* Prevents scrollbar overlap with content */
    scrollbar-width: thin;
    scrollbar-color: #bbb #f0f0f0;
}


.book-list::-webkit-scrollbar {
    width: 8px;
}
.book-list::-webkit-scrollbar-thumb {
    background: #bbb;
    border-radius: 4px;
}
.book-list::-webkit-scrollbar-thumb:hover {
    background: #888;
}

.book-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px; /* Inside card spacing */
    margin-bottom: 15px; /* Spacing between cards */
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.book-card:last-child {
    border-bottom: none;
}

.book-image {
    height: 60px;
    width: auto;
    border-radius: 5px;
    margin-right: 10px;
}

.book-content {
    flex-grow: 1;
    margin-right: 10px; /* Adds space between content and buttons */
}

.book-title {
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.book-price {
    color: #333;
    font-size: 13px;
    margin: 4px 0;
}

.book-edition {
    font-size: 12px;
    color: #007BFF;
    text-decoration: none;
}

.book-edition:hover {
    text-decoration: underline;
}


.book-actions {
    display: flex;
    flex-direction: column;
    gap: 15px; 
}

button {
    background: rgb(248, 247, 247);
    border: rgb(243, 233, 233);
    cursor: pointer;
    font-size: 16px;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.delete-btn:hover {
    background-color: #f8d7da;
    color: #c82333;
}

.add-btn:hover {
    background-color: #d4edda;
    color: #218838;
}


.add-product-btn {
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.add-product-btn:hover {
    background-color: #333;
}

.social-share {
    text-align: center;
    margin-top: 20px;
}

.social-share .social-icons a {
    margin: 12px;
    font-size: 20px;
    color: #333;
    text-decoration: none;
}

.social-share .social-icons a:hover {
    color: #dadfe4;
}
</style>