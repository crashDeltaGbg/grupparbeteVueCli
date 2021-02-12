<template>
  <div>
    <ul v-if="choices">
      <li v-for="option in options" :key="option.id">
        <input
          type="button"
          :value="option.text"
          @click="onClick(option.proceed)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    created() {},
    data() {
      return {
        options: null
      }
    },
    props: ['choices']
  }
</script>
