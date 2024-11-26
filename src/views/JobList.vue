<template>
    <h1> Available Volunteer Job List </h1>
    <div v-if="getIsLoggedIn"> <!-- v-if for checking login status -->
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Job Name</th>
                        <th>Description</th>
                        <th>Available Spots</th>
                        <th colspan="2">Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="job in getJobList" :key="job.id">
                        <JobItem 
                            :id="job.id"
                            :jobName="job.name"
                            :jobDesc="job.description"
                            :numAvailable="job.numberOfVolunteers" 
                        />
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <button @click="goToJobView()">Add New Job</button>
        </div>
    </div>
    <div v-else> <!-- v-else for when user is not logged in -->
        <p>In order to see this list, you must login</p>
        <button @click="goToLogin()">Go to Login</button> <!-- Button to navigate to login -->
    </div>
</template>

<script>
import JobItem from '@/components/JobItem.vue';
import { useJobStore } from '@/stores/jobStore'; // Import the job store
import { useUserStore } from '@/stores/userStore'; // Import the user store
import { mapState } from 'pinia'; // Import mapState from Pinia

export default {
    components: {
        JobItem
    },
    computed: {
        // Map state from job store
        ...mapState(useJobStore, ['getJobList']),
        // Map state from user store
        ...mapState(useUserStore, ['getIsLoggedIn']),
    },
    methods: {
        goToJobView() {
            // Using router to navigate to jobView with query params
            this.$router.push({ path: '/jobView', query: { type: 'Add' } });
        },
        goToLogin() {
            // Using router to navigate to login
            this.$router.push({ path: '/login' });
        }
    }
};
</script>
