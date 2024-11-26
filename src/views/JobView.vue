<template>
    <div>
      <!-- This uses the object parameter query pass through the router, specifically at the key 'type'
           to determine whether it will be 'Add' or 'Edit' -->
      <h1>{{ $route.query.type }} a Job</h1>
  
      <JobForm :type="$route.query.type" />
  
      <button @click="goToJobList">Back to Job List</button> <!-- TODO: add a button called 'Back to Job List', assign the click attribute to use router push, changing the view to /jobList-->
    </div>
  </template>
  
  <script>
  import JobForm from "@/components/JobForm.vue";
  import { useJobStore } from "@/stores/jobStore"; // TODO: import the useJobStore
  import { mapState, mapActions } from "pinia"; // TODO: import mapState and mapActions from pinia
  
  export default {
    components: {
      JobForm,
    },
    computed: {
      // TODO: use mapState to access the following getters from the job store: getJobById
      ...mapState(useJobStore, ["getJobById"]),
    },
    mounted() {
      // If the user selected edit, we need to update the jobObj in the store,
      // so that the existing job doc will be populated into the JobForm
  
      if (this.$route.query.type === "Edit" && this.$route.query.id) {
        // TODO: make a variable called jobObj that will call getJobById, passing in this.$route.query.id
        const jobObj = this.getJobById(this.$route.query.id);
        // TODO: call the setJobObj method, passing in the jobObj variable
        this.setJobObj(jobObj);
      }
    },
    methods: {
      // TODO: use mapActions to access the following actions from the job store: setJobObj
      ...mapActions(useJobStore, ["setJobObj"]),
  
      goToJobList() {
        this.$router.push({ path: "/jobList" }); // Navigate to the job list page
      },
    },
  };
  </script>
  