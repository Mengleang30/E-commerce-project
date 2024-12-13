import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userInfo: null, 
        cart: [], 
        favorites: [], 
    }),
    actions: {
        
        setUser(user) {
            this.userInfo = user;
        },

        addToFavorites(itemId) {
            if (!this.favorites.includes(itemId)) {
                this.favorites.push(itemId);
            }
        },

        // Remove an item from favorites
        removeFromFavorites(itemId) {
            this.favorites = this.favorites.filter(id => id !== itemId);
        },

        // Toggle favorite status
        toggleFavorite(itemId) {
            if (this.favorites.includes(itemId)) {
                this.removeFromFavorites(itemId);
            } else {
                this.addToFavorites(itemId);
            }
        },
    },
});
