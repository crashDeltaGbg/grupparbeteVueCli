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
            @click="stats ? (stats = null) : weaponStats(item)"
          /><!--{{ item.weapon }}&nbsp;<span
            v-if="item === equipped"
            @click="unequip()"
            >[-]</span
          ><span v-else @click="equip(item)">[+]</span>-->
        </li>
      </ul>
      <div v-if="stats" id="weaponStats">
        {{ weapon }}:
        <ul>
          <li>Strength: {{ stats.strength }}</li>
          <li>Agility: {{ stats.agility }}</li>
          <li>Luck: {{ stats.luck }}</li>
          <li>Intellect: {{ stats.intellect }}</li>
          <li v-if="item === equipped">
            <span @click="unequip" class="equip">Unequip</span>
          </li>
          <li v-else><span @click="equip(item)" class="equip">Equip</span></li>
        </ul>
      </div>
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
        weapon: null,
        item: null
      }
    },
    methods: {
      weaponStats(obj) {
        this.item = obj
        this.stats = obj.stats
        this.weapon = obj.weapon
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
    height: 20px;
  }
  .equip {
    background-color: white;
    color: black;
    line-height: 2em;
  }
  ul {
    padding: 0;
  }
  #weaponStats {
    font-size: 12px;
    font-weight: bold;
  }
  #weaponStats ul {
    padding: 0;
    margin: 4px 0;
  }
  #weaponStats li {
    list-style-type: none;
    font-weight: 100;
  }
</style>
