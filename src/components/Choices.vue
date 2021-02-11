<template>
  <div>
    <p>Will you save the prince from the dragon?</p>
    <input
      type="button"
      :key="choice"
      value="Choose"
      :disabled="enableDisable"
      @click="checkStats"
    />
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        choice: 'Choose',
        player: {
          strength: 5,
          intelligence: 5,
          agility: 1,
          luck: 15
        },
        isPrinceAlive: true,
        encounter: 20,
        enableDisable: false
      }
    },
    props: ['type'],
    methods: {
      checkStats() {
        this.$store.dispatch('roll')
        console.log(this.$store.state.diceValue)
        this.choice = this.player[this.type]
        if (
          this.choice + this.$store.state.diceValue >= this.encounter &&
          this.isPrinceAlive === true
        ) {
          console.log('Congratulations! You beat the dragon!')
          this.enableDisable = true
        } else {
          console.log('Failure.')
          this.enableDisable = true
        }
      }
    }
  }
</script>
<style scoped></style>
