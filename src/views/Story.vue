<template>
  <div class="about">
    <!-- <h1>{{ heading }}</h1> -->
    <div v-if="markdown" v-html="markdown" id="text">
      <!-- Här läses texten in -->
    </div>
    <div v-else>
      <h1>Uh-oh!</h1>
      <p>Something's amiss :(</p>
    </div>
    <div id="options">
      <ul v-if="options">
        <li v-for="option in options" :key="option.id">
          <input
            type="button"
            :value="option.text"
            @click="onClick(option.proceed)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  const marked = require('marked')
  // import { markdown } from '@/assets/mixins/markdown.js'
  // import PlayerChoices from '@/components/PlayerChoices.vue'
  // import { dice } from "@/assets/scripts/dice.js"

  export default {
    components: {
      // PlayerChoices
    },
    created() {
      // this.selectFile('side_quests/SQ0_0')
      this.getStory('side_quests/json/SQ0-0')
    },
    data() {
      return {
        // heading: '',
        markdown: null,
        options: null
        // proceed: ''
      }
    },
    methods: {
      async getStory(path) {
        // fetch(`@/assets/story/${path}.json`)
        const response = await fetch(`/story/${path}.json`)
        const result = await response.json()
        console.log(result)
        this.options = result.options
        console.log(this.options)
        this.selectFile(result.md_file_path)
        console.log(result.md_file_path)
      },
      async selectFile(fileName) {
        // this.markdown = require(`@/assets/story/${fileName}.md`)
        const answer = await fetch(`/story/${fileName}.md`)
        const conclusion = await answer.text()
        console.log(conclusion)
        this.markdown = marked(conclusion)
        console.log(this.markdown)
      },
      onClick(path) {
        this.getStory(path)
      }
    },
    // mixins: [markdown],
    name: 'Story'
  }
</script>
