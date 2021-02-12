<template>
  <div>
    <ul v-if="choices">
      <li v-for="choice in choices" :key="choice.id">
        <input type="button" :value="text" @click="onClick(choice.proceed)" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    created() {},
    data() {
      return {
        choices: null
      }
    },
    props: ['next']
  }
</script>
