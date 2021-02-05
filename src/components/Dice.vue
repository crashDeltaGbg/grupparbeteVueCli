<template>
  <input type="button" @click="roll()" :value="face"/>
</template>

<script>

export default {
  created() {
    console.log(this.die)
  },
  data() {
    return {
      face: 'roll',
      dice: {
        D4: {min: 1, max: 4, multiplier: 1},
        D6: {min: 1, max: 6, multiplier: 1},
        D8: {min: 1, max: 8, multiplier: 1},
        D10: {min: 0, max: 10, multiplier: 1},
        D12: {min: 1, max: 12, multiplier: 1},
        D20: {min: 1, max: 20, multiplier: 1},
        D100: {min: 0, max: 10, multiplier: 10}
      }
    }
  },
  methods: {
    roll() {
      this.face = (Math.floor(Math.random() * Number(this.dice[this.type].max)) + Number(this.dice[this.type].min)) * Number(this.dice[this.type].multiplier)
      console.log(this.face)
    }
  },
  name: 'dice',
  props: ['type']
}

</script>