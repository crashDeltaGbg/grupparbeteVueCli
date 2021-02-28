<template>
  <div>
    <div id="crop">
      <div id="navwrapper">
        <div id="blacknav">
          <h1>{{ title }}</h1>
        </div>
        <nav>
          <div id="greynav">
            <li class="navitems"><a class="navitems" href="#">Quit</a></li>
            <li class="navitems"><a class="navitems" href="#">Save</a></li>
            <div id="image"></div>
          </div>
        </nav>

        <span class="material-icons" @click="show = !show">settings</span>
      </div>
    </div>

    <transition name="slide">
      <div id="overlay" v-if="show">
        <li class="overlayitems"><a href="#">Quit</a></li>
        <li class="overlayitems"><a href="#">Save</a></li>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: true && false
      }
    },
    props: ['title']
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  /* ANIMATIONS */
  .slide-enter-active {
    transition: all 0.3s ease;
  }
  .slide-leave-active {
    transition: all 0.3s cubic-bezier(0.04, 0.78, 0.97, 0.85);
  }
  .slide-enter,
  .slide-leave-to {
    transform: translate(10px);
    opacity: 0;
  }

  /* DIV SOM SITTER BAKOM FÖR ATT FYLLA UT KANTERNA FRÅN SKEW */
  #crop {
    width: 100%;

    /* clip-path: inset(-20px 0px -20px 0px); */
    background-image: linear-gradient(to right, $black 50%, $brown 50%);
  }

  #navwrapper {
    display: flex;
    /* margin-top: 60px; */
  }

  #blacknav {
    background-color: $black;
    height: 50px;
    flex-grow: 1;
    transform: skew(+45deg);
    display: flex;
    justify-content: flex-start;
  }

  #greynav {
    background-color: $brown;
    height: 50px;
    /* transform: skew(+45deg); */
    display: flex;
    justify-content: flex-start;

    width: 100;
  }

  .navitems {
    /* transform: skew(-45deg); */
    text-decoration: none;
    list-style: none;
    padding-right: 10px;
    padding-left: 25px;
    padding-top: 15px;
    color: black;
    font-family: $font-text;
  }

  #image {
    background-color: $black;
    height: 70px;
    width: 70px;
    /* transform: skew(-45deg); */

    border-radius: 50%;
    margin-left: 60px;
    margin-right: 90px;
    position: relative;
    bottom: 20%;
  }

  h1 {
    transform: skewX(-45deg);
    color: white;
    margin-left: 90px;
    margin-bottom: 30px;
    margin-top: 7px;
    font-size: 30px;

    @media (max-width: 900px) {
      font-size: $font-size-preamble;
    }
  }

  .material-icons {
    font-size: 36px;
    padding-right: 90px;
    display: none;
    color: white;
    cursor: pointer;
  }

  .overlayitems,
  a {
    color: white;
    list-style: none;
    padding: 30px;
    text-decoration: none;
    font-family: $font-text;
    font-size: $font-size-text;
  }

  @media screen and (max-width: 879px) {
    #image {
      display: none;
    }

    #greynav {
      display: none;
      background-color: $black;
    }

    #crop {
      background-image: linear-gradient(to left, $black, $black);
      background-color: $black;
    }

    #blacknav {
      justify-content: center;
      align-items: center;
      background-color: $black;
    }

    h1 {
      font-size: $font-size-text;
      padding-right: 45px;
      margin-top: 30px;
    }

    .material-icons {
      display: block;
      padding-top: 7px;
      padding-right: 20px;
      transform: none;
      z-index: 10;
    }

    .material-icons:hover {
      display: block;
      padding-top: 7px;
      padding-right: 20px;
      transform: none;
      z-index: 10;
      color: $brown;
    }

    #overlay {
      background-color: rgba(0, 0, 0, 0.85);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
