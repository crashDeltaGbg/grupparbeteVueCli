<template>
  <div class="about">
    <div id="status">
      <span>Gold: {{ character.purse }}</span
      >&nbsp;
      <span>Health: {{ character.hp }}</span>
    </div>

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
      this.getStory('leavingHome')
    },
    data() {
      return {
        chance: null,
        character: {
          strength: 3,
          agility: 3,
          intellect: 3,
          luck: 3,
          hp: 30,
          purse: 2,
          inventory: []
        },
        // dice: false,
        die: null,
        coin: null,
        markdown: null,
        options: null,
        success: null
        // proceed: ''
      }
    },
    methods: {
      async getStory(path) {
        // fetch(`@/assets/story/${path}.json`)
        const response = await fetch(`/story/json/story.json`)
        const result = await response.json()
        // console.log(result)
        this.options = result[path].options
        // console.log(this.options)
        // console.log(this.options.proceed)
        this.selectFile(result[path].alias)
        // console.log(result.md_file_path)
        // this.dice = result.dice
        this.die = result[path].die
        // console.log(this.die)
        this.chance = result[path].chance
        this.success = result[path].success
        this.coin = result[path].coin
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
          this.getStory(this.options[0].proceed)
          console.log(this.options[0].proceed)
        } else {
          this.getStory(this.options[1].proceed)
        }
      },
      pay(cost) {
        if (this.character.purse >= cost) {
          this.character.purse -= cost
          return true
        } else {
          return false
        }
      },
      purchase(item, cost) {
        if (this.pay(cost)) {
          this.character.inventory.push(item)
        } else {
          return false
        }
      }
    },
    mixins: [dice],
    name: 'Story',
    watch: {
      coin(amount) {
        if (this.coin != null && this.coin != undefined) {
          this.character.purse += amount
        }
      }
    }
  }
</script>
