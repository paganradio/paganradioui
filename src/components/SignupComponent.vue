<template>
    <div class ="SignupComponent">
        <div class = "SignupForm">
            <input type = "text" v-model="user.username" id = "username" placeholder="username">
            <input type ="password" v-model="user.password" id = "password" placeholder="password">
            <input type ="email" v-model="user.email" id = "email" placeholder="email">
            <button v-on:click="submit" class = "signup btn">Sign up</button>
            <p>{{error}}</p>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
axios.defaults.baseURL = 'http:' + '//' + 'localhost' + ':' + '8080';
axios.defaults.headers.common = {
  "Content-Type": "application/x-www-form-urlencoded"
}
export default {
    data() {
    return {
        user : 
        {
            username: "",
            password: "",
            email: ""

        },
        error : "no error"
    };
  },
  methods: {
    async submit() {
        try{
            const response = await axios.post("/api/auth/signup", this.user, { withCredentials:true});
            if (response.status == '200')
            {
                response.user = this.user;
                this.$emit('registered', response);
            }
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