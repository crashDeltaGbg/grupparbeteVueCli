<template>
  <div class="character-wrapper">
    <h1>Create character</h1>
    <create-character></create-character>
  </div>
</template>

<script>
import createCharacter from "@/components/CreateCharacter.vue";

export default {
  name: "Character",
  components: {
    createCharacter,
  },
};
</script>