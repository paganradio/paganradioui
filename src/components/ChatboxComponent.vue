<template>
  <div class="ChatboxComponent">
    <ChatboxInputComponent />
    <ChatboxOutputComponent />
  </div>
</template>

<script>
import ChatboxInputComponent from "@/components/ChatboxInputComponent";
import ChatboxOutputComponent from "@/components/ChatboxOutputComponent";
import io from "socket.io-client";
export default {
  name: "ChatboxComponent",
  components: {
    ChatboxInputComponent,
    ChatboxOutputComponent,
  },
  data() {
    return {
      socket: io("https://paganradiolive.com/", { path: "/ws/" }),
    };
  },
};
</script>

<style scoped>
.ChatboxComponent {
  height: inherit;
  width: 25em;
  position: absolute;
  z-index: -1; /* Stay on top */
  right: 0;
  top: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.2s; /* 0.5 second transition effect to slide in the sidenav */
  outline: black solid 2px;
  outline-offset: -2px;
}
</style>
