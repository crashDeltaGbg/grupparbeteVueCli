<template>
  <div>
    <Navbar title="Introduction"></Navbar>

    <div class="about">
      <h1>This is a test page</h1>
      <input type="button" @click="roll('D6')" value="D6" />
      <p>{{ face }}</p>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'

  import { dice } from '@/assets/mixins/dice.js'

  export default {
    name: 'navbar',
    components: {
      Navbar
    },

    mixins: [dice]
  }
</script>
