<template>
    <div>
      <div>
        <div>
          <label for="jobName">Job Name</label>
          <input type="text" id="jobName" v-model="jobName" />
        </div>
        
        <div>
          <label for="jobDescription">Job Description</label>
          <input type="text" id="jobDescription" v-model="jobDescription" />
        </div>
  
        <div>
          <label for="jobNumberOfVolunteers">Number of Volunteers Needed</label>
          <input type="number" id="jobNumberOfVolunteers" v-model="jobNumberOfVolunteers" />
        </div>
      </div>
  
      <!-- Displays an Add or Update button based on the passed in parameter through the URL route-->
      <button v-if="type === 'Add'" @click="addNewJob">Add</button>
      <button v-if="type === 'Edit'" @click="updateJob">Update</button>
    </div>
  </template>
  
  <script>
  // Import necessary methods and stores from Pinia
  import { useJobStore } from '@/stores/jobStore';
  
  export default {
    props: ['type'],
    setup() {
      const jobStore = useJobStore();
  
      const jobName = computed({
        get: () => jobStore.getJobObjByKey('name'),
        set: (value) => jobStore.updateJobObjByKey('name', value),
      });
  
      const jobDescription = computed({
        get: () => jobStore.getJobObjByKey('description'),
        set: (value) => jobStore.updateJobObjByKey('description', value),
      });
  
      const jobNumberOfVolunteers = computed({
        get: () => jobStore.getJobObjByKey('numAvailable'),
        set: (value) => jobStore.updateJobObjByKey('numAvailable', value),
      });
  
      const addNewJob = async () => {
        try {
          await jobStore.addNewJobtoDB();
          await jobStore.getAllJobsFromDB();
          this.$router.push('/jobList');
        } catch (error) {
          console.error('Error adding new job:', error);
        }
      };
  
      const updateJob = async () => {
        try {
          await jobStore.updateJobFromDB();
          this.$router.push('/jobList');
        } catch (error) {
          console.error('Error updating job:', error);
        }
      };
  
      return {
        jobName,
        jobDescription,
        jobNumberOfVolunteers,
        addNewJob,
        updateJob
      };
    },
  };
  </script>
  