<template>
  <router-view />
</template>

<script>
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');

:root {
  --main-color: #e14d2a;
  --second-color: #fd841f;
  --tree-color: #3e6d9c;
  --for-color: #001253;
  --fc: black;
}

.main-color-bg {
  background-color: var(--main-color);
}

.fc-main {
  color: var(--main-color);
}

.fs-poppin {
  font-family: "Poppins", sans-serif;
}

.fs-roboto{
  font-family: 'Roboto', sans-serif;
}
</style>