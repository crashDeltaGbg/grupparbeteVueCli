<template>
  <ul v-if="items">
    <li v-for="item in items" :key="item.weapon">
      {{ item }}&nbsp;<span v-if="item === equiped" @click="unequip()">-</span
      ><span v-else @click="equip(item)">+</span>
    </li>
  </ul>
</template>

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
      equiped: Object,
      character: Object
    }
  }
</script>
