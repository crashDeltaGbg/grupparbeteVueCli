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
          sint qui quam eligendi. Minus soluta consequuntur nemo sapiente error
          modi nam temporibus quos cupiditate? Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Ea itaque harum, explicabo quo ipsum
          eaque quod ullam commodi reprehenderit sit optio nihil dolore debitis
          ut eum expedita veritatis delectus in? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. eligendi. Minus soluta consequuntur nemo
          sapiente error modi nam temporibus quos cupiditate?
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
    margin-top: 60px;
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
      rgba(0, 0, 0, 0.7) 12.23%,
      rgba(0, 0, 0, 0.586928) 54.1%,
      rgba(0, 0, 0, 0) 100.36%
    );
  }

  #backstoryimage {
    background-image: url(../../public/images/Slott.jpg);
    position: absolute;
    background-size: cover;
  }

  .backstory {
    .left {
      width: 100%;
      text-align: left;
      justify-self: center;
      margin: 90px 0;
      padding: 20px;

      padding-left: 90px;
      display: flex;
      flex-direction: column;
      line-height: 42px;
      font-size: $font-size-preamble;
      box-sizing: border-box;
      color: $white;
      position: relative;

      button {
        margin: 40px auto;
        justify-self: center;

        @media (min-width: $breakpoint-desktop-small) {
          margin: 40px 0;
          margin-right: auto;
        }
      }

      @media (min-width: $breakpoint-desktop-small) {
        width: 50%;
      }
    }
  }
</style>
