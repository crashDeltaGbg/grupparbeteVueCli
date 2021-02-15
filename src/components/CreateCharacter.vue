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
        </div>
      </template>
      <template v-else>
        <div id="stats-wrapper">
          <div class="flex-wrapper">
            <button
              id="help-button"
              @mouseover="toggleHelpMsg()"
              @mouseleave="toggleHelpMsg()"
              @click="toggleHelpMsg()"
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
        <button
          class="secondary-button"
          id="randomize-stats"
          @click="randomizeStats()"
        >
          Randomize stats
        </button>
        <button
          id="save-go"
          class="primary-button"
          :page="page"
          @click="saveGo(page)"
        >
          Save and Go
        </button>
      </template>
    </div>
    <div class="right side" :class="{ 'page-2': page === 2 }">
      <div id="name-value" v-if="page === 2">{{ name }}</div>
      <div id="img-wrapper">
        <button v-if="page === 1" class="arrow left" @click="onClickImg('-')">
          left
        </button>
        <div
          :style="'background-image: url(' + img[0] + ')'"
          id="character-image"
        />
        <button v-if="page === 1" class="arrow right" @click="onClickImg('+')">
          right
        </button>
      </div>
      <button
        class="primary-button"
        id="go-back"
        v-if="page === 2"
        :page="page"
        @click="page = 1"
      >
        Go back
      </button>
      <button
        class="primary-button"
        id="next-step"
        v-if="page === 1"
        :page="page"
        @click="saveGo(page)"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script>
  export default {
    mounted() {
      this.page = 1
    },
    data() {
      return {
        page: 1,
        name: null,
        bio: null,
        img: [require('../assets/logo.png'), require('../assets/arrow.svg')], // TODO Example images until the real images are defined.
        imgIndex: 0,
        points: 10,
        stats: {
          stength: 3,
          agility: 3,
          intellect: 3,
          luck: 3
        }
      }
    },
    methods: {
      randomizeBio() {
        // Do something fun here.
      },
      toggleHelpMsg() {
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
            bio: this.bio
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

        document.getElementsByClassName('stat-button').forEach((element) => {
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
          document.getElementsByClassName('increase').forEach((element) => {
            element.setAttribute('disabled', '')
          })
        } else {
          // And if the user removes a point from the stats we enable all increase
          // buttons again.
          document.getElementsByClassName('increase').forEach((element) => {
            element.removeAttribute('disabled', '')
          })
        }

        this.stats[name] = value
      }
    }
  }
</script>

<style scoped lang="scss">
  #character-creation {
    display: flex;
    background-color: #949191;
    overflow-x: hidden;

    .hidden {
      display: none;
    }

    .flex-wrapper {
      display: flex;
      width: 100%;
      margin: 0;
      justify-items: flex-start;
    }

    .page-2 {
      &.left {
        order: 2;
      }
      &.right {
        order: 1;
        position: relative;
      }
    }

    .side {
      width: 50%;
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
        width: 522px;
        margin: auto;
        border-radius: 5px;
        border: 0px;
        padding: 12px;
        font-size: 16px;
        color: #000;
      }

      textarea {
        min-height: 209px;
      }

      input {
        margin-bottom: 60px;
      }

      &.right {
        background-color: #c4c4c4;
      }

      &.left {
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
      }
    }

    #name-value {
      font-size: 24px;
      text-align: left;
      transform: translateX(-50%);
      margin-left: 50%;
      width: 414px;
      text-transform: capitalize;
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
        background-size: contain;
        margin: 20px;
      }

      button {
        height: 30px;
        width: 30px;
        background-image: url('../assets/arrow.svg');
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

    #next-step {
      transform: translateX(50%);
      margin-right: 107px;
    }

    #go-back {
      transform: translateX(-50%);
      margin-left: 107px;
    }

    #randomize-bio {
      margin-right: calc(100% - 89px);
    }

    button[id*='randomize'] {
      margin: 80px 0 60px;
      background: #fff;
      color: #373737;

      &:disabled {
        opacity: 0.6;
        cursor: unset;
      }
    }

    #reset-stats {
      width: auto;
      white-space: nowrap;
      justify-self: flex-end;
      margin: 0;
      margin-left: auto;
    }

    #help-button {
      width: 21px;
      height: 21px;
      border-radius: 21px;
      text-indent: -999999px;
      margin: auto 10px 10px 0;
      background-color: #c4c4c4;
      border-width: 1px;

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
      text-align: left;
      padding: 0;

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
  }
</style>
