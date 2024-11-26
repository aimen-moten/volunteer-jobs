<template>
    <div> <!-- v-show attribute based on showSignIn -->
      <!-- User already has an account and can just sign in -->
      <div v-if="!getIsLoggedIn">
        <SignInForm @signIn="signIn" />
        <div>
          <p v-if="getSignInError !== ''">{{ getSignInError }}</p> <!-- Display error message if signInError is not empty -->
        </div>
      </div>
      <hr id="horizontalLine" />
      <h4>New to Carnival Festival?</h4>
      <button @click="toggleShowSignUp">Sign Up</button> <!-- Button to switch to Sign Up form -->
    </div>
    
    <div> <!-- v-show attribute based on showSignUp -->
      <!-- User needs to sign up for an account -->
      <div v-if="!getIsLoggedIn">
        <SignUpForm @signUp="signUp" />
        <div>
          <p v-if="getSignUpError !== ''">{{ getSignUpError }}</p> <!-- Display error message if signUpError is not empty -->
        </div>
      </div>
      <hr id="horizontalLine" />
      <div class="sideByside">
        <p>Already have an account?</p>
        <a href="#" @click="toggleShowSignIn">Sign In</a> <!-- Link to toggle back to Sign In form -->
      </div>
    </div>
  </template>
  
  <script>
  // Import the necessary store and components
  import { useUserStore } from '@/stores/userStore'; // TODO: import the useUserStore
  import { mapState, mapActions } from 'pinia'; // TODO: import mapState and mapActions from pinia
  
  import SignInForm from '@/components/SignInForm.vue';
  import SignUpForm from '@/components/SignUpForm.vue';
  
  export default {
    data() {
      return {
        showSignIn: true,  // Initializing showSignIn to true
        showSignUp: false, // Initializing showSignUp to false
      };
    },
    created() {
      this.logout(); // Call the logout method on component creation
    },
    components: {
      SignInForm,
      SignUpForm
    },
    computed: {
      // Use mapState to access necessary store values
      ...mapState(useUserStore, ['getIsLoggedIn', 'getSignInError', 'getSignUpError']),
    },
    methods: {
      // Use mapActions to access the store actions
      ...mapActions(useUserStore, ['userSignIn', 'userSignUp', 'logout']),
      
      toggleShowSignUp() {
        this.showSignUp = true;
        this.showSignIn = false;
        this.logout(); // Log out the user when switching to the sign-up form
      },
      toggleShowSignIn() {
        this.showSignUp = false;
        this.showSignIn = true;
        this.logout(); // Log out the user when switching to the sign-in form
      },
      signIn(userObj) {
        this.userSignIn(userObj)  // Call the userSignIn action with userObj
          .then(() => {
            this.$router.push('/jobList'); // Redirect to the job list after successful sign-in
          });
      },
      signUp(userObj) {
        this.userSignUp(userObj)  // Call the userSignUp action with userObj
          .then(() => {
            this.$router.push('/jobList'); // Redirect to the job list after successful sign-up
          });
      }
    }
  };
  </script>
  