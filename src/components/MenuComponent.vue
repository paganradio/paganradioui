<template>
  <div class="MenuComponent">
    <span class="menuButton" @click="ToggleMenu">
      <div class="hamburger"></div>
      <div class="hamburger"></div>
      <div class="hamburger"></div>
    </span>
    <div ref="sideNav" class="sideNav" v-bind:class="{active: opened}"></div>
  </div>
</template>

<script>
export default {
  name: "MenuComponent",
  data() {
    return {
      opened: false
    };
  },
  methods: {
    ToggleMenu() {
      this.opened = !this.opened;
    }
  }
};
</script>    

<style scoped>
.menuButton {
  cursor: pointer;
}
.hamburger {
  width: 35px;
  height: 5px;
  background-color: black;
  margin: 6px 0;
}
.sideNav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: -1; /* Stay on top */
  top: 0;
  left: 0;
  background-color: green;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.2s; /* 0.5 second transition effect to slide in the sidenav */
}
.active {
  width: 20em; /* 0 width - change this with JavaScript */
}
</style>