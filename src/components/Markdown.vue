<template>
  <div v-html="markdown"></div>
</template>

<script>
  let markdown // = require('@/assets/story/test.md')

  export default {
    created() {
      this.selectFile('test')
      // console.log(this.fileName)
      // this.markdown = require(`@/assets/story/${this.fileName}.md`)
    },
    data() {
      return {
        markdown
      }
    },
    methods: {
      selectFile(fileName) {
        this.markdown = require(`@/assets/story/${fileName}.md`)
      }
    },
    name: 'Markdown',
    props: ['fileName']
  }
</script>
