<template>
  <div class="main">
    <div class="contentContainer">
      <VideosComponent />
      <ChatboxComponent />
    </div>
    <div class="infoContainer">
      <InfoComponent />
    </div>
  </div>
</template>

<script>
import VideosComponent from "@/components/VideosComponent.vue";
import InfoComponent from "@/components/InfoComponent.vue";
import ChatboxComponent from "@/components/ChatboxComponent.vue";
export default {
  name: "Main",
  components: {
    VideosComponent,
    InfoComponent,
    ChatboxComponent
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
</style>