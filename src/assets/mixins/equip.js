export const equip = {
  computed: {
    character() {
      return this.$store.state.character
    }
  },
  methods: {
    equip(item) {
      this.character.equipment = item
    },
    unequip() {
      this.character.equipment = null
    }
  }
}
