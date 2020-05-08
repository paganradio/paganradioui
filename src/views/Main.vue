<template>
  <div class="main">
    <div class="contentContainer">
      <VideosComponent />
      <MenuComponent />
      <ChatboxComponent />
    </div>
    <div class="infoContainer">
      <InfoComponent />
    </div>
  </div>
</template>

<script>
import VideosComponent from "@/components/VideosComponent.vue";
import MenuComponent from "@/components/MenuComponent.vue";
import InfoComponent from "@/components/InfoComponent.vue";
import ChatboxComponent from "@/components/ChatboxComponent.vue";
export default {
  name: "Main",
  components: {
    VideosComponent,
    MenuComponent,
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