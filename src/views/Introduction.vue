<template>
  <div id="intro">
    <Navbar title="Introduction"></Navbar>
    <div>
      <h2>Welcome to Terra Autem!</h2>
      <p>
        In this land still filled with magic and mythical creatures you have
        been chosen to partake in an epic adventure that will be told for
        countless generations... if you survive to tell the bard at the end that
        is. Adventure Hunter is a textbased adventure that is inspired by
        Dungeons &amp; Dragons and INSERT RELEVANT NAME HERE where an actions
        succees or failure depends on your stats and a die system. You will
        design your avatar right after this introduction and will get to
        allocate your stats as you seem fit. While a strong warrior might not
        have much of a problem facing a troll in single combat, an agile rogue
        would be wise to wait for an ambush oppurtunity or maybe try to sneak
        past, you get the gist of it. When faced with adversity you get to roll
        a die, the relevant stat to the adversity and the total from the roll is
        added together and compared to see if you overcome the hardship or fail
        and have to suffer the consequences.
      </p>
      <button @click="continueStory()">Continue</button>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar.vue'
  export default {
    name: 'Introduction',
    components: {
      Navbar
    },
    methods: {
      continueStory() {
        this.$router.push({ path: 'character' })
      }
    }
  }
</script>

<style lang="scss">
  #intro {
    width: 100vw;
    min-height: 100vh;
    background: #949191;
    overflow-x: hidden;
    padding: 0;
    margin: 0;

    h2 {
      font-size: 40px;
      color: #fff;
    }

    p {
      font-size: 30px;
      margin: 50px;
      color: #fff;
    }

    button {
      background: #373737;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      font-size: 30px;
      margin: 40px auto;
      padding: 10px;
      width: 335px;

      &:hover {
        background: darken(#373737, 10%);
      }
    }
  }
</style>
