<template>
  <section id="character-creation">
    <div class="left side" :class="{ 'page-2': page === 2 }">
      <template v-if="page === 1">
        <div>
          <label for="name">Name:</label>
          <input
            autoComplete="off"
            type="text"
            name="name"
            v-model="name"
            id="name"
          />
          <label for="bio">Bio:</label>
          <textarea name="bio" v-model="bio" id="bio" />
          <button
            class="secondary-button"
            id="randomize-bio"
            disabled
            :page="page"
            @click="randomizeBio()"
          >
            Randomize bio
          </button>
          <button
            class="primary-button mobile"
            id="next-step"
            v-if="page === 1 && windowSize < 980"
            :page="page"
            @click="saveGo(page)"
          >
            Next
          </button>
        </div>
      </template>
      <template v-else>
        <div id="stats-wrapper">
          <div class="flex-wrapper">
            <button
              id="help-button"
              @mouseenter="toggleHelpMsg($event)"
              @mouseleave="toggleHelpMsg($event)"
              @click="toggleHelpMsg($event)"
            >
              Help
            </button>
            <div class="hidden" id="help-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo rem
              alias impedit quam id nemo praesentium? Dicta enim in, pariatur
              sit repudiandae dolore eligendi cumque dolorum repellendus, hic
              velit incidunt!
            </div>
            <label for="stats">Stats:</label>
            <div id="available-points">
              Available Points: <span>{{ points }} </span>
            </div>
          </div>
          <ul id="stats">
            <li v-for="(value, name) in stats" :key="name">
              {{ name }}
              <span>
                <button
                  :class="name + ' decrease stat-button'"
                  @click="onStatsClick('-', name, value)"
                >
                  -
                </button>
                <button
                  :class="name + ' increase stat-button'"
                  @click="onStatsClick('+', name, value)"
                >
                  +
                </button>
                <div class="stat-value">
                  {{ value }}
                </div>
              </span>
            </li>
          </ul>
          <button class="primary-button" id="reset-stats" @click="resetStats()">
            Reset stats
          </button>
        </div>
        <div id="button-wrapper">
          <button
            class="secondary-button"
            id="randomize-stats"
            @click="randomizeStats()"
          >
            Randomize stats
          </button>
          <button
            class="primary-button mobile"
            id="go-back"
            v-if="page === 2 && windowSize < 980"
            :page="page"
            @click="page = 1"
          >
            Go back
          </button>
          <button
            id="save-go"
            class="primary-button"
            :page="page"
            @click="saveGo(page)"
          >
            Save and Go
          </button>
        </div>
      </template>
    </div>
    <div class="right side" :class="{ 'page-2': page === 2 }">
      <div id="name-value" v-if="page === 2">{{ name }}</div>
      <div id="left-wrapper">
        <div id="img-wrapper">
          <button v-if="page === 1" class="arrow left" @click="onClickImg('-')">
            left
          </button>
          <div
            :style="'background-image: url(' + img[0] + ')'"
            id="character-image"
          />
          <button
            v-if="page === 1"
            class="arrow right"
            @click="onClickImg('+')"
          >
            right
          </button>
        </div>
        <button
          class="primary-button"
          id="go-back"
          v-if="page === 2 && windowSize > 979"
          :page="page"
          @click="page = 1"
        >
          Go back
        </button>
        <button
          class="primary-button"
          id="next-step"
          v-if="page === 1 && windowSize > 979"
          :page="page"
          @click="saveGo(page)"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    mounted() {
      this.page = 1

      this.$nextTick(() => {
        window.addEventListener('resize', this.onResize)
      })
    },
    watch: {
      windowSize(n, old) {
        console.log('Window changed from' + old + ' To ' + n)
      }
    },
    data() {
      return {
        page: 1,
        name: null,
        bio: null,
        img: [
          require('../../public/images/character-1.jpg'),
          require('../../public/images/character-2.jpg'),
          require('../assets/logo.png'),
          require('../assets/arrow.svg')
        ], // TODO Example images until the real images are defined.
        imgIndex: 0,
        points: 10,
        stats: {
          strength: 3,
          agility: 3,
          intellect: 3,
          luck: 3
        },
        isMobile: false,
        windowSize: window.innerWidth
      }
    },
    methods: {
      onResize() {
        this.windowSize = window.innerWidth
      },
      randomizeBio() {
        // Do something fun here.
      },
      toggleHelpMsg(e) {
        // Bug on mobile. Probobly need to rewrite function to work properly on both hover state and click. TODO
        if (window.innerWidth < 980 && e.type === 'mouseenter') {
          return
        }

        let msg = document.getElementById('help-text')

        if (msg.classList.contains('hidden')) {
          msg.classList.remove('hidden')
        } else {
          msg.classList.add('hidden')
        }
      },
      saveGo(page) {
        if (page === 1) {
          // Stop user from continuing if there is no name.
          if (this.name === null || this.name === '') {
            document.getElementById('name').style.border = '1px solid darkred'
            let msg = document.createElement('div')
            msg.innerHTML = '* Name is required'
            msg.style.color = 'red'
            msg.style.textAlign = 'left'
            msg.style.marginTop = '-40px'
            document.getElementById('name').after(msg)
          } else {
            this.page = 2
            document.getElementById('name').style.border = '0'
          }
        } else {
          // Save to $store.
          let character = {
            name: this.name,
            stats: this.stats,
            img: this.img[this.imgIndex],
            bio: this.bio,
            purse: 2,
            inventory: [],
            consequences: [],
            progress: null,
            equipment: null
          }

          this.$store.commit('saveCharacter', character)

          if (this.page === 2) {
            this.$router.push({ path: '/story' })
          }
        }
      },
      onClickImg(operator) {
        let img = document.getElementById('character-image')
        if (operator === '+') {
          if (this.imgIndex === this.img.length - 1) {
            this.imgIndex = 0
          } else {
            this.imgIndex = this.imgIndex + 1
          }
        } else {
          if (this.imgIndex === 0) {
            this.imgIndex = this.img.length - 1
          } else {
            this.imgIndex = this.imgIndex - 1
          }
        }
        img.style.backgroundImage = 'url(' + this.img[this.imgIndex] + ')'
      },
      randomizeStats() {
        // If we got no available points then we do nothing.
        if (this.points === 0) {
          return
        }

        let keys = Object.keys(this.stats)

        // Shuffle the keys array to make stat generation more random.
        for (let i = keys.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1))
          let temp = keys[i]
          keys[i] = keys[j]
          keys[j] = temp
        }

        for (let i = 0; i < keys.length; i++) {
          // Disable all add buttons
          document
            .getElementsByClassName(keys[i] + ' increase')[0]
            .setAttribute('disabled', '')

          // If the available points are greater than 0 we run a math random to
          // generate the new stat value.
          if (this.points > 0) {
            let value = Math.floor(Math.random() * this.points + 1)
            this.points -= value

            // Get name of stat we want to alter.
            let key_name = keys[i]

            this.stats[key_name] += value

            if (this.points != 0 && i === keys.length - 1) {
              this.stats[key_name] += this.points
            }
          }

          // Enable decrease button if value is greater than 0.
          if (this.stats[keys[i]] > 0) {
            document
              .getElementsByClassName(keys[i] + ' decrease')[0]
              .removeAttribute('disabled')
          }
        }
      },
      resetStats() {
        for (let i = 0; i < Object.keys(this.stats).length; i++) {
          const name = Object.keys(this.stats)[i]
          this.stats[name] = 3
        }

        document.getElementsByClassName('stat-button').forEach(element => {
          element.removeAttribute('disabled')
        })

        this.points = 10
      },
      onStatsClick(operator, name, value) {
        if (operator === '+') {
          value = value + 1
          this.points -= 1
        } else {
          value = value - 1
          this.points += 1
        }

        // If value is less than 1 we disable the decrease button.
        if (value < 1) {
          document
            .getElementsByClassName(name + ' decrease')[0]
            .setAttribute('disabled', '')
        } else {
          document
            .getElementsByClassName(name + ' decrease')[0]
            .removeAttribute('disabled', '')
        }

        // If the available points reaches 0 we disable all increase buttons.
        if (this.points < 1) {
          document.getElementsByClassName('increase').forEach(element => {
            element.setAttribute('disabled', '')
          })
        } else {
          // And if the user removes a point from the stats we enable all increase
          // buttons again.
          document.getElementsByClassName('increase').forEach(element => {
            element.removeAttribute('disabled', '')
          })
        }

        this.stats[name] = value
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/style/variables.scss';

  #character-creation {
    display: flex;
    background-color: #949191;
    overflow-x: hidden;
    flex-direction: column;
    justify-content: center;
    margin: 100px;
    background: rgba(0, 0, 0, 0.71);

    @media (max-width: 1024px) {
      margin: 0;
    }

    #left-wrapper {
      display: flex;
      flex-direction: column;
    }

    .hidden {
      display: none;
    }

    .flex-wrapper {
      display: flex;
      width: 100%;
      margin: 0;
      justify-items: flex-start;
    }

    #button-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      max-width: unset;
      margin: 0;

      @media (min-width: $breakpoint-desktop-small) {
        flex-wrap: nowrap;
      }
    }

    .side {
      box-sizing: border-box;
      width: 100%;
      padding: 40px;

      input,
      label,
      textarea {
        display: block;
        font-size: 20px;
        text-align: left;
        color: #fff;
      }

      label {
        margin: 10px 0;
        margin-top: 40px;
      }

      input,
      textarea {
        max-width: 522px;
        width: 100%;
        margin: auto;
        border-radius: 5px;
        border: 0px;
        padding: 12px;
        font-size: 16px;
        color: #000;
        box-sizing: border-box;
      }

      textarea {
        min-height: 209px;
      }

      input {
        margin-bottom: 60px;
      }

      &.page-2 {
        &.left {
          order: 2;
        }
        &.right {
          order: 1;
          position: relative;
          display: flex;
          flex-direction: column;
        }
      }

      &.right {
        order: 1;

        @media (min-width: $breakpoint-desktop-small) {
          order: 2;
        }
      }

      &.left {
        order: 2;

        div {
          position: relative;
          max-width: 522px;
          margin: auto;
        }

        #available-points {
          text-align: right;
          margin-right: 0;
          margin-left: auto;
          margin: auto 0 11px auto;
          justify-self: flex-end;
          color: #fff;
        }

        .stat-value {
          display: inline-block;
          width: 50px;
          margin: 10px;
          text-align: right;
        }

        #stats-wrapper {
          height: 416px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          margin-bottom: 40px;

          .flex-wrapper {
            border-bottom: 1px solid #373737;

            span {
              color: #fff;
            }
          }
        }

        @media (min-width: $breakpoint-desktop-small) {
          order: 1;
        }
      }

      @media (min-width: $breakpoint-desktop-small) {
        width: 50%;
      }
    }

    #name-value {
      font-size: 24px;
      text-align: left;
      transform: translateX(-50%);
      margin-left: 50%;
      width: 414px;
      text-transform: capitalize;
      color: #fff;
      @media (max-width: 979px) {
        width: calc(100% - 40px);
        max-width: 414px;
      }
    }

    #img-wrapper {
      display: flex;
      justify-content: center;

      #character-image {
        width: 414px;
        height: 416px;
        background-color: white;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin: 20px 20px 0;
      }

      button {
        height: 30px;
        width: 30px;
        background-image: url('../assets/white-arrow.svg');
        border: 0;
        background-color: transparent;
        background-repeat: no-repeat;
        background-position: center;
        margin: auto 0;
        text-indent: -99999px;
        cursor: pointer;

        &.left {
          transform: rotate(180deg);
        }
      }
    }
    #save-go {
      margin: 80px 0 60px;

      @media (max-width: 979px) {
        max-width: 522px;
        width: calc(50% - 5px);
        box-sizing: border-box;
        min-width: 137px;
        font-size: 100%;
        margin: 0 0 0 0px;
      }
    }

    #next-step {
      &.mobile {
        @media (max-width: $breakpoint-desktop-small) {
          width: 100%;
          margin: 20px 0;
        }
      }

      @media (min-width: $breakpoint-desktop-small) {
        position: unset;
      }
    }

    #go-back {
      margin: auto;
      width: 414px;
      margin-top: 4.5rem;

      &.mobile {
        @media (max-width: 979px) {
          transform: unset;
          width: calc(50% - 5px);
          font-size: 100%;
          min-width: 137px;
          margin: 0 5px 0 0;
        }
      }

      @media (min-width: $breakpoint-desktop-small) and (max-width: 1024px) {
        margin-left: 33.5%;
        position: unset;
      }
      @media (min-width: 1024px) {
        position: unset;
      }
    }

    #randomize-bio {
      margin-right: calc(100% - 89px);
      margin-bottom: 100px;

      @media (max-width: 979px) {
        margin: 40px 0 20px;
      }
    }

    #randomize-stats {
      transform: unset;
      display: inline-block;
    }

    button[id*='randomize'] {
      margin: 80px 0 60px;
      background: #fff;
      color: #373737;

      &:disabled {
        opacity: 0.6;
        cursor: unset;
      }

      @media (max-width: 979px) {
        width: 100%;
      }

      @media (min-width: $breakpoint-desktop-small) {
        margin: 5rem 0 60px;
      }
    }

    .stat-button {
      width: 23px;
      height: 21px;
      border-radius: 3px;
      padding: 2px;
      margin-left: 5px;
    }

    #reset-stats {
      width: auto;
      white-space: nowrap;
      justify-self: flex-end;
      margin: 0;
      margin-left: auto;
      @media (max-width: 979px) {
        font-size: 100%;
      }
    }

    #help-button {
      width: 21px;
      height: 21px;
      border-radius: 21px;
      text-indent: -999999px;
      margin: auto 10px 10px 0;
      background-color: #c4c4c4;
      border-width: 1px;
      padding: 0;

      &::after {
        content: '?';
        position: absolute;
        margin-left: 999985px;
        font-size: 16px;
        margin-top: -1px;
        color: #000;
      }
    }

    #help-text {
      position: absolute;
      top: 73px;
      margin-bottom: auto;
      padding: 20px;
      background: #373737;
      color: #fff;
      z-index: 10;
    }

    #stats {
      padding: 0;
      text-align: left;

      li {
        width: 100%;
        display: flex;
        padding: 0;
        list-style-type: none;
        text-transform: capitalize;
        color: #fff;

        span {
          justify-self: flex-end;
          margin-left: auto;
        }
      }
    }

    @media (min-width: $breakpoint-desktop-small) {
      flex-direction: row;

      #character-creation {
        margin: 1rem;
      }
    }
  }
</style>
