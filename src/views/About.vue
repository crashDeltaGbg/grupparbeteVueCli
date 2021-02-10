<template>
  <div class="about">
    <h1>This is a test page</h1>
    <input type="button" @click="roll(D6)"/>
    <p>{{ roll }}</p>
  </div>
</template>

<script>
// import Markdown from "@/components/Markdown.vue"
import { dice } from "@/assets/scripts/dice.js"

export default {
  /* components: {
    Markdown
  }, */
  mixin: [dice],
  name: 'About'
}
</script>