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
            <div class="comment-area">
                <div class="comment-area-title">评论</div>
                <div class="user-comment-area">
                    <div class="comment-user-avatar"></div>
                    <el-input
                        style="margin-bottom: 10px;width:70%;"
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="commentText"
                        resize="none"
                    >
                    </el-input>
                    <el-button type="primary" style="height:73px" @click="submitComment">发表评论</el-button>
                </div>
                <div class="comment-box">
                    <div class="comment-user-avatar"></div>
                    <div class="comment-detail">                        
                        <div class="comment-user-nickname">评论员</div>
                        <div class="comment-text">测试评论</div>
                        <span class="comment-info">2021-4-4</span>
                        <el-collapse accordion>
                            <el-collapse-item >
                                <template #title>
                                加载更多
                                </template>                              
                                <div class="comment-box-mini">
                                    <div class="comment-user-avatar"></div>
                                    <div class="comment-detail-mini">                                        
                                        <div class="comment-user-nickname">评论员2</div>
                                        <div class="comment-text">测试评论2</div>
                                        <span class="comment-info">2021-4-4</span>                                        
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                        <!-- <div class="comment-more">加载更多</div> -->
                    </div>
                </div>
                <div class="comment-box">
                    <div class="comment-user-avatar"></div>
                    <div class="comment-detail">
                        
                        <div class="comment-user-nickname">评论员2</div>
                        <div class="comment-text">测试评论2</div>
                        <span class="comment-info">2021-4-4</span>
                        <div class="comment-more">加载更多</div>
                    </div>
                </div>
            </div>
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
                <div class="other-box-title">更多</div>
                <div class="other-box-link">
                    <div class="link-box" ><i class="el-icon-edit"></i>投稿</div>
                    <div class="help-box"><i class="el-icon-question"></i>帮助</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import store from '../store'
import { getToken } from '../helpers/token'
import { ElMessage } from 'element-plus'

export default defineComponent({
    setup() {
        const route = useRoute();
        // 获取页面跳转时文章的id
        const id = route.params.id;

        const detailInfo = ref({});

        const authorArticleList = ref({});
        // const testInfo = '<h1>测试</h1>'
        const commentText = ref('');

        console.log(id);

        const getHeader = () => {
          return {
            Authorization: `Bearer ${getToken()}`
          }
        }

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
        
        const getComments = async () => {
            const res = await axios.get('/comment/list', {
                params: {
                    commentFrom: id,
                }
            });
            console.log(res);
            // console.log(res.data)
            // detailInfo.value = res.data.data;
            // console.log(detailInfo.value);
            // if (detailInfo.value.coverUrl === undefined) {
                // detailInfo.value.coverUrl = "http://localhost:3000/1616658254684.jpeg"
            // }
            // getAuthorArticleList(detailInfo.value.authorId);
        }

        const submitComment = async () => {
            const commentDetail = {
                // 评论者id
                commentatorId: store.state.userInfo.data.data._id,
                nickname: store.state.userInfo.data.data.nickname,
                userAvatar: store.state.userInfo.data.data.userAvatar,
                // 评论对象
                commentTo: id,
                commentFrom: id,
                // createAt: (new Date()).getTime(),
                // 评论内容
                content: commentText.value,
            };
            if (commentText.value === '') {
                ElMessage.warning('请填写评论');
                return;
            }
            const { data } = await axios.post(
                '/comment/post', 
                {
                    essay: commentDetail
                },
                {
                    headers: getHeader(),
                }
            );
            if (data.code) {
                ElMessage.success(data.msg);
                commentText.value = '';
            } else {
                ElMessage.error('评论失败');
            }
            console.log(data);
            return
        }

        onMounted(() => {
            // axios.get(`/article/${articles._id}`)
            getArticle();
            getComments();

        })

        return {
            detailInfo,
            authorArticleList,
            commentText,
            submitComment
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
      margin: 40px auto;
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
      min-height: 800px;
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
  .comment-area {
      margin-top: 40px;
  }
  .comment-area-title {
      font-size: 24px;
      margin-bottom: 10px;
  }
  .user-comment-area {
      height: 100px;
      display: flex;
      justify-content: space-between;
  }
  .comment-box {
      min-height: 90px;
      padding-bottom: 20px;
      background: white;
      border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3;
      display: flex;
      justify-content: space-between;
  }
  .comment-box-mini {
      min-height: 0px;
      /* padding-bottom: 20px; */
      background: white;
      display: flex;
      justify-content: space-between;
  }
  .comment-user-avatar {
      width: 80px;
      height: 80px;
      background: #555;
  }
  .comment-detail {
      background: #a1a1a1;
      width: 600px;
      
      min-height: 100px;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
  }
  .comment-detail-mini {
      background: #a1a1a1;
      width: 500px;
      
      min-height: 81px;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
  }
  .comment-user-nickname {
      height: 20px;
      margin-bottom: 5px;
  }
  .comment-text {
      min-height: 20px;
      margin-bottom: 10px;
  }
  .comment-info {
      font-size: 13px;
      color: gray;
  }
  .el-collapse-item__header {
      height:28px;
      line-height:28px;
  }
  .comment-more {
      font-size: 14px;
      color: blue;
  }
  .fix-box {
      position: -webkit-sticky;
      position: sticky;
      top: 20px;
      height: 510px;
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
      
      margin-top: 20px;
  }
  .other-box-title {
      font-size: 20px;
      border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3;
      margin-bottom: 10px;
      padding-bottom: 10px;
  }
  .other-box-link {
        display: flex;
      justify-content: space-between;
  }
  .link-box{
      text-align: center;
      line-height: 50px;
      width: 120px;
      height: 50px;
      /* background: #C6E2FF; */
      cursor: pointer;
      /* box-shadow: grey 1.5px 1.5px 3px; */
      border-radius: 4px;
      border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3;
  }
  .help-box {
      text-align: center;
      line-height: 50px;
      width: 120px;
      height: 50px;
      /* background: #E9E9EB; */
      cursor: pointer;
      /* box-shadow: grey 1.5px 1.5px 3px; */
    border-radius: 4px;
    border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3;
  }
</style>