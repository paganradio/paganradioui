<template>
    <div class = "LoginComponent">
        <div class = "LoginForm">
            <input v-model="user.username" id = "username" placeholder="username">
            <input type ="password" v-model="user.password" id = "password" placeholder="password">
            <button v-on:click="submit" class = "login btn">Login</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http:' + '//' + 'localhost' + ':' + '8080';
axios.defaults.headers.common = {
  "Content-Type": "application/x-www-form-urlencoded"
}
async function loginUser(user){
    try
    {
        const response =  await axios.post("http://localhost:8080/api/auth/login", user, { withCredentials:true});
        return response;
    }
    catch(err) 
    {
        console.log(err);
    }
}

export default {
name: "LoginComponent",
data() {
    return {
        user:{
            username: "",
            password: ""
        }
    }
  },
  methods: {
    async submit(){
        const response = await loginUser(this.user);
        if (response.status == '200')
        {
            this.$emit('login', response);
        }
    },
    async login(user){
        return await loginUser(user);
    }
  }
};


</script>

<style scoped>
    .LoginComponent {
        width: 100%;
        height: 100%;
    }
    .LoginForm{
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