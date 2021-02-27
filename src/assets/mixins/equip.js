export const equip = {
  computed: {
    character() {
      return this.$store.state.character
    }
  },
  data() {
    return {
      effectiveStats: {
        strength: null,
        agility: null,
        luck: null,
        intellect: null
      }
    }
  },
  methods: {
    equip(item) {
      this.character.equipment = item
    }
  },
  watch: {
    equipment() {
      if (this.character.equipment != null) {
        this.effectiveStats.strength =
          this.character.strenght + this.character.equipment.strength
        this.effectiveStats.agility =
          this.character.agility + this.character.equipment.agility
        this.effectiveStats.luck =
          this.character.luck + this.character.equipment.luck
        this.effectiveStats.intellect =
          this.character.intellect + this.character.equipment.intellect
      } else {
        this.effectiveStats = this.character.stats
      }
    }
  }
}
