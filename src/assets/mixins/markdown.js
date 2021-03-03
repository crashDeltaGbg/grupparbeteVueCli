import axios from 'axios'

export let markdown = {
  created() {
    axios
      .get('json/story-test.json')
      .then(response => response.data)
      .then(result => {
        this.stories = result.options
        this.mdUrl = result.mdFilePath
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
