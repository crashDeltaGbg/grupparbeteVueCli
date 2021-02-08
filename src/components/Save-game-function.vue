<template>
  <span>
    <p>{{ arr }}</p>
    <input type="button" @click="add()" value="Add"/><br/>
    <input type="button" @click="save()" value="Save"/><br/>
    <input type="button" @click="load()" value="Load"/>
  </span>
</template>

<script>

/* För att spara nivå använd JSON-nycklar per nivå. */

export default {
  data() {
    return {
      x: {stats: {strength: 15, agility: 17, inteligence: 12, luck: 16,}},
      y: {level: '3B'},
      z: {class: 'rougue'},
      arr: []
    }
  },
  methods: {
    add() { // working
      this.arr = []
      this.arr.push(this.x, this.y, this.z)
      // console.log(this.arr)
    },
    save() { // working
      window.localStorage.setItem('save', JSON.stringify(  this.arr ))
    },
    load(){
      console.log(JSON.parse(window.localStorage.getItem('save')))
    }
  },
  name: 'SaveGameFunction'
}
</script>