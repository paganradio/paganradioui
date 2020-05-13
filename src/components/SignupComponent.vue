<template>
    <div class ="SignupComponent">
        <div class = "SignupForm">
            <input type = "text" v-model="user.username" id = "username" placeholder="username">
            <input type ="password" v-model="user.password" id = "password" placeholder="password">
            <input type ="email" v-model="user.email" id = "email" placeholder="email">
            <button v-on:click="submit" class = "signup btn">Sign up</button>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
export default {
    data() {
    return {
        user : 
        {
            username: "",
            password: "",
            email: ""
        }
    };
  },
  methods: {
    async submit() {
        try{
            const response = await axios.post("https://paganradiolive.com/api/auth/signup", this.user, { withCredentials:true});
            //const response = await axios.post("https://paganradiolive.com/api/auth/signup", this.user);
            console.log(response);
        }
        catch(err)
        {
            console.log(err);
        }
    }
  }
}
</script>

<style scoped>
    .SignupComponent {
        width: 100%;
        height: 100%;
    }
    .SignupForm{
        position:absolute;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    input {
        display: block;
        margin: 1em;
    }
</style>