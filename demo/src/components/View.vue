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
    <div class="testcent">
      <div class="paomadeng">
        <el-carousel :interval="3000" arrow="always">
          <el-carousel-item v-for="(item,index) in imgArr" :key="index">
          <!-- <h3>{{ item }}</h3> -->
            <img class="carousel-image" :src="item.imgUrl">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div  class="toplist">
        <div class="toplist-head"><h2>热门排行</h2></div>
        <div v-for="rankessay in rankEssays" :key="rankessay" class="rank-wrap">
          <span class="rank-wrap-num">{{rankEssays.indexOf(rankessay) + 1}}</span>
          <div class="rank-wrap-title">{{rankessay.title}}</div>
        </div>
        
        
      </div>
    </div>

    <div class="cardlist">
      <div class="cardlist-letf">
        <div v-for="article in articles" :key="article" class="cards">
          <div class="cardleft">
            <!-- <div class="cardpic"> -->
              <img class="cardpic" :src="article.coverUrl">
            <!-- </div>             -->
          </div>
          <div class="cardright" @click="goToDetail(article)">
            <h2 class="cardtitle">{{article.title}}</h2>
            <div class="cardauthor">
              {{article.createAt}}
            </div>
            <div class="cardabout-box">
              <p class="cardabout"> 
                {{article.about}}
              </p>
            </div>
            <div class="cardbottom">
              <div class="cardtags"> 
                <el-tag size="mini" effect="dark" type="info">标签1</el-tag>
                <el-tag size="mini" effect="plain" type="info">超小标签</el-tag>
                <el-tag size="mini"  type="info">标签3</el-tag>
              </div>
              <div class="undercardpic">
                <li>点赞</li>
                <li>收藏</li>
                <li>不点赞</li>
              </div>
            </div>            
          </div>
        </div>
        <div class="pagebox">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="setPage"
            :total="total"
            :current-page="curpage"
            :page-size="5"
            >
          </el-pagination>
        </div>
      </div>
      <!-- <div v-else class="cardlist-letf">
        <div v-for="n in numbers" :key="n" class="cards">
          <div class="cardleft">
            <div class="cardpic"></div>
            <div class="undercardpic">
              <li>点赞</li>
              <li>收藏</li>
              <li>不点赞</li>
            </div>
          </div>
          <div class="cardright">
            <h2 class="cardtitle">这是第{{n}}个标题</h2>
            <div class="cardauthor">
              这是第{{n}}个文章的日期
            </div>
            <div class="cardabout-box">
              <p class="cardabout"> 
                这是第{{n}}个文章的摘要
              </p>
            </div>
            <div class="cardtags"> 
              <el-tag size="mini" effect="dark" type="info">标签1</el-tag>
              <el-tag size="mini" effect="plain" type="info">超小标签</el-tag>
              <el-tag size="mini"  type="info">标签3</el-tag>
            </div>
          </div>
        </div>
        
      </div> -->
      <div class="cardlist-right">
        <div class="cardlist-right-title">
          <!-- {{resp}} -->
          <h2>推荐阅读</h2>
        </div>
        <div v-for="recommendEssay in recommendEssays" :key="recommendEssay" class="recommend">
          <div class="recommend-pic-box">
            <img class="recommend-pic" :src="recommendEssay.coverUrl">
          </div>
          <div class="recommend-title">{{recommendEssay.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { defineComponent, onMounted, ref} from 'vue'
// import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store'

export default defineComponent ({
  data() {
    return {
      imgArr:[
        {imgUrl: require('../assets/01.png')},
        {imgUrl: require('../assets/02.png')},
        {imgUrl: require('../assets/03.png')},
        {imgUrl: require('../assets/04.png')},
      ],
      numbers: [ 1, 2, 3, 4, 5 ],
      // articles:[]
      activeIndex: '1',
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

    const router = useRouter()

    // 请求获取数据库中的文章后存放在articles中
    const articles = ref([]);
    // 排行榜文章
    const rankEssays = ref([]);
    // 推荐文章
    const recommendEssays = ref([]);
    // 请求到的文章总数total，默认为1
    const total = ref(1)
    // 当前页面（页码？）curpage（currentPage）默认为1
    const curpage = ref(1)
    // const cardseen = ref(true)
    // var articles = []

    // 将请求封装成一个方法getList,在请求的过程中会发送当前页码
    const getList = async () => {
      let res = await axios.get('/article/list', {
        params: {
          page: curpage.value
        }
      });
      console.log('getlist')
      // 将请求返回的文章数组赋值给articles
      articles.value = res.data.data.list
      // 将请求返回的文章总数赋值给total
      total.value = res.data.data.total
    }

    const getOtherList = async (pageSize, essay) => {
      let res = await axios.get('/article/list', {
        params: {
          size: pageSize
        }
      });
      console.log('getotherlist')
      // 将请求返回的文章数组赋值给articles
      essay.value = res.data.data.list
      // 将请求返回的文章总数赋值给total
      // total.value = res.data.data.total
    }
    const handleSelect = (index) => {
      console.log(index);
    }
    // 组件挂载时先调用getList方法请求文章列表
    onMounted(async () => {
      console.log('onMounted')
      getList();
      console.log(articles);
      console.log(store.state);
      console.log(store.state.userInfo);
      getOtherList(8, rankEssays);
      getOtherList(3, recommendEssays);
      console.log(rankEssays);
      // const res = 
      // await axios.get('/article/list').then(res => {
      //   console.log(res.data.data)
      //   this.articles = res.data.data
      // });
      // console.log(res.data.data)
      // return res
      
      // .catch((error) => {
      //   if (error.request) {
      //     console.log(3)
      //     cardseen.value = false
      //   }
      // }) ;
      // console.log(res.data)
      // return res
      
      // articles = res.data.data
      // console.log(articles)
      // if (articles.value) {
      //   console.log(1)
      // } else {
      //   console.log(2)
      // }
    });

    // 当页码改变时执行setPage函数，将改变后的页码赋值给curpage
    const setPage = (page) => {
      // 将改变后的页码赋值给curpage
      curpage.value = page;
      // 然后再调用一次getList方法发送请求获取文章列表
      getList();
      window.scrollTo(0, 571);
    }
    // const articles = res.data.data
    
    const goToDetail = async (articles) => {
      console.log(articles)
      axios.get(`/article/${articles._id}`)
      router.push(`/article/${articles._id}`)
    }

    return {
      articles,
      total,
      setPage,
      curpage,
      goToDetail,
      rankEssays,
      recommendEssays,
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
  /* .paomadeng {
    width: 500px;
    margin-left: 10%;
  } */
  .el-menu {
    /* padding-left: 10% !important; */
    /* height: 50px; */
    max-width: 1000px;
    margin: 0 auto;
    font-weight: 1000;
    /* font-size: 16px; */
    /* width: 100%; */
  }
  .el-menu-item {
    font-size: 15px;
  }
  /* .el-menu-item {
    height: 50px !important;
    align-items: center;
  } */
  /* .el-carousel {
    height: 360px;
    width: 637.5px;
  } */
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

  /* .el-carousel {
      width: 500px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  } */

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