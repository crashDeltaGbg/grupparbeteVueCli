export let markdown = {
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
  name: 'markdown',
  // props: ['fileName']
  }