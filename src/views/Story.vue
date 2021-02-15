<template>
  <div class="about">
    <template v-if="die">
      <div v-if="markdown" v-html="markdown" id="text">
        <!-- Här läses texten in -->
      </div>
      <div v-else>
        <h1>Uh-oh!</h1>
        <p>Something's amiss :(</p>
      </div>
      <div id="chance">
        <ul v-if="chance">
          <li>
            <input
              type="button"
              value="Roll the die!"
              @click="measure(chance)"
            />
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
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
    </template>
  </div>
</template>

<script>
  const marked = require('marked')
  // import { markdown } from '@/assets/mixins/markdown.js'
  // import PlayerChoices from '@/components/PlayerChoices.vue'
  import { dice } from '@/assets/mixins/dice.js'

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
        chance: null,
        character: { strength: 3, agility: 3, intellect: 3, luck: 3 },
        // dice: false,
        die: null,
        markdown: null,
        options: null,
        success: null
        // proceed: ''
      }
    },
    methods: {
      async getStory(path) {
        // fetch(`@/assets/story/${path}.json`)
        const response = await fetch(`/story/${path}.json`)
        const result = await response.json()
        // console.log(result)
        this.options = result.options
        console.log(this.options)
        console.log(this.options.proceed)
        this.selectFile(result.md_file_path)
        // console.log(result.md_file_path)
        // this.dice = result.dice
        this.die = result.die
        // console.log(this.die)
        this.chance = result.chance
        this.success = result.success
        // console.log(this.success)
      },
      async selectFile(fileName) {
        // this.markdown = require(`@/assets/story/${fileName}.md`)
        const answer = await fetch(`/story/${fileName}.md`)
        const conclusion = await answer.text()
        // console.log(conclusion)
        this.markdown = marked(conclusion)
        // console.log(this.markdown)
      },
      onClick(path) {
        this.getStory(path)
      },
      measure(stat) {
        this.roll(this.die)
        let score = this.face + this.character[stat]
        console.log(score)
        if (score >= this.success) {
          this.getStory(this.options.proceed)
          console.log(this.options.proceed)
        } else {
          this.getStory('side_quests/json/failure')
        }
      }
    },
    mixins: [dice],
    name: 'Story'
  }
</script>
