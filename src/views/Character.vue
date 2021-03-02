<template>
  <div class="character-wrapper">
    <Navbar title="Create Character"></Navbar>
    <create-character></create-character>
  </div>
</template>

<script>
  import createCharacter from '@/components/CreateCharacter.vue'
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'Character',
    components: {
      createCharacter,
      Navbar
    }
  }
</script>

<style scoped lang="scss">
  .character-wrapper {
    background-image: url(../assets/character-creation.png);
    background-size: cover;
    width: 100%;
    height: 100%;
  }
</style>
