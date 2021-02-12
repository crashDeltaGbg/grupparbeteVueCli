<template>
  <div class="about">
    <h1>{{ heading }}</h1>
    <div v-html="markdown" id="text"></div>
    <!-- Här läses texten in -->
    <!-- <input type="button" @click="selectFile('markdown')" value="Click me!" /> -->
    <Player-choices :next="proceed"></Player-choices>
  </div>
</template>

<script>
  import { markdown } from '@/assets/mixins/markdown.js'
  import PlayerChoices from '@/components/PlayerChoices.vue'
  // import { dice } from "@/assets/scripts/dice.js"

  export default {
    components: {
      PlayerChoices
    },
    created() {
      // this.selectFile('side_quests/SQ0_0')
      getStory('side_quests/json/SQ0_0')
    },
    data() {
      return {
        heading,
        options: null,
        proceed
      }
    },
    methods: {
      async getStory(url) {
        fetch(`@/assets/story/${url}.json`)
        const response = await fetch(`@/assets/story/${url}.json`)
        const result = await response.json()
        console.log(result)
      }
    },
    mixins: [markdown],
    name: 'markdown'
  }
</script>
