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
                    <!-- <div class="comment-user-avatar"></div> -->
                    <img v-if="$store.state.userInfo.data !== undefined" class="comment-user-avatar" :src="$store.state.userInfo.data.data.userAvatar">
                    <img v-else class="comment-user-avatar" src="../assets/avatar.png">
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
                <div v-for="comment in commentLists" :key="comment" class="comment-box">
                    <!-- <div class="comment-user-avatar"> -->
                    <img v-if="comment.commentatorAvatar" class="comment-user-avatar" :src="comment.commentatorAvatar">
                    <img v-else class="comment-user-avatar" src="../assets/avatar.png">
                    <!-- </div> -->
                    <div class="comment-detail">                
                        <div class="comment-user-nickname">#{{commentLists.indexOf(comment)}} &nbsp;&nbsp;{{comment.commentator}}</div>
                        <div class="comment-text">{{comment.content}}</div>
                        <div class="comment-info">
                            {{comment.createAt}}
                            <!-- {{comment.createAt.split(/[\s\n]/)[1] + '-' + comment.createAt.split(/[\s\n]/)[2]}} -->
                        </div>
                        <!-- <el-collapse accordion>
                                <el-collapse-item >
                                    <template #title>
                                    回复
                                    </template>
                                    <div class="user-comment-area-mini">
                                        <div class="comment-user-avatar-mini"></div>                           
                                        <el-input
                                            style="margin-bottom: 10px;width:75%;"
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="replyText"
                                            resize="none"
                                        >
                                        </el-input>
                                        <el-button type="primary" style="height:53px" @click="submitReply(comment._id)">回复</el-button>
                                    </div>
                                </el-collapse-item>
                        </el-collapse> -->
                        <!-- <el-collapse accordion @click="getReply(comment._id, commentLists.indexOf(comment))">
                            <el-collapse-item >
                                <template #title>
                                加载更多
                                </template>
                                <div  class="comment-box-mini">
                                    <div class="comment-user-avatar-mini"></div>
                                    <div class="comment-detail-mini">                                        
                                        <div class="comment-user-nickname">评论员2</div>
                                        <div class="comment-text">测试评论2</div>
                                        <span class="comment-info">2021-4-4</span>                                        
                                    </div>
                                </div>
                            </el-collapse-item>
                        </el-collapse> -->
                        <!-- <div class="comment-more">加载更多</div> -->
                    </div>
                </div>
                <!-- <div class="comment-box">
                    <div class="comment-user-avatar"></div>
                    <div class="comment-detail">
                        
                        <div class="comment-user-nickname">评论员2</div>
                        <div class="comment-text">测试评论2</div>
                        <span class="comment-info">2021-4-4</span>
                        <div class="comment-more">加载更多</div>
                    </div>
                </div> -->
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
                    <div class="recommend-title-inarticle">{{authorArticle.title}}</div>
                    <div class="recommend-info">{{authorArticle.createAt.split(/[\s\n]/)[1] + '-' + authorArticle.createAt.split(/[\s\n]/)[2] + '-' + authorArticle.createAt.split(/[\s\n]/)[3]}}</div>
                    <!-- rankessay.createAt.split(/[\s\n]/)[1] + '-' + rankessay.createAt.split(/[\s\n]/)[2] -->
                </div>
                
            </div>
            <div class="other-box">
                <div class="other-box-title">更多</div>
                <div class="other-box-link">
                    <div class="link-box" >
                        <i class="el-icon-edit"></i>
                        <router-link to="/form">
                            投稿
                        </router-link>
                    </div>
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

        const replyText = ref('');
        // collapse
        // const collapseTitle = ref('加载更多');
        // 评论表
        const commentLists = ref([]);

        console.log(id);

        // const collapseChange = () => {
        //     console.log(1);
        //     collapseTitle.value = '收起'
        // }
        const add0 = ( m ) => {
            return m < 10 ? '0' + m : m 
        }
        const format = (timeStamp) => {
            //shijianchuo是整数，否则要parseInt转换
            // parseInt(timeStamp);
            // console.log(timeStamp);
            var time = new Date(parseInt(timeStamp));
            // console.log(time);
            var y = time.getFullYear();
            // console.log(y);
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        }

        const getLocalTime = (data) => {
            var lenth = 0;
            // console.log(lenth);
            for(;lenth < data.length;lenth++) {
                // console.log(data[lenth].createAt);
                data[lenth].createAt = format(data[lenth].createAt);
            }
        }

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
                    commentTo: id,
                }
            });
            console.log(res);
            commentLists.value = res.data.data;
            getLocalTime(commentLists.value);
            console.log(commentLists.value);
            // detailInfo.value = res.data.data;
            // console.log(detailInfo.value);
            // if (detailInfo.value.coverUrl === undefined) {
                // detailInfo.value.coverUrl = "http://localhost:3000/1616658254684.jpeg"
            // }
            // getAuthorArticleList(detailInfo.value.authorId);
        }

        // const getReply = async (commentToId, index) => {
        //     const res = await axios.get('/comment/replylist', {
        //         params: {
        //             commentTo: commentToId,
        //         }
        //     });
        //     console.log(res.data);
        //     console.log(index);
        //     commentLists.value[index].replylist = res.data.data;
        //     console.log(commentLists.value[index]);
        //     // commentLists.value = res.data.data;
        // }
        // const submitReply = async (commentToId) => {
        //     const commentDetail = {
        //         // 回复者信息包括id 头像和昵称
        //         commentatorId: store.state.userInfo.data.data._id,
        //         nickname: store.state.userInfo.data.data.nickname,
        //         userAvatar: store.state.userInfo.data.data.userAvatar,
        //         // 评论对象,指向这条评论的回复对象（评论）的id
        //         commentTo: commentToId,
        //         // 
        //         commentFrom: id,
        //         // createAt: (new Date()).getTime(),
        //         // 评论内容
        //         content: replyText.value,
        //     };
        //     if (replyText.value === '') {
        //         ElMessage.warning('请填写回复');
        //         return;
        //     }
        //     const { data } = await axios.post(
        //         '/comment/post', 
        //         {
        //             essay: commentDetail
        //         },
        //         {
        //             headers: getHeader(),
        //         }
        //     );
        //     if (data.code) {
        //         ElMessage.success('回复成功');
        //         replyText.value = '';
        //     } else {
        //         ElMessage.error('回复失败');
        //     }
        //     // getComments();
        //     console.log(data);
        //     return;
        // }

        const submitComment = async () => {
            if (store.state.userInfo.data === undefined) {
                ElMessage.warning('请登录账号后评论');
                return;
            }
            if (store.state.userInfo.data.data.power === '2' || store.state.userInfo.data.data.power === '4'){
                ElMessage.error('你的账号已被禁止评论');
                return;
            }
            const commentDetail = {
                // 评论者id
                commentatorId: store.state.userInfo.data.data._id,
                nickname: store.state.userInfo.data.data.nickname,
                userAvatar: store.state.userInfo.data.data.userAvatar,
                // 评论对象
                commentTo: id,
                commentFrom: detailInfo.value.title,
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
                ElMessage.error(data.msg);
            }
            getComments();
            console.log(data);
            return;
        }

        onMounted(() => {
            // axios.get(`/article/${articles._id}`)
            getArticle();
            getComments();
            console.log(store.state);
        })

        return {
            detailInfo,
            authorArticleList,
            commentLists,
            commentText,
            replyText,
            submitComment,
            // submitReply,
            // getReply,
            // test
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
      background: #ececec;
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
  .user-comment-area-mini {
      height: 70px;
      display: flex;
      justify-content: space-between;
  }
  .comment-box {
      min-height: 80px;
      padding-top: 10px;
      padding-bottom: 10px;
      background: #f8f8f8;
      border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3;
      display: flex;
      justify-content: space-between;
  }
  /* .comment-box-mini {
      min-height: 0px;
      padding-bottom: 20px;
      background: white;
      display: flex;
      justify-content: space-between;
  } */
  .comment-user-avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      /* background: #555; */
  }
  /* .comment-user-avatar-mini {
      width: 60px;
      height: 60px;
      background: #555;
  } */
  .comment-detail {
      /* background: #e3e3e3; */
      width: 620px;
      /* margin-bottom: 20px; */
      min-height: 70px;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      /* border-bottom-style: solid;
      border-bottom-width: 0.5px;
      border-bottom-color: #e3e3e3; */
  }
  /* .comment-detail-mini {
      background: #a1a1a1;
      width: 530px;
      min-height: 81px;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
  } */
  .comment-user-nickname {
      height: 20px;
      margin-bottom: 5px;
      font-size: 18px;
      font-weight: 500;
  }
  .comment-text {
      min-height: 20px;
      margin-bottom: 10px;
      font-size: 14px;
  }
  .comment-info {
      text-align: right;
      font-size: 12px;
      color: gray;
      line-height: 20px;
      /* display: flex;
      justify-content: space-between; */
  }
  /* .el-collapse-item__header {
      height:24px;
      line-height:24px;
  }
  .el-collapse-item__content {
      padding-bottom: 15px;
  } */
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
  .recommend-title-inarticle {
      display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
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