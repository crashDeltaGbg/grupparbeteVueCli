<template>
  <div class="about">
    <div id="status">
      <span>Coin: {{ character.purse }}</span
      >&nbsp;
      <span>Inventory: {{ character.inventory }}</span>
    </div>

    <div v-if="markdown" v-html="markdown" id="text">
      <!-- Här läses texten in -->
    </div>
    <div v-else>
      <h1>Uh-oh!</h1>
      <p>Something's amiss :(</p>
    </div>
    <template v-if="die || cost">
      <div v-if="die">
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
      </div>
      <div v-else>
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
      </div>
    </template>
    <template v-else>
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
        coin: null,
        cost: null,
        die: null,
        item: null,
        markdown: null,
        merchandice: null,
        message: null,
        options: null,
        success: null
      }
    },
    methods: {
      async getStory(path) {
        const response = await fetch(`/story/json/story.json`)
        const result = await response.json()
        // console.log(result)
        this.options = result[path].options
        // console.log(this.options)
        // console.log(this.options.proceed)
        this.selectFile(result[path].alias)
        // console.log(result.md_file_path)
        this.die = result[path].die
        // console.log(this.die)
        this.chance = result[path].chance
        this.success = result[path].success
        this.coin = result[path].coin
        this.cost = result[path].cost
        this.item = result[path].item
        console.log(this.item)
        // console.log(this.success)
      },
      async selectFile(fileName) {
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
        let score = this.roll(this.die) + this.character[stat]
        console.log(score)
        let threshold = this.roll(this.die) + Number(this.success)
        console.log(threshold)
        if (score >= threshold) {
          this.getStory(this.options[0].proceed)
          // console.log(this.options[0].proceed)
        } else {
          this.getStory(this.options[1].proceed)
        }
      },
      obtain(item) {
        this.item = item
      },
      pay(cost) {
        if (this.character.purse >= cost) {
          this.character.purse -= cost
          this.message = `You pay ${cost} coin.`
          return (this.pay = true)
        } else {
          this.message = `You don't have enough coin.`
          return (this.pay = false)
        }
      },
      purchase(item, cost) {
        let checkOut = this.pay(cost)
        if (checkOut) {
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
      },
      item(obj) {
        if (this.item != null && this.item != undefined) {
          // let x = JSON.parse(obj)
          this.character.inventory.push(obj)
        }
      }
    }
  }
</script>
