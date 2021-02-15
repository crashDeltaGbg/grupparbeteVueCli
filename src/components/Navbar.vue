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
        show: true
      }
    },
    props: ['title']
  }
</script>

<style lang="scss" scoped>
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

  #crop {
    width: 100%;
    height: 50px;
    overflow: hidden;
    background-image: linear-gradient(
      to right,
      rgb(43, 43, 43),
      rgb(175, 174, 174)
    );
  }

  #navwrapper {
    display: flex;
  }

  #blacknav {
    background-color: rgb(43, 43, 43);
    height: 50px;
    flex-grow: 4;
    transform: skewX(+45deg);
    display: flex;
    justify-content: flex-start;
  }

  #greynav {
    background-color: rgb(175, 174, 174);
    height: 50px;
    flex-grow: 1;
    transform: skewX(+45deg);
    display: flex;
    justify-content: flex-start;
  }

  .navitems {
    transform: skewX(-45deg);
    text-decoration: none;
    list-style: none;
    padding-right: 10px;
    padding-left: 25px;
    padding-top: 15px;
    color: black;
  }

  #image {
    background-color: rgb(78, 77, 77);
    height: 45px;
    width: 45px;
    transform: skewX(-45deg);
    border-radius: 50%;
    margin-left: 60px;
    margin-top: 3px;
    margin-right: 90px;
  }

  h1 {
    transform: skewX(-45deg);
    color: white;
    margin-left: 90px;
    margin-bottom: 30px;
    margin-top: 7px;
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
  }

  @media screen and (max-width: 600px) {
    #image {
      display: none;
    }

    #greynav {
      display: none;
      background-color: black;
    }

    #crop {
      background-image: linear-gradient(
        to left,
        rgb(43, 43, 43),
        rgb(43, 43, 43)
      );
    }

    #blacknav {
      justify-content: center;
      align-items: center;
    }

    h1 {
      font-size: 20px;
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
      color: gray;
    }

    #overlay {
      background-color: black;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
