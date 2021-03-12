<template>
    <div class="testheader">
        <div class="leftdiv">
            bishe
        </div>
        <div class="rightdiv">
            <el-button size="small"  type="primary">register</el-button>
            <el-button size="small"  type="primary">login</el-button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style>
.testheader {
    background-color: #B3C021;
    /* color: #333;
    text-align: center;
    line-height: 60px; */
    height: 50px;
    /* position: fixed; */
    top: 0;
    left: 0;
    /* box-shadow: 0 2px 8px #fff; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 0 16px; */
    /* padding-left: 16px; */
    min-width: 1200px;
    width: 100%;
    /* z-index: 1; */
    /* overflow: hidden; */
  }
  .leftdiv {

      padding-left: 16px;
  }
  .rightdiv {
      padding-right: 16px;
  } 
</style>