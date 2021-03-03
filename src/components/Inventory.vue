<template>
  <div>
    <div>
      <div>Inventory</div>
      <ul v-if="items" id="inventory">
        <li v-for="item in items" :key="item.weapon">
          <img
            class="inventoryIcons"
            :src="item.src"
            :alt="item.weapon"
            @click="weaponStats(item)"
          /><!--{{ item.weapon }}-->&nbsp;<span
            v-if="item === equipped"
            @click="unequip()"
            >[-]</span
          ><span v-else @click="equip(item)">[+]</span>
        </li>
      </ul>
      <ul v-if="stats" id="weaponStats" @click="stats = null">
        <li>{{ weapon }}:</li>
        <li>Strength: {{ stats.strength }}</li>
        <li>Agility: {{ stats.agility }}</li>
        <li>Luck: {{ stats.luck }}</li>
        <li>Intellect: {{ stats.intellect }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { equip } from '@/assets/mixins/equip.js'

  export default {
    data() {
      return {
        items: this.inv,
        stats: null,
        weapon: null
      }
    },
    methods: {
      weaponStats(obj) {
        this.weapon = obj.weapon
        this.stats = obj.stats
      }
    },
    mixins: [equip],
    name: 'inventory',
    props: {
      character: Object,
      equipped: Object,
      inv: Array,
      purse: Number
    }
  }
</script>

<style scoped>
  .inventoryIcons {
    height: 30px;
  }
  ul {
    padding: 0;
  }
</style>
