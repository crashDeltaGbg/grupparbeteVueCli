<template>
  <div class="about">
    <h1>This is a test page</h1>
    <div v-html="markdown"></div>
    <input type="button" @click="selectFile('markdown')" value="Click me!"/>
  </div>
</template>

<script>
import { markdown } from "@/assets/mixins/markdown.js"
// import { dice } from "@/assets/scripts/dice.js"

export default {
  mixins: [markdown],
  name: 'markdown'
}
</script>
