<template>
    <td>{{ jobName }}</td>
    <td>{{ jobDesc }}</td>
    <td>{{ numAvailable }}</td>
    <td>
        <button @click="goToJobView">Edit</button>
    </td>
    <td>
        <button @click="deleteDoc">Delete</button>
    </td>
</template>

<script>
// Import the useJobStore and mapActions from pinia
import { useJobStore } from '@/stores/jobStore';
import { mapActions } from 'pinia';

export default {
    props: ['id', 'jobName', 'jobDesc', 'numAvailable'],
    methods: {
        // Use mapActions to access actions from the job store
        ...mapActions('jobStore', ['deleteJobFromDB', 'getAllJobsFromDB']),

        // This method will navigate to the JobForm page, passing the job id and type as "Edit"
        goToJobView() {
            // Using router to navigate to '/jobView' with query parameters for type and job id
            this.$router.push({ path: '/jobView', query: { type: 'Edit', id: this.id } });
        },

        // This method deletes the job document and fetches all jobs after deletion
        deleteDoc() {
            // Call the deleteJobFromDB method from the store, passing the job id
            this.deleteJobFromDB(this.id)
                .then(() => {
                    // After deleting, fetch the updated list of jobs
                    this.getAllJobsFromDB();
                })
                .catch(error => {
                    console.error('Error deleting job:', error);
                });
        }
    }
}
</script>
