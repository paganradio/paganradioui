<template>
  <div class="main">
    <div class="contentContainer">
      <VideosComponent />
      <ChatboxComponent />
    </div>
    <div class="infoContainer">
      <InfoComponent />
    </div>
    <div class="authContainer">
      <AuthComponent/>
    </div>
  </div>
</template>

<script>
import VideosComponent from "@/components/VideosComponent.vue";
import InfoComponent from "@/components/InfoComponent.vue";
import ChatboxComponent from "@/components/ChatboxComponent.vue";
import AuthComponent from '@/components/AuthComponent.vue';
export default {
  name: "Main",
  components: {
    VideosComponent,
    InfoComponent,
    ChatboxComponent,
    AuthComponent
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
  height:100%;
  width:100%;
}
</style>