<template>
    <div class="common-layout">
        <el-container>
            <!-- <div style="height : 60px;z-index: -1"></div> -->
            <el-header>
                <div>
                    bishe
                </div>
                <div>
                    <el-button type="primary">register</el-button>
                    <el-button type="primary">login</el-button>
                </div>
            </el-header>
            <el-menu  mode="horizontal" >
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">处理中心2</el-menu-item>
                <el-menu-item index="3" >消息中心</el-menu-item>
                <el-menu-item index="4">订单管理</el-menu-item>
            </el-menu>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-container>
                    <el-main>
                        <!-- <template> -->
                        <div class="block">
                            <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
                            <el-carousel height="150px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3 class="small">{{ item }}</h3>
                            </el-carousel-item>
                            </el-carousel>
                        </div>
                        <!-- </template> -->
                    </el-main>
                    
                </el-container>
                
            </el-container>
            <!-- <el-footer>Footer</el-footer> -->
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </el-container>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        
    },
})
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    /* color: #333;
    text-align: center;
    line-height: 60px; */
    height: 64px;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 2px 8px #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    z-index: 1;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    /* margin-top: 60px; */
    /* position: fixed;
    bottom: 0;
    left: 0; */
    /* box-shadow: 0 2px 8px #fff; */
    /* display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%; */
    /* z-index: 1; */
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    /* height: 600px; */
    /* margin-bottom: 60px; */
    /* z-index: 1; */
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 300px;
    /* margin-bottom: 60px; */
    /* z-index: 1; */
  }
   body > .el-container {
    margin-bottom: 40px;
    /* height: 100%; */
  }
  .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .el-row :last-child {
      margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    height: 240px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>