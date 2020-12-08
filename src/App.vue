<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <selectPar />
  </div>
</template>

<script>
import selectPar from './components/selectPar.vue'

export default {
  name: 'App',
  components: {
    selectPar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
