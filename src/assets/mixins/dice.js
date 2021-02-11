export const dice = {
  created() {
    return this.face
  },
  data() {
    return {
      face: 'roll',
      D4: {min: 1, max: 4, multiplier: 1},
      D6: {min: 1, max: 6, multiplier: 1},
      D8: {min: 1, max: 8, multiplier: 1},
      D10: {min: 0, max: 10, multiplier: 1},
      D12: {min: 1, max: 12, multiplier: 1},
      D20: {min: 1, max: 20, multiplier: 1},
      D100: {min: 0, max: 10, multiplier: 10}
    }
  },
  methods: {
    roll(die) {
      this.face = (Math.floor(Math.random() * this[die].max) + this[die].min) * this[die].multiplier
    }
  },
  name: 'dice'
}