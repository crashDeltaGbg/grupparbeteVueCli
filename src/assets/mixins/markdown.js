import axios from 'axios'

export let markdown = {
  created() {
    axios
      .get('json/story-test.json')
      .then(response => response.data)
      .then(result => {
        this.stories = result.options
        this.mdUrl = result.mdFilePath
        console.log(this.stories)
        console.log(this.mdUrl)
        this.selectFile(this.mdUrl)
      })
  },
  data() {
    return {
      markdown,
      stories: '',
      mdUrl: ''
    }
  },
  methods: {
    selectFile(fileName) {
      this.markdown = require(`@/assets/story/${fileName}.md`)
    }
  },
  name: 'markdown'
}
