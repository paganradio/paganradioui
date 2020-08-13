<template>
  <div class="VideoComponent">
    <h3>{{ username }}</h3>
    <Button v-on:click="join" v-bind:class="{ disabled: joined }">join</Button>
    <video ref="vid" v-bind:class="{ disabled: !joined }" />
  </div>
</template>

<script>
export default {
  name: "VideoComponent",
  data() {
    return {
      joined: false,
      constraints: {
        audio: true,
        video: {
          mandatory: {
            maxWidth: 640,
            maxFrameRate: 15,
            minFrameRate: 15,
          },
        },
      },
      socket: {},
      username: "default",
      userid: "", // must be set
    };
  },
  methods: {
    join() {
      console.log("Click");
      this.$emit("join", this.$refs.video);
      this.joined = true;
    },
    GetVideo: function () {
      return this.$refs.vid;
    },
    StreamerDisconnected: function () {
      var video = this.GetVideo();
      this.joined = false;
      this.socket = {};
      this.username = "none";
      video.autoplay = false;
    },
    StreamerConnected: function (userid) {
      var video = this.GetVideo();
      this.joined = true;
      this.socket = {};
      this.username = userid;
      video.autoplay = true;
    },
  },
};
</script>

<style scoped>
.VideoComponent {
  outline: black solid 2px;
  outline-offset: -2px;
  border-radius: 1em;
  align-items: center;
  justify-content: center;
  background: #555;
}
video {
  align-content: center;
  height: fit;
}
Button {
  height: 20px;
  width: 50px;
}
.disabled {
  display: none;
}
</style>
