<template>
  <div>
    <div id="purse">Coin:&nbsp;{{ purse }}</div>
    <div>
      <div>Inventory</div>
      <ul v-if="items" id="inventory">
        <li v-for="item in items" :key="item.weapon">
          {{ item.weapon }}&nbsp;<span
            v-if="item === equiped"
            @click="unequip()"
            >-</span
          ><span v-else @click="equip(item)">+</span>
        </li>
      </ul>
    </div>
  </div>
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
      character: Object,
      equiped: Object,
      inv: Array,
      purse: Number
    }
  }
</script>
