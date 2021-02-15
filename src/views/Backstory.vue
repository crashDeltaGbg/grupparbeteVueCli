<template>
  <section class="backstory">
    <Navbar title="Backstory"></Navbar>
    <section class="flex-wrapper">
      <div class="left">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea itaque
        harum, explicabo quo ipsum eaque quod ullam commodi reprehenderit sit
        optio nihil dolore debitis ut eum expedita veritatis delectus in? Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Est iste eveniet,
        exercitationem maxime fugit veniam necessitatibus rem velit tenetur
        porro molestias eligendi soluta, ullam impedit voluptatem, quas harum
        explicabo optio. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Odit eius totam nulla hic optio magnam, sint qui quam eligendi.
        Minus soluta consequuntur nemo sapiente error modi nam temporibus quos
        cupiditate? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
        itaque harum, explicabo quo ipsum eaque quod ullam commodi reprehenderit
        sit optio nihil dolore debitis ut eum expedita veritatis delectus in?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est iste
        eveniet, exercitationem maxime fugit veniam necessitatibus rem velit
        tenetur porro molestias eligendi soluta, ullam impedit voluptatem, quas
        harum explicabo optio. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Odit eius totam nulla hic optio magnam, sint qui quam
        eligendi. Minus soluta consequuntur nemo sapiente error modi nam
        temporibus quos cupiditate?

        <button class="primary-button" @click="startGame()">Start Game</button>
      </div>
      <div class="right">
        <img src="@/assets/logo.png" alt="#" />
      </div>
    </section>
  </section>
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
  .flex-wrapper {
    padding: 40px;
    background-color: #949191;

    .left,
    .right {
      width: 50%;
      text-align: left;
      justify-self: center;
      margin: 40px 20px;
      display: flex;
      flex-direction: column;
      line-height: 42px;
      font-size: 24px;

      button {
        margin: 40px 0;
        margin-right: auto;
      }

      img {
        margin: auto;
        justify-self: center;
      }
    }
  }
</style>
