<template>
  <div class="VideoComponent">
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
        video: true,
      },
      socket: {},
      username: "",
      userid: "", // must be set
    };
  },
  methods: {
    join() {
      this.$emit("join", this.$refs.video);
      this.joined = true;
    },
    GetVideo: function () {
      return this.$refs.vid;
    },
  },
};
</script>

<style scoped>
.VideoComponent {
  outline: black solid 2px;
  outline-offset: -2px;
  border-radius: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}
video {
  align-content: center;
}
Button {
  height: 20px;
  width: 50px;
}
.disabled {
  display: none;
}
</style>
