<template>
  <div class="main-user-box">
    <div class="user-center">
        <el-tabs type="border-card" v-model="activeName">
            <!-- <el-tab-pane>
                <template #label>
                <span><i class="el-icon-date"></i> 我的行程</span>
                </template>
                我的行程
            </el-tab-pane> -->
            <el-tab-pane label="用户信息" name="first">
                用户信息
                <div class="account-avatar">
                    <span class="avatar-text">
                      用户头像
                    </span>
                    <el-upload
                        action="http://localhost:3000/upload/test"
                        list-type="picture-card"
                        :limit= 1
                        :headers= "header"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-change="change"
                        :on-success="handle_success"
                        :class = "{disabled:isMax}"
                        :before-upload="beforeAvatarUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户昵称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <!-- <el-button>取消</el-button> -->
                    </el-form-item>
                </el-form>

            </el-tab-pane>
            <el-tab-pane label="投稿管理" name="second">
              投稿管理
              <!-- <div class="card-manage"> -->
                <!-- <div class="card-case"> -->
                <div v-for="article in articles" :key="article" class="card-case">
                  <img v-if="article.coverUrl !== ''" class="card-img" :src="article.coverUrl" >
                  <img v-else class="card-img" src="../../public/img/img-false.jpg">
                  <div class="card-info">
                    <div class="card-info-title">
                      {{article.title}}
                    </div>
                    <div class="card-info-date">
                      {{article.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <el-button type="primary" @click="getArticle(article._id)">编辑</el-button>
                      <el-button type="danger" @click="removeArticle(article._id)">删除</el-button>
                    </div>
                  </div>
                </div>
              <!-- </div> -->
            </el-tab-pane>
            <el-tab-pane label="审核中" name="third">
              审核中
              <div v-for="semifinishedArticle in semifinishedArticles" :key="semifinishedArticle" class="card-case">
                  <img v-if="semifinishedArticle.coverUrl !== ''" class="card-img" :src="semifinishedArticle.coverUrl" >
                  <img v-else class="card-img" src="../../public/img/img-false.jpg">
                  <div class="card-info">
                    <div class="card-info-title">
                      {{semifinishedArticle.title}}
                    </div>
                    <div class="card-info-date">
                      {{semifinishedArticle.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <div v-if="semifinishedArticle.examined ==='examining'" class="progress-box" style="color:#409EFF">
                        审核中...
                      </div>
                      <div v-else class="progress-box" style="color:red">
                        被驳回！
                      </div>
                      <el-button type="primary" @click="getArticle(semifinishedArticle._id)">编辑</el-button>
                      <el-button type="danger" @click="removeArticle(semifinishedArticle._id)">删除</el-button>
                    </div>
                  </div>
                </div>
              <!-- <el-button type="primary" @click="testbutton">测试接口</el-button> -->
            </el-tab-pane>
            <el-tab-pane label="草稿箱" name="fourth">
              草稿箱
              <div v-for="draft in drafts" :key="draft" class="card-case">
                  <img class="card-img" :src="draft.coverUrl">
                  <div class="card-info">
                    <div class="card-info-title">
                      {{draft.title}}
                    </div>
                    <div class="card-info-date">
                      {{draft.createAt}}
                    </div>
                    <div class="card-info-handle">
                      <el-button type="primary" @click="getDraft(draft._id)">编辑</el-button>
                      <el-button type="danger" @click="removeDraft(draft._id)">删除</el-button>
                    </div>
                  </div>
                </div>
              <!-- <el-button type="primary" @click="testbutton">测试接口</el-button> -->
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
        </el-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { getToken } from '../helpers/token'
import store from '../store'
import { setToken } from '../helpers/token'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default defineComponent({

    data() {
      return {
        userAvatarUrl: '',
        form: {
          name: '',
          //   region: '',
          // date1: '',
          //   date2: '',
          //   delivery: false,
          //   type: [],
          // resource: '',
          // desc: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        isMax : false,
        header: {
            Authorization: `Bearer ${getToken()}`
        }
      }
    },
    methods: {
      async onSubmit() {
        if (this.form.name === '' && this.userAvatarUrl === '') {
          ElMessage.warning('请修改后保存');
          return;
        }
        console.log('submit!');
        // console.log(this.form);
        const { data } = await axios.post('/user/update', {
            id: store.state.userInfo.data.data._id,
            nickname: this.form.name,
            userAvatar: this.userAvatarUrl,
              
        });
        ElMessage.success(data.msg);
        console.log(data);
        // 设置全局状态
        store.commit('setUserInfo', data);
        store.commit('setUserStatus',true);
        // 将token存在本地
        setToken(data.data.token);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.isMax = false;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        // const test = "Bearer " + getToken()
        // console.log(test)
      },
      // 对头像上传的一些限制
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isJPG && isLt2M;
      },
      // 上传框改变触发的钩子
      change(){
          console.log('change')
        this.isMax = true
      },
      // 上传成功后服务端返回的信息
      handle_success(res) {
          console.log(res);
          this.userAvatarUrl = res.url;
      },
      // 上传时携带的请求头
      getHeader() {
          return {
            Authorization: `Bearer ${getToken()}`
          }
      },
    },

    setup() {
      const router = useRouter();
      // 默认显示的标签
      const activeName = ref('first');
      // 草稿箱标签是否可选
      // const showdraft = ref('false');
      // 存储文章信息的响应式数据
      const articles = ref([]);
      // 存储草稿信息的响应式数据
      const drafts = ref([]);
      // 存储审核信息
      const semifinishedArticles = ref([]);

      // 获取用户文章列表
      const getArticleList = async () => {
        // 用户id
        const userId = store.state.userInfo.data.data._id;
        let res = await axios.get(`/article/manager/${userId}`);
        console.log('getlist')
        // 将请求返回的文章数组赋值给articles
        articles.value = res.data.data.list;
        console.log(articles);
        return res.data.data.list;
        // 将请求返回的文章总数赋值给total
        // total.value = res.data.data.total
      };

      // 获取用户审核中的文章列表
      const getSemifinishedArticleList = async () => {
        var lenth = 0;
        // console.log(articles.value.length);
        const templist = await getArticleList();
        console.log(templist.length);
            // console.log(lenth);
        for(;lenth < templist.length;lenth++) {
          if (templist[lenth].examined === 'examining' || templist[lenth].examined === 'reject'){
            semifinishedArticles.value.push(templist[lenth]);
          } else {
            continue;
          }
            // data[lenth].meta.createdAt = format(data[lenth].meta.createdAt);
        }
        console.log(semifinishedArticles);
      };

      // 删除用户文章
      const removeArticle = async (articleId) => {
        const aid = articleId;
        console.log(typeof articleId);
        let resp = await axios.delete(`/article/${aid}`);
        // let res = await axios.delete('/article/' + articleId);
        console.log(resp);
        ElMessage.success(resp.data.msg);
        getArticleList();
      };
      // 获取用户文章详细信息
      const getArticle = async (articleId) => {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.get(`/article/${articleId}`);
        // let res = await axios.delete('/article/' + articleId);
        // console.log(resp);
        store.commit('setArticleDetail', resp.data.data);
        store.commit('setArticleStatus','article');
        // console.log(showdraft.value);
        // if (showdraft.value) {
        //   showdraft.value = !showdraft.value;
        // }
        router.push('/form');
        // activeName.value = 'fourth';
        console.log(store.state.articleDetail);
        // ElMessage.success(resp.msg);
        // getArticleList();
      };

      // 获取用户草稿列表
      const getDraftList = async () => {
        // 用户id
        const userId = store.state.userInfo.data.data._id;
        let res = await axios.get(`/draft/manager/${userId}`);
        console.log('getdraft')
        // 将请求返回的文章数组赋值给articles
        drafts.value = res.data.data.list
        console.log(drafts);
        // 将请求返回的文章总数赋值给total
        // total.value = res.data.data.total
      };
      // 删除用户草稿
      const removeDraft = async (draftId) => {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.delete(`/draft/${draftId}`);
        // let res = await axios.delete('/article/' + articleId);
        console.log(resp);
        ElMessage.success(resp.data.msg);
        getDraftList();
      };
      // 获取用户草稿详细信息
      const getDraft = async (draftId) => {
        // const aid = articleId;
        // console.log(typeof articleId);
        let resp = await axios.get(`/draft/${draftId}`);
        // let res = await axios.delete('/article/' + articleId);
        // console.log(resp);
        store.commit('setArticleDetail', resp.data.data);
        store.commit('setArticleStatus','draft');
        // console.log(showdraft.value);
        // if (showdraft.value) {
        //   showdraft.value = !showdraft.value;
        // }
        router.push('/form');
        // activeName.value = 'fourth';
        console.log(store.state.articleDetail);
        // ElMessage.success(resp.msg);
        // getArticleList();
      };

      const testbutton = () => {
        // 用户id
        const userId = store.state.userInfo.data.data._id;
        axios.post('/user/collection/', {
          id: userId,
        });
        // showdraft.value = !showdraft.value;
      }

      onMounted(async () => {
        console.log('managerOnMounted')
        getArticleList();
        getDraftList();
        getSemifinishedArticleList();
        console.log(router.currentRoute.value.name);
        // console.log(store.state);
        // console.log(store.state.userInfo);
      });
        // const userAvatarUrl = ref('');
        // const form = reactive({
        //   name: '',
          //   region: '',
          // date1: '',
          //   date2: '',
          //   delivery: false,
          //   type: [],
          // resource: '',
          // desc: ''
      //   });
      //   const dialogImageUrl = ref('');
      //   const dialogVisible = ref(false);
      //   const isMax = ref(false);
      //   const header = {
      //       Authorization: `Bearer ${getToken()}`
      //   };

      //   const onSubmit = () => {
      //   console.log('submit!');
      // }
      // const handleRemove = (file, fileList) =>{
      //   console.log(file, fileList);
      //   isMax.value = false;
      // };
      // const handlePictureCardPreview = (file) =>{
      //   dialogImageUrl.value = file.url;
      //   dialogVisible.value = true;
        // const test = "Bearer " + getToken()
        // console.log(test)
      // };
      // 对头像上传的一些限制
      // const beforeAvatarUpload = (file) => {
      //   const isJPG = file.type === 'image/jpeg' || 'image/png';
      //   const isLt2M = file.size / 1024 / 1024 < 3;

      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 3MB!');
      //   }
      //   return isJPG && isLt2M;
      // };
      // 上传框改变触发的钩子
      // const change = () =>{
      //     console.log('change')
      //   isMax.value = true
      // };
      // 上传成功后服务端返回的信息
      // const handle_success = (res) => {
      //     console.log(res);
      //     userAvatarUrl.value = res.url;
      // };
      // 上传时携带的请求头
      // const getHeader = () => {
      //     return {
      //       Authorization: `Bearer ${getToken()}`
      //     }
      // };

      return {
        drafts,
        articles,
        semifinishedArticles,
        testbutton,
        activeName,
        getArticle,
        removeArticle,
        getDraft,
        removeDraft,
      //     userAvatarUrl,
      //     form,
      //     dialogImageUrl,
      //     dialogVisible,
      //     isMax,
      //     header,
      //     onSubmit,
      //     handleRemove,
      //     handlePictureCardPreview,
      //     beforeAvatarUpload,
      //     change,
      //     handle_success,
      //     getHeader,
      }
    },

})
</script>

<style>
.main-user-box {
  min-width: 1000px;
}
.user-center {
    margin: 40px auto;
    min-height: 800px;
    width: 800px;
    /* background: #555; */
}
.el-tabs {
  min-height: 780px;
}
.account-avatar {
  /* margin: 0 auto; */
  padding-top: 20px;
  padding-bottom: 20px;
  width: 560px;
  display: flex;
  justify-content:flex-start;
  
}
.avatar-text {
  width: 68px;
  padding-right: 12px;
  font-size: 14px;
  line-height: 40px;
  color: #606266;
  text-align: right;
}
.disabled .el-upload--picture-card {
    display: none;
}
/* .card-manage {
    display: flex;
    justify-content: center;
} */
.card-case {
    margin: 15px auto;
    height: 120px;
    width: 600px;
    padding: 15px;
    box-shadow: gray 1.5px 1.5px 3px;
    border-radius: 4px ;
    background: #e3e3e3;
    display: flex;
    justify-content: space-between;
}
.card-img {
    width: 180px;
    background: gray;
    object-fit: cover;
    /* width: 100%; */
}
.card-info {
    width: 300px;
    /* background: rgb(140, 117, 241); */
    border-left-style:solid;
    border-left-width: 1px;
    border-left-color: #99a9bf;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
}
.card-info-title {
    font-size: 24px;
    margin-left: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
}
.card-info-date {
    font-size: 14px;
    font-weight: 200;
    margin-left: 20px;
}
.card-info-handle {
    /* text-align: right; */
    display: flex;
    justify-content: flex-end;
}
.progress-box {
    width: 130px;
    font-size: 20px;
    /* text-align: center; */
    line-height: 40px;
}
</style>