<template>
  <div class="about">
    <div id="status">
      <span>Coin: {{ character.purse }}</span>
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

    <template v-if="cost">
      <input type="button" value="Pay cost" @click="pay(cost)" />
      <template>
        <div>
          <p>
            {{ message }}
            <input
              v-if="pay === true"
              type="button"
              value="OK"
              @click="getStory(options[0].proceed)"
            />
          </p>
        </div>
      </template>
      <div>
        <input
          type="button"
          value="Leave"
          @click="getStory(options[1].proceed)"
        />
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
        coin: null,
        cost: null,
        die: null,
        markdown: null,
        message: null,
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
        this.cost = result[path].cost
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
      obtain(item) {
        this.character.inventory.push(item)
      },
      pay(cost) {
        if (this.character.purse >= cost) {
          this.character.purse -= cost
          this.message = `You pay ${cost} coin.`
          return (this.pay = true)
        } else {
          this.message = `You don't have enough coin.`
        }
      },
      purchase(item, cost) {
        let checkOut = this.pay(cost)
        if (checkOut) {
          // this.character.inventory.push(item)
          this.obtain(item)
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
