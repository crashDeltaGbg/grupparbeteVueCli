<template>
  <section id="story">
    <Navbar class="top-layer" :title="heading" :character="character"></Navbar>
    <section id="content">
      <div id="status" v-if="character">
        <span v-if="character.purse">Coin: {{ character.purse }}</span
        >&nbsp;<Inventory
          :inv="character.inventory"
          :purse="character.purse"
          :equiped="character.equipment"
          :character="character"
        />&nbsp;<span v-if="character.equipment">{{
          character.equipment.weapon
        }}</span
        >&nbsp;<span>{{ effectiveStats() }}</span
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
            <li v-for="(option, index) in options" :key="option.id">
              <input
                class="options-button"
                :class="{
                  'primary-button': index === 0,
                  'third-button': index === 1
                }"
                type="button"
                :value="option.text"
                @click="onClick(option.proceed)"
              />
            </li>
          </ul>
        </div>
      </template>
    </section>
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
      character: {
        get() {
          return this.$store.state.character
        },
        set() {
          this.$store.commit('updateChar', this.character)
        }
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
      async getStory(path = 'introduction-1') {
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
      effectiveStats() {
        if (this.character.equipment && this.character.equipment.stats) {
          let base = this.character.stats
          console.log(base)
          let bonus = this.character.equipment.stats
          console.log(bonus.strength)
          let strength = Number(base.strength) + Number(bonus.strength)
          console.log(strength)
          let agility = Number(base.agility) + Number(bonus.agility)
          let luck = Number(base.luck) + Number(bonus.luck)
          let intellect = Number(base.intellect) + Number(bonus.intellect)
          return {
            strength,
            agility,
            luck,
            intellect
          }
        } else {
          return this.character.stats
        }
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
      if (
        this.character != {} &&
        this.character != null &&
        this.character != undefined
      ) {
        if (this.character.progress != null) {
          this.getStory(this.character.progress)
          console.log('a')
        } else {
          this.getStory()
          console.log('b')
        }
      } else {
        this.load('character')
        console.log(this.character)
        console.log('c')
      }
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

          // TODO: Here it would be fun if the bgr changed dynamically to!
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

<style lang="scss">
  @import '../assets/style/variables.scss';

  .top-layer {
    position: absolute;
    z-index: 100;
    width: 100vw;
  }

  #story {
    background-image: url(../assets/bgr/bgr-1.jpg);
    filter: saturate(130%);
    background-size: cover;
    background-position: center;
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding-bottom: 0;
    z-index: -1;
    overflow: auto;

    #content {
      padding: 20px;
      padding-top: 60px;
      top: 0;
      z-index: 0;
      padding-right: 20px;
      color: #fff;
      text-align: left;
      height: calc(100% - 120px);
      background: rgba($black, 0.7);

      @media (min-width: $breakpoint-tablet) {
        position: absolute;
        padding: 40px;
        padding-top: 140px;
        background: linear-gradient(
          90.26deg,
          rgba($black, 0.8) 6.65%,
          rgba($black, 0.8) 56.42%,
          rgba($black, 0.56) 73.99%,
          rgba($black, 0) 97.05%
        );
        padding-right: 30%;
      }

      #text {
        h2,
        h1 {
          font-size: $font-size-h2;
        }
      }

      #options {
        ul {
          display: flex;
          margin: 40px 0;
          justify-content: flex-start;
          padding: 0;

          li {
            list-style-type: none;

            .primary-button,
            .third-button {
              margin: 0;
            }

            .third-button {
              margin: 0 auto 0 20px;
            }
          }
        }
      }
    }

    @media (max-width: 767px) {
      padding: 0;
      padding-bottom: 20px;
    }
  }
</style>
