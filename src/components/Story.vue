<template>
  <div>
    <p v-for="story in stories" :key="story.id">{{ story.text }}</p>
    <p>{{ mdUrl }}</p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        stories: '',
        mdUrl: ''
      }
    },
    created() {
      axios
        .get('json/story_test.json')
        .then(response => response.data)
        .then(result => {
          this.stories = result.options
          this.mdUrl = result.md_file_path
          console.log(this.stories)
        })
    }
  }
</script>
