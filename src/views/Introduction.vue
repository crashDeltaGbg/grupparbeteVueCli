<template>
  <div id="intro">
    <Navbar id="zIndexNavbar" title="Introduction"></Navbar>
    <div id="blackBackground">
      <h2>Welcome to Terra Autem!</h2>
      <div id="containerDiv">
        <p>
          In this land still filled with magic and mythical creatures you have
          been chosen to partake in an epic adventure that will be told for
          countless generations... if you survive to tell the bard at the end
          that is.
        </p>
        <p>
          Adventure Hunter is a textbased adventure that is inspired by Dungeons
          &amp; Dragons and text adventure games like where an actions succees
          or failure depends on your stats and a die system.
        </p>
        <p>
          You will design your avatar right after this introduction and will get
          to allocate your stats as you seem fit. While a strong warrior might
          not have much of a problem facing a troll in single combat, an agile
          rogue would be wise to wait for an ambush oppurtunity or maybe try to
          sneak past, you get the gist of it. When faced with adversity you get
          to roll a die, the relevant stat to the adversity and the total from
          the roll is added together and compared to see if you overcome the
          hardship or fail and have to suffer the consequences.
        </p>
      </div>
      <button
        @click="continueStory($event)"
        class="primary-button"
        id="zIndexButton"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'Introduction',
    components: {
      Navbar
    },
    methods: {
      continueStory() {
        this.$router.push({ path: 'character' })
      }
    }
  }
</script>

<style lang="scss">
  #intro {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #949191;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    background-image: url(../assets/intro.png);
    background-size: cover;

    h1 {
      z-index: 1;
    }

    h2 {
      margin-top: 80px;
      font-size: 40px;
      color: #fff;
      z-index: 1;
    }

    p {
      font-size: 25px;
      margin-top: 25px;
      margin-left: 150px;
      margin-right: 150px;
      color: #fff;
    }
    #containerDiv {
      position: relative;
      z-index: 1;
    }

    #blackBackground {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      background: rgba(0, 0, 0, 0.71);
    }

    #zIndexButton {
      z-index: 1;
    }

    #zIndexNavbar {
      z-index: 1;
    }
  }
</style>

<!-- 
    #blackBackground {
      background-color: black;
      margin: 0px 150px 0px 150px;
      opacity: 0.5;
      position: absolute;
      z-index: -1;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 40px;
    } -->
