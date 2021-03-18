<template>
    <!-- <div class="fatherbox"> -->
        <!-- <div class="headerbox">
            头部
        </div> -->
        <div class="mainbox">
            主体内容
        </div>
        <!-- <div class="footerbox">
            尾部
        </div> -->
    <!-- </div> -->
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    setup() {
        axios.get('/article');
    },
})
</script>

<style>
  html,body {
    height: 100%;
    margin: 0 auto;
    /* text-align: center; */
  }
  .fatherbox {
      height: 100%;
      display: flex;
      flex-flow: column;
      /* align-content: flex-end; */
      justify-content: space-between;
  }
  .headerbox {
      height: 60px;
      background: #000;
  }
  .mainbox {
      /* height: 100px; */
      /* height: 80%; */
      min-height: 500px;
      min-width: 1000px;
      background: #999;
  }
  .footerbox {
      bottom: 0;
      height: 60px;
      background: #555;
  }
</style>
