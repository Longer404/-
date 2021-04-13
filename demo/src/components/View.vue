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
      <el-menu-item index="4">游戏相关</el-menu-item>
      <el-menu-item index="5">动漫周边</el-menu-item>
      <el-menu-item index="6">同人创作</el-menu-item>
      <el-menu-item index="7">漫展消息</el-menu-item>
    </el-menu>
    <div class="testcent">
      <div class="paomadeng">
        <el-carousel :interval="3000" arrow="always">
          <el-carousel-item v-for="(item,index) in carouselArticles" :key="index">
          <!-- <el-carousel-item v-for="(item,index) in imgArr" :key="index"> -->
          <!-- <h3>{{ item }}</h3> -->
            <!-- <img class="carousel-image" :src="item.imgUrl"> -->
            <!-- <template #placeholder>
              <div class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </template> -->
            <div v-if="carouselArticles.length === 0">加载中...</div>
            <img v-else class="carousel-image" :src="item.coverUrl" @click="goToDetail(item)">
            
          </el-carousel-item>
        </el-carousel>
      </div>
      <div  class="toplist">
        <div class="toplist-head">
          <!-- <i class="el-icon-trophy"></i> -->
          <div class="hot-rank-title">
            <i class="el-icon-trophy"></i>
            热门排行
          </div>
        </div>
        <div v-for="rankessay in rankEssays" :key="rankessay" class="rank-wrap">
          
          <span class="rank-wrap-num">{{rankEssays.indexOf(rankessay) + 1}}</span>
          <div class="rank-wrap-title" @click="goToDetail(rankessay)">{{rankessay.title}}</div>
          <div class="rank-wrap-date">{{rankessay.createAt.split(/[\s\n]/)[1] + '-' + rankessay.createAt.split(/[\s\n]/)[2]}}</div>
        </div>
        
        
      </div>
    </div>

    <div class="cardlist">
      <div class="cardlist-left">
        <div class="over-cards-box">
          <div class="over-cards" >
            <i class="el-icon-s-flag"></i>
            {{curindexTitle}}
            </div>
        </div>
        <div v-for="article in articles" :key="article" class="cards">
          <div class="cardleft">
            <!-- <div class="cardpic"> -->
              <img class="cardpic" @click="goToDetail(article)" :src="article.coverUrl" >
            <!-- </div>             -->
          </div>
          <div class="cardright" >
            <h2 class="cardtitle" @click="goToDetail(article)">{{article.title}}</h2>
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
                <el-tag v-if="article.partition === 'animation'" size="mini" effect="dark" type='danger' >动画</el-tag>
                <el-tag v-if="article.partition === 'comics'" size="mini" effect="dark" >漫画</el-tag>
                <el-tag v-if="article.partition === 'game'" size="mini" effect="dark" type='success'>游戏</el-tag>
                <el-tag v-if="article.partition === 'doujin'" size="mini" effect="dark" type='warning'>同人</el-tag>
                <el-tag v-if="article.partition === 'exhibition'" size="mini" effect="plain" type="info">漫展</el-tag>
                <el-tag v-if="article.partition === 'peripheral'" size="mini" effect="dark" type="info">模玩</el-tag>
                <!-- <el-tag size="mini" effect="plain" type="info">超小标签</el-tag> -->
                <el-tag v-if="article.likes > 10" size="mini" type="danger">多人点赞</el-tag>
                <el-tag v-if="article.read > 10" size="mini" >多人阅读</el-tag>
              </div>
              <div class="undercardpic">
                <!-- <span class="iconfont icon-dianzan1">点赞</span> -->
                <svg class="icon" aria-hidden="true">                 
                  <use xlink:href="#icon-dianzan1"></use>                  
                </svg>
                <span class="undercardpic-span" @click="clickLike">点赞</span>
                <svg class="icon" aria-hidden="true">                 
                  <use xlink:href="#icon-ziyuan173"></use>                  
                </svg>
                <span class="undercardpic-span" @click="clickDislike">不喜欢</span>
                <!-- <span><i class="el-icon-share"></i></span> -->
                <span class="undercardpic-span" @click="clickShare"><i class="el-icon-share"  ></i>分享</span>
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
      
      <div class="cardlist-right">
        <div class="cardlist-right-title">
          <!-- {{resp}} -->
          <div class="recommend-head">
            <i class="el-icon-lollipop"></i>
            推荐阅读

          </div>
        </div>
        <div v-for="recommendEssay in recommendEssays" :key="recommendEssay" class="recommend">
          <div class="recommend-pic-box">
            <img class="recommend-pic" @click="goToDetail(recommendEssay)" :src="recommendEssay.coverUrl">
          </div>
          <div class="recommend-title" @click="goToDetail(recommendEssay)" >{{recommendEssay.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import axios from 'axios';
import { defineComponent, onMounted, ref} from 'vue'
// import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '../store'
import { ElMessage } from 'element-plus'

export default defineComponent ({
  data() {
    return {
      imgArr:[
        {coverUrl: require('../assets/01.png')},
        {coverUrl: require('../assets/02.png')},
        {coverUrl: require('../assets/03.png')},
        {coverUrl: require('../assets/04.png')},
      ],
      numbers: [ 1, 2, 3, 4, 5 ],
      // articles:[]
      activeIndex: '1',
    }
  },
  setup() {

    const router = useRouter()
    // 轮播图文章
    const carouselArticles = ref([{coverUrl: require('../../public/img/loading.png')},]);
    // 请求获取数据库中的文章后存放在articles中
    const articles = ref([]);
    // 排行榜文章
    const rankEssays = ref([]);
    // 推荐文章
    const recommendEssays = ref([]);
    // 请求到的文章总数total，默认为1
    const total = ref(1);
    // 当前页面（页码？）curpage（currentPage）默认为1
    const curpage = ref(1);
    // 当前标签页
    const curindex = ref('1');
    // 当前标签页标题
    const curindexTitle = ref('首页');
    // const cardseen = ref(true)
    // var articles = []


    // 将请求封装成一个方法getList,在请求的过程中会发送当前页码
    const getList = async () => {
      let res = await axios.get('/article/list', {
        params: {
          page: curpage.value
        }
      });
      console.log('getlist');
      // 将请求返回的文章数组赋值给articles
      articles.value = res.data.data.list;
      // 将请求返回的文章总数赋值给total
      total.value = res.data.data.total;
      // const arr = articles.value[0].createAt.split(/[\s\n]/)[1];
      // console.log(articles.value);
      // console.log('--------------------');
      // console.log(arr);
      // console.log('--------------------');
    }

    const getOtherList = async (pageSize, essay, type) => {
      let res = await axios.get('/article/list', {
        params: {
          size: pageSize,
          type: type,
        }
      });
      console.log('getotherlist');
      // 将请求返回的文章数组赋值给articles
      essay.value = res.data.data.list;
      // 将请求返回的文章总数赋值给total
      // total.value = res.data.data.total
    }

    const getPartitionList = async (partition) => {
      let res = await axios.get(`/article/list/${partition}`, {
        params: {
          page: curpage.value
        }
      });
      console.log('getpartitionlist');
      console.log(res);
      // 将请求返回的文章数组赋值给articles
      articles.value = res.data.data.list;
      // 将请求返回的文章总数赋值给total
      total.value = res.data.data.total;
    }

    const handleSelect = (index) => {
      console.log(index);
      curindex.value = index;
      console.log(curindex);
      if (index === '1') {
        getList();
        curindexTitle.value = '首页';
      }
      if (index === '2') {
        getPartitionList('animation');
        curindexTitle.value = '动画资讯';
      }
      if (index === '3') {
        getPartitionList('comics');
        curindexTitle.value = '漫画资讯';
      }
      if (index === '4') {
        getPartitionList('game');
        curindexTitle.value = '游戏相关';
      }
      if (index === '5') {
        getPartitionList('peripheral');
        curindexTitle.value = '动漫周边';
      }
      if (index === '6') {
        getPartitionList('doujin');
        curindexTitle.value = '同人创作';
      }
      if (index === '7') {
        getPartitionList('exhibition');
        curindexTitle.value = '漫展消息';
      }
      
    }
    // 组件挂载时先调用getList方法请求文章列表
    onMounted(async () => {
      console.log('onMounted')
      getOtherList(4, carouselArticles, 'carousel');
      getList();
      console.log(articles);
      console.log(store.state);
      console.log(store.state.userInfo);
      
      getOtherList(9, rankEssays, 'rank');
      getOtherList(3, recommendEssays, 'recommend');
      console.log(rankEssays);
      console.log(carouselArticles);
    });

    // 当页码改变时执行setPage函数，将改变后的页码赋值给curpage
    const setPage = (page) => {
      // 将改变后的页码赋值给curpage
      curpage.value = page;
      // 然后再调用一次getList方法发送请求获取文章列表
      // getList();
      if (curindex.value === '1') {
        getList();
      }
      if (curindex.value === '2') {
        getPartitionList('animation');
      }
      if (curindex.value === '3') {
        getPartitionList('comics');
      }
      if (curindex.value === '4') {
        getPartitionList('game');
      }
      if (curindex.value === '5') {
        getPartitionList('peripheral');
      }
      if (curindex.value === '6') {
        getPartitionList('doujin');
      }
      if (curindex.value === '7') {
        getPartitionList('exhibition');
      }
      window.scrollTo(0, 571);
    }
    // const articles = res.data.data
    
    const goToDetail = async (articles) => {
      console.log(articles)
      // axios.get(`/article/${articles._id}`)
      router.push(`/article/${articles._id}`)
    }

    const clickLike = () =>{
      ElMessage.success('点赞成功');

    }
    const clickDislike = () =>{
      ElMessage.info('不喜欢ヽ(ー_ー)ノ');
    }
    const clickShare = () =>{
      ElMessage.success('分享成功');
    }

    const testClick = () => {
      ElMessage.success('testing');
    }
    return {
      articles,
      total,
      setPage,
      curpage,
      curindex,
      curindexTitle,
      goToDetail,
      carouselArticles,
      rankEssays,
      recommendEssays,
      handleSelect,
      clickLike,
      clickDislike,
      clickShare,
      testClick
      // resp
    }
  }
  
})
  
</script>

<style >
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
  .icon {
  width: 18px;
  height: 18px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
  /* .paomadeng {
    width: 500px;
    margin-left: 10%;
  } */
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
    cursor: pointer;
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
    height: 120px;
    /* background: #B3C0D1; */
    background-image: url(../../public/img/background-img01.jpg);
    background-size: 100%;
    background-repeat: no-repeat; 
    /* background-position: 0 200px; */
    min-width: 1000px;
    width: 100%;
  }
  .toplist {
    /* margin-right: 10%; */
    width: 280px;
    background: #f8f8f8;
  }
  .toplist-head {
    height: 38px;
    /* background: #999; */
    border-bottom-style:solid;
    border-bottom-width: 3px;
    border-bottom-color: #409EFF;
    margin-bottom: 15px;
  }
  .hot-rank-title {
    height: 35px;
    width: 140px;
    font-size: 24px;
    border-bottom-style:solid;
    border-bottom-width: 5px;
    border-bottom-color: #409EFF;
  }
  .rank-wrap {
    height: 28px;
    margin-top: 6px;
    /* background: #555; */
    display: flex;
   
    justify-content: space-between;
  }
  .rank-wrap-num {
    width: 28px;
    text-align: center;
    line-height:28px;
     color: white;
    /* align-items: center; */
    background: #409EFF;
  }
  .rank-wrap-title {
    line-height:28px;
    margin-left: 10px;
    width: 200px;
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .rank-wrap-date {
    font-size: 13px;
    font-weight: 200;
    line-height:28px;
    width: 45px;
    /* margin-left: 10px; */
  }
  .testcent {
    /* 弹性盒子+左右两端对称 */
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    width: 1000px;
    height: 360px;
  }
  .cardlist {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .cardlist-left {
    background: #fcfcfc;
    margin-top: 40px;
    min-width: 700px;
  }
  .over-cards-box {
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-bottom-color: #409EFF;
  }
  .over-cards {
    width: 160px;
    font-size: 24px;
    border-bottom-style: solid;
    border-bottom-width: 4px;
    border-bottom-color: #409EFF;
  }
  .cards {
    margin-top: 20px;
    margin-bottom: 10px;
    /* margin-left: 10%; */
    background: #f8f8f8;
    border-bottom-style: solid;
    border-bottom-width: 0.5px;
    border-bottom-color: #e3e3e3;
    height: 165px;
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
  .cardtitle {
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
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
    width: 440px;
    margin-top: 10px;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
  .cardbottom {
    width: 440px;
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
    cursor: pointer;
    /* background: #475669; */
  }
  .undercardpic {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .undercardpic-span {
    padding-right:8px;
    cursor: pointer;
    font-size: 14px;
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
    background: #ecebeb;
    width: 280px;
    margin-top: 40px;
    /* margin-right: 10%; */
    height: 640px;
  }
  .cardlist-right-title {
    /* margin-top: 10px; */
    height: 35px;
    font-size: 24px;
    margin-bottom: 20px;
    border-bottom-style:solid;
    border-bottom-width: 3px;
    border-bottom-color: #409EFF;
  }
  
  .recommend-head {
    width: 140px;
    border-bottom-style:solid;
    border-bottom-width: 5px;
    border-bottom-color: #409EFF;
  }
  .recommend {
    /* padding-top: 20px; */
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
    cursor: pointer;
  }
  .recommend-title {
    height: 30px;
    margin-bottom: 5px;
    margin-left: 20px;
    /* margin: 0 auto; */
    /* background: #555; */
    cursor: pointer;
    /* align-content: center; */
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