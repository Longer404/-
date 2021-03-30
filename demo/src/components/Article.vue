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
            <div v-html="detailInfo.content"></div>
        </div>
        <div class="fix-box">
            <div class="author-box">
                <div class="block"><el-avatar :size="72" :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar></div>
                <div class="author-info">
                    <h4>{{detailInfo.author}}</h4>
                    <div class="article-info">阅读量</div>
                    <el-button type="primary">点赞</el-button>
                </div>
            </div>
            <div class="recommend-box">
                <div class="read-recommend">推荐阅读1</div>
                <div class="read-recommend">推荐阅读2</div>
                <div class="read-recommend">推荐阅读3</div>
                <div class="read-recommend">推荐阅读4</div>
                <div class="read-recommend">推荐阅读5</div>
            </div>
            <div class="other-box">
                <div class="link-box">投稿</div>
                <div class="help-box">帮助</div>
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

        // const testInfo = '<h1>测试</h1>'

        console.log(id);

        const getArticle = async () => {
            const res = await axios.get(`/article/${id}`);
            // console.log(res.data)
            detailInfo.value = res.data.data;
            console.log(detailInfo.value);
            if (detailInfo.value.coverUrl === undefined) {
                detailInfo.value.coverUrl = "http://localhost:3000/1616658254684.jpeg"
            }
        }

        onMounted(() => {
            // axios.get(`/article/${articles._id}`)
            getArticle();
        })

        return {
            detailInfo,
            // testInfo
        }
    },
})
</script>

<style>
  h4 {
    margin: 0;
    font-weight: normal;
  }
  /* 
    为自适应盒子的宽度暂时这样设置文章内图片的显示大小
    先限制最大宽度，然后高度自适应变化避免图片被拉伸
  */
  .page-container img {
      width: 700px;
      /* width: auto; */
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
      /* background: #668; */
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
  .article-info {
      font-weight: 100;
      font-size: 12px;
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
  .other-box {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
  }
  .link-box{
      width: 100px;
      height: 50px;
      background: #654;
  }
  .help-box {
      width: 100px;
      height: 50px;
      background: #654;
  }
</style>