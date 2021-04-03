<template>
    <div class="main-box">
        <!-- <div class="nav-bar">
            <el-button class="firstbut" type="text" icon="el-icon-edit">分区1</el-button>
            <el-button  class="firstbut" type="text" icon="el-icon-edit">分区2</el-button>
            <el-button  class="firstbut" type="text" icon="el-icon-edit">分区3</el-button>
            <el-button  class="firstbut" type="text" icon="el-icon-edit">分区4</el-button>
            <el-button  class="firstbut" type="text" icon="el-icon-edit">分区5</el-button>
        </div> -->
        <div class="page-container">
            <div class="head-container">
                <div class="cover-img">
                    <img :src="detailInfo.coverUrl"/>
                    <!-- <img src="http://localhost:3000/1616662472411.png" alt> -->
                </div>
                <h1>{{detailInfo.title}}</h1>
                <div class="info">创作日期，阅读量，评论，点赞</div>
            </div>
            
            <!-- <div>{{detailInfo.content}}</div> -->
            <div class="detail-container" v-html="detailInfo.content"></div>
        </div>
        <div class="fix-box">
            <div class="author-box">
                <div class="block"><el-avatar :size="72" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar></div>
                <div class="author-info">
                    <div class="author-info-name">作者 {{detailInfo.author}}</div>
                    <div class="article-info">
                        阅读量
                        <span>{{detailInfo.read}}</span>
                    </div>
                    <div class="like-button">
                        <el-button size="mini" type="primary" style="width:75px"> 点 赞 </el-button>
                    </div>
                </div>
            </div>
            <div class="recommend-box">
                <!-- <div v-for="article in articles" :key="article" class="cards"> -->
                <div v-for="authorArticle in authorArticleList" :key="authorArticle" class="read-recommend">
                    {{authorArticle.title}}
                    <div class="recommend-info">{{authorArticle.createAt.split(/[\s\n]/)[1] + '-' + authorArticle.createAt.split(/[\s\n]/)[2] + '-' + authorArticle.createAt.split(/[\s\n]/)[3]}}</div>
                    <!-- rankessay.createAt.split(/[\s\n]/)[1] + '-' + rankessay.createAt.split(/[\s\n]/)[2] -->
                </div>
                
            </div>
            <div class="other-box">
                <div class="link-box" ><i class="el-icon-edit"></i>投稿</div>
                <div class="help-box"><i class="el-icon-question"></i>帮助</div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default defineComponent({
    setup() {
        const route = useRoute();

        const id =route.params.id;

        const detailInfo = ref({});

        const authorArticleList = ref({});
        // const testInfo = '<h1>测试</h1>'

        console.log(id);

        const getAuthorArticleList = async (authorId) => {
            const res = await axios.get(`/article/manager/${authorId}`);
            // console.log(res);
            authorArticleList.value = res.data.data.list.slice(0, 5);
            console.log(authorArticleList);
        }

        const getArticle = async () => {
            const res = await axios.get(`/article/${id}`);
            // console.log(res.data)
            detailInfo.value = res.data.data;
            console.log(detailInfo.value);
            if (detailInfo.value.coverUrl === undefined) {
                detailInfo.value.coverUrl = "http://localhost:3000/1616658254684.jpeg"
            }
            getAuthorArticleList(detailInfo.value.authorId);
        }
        
        

        onMounted(() => {
            // axios.get(`/article/${articles._id}`)
            getArticle();

        })

        return {
            detailInfo,
            authorArticleList
            // testInfo
        }
    },
})
</script>

<style>
  /* h4 {
    margin: 0;
    font-weight: normal;
  } */
  /* 
    为自适应盒子的宽度暂时这样设置文章内图片的显示大小
    先限制最大宽度，然后高度自适应变化避免图片被拉伸
  */
  /* 封面图片默认与内容盒子等宽 */
  .head-container img {
      width: 700px;
      /* width: auto; */
      height: auto;
  }
  .detail-container img {
      max-width: 700px;
      height: auto;
  }
  .main-box {
      min-width: 1000px;
      /* min-height: 1500px; */
      /* background: #999; */
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
  }
  .nav-bar {
      height: 300px;
      width: 100px;
      /* background: #000; */
      /* color: #000; */
  }
  .firstbut {
      margin-left: 10px;
      margin-top: 15px;
  }
  /* .el-button {
      margin-top: 15px;
  } */
  .page-container {
      height: 1500px;
      width: 700px;
      background: #e3e3e3;
  }
  .head-container {
      padding-bottom: 30px;
  }
  .cover-img {
      width: 700px;
      height: 350px;
      /* background: rgb(152, 134, 231); */
      overflow: hidden;
  }
  .info {
      font-weight: 100;
      font-size: 12px;
  }
  .fix-box {
      position: -webkit-sticky;
      position: sticky;
      top: 20px;
      height: 500px;
      width: 280px;
      background: #f8f8f8;
      /* display: flex; */
    /* align-items: center; */
      /* justify-content: space-between; */
  }
  .author-box {
      display: flex;
    /* align-items: center; */
      justify-content: space-between;
      border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3;
  }
  .author-info {
      width: 148px;
      /* text-align:right; */
  }
  .author-info-name {
      font-size: 18px;
      /* text-align: center; */
  }
  .article-info {
      font-weight: 100;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
  }
  .like-button {
      text-align: center;
      height: 35px;
      line-height: 30px;
  }
  .read-recommend {
      height: 50px;
      /* width: 240px; */
      /* background: #555; */
      border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3;
      margin-top: 10px;
  }
  .recommend-info {
      font-weight: 100;
      font-size: 13px;
      text-align: right;
  }
  .other-box {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
  }
  .link-box{
      text-align: center;
      line-height: 50px;
      width: 120px;
      height: 50px;
      background: #C6E2FF;
      cursor: pointer;
      box-shadow: grey 1.5px 1.5px 3px;
    border-radius: 4px;
  }
  .help-box {
      text-align: center;
      line-height: 50px;
      width: 120px;
      height: 50px;
      background: #E9E9EB;
      cursor: pointer;
      box-shadow: grey 1.5px 1.5px 3px;
    border-radius: 4px;
  }
</style>