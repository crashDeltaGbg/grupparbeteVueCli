<template>
  <div>
    <p v-for="story in stories" :key="story.id">{{ story.text }}</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        stories: ''
      }
    },
    created() {
      axios
        .get('json/story_test.json')
        .then(response => response.data)
        .then(result => {
          this.stories = result.options
          console.log(this.stories)
        })
    }
  }
</script>
