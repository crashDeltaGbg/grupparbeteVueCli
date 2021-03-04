<template>
  <div>
    <div id="crop">
      <div id="navwrapper">
        <div id="blacknav">
          <h1>{{ title }}</h1>
        </div>
        <nav>
          <div id="greynav">
            <li class="navitems">
              <router-link class="navitems" to="/">Quit</router-link>
            </li>
            <li class="navitems">
              <span class="navitems" @click="save(character)">Save</span>
            </li>
            <template v-if="this.$route.path === '/story'">
              <!-- <template v-if="backgroundimage"> -->
              <div
                id="image"
                :style="
                  `background-image:url(${character.img}); background-position: center; background-size: cover; background-repeat: no-repeat`
                "
              ></div>
            </template>
            <template v-else>
              <div id="image"></div>
            </template>
          </div>
        </nav>

        <img
          src="../assets/Sett.svg"
          class="material-icons"
          @click="show = !show"
        /><!-- </span> -->
      </div>
    </div>

    <transition name="slide">
      <div id="overlay" v-if="show">
        <li class="overlayitems"><router-link to="/">Quit</router-link></li>
        <li class="overlayitems">
          <span @click="save(character)">Save</span>
        </li>
      </div>
    </transition>
  </div>
</template>

<script>
  import { saveGame } from '@/assets/mixins/save-game.js'

  export default {
    data() {
      return {
        show: true && false
      }
    },
    mixins: [saveGame],
    props: ['title', 'character']
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

    @media (max-width: 928px) {
      background-image: linear-gradient(to right, $black 30%, $brown 30%);
    }
  }

  #navwrapper {
    display: flex;
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
    /* font-size: 36px;
    padding-right: 90px; */
    display: none;

    /* cursor: pointer; */
  }

  .overlayitems,
  a,
  span {
    color: white;
    list-style: none;
    padding: 30px;
    text-decoration: none;
    font-family: $font-text;
    font-size: $font-size-text;
  }

  @media screen and (max-width: 689px) {
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
      height: 32px;
      z-index: 10;
      cursor: pointer;
      /* background: url(../assets/Sett.svg) no-repeat; */
    }

    .material-icons:hover {
      /* display: block;
      height: 32px;
      width: 32px;
      padding-top: 7px;
      padding-right: 20px; */
      transform: none;
      z-index: 10;
      color: $brown;
    }

    #overlay {
      background-color: rgb(14, 11, 11);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
