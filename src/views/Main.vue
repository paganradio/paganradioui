<template>
  <div class="main">
    <div class="contentContainer">
      <VideosComponent ref="videosComponent" />
      <ChatboxComponent ref="chatboxComponent" />
    </div>
    <div class="infoContainer">
      <InfoComponent />
    </div>
    <div class="authContainer">
      <AuthComponent v-if="!authenticated" @OnLoggedIn="loggedIn" @OnNewLoggedIn="loggedIn" />
    </div>
  </div>
</template>

<script>
import VideosComponent from "@/components/VideosComponent.vue";
import InfoComponent from "@/components/InfoComponent.vue";
import ChatboxComponent from "@/components/ChatboxComponent.vue";
import AuthComponent from '@/components/AuthComponent.vue';
import io from "socket.io-client";
export default {
  name: "Main",
  components: {
    VideosComponent,
    InfoComponent,
    ChatboxComponent,
    AuthComponent
  },
  data() {
    return{
      authenticated : false
    }
  },
  methods: {
    loggedIn(response){
      console.log(response.headers);
      var socket = io("http://localhost:8080");
      socket.on('connectionResponse', message => {
        console.log(message);
      })
      this.authenticated = true;
      this.$refs.videosComponent.OnLogin(socket);
    }
  }
};
</script>

<style>
.infoContainer {
  height: 5%;
}
.contentContainer {
  height: 95%;
}
.authContainer {
  height: 100%;
  width: 100%;
}
</style>