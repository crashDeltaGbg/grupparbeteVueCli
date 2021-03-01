<template>
  <section id="story">
    <Navbar :title="heading"></Navbar>

    <div id="status">
      <span v-if="character.purse">Coin: {{ character.purse }}</span
      >&nbsp;<Inventory
        :inv="character.inventory"
        :equiped="character.equipment"
      />&nbsp;<span v-if="character.equipment">{{
        character.equipment.weapon
      }}</span
      >&nbsp;<span>{{ effectiveStats }}</span
      >&nbsp;<input type="button" @click="save()" value="Save" />
    </div>

    <div v-if="markdown" v-html="markdown" id="text">
      <!-- Här läses texten från markdown-filer in -->
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
  </section>
</template>

<script>
  const marked = require('marked')
  import Inventory from '@/components/Inventory.vue'
  import Navbar from '@/components/Navbar.vue'
  import { dice } from '@/assets/mixins/dice.js'
  import { equip } from '@/assets/mixins/equip.js'
  import { measure } from '@/assets/mixins/measure.js'
  import { saveGame } from '@/assets/mixins/save-game.js'

  export default {
    components: {
      Inventory,
      Navbar
    },
    computed: {
      character() {
        return this.$store.state.character
      },
      effectiveStats() {
        return this.$store.state.effectiveStats
      }
    },
    created() {
      this.getStory('introduction-1')
      if (this.character === null) {
        this.load('character')
      }
      this.character.equipment = {
        weapon: 'bent ice pick',
        stats: { luck: -1 }
      }
    },
    data() {
      return {
        chance: null,
        coin: null,
        cost: null,
        die: null,
        item: null,
        markdown: null,
        merchandice: null,
        message: null,
        options: null,
        player: null,
        success: null,
        heading: 'The Story'
      }
    },
    methods: {
      async getStory(path) {
        const response = await fetch(`/story/json/story.json`)
        const result = await response.json()
        this.selectFile(result[path].alias)
        this.options = result[path].options
        this.die = result[path].die
        this.chance = result[path].chance
        this.success = result[path].success
        this.coin = result[path].coin
        this.cost = result[path].cost
        this.character.progress = result[path].alias
        if (result[path].drop === true) {
          let items = result.dropItems
          let i = this.roll('D10')
          this.item = items[i]
        }
      },
      async selectFile(fileName) {
        const answer = await fetch(`/story/${fileName}.md`)
        const conclusion = await answer.text()
        this.markdown = marked(conclusion)
      },
      onClick(path) {
        this.getStory(path)
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
    mixins: [dice, equip, measure, saveGame],
    mounted() {
      this.getStory(this.$store.state.character.progress)
    },
    name: 'Story',
    watch: {
      heading(newText) {
        this.heading = newText
      },
      markdown(newValue) {
        // We want a dynamic heading during the story.
        if (newValue) {
          let section = document.getElementById('text')

          // If we don't get a section we don't want to run this function anymore.
          if (!section) {
            return
          }

          // Loop through the .md file and search for <H1>.
          for (let i = 0; i < section.children.length; i++) {
            const element = section.children[i]

            if (element.tagName === 'H1') {
              let title = element.innerHTML
              // Split string at 42 characters.
              if (title.length > 42) {
                title = title.match(/.{1,42}/g)[0] + '...'
              }

              this.heading = title
              return
            }
          }
        }
      },
      coin(amount) {
        if (this.coin != null && this.coin != undefined) {
          this.character.purse += amount
        }
      },
      item(obj) {
        if (this.item != null && this.item != undefined) {
          this.character.inventory.push(obj)
        }
      }
    }
  }
</script>
