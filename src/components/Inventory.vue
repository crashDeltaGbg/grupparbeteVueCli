<template>
  <ul v-if="items">
    <li v-for="item in items" :key="item">
      {{ item }}&nbsp;<span v-if="item === equiped">E</span
      ><span v-else><a href="#" @click="equip(item)">+</a></span>
    </li>
  </ul>
</template>

<!-- TODO Funktionen 'equip()' kommer inte åt 'this.character'. Flytta this.character till store? -->

<script>
  import { equip } from '@/assets/mixins/equip.js'

  export default {
    data() {
      return {
        items: this.inv
      }
    },
    mixins: [equip],
    name: 'inventory',
    props: {
      inv: Array,
      equiped: Object
    }
  }
</script>
