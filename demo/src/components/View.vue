<template>
  <div>
    <div class="top-pic">
    </div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-menu-item index="2">我的工作台</el-menu-item>
      <el-menu-item index="3">消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>
    </el-menu>
    <div class="testcent">
      <div class="paomadeng">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="toplist">
        排行榜
      </div>
    </div>

    <div class="cardlist">
      <div class="cardlist-letf">
        <div v-for="article in articles" :key="article" class="cards">
          <div class="cardleft">
            <div class="cardpic">
              
            </div>
          <div class="undercardpic">
            <li>点赞</li>
            <li>收藏</li>
            <li>不点赞</li>
          </div>
          </div>
          <div class="cardright">
            <h2 class="cardtitle">{{article.title}}</h2>
            <div class="cardauthor">
              {{article.createAt}}
            </div>
            <div class="cardabout-box">
              <p class="cardabout"> 
                {{article.about}}
              </p>
            </div>
            <div class="cardtags"> 
              <el-tag size="mini" effect="dark" type="info">标签1</el-tag>
              <el-tag size="mini" effect="plain" type="info">超小标签</el-tag>
              <el-tag size="mini"  type="info">标签3</el-tag>
            </div>
            
          </div>
          
          
        </div>
      </div>
      <div class="cardlist-right">
        <div class="cardtitle">
          <!-- {{resp}} -->
          cardtitle
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, onMounted, ref} from 'vue'
// import { defineComponent, onMounted } from 'vue'

export default defineComponent ({
  data() {
    return {
      numbers: [ 1, 2, 3, 4, 5 ],
      // articles:[]
    }
  },
  setup() {
    // const articles = [
    //   {
    //     title: '这是第一个标题',
    //     createAt: Date(),
    //     about: '这是第一篇文章的内容摘要,这是第一篇文章的内容摘要,这是第一篇文章的内容摘要,这是第一篇文章的内容摘要,这是第一篇文章的内容摘要,这是第一篇文章的内容摘要,这是第一篇文章的内容摘要,这是第一篇文章的内容摘要'
    //   },
    //   {
    //     title: '这是第二个标题',
    //     createAt: Date(),
    //     about: '这是第二篇文章的内容摘要'
    //   },
    //   {
    //     title: '这是第三个标题',
    //     createAt: Date(),
    //     about: '这是第三篇文章的内容摘要'
    //   },
    //   {
    //     title: '这是第四个标题',
    //     createAt: Date(),
    //     about: '这是第四篇文章的内容摘要'
    //   },
    //   {
    //     title: '这是第五个标题',
    //     createAt: Date(),
    //     about: '这是第五篇文章的内容摘要'
    //   },
    // ];
    const articles = ref(articles);
    // var articles = []
    onMounted(async () => {
      // const res = 
      // await axios.get('/article/list').then(res => {
      //   console.log(res.data.data)
      //   this.articles = res.data.data
      // });
      // console.log(res.data.data)
      // return res
      let res = await axios.get('/article/list');
      console.log(res.data.data)
      // return res
      articles.value = res.data.data
      // articles = res.data.data
      // console.log(articles)
    });
    // const articles = res.data.data
    
    return {
      articles,
      // resp
    }
  }
  
})
  
</script>

<style>
  html,body {
    margin: 0 auto;
    text-align: center;
  }
  p {
    margin: 0;
  }
  h2 {
    margin: 0;
    font-weight: normal;
  }
  /* .paomadeng {
    width: 500px;
    margin-left: 10%;
  } */
  .el-menu {
    padding-left: 10% !important;
    /* height: 50px; */
    /* min-width: 1200px; */
    /* width: 100%; */
  }
  /* .el-menu-item {
    height: 50px !important;
    align-items: center;
  } */
  .top-pic {
    height: 100px;
    background: #B3C0D1;
    min-width: 1000px;
    width: 100%;
  }
  .toplist {
    /* margin-right: 10%; */
    width: 200px;
    background: #000;
  }
  .testcent {
    /* 弹性盒子+左右两端对称 */
    display: flex;
    justify-content: space-between;
    /* padding-left: 10%;
    padding-right: 10%; */
    /* width: 100%; */
    /* margin-top: 10px; */
    margin: 0 auto;
    width: 1000px;
    /* width: 100%; */
    height: 360px;
    background: rgb(166, 209, 235);
  }
  .cardlist {
    width: 1000px;
    /* height: 500px; */
    /* padding: 0 10% 0 10%; */
    /* margin-top: 20px; */
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .cardlist-letf {
    min-width: 720px;
    /* margin-left: 10%; */
    /* background: #B3C0D1;
    height: 500px; */
  }
  .cards {
    margin-top: 20px;
    margin-bottom: 10px;
    /* margin-left: 10%; */
    background: #B3C0D1;
    height: 200px;
    display: flex;
    /* width: 750px; */
    justify-content: space-between;
  }
  .cardcontext {
    /* width: 240px; */
    /* display: flex; */
  }
  .cardright {
    width: 460px;
    text-align: left;
  }
  .cardtitle {
    margin-top: 10px;
  }
  /* 标题下方发表日期以及作者信息的样式 */
  .cardauthor {
    margin-top: 5px;
    font-weight: 100;
    font-size: 12px;
    /* text-align: left; */
  }
  .cardabout-box {
    height: 79px;
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
  .cardtags {
    padding-top: 8px;
  }
  .el-tag {
    margin-right: 10px;
  }
  .cardpic {
    width: 240px;
    height: 150px;
    background: #475669;
  }
  .undercardpic {
    margin-top: 10px;
    display: flex;
    /* width: 750px; */
    justify-content: space-between;
  }
  .cardlist-right {
    /* 粘性布局，当距离顶端0像素时位置固定 */
    position: -webkit-sticky;
    position: sticky;
    top:0;
    background: #555;
    min-width: 200px;
    margin-top: 20px;
    /* margin-right: 10%; */
    height: 640px;
  }

  .el-carousel {
      width: 500px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
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