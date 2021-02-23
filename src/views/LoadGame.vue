<template>
  <div>
    <ul v-if="saves">
      <li v-for="save in saves" :key="save">{{ save }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    created() {
      if (localStorage.gameSaves) {
        this.saves = JSON.parse(localStorage.gameSaves)
      }
      /* const gameSaves = JSON.parse(localStorage.gameSaves)
      gameSaves.forEach(save => {
        this.saves.push(save)
      })
      console.log(this.saves) */
    },
    data() {
      return {
        saves: []
      }
    }
  }
</script>
