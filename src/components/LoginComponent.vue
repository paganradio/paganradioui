<template>
    <div class = "LoginComponent">
        <div class = "LoginForm">
            <input v-model="user.username" id = "username" placeholder="username">
            <input type ="password" v-model="user.password" id = "password" placeholder="password">
            <button class = "login btn">Login</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
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
    try{
        const response = await axios.post("https://paganradiolive.com/api/auth/login", this.user, { withCredentials:true});
        if (response.status == '200')
        {
            console.log('you have been authorised');
        }
    }
    catch(err) {
        console.log(err);
    }
    }
  }
}


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