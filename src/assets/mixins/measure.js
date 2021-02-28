export const measure = {
  computed: {
    character() {
      return this.$store.state.character
    }
  },
  methods: {
    measure(stat) {
      let score = this.roll(this.die) + this.character.stats[stat]
      if (this.character.equipment) {
        score += this.character.equipment.stats[stat]
      }
      let target = this.roll(this.die) + Number(this.success)
      if (score >= target) {
        this.getStory(this.options[0].proceed)
      } else {
        this.getStory(this.options[1].proceed)
      }
    }
  }
}
