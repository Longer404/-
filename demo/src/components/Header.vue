<template>
    <div class="testheader">
        <div class="leftdiv">
            <router-link to="/">
                bishe
            </router-link>
        </div>
        <div class="rightdiv">
            <el-button size="small"  type="danger">
                <router-link to="/form">
                    发表文章
                </router-link>
            </el-button>
            <el-button size="small"  type="primary">
                <router-link to="/register">
                    登录
                </router-link>
            </el-button>
            <el-button size="small"  type="primary">
                <router-link to="/login">
                    注册
                </router-link>
            </el-button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>

<style>
  a {
      text-decoration: none;/* 去掉下划线 */
      color: inherit;
  }
  .testheader {
    background-color: #B3C021;
    /* color: #333;
    text-align: center;
    line-height: 60px; */
    min-height: 50px !important;
    /* position: fixed; */
    /* top: 0; */
    /* left: 0; */
    /* box-shadow: 0 2px 8px #fff; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 0 16px; */
    /* padding-left: 16px; */
    min-width: 1000px;
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