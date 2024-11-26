<template>
    <div>
        <div>
            <h1>Sign In</h1>
        </div>
        
        <div>
            <!-- Label and input for Email, two-way binding with signInObj.email -->
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="signInObj.email" placeholder="Enter your email" />
        </div>
        <div>
            <!-- Label and input for Password, two-way binding with signInObj.password -->
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="signInObj.password" placeholder="Enter your password" />
        </div>
        <!-- Sign In button that triggers the signIn method -->
        <button @click="signIn">Sign In</button>
    </div>
</template>

<script>
export default {
    // Define emits for the 'SignIn' event
    emits: ['SignIn'],
    data() {
        return {
            // Object to hold email and password values
            signInObj: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        // Method to handle sign-in logic
        signIn() {
            if (this.signInObj.email !== '' && this.signInObj.password !== '') {
                // Emit the 'SignIn' event with the signInObj as payload
                this.$emit('SignIn', this.signInObj);
            } else {
                alert('Please fill in both email and password.');
            }
        }
    }
}
</script>
