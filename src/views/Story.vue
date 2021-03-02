<template>
  <section id="story">
    <Navbar class="top-layer" :title="heading"></Navbar>
    <section id="content">
      <div id="status" v-if="character">
        <div id="purse" v-if="character.purse">{{ character.purse }}</div>
        <div id="equiped" v-if="character.equiped">{{ character.equiped }}</div>
        <div v-if="character.inventory.length > 0">
          <Inventory
            :inv="character.inventory"
            :equiped="character.equipment"
            :character="character"
          />
        </div>
        <div id="character-stats">
          Your Stats:
          <ul>
            <li>Strength: {{ effectiveStats().strength }}</li>
            <li>Agillity: {{ effectiveStats().agility }}</li>
            <li>Intellect: {{ effectiveStats().intellect }}</li>
            <li>Luck: {{ effectiveStats().luck }}</li>
          </ul>
        </div>
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
                  class="secondary-button"
                  @click="measure(chance)"
                />
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <input
            type="button"
            class="secondary-button"
            value="Pay cost"
            @click="pay(cost)"
          />
          <template>
            <div>
              <p>
                {{ message }}
                <br />
                <input
                  v-if="pay === true"
                  type="button"
                  value="OK"
                  class="third-button"
                  @click="getStory(options[0].proceed)"
                />
              </p>
            </div>
          </template>
          <div>
            <input
              type="button"
              value="Leave"
              class="primary-button"
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
        heading: 'The Story',
        item: null,
        markdown: null,
        merchandice: null,
        message: null,
        options: null,
        player: null,
        success: null
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
        } else {
          this.getStory()
        }
      } else {
        this.load('character')
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

              if (window.innerWidth < 980 && window.innerWidth > 767) {
                // Split string at 34 characters.
                if (title.length > 9) {
                  title = title.match(/.{1,9}/g)[0]
                }
              } else if (window.innerWidth < 768) {
                // Split string at 34 characters.
                if (title.length > 34) {
                  title = title.match(/.{1,34}/g)[0] + '...'
                }
              } else {
                // Split string at 42 characters.
                if (title.length > 42) {
                  title = title.match(/.{1,42}/g)[0] + '...'
                }
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

  #chance {
    li {
      list-style-type: none;
    }
  }

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
      min-height: inherit;
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
        min-width: 65%;
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
          flex-direction: column;
          padding: 0;

          li {
            list-style-type: none;

            .primary-button,
            .third-button {
              margin: 0;
            }

            .third-button {
              margin: 20px 0;
              @media (min-width: $breakpoint-desktop-small) {
                margin: 0 auto 0 20px;
              }
            }
          }

          @media (min-width: $breakpoint-desktop-small) {
            flex-direction: row;
          }
        }
      }

      #status {
        background: rgba($black, 0.8);
        width: 100%;
        position: unset;
        right: unset;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        > div {
          max-width: 160px;
          margin: 20px auto;

          ul {
            li {
              list-style-type: none;
            }
          }
        }

        #purse {
          background-image: url(../assets/icons/coins.png);
          background-repeat: no-repeat;
          background-position: left center;
          padding-left: 60px;
        }

        #character-stats {
          font-size: 12px;
          font-weight: bold;

          ul {
            padding: 0;
            margin: 4px 0;

            li {
              list-style-type: none;
              font-weight: 100;
            }
          }
        }

        @media (min-width: $breakpoint-tablet) {
          position: absolute;
          right: 20px;
          max-width: 160px;
          display: block;

          > div {
            margin: 20px;
            max-width: unset;
          }
        }
        @media (min-width: $breakpoint-desktop-small) {
          right: 90px;
        }
      }

      .secondary-button {
        color: #000;
      }

      .primary-button,
      .secondary-button,
      .third-button {
        margin: 20px 0;
        white-space: pre-wrap;
        height: auto;
        min-height: 47px;
      }
    }

    @media (max-width: 767px) {
      padding: 0;
    }
  }
</style>
