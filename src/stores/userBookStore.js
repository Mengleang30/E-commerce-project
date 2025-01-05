import { defineStore } from "pinia";



export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    nextIdUser: 1,
    loggedInUser: null,
    nextPurchaseId: 100,
  }),

  actions: {
    signUp(username, password, email) {
      const existingEmail = this.users.find((user) => user.email === email);
      if (existingEmail) {
        return { success: false, message: "User already exists!" };
      }
      const newUser = {
        id: this.nextIdUser++,
        username,
        password,
        email,
        favorite: [],
        cart: [],
        bought: [],
        history: [],
      };
      this.users.push(newUser);
      return { success: true, message: "Account created successfully!" };
    },

    signIn(email, password) {
      const currentUser = this.users.find(
        (user) => user.email === email && user.password === password
      );
      if (currentUser) {
        this.loggedInUser = currentUser;
        return {
          success: true,
          message: `Welcome back, ${currentUser.username}!`,
        };
      }
      return { success: false, message: "Invalid credentials." };
    },

    // logout 
    logout() {
      this.loggedInUser = null;
    },

    addToFavorite(bookId) {
      if (!this.loggedInUser) {
        return { success: false, message: "You must be logged in to add favorites." };
      }

      const isFavorite = this.loggedInUser.favorite.includes(bookId);

      if (isFavorite) {
        // Remove from favorites
        this.loggedInUser.favorite = this.loggedInUser.favorite.filter(
          (id) => id !== bookId
        );
        return { success: true, message: "Book removed from favorites." };
      } else {
        // Add to favorites
        this.loggedInUser.favorite.push(bookId);
        return { success: true, message: "Book added to favorites." };
      }
    },

    addToCart(bookId, quantity) {
      if (!this.loggedInUser) {
        return { success: false, message: "You must be logged in to add items to your cart." };
      }

      const existingItem = this.loggedInUser.cart.find((item) => item.bookId === bookId);

      if (existingItem) {
        // Update the quantity if the book already exists in the cart
        existingItem.quantity += quantity;
        return { success: true, message: `Updated the quantity of book ID ${bookId} in your cart.` };
      }

      // Add a new book to the cart
      this.loggedInUser.cart.push({ bookId, quantity });
      return { success: true, message: `Added book ID ${bookId} to your cart.` };
    },

    increaseQuantity(bookId) {
      if (!this.loggedInUser) return;
      const cartItem = this.loggedInUser.cart.find((item) => item.bookId === bookId);
      if (cartItem) {
        cartItem.quantity += 1; 
      }
    },
    
    decreaseQuantity(bookId) {
      if (!this.loggedInUser) return;
      const cartItem = this.loggedInUser.cart.find((item) => item.bookId === bookId);
      if (cartItem.quantity > 0) {
        cartItem.quantity -= 1; 
      // } else if (cartItem) {
      //   // Optionally remove item if quantity reaches 0
      //   this.loggedInUser.cart = this.loggedInUser.cart.filter((item) => item.bookId !== bookId);
      // }
      }
    },

    updateCartQuantity(bookId, newQuantity) {
      if (!this.loggedInUser) return;
  
      const cartItem = this.loggedInUser.cart.find(item => item.bookId === bookId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
      }
    },

    removeCarted(Id){
      this.loggedInUser.cart = this.loggedInUser.cart.filter((item) => item.bookId !== Id);

    },
  
    handleBuy () {
      if (!this.loggedInUser || this.loggedInUser.cart.length === 0) {
        return { success: false, message: "No items in the cart to purchase." };
      }
    
      // Combine books by `bookId` for the purchase
      const purchaseSummary = this.loggedInUser.cart.reduce((summary, item) => {
        const existingItem = summary.find((entry) => entry.bookId === item.bookId);
        if (existingItem) {
          // Combine quantities if the book is already in the summary
          existingItem.quantity += item.quantity;
        } else {
          // Add new entry if the book is not in the summary
          summary.push(
            {
            bookId: item.bookId,
            quantity: item.quantity,
            purchaseId: this.nextPurchaseId++, // Unique purchase ID
            purchaseDate: new Date().toISOString(),
          }
        );
        }
        return summary;
      }, []);
    
      // Add combined purchases to the bought list
      this.loggedInUser.bought.push(...purchaseSummary);
    
      // Clear the cart after purchase
      this.loggedInUser.cart = [];
    
      console.log("Purchase summary:", purchaseSummary);
    
      return {
        success: true,
        message: "Purchase successful!",
      };
     
    },

    addInvoiceToHistory (){

    },
    clearInvoive(){
     
      if(!this.loggedInUser || this.loggedInUser.bought.length ===0){
        return {success : false, message : "No invoice to clear"};

      }
      this.loggedInUser.history.push(...this.loggedInUser.bought);
      this.loggedInUser.bought = [];
      return { success: true, message: "Invoices cleared and added to history." };
    },
    clearCart() {
      this.loggedInUser.cart = []
    }
    
  },

 

 
});
