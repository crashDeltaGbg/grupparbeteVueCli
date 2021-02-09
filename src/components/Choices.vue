<template>
  <div>
    <p>Will you save the prince from the dragon?</p>
    <input type="button" :key="choice" value="Choose" :disabled=enableDisable @click="checkStats">  
    <Dice type="D20"/> D20<br/>

  </div>  
</template>
<script>
import Dice from '@/components/Dice.vue'

export default {
  components: {
    Dice
  },
  data(){
    return{
      choice:'Choose',
      player: {      
        strength: 5,
        intelligence: 5,
        agility: 1,
        luck: 15
        },
      isPrinceAlive: true,
      encounter: 20,
      enableDisable: false
    }
  },
  props: ['type'],
  methods:{
    checkStats(){
      this.$store.dispatch('roll')
      console.log(this.$store.state.diceValue)
      this.choice = this.player[this.type]
      if(this.choice+this.$store.state.diceValue>= this.encounter && this.isPrinceAlive === true){
        console.log('Congratulations! You beat the dragon!')
      } else{
        console.log('Failure.')
      }
    }
  }
}
</script>
<style scoped>

</style>