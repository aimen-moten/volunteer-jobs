<template>
    <h1>Sign Up</h1>
    <div>
        <div>
            <!-- Label and input for Email, two-way binding with signUpObj.email -->
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="signUpObj.email" placeholder="Enter your email" />
        </div>
        <div>
            <!-- Label and input for Password, two-way binding with signUpObj.password -->
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="signUpObj.password" placeholder="Enter your password" />
        </div>
        <!-- Sign Up button that triggers the signUp method -->
        <button @click="signUp">Sign Up</button>
    </div>
</template>

<script>
export default {
    // Define emits for the 'SignUp' event
    emits: ['SignUp'],
    data() {
        return {
            // Object to hold email and password values
            signUpObj: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        // Method to handle sign-up logic
        signUp() {
            if (this.signUpObj.email !== '' && this.signUpObj.password !== '') {
                // Emit the 'SignUp' event with the signUpObj as payload
                this.$emit('SignUp', this.signUpObj);
            } else {
                alert('Please fill in both email and password.');
            }
        }
    }
}
</script>
