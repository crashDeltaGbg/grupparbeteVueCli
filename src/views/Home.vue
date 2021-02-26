<template>
  <body id="landingpageimg">
    <section id="home">
      <h1>Adventure Hunter</h1>
      <p>The Black Obelisk</p>
      <div class="flex-wrapper">
        <button
          class="primary-button"
          id="start"
          @click="continueStory($event)"
        >
          Start Game
        </button>
        <button
          class="third-button"
          id="continue"
          @click="continueStory($event)"
          :disabled="continueGame"
        >
          Continue
        </button>
      </div>
    </section>
  </body>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    mounted() {
      this.continueGame = localStorage.gameSaves ? false : 0
    },
    data() {
      return {
        continueGame: 0
      }
    },
    methods: {
      continueStory(e) {
        // Added Small "loading" animation.
        let div = document.createElement('div')
        div.innerHTML =
          localStorage.save && e.target.id != 'start'
            ? 'And the adventure continues...'
            : 'And so it begins...'
        div.classList.add('fade')
        e.target.parentNode.appendChild(div)

        // When animation is done we remove the element and redirect the user to
        // create character page.
        setTimeout(() => {
          document.getElementsByClassName('fade')[0].remove()

          // If we got a saved game and the button is not the start button we
          // continue.
          if (localStorage.gameSaves && e.target.id != 'start') {
            //TODO set correct adress.
            this.$router.push({ path: 'LoadGame' })
          } else {
            // If there is no saved game we want to create a new character.
            this.$router.push({ path: 'introduction' })
          }
        }, 1500)
      }
    }
  }
</script>
<style lang="scss">
  @import '../assets/style/variables.scss';
  /* BACKGROUND IMAGE AND TRANSPARANT OVERLAY */
  #landingpageimg::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.66);
  }

  #landingpageimg {
    background-image: url(../../public/images/Landingpage.jpg);
    position: relative;
    background-size: cover;
  }

  #home {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow-x: hidden;
    padding: 0;
    margin: 0;

    h1 {
      font-size: 68px;
      color: #fff;
      margin: 10px;

      @media (max-width: $breakpoint-tablet) {
        font-size: $font-size-h2;
      }
    }

    p {
      font-size: 45px;
      color: #fff;
      margin: 10px;
      @media (max-width: $breakpoint-tablet) {
        font-size: $font-size-text;
        margin-bottom: 60px;
      }
    }

    .flex-wrapper {
      justify-content: center;
      flex-wrap: wrap;

      button {
        margin: 40px 20px;
        width: 335px;

        @media (max-width: $breakpoint-tablet) {
          margin: 10px;
        }

        &:disabled {
          opacity: 0.5;
          cursor: unset;

          &:hover {
            background: #373737;
          }
        }
      }
    }
  }

  .fade {
    flex-basis: 100%;
    opacity: 0;
    animation: fade 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
