<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>  -->
  <!-- <Home/> -->
      <!-- <Header/>
      <View/>
      <Footer/> -->
      <tinymce
        id="myedit"
        ref="editor"
        v-model="msg"
        :disabled="disabled"
        @onClick="onClick"
      />
  <!-- <Index/> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Home from './components/Home.vue'
// import Header from './components/Header.vue'
// import Footer from './components/Footer.vue'
// import View from './components/View.vue'
// import Index from './components/Index.vue'
import tinymce from './components/Tiny.vue'
// import axios from 'axios';

export default {
  name: 'App',
  components: {
    // HelloWorld
    // Home
    // Index
    // Header,
    // Footer,
    // View
    tinymce
  }
  ,
  data () {
    return {
      disabled: false,
      msg: 'Welcome to Use Tinymce Editor',
      isabled: false
    }
  }
  ,
  methods: {
    // 内容
    getContent () {
      console.log('内容', this.msg)
    },
    // 鼠标单击的事件
    onClick (e, editor) {
      console.log('Element clicked')
      console.log(e.target.innerHTML)
      console.log(editor)
      // axios.post('/upload/test', {
      //       essay: e.target.innerHTML
      //       // nickName: formData.nickName,
      //       // password: formData.password,
              
      //     });
    },
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
