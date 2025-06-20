import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [],
    nextIdUser: 1,
    loggedInUser: JSON.parse(localStorage.getItem('loggedInUser')) || null,
    nextPurchaseId: 100,
    backendUrl: "http://localhost:8200",
  }),

  actions: {
    // signUp(username, password, email) {
    //   const existingEmail = this.users.find((user) => user.email === email);
    //   if (existingEmail) {
    //     return { success: false, message: "User already exists!" };
    //   }
    //   const newUser = {
    //     id: this.nextIdUser++,
    //     username,
    //     password,
    //     email,
    //     favorite: [],
    //     cart: [],
    //     bought: [],
    //     history: [],
    //   };
    //   this.users.push(newUser);
    //   return { success: true, message: "Account created successfully!" };
    // },
    async signUp(userData) {
      try {
        await axios.get(`${this.backendUrl}/sanctum/csrf-cookie`);
        const res = await axios.post(`${this.backendUrl}/api/register`, {
          name: userData.username,
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.password_confirmation,
        }, {
          withCredentials: true,

        });
        console.log("Registration response:", res.data);
        return {
          success: true,
          message: `Account created successfully! Welcome, ${userData.email}!`,
        };
      }
      catch (error) {
        console.error("Registration error:", error);
        return {
          success: false,
          message: "Registration failed. Please try again.",
        };
      }
      
    },


    signIn(email, password) {
      const currentUser = this.users.find(
        (user) => user.email === email && user.password === password
      );
      if (currentUser) {
        this.loggedInUser = currentUser;

        // Store user info in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
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
        return {
          success: false,
          message: "You must be logged in to add favorites.",
        };
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
        return {
          success: false,
          message: "You must be logged in to add items to your cart.",
        };
      }

      const existingItem = this.loggedInUser.cart.find(
        (item) => item.bookId === bookId
      );

      if (existingItem) {
        // Update the quantity if the book already exists in the cart
        existingItem.quantity += quantity;
        return {
          success: true,
          message: `Updated the quantity of book ID ${bookId} in your cart.`,
        };
      }

      // Add a new book to the cart
      this.loggedInUser.cart.push({ bookId, quantity });
      return {
        success: true,
        message: `Added book ID ${bookId} to your cart.`,
      };
    },

    increaseQuantity(bookId) {
      if (!this.loggedInUser) return;
      const cartItem = this.loggedInUser.cart.find(
        (item) => item.bookId === bookId
      );
      if (cartItem) {
        cartItem.quantity += 1;
      }
    },

    decreaseQuantity(bookId) {
      if (!this.loggedInUser) return;
      const cartItem = this.loggedInUser.cart.find(
        (item) => item.bookId === bookId
      );
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

      const cartItem = this.loggedInUser.cart.find(
        (item) => item.bookId === bookId
      );
      if (cartItem) {
        cartItem.quantity = newQuantity;
      }
    },

    removeCarted(Id) {
      this.loggedInUser.cart = this.loggedInUser.cart.filter(
        (item) => item.bookId !== Id
      );
    },

    handleBuy() {
      if (!this.loggedInUser || this.loggedInUser.cart.length === 0) {
        return { success: false, message: "No items in the cart to purchase." };
      }

      // Combine books by bookId for the purchase
      const purchaseSummary = this.loggedInUser.cart.reduce((summary, item) => {
        const existingItem = summary.find(
          (entry) => entry.bookId === item.bookId
        );
        if (existingItem) {
          // Combine quantities if the book is already in the summary
          existingItem.quantity += item.quantity;
        } else {
          // Add new entry if the book is not in the summary
          summary.push({
            bookId: item.bookId,
            quantity: item.quantity,
            purchaseId: this.nextPurchaseId++, // Unique purchase ID
            purchaseDate: new Date().toLocaleString(),
          });
        }
        return summary;
      }, []);

      // Add combined purchases to the bought list
      this.loggedInUser.bought.push(...purchaseSummary);

      // Clear the cart after purchase
      this.loggedInUser.cart = [];

      return {
        success: true,
        message: "Purchase successful!",
      };
    },

    addInvoiceToHistory() {},
    clearInvoive() {
      if (!this.loggedInUser || this.loggedInUser.bought.length === 0) {
        return { success: false, message: "No invoice to clear" };
      }

      const EachHistory = {
        id: this.purchaseId++,
        item: [...this.loggedInUser.bought],
      };
      this.loggedInUser.history.push(EachHistory);
      // const EachHistory = {
      //   ...this.loggedInUser.bought,
      // }
      console.log("History ", this.loggedInUser.bought);
      this.loggedInUser.bought = [];
      return {
        success: true,
        message: "Invoices cleared and added to history.",
      };
    },
    clearCart() {
      this.loggedInUser.cart = [];
    },
  },
});
