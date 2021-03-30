<template>
  <div>
    <el-backtop ></el-backtop>
    <div class="top-pic">
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#409EFF"
      >
      <!-- background-color="#409EFF"
      text-color="#fff"
      active-text-color="#E6A23C" -->
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">动画资讯</el-menu-item>
      <el-menu-item index="3">漫画资讯</el-menu-item>
      <el-menu-item index="4">动漫周边</el-menu-item>
      <el-menu-item index="5">同人创作</el-menu-item>
      <el-menu-item index="6">漫展消息</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
// import axios from 'axios';
// import { defineComponent, onMounted, ref} from 'vue'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
// import store from '../store'

export default defineComponent ({
  data() {
    return {

      activeIndex: '1',
    }
  },
  setup() {
    const router = useRouter();
    const handleSelect = (index) => {
        console.log(typeof(index))
        if (index === '1') {
            
            router.push('/home');
        }
        if (index === '2') {
            
            router.push('/home/testpage1');
        }
        if (index === '3') {
            router.push('/home/testpage2');
        }
    }
    return {
      handleSelect,
      // resp
    }
  }
  
})
  
</script>

<style>
  html,body {
    margin: 0 auto;
    /* text-align: center; */
  }
  p {
    margin: 0;
  }
  h2 {
    margin: 0;
    font-weight: normal;
  }
  .el-menu {
    max-width: 1000px;
    margin: 0 auto;
    font-weight: 1000;
  }
  .el-menu-item {
    font-size: 15px;
  }
  .carousel-image {
    height: 360px;
    width: 700px;
    object-fit: cover;
  }
  .el-carousel-item {
    height: 360px;
  }
  .el-carousel__container {
    height: 360px;
    width: 700px;
  }
  .el-carousel--horizontal {
    height: 360px;
    width: 700px;
  }
  .top-pic {
    height: 100px;
    background: #B3C0D1;
    min-width: 1000px;
    width: 100%;
  }
  .toplist {
    /* margin-right: 10%; */
    width: 280px;
    background: #555;
  }
  .toplist-head {
    height: 60px;
    background: #999;
  }
  .rank-wrap {
    height: 30px;
    margin-top: 6px;
    background: #555;
    display: flex;
    justify-content: flex-start;
  }
  .rank-wrap-num {
    width: 30px;
    text-align: center;
    line-height:30px;
    /* align-items: center; */
    background: rgb(106, 83, 238);
  }
  .rank-wrap-title {
    line-height:30px;
    margin-left: 10px;
  }
  .testcent {
    /* 弹性盒子+左右两端对称 */
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 1000px;
    /* width: 100%; */
    height: 360px;
    background: rgb(166, 209, 235);
  }
  .cardlist {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .cardlist-letf {
    min-width: 700px;
    /* margin-left: 10%; */
    /* background: #B3C0D1;
    height: 500px; */
  }
  .cards {
    margin-top: 20px;
    margin-bottom: 10px;
    /* margin-left: 10%; */
    background: #B3C0D1;
    height: 175px;
    display: flex;
    /* width: 750px; */
    justify-content: space-between;
  }
  .cardcontext {
    /* width: 240px; */
    /* display: flex; */
  }
  .cardright {
    width: 450px;
    text-align: left;
  }
  /* 标题下方发表日期以及作者信息的样式 */
  .cardauthor {
    margin-top: 5px;
    font-weight: 100;
    font-size: 12px;
    /* text-align: left; */
  }
  .cardabout-box {
    height: 58px;
  }
  /* 内容摘要的样式 */
  .cardabout {
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .cardbottom {
    display: flex;
    justify-content: space-between;
  }
  .cardtags {
    padding-top: 8px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .cardpic {
    width: 240px;
    height: 150px;
    object-fit: cover;
    background: #475669;
  }
  .undercardpic {
    margin-top: 10px;
    display: flex;
    /* width: 750px; */
    justify-content: space-between;
  }
  .pagebox {
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: center;
  }
  .cardlist-right {
    /* 粘性布局，当距离顶端0像素时位置固定 */
    position: -webkit-sticky;
    position: sticky;
    top:0;
    background: #555;
    width: 280px;
    margin-top: 20px;
    /* margin-right: 10%; */
    height: 640px;
  }
  .cardlist-right-title {
    /* margin-top: 10px; */
    height: 50px;
  }
  .recommend-pic-box {
    width: 240px;
    height: 150px;
    margin: 0 auto;
  }
  .recommend-pic {
    width: 240px;
    height: 150px;
    object-fit: cover;
    background: rgb(157, 230, 179);
  }
  .recommend-title {
    height: 30px;
    margin-bottom: 10px;
    background: #555;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
  
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>