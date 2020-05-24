<template>
  <div class="AuthComponent">
    <div class="ButtonContainer">
      <Button v-on:click="state = 'login'" class="Login btn">Login</Button>
      <Button v-on:click="state = 'signup'" class="Signup btn">Signup</Button>
    </div>
    <div class="FormContainer">
      <LoginComponent ref="loginComponent" v-if="state == 'login'" @login="loggedIn" />
      <SignupComponent v-if="state == 'signup'" @registered="registered" />
    </div>
  </div>
</template>

<script>
import LoginComponent from "@/components/LoginComponent";
import SignupComponent from "@/components/SignupComponent";

export default {
  components: {
    LoginComponent,
    SignupComponent,
  },
  data() {
    return {
      state: "login",
    };
  },
  methods: {
    loggedIn(response) {
      this.$emit("OnLoggedIn", response);
    },
    async registered(response) {
      const loginResponse = await LoginComponent.methods.login(response.user);
      if (response.status == "200") {
        // succesful register and then login
        loginResponse.user = response.user;
        this.$emit("OnNewLoggedIn", loginResponse);
      }
    },
  },
};

</script>

<style scoped>
.ButtonContainer {
  height: 5%;
}
.FormContainer {
  position: absolute;
  height: 95%;
  width: 100%;
  bottom: 0;
  left: 0;
}
.AuthComponent {
  position: absolute;
  height: 800px;
  width: 600px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: azure;
  z-index: 1;
}
.btn {
  width: 50%;
  height: 100%;
}
</style>
