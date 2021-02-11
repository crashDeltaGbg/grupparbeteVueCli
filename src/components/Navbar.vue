<template>
  <div id="crop">
    <div id="navwrapper">
      <div id="blacknav">
        <h1>{{ title }}</h1>
      </div>

      <div id="greynav">
        <li><a href="#">Quit</a></li>
        <li><a href="#">Save</a></li>
        <div id="image"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
#crop {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background-image: linear-gradient(
    to right,
    rgb(43, 43, 43),
    rgb(175, 174, 174)
  );
}

#navwrapper {
  display: flex;
}

#blacknav {
  background-color: rgb(43, 43, 43);
  height: 50px;
  flex-grow: 4;
  transform: skewX(+45deg);
  display: flex;
  justify-content: flex-start;
}

#greynav {
  background-color: rgb(175, 174, 174);
  height: 50px;
  flex-grow: 1;
  transform: skewX(+45deg);
  display: flex;
  justify-content: flex-start;
}

li {
  transform: skewX(-45deg);
  text-decoration: none;
  list-style: none;
  padding-right: 20px;
  padding-left: 40px;
  padding-top: 15px;
}

a {
  text-decoration: none;
  color: black;
}

#image {
  background-color: rgb(78, 77, 77);
  height: 45px;
  width: 45px;
  transform: skewX(-45deg);
  border-radius: 50%;
  margin-left: 30px;
  margin-top: 3px;
}

h1 {
  transform: skewX(-45deg);
  color: white;
  margin-left: 120px;
  margin-bottom: 30px;
  margin-top: 7px;
}
</style>
