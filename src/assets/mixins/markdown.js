export let markdown = {
  created() {
    this.selectFile('test')
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
  name: 'markdown'
  }