<template>
  <div class="about">
    <h1>This is a test page</h1>
    <input type="button" @click="roll(D6)" value="D6"/>
    <p>{{ face }}</p>
  </div>
</template>

<script>
import { dice } from "@/assets/mixins/dice.js"

export default {
  mixins: [dice]
}
</script>
