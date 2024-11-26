<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/jobList">Job List</RouterLink>
        <!-- Login RouterLink, v-show based on !getIsLoggedIn -->
        <RouterLink to="/login" v-show="!getIsLoggedIn">Login</RouterLink>
      </nav>
      <div>
        <!-- Log Out button, v-show based on getIsLoggedIn, triggers logUserOut method -->
        <button v-show="getIsLoggedIn" @click="logUserOut">Log Out</button>
      </div>
    </div>
  </header>

  <div class="mainContent">
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
// Importing the necessary stores and methods
import { useJobStore } from '@/stores/jobStore'; // TODO: import the useJobStore
import { useUserStore } from '@/stores/userStore'; // TODO: import the useUserStore
import { mapState, mapActions } from 'pinia'; // TODO: import mapState and mapActions from pinia

export default {
  components: {
    RouterLink,
    RouterView
  },
  created() {
    // Call getAllJobsFromDB to populate the job store with data from the database on component creation
    this.getAllJobsFromDB();
  },
  computed: {
    // Use mapState to access the getIsLoggedIn getter from the user store
    ...mapState(useUserStore, ['getIsLoggedIn']),
  },
  methods: {
    // Use mapActions to access the getAllJobsFromDB action from the job store
    ...mapActions(useJobStore, ['getAllJobsFromDB']),
    
    // Use mapActions to access the logout action from the user store
    ...mapActions(useUserStore, ['logout']),
    
    logUserOut() {
      this.logout();  // Call the logout action
      this.$router.push('/login');  // Redirect to the login page after logging out
    }
  }
}
</script>
