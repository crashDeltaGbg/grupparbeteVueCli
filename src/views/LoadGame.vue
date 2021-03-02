<template>
  <div v-if="saves">
    <ul>
      <li v-for="save in saves" :key="save">
        <button @click="loadCharacter(save)">{{ save }}</button>
      </li>
    </ul>
  </div>
  <div v-else>
    There are no saved games.
  </div>
</template>

<script>
  export default {
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
