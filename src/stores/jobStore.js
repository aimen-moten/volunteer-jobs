import { defineStore } from "pinia";
import { addDoc, deleteDoc, updateDoc, collection, doc, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/init.js";

export const useJobStore = defineStore('job-store', {
    state: () => {
        return {
            jobList: [],
            queryList: [],
            jobObj: {
                id: '',
                name: '',
                description: '',
                numberOfVolunteers: 0
            }
        }
    },
    getters: {
        // Getter to return the job list
        getJobList: (state) => state.jobList,

        // Getter to find a job by ID
        getJobById: (state) => (jobID) => {
            if (state.jobList.length) {
                return state.jobList.find(job => job.id === jobID);
            }
            return null;
        },

        // Getter to get a job property by key
        getJobByKey: (state) => (key) => {
            return state.jobObj[key];
        }
    },
    actions: {
        // Add a new job to Firestore and reset the job object
        async addNewJobToDB() {
            try {
                await addDoc(collection(db, 'jobs'), this.jobObj);
                this.resetJobObj();
            } catch (error) {
                console.error("Error adding new job:", error);
            }
        },

        // Get all jobs from Firestore and populate the job list
        async getAllJobsFromDB() {
            try {
                this.jobList = []; // Clear job list to prevent duplicates
                const jobsQuery = query(collection(db, 'jobs'));
                const querySnapshot = await getDocs(jobsQuery);
                querySnapshot.forEach((doc) => {
                    const jobToAdd = doc.data();
                    jobToAdd.id = doc.id; // Add document ID as a property
                    this.jobList.push(jobToAdd);
                });
            } catch (error) {
                console.error("Error fetching jobs from database:", error);
            }
        },

        // Delete a job from Firestore by ID
        async deleteJobFromDB(jobId) {
            try {
                await deleteDoc(doc(db, 'jobs', jobId));
            } catch (error) {
                console.error("Error deleting job:", error);
            }
        },

        // Update a job in Firestore
        async updateJobFromDB() {
            try {
                await updateDoc(doc(db, 'jobs', this.jobObj.id), this.jobObj);
                this.resetJobObj();
            } catch (error) {
                console.error("Error updating job:", error);
            }
        },

        // Set the job object in the store
        setJobObj(jobObj) {
            if (jobObj) {
                this.jobObj = jobObj;
            }
        },

        // Update a specific key in the job object
        updateJobObjByKey(key, value) {
            this.jobObj[key] = value;
        },

        // Reset the job object to its default state
        resetJobObj() {
            this.jobObj = {
                id: '',
                name: '',
                description: '',
                numberOfVolunteers: 0
            };
        }
    }
});
