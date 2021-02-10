<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dice">Dices</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/character">Character</router-link> |
      <router-link to="/markdown">Markdown</router-link>|
      <router-link to="/character">Character</router-link>|
      <router-link to="/choices">Choices</router-link>|
    </div>
    <transition :name="currentTransistion">
      <router-view />
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentTransistion: 'none'
      }
    },
    watch: {
      $route(to) {
        // We watch the route and add fade transition to router-view when we hit
        // the character page.
        if (to.path === '/character') {
          this.currentTransistion = 'fade'
        } else {
          this.currentTransistion = 'none'
        }
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
    color: #2c3e50;
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
