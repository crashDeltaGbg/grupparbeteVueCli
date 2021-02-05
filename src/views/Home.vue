<template>
  <div class="home">
    <Dice type="D4"/> D4<br/>
    <Dice type="D6"/> D6<br/>
    <Dice type="D8"/> D8<br/>
    <Dice type="D10"/> D10<br/>
    <Dice type="D12"/> D12<br/>
    <Dice type="D20"/> D20<br/>
    <Dice type="D100"/> D10-00-90
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>

import Dice from '@/components/Dice.vue'

export default {
  name: 'Home',
  components: {
    Dice
  }
}
</script>
