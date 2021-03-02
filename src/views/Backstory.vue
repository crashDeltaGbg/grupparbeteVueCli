<template>
  <body id="backstoryimage">
    <section class="backstory">
      <Navbar id="ontop" title="Backstory"></Navbar>
      <div class="left">
        <h2>Subheader?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea itaque
          harum, explicabo quo ipsum eaque quod ullam commodi reprehenderit sit
          optio nihil dolore debitis ut eum expedita veritatis delectus in?
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </p>
        <p>
          Est iste eveniet, exercitationem maxime fugit veniam necessitatibus
          rem velit tenetur porro molestias eligendi soluta, ullam impedit
          voluptatem, quas harum explicabo optio. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Odit eius totam nulla hic optio magnam,
          sint qui quam eligendi.
        </p>
        <p>
          Minus soluta consequuntur nemo sapiente error modi nam temporibus quos
          cupiditate? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ea itaque harum, explicabo quo ipsum eaque quod ullam commodi
          reprehenderit sit optio nihil dolore debitis ut eum expedita veritatis
          delectus in? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          eligendi. Minus soluta consequuntur nemo sapiente error modi nam
          temporibus quos cupiditate?
        </p>

        <button class="primary-button" @click="startGame()">Start Game</button>
      </div>
    </section>
  </body>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'backstory',
    components: {
      Navbar
    },

    methods: {
      startGame() {
        this.$router.push({ path: '/character' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  #ontop {
    position: relative;

    @media (max-width: 646px) {
      padding-top: 0;
      margin-top: 0;
    }
  }

  #backstoryimage::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: linear-gradient(
      89.22deg,
      rgba(0, 0, 0, 0.8) 12.23%,
      rgba(0, 0, 0, 0.670775) 54.1%,
      rgba(0, 0, 0, 0) 100.36%
    );
    @media (max-width: 646px) {
      background: none;
    }
  }

  #backstoryimage {
    background: url(../../public/images/Another-castle.jpg) no-repeat center;
    position: absolute;
    background-size: cover;
    /* background-position: center center; */
    @media (max-width: 646px) {
      background: url(../../public/images/Another-castle-mobile.jpg) no-repeat;
      background-color: $black;
    }
  }

  h2 {
    font-size: $font-size-h2;
    @media (max-width: 646px) {
      font-size: 25px;
    }
  }

  p {
    max-width: 80%;
    @media (max-width: 646px) {
      font-size: 16px;
      max-width: 100%;
      margin-right: 20px;
      line-height: 31px;
    }
  }

  .backstory {
    .left {
      width: 75%;
      text-align: left;
      justify-self: center;
      margin: 90px 0;
      /* padding: 10px; */
      padding-left: 90px;
      display: flex;
      flex-direction: column;
      line-height: 35px;
      font-size: $font-size-preamble;
      box-sizing: border-box;
      color: $white;
      position: relative;

      @media (max-width: 646px) {
        padding-left: 40px;
        width: 100%;
        padding-top: 300px;
      }

      /* height: 100vh; */

      button {
        margin: 40px auto;
        justify-self: center;

        @media (min-width: $breakpoint-desktop-small) {
          margin: 40px 0;
          margin-right: 0 auto;
        }
      }
    }
  }
</style>
