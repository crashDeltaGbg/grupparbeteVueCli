<template>
  <div id="app">
    <transition :name="currentTransistion">
      <router-view />
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentTransistion: 'fade'
      }
    }
  }
</script>
<style lang="scss">
  .fade-enter-active {
    transition: opacity 2s ease-in;
  }
  .fade-leave-active {
    transition: opacity 1s ease-in;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
