<template>
  <div class="VideosComponent"></div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: io("https://paganradiolive.com"),
    };
  },
};
</script>

<style scoped>
.VideosComponent {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: inherit;
  background: #555;
  z-index: -2;
}
</style>
