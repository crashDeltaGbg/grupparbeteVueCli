<template>
  <input type="button" @click="roll()" :value="face"/>
</template>

<script>

export default {
  data() {
    return {
      face: null,
      dice: {
        D4: {min: 1, max: 4, multiplier: 1},
        D6: {min: 1, max: 6, multiplier: 1},
        D8: {min: 1, max: 8, multiplier: 1},
        D10: {min: 0, max: 9, multiplier: 1},
        D12: {min: 1, max: 12, multiplier: 1},
        D20: {min: 1, max: 20, multiplier: 1},
        D100: {min: 0, max: 9, multiplier: 10}
      }
    }
  },
  methods: {
    roll() {
      this.face = (Math.floor(Math.random() * Number(this.dice.die.max)) + Number(this.dice.die.min)) * Number(this.dice.die.multiplier)
    }
  },
  name: 'dice',
  props: ['die']
}

</script>