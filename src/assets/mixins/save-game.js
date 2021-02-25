export const saveGame = {
  data() {
    return {
      arr: []
    }
  },
  methods: {
    add() {
      // working
      this.arr = []
      this.arr.push(this.character)
    },
    save() {
      if (localStorage.gameSaves) {
        this.arr = JSON.parse(localStorage.gameSaves)
      }
      let save = { [this.character.name]: this.character }
      let check = null
      for (let i = 0; i < this.arr.length; i++) {
        if (this.character.name === Object.keys(this.arr[i])[0]) {
          check = i
        }
      }
      if (check != null && check > -1) {
        this.arr[check] = save
      } else {
        this.arr.push(save)
      }
      window.localStorage.setItem(`gameSaves`, JSON.stringify(this.arr))
    },
    load(fileName) {
      this.character = JSON.parse(window.localStorage.getItem(fileName))
    }
  },
  name: 'SaveGameFunction'
}
