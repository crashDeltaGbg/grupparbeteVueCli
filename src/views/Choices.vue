<template>
  <div class="character-wrapper">
    <h1>Choose an option</h1>
    <choices type="strength"></choices>
    <choices type="intelligence"></choices>
    <choices type="agility"></choices>
    <choices type="luck"></choices>
    <story></story>
  </div>
</template>

<script>
  import choices from '@/components/Choices.vue'
  import story from '@/components/Story.vue'

  export default {
    name: 'Choices',
    components: {
      choices,
      story
    }
  }
</script>
