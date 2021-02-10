<template>
  <section id="home">
    <h1>Adventure Hunter</h1>
    <p>Lorem ipsum</p>
    <button @click="continueStory($event)">Start</button>
  </section>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    continueStory(e) {
      // Added Small "loading" animation.
      let div = document.createElement("div");
      div.innerHTML = "And so it beginns...";
      div.classList.add("fade");
      e.target.parentNode.appendChild(div);

      // When animation is done we remove the element and redirect the user to
      // create character page.
      setTimeout(() => {
        document.getElementsByClassName("fade")[0].remove();
        this.$router.push({ path: "character" });
      }, 1500);
    },
  },
};
</script>
<style lang="scss">
#home {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #949191;
  overflow-x: hidden;
  padding: 0;
  margin: 0;

  h1 {
    font-size: 68px;
    color: #fff;
    margin: 10px;
  }

  p {
    font-size: 45px;
    color: #fff;
    margin: 10px;
  }

  button {
    background: #373737;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 30px;
    margin: 40px auto;
    padding: 10px;
    width: 335px;

    &:hover {
      background: darken(#373737, 10%);
    }
  }
}
.fade {
  opacity: 0;
  animation: fade 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>