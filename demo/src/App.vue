<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>  -->
  <!-- <Home/> -->
      <Header/>
      <View/>
      <Footer/>
  <!-- <Index/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Home from './components/Home.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import View from './components/View.vue'
// import Index from './components/Index.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    // Home
    // Index
    Header,
    Footer,
    View
  }
}
</script>

<style>
  
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 64px;
} */
</style>
