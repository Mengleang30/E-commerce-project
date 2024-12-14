import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [],
        newtIdUser: 1,
        loggedInUser: null,
    }),

    actions: {
        singUp(username, password, email) {
          console.log(this.users)
            const existingEmail = this.users.find((user) => user.email === email);
            if (existingEmail) {
                return { success: false, message: 'User already exists!' };
            }
            const newUser = {
                id: this.newtIdUser++,
                username,
                password,
                email,
                favorite: [],
                cart: [],
                history: []
            };
            this.users.push(newUser);
            return { success: true, message: 'Account created successfully!' };
        },

        signIn(email, password) {
            const currentUser = this.users.find((user) => user.email === email && user.password === password);
            if (currentUser) {
                this.loggedInUser = currentUser;
                return { success: true, message: `Welcome back, ${currentUser.username}!` };
            }
            return { success: false, message: 'Invalid credentials.' };
        },

        logout() {
            this.loggedInUser = null;
        }
    },
    
});
