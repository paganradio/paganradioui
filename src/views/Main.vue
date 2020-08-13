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
      <AuthComponent
        v-if="!authenticated"
        @OnLoggedIn="loggedIn"
        @OnNewLoggedIn="loggedIn"
      />
    </div>
  </div>
</template>

<script>
import VideosComponent from "@/components/VideosComponent.vue";
import InfoComponent from "@/components/InfoComponent.vue";
import ChatboxComponent from "@/components/ChatboxComponent.vue";
import AuthComponent from "@/components/AuthComponent.vue";
import io from "socket.io-client";
export default {
  name: "Main",
  components: {
    VideosComponent,
    InfoComponent,
    ChatboxComponent,
    AuthComponent,
  },
  data() {
    return {
      authenticated: false,
    };
  },
  methods: {
    loggedIn(response) {
      console.log(response.headers);
      var socket = io("http://localhost:8080/stream");
      this.authenticated = true;
      this.$refs.videosComponent.OnLogin(socket);
    },
  },
};
</script>

<style>
.main {
  width: 100%;
  height: 100%;
}
.contentContainer {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 80% 20%;
  grid-gap: 3px;
}
</style>
