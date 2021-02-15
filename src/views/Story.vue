<template>
  <div class="about">
    <h1>This is a test page</h1>
    <div v-html="markdown"></div>
    <!-- <input type="button" @click="selectFile(mdUrl)" value="Click me!" /> -->
    <choices></choices>
  </div>
</template>

<script>
  import choices from '@/components/Choices.vue'

  import { markdown } from '@/assets/mixins/markdown.js'
  // import { dice } from "@/assets/scripts/dice.js"

  export default {
    components: {
      choices
    },
    mixins: [markdown],
    name: 'markdown'
  }
</script>
