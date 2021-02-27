export const measure = {
  computed: {
    character() {
      return this.$store.state.character
    }
  },
  methods: {
    measure(stat) {
      let score = this.roll(this.die) + this.character.stats[stat]
      // let score = this.roll(this.die) + Number(this.effectiveStats[stat])
      // console.log(score)
      let target = this.roll(this.die) + Number(this.success)
      // console.log(target)
      if (score >= target) {
        this.getStory(this.options[0].proceed)
      } else {
        this.getStory(this.options[1].proceed)
      }
    }
  }
}
