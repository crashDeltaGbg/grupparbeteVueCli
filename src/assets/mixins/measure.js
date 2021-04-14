export const measure = {
  methods: {
    measure(stat) {
      let score = this.roll(this.die) + this.effectiveStats()[stat]
      let target = this.roll(this.die) + Number(this.success)
      if (score >= target) {
        this.getStory(this.options[0].proceed)
      } else {
        this.getStory(this.options[1].proceed)
      }
    }
  }
}
