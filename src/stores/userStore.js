import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/init.js';

export const useUserStore = defineStore('user-store', {
    state: () => {
        return {
            signUpError: '',
            loggedIn: false,
            signInError: ''
        }
    },
    getters: {
        // Getters
        getSignUpError: (state) => state.signUpError,
        getIsLoggedIn: (state) => state.loggedIn,
        getSignInError: (state) => state.signInError,
    },
    actions: {
        async userSignUp(signUpObj) {
            // Sign up a new user
            createUserWithEmailAndPassword(auth, signUpObj.email, signUpObj.password)
                .then((userCredential) => {
                    // User signed up successfully
                    this.loggedIn = true;
                    this.signUpError = '';
                })
                .catch((error) => {
                    console.log("Error Code: " + error.code + " with Message: " + error.message);
                    // Handle sign-up error
                    this.signUpError = error.message;
                    this.loggedIn = false;
                });
        },
        async userSignIn(signInObj) {
            // Sign in an existing user
            signInWithEmailAndPassword(auth, signInObj.email, signInObj.password)
                .then((userCredential) => {
                    // User signed in successfully
                    this.loggedIn = true;
                    this.signInError = '';
                })
                .catch((error) => {
                    console.log("Error Code: " + error.code + " with Message: " + error.message);
                    // Handle sign-in error
                    this.signInError = error.message;
                    this.loggedIn = false;
                });
        },
        logout() {
            // Log out the user and reset state
            signOut(auth)
                .then(() => {
                    // Successfully signed out
                    this.loggedIn = false;
                    this.signUpError = '';
                    this.signInError = '';
                })
                .catch((error) => {
                    console.log("Error signing out: " + error.message);
                });
        }
    }
});
