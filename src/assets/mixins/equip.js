export const equip = {
  methods: {
    equip(item) {
      this.character.equipment = item
    },
    unequip() {
      this.character.equipment = null
    }
  }
}
