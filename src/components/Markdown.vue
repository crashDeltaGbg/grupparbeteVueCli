<template>
  <div v-html="markdown"></div>
</template>

<script>

// import markdown from "@/assets/story/test.md"

export default {
  created() {
    // console.log(this.fileName)
    this.markdown = require(`@/assets/story/${this.fileName}.md`)
  },
  data() {
    return {
      markdown
    }
  },
  name: 'Markdown',
  props: ['fileName']
}

</script>