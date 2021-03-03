<template>
  <div id="wrap">
    <Navbar id="navve" title="Previous Games"></Navbar>
    <div id="container">
      <div v-if="saves">
        <ul>
          <li v-for="save in saves" :key="save">
            <button
              id="buttons"
              class="primary-button"
              @click="loadCharacter(save)"
            >
              {{ save }}
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        There are no saved games.
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'

  export default {
    name: 'Introduction',
    components: {
      Navbar
    },
    created() {
      if (localStorage.gameSaves) {
        this.savesRaw = JSON.parse(localStorage.gameSaves)
      }
    },
    data() {
      return {
        savesRaw: [],
        saves: [],
        character: null
      }
    },
    methods: {
      loadCharacter(save) {
        this.character = this.savesRaw.find(x => x[save])[save]
        this.$store.commit('saveCharacter', this.character)
        this.$router.push({ path: `/story` })
      }
    },
    watch: {
      savesRaw() {
        let save
        this.saves = []
        for (let i = 0; i < this.savesRaw.length; i++) {
          save = Object.keys(this.savesRaw[i])[0]
          this.saves.push(save)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/style/variables.scss';

  #navve {
    position: relative;
    padding-top: 60px;
    @media (max-width: 688px) {
      padding-top: 0px;
    }
  }

  #wrap::before {
    content: '';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.8);
  }

  #wrap {
    background-image: url(../../public/images/Wizard.jpg);
    position: relative;
    background-size: cover;
    background-position: center;
  }

  #container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    position: relative;
    overflow-x: hidden;
    flex-wrap: wrap;
    list-style: none;
    margin: 0;
    padding-top: 40px;
  }

  li,
  ul {
    list-style: none;
    padding: 0;
  }

  #buttons {
    margin: 17px;
  }
</style>
