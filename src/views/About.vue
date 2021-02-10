<template>
  <div class="about">
    <h1>This is a test page</h1>
    <Markdown file-name="markdown"/>
  </div>
</template>

<script>
import Markdown from "@/components/Markdown.vue"

export default {
  components: {
    Markdown
  },
  name: 'About'
}
</script>