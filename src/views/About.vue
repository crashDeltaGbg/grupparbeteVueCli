<template>
  <div>
    <h1>This is an about page</h1>

    <Navbar title="Introduction"></Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "navbar",
  components: {
    Navbar,
  },
};
</script>
