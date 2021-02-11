<template>
  <div class="home">
    <!-- Ange med props:en 'type' vilken tärning som ska användas -->
    <Dice type="D4" /> D4<br />
    <Dice type="D6" /> D6<br />
    <Dice type="D8" /> D8<br />
    <Dice type="D10" /> D10<br />
    <Dice type="D12" /> D12<br />
    <Dice type="D20" /> D20<br />
    <Dice type="D100" /> D10-00-90<br />
    <Save-game-function></Save-game-function>
  </div>
</template>

<script>
  import Dice from '@/components/Dice.vue'
  import SaveGameFunction from '@/components/Save-game-function.vue'

  export default {
    name: 'Dices',
    components: {
      Dice,
      SaveGameFunction
    }
  }
</script>
